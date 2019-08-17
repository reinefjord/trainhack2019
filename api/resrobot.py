import config
import requests
from datetime import datetime
from pprint import pprint
from dateutil import tz

def _do_get(endpoint, query):
    query['key'] = config.resrobot_reseplanerare
    query['format'] = 'json'

    try:
        r = requests.get('https://api.resrobot.se/v2/' + endpoint, params=query)
    except:
        return False

    return r.json()

def search_routes(when_utc: datetime, origin, dest):
    """
    args:
        when - the earliest departure time to search for
        origin - pair of latitude and longitude of the origin location
        dest - pair of latitude and longitude of the destination location
    """
    from_zone = tz.gettz('UTC')
    to_zone = tz.gettz('Europe/Stockholm')
    when_utc = when_utc.replace(tzinfo=from_zone)
    when_local = central = when_utc.astimezone(to_zone)

    return _do_get('trip', {
            'date': when_local.strftime('%Y-%m-%d'),
            'time': when_local.strftime('%H:%M'),
            'originCoordLat': origin[0],
            'originCoordLong': origin[1],
            'destCoordLat': dest[0],
            'destCoordLong': dest[1]
        })
