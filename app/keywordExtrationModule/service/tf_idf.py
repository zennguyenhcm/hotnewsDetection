# -*- coding: utf-8 -*-

# Máy cần cài thư viện cho xử lý tiếng Việt PyVi, sklearn !pip install pyvi

import numpy as np
import string, os,re
import random,os,glob
import matplotlib.pyplot as plt
from random import shuffle
from pyvi import ViTokenizer, ViPosTagger
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
import csv
import os.path
import sys
import json
import pandas as pd
from datetime import date, timedelta, datetime
import datetime as dt
from collections import defaultdict 
import re
# đọc dữ liệu ở folder.
stopword_path = os.path.join(sys.path[0], 'app\keywordExtrationModule\service\stopwords.txt')
evaluation_path = os.path.join(sys.path[0], 'app\keywordExtrationModule\service\content_tags.csv')
word_cloud_path = os.path.join(sys.path[0],'app\keywordExtrationModule\service\word_cloud.json')

f = open(stopword_path, "r",encoding='utf8')
s = f.read()
vi_stopwords = s.split('\n')

# Preprocessing: Bao gồm xóa các stopwords, xóa các tag, ký tự đặc biệt, ký tự chỉ website trong văn bản
# tách từ, xóa các icon không cần thiết trong văn bản
def remove_stopword(text, vi_stopwords):
    s = ""
    for word in text.split(' '):
        if word.replace('_',' ').strip() not in vi_stopwords:
              s += word + " "
    return s

def normalText(sent):
    sent = str(sent).replace('_',' ').replace('/',' trên ')
    sent = re.sub('-{2,}','',sent)
    sent = re.sub('\\s+',' ', sent)
    patHagTag = r'#\s?[aăâbcdđeêghiklmnoôơpqrstuưvxyàằầbcdđèềghìklmnòồờpqrstùừvxỳáắấbcdđéếghíklmnóốớpqrstúứvxýảẳẩbcdđẻểghỉklmnỏổởpqrstủửvxỷạặậbcdđẹệghịklmnọộợpqrstụựvxỵãẵẫbcdđẽễghĩklmnõỗỡpqrstũữvxỹAĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXYÀẰẦBCDĐÈỀGHÌKLMNÒỒỜPQRSTÙỪVXỲÁẮẤBCDĐÉẾGHÍKLMNÓỐỚPQRSTÚỨVXÝẠẶẬBCDĐẸỆGHỊKLMNỌỘỢPQRSTỤỰVXỴẢẲẨBCDĐẺỂGHỈKLMNỎỔỞPQRSTỦỬVXỶÃẴẪBCDĐẼỄGHĨKLMNÕỖỠPQRSTŨỮVXỸ]+'
    patURL = r"(?:http://|www.)[^\"]+"
    sent = re.sub(patURL,'website',sent)
    sent = re.sub(patHagTag,' hagtag ',sent)
    sent = re.sub('\.+','.',sent)
    sent = re.sub('(hagtag\\s+)+',' hagtag ',sent)
    sent = re.sub('\\s+',' ',sent)
    return sent

def tokenizer(text):
    token = ViTokenizer.tokenize(text)
    return token

def deleteIcon(text):
    text = text.lower()
    s = ''
    pattern = r"[a-zA-ZaăâbcdđeêghiklmnoôơpqrstuưvxyàằầbcdđèềghìklmnòồờpqrstùừvxỳáắấbcdđéếghíklmnóốớpqrstúứvxýảẳẩbcdđẻểghỉklmnỏổởpqrstủửvxỷạặậbcdđẹệghịklmnọộợpqrstụựvxỵãẵẫbcdđẽễghĩklmnõỗỡpqrstũữvxỹAĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXYÀẰẦBCDĐÈỀGHÌKLMNÒỒỜPQRSTÙỪVXỲÁẮẤBCDĐÉẾGHÍKLMNÓỐỚPQRSTÚỨVXÝẠẶẬBCDĐẸỆGHỊKLMNỌỘỢPQRSTỤỰVXỴẢẲẨBCDĐẺỂGHỈKLMNỎỔỞPQRSTỦỬVXỶÃẴẪBCDĐẼỄGHĨKLMNÕỖỠPQRSTŨỮVXỸ,._]"
    
    for char in text:
        if char !=' ':
            if len(re.findall(pattern, char)) != 0:
                s+=char
            elif char == '_':
                s+=char
        else:
            s+=char
    s = re.sub('\\s+',' ',s)
    return s.strip()

  

