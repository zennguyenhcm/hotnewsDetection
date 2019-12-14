from flask import request, Blueprint
import app.modulehelloworld.service.hello_world as hw

# Create blueprint
simple_page = Blueprint('simple_page', __name__,
                        template_folder='templates')

# Sample routing
@simple_page.route('/hello', methods=['POST', 'GET'])
def hello():
    return 'Hello, World'


@simple_page.route('/helloworld', methods=['POST', 'GET'])
def hello_message():
    name = request.values.get("name")
    return hw.hello_world(name)
