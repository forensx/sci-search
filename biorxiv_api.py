import aiohttp
import json
import asyncio
import datetime
from metrics import find_gdcpfc, find_genes, find_keywords


base = 'https://api.rxivist.org/v1/papers'
base_fetch = 'https://api.rxivist.org/v1/papers/'
headers = {
    'User-Agent': 'Mozilla/5.0 (katsukic7@gmail.com)',
}

async def fetch_papers(paperid):
    async with aiohttp.ClientSession() as session:
        async with session.get(base_fetch + str(paperid), headers = headers) as resp:
            detail = await resp.json()
            return detail

async def biorxiv(query, number):

    results = []

    SEARCH_PARAMS = {
        'q': query,
        'metric': 'downloads',
        'timeframe': 'alltime',
        'page_size': number
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(base, params = SEARCH_PARAMS, headers = headers) as resp:
                data = await resp.json()
                ids = []
                for paper in data['results']:
                    ids.append(paper['id'])

                for article in ids:
                    detail = await fetch_papers(article)

                    try:
                        doi = detail['publication']['doi']
                    except:
                        doi = detail['doi']

                    try:
                        journal = detail['publication']['journal']
                    except:
                        journal = None

                    url = detail['biorxiv_url']
                    title = detail['title']

                    abstract = detail['abstract']


                    keywords = await find_keywords(abstract)
                    genes, variants = await find_genes(abstract)
                    gdc, pfc = await find_gdcpfc(abstract, genes, variants)
                    
                    date = detail['first_posted']
                    pubDate = datetime.datetime.strptime(date, '%Y-%m-%d').strftime('%Y-%m-%d %H:%M:%S')

                    authors = []
                    for author in detail['authors']:
                        authors.append(author['name'])

                    result = {
                        'title': title,
                        'url': url,
                        'pubDate': pubDate,
                        'journal': journal,
                        'abstract': abstract,
                        'authors': authors,
                        'database': 'bioRxiv', 
                        'doi': doi,
                        'paperType': None,
                        'keywords': keywords,
                        'gdc': gdc,
                        'pfc': pfc,
                        'genes': genes,
                        'variants': variants
                    }
                    results.append(result)


                return results
    except:
        final_noresult = [{
                'database': 'bioRxiv',
                'error': 'No results found'
            }]
        return final_noresult