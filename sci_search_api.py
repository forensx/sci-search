from flask import Flask, jsonify
from flask_restplus import Resource, Api
#from google_api import google
from pubmed_api import pubmed
from bioarchive_api import bioarchive

app = Flask(__name__)
api = Api(app)

@api.route('/search/<string:search_param>/<int:page_number>')
class e(Resource):
    def get(self, search_param, page_number):
        
        search_params = search_param
        page_num = page_number

        pubmed_result = pubmed(search_param, page_num)
        biorxiv_result = bioarchive(search_param, page_num)

        
        #result = google(search_params, page_num)

        # return results of search here
        return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)