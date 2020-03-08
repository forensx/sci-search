import requests
import json
import xmltodict

def pubmed(query, number):
    if number == 1:
        number == 2
    else:
        pass
    results = []
    PARAMS_SEARCH = {
        'db': 'pubmed',
        'retmode': 'json',
        'retmax': number,
        'sort': 'relevance',
        'term': query,
    }
    r = requests.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi', params = PARAMS_SEARCH)
    result_json = r.json()
    
    id_list = (result_json['esearchresult']['idlist'])
    if (len(id_list) > 1):
        id_list = ', '.join(id_list)

    PARAMS_FETCH = {
        'db':'pubmed',
        'retmode':'xml',
        'id': id_list, 
    }
    papers = requests.get('http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi', params = PARAMS_FETCH)
    
    
    papers_json = xmltodict.parse(papers.text)
    with open('test3.json', 'w') as f:
            json.dump(papers_json, f)
    for article in papers_json['PubmedArticleSet']['PubmedArticle']:
        title = ""
        journal = ""
        url = ""
        authors = []
        pubDate = {
            'year': "",
            'month': "",
            'day': "",
        }
        abstract = ""

        #getting the Article Title
        try:
            title = article['MedlineCitation']['Article']['ArticleTitle']['#text']
        except:
            title = article['MedlineCitation']['Article']['ArticleTitle']
        title = title.strip("[].")

        #getting the journal title
        journal = article['MedlineCitation']['Article']['Journal']['Title']

        #getting the url
        pmid = article['MedlineCitation']['PMID']['#text']
        url = "https://ncbi.nlm.nih.gov/pubmed/" + pmid

        #getting author names
        try:
            author = article['MedlineCitation']['Article']['AuthorList']['Author']
            authorName = author['Initials'] + ". " + author['LastName']
            authors.append(authorName)
        except:
            try:
                for author in article['MedlineCitation']['Article']['AuthorList']['Author']:
                    try:
                        authorName = author['Initials'] + ". " + author['LastName']
                        authors.append(authorName)
                    except:
                        pass
            except:
                pass
        
        #getting year published
        pubYear = ""
        pubMonth = ""
        pubDay = ""
        try:
            pubYear = article['MedlineCitation']['Article']['Journal']['JournalIssue']['PubDate']['Year']
        except:
            pubYear = None
        try:
            pubMonth = article['MedlineCitation']['Article']['Journal']['JournalIssue']['PubDate']['Month']
        except:
            pubMonth = None
        try:
            pubDay = article['MedlineCitation']['Article']['Journal']['JournalIssue']['PubDate']['Day']
        except:
            pubDay = None
        pubDate = {
            'year': pubYear,
            'month': pubMonth,
            'day': pubDay,
        }

        #getting abstract
        try:
            abTexts = article['MedlineCitation']['Article']['Abstract']['AbstractText']
        except:
            abstract = None
        try:
            abstract = ""
            for abText in abTexts:
                abstract += abText['#text']
        except:
            pass
        try:
            abstract = ""
            abstract += abTexts['#text']
        except:
            pass
        try:
            abstract = ""
            abstract += abTexts
        except:
            abstract = None
        
        result = {
            'title': title,
            'url': url,
            'pubDate': pubDate,
            'journal': journal,
            'abstract': abstract,
            'authors': authors,
            'database': 'PubMed',
        }
        results.append(result)
    results = {
        'results': results
    }
    # this does not work with 1
    return results
