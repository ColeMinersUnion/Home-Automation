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
LED = machine.Pin(15, machine.Pin.OUT)

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
        sleep(1)
    ip = wlan.ifconfig()[0]
    print(f'Connected on {ip}')
    #pico_led.on()
    return ip

def scan_for_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    for wifi in wlan.scan():
        print(wifi)
        
@app.route('/led')
async def toggle_onboard_led(request):
    global led_status
    print(f"Serving a request!\nTurning a light: {"On" if not led_status else "Off"}")
    LED.value(1) if not led_status else LED.value(0)
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
    
        


