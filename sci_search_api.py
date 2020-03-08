from flask import Flask, jsonify
from flask_restplus import Resource, Api
from google_api import google
from pubmed_api import pubmed
from bioarchive_api import bioarchive
from medrxiv_api import medrxiv
import math
import json
from rake_nltk import Rake
import re
import numpy as np

# Uses stopwords for english from NLTK, and all puntuation characters.
#r = Rake(min_length=2, max_length=6)
app = Flask(__name__)
api = Api(app)


@api.route('/search/<string:search_param>/<int:numResults>')
class e(Resource):
    def get(self, search_param, numResults):
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
            text = combined[i]['abstract']
            
            if (text is None):
                continue
            print(text)
            # r.extract_keywords_from_text(text)
            # # To get keyword phrases ranked highest to lowest.
            # keywords_extracted = r.get_ranked_phrases()[0:4]

            # combined[i]['keywords'] = keywords_extracted

            genes = (re.findall("[A-Z]+[-]?[0-9]?(?![a-z!@#$%^&*(.?\":{}|<>])", text))
            genes = [x for x in genes if len(x) > 2 and len(x) < 7 and x != "DNA" and x != "RNA"]
            counts = genes.count
            genes_unique = sorted(np.unique(genes), key=counts)[::-1]

            combined[i]['genes'] = genes_unique
        # return results of search here
        return jsonify({'results': combined})


if __name__ == '__main__':
    app.run(debug=True)