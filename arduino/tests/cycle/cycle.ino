#include <Wire.h>
#include <TimedAction.h> // Reference http://playground.arduino.cc/Code/TimedAction
#include <dht.h> // Reference http://playground.arduino.cc/Main/DHTLib
#include <Adafruit_Sensor.h> // Reference https://github.com/adafruit/Adafruit_Sensor
#include <Adafruit_BMP085_U.h> // Reference https://github.com/adafruit/Adafruit_BMP085_Unified

/* This sketch will cycle through readings over a set CYCLE_TIME for a set number of INTERVALS
   Returning an average reading for that time
*/

dht DHT;
Adafruit_BMP085_Unified bmp = Adafruit_BMP085_Unified(10085); // Assign sensor type for unified driver
#define DHT22_PIN 2 // What pin is the DHT22 pluged into

// How are we going to communicate over the serial
char resetByte = '!'; // Reset byte used to recover from deadlocks
char stopByte = '#'; // Serial comms means one byte at a time, so we need to known when to assemble the command
char lockByte = '@'; // Lock byte 

// Easy variables for time
int SECONDS = 1000;
int MINUTES = 60000;
int HOURS = 3600000;
int DAYS = 86400000;

// Assign cycle time
long CYCLE_TIME = 60000; // Send readings every, timing needs to be in long so cast away
long INTERVAL = 30000; // Get readings every

// Variables for calculating averages
double accumulatedTemperature;
double accumulatedHumidity;
double accumulatedDewPoint;
double accumulatedPressure;
int numberOfTemperatureReadings;
int numberOfHumidityReadings;
int numberOfDewPointReadings;
int numberOfPresuureReadings;

// Initialise Timed Actions to check sensors
TimedAction timerDHTSensorReading = TimedAction(30000,getDHTSensorReadings); // TODO: Doesn't work when using variables for time
TimedAction timerBMPSensorReading = TimedAction(30000,getBMPSensorReadings); // TODO: Doesn't work when using variables for time

// Initialise Timed Actions to send average sensor readings
TimedAction timerDHTSend = TimedAction(600000,sendDHTSensorReading); // TODO: Doesn't work when using variables for time
TimedAction timerBMPSend = TimedAction(600000,sendBMPSensorReading); // TODO: Doesn't work when using variables for time

/**
 * Arduino setup function
 **/
void setup() 
{
  Serial.begin(9600);

  while (!Serial) 
  {
    ; // Wait for serial connection before leaving setup()
  }
  
  // Initialise BMP sensor
  if(!bmp.begin()) 
  {
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
  timerDHTSensorReading.check();  
  timerBMPSensorReading.check();
  timerDHTSend.check();
  timerBMPSend.check();
}

/**
 * Get temperature and humidity readings from the DHT Sensor
 */
void getDHTSensorReadings()
{
  
  // Read pin and verify checksum
  int chk = DHT.read22(DHT22_PIN);
  
  switch (chk)
  {
      case DHTLIB_OK:  
          // Get temperature reading
          accumulatedTemperature = accumulatedTemperature + DHT.temperature;
          // Increment number of readings by one
          ++numberOfTemperatureReadings;
                  
          // Get humidity reading
          accumulatedHumidity = accumulatedHumidity + DHT.humidity;
          // Increment number of readings by one
          ++numberOfHumidityReadings;

          // Calculate dew point reading
          accumulatedDewPoint = accumulatedDewPoint + getDewPoint(DHT.temperature, DHT.humidity);
          // Increment number of readings by one
          ++numberOfDewPointReadings;
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

/**
 * Calculate average DHT readings and send over serial
 */
void sendDHTSensorReading()
{
  
  // Calculate average temperature
  double averageTemperature = accumulatedTemperature / numberOfTemperatureReadings;
  // Set sensor for serial message
  char* sensor1 = "Temperature";
  // Send average temperature communication
  sendMessage(sensor1, averageTemperature);
  // Reset accumulated value and counter
  accumulatedTemperature = 0;
  numberOfTemperatureReadings = 0;
  
  // Calculate average humidity
  double averageHumidity = accumulatedHumidity / numberOfHumidityReadings;
  // Set sensor for serial message
  char* sensor2 = "Humidity";
  // Send average humidity communication
  sendMessage(sensor2, averageHumidity);
  // Reset accumulated value and counter
  accumulatedHumidity = 0;
  numberOfHumidityReadings = 0;

  // Calculate average dew point
  double averageDewPoint = accumulatedDewPoint / numberOfDewPointReadings;
  // Set sensor for serial message
  char* sensor3 = "Dew_Point";
  // Send average dew point communication
  sendMessage(sensor3, averageDewPoint);
  // Reset accumulated value and counter
  accumulatedDewPoint = 0;
  numberOfDewPointReadings = 0;
}

// Get barometric pressure readings from BMP sensors
void getBMPSensorReadings()
{ 
  
  // Get a new sensor event
  sensors_event_t event;
  bmp.getEvent(&event);
  
  if (event.pressure) 
  {
    
    // Get atmospheric pressure in hPa
    accumulatedPressure = accumulatedPressure + event.pressure;
    // Increment number of readings by one
    ++numberOfPresuureReadings;
    
    // We do not need the altidue so not going to worring about the temperature, SLP and altitude conversion
  } 
  else 
  {
    sendErrorMessage("BMP sensor error");
  }
}

/**
 * Calculate average DHT readings and send over serial
 */
void sendBMPSensorReading()
{

  // Calculate average temperature
  double averagePressure = accumulatedPressure / numberOfPresuureReadings;
  // Set sensor for serial message
  char* sensor1 = "Pressure";
  // Send average temperature communication
  sendMessage(sensor1, averagePressure);
  // Reset accumulated value and counter
  accumulatedPressure = 0;
  numberOfPresuureReadings = 0;
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
void sendMessage(char* sensor, double reading)
{
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
void sendErrorMessage(char* message)
{
  Serial.print(resetByte);
  Serial.print('Error: ');
  Serial.print(message);
  Serial.println(stopByte);
  
  // Pause for 1 second before sending the next message
  delay(1*SECONDS);
}

// Send an empty message to establish serial communication
void establishContact() 
{
  if (Serial.available()) {
    Serial.print(resetByte + stopByte);  // Empty replay
    delay(300);
  }
}


