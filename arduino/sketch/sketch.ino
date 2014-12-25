#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h> // Lux
#include <Adafruit_BMP085_U.h> // Pressure
#include <dht.h> // Humidity
#include <Adafruit_SI1145.h> // IR

/*
   WEATHER STATION SKETCH
   Version : 0.0.0
   Name    : Alpha
*/

dht DHT; // DHT is dht

#define DHT22_PIN 2 // Arduino pin for DHT22 sesnor

/**
* SETUP THE ARDUINO LOOP
* Standard function automatically called at startup
*/
void setup(void) 
{
  Serial.begin(9600); // Start serial port at 9600 bps:
  
  while (!Serial) { /* wait for serial port to connect. Needed for Leonardo only */ } 
  
  // TODO: Don't think I need this
  //establishContact();  // Send handshake to let the other end know we are here
}

/**
*  ARDUINO LOOP
*  Arduino loop function, called once 'setup' is complete
*/
void loop(void) 
{
  
}

/**
* ESTABLISH SERIAL CONNECTION
* Hand shake serial connection
*/
void establishContact(void) 
{
  while (Serial.available() <= 0) 
  {
    Serial.println("===================");
    Serial.println("Weather Station Sketch");
    Serial.println("Version: 0.0.0");
    Serial.println("Name: Alpha");
    Serial.println("===================");
    delay(300);
  }
}

void getDht22SensorReadings()
{
  
}
 


