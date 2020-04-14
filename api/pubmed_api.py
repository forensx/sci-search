import aiohttp
import json
import asyncio
import xml.etree.ElementTree as ET
import datetime
from metrics import find_gdcpfc, find_genes


base = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
base_fetch = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi'




async def fetch_papers(ids):

    FETCH_PARAMS = {
        'db': 'pubmed',
        'retmode': 'xml',
        'id': ids
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(base_fetch, params = FETCH_PARAMS) as resp:
            papers = await resp.text()
            return papers




async def pubmed(query, number):
    #3 req/sec without api key
    
    results = []

    SEARCH_PARAMS = {
        'db': 'pubmed',
        'retmode': 'json',
        'retmax': number,
        'sort': 'relevance',
        'term': query
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(base, params = SEARCH_PARAMS) as resp:
            data = await resp.json()
            
            id_list = data['esearchresult']['idlist']
            if len(id_list) == 0:
                final_noresult = [{
                        'database': 'PubMed',
                        'error': 'No results found'
                    }]
                return final_noresult
            elif len(id_list) > 1:
                id_list = ','.join(id_list)
            else:
                id_list = id_list[0]
            
            xml = await fetch_papers(id_list)
            root = ET.fromstring(xml)
            for pmarticle in root:
                article = pmarticle.find('MedlineCitation').find('Article')

                allTitles = []
                titles_tag = article.find('ArticleTitle')
                for text in titles_tag.itertext():
                    allTitles.append(text.strip())
                title = ' '.join(allTitles)

                journal = article.find('Journal').find('Title').text
                url = 'https://ncbi.nlm.nih.gov/pubmed/' + pmarticle.find('MedlineCitation').find('PMID').text

                doi_tag = pmarticle.find('PubmedData').find('ArticleIdList').findall('ArticleId')
                for tag in doi_tag:
                    if 'doi' in tag.attrib.values():
                        doi = tag.text
                
                paperTypesList = []
                paperTypes = article.find('PublicationTypeList').findall('PublicationType')
                for element in paperTypes:
                    paperTypesList.append(element.text)
                paperType = ', '.join(paperTypesList)

                allAbstracts = []
                abstract_tag = article.find('Abstract').findall('AbstractText')
                for abstractText in abstract_tag:
                    for text in abstractText.itertext():
                        allAbstracts.append(text.strip())
                abstract = ' '.join(allAbstracts)

                authors = []
                authorlist_tag = article.find('AuthorList').findall('Author')
                for author in authorlist_tag:
                    try:
                        initial = author.find('Initials').text
                        last = author.find('LastName').text
                        name = "{}. {}".format(initial, last)
                        authors.append(name)
                    except:
                        pass

                
                try:
                    keywords = []
                    keywordlist = pmarticle.find('MedlineCitation').find('KeywordList').findall('Keyword')
                    for word in keywordlist:
                        keywords.append(word.text.strip('\n'))
                except:
                    # no keywords
                    pass

                #CHECK ARTICLEDATE, IF IT DOESN'T EXIST, THEN CHECK <PubDate> AND GET ALL INFO
                try:
                    pubDate_y = article.find('ArticleDate')[0].text
                    pubDate_m = article.find('ArticleDate')[1].text
                    pubDate_d = article.find('ArticleDate')[2].text
                    date_str = "{} {} {}".format(pubDate_m, pubDate_d, pubDate_y)
                    pubDate = datetime.datetime.strptime(date_str, '%m %d %Y').strftime('%Y-%m-%d %H:%M:%S')
                except:
                    datelist = []
                    pubDate_tag = article.find('Journal').find('JournalIssue').find('PubDate')
                    for child in pubDate_tag:
                        datelist.append(child.text)
                    if len(datelist) > 1:
                        pubDate = ' '.join(datelist)
                    else:
                        pubDate = datelist[0]

                genes, variants = await find_genes(abstract)
                gdc, pfc = await find_gdcpfc(abstract, genes, variants)


                result = {
                    'title': title,
                    'url': url,
                    'pubDate': pubDate,
                    'journal': journal,
                    'abstract': abstract,
                    'authors': authors,
                    'database': 'PubMed',
                    'doi': doi,
                    'paperType': paperType,
                    'keywords': keywords,
                    'gdc': gdc,
                    'pfc': pfc,
                    'genes': genes,
                    'variants': variants
                }
                results.append(result)
            
            #final = {
            #    'results': results
            #}
            return results
