import requests
import json
import datetime

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
        date = datetime.datetime.strptime(date, '%Y-%m-%d')
        date = date.strftime('%b %d %Y')
        date = date.split()
        month = date[0]
        day = date[1]
        year = date[2]
        pubDate = {
            'year': year,
            'month': month,
            'day': day
        }
        journal = "n/a"
        database = "bioRxiv"
        authors = []
        for author in paper['authors']:
            name = author['name']
            authors.append(name)
        
        result = {
            'title': title,
            'url': url,
            'pubDate': pubDate,
            'journal': journal,
            'abstract': abstract,
            'authors': authors,
            'database': database,
        }
        results.append(result)
    
    final = {
        'results': results
    }
    return final


    #BIOARCHIVE PUTS A METRIC VALUE FOR EACH PAPER
