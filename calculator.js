<script type="text/javascript">
    var ACmodel = "Piper PA-28-180";
    var Nnumber = "NXXXXX";
    var oilqtmax = 8;        // max oil capacity, quarts
    var fuel1galmax = 50;     // max usable fuel, gallons
    var bagg1max = 200;       // maximum baggage, lbs.

    // values for AC max gross weight and maneuvering speed at max gross
    var maxwt = 2450;
    var Vam = 110;            // kts

    function initWB() {
        var df = document.forms[0];  // reduce clutter

        // Empty Weight
        df.ew.value = 1373.52;        // Fixed weight
        df.ewarm.value = 82.80;       // Fixed arm

        // Oil
        df.oilqt.value = 8;           // Fixed quarts
        df.oilarm.value = 27.5;       // Arm stays the same
        var oilw = (488 / 27.5);      // Adjust weight to make moment equal 488
        df.oilw.value = Math.round(oilw); // Update weight
        df.oilmom.value = 488;        // Fixed moment

        // Pilot and Passenger
        df.f1w.value = 170;           // Example weight for pilot
        df.f2w.value = 130;           // Example weight for passenger
        df.f1arm.value = 85.5;        // Fixed arm for both pilot and passenger

        // Fuel
        df.fuel1gal.value = 50;       // Fuel in gallons
        df.fuel1arm.value = 95.0;     // Fixed arm for fuel

        // Rear Seat Passengers
        df.r1w.value = 125;           // Example weight for rear left seat
        df.r2w.value = 160;           // Example weight for rear right seat
        df.r1arm.value = 118.1;       // Fixed arm for rear seats

        // Baggage
        df.bag1w.value = 49;          // Example baggage weight
        df.bag1arm.value = 142.8;     // Fixed arm for baggage

        doCalc(); // Perform the calculation on load
    }

    // The rest of the JavaScript code remains the same...
</script>
