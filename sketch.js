function setup() {
	//createCanvas(displayWidth/1.8 - 10, displayHeight/1.1 - 82);
	createCanvas(displayWidth/window.devicePixelRatio-10, displayHeight/window.devicePixelRatio - 82);
	//rate of rotation
	speed = 8;
	//framecount to control object creation time
	increment = -5;
	//width/string length
	shuf = 26;
	shuffleSize = shuf/10;
	//throwdisplayHeight
	throwHeight = 25;
	//diabolo size. Controls zoom
	zoom = 100;
	diameter = zoom/4;
	//holds diabolo objects
	diabs = [];
	catches = [];
	for(i = 0; i < 50; i++){
		catches[i] = 5;
	}
	//navigates siteswap position
	next = 0;
	colMode = "Diabolo";
	letters = "0123456789abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUBWXYZ";
	menu = -1;
	menu2 = -1;
	menu3 = -1;
	sun = 0;
	wel = -1;
	mes = -1;
	tapped = 0;
	inheight = 1;
	w = width;
	h = height;
	//coordinates
	x = w/2;
	y = h - shuffleSize*diameter*3 - 40;
	siteswap = "753153455615613";
	//siteswap = "55264263353456262625244";
	//siteswap = "5551753163353455615615615613";

	// set options to prevent default behaviors for swipe, pinch, etc
  var options = {
    preventDefault: true
  };

  // document.body registers gestures anywhere on the page
  var hammer = new Hammer(document.body, options);
	//var doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
  hammer.get('pan').set({
    direction: Hammer.DIRECTION_ALL
  });
	hammer.get('doubletap');
	//hammer.get("pinch");
	hammer.get('pinch').set({ enable: true });

	//hammer.on("pinch", scal);
	hammer.on("doubletap", dt);
	hammer.on("pinch", tt);
  hammer.on("pan", swiped);



	menuButton = createButton("_");
	resetButton = createButton("Reset Variables")

	cslider = createSlider(0, 255, 190);
	bgslider = createSlider(0, 765, 750);
	sslider = createSlider(0, 20, speed);
	zslider = createSlider(1, 400, zoom);
	thslider = createSlider(10, 50, throwHeight);
	ssslider = createSlider(0, 100, shuf);
	colourButton = createButton("COLOUR");
	instructButton = createButton("~")
	messbutton = createButton("?")


	//ss = createInput("321333345");
	ss = createInput("315315315311333355311333352314352314355");

	styleButton(cslider, 20, h/2, w - 40);
	styleButton(bgslider, 20, h/2, w - 40);
	styleButton(sslider, 20, h/8, w - 40);
	styleButton(zslider, 20, h/3.5, w - 40);
	styleButton(thslider, 20, h*2.1/3, w - 40);
	styleButton(ssslider, 20, h*4/5, w - 40);

	styleButton(messbutton, w/4+5, h*2/3+90, w/2-7.5);
	styleButton(menuButton, w - 60, 20);
	styleButton(instructButton, 40, 20);
	styleButton(ss, 50, h - 35, w - 100, 25);
	styleButton(colourButton, 20, 5*h/12-16, x - 40);
	styleButton(resetButton, 40, h/1.2, w-80);
	menuButton.mouseClicked(m);
	instructButton.mouseClicked(q);
	colourButton.mouseClicked(colm);
	resetButton.mouseClicked(reset);
	messbutton.mouseClicked(mess);


	start();
}

function reset(){
	sslider.elt.value = 8;
	zslider.elt.value = 50;
	thslider.elt.value = 25;
	ssslider.elt.value = 26;
	cslider.elt.value = 190;
	bgslider.elt.value = 750;
	ss.elt.value = "55264263353456262625244";
	mes = -1;
	start();
}

function m(){
	menu *= -1;
	if(bgslider.value() > 510){
	background(bgslider.value()-510);
	}
	else if(bgslider.value() > 255){
		colorMode(HSB, 255, 255);
		background((bgslider.value()-255), 255, 255);
	}
	else{
		colorMode(HSB, 255, 255);
		background(bgslider.value(), 30, 255);
	}
	start();
}

function q(){
	menu3 *= -1;
}

function mess(){
	mes *= -1;
}

function start(){
	diabs = [];
	increment = -5;
	next = 0;
	styleButton(ss, 50, h - 35, w - 100, 25);
	y = h - shuffleSize*diameter*3 - 40;
	siteswap = ss.elt.value.toLowerCase();
}

