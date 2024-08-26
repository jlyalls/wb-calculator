// ALL THE EDITABLE VARIABLES SPECIFIC TO THE AC TO INITIATE 
// OR RESET THE FIELDS TO DEFAULT VALUES FOLLOW: *************
var ACmodel = "Piper PA-28-180";
var Nnumber = "NXXXXX";
var oilqtmax = 8;        // max oil capacity, quarts
var fuel1galmax = 50;    // max useable fuel, gallons
var bagg1max = 200;      // maximum baggage, lbs.

// Values for AC max gross weight and maneuvering speed at max gross
var maxwt = 2400;
var Vam = 110;            // kts

function initWB() {
    var df = document.forms[0];  // reduce clutter

    df.ew.value = 1373.52;        // from AC current W&B records
    df.ewarm.value = 82.80;    // from AC current W&B records

    df.oilqt.value = 8;        // 'quarts' oil is a convenient input
    df.oilarm.value = 32.53;

    df.f1w.value = "";        // front seats
    df.f2w.value = "";
    df.f1arm.value = 85.5;

    df.fuel1gal.value = "";    // 'gallons' fuel is a convenient input
    df.fuel1arm.value = 95.0;

    df.r1w.value = "";        // rear seats
    df.r2w.value = "";
    df.r1arm.value = 118.1;

    df.bag1w.value = "";    // baggage
    df.bag1arm.value = 142.8;

    // *************** END AIRCRAFT DEFAULT VALUES ****************
    // Make a GIF for the load limits chart and 
    // *************** CALIBRATE X AND Y FOR GIF HERE ***************

    bugd = 32;            // bug GIF diameter

    x_low = 81.0;            // (left) x min. axis, inches
    x_lowpx = 50;            // (left) x min. axis distance from GIF left origin, pixels
    x_high = 96.0;            // (right) x max. axis, inches
    x_highpx = 974;        // (right) x max. axis distance from GIF left origin, pixels
    x_pxpin = (x_highpx - x_lowpx) / (x_high - x_low);   // px/in. cal. factor

    y_low = 1200;            // (bottom) y min. axis, pounds
    y_lowpx = 502;        // (bottom) y min. axis distance from GIF top origin, pixels
    y_high = 2400;        // (top) y max. axis, pounds
    y_highpx = 10;            // (top) y max. axis distance from GIF top origin, pixels
    
    // ******************** END EDITABLE VALUES *********************

    doCalc();
}

function WB_Plot(weight, arm) {
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
    var oilarm = parseFloat(df.oilarm.value) || 32.53;

    if (oilqt === 8) {
        // Special case for 8 quarts
        var oilw = 15;            // Fixed weight for 8 quarts
        var oilmom = 488;         // Fixed moment for 8 quarts
    } else {
        // Normal calculation for other quarts
        var oilw = oilqt * (15 / 8); // Proportional weight calculation
        var oilmom = oilw * oilarm;  // Calculate moment using fixed arm
    }

    df.oilw.value = Math.round(oilw);
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

function popwindow(theURL, winName, features) {
    window.open(theURL, winName, features);
}
