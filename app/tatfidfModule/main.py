
import tatfidf
import pandas as pd


# def main():
#     df = pd.read_csv('data.csv')
#     c = tatfidf.Tatfidf(df)
#     c.init(10)
#     c.fit()

#     for doc in c.get_top_documents():
#         print(doc[1], "|", doc[2], "|", doc[0])



# if __name__ == '__main__':
#     main()

def tatfidf_hotnewsAnalyze():
    
    df = pd.read_csv('data.csv')
    c = tatfidf.Tatfidf(df)
    c.init(10)
    c.fit()

    # for doc in c.get_top_documents():
    #     print(doc[1], "|", doc[2], "|", doc[0])
    return c.get_top_documents()
