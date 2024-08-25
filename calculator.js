<script type="text/javascript">
  // ALL THE EDITABLE VARIABLES SPECIFIC TO THE AC TO INITIATE 
  // OR RESET THE FIELDS TO DEFAULT VALUES FOLLOW: *************
  // This data comes from AC current W & B records and
  // Airplane Flight Manual/'POH' or Type Certificate Data Sheet.

  var ACmodel = "Piper PA-28-180";
  var Nnumber = "NXXXXX";
  var oilqtmax = "8";		// max oil capacity, quarts - ref.
  var fuel1galmax = "50";	// max useable fuel, gallons - ref.
  var bagg1max = "200";	// maximum baggage, lbs. - ref.

  // values for AC max gross weight and maneuvering speed at max gross
  maxwt = 2450;
  Vam = 110;			// kts

function initWB() {
  // This function - December 2003 - Bob
  // http://trumpetb.net/alph/
  var df = document.forms[0];  // reduce clutter

  df.ew.value = 1504;		// from AC current W&B records
  df.ewarm.value = 86.7;	// from AC current W&B records

  df.oilqt.value = 7;		// 'quarts' oil is a convenient input
  df.oilarm.value = 27.5;

  df.f1w.value = 170;		// front seats
  df.f2w.value = 130;
  df.f1arm.value = 80.5;

  df.fuel1gal.value = 50;	// 'gallons' fuel is a convenient input
  df.fuel1arm.value = 95.0;

  df.r1w.value = 125;		// rear seats
  df.r2w.value = 160;
  df.r1arm.value =118.1;

  df.bag1w.value = 49;	// baggage
  df.bag1arm.value = 142.8;

  // *************** END AIRCRAFT DEFAULT VALUES ****************
  // Make a GIF for the load limits chart and 
  // *************** CALIBRATE X AND Y FOR GIF HERE ***************

  bugd = 32;			// bug GIF diameter

  x_low = 81.0;			// (left) x min. axis, inches
  x_lowpx = 49;			// (left) x min. axis distance from GIF left origin, pixels
  x_high = 94.0;			// (right) x max. axis, inches
  x_highpx = 452;		// (right) x max. axis distance from GIF left origin, pixels
  x_pxpin = (x_highpx - x_lowpx) / (x_high - x_low);   // px/in. cal. factor

  y_low = 1400;			// (bottom) y min. axis, pounds
  y_lowpx = 232;		// (bottom) y min. axis distance from GIF top origin, pixels
  y_high = 2500;		// (top) y max. axis, pounds
  y_highpx = 1;			// (top) x max. axis distance from GIF top origin, pixels
  
  // ******************** END EDITABLE VALUES *********************

  doCalc();
}

function WB_Plot(weight, arm) {
  /* This function/style origin --> credit David Williams page:
  http://www.dmjwilliams.co.uk/gbsep_weight_balance.htm */

  x = Math.round(x_lowpx + (arm - x_low) * x_pxpin) - bugd/2;
  y = y_lowpx - Math.round(((weight - y_low) / (y_high - y_low)) * (y_lowpx - y_highpx)) - bugd/2;

  // Set the bug image source to the raw URL before positioning
  document.images.bugImage.src = "https://raw.githubusercontent.com/jlyalls/wb-calculator/main/bug.gif";

  // Now, position the bug image
  bugImage = document.images.bugImage.style;
  bugImage.left = x + "px";
  bugImage.top = y + "px";
}

function doCalc() {
  // This function - March, 2001 - Bob
  // last revised December 10, 2003 - Bob
  // http://trumpetb.net/alph/
  var df = document.forms[0];   // reduce clutter

  var ew = df.ew.value;
  var ewarm = df.ewarm.value;
  var ewmom = ew * ewarm;
  df.ewmom.value = Math.round(ewmom);

  var oilqt = df.oilqt.value;
  var oilw = oilqt / 4 * 7;
  df.oilw.value = Math.round(oilw);
  var oilarm = df.oilarm.value;
  var oilmom = oilw * oilarm;
  df.oilmom.value = Math.round(oilmom);

  var f1w = df.f1w.value;
  var f2w = df.f2w.value;
  var f1arm = df.f1arm.value;
  var f1mom = -1 * (-f1w - f2w) * f1arm;
  df.f1mom.value = Math.round(f1mom);

  var fuel1gal = df.fuel1gal.value;
  var fuel1w = fuel1gal * 6;
  df.fuel1w.value = Math.round(fuel1w);
  var fuel1arm = df.fuel1arm.value;
  var fuel1mom = fuel1w * fuel1arm;
  df.fuel1mom.value = Math.round(fuel1mom);

  var r1w = df.r1w.value;
  var r2w = df.r2w.value;
  var r1arm = df.r1arm.value;
  var r1mom = -1 * (-r1w - r2w) * r1arm;
  df.r1mom.value = Math.round(r1mom);

  var bag1w = df.bag1w.value;
  var bag1arm = df.bag1arm.value;
  var bag1mom = bag1w * bag1arm;
  df.bag1mom.value = Math.round(bag1mom);

  var totmom = -1 * (-ewmom -oilmom -f1mom -fuel1mom -r1mom -bag1mom);
  df.totmom.value = Math.round(totmom);

  var totwt = -1 * (-ew -oilw -f1w -f2w -fuel1w -r1w -r2w -bag1w);
  df.totwt.value = Math.round(totwt);

  var totarm = totmom / totwt;
  df.totarm.value = Math.round(totarm*100)/100;

  // Decrease in Va with decrease in weight based on approximation of:
  // decrease Va by half the percentage that the total weight is below maximum.
  var Vva = Vam - ((((maxwt - totwt) / maxwt) / 2) * Vam);
  df.Vva.value = Math.round(Vva);

  // Show the bug on the graph...
  WB_Plot(df.totwt.value, df.totarm.value);
}

function popwindow(theURL,winName,features) {
  window.open(theURL,winName,features);
}
// -->
</script>
