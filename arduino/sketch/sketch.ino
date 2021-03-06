#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_TSL2561_U.h> // Lux
#include <Adafruit_BMP085_U.h> // Pressure
#include <dht.h> // Humidity
#include <Adafruit_SI1145.h> // IR
#include <SoftwareSerial.h> // SoftwareSerial is used to communicate with the XBee

/*
   WEATHER STATION SKETCH
   Version : 0.0.0
   Name    : Alpha
*/

#define DHT22_PIN 2 // Arduino pin for DHT22 sesnor
#define MAX_COMMAND_LENGTH 255 // Max incoming serial buffer length 

// Assign variables to sensors
dht DHT; // DHT is dht

// Arduino RX, TX (XBee Dout, Din)
SoftwareSerial XBee(2, 3);

/**
* ADAFRUIT UNIFIED SENSOR LIBRARY
* Assign a unique ID to this sensor for use withthe Adafruit Sensor API
*/
Adafruit_BMP085_Unified BMP = Adafruit_BMP085_Unified(10085);
Adafruit_TSL2561_Unified TSL = Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 73521);
Adafruit_SI1145 SI = Adafruit_SI1145();

// Initialise variables
double DHT_Temperature = -1000;
double DHT_Humidity = -1;
double DHT_DewPoint = -1;
double BMP_Pressure = -1;
double BMP_Temperature = -1000;
double TSL_Lux = -1;
double SI_UltraViolet = -1;
float SI_InfraRed = -1;

/*
* VARIABLES FOR CALL RESPONSE
*/
char resetByte = '!'; // Reset byte used to recover from deadlocks
char stopByte = '#'; // Serial comms means one byte at a time, so we need to known when to assemble the command
char lockByte = '@'; // Lock byte
int incomingByte = 0; // Set initial incomming buffer to zero
int charCount = 0; // Set initial character count for incoming buffer to zero
char command[MAX_COMMAND_LENGTH + 1]; // // Set max command length and leave space for stop
bool locked = false; // Set inital value of lock to false
bool debug = true; // Set debug value for console/serial prints

// Command messages
char* WEATHER = {"WEATHER"};


/*
   SETUP THE ARDUINO LOOP
   Standard function automatically called at startup
*/
void setup(void) 
{
  // Initialize XBee Software Serial port. Make sure the baud
  // rate matches your XBee setting (9600 is default).
  XBee.begin(9600);   
}

/*
   ARDUINO LOOP
   Arduino loop function, called once 'setup' is complete
*/
void loop(void) 
{
  // In loop() we continously check to see if a command has been
  //  received.
  if (XBee.available())
  {
    readXBee();
  }
}

void readXBee()
{
  incomingByte = XBee.read();
  
  //XBee.println(F("Arduino XBee Remote Control!"));
  
  // Check to see if we have a reset byte coming in
  if ((char)incomingByte == resetByte) 
  {
    // Reset incoming buffer
    locked = false;
    charCount = 0;
    return;
  }

  // Check to see if the serial connection is locked
  if (locked) 
  {
    // Send locked serial byte
    //sendMessage((char*) lockByte);
    return;
  }

  // Check if we have an incoming byte in the buffer that isn't a stop byte
  if ((char)incomingByte != stopByte) 
  {
    // Check if we have reached our max serial command length
    if (charCount > MAX_COMMAND_LENGTH - 1) 
    {
        
      // Send locked byte and set locked to true
      //sendMessage((char*) lockByte);
      locked = true;
      return;
    }
    else 
    {
      command[charCount] = (char)incomingByte;
      charCount++;
    }
  }
  else 
  {
    command[charCount] = '\0';
    charCount = 0;
    if (strcmp(WEATHER, command) == 0) 
    {
      //sendReadings();
      XBee.println("Setting weather ");
    }
  }
  
}

