/**
 * Create Flight Transaction
 * @param {org.acme.airline.flight.CreateFlight} flightData
 * @transaction
 */
function    createFlight(flightData) {
    // 1. Get the asset registry
    return getAssetRegistry('org.acme.airline.flight.Flight')
        .then(function(flightRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'org.acme.airline.flight';

            // 3. Create the Resource instance
            //var  flightId = 'AE102-05-12-18';  /// <<<< THIS IS HARD CODED - FIX IT as an exercise
            var flightId = generateFlightID(flightData.flightNum , flightData.schedule);

            var  flight = factory.newResource(NS,'Flight',flightId);
            
            // 4. Set the relationship
            flight.flightNumber = flightData.flightNumber;

            // 5. Create a new concept using the factory & set the data in it
            var route = factory.newConcept(NS,"Route");

            route.origin = flightData.origin;
            route.destination = flightData.destination;
            route.schedule = flightData.schedule;
            flight.route = route;
            flight.aliasFlightNumber = [];

            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'FlightCreated');
            event.flightId = flightId;
            emit(event);

            return flightRegistry.addAll([flight]);
        });
}

function generateFlightID(flightnumber , schedule){
    var dt = new Date(schedule);

    var month = dt.getMonth()+1;
     if((month+'').length == 1)  month = '0'+month;
    var day = dt.getDay()+1;
     if((day+'').length == 1)  day = '0'+day;

     return flightNum+'-'+month+'-'+dayNum+'-'+(dt.getFullYear()+'').substring(2,4);

}

/****
 
 */