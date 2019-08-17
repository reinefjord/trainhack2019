import config
import requests
from datetime import datetime
from pprint import pprint

def _do_get(endpoint, query):
    query['key'] = config.resrobot_reseplanerare
    query['format'] = 'json'

    try:
        r = requests.get('https://api.resrobot.se/v2/' + endpoint, params=query)
    except:
        return False

    return r.json()

def search_routes(when: datetime, origin, dest):
    """
    args:
        when - the earliest departure time to search for
        origin - pair of latitude and longitude of the origin location
        dest - pair of latitude and longitude of the destination location
    """
    return _do_get('trip', {
            'date': when.strftime('%Y-%m-%d'),
            'time': when.strftime('%H:%M'),
            'originCoordLat': origin[0],
            'originCoordLong': origin[1],
            'destCoordLat': dest[0],
            'destCoordLong': dest[1]
        })
