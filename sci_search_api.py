from flask import Flask, jsonify
from flask_restplus import Resource, Api
from google_api import google

app = Flask(__name__)
api = Api(app)

@api.route('/search/<string:search_param>/<int:page_number>')
class HelloWorld(Resource):
    def get(self, search_param, page_number):
        
        search_params = search_param
        page_num = page_number
        result = google(search_params, page_num)

        # return results of search here
        return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)