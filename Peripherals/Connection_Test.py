import network
import socket
from time import sleep
from picozero import pico_temp_sensor, pico_led
import machine
import rp2
import sys
from secrets import ssid, password
from microdot import Microdot, Response

led_status = False

app = Microdot()


def connect():
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    while wlan.isconnected() == False:
        if rp2.bootsel_button() == 1:
            sys.exit()
        print('Waiting for connection...')
        pico_led.on()
        sleep(0.5)
        pico_led.off()
        sleep(0.5)
    ip = wlan.ifconfig()[0]
    print(f'Connected on {ip}')
    #pico_led.on()
    return ip

def scan_for_wifi():
    for wifi in network.WLAN(network.STA_IF).scan():
        print(wifi)
        
@app.route('/led')
async def toggle_onboard_led(request):
    global led_status
    print(f"Serving a request!\nTurning a light: {"On" if not led_status else "Off"}")
    pico_led.on() if not led_status else pico_led.off()
    led_status = not led_status
    return Response(body=f"LED Status: {led_status}")


    

if __name__ == '__main__':
    scan_for_wifi()
    ip_addr = connect()
    print(ip_addr)
    Response.default_content_type = 'text/plain'
    try:
        print(f"Serving on {ip_addr}:8000")
        app.run(port=8000)
    except:
        print("Done Serving")
    
        


