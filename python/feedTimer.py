import doorSystem as door
import readData as get
from time import sleep 

workWeek = get.jsonData()
currentTime = get.currentTime()

def checkCycle():
    matchTime = '0:00:00'
    if len(workWeek.day2Check) > 0:
        if workWeek.day2Check[0] == currentTime.nameDay:
            #print("day to check is: {}".format(workWeek.day2Check[0]))
            for i in range(0, len(workWeek.cycleStart)):
                print "will check {}".format(workWeek.cycleStart[i])
                if workWeek.compareTimes(currentTime.timeStamp, workWeek.cycleStart[i]) == matchTime:
                    print("there's a match! {}".format(workWeek.compareTimes(currentTime.timeStamp, workWeek.cycleStart[i])))
                    door.feed(workWeek.cycleDuration[i])
                    door.close()
                else:
                    print("this is the difference: {}".format(workWeek.compareTimes(currentTime.timeStamp, workWeek.cycleStart[i])))

while True:
    currentTime.time()  # read time data
    workWeek.jsonData() # read json file
    checkCycle()    # check if cycles are completed this week to open the feeder 
    sleep(1)    
    workWeek.cleanDataList()    # clean the list for incoming data

