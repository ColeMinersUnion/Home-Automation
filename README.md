# Home Automation
This is a personal project that I've wanted to do for sometime. I'll quickly go over the layout of this repository, and some of the larger design choices behind this project.

## HomeBase
HomeBase is the name of my iOS application. This application was built with react-native for iOS devices and served with expo. 

### Notable Folders and Files
Most of the notable files can be found in `/pages/`. This includes my home page, my device manager and my device template page. I also want to point out `App.js` as that is where my application is built from, and it is used to specify navigation, screens and so far. 

## Peripherals
This folder contains the embedded python code used for microelectronic circuit. The microdot and picozero folders are meant to separate libraries used from the code that I've written. I DID NOT WRITE `/microdot/microdot.py` nor `/picozero/picozero.py`. `Connection_Test.py` is the main code that runs on the Pico. LED_Test is deprecated and not used. Secrets was a way for me to store the SSID and Password for the wifi in a immutable and readable file. 