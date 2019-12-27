import requests
from bs4 import BeautifulSoup
import json
import xml.etree.ElementTree as ET
import re
import os.path
import sys
from datetime import datetime
import csv
import pandas as pd
from datetime import date, timedelta, datetime
import datetime as dt


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
    crawlDate = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    #print(crawlDate)

    html = requests.get(article_url)
    article_parser = BeautifulSoup(html.content, "html5lib")

    # get title
    #print("hello")
    title=""
    try:
        title = article_parser.find("h1", class_="title").get_text().strip()
    except AttributeError:
        print("not found title")
        print(url)   
    # get published Date
    pubDate=""
    try:
        pubDate = (
            article_parser.find("span", class_="pdate").get_text().strip().split(" ")[0]
        )
    except AttributeError:
        print('not found pubDate')
        print(url) 
    # get description
    description=""
    try:
        description = article_parser.find("h2", class_="sapo").get_text().strip()
    except AttributeError:
        print('not found description')
        print(url) 
    # get content
    content=""
    try:
        content = article_parser.find("span", {"id": "mainContent"}).get_text().strip()
    except AttributeError:
        print('not found content')
        print(url)
        return("error")      
    # get tags
    tags =""
    try:
        tags_string = article_parser.find("div", {"class": "tagdetail"}).get_text()
        tags = parse_tags_from_string(tags_string)
    except AttributeError:
        print("not found tags")
        print(url) 
    #get like rate     
    # likeRate=""
    # try:
    #     likeRate=parse_likeRate_from_string(article_url)
    # except AttributeError:
    #     print("not found like rate")
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
        "tags":tags,
        "crawlDate":crawlDate
    } 
    return _article_dict

