
from datetime import datetime
from datetime import timedelta
import tornado.ioloop
import tornado.web
import json
import resrobot

from collections import deque

cache = [
    {
        'type': "resrobotv1",
        'params': {'from': 'Stockholm', 'to': 'Göteborg'},
        'timestamp': datetime.now().isoformat(),
        'response': ['Rutt1', 'Rutt2'],
    },
    {
        'type': "resrobotv1",
        'params': {'from': 'Stockholm', 'to': 'Malmö'},
        'timestamp': datetime.now().isoformat(),
        'response': ['Rutt1', 'Rutt2'],
    },
]

def format_json(data):
    return json.dumps(data, indent=4, sort_keys=True)

class BaseHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        print("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', ' PUT, DELETE, OPTIONS')

    def options(self):
        # no body
        self.set_status(204)
        self.finish()
class Stop:
    def __init__(self, id, name, arrivaltime, departuretime):
        self.id = id
        self.name = name
        self.arrivaltime = arrivaltime
        self.departuretime = departuretime

    def to_json(self):
        data = {
            'id':           self.id,
            'name':         self.name,
            'arrivaltime':  self.arrivaltime.isoformat(),
            'departuretime':self.departuretime.isoformat()
        }
        return data

class MainHandler(BaseHandler):
    def get(self):
        self.write("Hello, world!\n")

class GetStopsAlongRouteHandler(tornado.web.RequestHandler):
    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        data = {'data':[]}
        stop1 = Stop(
            id=123,
            name="Stockholm",
            arrivaltime = datetime.now(),
            departuretime = datetime.now()+timedelta(minutes=10)
        )
        stop2 = Stop(
            id=456,
            name="Hässleholm",
            arrivaltime = datetime.now()+timedelta(hours=1),
            departuretime = datetime.now()+timedelta(hours=1, minutes=10)
        )
        stop3 = Stop(
            id=789,
            name="Malmö",
            arrivaltime = datetime.now()+timedelta(hours=2),
            departuretime = datetime.now()+timedelta(hours=2, minutes=10)
        )

        data['data'].append(stop1.to_json())
        data['data'].append(stop2.to_json())
        data['data'].append(stop3.to_json())

        self.write(data)

class GetAlternativeRoutesHandler(BaseHandler):
    def get(self):
        when = datetime.strptime( \
                self.get_query_argument('departure_time'), "%Y-%m-%dT%H:%M:%S.%fZ")
        origin = (self.get_query_argument('origin_lat'),
                self.get_query_argument('origin_long'))
        dest = (self.get_query_argument('dest_lat'),
                self.get_query_argument('dest_long'))

        results = resrobot.search_routes(when, origin, dest)
        self.write(results)

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/GetStopsAlongRoute", GetStopsAlongRouteHandler),
        (r"/GetAlternativeRoutes", GetAlternativeRoutesHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(1337)
    tornado.ioloop.IOLoop.current().start()


