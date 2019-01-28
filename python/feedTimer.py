import doorSystem as door
import readData as get
from time import sleep 

workWeek = get.jsonData()
currentTime = get.currentTime()



def checkCycle():
    maxCycle = 6
    minCycle = 0
    matchTime = '0:00:00'

    if workWeek.currentCycle < workWeek.numCycles and workWeek.day2Check[workWeek.currentCycle] == currentTime.nameDay: # while workWeek.currentCycle is less than maximum number of cycles
        #print("it's sunday")
        if workWeek.cycleID[workWeek.currentCycle] >= minCycle and workWeek.cycleID[workWeek.currentCycle] <= maxCycle:
            #print("you are in the cycle ID {} of {}".format(workWeek.cycleID[workWeek.currentCycle], workWeek.day2Check[workWeek.currentCycle]))
            print("current time {} and target time {}".format(currentTime.timeStamp, workWeek.cycleStart[workWeek.currentCycle]))
            if workWeek.compareTimes(currentTime.timeStamp, workWeek.cycleStart[workWeek.currentCycle]) == matchTime:
                print("there's a match! {}".format(workWeek.compareTimes(currentTime.timeStamp, workWeek.cycleStart[workWeek.currentCycle])))
                door.feed(workWeek.cycleDuration[workWeek.currentCycle])
                door.close()
                workWeek.currentCycle += 1
            else:
                print("this is the difference: {}".format(workWeek.compareTimes(currentTime.timeStamp, workWeek.cycleStart[workWeek.currentCycle])))
            #if 
            #if(workWeek.)
            #print("days: {}, \nstart: {}, \nduration: {}, \nstatus: {}, \nnumber of cycles: {}".format(workWeek.day2Check, workWeek.cycleInit, workWeek.cycleTime, workWeek.dayStatus, workWeek.numCycles))
            ##print("day: {} date: {} and time {}".format(currentTime.nameDay, currentTime.date, currentTime.timeStamp))
            #workWeek.currentCycle += 1
    else:
        print("no more cycles this week")

while True:
    currentTime.time()  # read time data
    workWeek.jsonData() # read json file
    #print("days: {}, \nstart: {}, \nduration: {}, \nstatus: {}, \nnumber of cycles: {}".format(workWeek.day2Check, workWeek.cycleInit, workWeek.cycleTime, workWeek.dayStatus, workWeek.numCycles))    
    #print("day2check {} and current day {}".format(workWeek.day2Check[workWeek.currentCycle], currentTime.nameDay))
    checkCycle()    # check if cycles are completed this week to open the feeder 
    sleep(1)    
    workWeek.cleanDataList()

