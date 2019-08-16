from flask import Flask, render_template
import json

from datetime import datetime
from datetime import timedelta

app = Flask(__name__)

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

@app.route("/")
def home():
    return "Hello :)"


def format_json(data):
    return json.dumps(data, indent=4, sort_keys=True)

@app.route("/GetStopsAlongRoute")
def getStopsAlongRoute():
    data = []
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

    data.append(stop1.to_json())
    data.append(stop2.to_json())
    data.append(stop3.to_json())

    return format_json(data)

if __name__ == "__main__":
    app.run(debug=True, port=1337)