def clean_doc(doc,vi_stopwords):
    # print(type(doc))
    # if(type(doc)==str):
    #     print("floatdoc",doc)
    #     doc=str(doc)
    #     print("typedoc",type(doc))
    for punc in string.punctuation:
        doc = str(doc).replace(punc,' '+ punc + ' ')
    doc = normalText(doc)
    doc = deleteIcon(doc)
    doc = tokenizer(doc)
    doc = remove_stopword(doc,vi_stopwords)
    # Lowercase
    doc = doc.lower()
    # Removing multiple whitespaces
    doc = re.sub(r"\?", " \? ", doc)
    # Remove numbers
    doc = re.sub(r"[0-9]+", " num ", doc)
    # Split in tokens
    # Remove punctuation
    
    for punc in string.punctuation:
      if punc not in "_":
          
          doc = doc.replace(punc,' ')
    doc = re.sub('\\s+',' ',doc)
    return doc

def sort_keyword(coo_matrix):
    tuples = zip(coo_matrix.col, coo_matrix.data)
    return sorted(tuples, key=lambda x: (x[1], x[0]), reverse=True)

def extract_topn_from_vector(feature_names, sorted_items, topn=10):    
    sorted_items = sorted_items[:topn]

    score_vals = []
    feature_vals = []

    for idx, score in sorted_items:
        fname = feature_names[idx]
        
        score_vals.append(round(score, 3))
        feature_vals.append(feature_names[idx])

    results= {}
    for idx in range(len(feature_vals)):
        results[feature_vals[idx]]=score_vals[idx]
    
    return results

def calculate_of_corpus(docs):
    cv=CountVectorizer(max_df=0.85,encoding='utf-8', lowercase=True, preprocessor=None, tokenizer=None)
    word_count_vector=cv.fit_transform(docs)
    tfidf_transformer=TfidfTransformer(smooth_idf=True,use_idf=True)
    tfidf_transformer.fit(word_count_vector)
    return cv, tfidf_transformer

def extract_keyword_of_corpus(list_content):
    docs = []
    list_of_keyword_and_value=[]
    for data in list_content:
        docs.append(clean_doc(data,vi_stopwords))
    list_predict_keyword = []
    cv, tfidf_transformer = calculate_of_corpus(docs)
    feature_names=cv.get_feature_names()
    for doc in docs:
        tf_idf_vector=tfidf_transformer.transform(cv.transform([doc]))
        
        sorted_items= sort_keyword(tf_idf_vector.tocoo())
        keywords=extract_topn_from_vector(feature_names,sorted_items,5)
        list_of_keyword_and_value.append(keywords)
        output = "" 
        for k in keywords:
            output += k + ';'
        list_predict_keyword.append(output)    
    return list_predict_keyword

def extract_keyword_of_corpus_return_keyword_and_value(list_content):
    """
    The function is a clone from the original extract_keyword_of_corpus with returning the different result is a pair of keyword and its tfidf value
    """
    docs = []
    list_of_keyword_and_value=[]
    for data in list_content:
        docs.append(clean_doc(data,vi_stopwords))
    list_predict_keyword = []
    cv, tfidf_transformer = calculate_of_corpus(docs)
    feature_names=cv.get_feature_names()
    for doc in docs:
        tf_idf_vector=tfidf_transformer.transform(cv.transform([doc]))
        
        sorted_items= sort_keyword(tf_idf_vector.tocoo())
        keywords=extract_topn_from_vector(feature_names,sorted_items,5)
        
        output = "" 
        for key in keywords:
            # item = {}
            # item[key]=str(keywords[key])
            print("key", key)
            item =(key,keywords.get(key))
            output += str(item) + ';'
        list_of_keyword_and_value.append(output)
    print("list_of_keyword_and_value", list_of_keyword_and_value)
    return list_of_keyword_and_value
