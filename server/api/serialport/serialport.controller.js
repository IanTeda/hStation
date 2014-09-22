'use strict';

var _ = require('lodash');
var SerialPort = require('serialport');
var Settings = require('./../settings/settings.model');
var winston = require('./../../config/winston');

// Return list of serial ports available
exports.index = function (req, res) {
  SerialPort.list(function (err, ports) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, ports);
  });
};

/**
 * Search for Arduino connected to a Serial Port
 * @param req
 * @param res
 */
exports.searchAndSave = function (req, res) {

  // Return all the serial ports connected
  SerialPort.list(function (err, ports) {

    // Set the serial port to null before we start looking
    var port = null;

    // Interate through ports looking for the Arduino
    ports.forEach(function (p) {

      // This should work on windows and osx
      if (p.manufacturer.indexOf('Arduino') !== -1) {
        port = p.comName;

        // This will work on raspberry linux (i.e pi)
      } else if (p.hasOwnProperty('pnpId')) {
        // FTDI captures the duemilanove //
        // Arduino captures the leonardo //
        if (p.pnpId.search('FTDI') != -1 || p.pnpId.search('Arduino') != -1) {
          port = p.comName;
        }
      }
    });

    // If the Arduino is not found set the port to not found
    if (!port) {
      port = 'Not Found';

    // Else save the found port to the database
    } else {

      // Get the first setting in the databse, update serial port and save
      Settings.findOne({}, {}, { sort: { 'created_at': -1 } }, function (err, setting) {
        setting.serialport = port;
        setting.save(function (err) {
          if (err) {
            winston.error('serialport.controller.js error2: ' + err);
          }
          else {
            winston.info('Saved found serial port to database');
          }
        });
      });
    }
    ;

    // Create JSON object to return from API call
    var json = {
      com: port
    };

    return res.json(200, json);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}