void sendReadings()
{
  getDht22SensorReadings();
  getBmpSensorReadings();
  getTslSensorReading();
  getSiSensorReading();
  
  XBee.print("!");
  XBee.print("WEATHER >");
  XBee.print("temperature: ");  
  XBee.print(DHT_Temperature);
  XBee.print(", humidity: ");
  XBee.print(DHT_Humidity);
  XBee.print(", dewPoint: ");
  XBee.print(DHT_DewPoint);
  //XBee.print(", BMP Temperature: ");
  //XBee.print(BMP_Temperature);
  XBee.print(", barometricPressure: ");
  XBee.print(BMP_Pressure);
  XBee.print(", lux: ");
  XBee.print(TSL_Lux);
  XBee.print(", ultraviolet: ");
  XBee.print(SI_UltraViolet);
  XBee.print(", infrared: ");
  XBee.print(SI_InfraRed);
  XBee.println("#");
  
  //Serial.flush(); // Wait for TX to complete before progressing
  
  //delay(1000); 
}

/**
*  DHT22 SENSOR READINGS
*  Poll DHT22 sensor for readings
*/
void getDht22SensorReadings()
{
  // READ DATA
  int chk = DHT.read22(DHT22_PIN);
  switch (chk)
  {
    case DHTLIB_OK:  
		// Everything ok with sensor so assign readings
                DHT_Temperature = DHT.temperature;
                DHT_Humidity = DHT.humidity;
                DHT_DewPoint = calculateDewPoint(DHT_Temperature, DHT_Humidity);
		break;
    case DHTLIB_ERROR_CHECKSUM: 
		Serial.print("DHT Checksum error,\t"); 
		break;
    case DHTLIB_ERROR_TIMEOUT: 
		Serial.print("DHT Time out error,\t"); 
		break;
    default: 
		Serial.print("DHT Unknown error,\t"); 
		break;
  }
  // DISPLAY DATA


  delay(1000);
  
}

/**
*  CALCULATE DEW POINT READING
*  Calculate dew point from temperature and humidity
*  reference (1) : http://wahiduddin.net/calc/density_algorithms.htm
*  reference (2) : http://www.colorado.edu/geography/weather_station/Geog_site/about.htm
*/
double calculateDewPoint(double celsius, double humidity)
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

/*
* INITIALISE THE BMP BAROMETRIC PRESSURE SENSOR
* Check for error in BMP sensor
*/
void initBmpSensor()
{
  // Ping the sensor
  if(!BMP.begin())
  {
    /* There was a problem detecting the BMP085 ... check your connections */
    Serial.print("Ooops, no BMP085 detected ... Check your wiring or I2C ADDR!");
    while(1);
  }
}

/*
* GET BMP SENSOR READINGS
* Poll BMP sensor for pressure and temperature
*/
void getBmpSensorReadings()
{
  
  initBmpSensor();
  
  // Create a new sensor event
  sensors_event_t event;
  BMP.getEvent(&event);
  
  // 
  float temperature;
  BMP.getTemperature(&temperature);
  
  BMP_Pressure = event.pressure;
  BMP_Temperature = temperature;
}

/*
* INITIALISE THE TSL LUX SENSOR
* Ping the TSL sensors and check for an error
*/
void initTslSensor()
{
  // Ping the sensor
  if(!TSL.begin())
  {
    /* There was a problem detecting the ADXL345 ... check your connections */
    Serial.print("Ooops, no TSL2561 detected ... Check your wiring or I2C ADDR!");
    while(1);
  }
}

/*
* CONFIGURE THE TSL LUX SENSOR
* Configure range and intergration time for sensor
*/
void configTslSensor()
{
  /* You can also manually set the gain or enable auto-gain support */
  // tsl.setGain(TSL2561_GAIN_1X);      /* No gain ... use in bright light to avoid sensor saturation */
  // tsl.setGain(TSL2561_GAIN_16X);     /* 16x gain ... use in low light to boost sensitivity */
  TSL.enableAutoRange(true);            /* Auto-gain ... switches automatically between 1x and 16x */
  
  /* Changing the integration time gives you better sensor resolution (402ms = 16-bit data) */
  TSL.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS);      /* fast but low resolution */
  // tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_101MS);  /* medium resolution and speed   */
  // tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_402MS);  /* 16-bit data but slowest conversions */
}

/*
* GET TSL LIGHT SENSOR READINGS
* Get measurement of light from TSL sensor
*/
void getTslSensorReading()
{
  
  initTslSensor();
  configTslSensor();
  
  // Create new sensor event 
  sensors_event_t event;
  TSL.getEvent(&event);
 
  /* Display the results (light is measured in lux) */
  if (event.light)
  {
    TSL_Lux = event.light;
  }
  else
  {
    /* If event.light = 0 lux the sensor is probably saturated
       and no reliable data could be generated! */
    Serial.println("TSL Sensor saturated");
  }
}

