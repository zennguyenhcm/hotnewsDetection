from flask import request, Blueprint, jsonify
from app.keywordExtrationModule.service import tf_idf as tf_idf_extractor


# Create blueprint
hotKeywordAnalyzer_page = Blueprint(
    "hotKeywordAnalyzer_page", __name__, template_folder="templates"
)

# Routes
# get list of hot keyword in each category
@hotKeywordAnalyzer_page.route("/hotKeywordAnalyzer", methods=["POST", "GET"])
def getKeywordsList():
    response = jsonify(tf_idf_extractor.get_top_keyword())
    response.headers.add("Access-Control-Allow-Origin", "*")
    print("Analyzing done!")
    return response


# get list of keyword from content
# input: url or content
@hotKeywordAnalyzer_page.route("/keywordExtractor", methods=["POST", "GET"])
def fool1():
    return "Hello1"

@hotKeywordAnalyzer_page.route("/wordCloud", methods=["POST", "GET"])
def generate_keyword_cloud():
    response = jsonify(tf_idf_extractor.generate_word_cloud_api())
    response.headers.add("Access-Control-Allow-Origin", "*")
    print("Analyzing done!")
    return response
