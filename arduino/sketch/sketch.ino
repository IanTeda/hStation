#define MAX_COMMAND_LENGTH 255

int SECONDS = 1000;
int MINUTES = 60 * SECONDS;
int HOURS = 60 * MINUTES;
int DAYS = 24 * HOURS;

//this initializes a TimedAction class
//TimedAction timedAction = TimedAction(5000,checkTemperatureDHT);

// Send reply that command understood
char* replyOK = {"OK\n"};

// Reset byte used to recover from deadlocks
char resetByte = '!';

// Serial comms means one byte at a time, so we need to known when to assemble the command
char stopByte = '#';

// Lock byte
char lockByte = '@';

// Command messages
char* commandAll = {"ALL"};
char* commandTemperatureDHT = {"DHT_TEMPERATURE"};
char* commandTemperatureBMP = {"BMP_TEMPERATURE"};
char* commandHumidity = {"HUMIDITY"};
char* commandBarometricPressure = {"BAROMETRIC_PRESSURE"};
char* commandAltitude = {"ALTITUDE"};

// TODO: should delete
int delaySerialSend = 0;

// Intialise variables
int incomingByte = 0;
int charCount = 0;
char command[MAX_COMMAND_LENGTH + 1]; // leave space for \0
bool locked = false;

/**
 Arduino setup functtion
 **/
void setup() {
  // Start serial port at 9600 bps:
  Serial.begin(9600);
  
  // Delay serial port data send because of Arduino auto reset on serial connection (i.e. reboot)
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  } 
  
  establishContact();  // send a byte to establish contact until receiver responds 
}

/**
  The Arduino loop
  **/
void loop() {
  
  if (Serial.available()) {
    incomingByte = Serial.read();
    //Serial.println("incomingByte: " + incomingByte);

    // Reset serial com if reset byte recieved
    if ((char)incomingByte == resetByte) {
      locked = false;
      charCount = 0;
      return;
    }

    // Only process one command at a time
    if (locked) {
      Serial.println(lockByte);
      return;
    }

    // Process incoming byte from serial
    if ((char)incomingByte != stopByte) {
      // Check to make sure we haven't reached max command length
      if (charCount > MAX_COMMAND_LENGTH - 1) {
        Serial.println(lockByte);
        locked = true;
        return;
      }
      // Keep joining bytes from the serial com
      else {
        command[charCount] = (char)incomingByte;
        charCount++;
      }
    }
    
    // Action command sent through serial
    else {
      command[charCount] = '\0';
      charCount = 0;
      
      // Return all sensor data
      if (strcmp(commandAll, command) == 0) {
        delay(delaySerialSend);
        Serial.println("All");
      }
      
      // Return temperature from DHT sensor
      else if (strcmp(commandTemperatureDHT, command) == 0) {
        delay(delaySerialSend);
        Serial.print(resetByte);
        Serial.print("Temperature: ");
        Serial.print(getTemperatureDHT());
        Serial.println(stopByte);
      }
      
      // Return temperature from BMP sensor
      else if (strcmp(commandTemperatureBMP, command) == 0) {
        delay(delaySerialSend);
        Serial.print(resetByte);
        Serial.print("TermperatureBMP: ");
        Serial.print(getTemperatureBMP());
        Serial.println(stopByte);
      }
      
      // Return humidity
      else if (strcmp(commandHumidity, command) == 0) {
        delay(delaySerialSend);
        Serial.print(resetByte);
        Serial.print("Humidity: ");
        Serial.print(getHumidity());
        Serial.println(stopByte);
      }
      
      // Return Barometric pressure
      else if (strcmp(commandBarometricPressure, command) == 0) {
        delay(delaySerialSend);
        Serial.print(resetByte);
        Serial.print("Barometric_Pressure: ");
        Serial.print(getBarometricPressure());
        Serial.println(stopByte);
      }
      
      // Return altitude
      else if (strcmp(commandAltitude, command) == 0) {
        delay(delaySerialSend);
        Serial.print(resetByte);
        Serial.print("Altitude: ");
        Serial.print(getAltitude());
        Serial.println(stopByte);
      }
      
      // Return command not found
      else {
        delay(delaySerialSend);
        Serial.println("Command not found!");
      }
    }
  }
}

// Send an empty message to establish serial communication
void establishContact() {
  while (Serial.available() <= 0) {
    Serial.print(resetByte + stopByte);   // blank replay
    delay(300);
  }
}

void checkTemperatureDHT(){
        // Return temperature from DHT sensor
        delay(delaySerialSend);
        Serial.print(resetByte);
        Serial.print("Temperature: ");
        Serial.print(getTemperatureDHT());
        Serial.println(stopByte);
}

int getTemperatureDHT() {
  // At this stage just return an error
  return -100;
}

int getTemperatureBMP() {
  
  // At this stage just return an error
  return -100;
}

int getHumidity() {
  
  // At this stage just return an error
  return -100;
}

int getBarometricPressure() {
  
  // At this stage just return an error
  return -100;
}

int getAltitude() {
  
  // At this stage just return an error
  return -100;
}
