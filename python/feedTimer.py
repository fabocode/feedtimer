from gpiozero import LED
from time import sleep 

openDoor = LED(27)
closeDoor = LED(22)

def feed(time):
    openDoor.on()   # open the door
    closeDoor.off() # don't close the door
    sleep(time)
    openDoor.off()
    closeDoor.on()
    sleep(1)
    closeDoor.off()

def close(time):
    openDoor.off()  # don't open the door
    closeDoor.on()  # close the door 
    sleep(time)
    closeDoor.off()

while True:
    feed(2)     # feed 1 second 'open the door'
    #close(1)    # close the door
    
    
