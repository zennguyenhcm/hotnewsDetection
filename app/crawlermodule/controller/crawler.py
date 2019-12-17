from flask import request, Blueprint, jsonify
from app.crawlermodule.service import crawl_service as crawlerService

# Create blueprint
crawler_page = Blueprint("crawler_page", __name__, template_folder="templates")

# Sample routing
@crawler_page.route("/crawler", methods=["POST", "GET"])
def crawl_data():
    return crawlerService.crawl_all_articles_in_category(
        "1", "http://cafef.vn/thoi-su.rss", "1"
    )


@crawler_page.route("/home", methods=["POST", "GET"])
def initalize():
    print("hello")
    response = crawlerService.get_all_publishers()
    print(response)
    return jsonify(response)


# @simple_page.route('/helloworld', methods=['POST', 'GET'])
# def hello_message():
#     name = request.values.get("name")
#     return hw.hello_world(name)

