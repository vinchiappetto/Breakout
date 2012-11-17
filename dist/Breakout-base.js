/***
	Breakout - 0.2.0

    Copyright (c) 2011-2012 Jeff Hoefs <soundanalogous@gmail.com>
    Released under the MIT license. See LICENSE file for details.
	http.//breakoutjs.com
	***/
'use strict';var BO=BO||{},BREAKOUT=BREAKOUT||BO;BREAKOUT.VERSION="0.2.0";BO.enableDebugging=!1;var JSUTILS=JSUTILS||{};JSUTILS.namespace=function(a){var a=a.split("."),c=window,e;for(e=0;e<a.length;e+=1)"undefined"===typeof c[a[e]]&&(c[a[e]]={}),c=c[a[e]];return c};JSUTILS.inherit=function(a){function c(){}if(null==a)throw TypeError();if(Object.create)return Object.create(a);var e=typeof a;if("object"!==e&&"function"!==e)throw TypeError();c.prototype=a;return new c};
if(!Function.prototype.bind)Function.prototype.bind=function(a){if("function"!==typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var c=Array.prototype.slice.call(arguments,1),e=this,f=function(){},b=function(){return e.apply(this instanceof f?this:a||window,c.concat(Array.prototype.slice.call(arguments)))};f.prototype=this.prototype;b.prototype=new f;return b};JSUTILS.namespace("JSUTILS.Event");
JSUTILS.Event=function(){var a;a=function(a){this._type=a;this._target=null;this.name="Event"};a.prototype={get type(){return this._type},set type(a){this._type=a},get target(){return this._target},set target(a){this._target=a}};a.CONNECTED="connected";a.CHANGE="change";a.COMPLETE="complete";return a}();JSUTILS.namespace("JSUTILS.EventDispatcher");
JSUTILS.EventDispatcher=function(){var a;a=function(a){this._target=a||null;this._eventListeners={};this.name="EventDispatcher"};a.prototype={addEventListener:function(a,e){this._eventListeners[a]||(this._eventListeners[a]=[]);this._eventListeners[a].push(e)},removeEventListener:function(a,e){for(var f=0,b=this._eventListeners[a].length;f<b;f++)this._eventListeners[a][f]===e&&this._eventListeners[a].splice(f,1)},hasEventListener:function(a){return this._eventListeners[a]&&0<this._eventListeners[a].length?
!0:!1},dispatchEvent:function(a,e){a.target=this._target;var f=!1,b;for(b in e)a[b.toString()]=e[b];if(this.hasEventListener(a.type)){b=0;for(var d=this._eventListeners[a.type].length;b<d;b++)try{this._eventListeners[a.type][b].call(this,a),f=!0}catch(j){console.log("error: Error calling event handler. "+j)}}return f}};return a}();JSUTILS.namespace("JSUTILS.TimerEvent");
JSUTILS.TimerEvent=function(){var a,c=JSUTILS.Event;a=function(a){this.name="TimerEvent";c.call(this,a)};a.TIMER="timerTick";a.TIMER_COMPLETE="timerComplete";a.prototype=JSUTILS.inherit(c.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("JSUTILS.Timer");
JSUTILS.Timer=function(){var a,c=JSUTILS.TimerEvent,e=JSUTILS.EventDispatcher;a=function(a,b){e.call(this,this);this.name="Timer";this._count=0;this._delay=a;this._repeatCount=b||0;this._isRunning=!1;this._timer=null};a.prototype=JSUTILS.inherit(e.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("delay",function(){return this._delay});a.prototype.__defineSetter__("delay",function(a){this._delay=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("repeatCount",
function(){return this._repeatCount});a.prototype.__defineSetter__("repeatCount",function(a){this._repeatCount=a;this._isRunning&&(this.stop(),this.start())});a.prototype.__defineGetter__("running",function(){return this._isRunning});a.prototype.__defineGetter__("currentCount",function(){return this._count});a.prototype.start=function(){if(null===this._timer)this._timer=setInterval(this.onTick.bind(this),this._delay),this._isRunning=!0};a.prototype.reset=function(){this.stop();this._count=0};a.prototype.stop=
function(){if(null!==this._timer)clearInterval(this._timer),this._timer=null,this._isRunning=!1};a.prototype.onTick=function(){this._count+=1;0!==this._repeatCount&&this._count>this._repeatCount?(this.stop(),this.dispatchEvent(new c(c.TIMER_COMPLETE))):this.dispatchEvent(new c(c.TIMER))};return a}();JSUTILS.namespace("JSUTILS.SignalScope");
JSUTILS.SignalScope=function(){var a;a=function(a,e,f,b,d,j,m){this.name="SignalScope";this._canvas=document.getElementById(a);this._ctx=this._canvas.getContext("2d");this._width=e;this._height=f;this._rangeMin=b;this._rangeMax=d;this._ch1Color=j||"#FF0000";this._ch2Color=m||"#0000FF";this._markers=null;this._ch1Values=Array(e);this._ch2Values=Array(e);for(a=0;a<e;a++)this._ch1Values[a]=0,this._ch2Values[a]=0;this._range=100*(1/(d-b))};a.prototype.update=function(a,e){this._ctx.clearRect(0,0,this._width,
this._height);this._ch1Values.push(a);this._ch1Values.shift();this.drawChannel(this._ch1Values,this._ch1Color);void 0!==e&&(this._ch2Values.push(e),this._ch2Values.shift(),this.drawChannel(this._ch2Values,this._ch2Color));this.drawMarkers()};a.prototype.drawChannel=function(a,e){var f=0;this._ctx.strokeStyle=e;this._ctx.lineWidth=1;this._ctx.beginPath();this._ctx.moveTo(0,this._height);for(var b=0,d=a.length;b<d;b++)f=(this._rangeMax-a[b])*this._range,this._ctx.lineTo(b,f);this._ctx.stroke()};a.prototype.drawMarkers=
function(){var a=0;if(null!==this._markers)for(var e=0,f=this._markers.length;e<f;e++)a=(this._rangeMax-this._markers[e][0])*this._range,this._ctx.strokeStyle=this._markers[e][1],this._ctx.lineWidth=0.5,this._ctx.beginPath(),this._ctx.moveTo(0,a),this._ctx.lineTo(this._width,a),this._ctx.stroke()};a.prototype.addMarker=function(a,e){if(null===this._markers)this._markers=[];this._markers.push([a,e])};a.prototype.removeAllMarkers=function(){this._markers=null};return a}();JSUTILS.namespace("BO.IOBoardEvent");
BO.IOBoardEvent=function(){var a,c=JSUTILS.Event;a=function(a){this.name="IOBoardEvent";c.call(this,a)};a.ANALOG_DATA="analogData";a.DIGITAL_DATA="digitalData";a.FIRMWARE_VERSION="firmwareVersion";a.FIRMWARE_NAME="firmwareName";a.STRING_MESSAGE="stringMessage";a.SYSEX_MESSAGE="sysexMessage";a.PIN_STATE_RESPONSE="pinStateResponse";a.READY="ioBoardReady";a.CONNECTED="ioBoardConnected";a.DISCONNECTED="ioBoardDisonnected";a.prototype=JSUTILS.inherit(c.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketEvent");
BO.WSocketEvent=function(){var a,c=JSUTILS.Event;a=function(a){this.name="WSocketEvent";c.call(this,a)};a.CONNECTED="webSocketConnected";a.MESSAGE="webSocketMessage";a.CLOSE="webSocketClosed";a.prototype=JSUTILS.inherit(c.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.WSocketWrapper");
BO.WSocketWrapper=function(){var a,c=JSUTILS.EventDispatcher,e=BO.WSocketEvent;a=function(a,e,d){this.name="WSocketWrapper";c.call(this,this);this._host=a;this._port=e;this._protocol=d||"default-protocol";this._socket=null;this._readyState="";this.init(this)};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.init=function(a){if("undefined"!==typeof io){a._socket=io.connect("http://"+a._host+":"+a._port);try{a._socket.on("connect",function(){a._socket.socket.options.reconnect=
!1;a.dispatchEvent(new e(e.CONNECTED));a._socket.on("message",function(d){a.dispatchEvent(new e(e.MESSAGE),{message:d})})})}catch(b){console.log("Error "+b)}}else try{if("MozWebSocket"in window)a._socket=new MozWebSocket("ws://"+a._host+":"+a._port+"/websocket",a._protocol);else if("WebSocket"in window)a._socket=new WebSocket("ws://"+a._host+":"+a._port+"/websocket");else throw console.log("Websockets not supported by this browser"),"Websockets not supported by this browser";a._socket.onopen=function(){a.dispatchEvent(new e(e.CONNECTED));
a._socket.onmessage=function(d){a.dispatchEvent(new e(e.MESSAGE),{message:d.data})};a._socket.onclose=function(){a._readyState=a._socket.readyState;a.dispatchEvent(new e(e.CLOSE))}}}catch(d){console.log("Error "+d)}};a.prototype.send=function(a){this.sendString(a)};a.prototype.sendString=function(a){this._socket.send(a.toString())};a.prototype.__defineGetter__("readyState",function(){return this._readyState});return a}();JSUTILS.namespace("BO.filters.FilterBase");
BO.filters.FilterBase=function(){var a;a=function(){throw Error("Can't instantiate abstract classes");};a.prototype.processSample=function(){throw Error("Filter objects must implement the method processSample");};return a}();JSUTILS.namespace("BO.filters.Scaler");
BO.filters.Scaler=function(){var a,c=BO.filters.FilterBase;a=function(e,c,b,d,j,m){this.name="Scaler";this._inMin=e||0;this._inMax=c||1;this._outMin=b||0;this._outMax=d||1;this._type=j||a.LINEAR;this._limiter=m||!0};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.processSample=function(a){var c=this._outMax-this._outMin,a=(a-this._inMin)/(this._inMax-this._inMin);this._limiter&&(a=Math.max(0,Math.min(1,a)));return c*this._type(a)+this._outMin};a.LINEAR=function(a){return a};
a.SQUARE=function(a){return a*a};a.SQUARE_ROOT=function(a){return Math.pow(a,0.5)};a.CUBE=function(a){return a*a*a*a};a.CUBE_ROOT=function(a){return Math.pow(a,0.25)};return a}();JSUTILS.namespace("BO.filters.Convolution");
BO.filters.Convolution=function(){var a,c=BO.filters.FilterBase;a=function(a){this.name="Convolution";this._buffer=[];this.coef=a};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("coef",function(){return this._coef});a.prototype.__defineSetter__("coef",function(a){this._coef=a;this._buffer=Array(this._coef.length);for(var a=this._buffer.length,c=0;c<a;c++)this._buffer[c]=0});a.prototype.processSample=function(a){this._buffer.unshift(a);this._buffer.pop();
for(var a=0,c=this._buffer.length,b=0;b<c;b++)a+=this._coef[b]*this._buffer[b];return a};a.LPF=[1/3,1/3,1/3];a.HPF=[1/3,-2/3,1/3];a.MOVING_AVERAGE=[0.125,0.125,0.125,0.125,0.125,0.125,0.125,0.125];return a}();JSUTILS.namespace("BO.filters.TriggerPoint");
BO.filters.TriggerPoint=function(){var a,c=BO.filters.FilterBase;a=function(a){this.name="TriggerPoint";this._points={};this._range=[];void 0===a&&(a=[[0.5,0]]);if(a[0]instanceof Array)for(var c=a.length,b=0;b<c;b++)this._points[a[b][0]]=a[b][1];else"number"===typeof a[0]&&(this._points[a[0]]=a[1]);this.updateRange();this._lastStatus=0};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.processSample=function(a){for(var c=this._lastStatus,b=this._range.length,d=0;d<b;d++){var j=
this._range[d];if(j[0]<=a&&a<=j[1]){c=d;break}}return this._lastStatus=c};a.prototype.addPoint=function(a,c){this._points[a]=c;this.updateRange()};a.prototype.removePoint=function(a){delete this._points[a];this.updateRange()};a.prototype.removeAllPoints=function(){this._points={};this.updateRange()};a.prototype.updateRange=function(){this._range=[];var a=this.getKeys(this._points),c=a[0];this._range.push([Number.NEGATIVE_INFINITY,c-this._points[c]]);for(var c=a.length-1,b=0;b<c;b++){var d=a[b],j=
a[b+1],d=1*d+this._points[d],j=j-this._points[j];if(d>=j)throw Error("The specified range overlaps...");this._range.push([d,j])}a=a[a.length-1];this._range.push([1*a+this._points[a],Number.POSITIVE_INFINITY])};a.prototype.getKeys=function(a){var c=[],b;for(b in a)c.push(b);return c.sort()};return a}();JSUTILS.namespace("BO.generators.GeneratorEvent");
BO.generators.GeneratorEvent=function(){var a,c=JSUTILS.Event;a=function(a){c.call(this,a);this.name="GeneratorEvent"};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.UPDATE="update";return a}();JSUTILS.namespace("BO.generators.GeneratorBase");
BO.generators.GeneratorBase=function(){var a,c=JSUTILS.EventDispatcher;a=function(){c.call(this,this);this.name="GeneratorBase"};a.prototype=JSUTILS.inherit(c.prototype);a.prototype.constructor=a;a.prototype.__defineGetter__("value",function(){return this._value});a.prototype.__defineSetter__("value",function(a){this._value=a});return a}();JSUTILS.namespace("BO.generators.Oscillator");
BO.generators.Oscillator=function(){var a,c=BO.generators.GeneratorBase,e=BO.generators.GeneratorEvent,f=JSUTILS.Timer,b=JSUTILS.TimerEvent;a=function(d,b,e,u,B,k){c.call(this);this.name="Oscillator";this._wave=d||a.SIN;this._freq=b||1;this._amplitude=e||1;this._offset=u||0;this._phase=B||0;this._times=k||0;if(0===b)throw Error("Frequency should be larger than 0");this._autoUpdateCallback=this.autoUpdate.bind(this);this._timer=new f(33);this._timer.start();this.reset()};a.prototype=JSUTILS.inherit(c.prototype);
a.prototype.constructor=a;a.prototype.__defineSetter__("serviceInterval",function(a){this._timer.delay=a});a.prototype.__defineGetter__("serviceInterval",function(){return this._timer.delay});a.prototype.start=function(){this.stop();this._timer.addEventListener(b.TIMER,this._autoUpdateCallback);this._startTime=(new Date).getTime();this.autoUpdate(null)};a.prototype.stop=function(){this._timer.hasEventListener(b.TIMER)&&this._timer.removeEventListener(b.TIMER,this._autoUpdateCallback)};a.prototype.reset=
function(){this._time=0;this._lastVal=0.999};a.prototype.update=function(a){a=a||-1;this._time=0>a?this._time+this._timer.delay:this._time+a;this.computeValue()};a.prototype.autoUpdate=function(){this._time=(new Date).getTime()-this._startTime;this.computeValue()};a.prototype.computeValue=function(){var b=this._time/1E3;0!==this._times&&this._freq*b>=this._times?(this.stop(),this._value=this._wave!==a.LINEAR?this._offset:this._amplitude*this._wave(1,0)+this._offset):(b=this._freq*(b+this._phase),
this._value=this._amplitude*this._wave(b,this._lastVal)+this._offset,this._lastVal=b);this.dispatchEvent(new e(e.UPDATE))};a.SIN=function(a){return 0.5*(1+Math.sin(2*Math.PI*(a-0.25)))};a.SQUARE=function(a){return 0.5>=a%1?1:0};a.TRIANGLE=function(a){a%=1;return 0.5>=a?2*a:2-2*a};a.SAW=function(a){a%=1;return 0.5>=a?a+0.5:a-0.5};a.IMPULSE=function(a,b){return a%1<b%1?1:0};a.LINEAR=function(a){return 1>a?a:1};return a}();JSUTILS.namespace("BO.PinEvent");
BO.PinEvent=function(){var a,c=JSUTILS.Event;a=function(a){this.name="PinEvent";c.call(this,a)};a.CHANGE="pinChange";a.RISING_EDGE="risingEdge";a.FALLING_EDGE="fallingEdge";a.prototype=JSUTILS.inherit(c.prototype);return a.prototype.constructor=a}();JSUTILS.namespace("BO.Pin");
BO.Pin=function(){var a,c=JSUTILS.EventDispatcher,e=BO.PinEvent,f=BO.generators.GeneratorEvent;a=function(a,d){this.name="Pin";this._type=d;this._number=a;this._analogNumber=void 0;this._maxPWMValue=255;this._value=0;this._lastValue=-1;this._average=0;this._minimum=Math.pow(2,16);this._numSamples=this._sum=this._maximum=0;this._generator=this._filters=null;this._autoSetValueCallback=this.autoSetValue.bind(this);this._evtDispatcher=new c(this)};a.prototype={setAnalogNumber:function(a){this._analogNumber=
a},get analogNumber(){return this._analogNumber},get number(){return this._number},setMaxPWMValue:function(){this._maxPWMValue=value},get maxPWMValue(){return this._maxPWMValue},get average(){return this._average},get minimum(){return this._minimum},get maximum(){return this._maximum},get value(){return this._value},set value(a){this._lastValue=this._value;this._preFilterValue=a;this._value=this.applyFilters(a);this.calculateMinMaxAndMean(this._value);this.detectChange(this._lastValue,this._value)},
get lastValue(){return this._lastValue},get preFilterValue(){return this._preFilterValue},get filters(){return this._filters},set filters(a){this._filters=a},get generator(){return this._generator},getType:function(){return this._type},setType:function(b){if(0<=b&&b<a.TOTAL_PIN_MODES)this._type=b},getCapabilities:function(){return this._capabilities},setCapabilities:function(a){this._capabilities=a},detectChange:function(a,d){a!==d&&(this.dispatchEvent(new e(e.CHANGE)),0>=a&&0!==d?this.dispatchEvent(new e(e.RISING_EDGE)):
0!==a&&0>=d&&this.dispatchEvent(new e(e.FALLING_EDGE)))},clearWeight:function(){this._sum=this._average;this._numSamples=1},calculateMinMaxAndMean:function(a){var d=Number.MAX_VALUE;this._minimum=Math.min(a,this._minimum);this._maximum=Math.max(a,this._maximum);this._sum+=a;this._average=this._sum/++this._numSamples;this._numSamples>=d&&this.clearWeight()},clear:function(){this._minimum=this._maximum=this._average=this._lastValue=this._preFilterValue;this.clearWeight()},addFilter:function(a){if(null!==
a){if(null===this._filters)this._filters=[];this._filters.push(a)}},addGenerator:function(a){this.removeGenerator();this._generator=a;this._generator.addEventListener(f.UPDATE,this._autoSetValueCallback)},removeGenerator:function(){null!==this._generator&&this._generator.removeEventListener(f.UPDATE,this._autoSetValueCallback);this._generator=null},removeAllFilters:function(){this._filters=null},autoSetValue:function(){this.value=this._generator.value},applyFilters:function(a){if(null===this._filters)return a;
for(var d=this._filters.length,c=0;c<d;c++)a=this._filters[c].processSample(a);return a},addEventListener:function(a,d){this._evtDispatcher.addEventListener(a,d)},removeEventListener:function(a,d){this._evtDispatcher.removeEventListener(a,d)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,d){return this._evtDispatcher.dispatchEvent(a,d)}};a.HIGH=1;a.LOW=0;a.ON=1;a.OFF=0;a.DIN=0;a.DOUT=1;a.AIN=2;a.AOUT=3;a.PWM=3;a.SERVO=4;a.SHIFT=5;a.I2C=6;a.TOTAL_PIN_MODES=
7;return a}();JSUTILS.namespace("BO.I2CBase");
BO.I2CBase=function(){var a,c=BO.Pin,e=JSUTILS.EventDispatcher,f=BO.IOBoardEvent;a=function(b,d,j){if(void 0!=b){this.name="I2CBase";this.board=b;var m=j||0,j=m&255,m=m>>8&255;this._address=d;this._evtDispatcher=new e(this);d=b.getI2cPins();2==d.length?(b.getPin(d[0]).getType()!=c.I2C&&(b.getPin(d[0]).setType(c.I2C),b.getPin(d[1]).setType(c.I2C)),b.addEventListener(f.SYSEX_MESSAGE,this.onSysExMessage.bind(this)),b.sendSysex(a.I2C_CONFIG,[j,m])):console.log("Error, this board does not support i2c")}};a.prototype=
{get address(){return this._address},onSysExMessage:function(b){var b=b.message,d=this.board.getValueFromTwo7bitBytes(b[1],b[2]),c=[];if(b[0]==a.I2C_REPLY&&d==this._address){for(var d=3,e=b.length;d<e;d+=2)c.push(this.board.getValueFromTwo7bitBytes(b[d],b[d+1]));this.handleI2C(c)}},sendI2CRequest:function(b){var d=[],c=b[0];d[0]=b[1];d[1]=c<<3;for(var c=2,e=b.length;c<e;c++)d.push(b[c]&127),d.push(b[c]>>7&127);this.board.sendSysex(a.I2C_REQUEST,d)},update:function(){},handleI2C:function(){},addEventListener:function(a,
c){this._evtDispatcher.addEventListener(a,c)},removeEventListener:function(a,c){this._evtDispatcher.removeEventListener(a,c)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,c){return this._evtDispatcher.dispatchEvent(a,c)}};a.I2C_REQUEST=118;a.I2C_REPLY=119;a.I2C_CONFIG=120;a.WRITE=0;a.READ=1;a.READ_CONTINUOUS=2;a.STOP_READING=3;return a}();JSUTILS.namespace("BO.PhysicalInputBase");
BO.PhysicalInputBase=function(){var a,c=JSUTILS.EventDispatcher;a=function(){this.name="PhysicalInputBase";this._evtDispatcher=new c(this)};a.prototype={addEventListener:function(a,c){this._evtDispatcher.addEventListener(a,c)},removeEventListener:function(a,c){this._evtDispatcher.removeEventListener(a,c)},hasEventListener:function(a){return this._evtDispatcher.hasEventListener(a)},dispatchEvent:function(a,c){return this._evtDispatcher.dispatchEvent(a,c)}};return a}();JSUTILS.namespace("BO.IOBoard");
BO.IOBoard=function(){var a=224,c=240,e=247,f=111,b=107,d=BO.Pin,j=JSUTILS.EventDispatcher,m=BO.PinEvent,u=BO.WSocketEvent,B=BO.WSocketWrapper,k=BO.IOBoardEvent;return function(Q,R,S){function F(a){h.removeEventListener(k.FIRMWARE_NAME,F);var l=10*a.version;r("debug: Firmware name = "+a.name+"\t, Firmware version = "+a.version);23<=l?h.send([c,b,e]):console.log("error: You must upload StandardFirmata version 2.3 or greater from Arduino version 1.0 or higher")}function G(){r("debug: IOBoard ready");
H=!0;h.dispatchEvent(new k(k.READY));h.enableDigitalPins()}function I(a){a=a.substring(0,1);return a.charCodeAt(0)}function J(a){var c=a.target.getType(),b=a.target.number,a=a.target.value;switch(c){case d.DOUT:K(b,a);break;case d.AOUT:L(b,a);break;case d.SERVO:c=h.getDigitalPin(b),c.getType()==d.SERVO&&c.lastValue!=a&&L(b,a)}}function z(a){if(a.getType()==d.DOUT||a.getType()==d.AOUT||a.getType()==d.SERVO)a.hasEventListener(m.CHANGE)||a.addEventListener(m.CHANGE,J);else if(a.hasEventListener(m.CHANGE))try{a.removeEventListener(m.CHANGE,
J)}catch(c){r("debug: Caught pin removeEventListener exception")}}function L(g,l){var b=h.getDigitalPin(g).maxPWMValue,l=l*b,l=0>l?0:l,l=l>b?b:l;if(15<g||l>Math.pow(2,14)){var b=l,d=[];if(b>Math.pow(2,16))throw console.log("error: Extended Analog values > 16 bits are not currently supported by StandardFirmata"),"error: Extended Analog values > 16 bits are not currently supported by StandardFirmata";d[0]=c;d[1]=f;d[2]=g;d[3]=b&127;d[4]=b>>7&127;b>=Math.pow(2,14)&&(d[5]=b>>14&127);d.push(e);h.send(d)}else h.send([a|
g&15,l&127,l>>7&127])}function K(a,c){var b=Math.floor(a/8);if(c==d.HIGH)t[b]|=c<<a%8;else if(c==d.LOW)t[b]&=~(1<<a%8);else{console.log("warning: Invalid value passed to sendDigital, value must be 0 or 1.");return}h.sendDigitalPort(b,t[b])}function r(a){T&&console.log(a)}this.name="IOBoard";var h=this,s,o=[],t=[],v,C=[],M=[],N=[],p=[],w=0,O=19,H=!1,A="",x=0,y,P=!1,D=!1,T=BO.enableDebugging,E=!1;y=new j(this);s=new B(Q,R,S);s.addEventListener(u.CONNECTED,function(){r("debug: Socket Status: (open)");
h.dispatchEvent(new k(k.CONNECTED));h.addEventListener(k.FIRMWARE_NAME,F);h.reportFirmware()});s.addEventListener(u.MESSAGE,function(g){var b="";if(g.message.match(/config/))b=g.message.substr(g.message.indexOf(":")+2),"multiClient"===b&&(r("debug: Multi-client mode enabled"),P=!0);else if(g=g.message,g*=1,o.push(g),b=o.length,128<=o[0]&&o[0]!=c){if(3===b){var g=o,b=g[0],i;240>b&&(b&=240,i=g[0]&15);switch(b){case 144:var n=8*i;i=n+8;g=g[1]|g[2]<<7;b={};i>=w&&(i=w);for(var f=0,j=n;j<i;j++){b=h.getDigitalPin(j);
if(void 0==b)break;if(b.getType()==d.DIN&&(n=g>>f&1,n!=b.value))b.value=n,h.dispatchEvent(new k(k.DIGITAL_DATA),{pin:b});f++}break;case 249:x=g[1]+g[2]/10;h.dispatchEvent(new k(k.FIRMWARE_VERSION),{version:x});break;case a:if(b=g[1],g=g[2],i=h.getAnalogPin(i),void 0!==i)i.value=h.getValueFromTwo7bitBytes(b,g)/1023,i.value!=i.lastValue&&h.dispatchEvent(new k(k.ANALOG_DATA),{pin:i})}o=[]}}else if(o[0]===c&&o[b-1]===e){i=o;i.shift();i.pop();switch(i[0]){case 121:for(b=3;b<i.length;b+=2)g=String.fromCharCode(i[b]),
g+=String.fromCharCode(i[b+1]),A+=g;x=i[1]+i[2]/10;h.dispatchEvent(new k(k.FIRMWARE_NAME),{name:A,version:x});break;case 113:g="";f=i.length;for(n=1;n<f;n+=2)b=String.fromCharCode(i[n]),b+=String.fromCharCode(i[n+1]),g+=b.charAt(0);h.dispatchEvent(new k(k.STRING_MESSAGE),{message:g});break;case 108:if(!D){for(var b={},f=1,n=g=0,j=i.length,q;f<=j;)if(127==i[f]){M[g]=g;q=void 0;if(b[d.DOUT])q=d.DOUT;if(b[d.AIN])q=d.AIN,C[n++]=g;q=new d(g,q);q.setCapabilities(b);z(q);p[g]=q;q.getCapabilities()[d.I2C]&&
N.push(q.number);b={};g++;f++}else b[i[f]]=i[f+1],f+=2;v=Math.ceil(g/8);r("debug: Num ports = "+v);for(i=0;i<v;i++)t[i]=0;w=g;r("debug: Num pins = "+w);h.send([c,105,e])}break;case 110:E&&(g=i[2],b=p[i[1]],4<i.length&&h.getValueFromTwo7bitBytes(i[3],i[4]),b.getType()!=g&&(b.setType(g),z(b)),E=!1,h.dispatchEvent(new k(k.PIN_STATE_RESPONSE),{pin:b}));break;case 106:if(!D){g=i.length;for(b=1;b<g;b++)127!=i[b]&&(C[i[b]]=b-1,h.getPin(b-1).setAnalogNumber(i[b]));if(P){i=h.getPinCount();for(g=0;g<i;g++)h.queryPinState(h.getDigitalPin(g));
setTimeout(G,500);D=!0}else r("debug: System reset"),h.send(255),setTimeout(G,500)}break;default:h.dispatchEvent(new k(k.SYSEX_MESSAGE),{message:i})}o=[]}else 128<=g&&128>o[0]&&(console.log("warning: Malformed input data... resetting buffer"),o=[],g!==e&&o.push(g))});s.addEventListener(u.CLOSE,function(){r("debug: Socket Status: "+s.readyState+" (Closed)");h.dispatchEvent(new k(k.DISCONNECTED))});this.__defineGetter__("samplingInterval",function(){return O});this.__defineSetter__("samplingInterval",
function(a){10<=a&&100>=a?(O=a,h.send([c,122,a&127,a>>7&127,e])):console.log("warning: Sampling interval must be between 10 and 100")});this.__defineGetter__("isReady",function(){return H});this.getValueFromTwo7bitBytes=function(a,b){return b<<7|a};this.getSocket=function(){return s};this.reportVersion=function(){h.send(249)};this.reportFirmware=function(){h.send([c,121,e])};this.disableDigitalPins=function(){for(var a=0;a<v;a++)h.sendDigitalPortReporting(a,d.OFF)};this.enableDigitalPins=function(){for(var a=
0;a<v;a++)h.sendDigitalPortReporting(a,d.ON)};this.sendDigitalPortReporting=function(a,b){h.send([208|a,b])};this.enableAnalogPin=function(a){h.send([192|a,d.ON]);h.getAnalogPin(a).setType(d.AIN)};this.disableAnalogPin=function(a){h.send([192|a,d.OFF]);h.getAnalogPin(a).setType(d.AIN)};this.setDigitalPinMode=function(a,b){h.getDigitalPin(a).setType(b);z(h.getDigitalPin(a));h.send([244,a,b])};this.enablePullUp=function(a){K(a,d.HIGH)};this.getFirmwareName=function(){return A};this.getFirmwareVersion=
function(){return x};this.getPinCapabilities=function(){for(var a=[],b={"0":"input",1:"output",2:"analog",3:"pwm",4:"servo",5:"shift",6:"i2c"},c=0;c<p.length;c++){var d=[],e=0,h;for(h in p[c].getCapabilities()){var f=[];0<=h&&(f[0]=b[h],f[1]=p[c].getCapabilities()[h]);d[e]=f;e++}a[c]=d}return a};this.queryPinState=function(a){h.send([c,109,a.number,e]);E=!0};this.sendDigitalPort=function(a,b){h.send([144|a&15,b&127,b>>7])};this.sendString=function(a){for(var b=[],c=0,d=a.length;c<d;c++)b.push(I(a[c])&
127),b.push(I(a[c])>>7&127);this.sendSysex(113,b)};this.sendSysex=function(a,b){var d=[];d[0]=c;d[1]=a;for(var f=0,j=b.length;f<j;f++)d.push(b[f]);d.push(e);h.send(d)};this.sendServoAttach=function(a,b,i){var f=[],b=b||544,i=i||2400;f[0]=c;f[1]=112;f[2]=a;f[3]=b%128;f[4]=b>>7;f[5]=i%128;f[6]=i>>7;f[7]=e;h.send(f);a=h.getDigitalPin(a);a.setType(d.SERVO);z(a)};this.getPin=function(a){return p[a]};this.getAnalogPin=function(a){return p[C[a]]};this.getDigitalPin=function(a){return p[M[a]]};this.getPins=
function(){return p};this.analogToDigital=function(a){return h.getAnalogPin(a).number};this.getPinCount=function(){return w};this.getI2cPins=function(){return N};this.reportCapabilities=function(){for(var a={"0":"input",1:"output",2:"analog",3:"pwm",4:"servo",5:"shift",6:"i2c"},b=0,c=p.length;b<c;b++)for(var d in p[b].getCapabilities())console.log("Pin "+b+"\tMode: "+a[d]+"\tResolution (# of bits): "+p[b].getCapabilities()[d])};this.send=function(a){s.sendString(a)};this.close=function(){s.close()};
this.addEventListener=function(a,b){y.addEventListener(a,b)};this.removeEventListener=function(a,b){y.removeEventListener(a,b)};this.hasEventListener=function(a){return y.hasEventListener(a)};this.dispatchEvent=function(a,b){return y.dispatchEvent(a,b)}}}();
