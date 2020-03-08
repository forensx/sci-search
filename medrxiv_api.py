import requests
import json
from bs4 import BeautifulSoup
import re
import datetime
import dateutil.parser as dparser

def medrxiv(query, page):
    results = []
    q = query
    for x in range(1, page):
        PARAMS = {
            'page': x-1
        }
        r = requests.get('https://www.medrxiv.org/search/' + q, params = PARAMS)
        content = r.text
        page = BeautifulSoup(content, 'lxml')
        
        for entry in page.find_all("a", attrs={"class": "highwire-cite-linked-title"}):
            title = ""
            url = ""
            pubDate = ""
            journal = None
            abstract = ""
            authors = []
            database = "medRxiv"
            
            
            url = "https://www.medrxiv.org/" + entry.get('href')
            
            request_entry = requests.get(url)
            content_entry = request_entry.text
            page_entry = BeautifulSoup(content_entry, 'lxml')

            #getting pubDate
            pubDate = page_entry.find_all("div", attrs = {"class": "pane-content"})
            pubDate = pubDate[10]
            pubDate = str(dparser.parse(pubDate, fuzzy = True))
            pubDate = datetime.datetime.strptime(pubDate, '%Y-%m-%d %H:%M:%S')
            pubDate = pubDate.strftime('%b %d %Y')
            date = pubDate.split()
            month = date[0]
            day = date[1]
            year = date[2]
            pubDate = {
                'year': year,
                'month': month,
                'day': day
            }

            #getting title
            title = page_entry.find("h1", attrs={"class": "highwire-cite-title"}).text
            
            #getting abstract
            abstract = page_entry.find("p", attrs = {"id": "p-2"}).text

            #getting authors 
            for author in page_entry.find_all("span", attrs={"class": "highwire-citation-authors"}):
                givenName = author.find("span", attrs={"class": "nlm-given-names"}).text
                surname = author.find("span",  attrs={"class": "nlm-surname"}).text
                initials = "".join([x[0] for x in givenName.split(' ')])
                authorName = initials + " " + surname
                authors.append(authorName)
            authors = authors[::3]
            
            result = {
                'title': title,
                'url': url,
                'pubDate': pubDate,
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