# Hàm tính so sánh các keywords được rút trích ra bởi phương pháp TF-IDF so các tags được gán nhãn
def compare_gold_exact(detected_keywords, gold_standard_keywords,keyword_separator=';'):
    tp_fp_all = []
    tp_fn_all = []
    tp = []
    for enx, keyword_set in enumerate(detected_keywords):
        gold_standard_set = gold_standard_keywords[enx]
        method_keywords = keyword_set.split(keyword_separator)
        gold_standard_set = gold_standard_set.split(keyword_separator)
        correct = 0
        for el in method_keywords:
            if el.lower() in gold_standard_keywords[enx].lower():
                correct += 1
        tp_fn = float(len(gold_standard_set))
        tp_fp = float(len(method_keywords))
        tp_fn_all.append(tp_fn)
        tp_fp_all.append(tp_fp)
        tp.append(correct)
    precision = sum(tp) / sum(tp_fp_all) 
    recall = sum(tp) / sum(tp_fn_all)
    try:
        F1 = 2 * (precision * recall) / (precision + recall)
    except:
        F1 = 0

    return precision, recall, F1


# if __name__ == '__main__':
# 	# Đọc dữ liệu
# 	list_content = []
# 	list_tags = []
# 	with open(evaluation_path,encoding='utf8') as csv_file:
# 		csv_reader = csv.reader(csv_file, delimiter=',')
# 		line_count = 0
# 		for row in csv_reader:
# 			if line_count == 0:
# 				print(f'Column names are {", ".join(row)}')
# 				line_count += 1
# 			else:
# 				if 'tự biên' not in row[1] and 'tự diễn' not in row[1] and 'suy nghĩ thêm' not in row[1]:
# 					list_content.append(row[0])
# 					list_tags.append(row[1].lower())
# 					line_count += 1
# 		print(f'Processed {line_count} lines.')
# 	# Tính toán thuật toán tf-idf cho ~ 3k dữ liệu và sau đó đối với từng file sẽ rút trích các keywords và trả về kết quả dưới dạng list
# 	list_predict_keyword = extract_keyword_of_corpus(list_content)
# 	# Tính toán precision, recall, f1 score được rút trích thuật toán TF-IDF vs dữ liệu gốc.
# 	precision, recall, F1 = compare_gold_exact(list_predict_keyword, list_tags)  
# 	print(precision, recall, F1)

article_datasetPath =os.path.join(sys.path[0], 'app/crawlermodule/service/articles_dataset.csv')
detail_datasetPath =os.path.join(sys.path[0],'app/crawlermodule/service/article_details.csv')

