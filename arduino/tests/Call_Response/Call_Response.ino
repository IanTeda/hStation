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
char* commandRequest = {"REQUEST"};

/**
  Arduino setup functtion
 **/
void setup() 
{
  // Start serial port at 9600 bps:
  Serial.begin(9600);
  
  // Delay serial port data send because of Arduino auto reset on serial connection (i.e. reboot)
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  } 
}

/**
  THE ARDUINO LOOP
 **/
void loop() 
{
  // Check to see if we have a serial connection
  if (Serial.available() > 0) 
  {
    readSerial();
  }
}

void readSerial()
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
    if (strcmp(commandRequest, command) == 0) 
    {
      Serial.print("Request sensor readings");
      Serial.print("; ");
      Serial.println("Second reading");
      Serial.flush(); // Wait for TX to complete before progressing
      //delay(1000);
    }
  }
}
