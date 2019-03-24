import subprocess

min_tries = 0
max_tries = 5

def read(): # read the time on the RTC module 
    limitTimeArray = 19 # amount of characters to read on the string 
    rtcTime = subprocess.check_output("sudo hwclock -r", shell = True)  # read the output of the rtc clock reading 
    rtcTime = rtcTime[:limitTimeArray]  # save the target time 
    return rtcTime      # return time saved

def setSystClock(time): # set the system clock 
    timeGoal = str("sudo date -s " + '"' + time + '"')  # set string to input systemclock with time as parameter
    subprocess.call(timeGoal, shell = True)             # call process to set the systemclock time 


for i in range(min_tries, max_tries):
    try:
        setSystClock(read())
        break
    except subprocess.CalledProcessError:
        print "trying again..."
        continue
    