def get_all_categories(publisher_id):
    #print(sys.path[0])
    #print(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'))
    #print('2')
    try:
        with open(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'),  encoding="utf8") as jsonFile:
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

def statistic_keywords(list_of_keywords): 
    dict_result = {}
    for index,item in enumerate(list_of_keywords):
        array = item.split(";")
        for a in array:
            if a =="":
                continue
            else:    
                if a not in dict_result.keys():
                    dict_result[a] = str(index)
                else:
                    dict_result[a] = dict_result[a] + "_" + str(index)
    for key,value in dict_result.items():
        # print("key", key)
        # print("value", value)
        dict_result[key] = value.split("_")
    #print first 5 key:item from a dictionary
    # print("Hello_from_statistic_keyword")
    # first5pairs = {k: dict_result[k] for k in list(dict_result)[:5]}
    # print(first5pairs)
    return dict_result

def get_statistic_keywords(article_df): 
    """
    The function return a dictionary of keywords with a list of articles that mention it inside the content. 
    """
    dict_result = {}
    for index,item in enumerate(list(article_df['keyword'])):
        list_of_sub_str = item.split(";")
        for sub_str in list_of_sub_str:
            if sub_str =='':
                continue
            else :
                # json_acceptable_string = word.replace("'", "\"")
                # print("string of dictionary: ", json.loads(json_acceptable_string))
                # print("type of: ", type(json_acceptable_string))
                print("split_result:", re.split(r"(\(|\)|,|\s)",sub_str))
                print("split_result:", len(re.split(r"(\(|\)|,|\s)",sub_str)))
                result_list = re.split(r"(\(|\)|,|\s)",sub_str)
                print("type", type(result_list[2]), "value", result_list[2].replace("\'",""))
                print("type", type(result_list[6]), "value", result_list[6])
                word= result_list[2].replace("\'","")
                tfidf_value = result_list[6] 
                
                   
                if word not in dict_result.keys():
                    _value = article_df.iloc[index]
                    # print(_value)
                    # for x in _value:
                    #     print(str(x))
                    str_value = '~~~'.join(map(str,_value))
                    # add "tfidf value" field in str_value
                    str_value = str_value + '~~~'+ str(tfidf_value)
                    dict_result[word] = str_value
                    # print(str_value)
                    # dict_result[word] = str(index)
                else:
                    _value = article_df.iloc[index]
                    str_value = '~~~'.join(map(str,_value))
                    str_value = str_value + '~~~'+ str(tfidf_value)
                    dict_result[word]=dict_result[word]+"@@@"+str_value
                    # dict_result[word] = dict_result[a] + "_" + str(index)
    for key,value in dict_result.items():
        dict_result[key] = value.split("@@@") 
    #print first 5 key:item from a dictionary
    # print("Hello_from_statistic_keyword")
    # first5pairs = {k: dict_result[k] for k in list(dict_result)[:2]}
    # print(first5pairs) 
    return dict_result

def convert_string_to_date_full(_str):
    return dt.datetime.strptime(_str,"%d-%m-%Y %H:%M:%S").date()

def ranking_by_numbers_of_articles(dict_of_statictis_keywords):
    # for key, value in dict_of_statictis_keywords.items():
    #     # print("key", key)
    #     # print("value", value)
    #     # break
    #     value = sorted(value, key=lamda) 
    # ranking_keyword_follow_number_of_articles = sorted(dict_of_statictis_keywords.items(), key = lambda x: len(dict_of_statictis_keywords.values()), reverse=False)
    # print(type(ranking_keyword_follow_number_of_articles))
    # convert_to_ranking_dict =defaultdict(list)
    # for key, value in ranking_keyword_follow_num(ber_of_articles:
    #     convert_to_ranking_dict[key]=value
    # return convert_to_ranking_dict
     #return ranking_keyword_follow_number_of_articles

    dict_article_arr_len = {key: len(value) for key, value in dict_of_statictis_keywords.items()}
    import operator
    sorted_key_list = sorted(dict_article_arr_len.items(), key=operator.itemgetter(1), reverse=True)
    sorted_list =  [{item[0]:dict_of_statictis_keywords[item [0]]} for item in sorted_key_list]
    return sorted_list
   
def get_top_keyword():
    print("Analyzing ...")
    with open(os.path.join(sys.path[0], 'app\crawlermodule\service\publisher.json'),  encoding="utf8") as jsonFile:
        data = json.load(jsonFile)
        # get categories of thn e first publisher in list
        category_list = data["publisher"][0]['category']

    # get dateset
    article_df = pd.read_csv(article_datasetPath)
    detail_df = pd.read_csv(detail_datasetPath)
    #get lastest date
    lastest_update_date = detail_df['updateTime'].apply(convert_string_to_date_full).max()
    #print(lastest_update_date)
    #get lastest details date
    lastest_details = detail_df[detail_df['updateTime'].apply(convert_string_to_date_full) == lastest_update_date]

    #standardize like rates data
    _likeRate = pd.Series(lastest_details['likeRate'].replace({'K': '*1000', ',':'.'}, regex=True).map(pd.eval),dtype=int)
    # delete old likeRate col
    lastest_details.drop(columns=['likeRate'],inplace=True)
    #update standardized likeRate col
    lastest_details['likeRate']=_likeRate
    #sort likeRate descending and drop duplicated values
    lastest_details = lastest_details.sort_values('likeRate', ascending=False).drop_duplicates(['article_id'])
    # merge details table with articles table to create new dataset 
    new_dataset = article_df.merge(lastest_details[['article_id', 'likeRate', 'updateTime']], left_on='id', right_on='article_id', how='inner')[['id', 'content','likeRate','updateTime','category_id', 'title', 'url']]
    # sort new dataset by likeRate descending
    ranking_df = new_dataset.sort_values('likeRate',ascending=False)
    # print(article_df)
    # get current articles
    # current_articles = article_df.head(100)
    current_articles = ranking_df
    category_list = current_articles['category_id'].unique()
    print("cate", category_list)
    # current_articles = current_articles.groupby('category_id')    
    # print(current_articles['content'][0])
    keyword_api={}
    # for cate in category_list:
    #     # get articles in current cate
    #     articles_in_cate= current_articles.get_group(cate)
    #     print(len(articles_in_cate))
    #     # get keyword in all articles in current cate
    #     # print(list(articles_in_cate['content']))
    #     keyword_in_cate =extract_keyword_of_corpus(list(articles_in_cate['content']))
    #     # get top keywords
    #     {
    #         #do some stuff here
    #     }
    #     # create json string 
    #     keyword_api[str(cate)]=keyword_in_cate

    content_list = list(current_articles["content"])
    # for index, doc in enumerate(content_list):
        # print(type(doc))
        # print(index)
        # print(doc)
    keyword_list = extract_keyword_of_corpus_return_keyword_and_value(content_list)
    
    current_articles["keyword"]=keyword_list
    # keyword_corpus_articles = statistic_keywords(current_articles["keyword"])
    keyword_corpus_articles = get_statistic_keywords(current_articles)
    #print("type of keyword_corpus_articles", type(keyword_corpus_articles))

    # ranking_keyword_follow_number_of_articles = sorted(keyword_corpus_articles.items(), key = lambda x:len(keyword_corpus_articles.values()), reverse=True)
    # print(type(ranking_keyword_follow_number_of_articles))
    # convert_to_ranking_dict =defaultdict(list)
    # for key, value in ranking_keyword_follow_number_of_articles:
    #     convert_to_ranking_dict[key]=value

    # print("ranking_list: ",ranking_keyword_follow_number_of_articles)
    # print(keyword_corpus_articles)
    # print(keyword_in_articles) 
    # print(current_articles[0])
    # print(current_articles)
    print("FIX")
    current_articles = current_articles.groupby(["category_id"])
    # category_list = current_articles['category_id'].unique()

    #print(category_list)
    print("----------------")
    for cat in category_list:
        # list_keywords = list(current_articles.get_group(cat)['keyword'])
        _df = current_articles.get_group(cat)
        #print(_df)
        # keyword_in_cat = statistic_keywords(list_keywords)
        keyword_in_cat = get_statistic_keywords(_df)
        #print("KW:")
        #print(keyword_in_cat)
        cat_keyword_articles={}
        for key, value in keyword_in_cat.items():
          
            cat_keyword_articles[key]=keyword_corpus_articles.get(key)
        keyword_api[str(cat)] = ranking_by_numbers_of_articles(cat_keyword_articles)
        
    # write result into file
    new_data ={}
    current_date = date.today() 
    new_data['date']=str(current_date)
    new_data['result']=keyword_api
    # new_data_df = pd.DataFrame({'date':[current_date],'result':[keyword_api]}, index=[0])
    # print(new_data_df)
    try:
        with open(word_cloud_path, mode='w', encoding='utf-8') as json_file:
            json.dump(new_data, json_file, ensure_ascii=False)
    except Exception as e:
        print("get_top_keyword() catches error: ", e)
    finally:
        return keyword_api

def extract_keyword_from_url(url):
    return list_keywords

def extract_keyword_from_paragraph(paragraph):
    extract_keyword_of_corpus(list(paragraph))
    return list_keywords
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# word_cloud api structure:
# [
#          {"keyword1": value1},
#          {"keyword2": value2},
#          {"keyword3": value3}] 
def swap(x,y): 
        temp = x
        x =y 
        y = temp
def get_average_like_rates_of_keyword(list_of_like_rates):
    return sum(list_of_like_rates)/len(list_of_like_rates)
def get_bigger_tfidf_value(current_tfidf_value_1,current_tfidf_value_2 ):
    if current_tfidf_value_1 > current_tfidf_value_2:
        return current_tfidf_value_1
    else:
        return current_tfidf_value_2

def initialize_word_cloud_object(keyword, list_of_articles):
    _value = {}
    like_rates=[]
    tfidf_max_value =0

    _value['number_of_articles'] = len(list_of_articles)
    for article in list_of_articles:
        _arr = article.split("~~~")
        like_rates.append(int(_arr[2]))
        current_tfidf_value = float(_arr[8])
        print("current_tfidf_value_before",current_tfidf_value)
        tfidf_max_value = get_bigger_tfidf_value(current_tfidf_value, tfidf_max_value)
    _value['average_like_rate']=get_average_like_rates_of_keyword(like_rates)
    _value['max_tfidf']=tfidf_max_value
    _result_object={}
    _result_object[keyword]=_value
    return _result_object


    
def generate_word_cloud_api():
    word_cloud_api={}
    with open(word_cloud_path, "r", encoding="utf8") as json_file:
        data=json.load(json_file)
        data_api = data['result']
    for category, word_list in data_api.items():
        list_keyword_in_category=[]
        for word_object in word_list:
            for keyword, list_of_articles in word_object.items():
                list_keyword_in_category.append(initialize_word_cloud_object(keyword, list_of_articles))
                # print("likeRate", len(likeRates))
                # print("tfidfValue", len(tfidfValue))
        word_cloud_api[category]=list_keyword_in_category
    return word_cloud_api