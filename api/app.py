from datetime import datetime
from datetime import timedelta
import tornado.ioloop
import tornado.web
import json
import resrobot
import gtfs

from collections import deque

def format_json(data):
    return json.dumps(data, indent=4, sort_keys=True)


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        print("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', ' PUT, DELETE, OPTIONS')
        self.set_header('Content-Type', 'application/json')

    def options(self):
        # no body
        self.set_status(204)
        self.finish()


class MainHandler(BaseHandler):
    def get(self):
        self.write("Hello, world!\n")


class GetStopsAlongRouteHandler(tornado.web.RequestHandler):
    def get(self):
        train_number = self.get_query_argument('trainNumber')
        trip = gtfs.session.query(gtfs.Trip).filter_by(trip_short_name=train_number).first()
        stop_times = trip.stop_times
        stop_times.sort(key=lambda x: int(x.departure_time.split(':')[0]))

        now = datetime.now().date()

        data = []
        for stop_time in stop_times:
            arrival = [int(n) for n in stop_time.arrival_time.split(':')]
            departure = [int(n) for n in stop_time.departure_time.split(':')]

            arrival_td = timedelta(hours=arrival[0], minutes=arrival[1], seconds=arrival[2])
            departure_td = timedelta(hours=departure[0], minutes=departure[1], seconds=departure[2])

            arrival_iso = (datetime(now.year, now.month, now.day) + arrival_td).isoformat()
            departure_iso = (datetime(now.year, now.month, now.day) + departure_td).isoformat()

            data.append(
                {
                    'name': stop_time.stop.stop_name,
                    'coords': {
                        'lat': stop_time.stop.stop_lat,
                        'long': stop_time.stop.stop_lon
                    },
                    'arrivalTime': arrival_iso,
                    'departureTime': departure_iso
                }
            )

        self.write(format_json(data))


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
    print("Hej.")
    tornado.ioloop.IOLoop.current().start()


