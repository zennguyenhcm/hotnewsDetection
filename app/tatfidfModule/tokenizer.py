import pyvi
from pyvi import ViTokenizer
from  app.tatfidfModule import stop_words
import re


class Tokenizer():
    def __init__(self):
        pass

    def __standarlize_duplicate_token(self, tokens):
        length = len(tokens)
        for i in range(0, length - 2):
            for j in range(i + 1, length - 1):
                if tokens[i].lower() == tokens[j].lower():
                    tokens[j] = tokens[i]
        return tokens


    def __remove_links(self, text):
        text = re.sub(r'https?:\/\/(www\.)?[-a-zA-Z0–9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#?&//=]*)',
                      '', text, flags=re.MULTILINE)
        text = re.sub(r'[-a-zA-Z0–9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#?&//=]*)', '', text,
                      flags=re.MULTILINE)
        return text


    def __remove_img(self, text):
        text = re.sub(r'img_[0-9a-fA-F-]+', '', text, flags=re.MULTILINE)
        return text


    def __remove_html_tags(self, text):
        clean = re.compile('<.*?>')
        return re.sub(clean, '', text)

    def vi_term_tokenize(self, text):
        tokens = []
        text = self.__remove_html_tags(text)

        terms = ViTokenizer.tokenize(text)
        for term in terms.split(" "):
            if term.lower() not in stop_words.STOP_WORDS:
                if ("_" in term) or (term.isalpha() == True) and (
                        len(term) >= 3):
                    tokens.append(term)
        tokens = self.__standarlize_duplicate_token(tokens)
        return tokens
