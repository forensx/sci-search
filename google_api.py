import requests
import json
import scholarly
from bs4 import BeautifulSoup

def google(query, page):
    results = []

    PARAMS = {
        'q': query,
        'start': page*10
    }
    
    r = requests.get('https://scholar.google.com/scholar?hl=en', params = PARAMS)

    content = r.text
    print(content)
    page = BeautifulSoup(content, 'lxml')
    for entry in page.find_all("h3", attrs={"class": "gs_rt"}):
        try:
            results.append({"title": entry.a.text, "url": entry.a['href']})
        except:
            pass

    return results