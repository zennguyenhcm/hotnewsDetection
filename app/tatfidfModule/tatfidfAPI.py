from flask import request, Blueprint, jsonify
from app.tatfidfModule import tatfidf_service as tatfidfService

# Create blueprint
tatfidf_page = Blueprint("tatfidf_page", __name__, template_folder="templates")

# Routing
@tatfidf_page.route("/tatfidf", methods=["POST", "GET"])
def tatfidf():
    print("TATFIDF analyzing ...")
    response = jsonify(tatfidfService.tatfidf_hotnewsAnalyze(20))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
