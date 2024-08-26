<script type="text/javascript">
    var ACmodel = "Piper PA-28-180";
    var Nnumber = "NXXXXX";
    var oilqtmax = 8;        // max oil capacity, quarts
    var fuel1galmax = 50;     // max usable fuel, gallons
    var bagg1max = 200;       // maximum baggage, lbs.

    // values for AC max gross weight and maneuvering speed at max gross
    var maxwt = 2400;
    var Vam = 110;            // kts

    function initWB() {
        var df = document.forms[0];  // reduce clutter

        // Empty Weight
        df.ew.value = 1373.52;        // Fixed weight
        df.ewarm.value = 82.80;       // Fixed arm
        df.ewmom.value = Math.round(1373.52 * 82.80); // Calculate moment for empty weight

        // Oil - Quarts field is now editable
        df.oilqt.value = 8;           // Default quarts
        df.oilarm.value = 27.5;       // Arm stays the same

        // Clear other weight and moment fields
        df.oilw.value = "";
        df.oilmom.value = "";

        df.f1w.value = "";
        df.f2w.value = "";
        df.f1mom.value = "";

        df.fuel1gal.value = "";
        df.fuel1w.value = "";
        df.fuel1mom.value = "";

        df.r1w.value = "";
        df.r2w.value = "";
        df.r1mom.value = "";

        df.bag1w.value = "";
        df.bag1mom.value = "";

        df.totwt.value = "";
        df.totmom.value = "";
        df.totarm.value = "";
        df.Vva.value = "";

        // Initialize calculations (do not trigger automatically on page load)
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
        var oilqt = parseFloat(df.oilqt.value) || 0;
        var oilw = oilqt * 1.75; // 1 quart = 1.75 pounds
        df.oilw.value = Math.round(oilw);
        var oilarm = parseFloat(df.oilarm.value) || 0;
        var oilmom = oilw * oilarm;
        df.oilmom.value = Math.round(oilmom);

        // Calculate front seats moment
        var f1w = parseFloat(df.f1w.value) || 0;
        var f2w = parseFloat(df.f2w.value) || 0;
        var f1arm = parseFloat(df.f1arm.value) || 0;
        var f1mom = (f1w * f1arm) + (f2w * f1arm);
        df.f1mom.value = Math.round(f1mom);

        // Calculate fuel weight and moment
        var fuel1gal = parseFloat(df.fuel1gal.value) || 0;
        var fuel1w = fuel1gal * 6; // 1 gallon = 6 pounds
        df.fuel1w.value = Math.round(fuel1w);
        var fuel1arm = parseFloat(df.fuel1arm.value) || 0;
        var fuel1mom = fuel1w * fuel1arm;
        df.fuel1mom.value = Math.round(fuel1mom);

        // Calculate rear seats moment
        var r1w = parseFloat(df.r1w.value) || 0;
        var r2w = parseFloat(df.r2w.value) || 0;
        var r1arm = parseFloat(df.r1arm.value) || 0;
        var r1mom = (r1w * r1arm) + (r2w * r1arm);
        df.r1mom.value = Math.round(r1mom);

        // Calculate baggage moment
        var bag1w = parseFloat(df.bag1w.value) || 0;
        var bag1arm = parseFloat(df.bag1arm.value) || 0;
        var bag1mom = bag1w * bag1arm;
        df.bag1mom.value = Math.round(bag1mom);

        // Calculate total weight and moment
        var ew = parseFloat(df.ew.value) || 0;
        var ewarm = parseFloat(df.ewarm.value) || 0;
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
