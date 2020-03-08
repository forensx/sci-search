import requests
import json

def bioarchive(query, number):
    
    results = []

    PARAMS = {
        'q': query,
        'page_size': number
    }

    r = requests.get('https://api.rxivist.org/v1/papers', params = PARAMS)
    archive = r.json()

    for paper in archive['results']:
        title = paper['title']
        url = paper['biorxiv_url']
        abstract = paper['abstract']
        date = paper['first_posted']
        journal = "n/a"
        database = "bioRxiv"
        authors = []
        for author in paper['authors']:
            name = author['name']
            authors.append(name)
        
        result = {
            'title': title,
            'url': url,
            'pubDate': date,
            'journal': journal,
            'abstract': abstract,
            'authors': authors,
            'database': database
        }
        results.append(result)
    
    final = {
        'results': results
    }
    return final

    #BIOARCHIVE PUTS A METRIC VALUE FOR EACH PAPER
