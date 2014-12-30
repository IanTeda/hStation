#include <Wire.h>
#include <TimedAction.h> // Reference http://playground.arduino.cc/Code/TimedAction
#include <dht.h> // Reference http://playground.arduino.cc/Main/DHTLib
#include <Adafruit_Sensor.h> // Reference https://github.com/adafruit/Adafruit_Sensor
#include <Adafruit_BMP085_U.h> // Reference https://github.com/adafruit/Adafruit_BMP085_Unified

/* This driver uses the Adafruit unified sensor library (Adafruit_Sensor),
   which provides a common 'type' for sensor data and some helper functions.
   
   To use this driver you will also need to download the Adafruit_Sensor
   library and include it in your libraries folder.

   You should also assign a unique ID to this sensor for use with
   the Adafruit Sensor API so that you can identify this particular
   sensor in any data logs, etc.  To assign a unique ID, simply
   provide an appropriate value in the constructor below (12345
   is used by default in this example).
   
   Connections
   ===========
   Connect SCL to analog 5
   Connect SDA to analog 4
   Connect VDD to 3.3V DC
   Connect GROUND to common ground
    
   History
   =======
   2013/JUN/17  - Updated altitude calculations (KTOWN)
   2013/FEB/13  - First version (KTOWN)
*/

dht DHT;

// Assign sensor type to Unified driver
Adafruit_BMP085_Unified bmp = Adafruit_BMP085_Unified(10085);

#define MAX_COMMAND_LENGTH 255
#define DHT22_PIN 2


char resetByte = '!'; // Reset byte used to recover from deadlocks
char stopByte = '#'; // Serial comms means one byte at a time, so we need to known when to assemble the command
char lockByte = '@'; // Lock byte 

// Easy variables for time
int SECONDS = 1000;
int MINUTES = 60 * SECONDS;
int HOURS = 60 * MINUTES;
int DAYS = 24 * HOURS;

// InitialiSes a TimedAction to check sensors
TimedAction timerDHTSensor = TimedAction(5*SECONDS, getDHTSensorReadings);
TimedAction timerBMPSensor = TimedAction(5*SECONDS, getBMPSensorReadings);


/**
 * Arduino setup functtion
 **/
void setup() {
  Serial.begin(9600);

  while (!Serial) {
    ; // Wait for serial connection before leaving setup()
  }
  
  // Initialise BMP sensor
  if(!bmp.begin()) {
    // There was a problem detecting the BMP085 ... check your connections
    sendErrorMessage("No BMP085 detected.. Check your wiring or I2C ADDR!");
    while(1);
  }
  
  establishContact(); // Establish contact before exiting setup. Not sure if this is needed
}

/**
 * The Arduino loop
 **/
void loop() {
  timerDHTSensor.check();
  timerBMPSensor.check();
}


void getBMPSensorReadings(){
  
  // Get a new sensor event
  sensors_event_t event;
  bmp.getEvent(&event);
  
  if (event.pressure) {
    
    // Get atmospheric pressure in hPa
    double pressure = event.pressure;
    // Set sensor for serial message
    char* sensor = "Pressure";
    // Send serial communication
    sendMessage(sensor, pressure);
    
    // We do not need the altidue so not going to worring about the temperature, SLP and altitude conversion
  } else {
    sendErrorMessage("BMP sensor error");
  }
  
  
}

/**
 * Get temperature and humidity readings from the DHT Sensor
 */
void getDHTSensorReadings(){
  // Read pin and verify checksum
  int chk = DHT.read22(DHT22_PIN);
  
  switch (chk)
  {
    case DHTLIB_OK:  
		{
                  // Get temperature
                  double temperature = DHT.temperature;
                  // Set sensor for serial message
                  char* sensor1 = "Temperature";
                  // Send serial communication
                  sendMessage(sensor1, temperature);
                  
                  // Get temperature
                  double humidity = DHT.humidity;
                  // Set sensor for serial message
                  char* sensor2 = "Humidity";
                  // Send serial communication
                  sendMessage(sensor2, humidity);
                  
                  // Get temperature
                  double dew_point = getDewPoint(temperature, humidity);
                  // Set sensor for serial message
                  char* sensor3 = "Dew_Point";
                  // Send serial communication
                  sendMessage(sensor3, dew_point);
                }
		break;
    case DHTLIB_ERROR_CHECKSUM:
                sendErrorMessage("DHT checksum error"); 
		break;
    case DHTLIB_ERROR_TIMEOUT: 
		sendErrorMessage("DHT timeout error");
		break;
    default: 
                sendErrorMessage("Unknown error"); 
		break;
  }
}

// dewPoint function NOAA
// reference (1) : http://wahiduddin.net/calc/density_algorithms.htm
// reference (2) : http://www.colorado.edu/geography/weather_station/Geog_site/about.htm
//
double getDewPoint(double celsius, double humidity)
{
	// (1) Saturation Vapor Pressure = ESGG(T)
	double RATIO = 373.15 / (273.15 + celsius);
	double RHS = -7.90298 * (RATIO - 1);
	RHS += 5.02808 * log10(RATIO);
	RHS += -1.3816e-7 * (pow(10, (11.344 * (1 - 1/RATIO ))) - 1) ;
	RHS += 8.1328e-3 * (pow(10, (-3.49149 * (RATIO - 1))) - 1) ;
	RHS += log10(1013.246);

        // factor -3 is to adjust units - Vapor Pressure SVP * humidity
	double VP = pow(10, RHS - 3) * humidity;

        // (2) DEWPOINT = F(Vapor Pressure)
	double T = log(VP/0.61078);   // temp var
	return (241.88 * T) / (17.558 - T);
}

/**
  Send a message over serial.
  Serial is one by one byte so we need to add a start and stop byte so the other end knows when th stop adding to the buffer
**/
void sendMessage(char* sensor, double reading){
  Serial.print(resetByte);
  Serial.print(sensor);
  Serial.print(':');
  Serial.print(reading);
  Serial.println(stopByte);
  
  // Pause for 1 second before sending the next message
  delay(1*SECONDS);
}

/**
  Send an error message over serial.
  Serial is one by one byte so we need to add a start and stop byte so the other end knows when th stop adding to the buffer
**/
void sendErrorMessage(char* message){
  Serial.print(resetByte);
  Serial.print('Error: ');
  Serial.print(message);
  Serial.println(stopByte);
  
  // Pause for 1 second before sending the next message
  delay(1*SECONDS);
}

// Send an empty message to establish serial communication
void establishContact() {
  if (Serial.available()) {
    Serial.print(resetByte + stopByte);  // Empty replay
    delay(300);
  }
}


