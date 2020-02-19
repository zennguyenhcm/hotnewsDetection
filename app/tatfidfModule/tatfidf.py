import math
from math import log
import numpy as np
import pandas as pd
from app.tatfidfModule import tokenizer

from sklearn.feature_extraction.text import (
    CountVectorizer,
    TfidfTransformer,
    TfidfVectorizer,
)
import operator


class Tatfidf:
    # Constructor
    def __init__(self, documents):
        self.documents = documents
        self.N = 0
        self.n = 0
        self.data = None
        self.copus = []
        self.copus_matrix = []
        self.copus_feature_matrix = []
        self.all_features = []
        self.tokenizer = tokenizer.Tokenizer()
        self.adjust_time = []
        self.adjust_attention = []
        self.adjust_idf = []
        self.idf = []
        self.tf = []
        self.ta_idf = []
        self.ta_tf_idf = []
        self.top_keywords = []
        self.top_documents = []
        self.time_distribute = []
        self.norm_list = []

    def init(self, n=0):
        self.N = len(self.documents.index)
        if 0 < n < self.N:
            self.n = n
        else:
            self.n = self.N

        df = self.documents[
            ["published_date", "title", "url", "content", "page_view"]
        ].head(self.n)
        df["time"] = pd.to_datetime(df["published_date"], format="%Y-%m-%d %H:%M:%S")
        df = df.set_index("time")
        self.data = df
        self.copus = self.data["content"].values.tolist()

        cv = CountVectorizer(
            self.copus,
            tokenizer=self.tokenizer.vi_term_tokenize,
            lowercase=False,
            min_df=1,
            max_df=0.85,
        )
        cv.fit_transform(self.copus)
        self.all_features = cv.get_feature_names()

        for i in range(0, len(self.copus)):
            self.copus_matrix.append(dict.fromkeys(self.all_features, 0))

        for index, feature_vector in enumerate(self.copus_matrix):
            tokens = self.tokenizer.vi_term_tokenize(self.copus[index])
            if len(tokens) == 0:
                print(index)
                print(self.data.iloc[index])
            self.copus_feature_matrix.append(tokens)
            for token in tokens:
                if token in feature_vector:
                    feature_vector[token] += 1

    def __compute_tf(self, word_dict, l):

        tf = {}
        sum_nk = len(l)
        for word, count in word_dict.items():
            tf[word] = count / sum_nk
        return tf

    def __compute_idf(self, docs_vector):
        n = len(docs_vector)
        idf = dict.fromkeys(docs_vector[0].keys(), 0.0)
        for document in docs_vector:
            for word, count in document.items():
                if count > 0:
                    idf[word] += 1.0

        for word, v in idf.items():
            idf[word] = log(n / (1.0 + float(v)))

        return idf

    def __compute_tf_idf(self, tf, idf):
        tf_idf = dict.fromkeys(tf.keys(), 0)
        for word, v in tf.items():
            tf_idf[word] = v * idf[word]
        return tf_idf

    def compute_tf(self):
        tfs = []
        for index, doc in enumerate(self.copus_matrix):
            tfs.append(
                self.__compute_tf(
                    self.copus_matrix[index], self.copus_feature_matrix[index]
                )
            )
        return tfs

    def compute_idf(self):
        idf = self.__compute_idf(self.copus_matrix)
        return idf

    def __ajust_attention(self, attention):

        limit_value = 20000.0
        beta = 2.0
        if 0 < attention < limit_value:
            return (log(attention) / log(limit_value)) * beta

        if attention >= limit_value:
            return beta

        return 0.0

    #
    def compute_ajust_attention(self):
        ajust_attention = dict.fromkeys(self.all_features, 1)
        token_list = []

        for index, row in enumerate(self.data[["page_view"]].values.tolist()):
            token_list.append([self.copus_feature_matrix[index], row[0]])

        for term in ajust_attention:
            n = 0
            for index, row in enumerate(token_list):
                if term in row[0]:
                    ajust_attention[term] += row[1]
                    n += 1
            if n > 0:
                ajust_attention[term] = self.__ajust_attention(
                    ajust_attention[term] / n
                )

        return ajust_attention

    #
    def __ajust_time(self, weight):

        limit_value = 1000.0
        beta = 2.0
        if 0 <= weight <= 1:
            return weight
        if 1 < weight < limit_value:
            return (log(weight) / log(limit_value)) * (beta - 1) + 1
        if weight >= limit_value:
            return beta
        return 0.0

    #
    def compute_ajust_time(self):
        idf_list = []
        for _, group in self.data.groupby(pd.Grouper(freq="2D")):
            document_group_word_dict = []

            document_group_content = group["content"].values.tolist()
            for document in document_group_content:
                document_group_word_dict.append(dict.fromkeys(self.all_features, 0.0))
            if len(document_group_word_dict) == 0:
                continue

            count = 0
            for index, document_token_vector in enumerate(document_group_word_dict):
                document_tokens = self.tokenizer.vi_term_tokenize(
                    document_group_content[count]
                )
                for token in document_tokens:
                    if token in document_token_vector:
                        document_token_vector[token] += 1
                count = count + 1

            without_token = log(len(document_group_word_dict) / 1.0)
            idf = self.__compute_idf(document_group_word_dict)
            idf_list.append([idf, without_token])

        adjust_time = {}

        self.time_distribute = idf_list

        for token in self.all_features:
            vals = []
            vals_without_token = []
            for x in idf_list:
                vals.append(x[0][token])
                if x[0][token] == x[1]:
                    vals_without_token.append(x[0][token])

            sd = np.std(vals, dtype=np.float64, ddof=0)
            sd_x = (
                np.std(vals_without_token, dtype=np.float64, ddof=1)
                if len(vals_without_token) > 0
                else 0.0
            )

            adjust_time[token] = self.__ajust_time(sd / (1 + sd_x))
        return adjust_time

    def compute_ajust_idf(self):
        alpha = 0.4
        ajust_idf = dict.fromkeys(self.all_features, 0.0)
        for word in self.all_features:
            ajust_idf[word] = (
                alpha * self.adjust_time[word]
                + (1 - alpha) * self.adjust_attention[word]
            )
        return ajust_idf

    def compute_ta_idf(self):
        ta_idf = dict.fromkeys(self.all_features, 0.0)
        for word in self.all_features:
            ta_idf[word] = self.adjust_idf[word] * self.idf[word]
        return ta_idf

    def compute_ta_tf_idf(self):
        ta_tf_idfs = []
        for index, _ in enumerate(self.copus_feature_matrix):
            ta_tf_idfs.append(self.__compute_tf_idf(self.tf[index], self.ta_idf))
        return ta_tf_idfs

    def get_top_keywords(self, top=20):
        k = 30
        features_count = len(self.ta_tf_idf[0])
        if k > features_count:
            k = features_count

        candidate_words = []

        for row in self.ta_tf_idf:
            sorted_row = sorted(row.items(), key=operator.itemgetter(1), reverse=True)
            for i in range(k):
                if sorted_row[i][1] > 0:
                    candidate_words.append((sorted_row[i][0], sorted_row[i][1]))
        candidate_words = list(set([i for i in candidate_words]))
        sort = sorted(candidate_words, key=operator.itemgetter(1), reverse=True)
        return sort[:top]

    def get_top_documents(self):
        documents = []
        for term in self.top_keywords:
            for index, vector in enumerate(self.copus_feature_matrix):
                if term[0] in vector:
                    documents.append(self.data.iloc[index].values.tolist()[:4])
        return documents

    def fit(self):
        self.tf = self.compute_tf()
        self.idf = self.compute_idf()
        self.adjust_attention = self.compute_ajust_attention()
        self.adjust_time = self.compute_ajust_time()
        self.adjust_idf = self.compute_ajust_idf()
        self.ta_idf = self.compute_ta_idf()
        self.ta_tf_idf = self.compute_ta_tf_idf()
        self.top_keywords = self.get_top_keywords()
        self.top_documents = self.get_top_documents()