def set_article_detail(crawlDate, article_id, article_url):
    new_article_detail = {
        "articleDetail_id":str(crawlDate+article_id),
        "article_id": article_id,
        "like_url": "https://www.facebook.com/v2.5/plugins/like.php?action=like&app_id=115279665149396&channel=https%3A%2F%2Fstaticxlie%2Fxd_arbiter.php%3Fversion%3D44%23cb%3Df3defe6b2094794%26domain%3Dcafef.vn%26origin%3Dhttp%253A%252F%252Fcafef.vn%252Ff3c3b225a045e08%26relation%3Dparent.parent&container_width=85&href=http%3A%2F%2Fcafef.vn%2F"
        + article_url.split("/")[3]
        + "&layout=button_count&locale=vi_VN&sdk=joey&share=false&show_faces=false&size=small",
        "likeRate": parse_likeRate_from_string(article_url),
        "updateTime":crawlDate
    }

    return new_article_detail 

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
        if new_article =='error':
            print("crawling error")
            continue
        else:
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
    #print(sys.path[0])
    #print(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'))
    #print('2')
    try:
        with open(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'),  encoding="utf8") as jsonFile:
            #print('3')
            data = json.load(jsonFile)
            publishers_list = data["publisher"]
            return publishers_list
    except (IOError, FileNotFoundError):
        print('cannot open')
    finally:
        pass


def get_all_categories(publisher_id):
    #print(sys.path[0])
    #print(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'))
    #print('2')
    try:
        with open(os.path.join(sys.path[0], 'app/crawlermodule/service/publisher.json'),  encoding="utf8") as jsonFile:
            #print('3')
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

def convert_string_to_date(_str,formatted_str):
    return dt.datetime.strptime(_str,"%d-%m-%Y").date()

def convert_string_to_date_full(_str):
    return dt.datetime.strptime(_str,"%d/%m/%Y %H:%M:%S").date()

def write_to_csv(filePath, data, _mode):
    _df = pd.DataFrame(data)
    if 'title' in _df.columns:
        _df.drop_duplicates(subset='title',keep="first", inplace=True)
    else:
        _df.drop_duplicates(subset='article_id',keep="first", inplace=True)
    print(_df)
    with open(filePath,mode=_mode,encoding="utf-8") as f:
        print('hello2')
        if _mode == "a":
            _df.to_csv(f,header=False)
        else:
            _df.to_csv(f)

def crawl_all_articles(publisher_id):
    from ..model.entity.Category import Category
    print("Start crawling ...")
    # get list of categories
    category_list = get_all_categories(publisher_id)
    #initalize some stuffs
    cat_dict_api={}
    articles_crawled_list=[]
    article_details_list=[]

    for cat in category_list:
        articles_list = crawl_all_articles_in_category(cat['cat_id'], cat['cat_url'], publisher_id)
        # import in to article_dataset.csv
        #{
            # if file ==null:
            #   add_all
            # else:
            #   if is_article_exist(article_id):
            #       just_update_likeRate
            #       continue
            #   else:
            #       add_to_file
            #       update_likeRate
        # } 
        articles_crawled_list.extend(articles_list)
        # add to api string
        cat_dict_api[cat['cat_name']]=articles_list
        #print(cat_dict_api)
    #store data into csv file
    articles_fpath = os.path.join(sys.path[0], 'app/crawlermodule/service/articles_dataset.csv')
    details_fpath = os.path.join(sys.path[0], 'app/crawlermodule/service/article_details.csv')
    try:
        print('crawling done. start storing ...')
        #check if the files is empty or not, if yes: add all data into file, if no: check article if duplicate or not 
        if not os.path.exists(articles_fpath):
            print("file is empty")
            print(len(articles_crawled_list))
            for article in articles_crawled_list:
                new_article_detail = set_article_detail(article["crawlDate"], article["id"], article["url"])
                article_details_list.append(new_article_detail)
            print('details',len(article_details_list))
            # write into file
            # print('hello1')
            # write article's details to articles_dataset.csv
            # articles_df = pd.DataFrame(articles_crawled_list)
            # articles_df.drop_duplicates(subset='title',keep="first", inplace=True)
            # print(articles_df)
            # with open(articles_fpath,'w',encoding="utf-8") as f:
            #     print('hello2')
            #     articles_df.to_csv(f)
            write_to_csv(articles_fpath, articles_crawled_list, 'w')

            # write article's details to article_details.csv    
            # article_details_df = pd.DataFrame.from_dict(article_details_list)
            # article_details_df.drop_duplicates(subset='article_id',keep="first", inplace=True)
            # with open(details_fpath,'w', encoding="utf-8") as f:
            #     article_details_df.to_csv(f)
            write_to_csv(details_fpath, article_details_list,'w')
        else:
            # load values in articles dataset file
            print("updating ...") 
            _articles = pd.read_csv(articles_fpath)
            # get lastest articles published in the current week
            # lastest_articles = _articles[date.today() <= _articles['pubDate'].apply(convert_string_to_date) + timedelta(days=1)]
            lastest_articles = _articles[date.today()-timedelta(days=3) <= _articles['crawlDate'].apply(convert_string_to_date_full)]
            print(lastest_articles['pubDate'])
            for article in articles_crawled_list:
                if lastest_articles.empty:
                    new_article_detail = set_article_detail(article["crawlDate"], article["id"], article["url"])
                    article_details_list.append(new_article_detail) 
                    continue
                else:
                    # check if the article is in lastest list from dataset or not, if yes->remove it from crawled list,if no: continue
                    if not (lastest_articles[lastest_articles['id']==int(article['id'])].empty):
                        print(article['title'])
                        # update_article_detail(article["article_id"])
                        # print("update")
                        # articles_dt_list.pop(articles_dt_list.index(article))
                        # => the article is new
                        #create new article detail
                        new_article_detail = set_article_detail(article["crawlDate"], article["id"], article["url"])
                        article_details_list.append(new_article_detail) 
                        continue
                    else:
                        # => the article is available in dataset, should remove it from crawled list
                        print("pop")
                        print('begin',len(articles_crawled_list))
                        articles_crawled_list.pop(articles_crawled_list.index(article))
                        # print(articles_crawled_list.index(article))
                        print(article['title'])
                        print('after',len(articles_crawled_list))
                
            #write data to file
            write_to_csv(articles_fpath, articles_crawled_list, 'a')
            write_to_csv(details_fpath, article_details_list, 'a')   
    except Exception as e:
        print(e)
        raise e
    return cat_dict_api    
        # write into json file 5

