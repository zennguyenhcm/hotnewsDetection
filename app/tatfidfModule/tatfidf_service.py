from app.tatfidfModule.tatfidf import Tatfidf
import pandas as pd
import os
import sys
import json

#  this function is to fix the error TypeError: Object of type int64 is not JSON serializable"
def convert_to_normal_array(arr_type_int64):
    new_arr = []
    for value in arr_type_int64:
        new_arr.append(str(value))

    return new_arr


def tatfidf_hotnewsAnalyze():

    path = os.path.join(sys.path[0], "app/tatfidfModule/data.csv")
    df = pd.read_csv(path)
    c = Tatfidf(df)
    c.init(10)
    c.fit()

    print(c.get_top_documents())
    result_dict = {}
    for doc in enumerate(c.get_top_documents()):
        print("type of doc[1]:", type(doc[1]))
        result_dict[str(doc[0])] = convert_to_normal_array(doc[1])
    # print(result_dict)
    return result_dict

    # print("type_of_return_of_function_get_top_documents", type(c.get_top_documents()))
    # result_str = str(c.get_top_documents())

    # return json.dumps(result_str, ensure_ascii=False)
