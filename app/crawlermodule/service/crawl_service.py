import requests
from bs4 import BeautifulSoup
import json
import xml.etree.ElementTree as ET
import re
import os.path
import sys


def parse_likeRate_from_string(article_url):
    html = requests.get(
        "https://www.facebook.com/v2.5/plugins/like.php?action=like&app_id=115279665149396&channel=https%3A%2F%2Fstaticxlie%2Fxd_arbiter.php%3Fversion%3D44%23cb%3Df3defe6b2094794%26domain%3Dcafef.vn%26origin%3Dhttp%253A%252F%252Fcafef.vn%252Ff3c3b225a045e08%26relation%3Dparent.parent&container_width=85&href=http%3A%2F%2Fcafef.vn%2F"
        + article_url.split("/")[3]
        + "&layout=button_count&locale=vi_VN&sdk=joey&share=false&show_faces=false&size=small"
    )
    likeRateParser = BeautifulSoup(html.content, "html5lib")
    likeRate = likeRateParser.find("span", class_="_5n6h _2pih").get_text()
    return likeRate


def parse_tags_from_string(tags_string):
    """
    delete all blank lines and space 
    return string of tag keywords from parsed tags_string
    """
    tags_string = tags_string.split("\n")[3].strip()
    tags_string = ",".join(word.strip() for word in tags_string.split(","))
    return tags_string


def parse_article_id(article_url) -> str:
    regex = r"\d+(?=.chn)"
    matches = re.search(regex, article_url)
    return matches.group(0)


def crawl_article_from_url(article_url, category_id, publisher_id):
    from ..model.entity.Article import Article

    """8
    parse html elem tags and create an article object from crawling string 
    """

    _id = parse_article_id(article_url)
    url = article_url
    category_id = category_id
    publisher_id = publisher_id

    html = requests.get(article_url)
    article_parser = BeautifulSoup(html.content, "html5lib")

    # get title
    print("hello")
    title=""
    try:
        title = article_parser.find("h1", class_="title").get_text().strip()
        print(title)
    except AttributeError:
        print("not found title")   
    # get published Date
    pubDate=""
    try:
        pubDate = (
            article_parser.find("span", class_="pdate").get_text().strip().split(" ")[0]
        )
    except AttributeError:
        print('not found pubDate')

    # get description
    description=""
    try:
        description = article_parser.find("h2", class_="sapo").get_text().strip()
    except AttributeError:
        print('not found description')

    # get content
    content=""
    try:
        content = article_parser.find("span", {"id": "mainContent"}).get_text().strip()
    except AttributeError:
        print('not found content')    
    # get tags
    tags =""
    try:
        tags_string = article_parser.find("div", {"class": "tagdetail"}).get_text()
        tags = parse_tags_from_string(tags_string)
    except AttributeError:
        print("not found tags")
    # return an article object 
    # _article = Article(
    #     _id, title, pubDate, content, url, description, tags, category_id, publisher_id
    # )

    # print(new_article.article_to_string())
    # return new_article.article_to_string()

    #return a dictionary 
    _article_dict ={
        "id":_id,
        "url": article_url,
        "category_id": category_id,
        "publisher_id": publisher_id,
        "title":title,
        "pubDate":pubDate,
        "description":description,
        "content":content,
        "tags":tags
    } 
    return _article_dict


def crawl_all_articles_in_category(
    category_id: str, category_url: str, pub_id: str
) -> list:
    articles_list = []
    xmlPage = requests.get(category_url)
    xmlContent = xmlPage.content
    xml_root = ET.fromstring(xmlContent)
    for item in xml_root.findall("./channel/item/description"):
        item_content = item.text
        item_parser = BeautifulSoup(item_content, "html5lib")
        article_url = item_parser.find("a")["href"]
        new_article = crawl_article_from_url(article_url, category_id, pub_id)
        articles_list.append(new_article)
    # return "\n".join(article for article in articles_list)
    return articles_list

# def get_all_categories_by_publisherId(pub_id):
#     try:
#         with open('publisher.json') as jsonFile:
#             data = json.load(jsonFile)
#             for category in data['publisher']['category']:
#                 pass

#     except:
#         pass
#     finally:    
#         pass
    


def get_all_publishers():
    print(sys.path[0])
    print(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'))
    print('2')
    try:
        with open(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'),  encoding="utf8") as jsonFile:
            print('3')
            data = json.load(jsonFile)
            publishers_list = data["publisher"]
            return publishers_list
    except (IOError, FileNotFoundError):
        print('cannot open')
    finally:
        pass


def get_all_categories(publisher_id):
    print(sys.path[0])
    print(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'))
    print('2')
    try:
        with open(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'),  encoding="utf8") as jsonFile:
            print('3')
            data = json.load(jsonFile)
            publishers_list = data["publisher"]
            for pub in publishers_list:
                if (pub['pub_id'] == publisher_id):
                    return pub['category']
                else:
                    print('not found publisher_id')
                    return "pub_id not exist"
    except (IOError, FileNotFoundError):
        print('cannot open')
    finally:
        pass

def crawl_all_articles(publisher_id):
    from ..model.entity.Category import Category

    # get list of categories
    category_list = get_all_categories(publisher_id)
    cat_dict={}
    for cat in category_list:
        articles_list = crawl_all_articles_in_category(cat['cat_id'], cat['cat_url'], publisher_id)
        cat_dict[cat['cat_name']]=articles_list
        print(cat_dict)
    return cat_dict    
        # write into json file    5