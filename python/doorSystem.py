from gpiozero import LED
from time import sleep 
import os
import datetime 

openDoor = LED(27)
closeDoor = LED(22)

def feed(time):
    openDoor.on()   # open the door
    closeDoor.off() # don't close the door
    sleep(1 + time)
    openDoor.off()

def close():
    timeOff = 1
    closeDoor.on()  # close the door 
    sleep(timeOff)
    closeDoor.off()