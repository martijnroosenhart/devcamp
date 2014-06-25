  int ledPin = 13;
  int ledPin1 = 7;
  int ledPin2 = 8;
  int ledPin3 = 9;

void setup()
{
 setup1();
 setup2();
}

void loop()
{
 loop1();
 loop2();
}

void setup1() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT); 
  pinMode(ledPin1, OUTPUT); 
}

void setup2() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
  pinMode(ledPin2, OUTPUT); 
  pinMode(ledPin3, OUTPUT); 
}


// the loop routine runs over and over again forever:
void loop1() {
  // read the input on analog pin 0:
  int sensorValue = analogRead(A5);
  // print out the value you read:
  Serial.print("Sensor 1: ");
  Serial.println(sensorValue);
  delay(200);        // delay in between reads for stability
  
//knipperlicht rechts poort 13 paars/blauw
  if ( sensorValue  >1   ) {
    if ( sensorValue  < 80  ) {
      digitalWrite(ledPin, HIGH);
      delay(500);
      digitalWrite(ledPin, LOW);
      delay(500);
      digitalWrite(ledPin, HIGH);
      delay(500);
      digitalWrite(ledPin, LOW);
      delay(500);
      digitalWrite(ledPin, HIGH);
      delay(500);
      digitalWrite(ledPin, LOW);
      delay(500);
     }
  }
  // alarmlichten achter poort 7 grijs los
  if ( sensorValue > 100 ) { 
    digitalWrite(ledPin1, HIGH);
    delay(100);
    digitalWrite(ledPin1, LOW);
    delay(100);
    digitalWrite(ledPin1, HIGH);
    delay(100);
    digitalWrite(ledPin1, LOW);
    delay(100);
    digitalWrite(ledPin1, HIGH);
    delay(100);
    digitalWrite(ledPin1, LOW);
    delay(100);
  }
}


void loop2() {
  // read the input on analog pin 0:
  int sensorValue = analogRead(A0);
  // print out the value you read:
  Serial.print("Sensor 0: ");
  Serial.println(sensorValue);
  delay(200);        // delay in between reads for stability
  
  // knipperlicht links poort8  groen/geel
  if ( sensorValue  >1   ) {
    digitalWrite(ledPin2, HIGH);
    delay(500);
    digitalWrite(ledPin2, LOW);
    delay(500);
    digitalWrite(ledPin2, HIGH);
    delay(500);
    digitalWrite(ledPin2, LOW);
    delay(500);
    digitalWrite(ledPin2, HIGH);
    delay(500);
    digitalWrite(ledPin2, LOW);
    delay(500);
  }
 
  if ( sensorValue > 100 ) { 
    digitalWrite(ledPin3, HIGH);
    delay(100);
    digitalWrite(ledPin3, LOW);
    delay(100);
  }
}
