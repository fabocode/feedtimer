from gpiozero import LED
from time import sleep 
import os
import datetime 

openDoor = LED(27)
closeDoor = LED(22)

def feed(time):
    openDoor.on()   # open the door
    closeDoor.off() # don't close the door
    sleep(time)
    #print("hello")
    #openDoor.off()
    #closeDoor.on()
    #sleep(1)
    #closeDoor.off()

def close(time):
    openDoor.off()  # don't open the door
    closeDoor.on()  # close the door 
    sleep(time)
    closeDoor.off()