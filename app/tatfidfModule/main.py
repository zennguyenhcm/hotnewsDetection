
import tatfidf
import pandas as pd
import operator

def main():
    df = pd.read_csv('data_2020_02_03.csv')
    c = tatfidf.Tatfidf(df)
    c.init()
    c.fit()
    pd.DataFrame(c.documents)



if __name__ == '__main__':
    main()
