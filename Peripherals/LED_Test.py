# Write your code here :-)
from machine import Pin
import network
import socket
import time
from microdot.microdot import Microdot

led = Pin(25, Pin.Out)
state = False

app = Microdot()
@app.route('/api/get_state', methods=['GET'])
async def getState():
    #global state
    return {"LED":state}
    
@app.route('/api/set_state', methods=['POST'])
def setState(newState):
    global state
    # Check if newState is a boolean
    if not isinstance(newState, bool):
        return 400, "Bad Request: newState must be a boolean"
    state = newState
    try:
        if newState:
            led.on()
        else:
            led.off()
        return {"LED": newState}
    except:
        return {500: "Internal Server Error"}

@app.route('/api/toggle', methods=['GET'])
def toggle():
    global state
    try:
        state = not state
        led.toggle()
        return {"LED": state}
    except:
        return 500, "Internal Server Error"


    
    