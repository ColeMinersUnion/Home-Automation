# Home Automation
This is a personal project that I've wanted to do for sometime. I'll quickly go over the layout of this repository, and some of the larger design choices behind this project.

## HomeBase
HomeBase is the name of my iOS application. This application was built with react-native for iOS devices and served with expo. 

### React Native
One of the most important decisions in this project was deciding the frameworks for creating the application. Apple recommends using XCode and swift for the development of applicatinos for apple devices. However, XCode and swift suck. I tried learning swift about a year ago but I wasn't able to get the hang of it. So when deciding a tech stack for this project, I came down to two options, Ionic and React Native. I come from a web development background, and both of these frameworks were similar to web development frameworks: Vue and React. I had more experience in React than Vue, so I opted for react native. React native is almost exclusively developed using expo, which let me test on device and on my macbook using a simulator. 

### Major Design Choices (App)
In the development of the app I didn't really know where to start, I tried storing information in files, hard coding each device to a new file and then trying to dynamically add pages to 