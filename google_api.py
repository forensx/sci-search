import requests
import json
import scholarly
from bs4 import BeautifulSoup
import re

def google(query, page):
    results = []


    for x in range(1, page):
        PARAMS = {
            'q': query,
            'start': x*10
        }
        
        r = requests.get('https://scholar.google.com/scholar?hl=en', params = PARAMS)
        
        content = r.text
        page = BeautifulSoup(content, 'lxml')
        books = 0
        for entry in page.find_all("div", attrs={"class": "gs_ri"}):
            titleSection = entry.find("h3", attrs={"class": "gs_rt"})
            subSection = entry.find("div", attrs={"class": "gs_a"})
            summaries = entry.find("div", attrs={"class": "gs_rs"})


            title = "n/a"
            url = "n/a"
            date = "n/a"
            journal = "n/a"
            abstract = "n/a"
            authors = ['n/a']
            database = "Google Scholar"

            try:
                book = titleSection.find("span", attrs={"class": "gs_ctc"}).contents[0].text
                if (book == "[BOOK]"):
                    books +=1
                    continue
            except:
                pass

            try:
                title = titleSection.a.text
                url = titleSection.a['href']
            except:
                pass
        
            try:
                contents = subSection.contents[0]
                date = re.findall(r'\b\d+\b', contents)
                date = date[0]
                contents = contents.split('-')
                author = contents[0]
                author = author.split(', ')
                authors = []
                for e in author:
                    if e != '':
                        e = e.strip("…\xa0")
                        authors.append(e)
                    else:
                        pass
            except:
                pass

            try:
                abstract = summaries.text
            except:
                pass
            result = {
                'title': title,
                'url': url,
                'pubDate':{
                    'year':date,
                    'month':'n/a',
                    'day':'n/a',
                },
                'journal':'n/a',
                'abstract':abstract,
                'authors':authors,
                'database':'Google Scholar',
            }
            results.append(result)
    results = {
        'results': results
    }

    # with open('googleapi.json', 'w') as f:
    #     json.dump(results, f)

    return results
google('gene', 5)