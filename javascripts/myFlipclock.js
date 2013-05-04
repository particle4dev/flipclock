/**
 * myFlipclock - jQuery plugin to make Flip Clock
 * @requires jQuery v1.8 or above
 * @particle4dev@gmail.com
 * Copyright (c) 2010 Steve John Hoang
 * Version: 1.0.0
 * Note: Requires jquery 1.8 or above from version 1.0.0
 */

/**
 * HTML ...
 *
 * 	<div id="flipclock">
		<div class="clock">	
			<img id="odhc" src="img/blank.gif" alt="odhc"/><img id="oddv" src="img/blank.gif" alt="oddv" />
			<span class="dot"></span>
			<img id="ophc" src="img/blank.gif" alt="ophc"/><img id="opdv" src="img/blank.gif" alt="opdv" />
			<span class="dot"></span>			
			<img id="oghc" src="img/blank.gif" alt="oghc"/><img id="ogdv" src="img/blank.gif" alt="ogdv" />
			<span class="format">AM</span>
		</div>
	</div>
 *
 * Css
	#flipclock .clock{width: 900px;height:400px;position: absolute;left: 50%;top: 50%;margin-left: -450px;margin-top: -150px;}
	#flipclock .clock span.format{margin:25px 2px;color:#CCC;font-weight:bold;font-size:1em;display:block;width:23px;height:65px;float:left;}
	#flipclock .clock span.dot{background:transparent url(img/dot.png) no-repeat center 50px;display:block;width:4px;height:65px;float:left;}
	#flipclock .clock img{background:transparent url(img/flip.png) no-repeat 0 20px;display:block;float:left;width:23px;height:65px;margin-right:1px}
	#flipclock .opt{color:#666;font-size:0.7em}
	#flipclock .opt a.mode{float:right}
	#flipclock .opt a{outline:none;color:#666;text-decoration:none}
	#flipclock .opt a:hover{color:#FFF} 
 * JS :
	$("div.clock").myFlipclock();
	OR
	$("div.clock").myFlipclock(<ARG>);
	
	[
		countdown:{true,false}{false}
		format  :{24,12}{12}
		time     :{"17:16:18","07:16:18 PM",{"now"}}{"now"}
	]
*/

	(function ($) {
		$.extend($.fn, {
			myFlipclock: function (options) {
				var defaults = {  
					countdown:false,
					format   :12,
					time     :"now"
				};  
				var data = {  
					gdv :0,
					ghc :0,
					pdv :0,
					phc :0,
					ddv :0,
					dhc :0,
					format:""//am or pm
				};
				var options = $.extend(defaults, options);  

				var ogdv, oghc, opdv, ophc, oddv, odhc, $i,flip;
				function constructor($tag){
					ogdv=$tag.children('img#ogdv');
					oghc=$tag.children('img#oghc');
					opdv=$tag.children('img#opdv');
					ophc=$tag.children('img#ophc');
					oddv=$tag.children('img#oddv');
					odhc=$tag.children('img#odhc');	
				}
				var setTime = function(seconds, minutes, hour){
					data.gdv = seconds % 10;
					data.ghc = (seconds - data.gdv)/10;
					
					data.pdv = minutes % 10;
					data.phc = (minutes - data.pdv)/10;
					
					if(options.format == 12){
						  /**
						  CHIA CHO 12 MA THUONG LE LA PM CHAN AM
						  */
						  if(Math.floor(hour/12)%2 != 0){
						      hour = hour - 12;
						      data.format = "PM";
						  }else{
						      data.format = "AM";
						  }
					}
					if(hour >= 24){
						hour = hour%24;
					}
					data.ddv = hour % 10;
					data.dhc = (hour - data.ddv)/10;
				}
				var getTimeNow = function(){
					var d = new Date();
					var seconds = d.getSeconds();					
					var minutes = d.getMinutes();					
					var hour = d.getHours();					
					setTime(seconds, minutes, hour);
				}
				
				var getTimeString = function(){
					var array = new Array();
					if(options.format == 12){
						array = options.time.split(" ");
						options.time = array[0];
						data.format  = array[1];
					}
					array = options.time.split(":");
					setTime(array[2], array[1], array[0]);
				}
				
				
				
				var checkValueCLock = function(){
					//mang du lieu luu
					if (options.countdown==true) {
						$i=-1;	
					}else{
						$i=1;	
					};
					
					if((Math.abs(data.gdv)>9)||(data.gdv<0)){
						data.gdv=0;
							
					};	
						
					if((Math.abs(data.ghc)>=6)||(data.ghc<=-1)){
						data.ghc=0
						
					};
					if((Math.abs(data.pdv)>9)||(data.pdv<0)){
						data.pdv=0;
						
					};
					if((Math.abs(data.phc)>=6)||(data.phc<=-1)){
						data.phc=0;
						
					};
					if((Math.abs(data.ddv)>9)||(data.ddv<0)){
						data.ddv=0;						
						
					};
					if((Math.abs(data.dhc)>=3)||(data.dhc<=-1)){
						data.dhc=0;						
						
					};
					if(($i==-1)&&(data.ddv==0)&&(data.dhc==0)&&(data.pdv==0)&&(data.phc==0)&&(data.gdv==0)&&(data.ghc==0)){
						$i=1;						
					}
				}
				
				var setclock = function($tag) {
					
					if(options.time == "now")
						getTimeNow();
					else{
						getTimeString();
					}  
					checkValueCLock();					
					
					ogdv.css({backgroundPosition: -(Math.abs(data.gdv)*23)+"px 20px"});					
					oghc.css({backgroundPosition: -(Math.abs(data.ghc)*23)+"px 20px"});	
					opdv.css({backgroundPosition: -(Math.abs(data.pdv)*23)+"px 20px"});
					ophc.css({backgroundPosition: -(Math.abs(data.phc)*23)+"px 20px"});
					oddv.css({backgroundPosition: -(Math.abs(data.ddv)*23)+"px 20px"});
					odhc.css({backgroundPosition: -(Math.abs(data.dhc)*23)+"px 20px"});
					
					if(options.format == 12){
					     $('span.format').text(data.format); 
					}
				}
				var jump = function($tag,$bp) {
					$tag.stop().animate({'background-position-x': (-$bp*23)+'px'}, {duration:750, complete:function(){
										
					}});					
				}
				
				var stop = function(){
					clearInterval(flip); flip = null;
				}
				
				var pause = function(){
				
				}
				
				var play = function(){
				
				}
				
				var run = function() {					
					/*Chay giay*/
					//Don vi
					data.gdv+=$i;
					//Dem xuoi
					if((Math.abs(data.gdv)==10)||(data.gdv==-1)){
						if(Math.abs(data.gdv)==10)data.gdv=0;
						else if(data.gdv==-1)data.gdv=9;						
						data.ghc+=$i;
						if(Math.abs(data.ghc)==6){jump(oghc, 0);}
						else if(data.ghc==-1){jump(oghc, 5);}
						else{jump(oghc, (Math.abs(data.ghc)));}												
					}					
					jump(ogdv,(Math.abs(data.gdv)));
					//Hang chuc
					if((Math.abs(data.ghc)==6)||(data.ghc==-1)){
						if(Math.abs(data.ghc)==6) data.ghc=0;
						else if(data.ghc==-1) data.ghc=5;						
						data.pdv+=$i;
						if(data.pdv==10){
							jump(opdv,0);	
						}
						else if(data.pdv==-1){
							jump(opdv,9);
						}
						else{
							jump(opdv,(Math.abs(data.pdv)));	
						}											
					}									
					/*Chay phut*/
					//Don vi
					if((Math.abs(data.pdv)==10)||(data.pdv==-1)){
						if(Math.abs(data.pdv)==10)data.pdv=0;
						else if(data.pdv==-1)data.pdv=9;						
						data.phc+=$i;
						if(Math.abs(data.phc)==6){jump(ophc, 0);}
						else if(data.phc==-1){jump(ophc, 5);}
						else{jump(ophc, (Math.abs(data.phc)));}									
					}
										
					//Hang chuc					
					if((Math.abs(data.phc)==6)||(data.phc==-1)){
						if(Math.abs(data.phc)==6) data.phc=0;
						else if(data.phc==-1) data.phc=5;						
						data.ddv+=$i;
						if(data.ddv==10){
							jump(oddv,0);	
						}
						else if(data.ddv==-1){
							jump(oddv,9);
						}
						else{
							jump(oddv,(Math.abs(data.ddv)));	
						}											
					}					
					/*Chay gio*/
					//Don vi
					if((Math.abs(data.ddv)==10)||(data.ddv==-1)){
											
						if(Math.abs(data.ddv)==10)data.ddv=0;
						else if(data.ddv==-1)data.ddv=9;						
						data.dhc+=$i;
						if(Math.abs(data.dhc)==2){jump(odhc, 0);}
						else if(data.dhc==-1){jump(odhc, 0);}
						else{jump(odhc, (Math.abs(data.dhc)));}
						
					}
					
					if(options.format == 12){
						if((data.ddv==2)&&(data.dhc==1)&&($i==1)){
							data.ddv=data.dhc=0;						
							jump(oddv,(Math.abs(data.ddv)));
							jump(odhc,(Math.abs(data.dhc)));
						}		
					}
					else{
						if((data.ddv==4)&&(data.dhc==2)&&($i==1)){
							data.ddv=data.dhc=0;						
							jump(oddv,(Math.abs(data.ddv)));
							jump(odhc,(Math.abs(data.dhc)));
						}
					}
					if(($i==-1)&&(data.ddv==0)&&(data.dhc==0)&&(data.pdv==0)&&(data.phc==0)&&(data.gdv==0)&&(data.ghc==0)){
						alert('Time Over');
												
					}
				}
				return this.each(function () {					
					constructor($(this));
					setclock($(this));
					flip = setInterval(run, 1000);					 
				})
			}
		})
	})(jQuery);