/*
* INITIALISE THE SI UV SENSOR
* Ping the SI sensors and check for an error
*/
void initSiSensor()
{
  // Ping the sensor
  if(!SI.begin())
  {
    /* There was a problem detecting the ADXL345 ... check your connections */
    Serial.print("Ooops, no SI1145 detected ... Check your wiring or I2C ADDR!");
    while(1);
  }
}

/*
* GET SI UV SENSOR READINGS
* Get infra read sensor readings
*/
void getSiSensorReading()
{
  
  // Initialise SI sensor
  initSiSensor();
  
  // The index is multiplied by 100 so to get the integer index, divide by 100!
  float UVindex = SI.readUV();
  UVindex /= 100.0;
  
  SI_UltraViolet = UVindex;
  SI_InfraRed = SI.readIR();
  
}

/*
 * What voltage am I getting
 * i.e what is my battery level
 * http://provideyourown.com/2012/secret-arduino-voltmeter-measure-battery-voltage/
 */

long readVcc() {
  // Read 1.1V reference against AVcc
  // set the reference to Vcc and the measurement to the internal 1.1V reference
  #if defined(__AVR_ATmega32U4__) || defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
    ADMUX = _BV(REFS0) | _BV(MUX4) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  #elif defined (__AVR_ATtiny24__) || defined(__AVR_ATtiny44__) || defined(__AVR_ATtiny84__)
    ADMUX = _BV(MUX5) | _BV(MUX0);
  #elif defined (__AVR_ATtiny25__) || defined(__AVR_ATtiny45__) || defined(__AVR_ATtiny85__)
    ADMUX = _BV(MUX3) | _BV(MUX2);
  #else
    ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  #endif

  delay(2); // Wait for Vref to settle
  ADCSRA |= _BV(ADSC); // Start conversion
  while (bit_is_set(ADCSRA,ADSC)); // measuring

  uint8_t low  = ADCL; // must read ADCL first - it then locks ADCH
  uint8_t high = ADCH; // unlocks both

  long result = (high<<8) | low;

  result = 1125300L / result; // Calculate Vcc (in mV); 1125300 = 1.1*1023*1000
  return result; // Vcc in millivolts
}

/*
 * Read the Arduino temperature
 * http://www.instructables.com/id/Hidden-Arduino-Thermometer/
 */
 
 float arduinoTemp = normalizeTemperature(readArduinoTemp);
 
 float normalizeTemperature(long rawData) { 
  // replace these constants with your 2 data points
  // these are sample values that will get you in the ballpark (in degrees C)
  float temp1 = 0;
  long data1 = 274;
  float temp2 = 25.0;
  long data2 = 304;
 
  // calculate the scale factor
  float scaleFactor = (temp2 - temp1) / (data2 - data1);

  // now calculate the temperature
  float temp = scaleFactor * (rawData - data1) + temp1;

  return temp;
}
 
long readArduinoTemp() { 
  // Read temperature sensor against 1.1V reference
  #if defined(__AVR_ATmega32U4__)
    ADMUX = _BV(REFS1) | _BV(REFS0) | _BV(MUX2) | _BV(MUX1) | _BV(MUX0);
    ADCSRB = _BV(MUX5); // the MUX5 bit is in the ADCSRB register
  #elif defined (__AVR_ATtiny24__) || defined(__AVR_ATtiny44__) || defined(__AVR_ATtiny84__)
    ADMUX = _BV(REFS1) | _BV(MUX5) | _BV(MUX1);
  #elif defined (__AVR_ATtiny25__) || defined(__AVR_ATtiny45__) || defined(__AVR_ATtiny85__)
    ADMUX = _BV(REFS1) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1) | _BV(MUX0);
  #else
    ADMUX = _BV(REFS1) | _BV(REFS0) | _BV(MUX3);
  #endif

  delay(2); // Wait for ADMUX setting to settle
  ADCSRA |= _BV(ADSC); // Start conversion
  while (bit_is_set(ADCSRA,ADSC)); // measuring

  uint8_t low = ADCL; // must read ADCL first - it then locks ADCH
  uint8_t high = ADCH; // unlocks both
  long result = (high << 8) | low; // combine the two

  return result;
}




 


