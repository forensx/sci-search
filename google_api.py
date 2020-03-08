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
    page = BeautifulSoup(content, 'lxml')
    books = 0
    for entry in page.find_all("h3", attrs={"class": "gs_rt"}):
        try:
            book = entry.find("span", attrs={"class": "gs_ctc"}).contents[0].text
            if (book.equals("[BOOK]")):
                books +=1
                continue
            
        except:
            pass
        try:
            results.append({"title": entry.a.text, "url": entry.a['href']})
        except:
            pass
    
    print(books)

google("jean", 3)