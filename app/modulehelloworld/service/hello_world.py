from app.modulehelloworld.model.repository.user_repo import *


def hello_world(name):
    if name is None or len(name) == 0:
        return "Hello World!!!"
    else:
        user = get_user_by_name(name)
        if user is not None:
            return "Hello, "+name+"\n"+"email: "+user.email+"\n"+"phone: "+user.phone
        return "No user in dbs, Hello "+name



