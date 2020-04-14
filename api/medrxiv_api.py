import aiohttp
import json
import asyncio
import datetime
from bs4 import BeautifulSoup
import re
import dateutil.parser as dparser
import math
from metrics import find_gdcpfc, find_genes, find_keywords

#%20 is space, %3A is colon
base = 'https://medrxiv.org/search/'


async def generatearticleinfo(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.text()


async def getpageinfo(query, page):
    async with aiohttp.ClientSession() as session:
        async with session.get('{}{} jcode:medrxiv numresults:10 sort:relevance-rank format_result:standard'.format(base, query, page)) as resp:

            results_on_page = []

            content = await resp.text()
            page = BeautifulSoup(content, 'lxml')

            for entry in page.find_all("a", attrs = {"class": "highwire-cite-linked-title"}):
                url = "https://www.medrxiv.org/" + entry.get('href')

            
                content_entry = await generatearticleinfo(url)
                page_entry = BeautifulSoup(content_entry, 'lxml')

                #getting pubDate
                pubDate = page_entry.find_all("div", attrs = {"class": "pane-content"})[10]
                pubDate = str(dparser.parse(pubDate, fuzzy = True))

                #getting title
                title = page_entry.find("h1", attrs={"class": "highwire-cite-title"}).text

                #getting abstract
                abstract = page_entry.find("p", attrs = {"id": "p-2"}).text

                keywords = await find_keywords(abstract)
                genes, variants = await find_genes(abstract)
                gdc, pfc = await find_gdcpfc(abstract, genes, variants)

                doi = page_entry.find("span", attrs = {"class": "highwire-cite-metadata-doi highwire-cite-metadata"}).text.replace(" ", "").strip("https://doi.org/")

                #getting authors
                authors = []
                firstnames = []
                lastnames = []
                for author in page_entry.find_all("span", attrs={"class":   "highwire-citation-authors"}):
                    givenName = author.find_all("span", attrs={"class": "nlm-given-names"})
                    for name in givenName:
                        firstnames.append(name.text)

                    surname = author.find_all("span",  attrs={"class": "nlm-surname"})
                    for lastname in surname:
                        lastnames.append(lastname.text)

                    for i in range(len(firstnames)):
                        authorName = firstnames[i] + ' ' + lastnames[i]
                        authors.append(authorName)


                result = {
                    'title': title,
                    'url': url,
                    'pubDate': pubDate,
                    'journal': None,
                    'abstract': abstract,
                    'authors': authors,
                    'database': 'medRxiv',
                    'doi': doi,
                    'paperType': None,
                    'keywords': keywords,
                    'gdc': gdc,
                    'pfc': pfc,
                    'genes': genes,
                    'variants': variants
                }


                results_on_page.append(result)
            return results_on_page


async def medrxiv(query, number):

    pages_to_query = math.ceil(number/10)
    if pages_to_query > 1:
        for x in range(0, pages_to_query + 1):
            results = await getpageinfo(query, x)

            if len(results) == 0:
                final_noresult = [{
                        'database': 'medRxiv',
                        'error': 'No results found'
                    }]
                return final_noresult

        return results

    elif pages_to_query == 1:
        results = await getpageinfo(query, 0)
        if len(results) == 0:
                final_noresult = [{
                        'database': 'medRxiv',
                        'error': 'No results found'
                    }]
                return final_noresult

        return results

