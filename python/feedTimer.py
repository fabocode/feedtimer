import doorSystem as door
import readData as get
from time import sleep 

'''
while True:
    date = get.time()[0]    # get current system date
    time = get.time()[1]    # get current system time
    get.jsonData()
    #print("time: {} and date: {}".format(time, date))

    sleep(1)
    '''
workWeek = get.jsonData()
currentTime = get.currentTime()
currentCycle = 0

while True:
    currentTime.time()  # read time data
    workWeek.jsonData() # read json file
    print("days: {}, \nstart: {}, \nduration: {}, \nstatus: {}, \nnumber of cycles: {}".format(workWeek.day2Check, workWeek.cycleInit, workWeek.cycleTime, workWeek.dayStatus, workWeek.numCycles))    
    print("day2check {} and current day {}".format(workWeek.day2Check[currentCycle], currentTime.nameDay))
    #if currentCycle < workWeek.numCycles and workWeek.day2Check[currentCycle] == currentTime.nameDay: # while currentCycle is less than maximum number of cycles
    #   if()
    #   #print("it's sunday")
    #   #print("days: {}, \nstart: {}, \nduration: {}, \nstatus: {}, \nnumber of cycles: {}".format(workWeek.day2Check, workWeek.cycleInit, workWeek.cycleTime, workWeek.dayStatus, workWeek.numCycles))
    #   ##print("day: {} date: {} and time {}".format(currentTime.nameDay, currentTime.date, currentTime.timeStamp))
    #   #currentCycle += 1
    #else:
    #    print("not anymore")
    sleep(1)    
    workWeek.cleanDataList()