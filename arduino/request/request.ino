#define MAX_COMMAND_LENGTH 255

// Reset byte used to recover from deadlocks
char resetByte = '!';
// Serial comms means one byte at a time, so we need to known when to assemble the command
char stopByte = '#';
// Lock byte
char lockByte = '@';
// Set initial incomming buffer to zero
int incomingByte = 0;
// Set initial character count for incoming buffer to zero
int charCount = 0;
// Set initial max command length
char command[MAX_COMMAND_LENGTH + 1]; // leave space for \0
// Set inital value of lock to false
bool locked = false;
// Set debug value for console/serial prints
bool debug = false;

// Command messages
char* commandAll = {"ALL"};
char* commandTemperatureDHT = {"DHT_TEMPERATURE"};
char* commandTemperatureBMP = {"BMP_TEMPERATURE"};
char* commandHumidity = {"HUMIDITY"};
char* commandPressure = {"PRESSURE"};

/**
  Arduino setup functtion
 **/
void setup() 
{
  // Start serial port at 9600 bps:
  Serial.begin(9600);
  
  // Delay serial port data send because of Arduino auto reset on serial connection (i.e. reboot)
  while (!Serial) 
  {
    ; // wait for serial port to connect. Needed for Leonardo only
  } 
  
  establishContact();  // send a byte to establish contact until receiver responds 
}

/**
  THE ARDUINO LOOP
 **/
void loop() 
{
  // Check t see if we have a serial connection
  if (Serial.available()) 
  {
    
    // Add incoming bytes from serial port to buffer
    incomingByte = Serial.read();

    if (debug)
    {
      Serial.println("incomingByte: " + incomingByte);
    }
    
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
      sendMessage((char*) lockByte);
      return;
    }

    // Check if we have an incoming byte in the buffer that isn't a stop byte
    if ((char)incomingByte != stopByte) 
    {
      // Check if we have reached our max serial command length
      if (charCount > MAX_COMMAND_LENGTH - 1) 
      {
        
        // Send locked byte and set locked to true
        sendMessage((char*) lockByte);
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
      if (strcmp(commandAll, command) == 0) 
      {
        char* sensor = commandAll;
        double reading = -111;
        sendReading(sensor, reading);
      }
      else if (strcmp(commandTemperatureDHT, command) == 0) 
      {
        char* sensor = commandTemperatureDHT;
        double reading = -112;
        sendReading(sensor, reading);
      }
    }
  }
}

/**
 *  SEND A MESSAGE OVER SERIAL
 * Serial is one by one byte so we need to add a start and stop byte so the other end knows when th stop adding to the buffer
 **/
void sendReading(char* sensor, double reading)
{
  Serial.print(resetByte);
  Serial.print(sensor);
  Serial.print(':');
  Serial.print(reading);
  Serial.println(stopByte);
  
  // Pause for 1 second before sending the next message
  delay(1*1000);
}

/**
 *  SEND A MESSAGE OVER SERIAL
 * Serial is one by one byte so we need to add a start and stop byte so the other end knows when th stop adding to the buffer
 **/
void sendMessage(char* message)
{
  Serial.print(resetByte);
  Serial.print(message);
  Serial.println(stopByte);
  
  // Pause for 1 second before sending the next message
  delay(1*1000);
}

/**
 * ESTABLISH CONTACT
 **/
void establishContact() 
{
  if (Serial.available()) 
  {
    Serial.print(resetByte + stopByte);  // Empty replay
    delay(1*1000);
  }
}
