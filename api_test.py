import requests
import json
import scholarly
from bs4 import BeautifulSoup
import xmltodict
import pprint



results = []


# Google Scholar
# https://serpapi.com/google-scholar-api

'''
for i in range(1, 100):
    PARAMS = {
        'q': 'jean',
        'start': i*10
    }
    r = requests.get('https://scholar.google.com/scholar?hl=en', params = PARAMS)
    content = r.text
    page = BeautifulSoup(content, 'lxml')
    for entry in page.find_all("h3", attrs={"class": "gs_rt"}):
        try:
            results.append({"title": entry.a.text, "url": entry.a['href']})
        except:
            pass
    if len(results) > 0:
        print('PAGE: ' + str(i))
        print('RESULTS: ' + str(len(results)))
'''

#PAGE 76

#pubmed
#https://marcobonzanini.com/2015/01/12/searching-pubmed-with-python/

PARAMS_SEARCH = {
    'db': 'pubmed',
    'retmode': 'json',
    'retmax': 1,
    'sort': 'relevance',
    'term': 'jean',
}
r = requests.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi', params = PARAMS_SEARCH)
result_json = r.json()

id_list = ', '.join(result_json['esearchresult']['idlist'])


PARAMS_FETCH = {
    'db':'pubmed',
    'retmode':'xml',
    'id': id_list, 
}
papers = requests.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi', params = PARAMS_FETCH)


joe = xmltodict.parse(papers.text)

with open('test2.json', 'w') as f:
    json.dump(joe, f)