function draw(){
	ss.elt.value = ss.elt.value.toLowerCase();
	zoom = diameter*4;

	if(mes == -1 || menu == 1){
		if(bgslider.value() > 510){
		background(bgslider.value()-510);
		}
		else if(bgslider.value() > 255){
			colorMode(HSB, 255, 255);
			background((bgslider.value()-255), 255, 255);
		}
		else{
			colorMode(HSB, 255, 255);
			background(bgslider.value(), 30, 255);
		}
	}

	speed = sslider.value();
	zoom = zslider.value();
	throwHeight = thslider.value();
	shuf = ssslider.value();
	diameter = zoom/4
	colorMode(RGB, 255);
	cslider.hide();
	bgslider.hide();
	sslider.hide();
	zslider.hide();
	thslider.hide();
	ssslider.hide();

	messbutton.hide();

	if(colMode == "Back"){
		bgslider.show();
	}
	else{
		cslider.show();
	}
	if(colMode == "Rainbow")
		cslider.elt.value = frameCount%255;
	else {
		cslider.elt.value = cslider.value();;
	}

	//current, previous and next throws
	//pt = siteswap[int((next-1)%int(siteswap.length))];
	//pt = letters.indexOf(pt)%36;
	ct = siteswap[int((next)%int(siteswap.length))];
	ct = letters.indexOf(ct)%36;
	throwpos = siteswap[int((next+1)%int(siteswap.length))];
	throwpos = letters.indexOf(throwpos)%36;
	catchpos = siteswap[int((next+2)%int(siteswap.length))];
	catchpos = letters.indexOf(catchpos)%36;
	//nt = siteswap[int((next+1)%int(siteswap.length))];
	//nt = letters.indexOf(nt)%36;

	offset = cos(speed*0.75*increment*2+180);
	sposx1 = (x-(shuffleSize*diameter)+1.5*diameter*offset);
	sposy1 =  y+(shuffleSize*diameter*offset/10)+diameter*1.5;
	sposx2 = (x+(shuffleSize*diameter*0.8)-1.8*diameter*offset);
	sposy2 =  y+(shuffleSize*diameter*offset/20)+diameter*1.8;
	if(sun > 135 && sun < 405){
		sposx1 = (x-(shuffleSize*diameter)+1.5*diameter*(offset/2+0.5));
		sposx2 = (x+(shuffleSize*diameter*0.8)-1.8*diameter*(offset/2+0.5));
	}

	//string
	sContact = 0;
	stroke(235, 235, 0);
	strokeWeight(2);
	//1 sun
	for(i = diabs.length-1; i >= 0; i--){
		if (diabs[i].theight == 1 && diabs[i].fCount > 20 && diabs[i].fCount < 530){
			line(sposx1, sposy1, diabs[i].rx+diabs[i].x-diameter/5, diabs[i].ry+y);
			line(diabs[i].rx+diabs[i].x, diabs[i].ry+y, sposx2, sposy2);
			sContact = 2;
		}
	}
	//other
	for(i = diabs.length-1; i >= 0; i--){
		if (diabs[i].ry + y > (sposy2 + sposy1)/2 && sContact != 2){
			line(sposx1, sposy1, diabs[i].rx+diabs[i].x-diameter/5, diabs[i].ry+y);
			line(diabs[i].rx+diabs[i].x, diabs[i].ry+y, sposx2, sposy2);
			sContact = 1;
		}
	}
	if (sContact == 0){
		line(sposx1, sposy1, sposx2, sposy2);
	}
	stroke(0);
	strokeWeight(1);

	//sticks
	fill(51, 124, 255);
	translate(sposx1, sposy1);
	rotate(40+20*offset);
	rect(0, 0, diameter/10, diameter*2.5);
	fill(255);
	rect(-1, diameter*1.5, diameter/7, diameter*1.3);

	rotate(-40-20*offset);
	translate(-sposx1, -sposy1);

	fill(51, 124, 255);
	translate(sposx2, sposy2);
	if(sun > 0){
		offset = cos(sun*2/3+180);
		rotate(-60-40*offset);
		rect(0, 0, diameter/10, diameter*2.5);
		fill(255);
		rect(-1, diameter*1.5, diameter/7, diameter*1.3);
		rotate(60+40*offset);
	}
	else {
		rotate(-40-20*offset);
		rect(0, 0, diameter/10, diameter*2.5);
		fill(255);
		rect(-1, diameter*1.5, diameter/7, diameter*1.3);
		rotate(40+20*offset);
	}
	translate(-sposx2, -sposy2);
	increment ++;

	//  =====DIABOLOS=====
	//tracking sun progress for sticks and string
	sun = 0;
	//bottom loop

	if ((increment) % (180/(speed*0.75)) <1){
		catches[next/3+ct] = catchpos;
		if(ct != 0){
			diabs.push(new diabolohigh(ct, catches[next/3], throwpos, catchpos));
		}
		next += 3;
	}

	//delete old objects
	for(i = diabs.length-1; i >= 0; i--){
		if (diabs[i].fCount>540 || (diabs[i].theight != 1 && diabs[i].fCount > 360)){
			diabs.splice(i, 1);
		}
	}
	for(i = diabs.length-1; i >= 0; i--){
		if(i > 0){
			if(!(diabs[i-1].theight == 1) || diabs[i].fCount >= 180)
				diabs[i].show();
		}
		else {
			diabs[i].show();
		}
		diabs[i].update();
	}

		//zoom
	if (keyIsDown(UP_ARROW)) {
	  diameter+=0.25;
		y = h - shuffleSize*diameter*3 - 40;
	}
	if (keyIsDown(DOWN_ARROW)) {
		if(diameter>1)
	  	diameter-=0.25;
			y = h - shuffleSize*diameter*3 - 40;
	}
	textAlign(CENTER);
	if(menu == 1){
		fill(0, 0, 0, 50);
		rect(0, 0, w-2, h-2);
		instructButton.show();
		if(menu3 == 1){
			instructButton.show();
			cslider.hide();
			bgslider.hide();
			colourButton.hide();
		}
		else {
			//Controls
			strokeWeight(0);
			fill(50);
			textSize(23);
			text('SPEED', width/2, h/12);
			text('ZOOM', width/2, h/4);
			text('THROW HEIGHT', width/2, 3.2*h/5);
			text(colMode, 3*w/4, 5*h/12);
			colourButton.show();
			sslider.show();
			zslider.show();
			messbutton.show();
			thslider.show();
		}
		messbutton.style("background-color", "buttonface");

		if(mes == 1){
			messbutton.style("background-color", "rgb(101, 205, 225)");
		}

		fill(0, 102, 153);
		textSize(15);
	}
	else{
		cslider.hide();
		bgslider.hide();
		colourButton.hide();
		instructButton.hide()
	}

	strokeWeight(0);
	fill(20);
	textSize(10);
	text("SPEED", 21, h - 35);
	text("ZOOM", w - 30, h - 35);
	textSize(28);
	text(speed, 21, h - 10);
	text(zoom, w - 30, h - 10);

	if (menu3 == 1 && menu == 1){
		instruct();
	}
	else {
		resetButton.hide();
	}
}

