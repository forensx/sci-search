from flask import Flask, jsonify
from flask_restplus import Resource, Api
from google_api import google
from pubmed_api import pubmed
from bioarchive_api import bioarchive
import math

app = Flask(__name__)
api = Api(app)

@api.route('/search/<string:search_param>/<int:numResults>')
class e(Resource):
    def get(self, search_param, numResults):
        search_params = search_param
        page_num = numResults
        pubmed_result = pubmed(search_params, page_num)
        biorxiv_result = bioarchive(search_params, page_num)
        scholar_result = google(search_params, math.ceil(page_num/10))
        pubmed_arr = pubmed_result['results']
        biorxiv_arr = biorxiv_result['results']
        scholar_arr = scholar_result['results']
        combined = pubmed_arr + biorxiv_arr + scholar_arr
        # return results of search here
        return jsonify({'results': combined})


if __name__ == '__main__':
    app.run(debug=True)
