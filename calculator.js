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

        df.ew.value = 1504;        // from AC current W&B records
        df.ewarm.value = 86.7;    // from AC current W&B records

        df.oilqt.value = 7;        // 'quarts' oil is a convenient input
        df.oilarm.value = 27.5;

        df.f1w.value = 170;        // front seats
        df.f2w.value = 130;
        df.f1arm.value = 80.5;

        df.fuel1gal.value = 50;    // 'gallons' fuel is a convenient input
        df.fuel1arm.value = 95.0;

        df.r1w.value = 125;        // rear seats
        df.r2w.value = 160;
        df.r1arm.value = 118.1;

        df.bag1w.value = 49;    // baggage
        df.bag1arm.value = 142.8;

        doCalc(); // Perform the calculation on load
    }

    function WB_Plot(weight, arm) {
        var bugd = 32; // Diameter of the bug

        // X and Y axis calibration for the bug position
        var x_low = 81.0;
        var x_lowpx = 49;
        var x_high = 94.0;
        var x_highpx = 452;
        var x_pxpin = (x_highpx - x_lowpx) / (x_high - x_low);

        var y_low = 1400;
        var y_lowpx = 232;
        var y_high = 2500;
        var y_highpx = 1;

        var x = Math.round(x_lowpx + (arm - x_low) * x_pxpin) - bugd/2;
        var y = y_lowpx - Math.round(((weight - y_low) / (y_high - y_low)) * (y_lowpx - y_highpx)) - bugd/2;

        var bugImage = document.images.bugImage.style;
        bugImage.left = x + "px";
        bugImage.top = y + "px";
    }

    function doCalc() {
        var df = document.forms[0];   // reduce clutter

        // Calculate oil weight and moment
        var oilqt = parseFloat(df.oilqt.value);
        var oilw = oilqt * 1.75; // 1 quart = 1.75 pounds
        df.oilw.value = Math.round(oilw);
        var oilarm = parseFloat(df.oilarm.value);
        var oilmom = oilw * oilarm;
        df.oilmom.value = Math.round(oilmom);

        // Calculate front seats moment
        var f1w = parseFloat(df.f1w.value);
        var f2w = parseFloat(df.f2w.value);
        var f1arm = parseFloat(df.f1arm.value);
        var f1mom = (f1w * f1arm) + (f2w * f1arm);
        df.f1mom.value = Math.round(f1mom);

        // Calculate fuel weight and moment
        var fuel1gal = parseFloat(df.fuel1gal.value);
        var fuel1w = fuel1gal * 6; // 1 gallon = 6 pounds
        df.fuel1w.value = Math.round(fuel1w);
        var fuel1arm = parseFloat(df.fuel1arm.value);
        var fuel1mom = fuel1w * fuel1arm;
        df.fuel1mom.value = Math.round(fuel1mom);

        // Calculate rear seats moment
        var r1w = parseFloat(df.r1w.value);
        var r2w = parseFloat(df.r2w.value);
        var r1arm = parseFloat(df.r1arm.value);
        var r1mom = (r1w * r1arm) + (r2w * r1arm);
        df.r1mom.value = Math.round(r1mom);

        // Calculate baggage moment
        var bag1w = parseFloat(df.bag1w.value);
        var bag1arm = parseFloat(df.bag1arm.value);
        var bag1mom = bag1w * bag1arm;
        df.bag1mom.value = Math.round(bag1mom);

        // Calculate total weight and moment
        var ew = parseFloat(df.ew.value);
        var ewarm = parseFloat(df.ewarm.value);
        var ewmom = ew * ewarm;
        df.ewmom.value = Math.round(ewmom);

        var totwt = ew + oilw + f1w + f2w + fuel1w + r1w + r2w + bag1w;
        df.totwt.value = Math.round(totwt);

        var totmom = ewmom + oilmom + f1mom + fuel1mom + r1mom + bag1mom;
        df.totmom.value = Math.round(totmom);

        // Calculate center of gravity
        var totarm = totmom / totwt;
        df.totarm.value = Math.round(totarm * 100) / 100;

        // Calculate Va (maneuvering speed) with decrease in weight
        var Vva = Vam - ((((maxwt - totwt) / maxwt) / 2) * Vam);
        df.Vva.value = Math.round(Vva);

        // Position the bug on the graph
        WB_Plot(df.totwt.value, df.totarm.value);
    }
</script>
