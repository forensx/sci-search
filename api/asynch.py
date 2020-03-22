from concurrent.futures import ProcessPoolExecutor, as_completed
from concurrent.futures import ThreadPoolExecutor
from concurrent.futures import Future 
import requests
import json
from bs4 import BeautifulSoup
import time

#pool = ThreadPoolExecutor(3)
pool = ProcessPoolExecutor(6)

#param str q: query to search the database for
#param int pages: number of pages to scrape
def medrxiv_scrape(pages):
    q = "BRCA1"
    PARAMS = {
        'page': pages
    }
    r = requests.get('https://www.medrxiv.org/search/' + q, params = PARAMS)
    content = r.text
    page = BeautifulSoup(content, 'lxml')
    print("SCRAPE COMPLETE FOR PAGE " + str(x))
    return page

with ProcessPoolExecutor(max_workers=120) as executor:
    start = time.time()
    futures = [executor.submit(medrxiv_scrape, x) for x in range(0,10)]
    results=[]
    for result in as_completed(futures):
        results.append(result)
    end = time.time()

print("Time Taken: {:.6f}s".format(end-start))