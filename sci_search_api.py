from flask import Flask, jsonify
from flask_restplus import Resource, Api
from google_api import google
from pubmed_api import pubmed
from bioarchive_api import bioarchive
from medrxiv_api import medrxiv
import math
import json
from rake_nltk import Rake
import requests
import datetime
import re
from statistics import mean 
import numpy as np

# Uses stopwords for english from NLTK, and all puntuation characters.
a = Rake(min_length=2, max_length=6)
app = Flask(__name__)
api = Api(app)

def PP_Index(gdc, pfc, years_passed):
    
    num = (gdc * 6) + (pfc * 5)
    den = (years_passed/2020)
    index_calculated = num/den

    return index_calculated



@api.route('/search/<string:search_param>/<int:numResults>')
class e(Resource):
    def get(self, search_param, numResults):
        ppindex_all = []
        search_params = search_param
        page_num = numResults
        pubmed_result = pubmed(search_params, page_num)
        biorxiv_result = bioarchive(search_params, page_num)
        scholar_result = google(search_params, math.ceil(page_num/10))
        medrxiv_result = medrxiv(search_params, math.ceil(page_num/10))

        pubmed_arr = pubmed_result['results']
        biorxiv_arr = biorxiv_result['results']
        scholar_arr = scholar_result['results']
        medrxiv_arr = medrxiv_result['results']
        combined = pubmed_arr + biorxiv_arr + scholar_arr + medrxiv_arr

        for i in range(len(combined)):
            if combined[i]['abstract']:
                text = combined[i]['abstract']
                a.extract_keywords_from_text(text)
                # To get keyword phrases ranked highest to lowest.
                keywords_extracted = a.get_ranked_phrases()[0:4]
                combined[i]['keywords'] = keywords_extracted
                genes = (re.findall(
                    "[A-Z]+[-]?[0-9]?(?![a-z!@#$%^&*(.?\":{}|<>])", text))
                genes = [x for x in genes if len(x) > 2 and len(
                    x) < 7 and x != "DNA" and x != "RNA"]
                counts = genes.count
                genes_unique = sorted(np.unique(genes), key=counts)[::-1]
                combined[i]['genes'] = genes_unique[0:4]

                gene = ",".join(genes_unique)

                if (len(genes_unique) > 4):
                    genes_unique = genes_unique[0:4]

                combined[i]['genes'] = genes_unique

                # gene-disease count
                gdc = 0

                # protein function count
                pfc = 0

                PARAMS = {
                    'format': 'json',
                    'limit': 100
                }

                r = requests.get(
                    'https://www.disgenet.org/api/gda/gene/' + gene, params=PARAMS)
                s = requests.get(
                    'https://www.disgenet.org/api/vda/variant/' + gene, params=PARAMS)

                try:
                    for disease in r.json():
                        diseaseNames = [
                            x for x in disease['disease_name'].split(" ") if len(x) > 3]
                        for diseaseName in diseaseNames:
                            if (diseaseName in text):
                                gdc += 1
                                continue

                        proteinName = disease['protein_class_name']
                        if proteinName in text:
                            pfc += 1
                except:
                    # No gene-disease assoc. found
                    pass

                try:
                    for variantdisease in s.json():
                        variantdiseaseNames = [
                            x for x in variantdisease['disease_name'].split(" ") if len(x) > 3]

                        for diseaseName in variantdiseaseNames:
                            if (diseaseName in abstract):
                                gdc += 1
                                continue

                        proteinName = variantdisease['protein_class_name']
                        if proteinName in text:
                            pfc += 1
                except:
                    # No variant-disease assoc. found
                    pass
                combined[i]['gdc'] = gdc
                combined[i]['pfc'] = pfc

            else:
                combined[i]['keywords'] = ["No Abstract Found"]
                combined[i]['genes'] = ["No Genes Found"]
                combined[i]['gdc'] = 0
                combined[i]['pfc'] = 0
            date = combined[i]['pubDate']
            try:
                date_str = "{} {} {}".format(
                    date['month'], date['day'], date['year'])
                utcDatetime = datetime.datetime.strptime(date_str, '%b %d %Y')
                combined[i]['UTCDatetime'] = utcDatetime
            except:
                combined[i]['UTCDatetime'] = None

            #pp index
            gdc = combined[i]['gdc']
            gfc = combined[i]['pfc']
            try:
                yearsPassed = 2020 - combined[i]['pubDate']['year']
            except:
                yearsPassed = 1000
            ppindex = PP_Index(gdc, gfc, yearsPassed)
            ppindex_all.append(ppindex)
            
        norm_ppindex = [x/mean(ppindex_all) for x in ppindex_all]
        #  \ return results of search here

        for i in range(len(combined)):
            combined[i]['ppindex'] = norm_ppindex[i]
        return jsonify({'results': combined})

if __name__ == "__main__":
    app.run(debug=True)
