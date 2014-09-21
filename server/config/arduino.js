'use strict';

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var winston = require('./winston');

function Arduino(){

  // Add object properties like this
  this.name = name;
  this.gender = gender;
}

// Add methods like this.  All Person objects will be able to invoke this
Person.prototype.speak = function(){
  alert("Howdy, my name is" + this.name);
}