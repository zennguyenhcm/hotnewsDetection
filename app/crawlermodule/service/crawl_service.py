import requests
from bs4 import BeautifulSoup


def document_crawler(article_url):
    return "hello"
    html = requests.get(article_url)
    article = html.content
    # print(article)
    article_parser=BeautifulSoup(article,'html5lib')
    # get title  
    print('hello')
    print(article_parser.find('h1',class_='title').get_text().strip())
    # get pDate
    print(article_parser.find('span', class_='pdate').get_text().strip().split(" ")[0])
    # get likeRate
    print(article_parser.find('div', class_='fb-like'))
    #get description
    print(article_parser.find('h2', class_='sapo').get_text().strip())
    #get content
    print(article_parser.find('span', {"id": "mainContent"}).get_text().strip())
    #get tags
    #print(article_parser.find('div', {"class": "tagdetail"}).get_text())
    keyword = article_parser.find('div', {"class": "tagdetail"}).get_text()
    keyword =keyword.split("\n")[3].strip()
    # print(keyword)
    keyword = ",".join(word.strip() for word in keyword.split(","))
    print(keyword)

