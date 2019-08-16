from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.types import DECIMAL, TIME
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

engine = create_engine('sqlite:///:memory:', echo=True)
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()


class Agency(Base):
    __tablename__ = 'agencies'

    agency_id = Column(Integer, primary_key=True)
    agency_name = Column(String)
    agency_url = Column(String)
    agency_timezone = Column(String)
    agency_lang = Column(String)

    routes = relationship("Route", back_populates='agencies')


class Stop(Base):
    __tablename__ = 'stops'

    stop_id = Column(Integer, primary_key=True)
    stop_name = Column(String)
    stop_lat = Column(DECIMAL(8, 6))
    stop_lon = Column(DECIMAL(8, 6))

    stop_times = relationship("StopTime", back_populates="stop")


class Route(Base):
    __tablename__ = 'routes'

    route_id = Column(Integer, primary_key=True)
    agency_id = Column(Integer, ForeignKey('agencies.agency_id'))
    route_short_name = Column(String)
    route_long_name = Column(String)
    route_type = Column(Integer)
    route_url = Column(String)

    agencies = relationship("Agency", back_populates='routes')
    trips = relationship("Trip", back_populates='route')


class Trip(Base):
    __tablename__ = 'trips'

    trip_id = Column(Integer, primary_key=True)
    trip_headsign = Column(String)
    trip_short_name = Column(String)
    route_id = Column(Integer, ForeignKey('routes.route_id'))
    service_id = Column(Integer)

    route = relationship("Route", back_populates='trips')


class StopTime(Base):
    __tablename__ = 'stop_times'

    trip_id = Column(Integer, ForeignKey('trips.trip_id'), primary_key=True)
    arrival_time = Column(TIME)
    departure_time = Column(TIME)
    stop_id = Column(Integer, ForeignKey('stops.stop_id'))
    stop_sequence = Column(Integer)
    pickup_type = Column(Integer)
    drop_off_type = Column(Integer)

    stop = relationship("Stop", back_populates='stop_times')


class Calendar(Base):
    __tablename__ = 'calendars'

    id = Column(Integer, primary_key=True)
    service_id = Column(Integer)
    monday = Column(Boolean)
    tuesday = Column(Boolean)
    wednesday = Column(Boolean)
    thursday = Column(Boolean)
    friday = Column(Boolean)
    saturday = Column(Boolean)
    sunday = Column(Boolean)
    start_date = Column(String)
    end_date = Column(String)


class CalendarDate(Base):
    __tablename__ = 'calendar_dates'

    id = Column(Integer, primary_key=True)
    service_id = Column(Integer)
    date = Column(String)
    exception_type = Column(Boolean)


class Transfer(Base):
    __tablename__ = 'transfers'

    id = Column(Integer, primary_key=True)
    from_stop_id = Column(Integer, ForeignKey('stops.stop_id'))
    to_stop_id = Column(Integer, ForeignKey('stops.stop_id'))
    transfer_type = Column(Integer)
    min_transfer_time = Column(Integer)
    from_trip_id = Column(Integer, ForeignKey('trips.trip_id'))
    to_trip_id = Column(Integer, ForeignKey('trips.trip_id'))


def populate_table(filename, table_cls, func):
    import csv

    rows = []
    with open(filename) as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            rows.append(row)

    fields = rows.pop(0)
    for row in rows:
        t = table_cls()
        for i, field in enumerate(fields):
            func(t, field, row[i])
        session.add(t)

    session.commit()

def default(t, field, value):
    setattr(t, field, value)

def calendar(t, field, value):
    if field in ('monday', 'tuesday', 'wednesday', 'thursday',
                 'friday', 'saturday', 'sunday', 'exception_type'):
        value = bool(int(value))

    setattr(t, field, value)

def populate_all():
    files = [
        ('agency.txt', Agency, default),
        ('calendar_dates.txt', CalendarDate, default),
        ('calendar.txt', Calendar, calendar),
        ('routes.txt', Route),
        ('stops.txt', Stop),
        ('stop_times.txt', StopTime),
        ('transfers.txt', Transfer),
        ('trips.txt', Trip)
    ]

    for file in files:
        populate_table(*file)

Base.metadata.create_all(engine)
populate_all()
