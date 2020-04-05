from flask import Flask, jsonify
from flask_restplus import Resource, Api
from pubmed_api import pubmed
from biorxiv_api import biorxiv
from medrxiv_api import medrxiv
import math
import json
import requests
import datetime
import re
from statistics import mean
import uuid
import numpy as np
import asyncio
import re
from metrics import pp_index
import uuid

app = Flask(__name__)
api = Api(app)


@api.route('/search/<string:search_param>/<int:numResults>')
class SciSearch(Resource):
    def get(self, search_param, numResults):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        #result = loop.run_until_complete(asyncio.gather(biorxiv(search_param, numResults), pubmed(search_param, numResults), medrxiv(search_param, numResults)))
        result = loop.run_until_complete(asyncio.gather(
            biorxiv(search_param, numResults), pubmed(search_param, numResults)))

        final_list = []
        for element in result:
            for papers in element:
                final_list.append(papers)

        final_ppindex = []
        for entry in final_list:
            try:
                gdc = entry['gdc']
                pfc = entry['pfc']
                year = re.findall("\d{4}", entry['pubDate'])[0]
                yearsPassed = 2020 - (int(year) - 0.01)
                ppIndex = pp_index(gdc, pfc, yearsPassed)
                final_ppindex.append(ppIndex)
            except:
                # no results found (usually medRxiv or bioRxiv when down)
                final_ppindex.append(0)
                pass

        if mean(final_ppindex) == 0:
            normalized_pp = final_ppindex
        else:
            normalized_pp = [x/mean(final_ppindex) for x in final_ppindex]

        for i in range(len(final_ppindex)):
            final_list[i]['ppindex'] = normalized_pp[i]
            final_list[i]['ID'] = uuid.uuid4()

        # return serialized JSON
        return jsonify({'results': final_list})


if __name__ == "__main__":
    app.run(debug=True)
