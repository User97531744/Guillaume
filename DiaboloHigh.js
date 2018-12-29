function Diabolohigh(theight, initpos, tpos, cpos){
	angleMode(DEGREES);
	this.theight = theight
	this.initpos = initpos;
	this.tpos = tpos;
	this.cpos = cpos;
	this.fCount = 0;
	//size between each throw pos  - 1/4 increment between 1-2-3-4-5
	this.inc = -shuffleSize*diameter*sin(this.fCount-90)/2;
	//size between catch and throw
	this.gap = this.inc*(this.initpos-this.tpos);
	//3 is technically where x already sits
	this.left = x + (this.tpos-3)*this.inc;
	//left side to the middle is half the gap
	this.x = this.left + this.gap/2;
	this.speed = speed*0.75;
	//half the size of the gap
	this.rx = this.inc*(this.initpos-this.tpos)/2;
	this.ry = shuffleSize*2.5*diameter*cos(this.fCount-90);
	this.fix = 0;
	this.incol = [20];
	this.outcol = [cslider.value()];

	this.show = function(){
		colorMode(HSB, 255, 255);
		this.outcol = [cslider.value(), 255, 255];
		fill(this.outcol);
		ellipse(this.x + this.rx, y + this.ry, diameter);
		fill(this.incol);
		ellipse(this.x + this.rx, y + this.ry, diameter/4);
		colorMode(RGB, 255);
	}

	this.update = function(){
		if (this.theight == 1){
			if(this.fCount >= 90 && this.fCount <= 450){
				this.rx = -shuffleSize*diameter*sin(this.fCount-90)/5*tpos;
				this.ry = shuffleSize*1.62*diameter*cos(this.fCount-90) + diameter*1.5;
			}
			else {
				this.rx = -shuffleSize*diameter*sin(this.fCount-90)/5*tpos;
				this.ry = shuffleSize*2.2*diameter*cos(this.fCount-90);
			}
			this.fCount += this.speed*1.5;
			sun = this.fCount;
		}
		else if(this.fCount >= 180){
			this.rx = -shuffleSize*diameter*sin(this.fCount-90)/2*(this.cpos-this.tpos)/2;
			this.ry = (shuffleSize*diameter*(this.theight**2.5))/(125/throwHeight)*cos(this.fCount-90);
			this.fCount += this.speed/(this.theight-1);
		}
		else {
			this.rx = -shuffleSize*diameter*sin(this.fCount-90)/2*(this.initpos-this.tpos)/2;
			this.ry = shuffleSize*2.5*diameter*cos(this.fCount-90);
			this.fCount += this.speed;
		}
		if(this.fCount > 180 && this.fix == 0 && this.theight != 1){
			this.fCount = 180;
			this.fix = 1;
			this.rx = -shuffleSize*diameter*sin(this.fCount-90)/2*(this.initpos-this.tpos)/2;

			//reset position variables
			this.gap = this.inc*(this.tpos-this.cpos);
			this.left = this.x + this.rx - this.gap;
			this.x = this.left + this.gap/2;
			this.rx = -shuffleSize*diameter*sin(this.fCount-90)/2*(this.cpos-this.tpos)/2;
		}
	}
}
