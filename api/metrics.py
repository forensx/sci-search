import asyncio
import aiohttp
import re
from rake_nltk import Rake
import numpy as np
import json

r = Rake(min_length = 2, max_length = 6)

async def find_genes(abstract):
    genes_found = re.findall("(?![a-z!@#$%^&*(.?\":{}|<>])[A-Z]+[-]?[0-9]?[A-Z]*[0-9]?", abstract)
    genes = [x for x in genes_found if len(x) > 2 and len(x) < 7 and x != "DNA" and x != "RNA"]
    genes_unique = sorted(np.unique(genes), key = genes.count)[::-1][0:4]
    variants_found = re.findall("\brs[0-9]*\b", abstract)
    return genes_unique, variants_found

async def find_gdcpfc(abstract, genes, variants):
    gene = ",".join(genes)
    variant = ",".join(variants)
    gdc = 0
    pfc = 0
    async with aiohttp.ClientSession() as session:

        if len(genes) != 0:
            async with session.get('https://www.disgenet.org/api/gda/gene/{}'.format(gene), params = {'format': 'json', 'limit': 100}) as resp:
                diseasejson = await resp.json()
                try:
                    for disease in diseasejson:
                        diseaseNames = [x for x in disease['disease_name'].split(" ") if len(x) > 3]
                        for diseaseName in diseaseNames:
                            if diseaseName in abstract:
                                gdc += 1
                        proteinName = disease['protein_class_name']
                        if proteinName in abstract:
                            pfc += 1
                except:
                    # no gene-disease associations found
                    pass
        else:
            pass

        if len(variants) != 0:
            async with session.get('https://www.disgenet.org/api/vda/variant/{}'.format(variant), params = {'format': 'json', 'limit': 100}) as varresp:
                variantjson = await varresp.json()
                try:
                    for variantDisease in variantjson:
                        variantDiseaseNames = [x for x in variantDisease['disease_name'].split(" ") if len(x) > 3]
                        for variantDiseaseName in variantDiseaseNames:
                            if variantDiseaseName in abstract:
                                gdc += 1
                        #protein does not exist for variant-disease association
                except:
                    # no variant-disease associations found
                    pass
        else:
            pass

        return gdc, pfc



async def find_keywords(abstract):

    r.extract_keywords_from_text(abstract)
    # To get keyword phrases ranked highest to lowest.
    keywords_extracted = r.get_ranked_phrases()[0:4]
    return keywords_extracted


def pp_index(gdc, pfc, years_passed):    
    num = (gdc * 6) + (pfc * 5)
    den = (years_passed/2020)
    index_calculated = num/den

    return index_calculated