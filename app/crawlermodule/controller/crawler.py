from flask import request, Blueprint
import app.crawlermodule.service.crawl_service as crawler

# Create blueprint
crawler_page = Blueprint("crawler_page", __name__, template_folder="templates")

# Sample routing
@crawler_page.route("/crawler", methods=["POST", "GET"])
def crawl_data():
    return crawler.document_crawler()


# @simple_page.route('/helloworld', methods=['POST', 'GET'])
# def hello_message():
#     name = request.values.get("name")
#     return hw.hello_world(name)