function keyPressed(){
	if (keyCode == ENTER){
		start();
	}
	if (keyCode == LEFT_ARROW) {
		if (speed >= 1){
			speed-=1;
			start();
		}
	}
	if (keyCode == RIGHT_ARROW) {
		speed+=1;
		start();
	}
}

function scal(event){
	if (event.velocity > 0) {
		y =h - shuffleSize*diameter*3-40;
	}
	else{
		if(diameter>1)
			diameter-=1;
			y =h - shuffleSize*diameter*3-40;
		}
}
function dt(event){
	if(menu == -1){
		start();
	}
}

function swiped(event) {
	if (event.direction == 8) {
		if(zslider.value() < 50){
			zslider.elt.value = zslider.value()+1;
		}
		else if(zslider.value() < 150){
			zslider.elt.value = zslider.value()+2;
		}
		else {
			zslider.elt.value = zslider.value()+5;
		}
		y =h - shuffleSize*diameter*3-40;
	}
	else if (event.direction == 16) {
		if(zoom>1)
			if(zslider.value() < 51){
				zslider.elt.value = zslider.value()-1;
			}
			else if(zslider.value() < 151){
				zslider.elt.value = zslider.value()-2;
			}
			else {
				zslider.elt.value = zslider.value()-5;
			}
		y =h - shuffleSize*diameter*3-40;
	}
}

function styleButton(input, xx, yy, wid = 50, fntsz = 23, col = "buttontext", bgcol = "buttonface"){
	input.style("position", "relative");
	input.style("left", xx + "px");
	input.style("top", yy + "px");
	input.style("width", wid + "px");
	input.style("font-size", fntsz + "px");
	input.style("color", col);
	input.style("background-color", bgcol);
}

function colm(){
	if(colMode == "Diabolo"){
		colMode = "Back"
	}
	else 	if(colMode == "Back"){
		colMode = "Rainbow"
	}
	else{
		colMode = "Diabolo";
	}
}

function tt(event){
	if(inheight == 1 && tapped != 2){
		styleButton(ss, 50, h/5, w - 100, 25);
		inheight = 0;
		tapped = event.pointers.length;
	}
	else if(tapped != 2) {
		styleButton(ss, 50, h-35, w - 100, 25);
		inheight = 1;
		tapped = event.pointers.length
	}
}

function mouseReleased() {
	if(menu3 == 1 && menu == 1){
		if(mouseX > width/11 && mouseX < 10*width/11 && mouseY > h/6 + 12.3*width/15 && mouseY < h/6 + 13.7*width/15){
			window.open("https://www.instagram.com/tysondiabolo")
		}
	}
  tapped = 0;
}

function instruct(){
	resetButton.show();
	textAlign(LEFT);
	fill(60);
	tempvar = width/15;
	textSize(tempvar)
	//text("Double tap to change", width/10, h/6);
	//text("between low/high.", width/10, h/6 + tempvar);
	text("Swipe up and down to", width/10, h/6 + 3.5*tempvar);
	text("control zoom.", width/10, h/6 + 4.5*tempvar);
	text("Tap with 2 fingers to", width/10, h/6 + 7*tempvar);
	text("shift the input field", width/10, h/6 + 8*tempvar);
	text("(if covered by keyboard)", width/10, h/6 + 9*tempvar);
	text("Use a-z for numbers 10-35", width/10, h/6 + 11.5*tempvar);

	textSize(tempvar/1.1)
	fill(0, 0, 255);
	text("instagram.com/tysondiabolo", width/10, h/6 + 13.5*tempvar);
	fill(60);


	textAlign(CENTER);
	textSize(28);
}
