import subprocess
import os 
import time

mac = 0 

def saveSSID(macID):
	# create the template for access point, i.e hostapd.conf file
	temp_conf_file = open('hostapd.conf.tmp', 'w')
	temp_conf_file.write('interface=wlan0\n')
	temp_conf_file.write('driver=nl80211\n')
	temp_conf_file.write('ssid=feedtimer  ' + macID)
	temp_conf_file.write('channel=1\n')
	temp_conf_file.write('wmm_enabled=0\n')
	temp_conf_file.write('macaddr_acl=0\n')
	temp_conf_file.write('auth_algs=1\n')
	temp_conf_file.write('ignore_broadcast_ssid=0\n')
	temp_conf_file.write('wpa=2\n')
	temp_conf_file.write('wpa_passphrase=feedtimer\n')
	temp_conf_file.write('wpa_key_mgmt=WPA-PSK\n')
	temp_conf_file.write('wpa_pairwise=TKIP\n')
	temp_conf_file.write('rsn_pairwise=CCMP\n')
	temp_conf_file.close

	os.system('sudo mv hostapd.conf.tmp /etc/hostapd/hostapd.conf')	# move the file into the hostapd original location

def changeMAC():
	time.sleep(10)
	mac = subprocess.check_output("sudo ifconfig eth0 | grep -Eo ..\(\:..\){5}", shell = True)
	minimac = mac[12:]
	minimac = minimac.split(":")
	minimac = minimac[0] + minimac[1]
	time.sleep(1)
	print "my mac is: {}".format(mac)
	print "mini mac is : {}".format(minimac)
	subprocess.call("sudo systemctl stop hostapd", shell = True)
	saveSSID(minimac)	# save MAC into hostapd.conf 
	subprocess.call("sudo systemctl start hostapd", shell = True)
	print "done, ssid with identification created"

#try:
changeMAC()	# run the app
#except subprocess.CalledProcessError:
#	changeMAC()	# try again 

