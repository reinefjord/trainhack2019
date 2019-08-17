# Trainhack 2019 — Team Thunder Train

This is a project for Trainhack 2019, going from Malmö to Berlin and back.

The project was inspired by our experiences trying to get down to Malmö from
Stockholm when there had been a massive fire across the tracks at Hässleholm.

You can enter a train number and get alternative routes from each station
between your starting station and end.

It uses [Samtrafiken's GTFS](https://www.trafiklab.se/api/gtfs-sverige-2) to
get the stops for a trip, and the
[Resrobot Reseplanerare](https://www.trafiklab.se/api/resrobot-reseplanerare)
to find alternative routes, both APIs via
[Trafiklab](https://www.trafiklab.se/).
