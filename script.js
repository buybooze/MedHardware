//import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

if (!('bluetooth' in navigator)) {
  console.log('Bluetooth API not enabled in your browser.');
}



let pulseOxy;

let stetho;

let glucose;

let ecg;

let temperature;

let ecgArr = [];

// button.addEventListener('click', (e) => {
//     navigator.bluetooth.requestDevice({
//         acceptAllDevices: true
//       })
//       .then(device => {
//         console.log('> Name:             ' + device.name);
//         console.log('> Id:               ' + device.id);
//         console.log('> Connected:        ' + device.gatt.connected);
//         console.log(device);
//         console.log(device.se);
//       })
//       .then(device => {
//         device.gatt.connect();
//       })
//       .catch(error => {
//         console.error('Argh! ' + error);
//       });
// })


// const serviceInput = document.querySelector("#service-input");

// const characteristicInput = document.querySelector('#characteristic-input');

const valuesWrapperTemperature = document.querySelector(".values-wrapper.temperature");

const valuesWrapperOxy = document.querySelector(".values-wrapper.oxy");

const valuesWrapperStetho = document.querySelector(".values-wrapper.stetho");

const valuesWrapperGlucose = document.querySelector(".values-wrapper.glucose");

const valuesWrapperECG = document.querySelector(".values-wrapper.ecg");

const valuesWrapperRandom = document.querySelector(".values-wrapper.random");


const stopButtonTemperature = document.querySelector(".stop-notifications.temperature");

const stopButtonOxy = document.querySelector(".stop-notifications.oxy");

const stopButtonStetho = document.querySelector(".stop-notifications.stetho");

const stopButtonGlucose = document.querySelector(".stop-notifications.glucose");

const stopButtonECG = document.querySelector(".stop-notifications.ecg");

const randomValuesInput = document.querySelector("#random-values-input");

const convertValuesButton = document.querySelector(".convert-values");


const handleNotificationsTemperature = (e) => {
let value = e.target.value;
let a = [];
let b = [];
let c = [];


for (let i = 0; i < value.byteLength; i++) {
  a.push('0x' + ('00' + value.getUint8(i).toString(16)));
  b.push(value.getUint8(i).toString());
  c.push(value.getInt8(i));
}

console.log("asddsdsd");

valuesWrapperTemperature.innerHTML = `
  <div class="value">Hex values: ${a.join(' ')}</div>
  <div class="value">UInt values: ${b.join(' ')}</div>
  <div class="value">Int values: ${c.join(' ')}</div>
  <div class="value">Array length: ${value.byteLength}</div>
`

}

const handleNotificationsOxy = (e) => {
let value = e.target.value;
let a = [];
let b = [];
let c = [];

if (value.byteLength == 10) {
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)));
    b.push(value.getUint8(i).toString());
    c.push(value.getInt8(i));
  }

  valuesWrapperOxy.innerHTML = `
    <div class="value">Hex values: ${a.join(' ')}</div>
    <div class="value">UInt values: ${b.join(' ')}</div>
    <div class="value">Int values: ${c.join(' ')}</div>
    <div class="value">Array length: ${value.byteLength}</div>
    <br>
    <div class="value">SpO2: ${value.getInt8(5)}</div>
    <div class="value">PRbpm: ${value.getInt8(4)}</div>
  `
}
}

const handleNotificationsStetho = (e) => {
let value = e.target.value;
let a = [];
let b = [];
let c = [];

for (let i = 0; i < value.byteLength; i++) {
  a.push('0x' + ('00' + value.getUint8(i).toString(16)));
  b.push(value.getUint8(i).toString());
  c.push(value.getInt8(i));
}

valuesWrapperStetho.innerHTML = `
  <div class="value">Hex values: ${a.join(' ')}</div>
  <div class="value">UInt values: ${b.join(' ')}</div>
  <div class="value">Int values: ${c.join(' ')}</div>
  <div class="value">Array length: ${value.byteLength}</div>
`
}

const handleNotificationsGlucose = (e) => {
let value = e.target.value;
let a = [];
let b = [];
let c = [];

for (let i = 0; i < value.byteLength; i++) {
  a.push('0x' + ('00' + value.getUint8(i).toString(16)));
  b.push(value.getUint8(i).toString());
  c.push(value.getInt8(i));
}

if (a.length == 15) {
  valuesWrapperGlucose.innerHTML = `
  <div class="value">Hex values: ${a.join(' ')}</div>
  <div class="value">UInt values: ${b.join(' ')}</div>
  <div class="value">Int values: ${c.join(' ')}</div>
  <div class="value">Array length: ${value.byteLength}</div>
`
}
}

const handleNotificationsECG = (e) => {
let value = e.target.value;
let a = [];
let b = [];
let c = [];
let d = [];

for (let i = 0; i < value.byteLength; i++) {
  a.push('0x' + ('00' + value.getUint8(i).toString(16)));
  b.push(value.getUint8(i).toString());
  c.push(value.getInt8(i));
  ecgArr.push(value.getInt8(i));
  //d.push(value[i].toString(16));
//console.log(value.getInt8(i));
}


/*
if (a.length == 15) {
  valuesWrapperECG.innerHTML += `
  <div class="value">Hex values: ${a.join(' ')}</div>
  <div class="value">UInt values: ${b.join(' ')}</div>
  <div class="value">Int values: ${c.join(' ')}</div>
  <div class="value">Array length: ${value.byteLength}</div>
`
}
*/

}

stopButtonTemperature.addEventListener('click', () => {
if (temperature) {
  temperature.stopNotifications()
  .then(() => {
    console.log('Notifications stopped.');
    temperature.removeEventListener('characteristicValueChanged', handleNotificationsTemperature)
  })
}
});

stopButtonOxy.addEventListener('click', () => {
if (pulseOxy) {
  pulseOxy.stopNotifications()
  .then(() => {
    console.log('Notifications stopped.');
    pulseOxy.removeEventListener('characteristicValueChanged', handleNotificationsOxy)
  })
}
});

stopButtonStetho.addEventListener('click', () => {
if (stetho) {
  stetho.stopNotifications()
  .then(() => {
    console.log('Notifications stopped.');
    stetho.removeEventListener('characteristicValueChanged', handleNotificationsStetho)
  })
}
});

stopButtonGlucose.addEventListener('click', () => {
if (glucose) {
  glucose.stopNotifications()
  .then(() => {
    console.log('Notifications stopped.');
    glucose.removeEventListener('characteristicValueChanged', handleNotificationsGlucose)
  })
}
});

stopButtonECG.addEventListener('click', () => {
console.log("Хуета залупы");
console.log(ecgArr);


const arrToFind = [-91, -35, 56];
//const arrToFind = [165, 221, 56];

const INDEX = (arr, toFind) => arr.findIndex(
  (_, baseI, arr) => toFind.every((item, i) => arr[baseI + i] === item)
);
let pizda = [];

let graphBytes = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54];

while(ecgArr.length > 34) {
  var index = (INDEX(ecgArr, arrToFind));
  var zalupa = ecgArr.slice(0, index + 3);
  if (zalupa.length >= 60) {
  pizda.push(zalupa);
  }
  ecgArr = ecgArr.slice(zalupa.length, ecgArr.length)
}

var ecgValues = [];

for (pizdenka of pizda) {
  if (pizdenka[2] == 64) {
    for (graphByte of graphBytes) {
      ecgValues.push(pizdenka[graphByte]);
    }
  }
}

console.log(pizda)
console.log(ecgArr)
console.log(ecgValues)

/////////////////////
/////////////////////
/////////////////////
//ecgValues = [0,-4,-11,-21,-28,-30,-30,-21,-8,-2,-1,0,16,67,-117,-82,-82,110,-20,-87,-87,-85,-62,-35,-29,-29,-30,-32,-38,-43,-44,-44,-36,-22,-10,-2,5,8,8,7,3,-1,-2,-3,-5,-6,-6,-2,4,12,22,29,30,30,23,12,5,0,-3,-6,-11,-18,-22,-22,-20,-18,-17,-16,-13,-7,-4,-4,-5,-6,-6,-4,-1,0,1,2,1,-2,-6,-8,-8,-7,-3,2,4,4,3,2,0,0,-1,-1,-1,-1,0,0,-2,-4,-6,-6,-4,-1,3,6,9,13,25,40,48,48,42,28,13,0,-10,-16,-20,-21,-21,-19,-16,-12,-9,-6,-2,1,8,31,81,-119,-96,-96,97,-28,-91,-91,-65,-14,20,28,29,33,41,48,52,54,54,52,50,48,44,41,39,39,44,52,56,56,53,46,39,34,33,33,33,31,26,17,9,6,6,7,7,4,-4,-12,-13,-13,-14,-18,-22,-23,-23,-18,-12,-7,-5,-5,-7,-10,-10,-7,1,6,7,7,6,3,1,0,0,3,5,5,4,3,3,6,9,11,12,12,13,13,9,-2,-10,-10,-7,-3,-1,-1,-2,-2,0,5,13,19,21,21,20,16,8,-3,-14,-20,-20,-19,-18,-18,-19,-19,-16,-10,-6,-6,-6,-6,5,44,113,-102,-102,110,-9,-102,-120,-120,-89,-45,-31,-29,-27,-22,-18,-16,-16,-16,-14,-11,-9,-7,-3,0,0,-2,-4,-4,-2,3,10,17,21,21,20,17,16,17,17,15,6,0,-1,-2,-5,-14,-21,-23,-23,-20,-17,-17,-17,-14,-6,1,6,6,6,7,14,26,35,38,40,44,52,57,58,58,58,61,66,70,73,77,79,80,80,79,79,78,77,70,56,43,35,32,31,28,22,16,9,2,-6,-11,-11,-8,-2,4,10,14,16,16,16,15,6,-8,-15,-16,-15,-16,-22,-35,-46,-52,-56,-60,-64,-67,-67,-65,-39,29,71,71,48,-44,117,91,91,122,-85,-67,-64,-64,-64,-60,-53,-43,-37,-34,-32,-29,-27,-25,-23,-19,-12,-6,-4,-4,-5,-5,-2,4,9,12,15,17,17,16,15,14,12,4,-8,-18,-23,-23,-21,-20,-19,-17,-13,-8,-5,-5,-6,-7,-6,-5,-6,-7,-7,-4,-2,-2,-3,-6,-8,-8,-5,1,4,4,2,-4,-8,-8,-5,-2,-1,0,1,2,2,0,-2,-2,0,1,2,1,1,0,-1,-3,-6,-6,-2,5,8,9,10,10,9,5,0,-1,-1,-1,-2,-5,-7,-7,-6,-4,-1,1,1,1,7,35,94,-126,-126,105,22,-58,-80,-80,-56,-25,-15,-14,-12,-7,-3,-3,-4,-6,-7,-7,-4,0,3,3,0,-4,-7,-7,-1,10,18,20,21,22,22,18,9,3,2,2,3,4,4,0,-11,-26,-34,-34,-30,-26,-25,-25,-21,-12,-4,2,7,10,13,14,16,19,22,24,25,25,24,20,15,14,14,15,14,11,7,7,7,5,0,-7,-10,-10,-10,-11,-11,-10,-10,-14,-21,-24,-24,-24,-28,-32,-32,-24,-9,4,9,9,7,-4,-19,-26,-26,-18,-5,2,4,5,6,7,7,7,6,5,5,9,36,100,-116,-116,-124,55,-51,-89,-89,-64,-29,-16,-12,-8,-6,-6,-12,-19,-19,-14,-6,-2,-1,0,1,3,5,10,18,23,24,23,22,22,25,27,27,21,11,7,6,6,6,6,2,-6,-14,-21,-25,-25,-26,-26,-27,-28,-30,-33,-34,-34,-31,-28,-28,-28,-28,-24,-20,-17,-17,-17,-16,-12,-6,-2,0,0,0,1,5,9,9,9,8,8,14,23,28,29,29,29,29,27,25,24,24,25,25,23,20,17,15,15,15,16,16,15,9,-4,-17,-23,-23,-19,-15,-13,-13,-14,-14,-13,-13,-13,-13,-9,14,71,109,109,106,35,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-71,-109,-109,-79,-33,-14,-11,-8,-5,-4,-4,-4,-4,-4,-1,3,5,5,4,4,4,6,7,8,9,9,10,13,16,18,21,23,24,26,27,27,27,25,23,19,16,14,10,7,3,0,-2,-3,-5,-9,-12,-14,-16,-17,-19,-20,-20,-20,-19,-19,-20,-20,-20,-19,-19,-20,-20,-19,-18,-18,-18,-18,-18,-17,-15,-14,-13,-12,-11,-10,-9,-9,-9,-9,-9,-9,-9,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,4,6,7,8,8,8,6,3,0,-3,-6,-8,-9,-9,-8,-7,2,2,6,25,74,-116,-83,-83,109,-19,-84,-84,-74,-45,-22,-17,-16,-14,-9,-1,6,8,9,9,10,12,14,16,18,20,22,23,25,27,29,32,38,44,51,57,61,64,65,64,60,56,50,45,39,32,26,20,16,11,6,2,-1,-3,-4,-6,-8,-9,-9,-8,-7,-6,-5,-4,-1,2,4,5,4,4,5,5,5,5,4,4,5,4,3,1,-2,-4,-6,-7,-7,-8,-9,-9,-10,-9,-9,-10,-10,-9,-7,-4,-1,1,3,5,8,13,16,20,22,23,22,20,17,13,9,5,1,-1,-1,0,1,1,3,3,7,27,76,111,115,115,56,-52,-103,-103,-76,-32,-11,-5,-3,1,4,4,1,-1,-1,0,1,2,2,2,2,2,3,3,3,3,4,7,10,12,14,15,16,15,13,11,9,6,4,3,2,2,0,-2,-3,-4,-4,-3,-3,-3,-3,-1,0,0,0,0,1,1,2,3,3,3,3,2,2,2,2,2,1,0,0,0,-1,-1,-1,-1,-1,-1,-3,-5,-6,-8,-11,-13,-16,-17,-17,-15,-13,-11,-8,-5,-2,3,7,11,14,17,18,17,14,8,1,-6,-14,-20,-25,-28,-29,-29,-29,-33,-30,-21,6,61,97,97,92,22,-76,-110,-110,-80,-36,-18,-18,-18,-15,-10,-3,1,2,2,1,0,-2,-3,-3,-4,-5,-6,-6,-6,-6,-5,-4,-3,-1,2,5,8,10,11,12,13,13,11,8,5,3,1,-2,-4,-7,-9,-11,-12,-13,-13,-13,-12,-10,-9,-8,-7,-6,-5,-3,0,5,9,14,19,25,29,28,25,20,15,10,4,-2,-6,-7,-7,-5,-3,0,3,6,9,10,12,12,12,13,14,16,18,20,22,25,27,29,30,31,32,33,33,32,29,27,25,22,19,14,9,6,3,1,-2,-5,-12,-12,2,50,107,-126,-126,66,-55,-113,-113,-86,-44,-24,-20,-16,-9,-4,-3,-2,-1,-1,-2,-2,-2,-2,-2,-2,-2,-1,1,3,5,8,10,13,15,16,17,17,17,18,18,17,16,14,13,11,9,7,4,1,-1,-2,-3,-5,-6,-7,-6,-4,-2,-1,1,2,3,4,4,4,4,4,4,4,4,3,2,2,1,0,0,-1,-1,0,0,1,0,0,0,-1,-1,-2,-4,-5,-5,-6,-6,-7,-8,-8,-8,-7,-6,-5,-4,-3,0,3,7,12,17,21,25,27,26,23,19,15,10,5,1,-2,-3,-4,-4,-4,-5,-4,-4,15,70,113,120,120,59,-44,-87,-87,-57,-14,0,2,5,8,10,10,6,-2,-5,-6,-7,-7,-6,-5,-5,-5,-5,-4,-2,0,1,3,5,7,9,10,10,9,8,7,6,6,6,6,6,6,6,6,5,4,3,3,3,2,1,0,-2,-3,-4,-4,-5,-5,-4,-2,0,2,3,3,4,3,2,1,1,0,0,0,0,1,1,2,1,0,-1,-3,-5,-7,-8,-9,-10,-10,-10,-10,-9,-8,-6,-4,-2,0,2,4,6,8,10,11,12,12,12,11,7,2,-3,-7,-10,-13,-15,-16,-16,-15,-14,-13,-20,-20,-3,46,95,112,112,52,-62,-118,-118,-99,-61,-35,-26,-19,-11,-4,-1,-1,-2,-2,-2,-2,-2,-2,-2,-2,-1,1,2,3,5,7,11,14,17,19,21,22,24,26,27,27,27,25,22,19,14,9,2,-5,-13,-19,-23,-25,-28,-30,-30,-30,-29,-27,-26,-24,-22,-19,-16,-12,-10,-7,-5,-3,-1,0,2,3,5,6,7,7,5,3,1,-1,-4,-6,-9,-10,-10,-9,-9,-8,-7,-6,-5,-4,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,0,2,4,6,6,5,5,5,4,2,-1,-2,-3,-2,-2,-1,0,6,13,44,107,-110,-110,99,-13,-79,-79,-77,-54,-29,-24,-23,-19,-11,-3,3,6,6,5,5,5,6,7,7,8,9,10,12,12,14,17,20,23,25,28,30,33,34,33,31,28,25,23,20,17,14,11,9,7,5,3,1,-1,-2,-3,-4,-6,-8,-10,-11,-12,-11,-10,-10,-8,-5,-2,1,4,6,8,10,12,12,11,10,8,5,2,0,-2,-3,-3,-3,-2,0,2,3,4,4,2,0,-3,-6,-9,-11,-13,-13,-12,-9,-7,-4,0,2,5,8,10,11,12,11,9,6,2,-2,-6,-10,-13,-15,-16,-17,-18,-18,-18,-18,-18,10,71,110,110,85,-3,-69,-72,-72,-47,-23,-20,-19,-19,-15,-10,-5,-2,0,4,9,10,11,11,11,11,13,14,16,18,20,24,27,30,32,34,36,37,37,35,33,30,27,22,18,15,11,9,6,4,2,2,0,-2,-4,-6,-7,-7,-7,-7,-7,-6,-5,-5,-5,-5,-5,-4,-4,-3,-3,-3,-2,-1,0,0,0,0,0,1,0,0,-1,-2,-2,-2,-2,-2,-3,-4,-4,-3,-3,-3,-4,-5,-5,-4,-4,-5,-5,-5,-4,-1,1,3,6,9,13,16,18,20,19,17,13,9,5,2,-2,-4,-6,-6,-5,-4,-3,-1,3,19,62,114,-120,-120,72,-53,-114,-114,-79,-25,-4,-3,-2,2,7,14,16,17,17,17,18,19,21,22,24,26,30,33,37,41,44,46,48,49,49,49,48,47,45,43,41,39,36,33,30,26,21,17,14,11,8,5,3,0,-3,-6,-8,-11,-12,-13,-13,-11,-8,-4,-1,2,5,6,6,5,4,2,0,-2,-3,-4,-4,-4,-4,-4,-4,-5,-4,-4,-5,-5,-7,-7,-7,-7,-7,-7,-7,-8,-7,-7,-6,-5,-3,0,3,6,10,14,19,23,26,29,29,28,24,19,13,7,1,-5,-11,-16,-18,-20,-20,-19,-18,2,18,66,111,124,124,58,-60,-114,-114,-80,-27,-6,-3,-1,6,17,23,24,24,27,29,30,30,30,30,31,32,33,35,36,38,39,40,41,41,41,41,41,41,41,41,40,38,37,34,30,26,21,17,14,11,6,2,-2,-4,-6,-8,-10,-11,-11,-9,-8,-7,-6,-4,-3,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-3,-4,-6,-7,-8,-8,-7,-6,-5,-3,-1,0,0,0,0,1,1,0,1,1,3,4,6,6,7,9,9,9,7,4,0,-4,-8,-13,-17,-21,-23,-25,-26,-28,-29,-29,-29,-25,60,95,95,91,24,-76,-113,-113,-85,-41,-19,-13,-8,-1,2,2,1,1,6,15,19,19,17,16,15,15,16,17,18,19,22,25,29,32,35,37,40,42,43,44,43,42,40,38,35,31,26,20,16,12,7,1,-3,-6,-8,-8,-8,-8,-7,-5,-3,-2,-1,-1,-1,-2,-2,-3,-3,-3,-3,-3,-2,-2,-2,-1,-1,-1,0,0,0,0,-1,-3,-5,-6,-7,-8,-9,-10,-10,-10,-9,-9,-8,-7,-6,-5,-4,-2,1,5,8,10,13,15,15,15,11,6,1,-4,-8,-11,-12,-13,-12,-11,-9,-8,-1,8,41,104,-114,-114,93,-21,-88,-88,-81,-58,-38,-37,-35,-28,-18,-11,-9,-7,-6,-5,-5,-5,-5,-4,-4,-4,-4,-4,-3,-2,-1,1,3,6,9,12,16,18,20,21,21,20,19,17,15,12,8,4,1,-3,-5,-8,-10,-11,-11,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-2,-1,-1,-1,0,1,1,2,2,2,2,2,1,1,1,1,2,3,3,3,2,1,1,0,0,-1,-2,-2,-1,-1,0,0,1,1,1,2,2,2,3,2,1,-1,-3,-4,-6,-7,-9,-11,-12,-12,-11,-11,-11,-11,-8,1,47,113,-115,-115,75,-50,-110,-110,-78,-29,-11,-11,-11,-11,-7,-4,-3,-3,-1,0,0,1,1,1,2,3,5,7,10,12,16,19,23,26,28,30,33,35,36,36,36,35,32,28,24,20,16,12,8,5,4,3,1,0,-2,-4,-6,-6,-7,-8,-9,-10,-10,-9,-9,-8,-8,-6,-5,-3,-1,0,1,2,2,2,1,1,0,0,0,0,1,1,2,2,3,2,1,0,-1,-1,-1,-1,-1,0,2,4,6,7,8,7,6,5,3,1,-2,-5,-7,-9,-10,-11,-11,-12,-13,-12,-11,36,100,-123,-123,75,-40,-99,-99,-78,-33,-8,-5,-5,-5,-2,1,5,8,12,17,20,20,21,22,23,23,24,24,25,27,29,31,33,35,38,41,44,46,46,46,45,44,41,37,32,27,22,17,13,9,6,4,2,0,-1,-2,-4,-5,-6,-7,-7,-7,-7,-7,-6,-4,-3,-1,0,1,2,3,3,4,4,4,4,4,3,2,2,1,0,-1,-2,-3,-3,-4,-4,-4,-3,-2,-1,0,1,3,4,5,6,6,5,2,-2,-6,-10,-12,-15,-18,-20,-21,-22,-23,-26,-35,-23,14,77,113,113,82,-11,-89,-105,-105,-77,-35,-18,-13,-13,-14,-14,-10,-5,-3,-3,-4,-4,-4,-3,0,2,5,8,11,15,19,23,27,30,33,36,37,38,38,36,34,32,29,25,23,22,20,17,14,10,6,2,-2,-6,-9,-12,-14,-15,-16,-15,-15,-14,-13,-14,-14,-14,-14,-13,-11,-9,-8,-6,-4,-1,1,2,2,2,1,1,0,0,-1,-3,-5,-7,-8,-8,-8,-7,-7,-6,-5,-3,0,2,4,6,8,10,11,11,10,8,5,1,-2,-4,-6,-7,-7,-8,-8,-8,-8,-7,21,66,120,-111,-111,83,-41,-104,-104,-85,-47,-27,-26,-26,-26,-26,-20,-9,-3,-1,0,0,0,0,-1,-1,-2,-2,-1,-1,0,1,3,6,10,14,17,20,22,23,24,24,23,21,19,17,15,13,10,6,2,-1,-4,-8,-12,-14,-16,-17,-17,-17,-17,-16,-15,-13,-12,-10,-10,-9,-8,-7,-6,-4,-3,-2,-2,-2,-2,-2,-2,-2,-2,-3,-2,-1,1,2,3,4,5,6,7,7,8,9,11,12,13,15,17,19,21,23,24,26,26,26,26,25,24,20,16,12,9,8,6,4,2,1,0,1,41,106,-110,-110,108,3,-65,-65,-64,-38,-12,-8,-8,-8,-7,-6,-4,-1,0,0,-1,-2,-3,-4,-3,-2,-1,0,0,2,5,10,14,18,22,25,28,30,29,27,24,21,17,14,12,10,9,8,7,7,7,6,4,1,-1,-3,-4,-4,-5,-5,-4,-3,-3,-3,-3,-5,-6,-7,-8,-8,-7,-6,-5,-4,-3,0,3,7,12,19,26,33,39,43,44,43,39,34,28,22,15,10,5,2,-1,-3,-5,-6,-6,-5,-6,-7,-10,-13,-16,-21,-25,-30,-34,-37,-39,-40,-42,-43,-44,-46,-46,-29,12,75,111,111,81,-9,-86,-104,-104,-76,-33,-17,-16,-16,-16,-15,-12,-7,-4,-4,-3,-3,-4,-4,-4,-4,-3,-3,-2,-1,2,5,8,11,15,20,24,27,28,29,29,29,26,22,16,11,7,2,-2,-5,-8,-11,-12,-13,-13,-14,-14,-15,-14,-13,-11,-9,-8,-7,-7,-5,-4,-3,-3,-3,-2,-1,1,1,2,2,3,3,2,1,0,-1,-1,-2,-3,-4,-5,-6,-7,-9,-10,-11,-12,-11,-9,-6,-2,5,13,21,28,34,39,42,43,40,35,29,22,16,12,7,3,0,-2,-3,-4,-6,-6,35,100,-119,-119,88,-23,-85,-85,-79,-53,-28,-22,-21,-19,-16,-11,-6,-2,1,3,3,2,1,0,0,0,1,3,4,6,8,11,15,19,23,26,29,31,34,35,36,36,34,32,29,25,21,17,13,9,5,2,-1,-3,-5,-7,-8,-8,-8,-8,-8,-8,-7,-7,-7,-7,-6,-5,-3,-1,2,3,4,3,3,2,2,2,1,0,0,0,-1,-2,-3,-4,-5,-5,-7,-8,-8,-7,-5,-3,-2,0,2,4,5,6,5,5,6,6,6,5,3,0,-3,-6,-10,-14,-19,-22,-25,-26,-27,-28,-24,-12,30,103,-114,-114,82,-41,-104,-104,-91,-56,-29,-24,-23,-22,-23,-24,-24,-24,-16,-10,-7,-5,-5,-4,-4,-3,-2,-1,-1,0,2,4,7,10,14,18,20,22,22,21,21,20,18,16,13,11,8,5,0,-5,-10,-15,-18,-21,-23,-24,-23,-22,-21,-19,-17,-15,-12,-9,-6,-4,-2,1,3,4,5,6,6,6,5,4,3,1,0,-3,-7,-10,-12,-13,-14,-15,-15,-14,-12,-10,-7,-6,-5,-3,-1,1,3,5,7,10,12,14,14,12,10,8,5,2,0,-2,-3,-2,-2,-2,-1,-1,-2,-3,-4,-1,89,-128,-128,105,16,-65,-81,-81,-55,-22,-12,-11,-11,-8,-4,0,1,1,0,-1,-3,-3,-3,-2,0,1,2,4,7,11,15,19,22,25,28,31,34,36,37,37,37,36,34,30,26,20,16,12,8,4,1,-1,-3,-4,-6,-7,-7,-7,-6,-6,-7,-8,-8,-8,-7,-8,-8,-8,-7,-7,-7,-8,-9,-10,-10,-9,-9,-8,-7,-6,-6,-4,-2,0,2,4,5,6,7,7,7,6,6,5,5,5,5,6,7,8,9,8,8,9,10,11,12,12,13,14,14,13,11,9,7,4,2,1,57,105,117,117,50,-64,-111,-111,-77,-34,-23,-23,-23,-23,-17,-11,-11,-10,-10,-9,-6,-6,-6,-6,-4,-2,-1,1,3,6,10,14,17,20,21,23,25,26,27,27,27,28,29,30,29,27,23,20,16,12,8,4,1,-1,-1,-1,-1,-2,-3,-3,-3,-3,-4,-4,-3,-2,-1,0,1,2,3,3,4,4,4,3,2,1,1,0,0,-1,-2,-2,-2,-2,-2,-3,-4,-4,-3,-3,-2,-2,-1,0,1,3,5,7,8,7,6,4,2,-1,-4,-8,-10,-11,-11,-10,-10,-9,-9,-9,-8,36,105,-111,-111,105,0,-66,-67,-67,-39,-11,-9,-8,-8,-3,0,0,0,0,0,2,3,3,4,4,5,6,7,8,9,10,12,14,17,19,21,22,23,23,23,21,19,16,13,11,9,7,6,4,3,2,1,0,-1,-2,-2,-2,-2,-1,-1,0,0,1,0,-1,-2,-2,-3,-3,-3,-4,-3,-2,-1,-1,-1,-1,0,0,0,0,0,0,-1,-2,-4,-5,-7,-9,-10,-11,-11,-10,-10,-10,-9,-8,-4,-1,2,5,8,10,11,8,3,-2,-7,-11,-16,-19,-21,-22,-23,-23,-25,-26,-26,-24,25,82,117,117,98,10,-76,-93,-93,-57,-14,-5,-5,-6,-7,-6,-6,-7,-6,-5,-6,-7,-8,-6,-2,3,7,11,16,22,28,34,37,38,38,38,39,39,39,39,38,38,39,40,42,44,45,46,46,45,42,37,31,25,19,14,10,7,5,3,3,2,2,1,1,1,1,1,0,0,-1,-1,0,0,1,1,0,-1,-3,-4,-6,-8,-10,-11,-11,-10,-9,-8,-8,-7,-5,-3,-1,1,2,3,4,4,4,4,6,7,9,10,10,10,8,5,1,-3,-6,-8,-10,-11,-13,-14,-14,-15,-12,-11,7,62,-128,-102,-102,83,-51,-116,-116,-91,-45,-19,-14,-13,-10,-5,-2,-1,-1,-2,-2,-3,-4,-4,-3,-3,-3,-3,-3,-1,2,4,6,8,11,14,17,20,21,21,20,20,19,18,15,12,9,7,5,3,0,-3,-5,-8,-9,-11,-12,-12,-12,-10,-9,-8,-6,-5,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-3,-3,-3,-2,-1,0,1,2,3,4,5,6,6,6,6,6,8,10,11,12,11,11,10,8,6,2,-1,-4,-6,-7,-9,-10,-10,-10,-10,-9,-8,30,103,-108,-108,115,15,-63,-75,-75,-48,-21,-20,-21,-22,-22,-18,-10,-5,-5,-5,-5,-4,-2,-1,0,1,2,4,6,8,10,13,16,19,22,25,28,31,32,33,32,30,27,23,18,14,9,4,-1,-6,-11,-16,-21,-26,-29,-32,-33,-32,-30,-28,-25,-22,-19,-17,-15,-14,-12,-10,-9,-7,-5,-3,1,6,9,13,17,22,26,29,28,26,24,23,20,18,15,12,11,11,12,13,13,13,13,14,15,16,16,17,16,15,12,8,3,-3,-8,-13,-17,-20,-21,-21,-22,-23,-23,-24,-23,-20,64,111,121,121,55,-51,-92,-92,-67,-31,-19,-16,-10,-3,-1,0,2,4,4,3,3,5,7,9,10,11,12,15,20,24,28,32,36,40,45,48,50,51,50,48,46,43,39,35,30,24,18,13,8,3,-4,-10,-14,-17,-18,-20,-21,-21,-20,-19,-18,-16,-14,-10,-5,0,4,8,11,13,15,15,14,13,12,11,10,8,6,5,4,2,1,0,-1,-2,-3,-5,-6,-6,-6,-5,-4,-3,-1,1,2,3,3,3,4,3,2,-1,-5,-10,-15,-20,-24,-28,-31,-32,-32,-31,-30,-28,-26,-1,26,84,-112,-91,-91,98,-21,-75,-75,-47,-5,11,14,18,26,30,30,30,31,31,30,28,25,24,22,22,23,24,25,27,30,33,36,40,44,47,49,51,53,54,54,52,48,43,38,32,25,17,10,4,0,-4,-8,-11,-11,-11,-10,-9,-7,-6,-3,0,2,4,6,6,6,6,5,4,2,1,0,-1,-2,-3,-3,-3,-2,-2,0,1,2,3,3,2,0,-1,-3,-4,-4,-4,-3,-3,-2,-2,-2,-2,-3,-3,-2,-2,-2,-2,-3,-3,-4,-6,-7,-8,-9,-10,-10,-10,-10,-10,-10,-11,-10,-8,62,100,103,103,41,-57,-94,-94,-67,-26,-11,-9,-8,-3,3,5,5,2,-1,-1,3,5,6,7,8,10,11,12,15,17,18,20,22,24,26,27,28,29,29,30,29,28,25,23,20,17,14,10,7,4,1,-1,-3,-4,-6,-6,-6,-6,-5,-4,-3,-2,-1,-1,-1,-2,-2,-3,-2,-2,-2,-2,-1,0,1,1,1,0,0,0,-2,-3,-5,-7,-8,-8,-8,-8,-8,-6,-5,-3,-1,1,3,5,6,7,8,7,5,3,0,-3,-6,-9,-11,-11,-11,-10,-10,-8,-7,-6,-5,-1,89,-128,-128,100,8,-65,-75,-75,-47,-11,0,1,1,2,3,3,4,6,8,9,9,9,9,10,11,12,13,15,18,21,24,26,28,31,33,35,35,35,34,34,34,33,31,27,24,21,17,13,9,3,-1,-4,-6,-7,-7,-7,-6,-4,-3,-2,-1,0,1,1,1,0,0,0,0,0,0,0,1,1,2,2,2,2,1,0,-1,-2,-2,-3,-3,-4,-5,-5,-5,-5,-6,-6,-5,-4,-3,-1,1,4,6,8,8,8,7,5,1,-3,-7,-10,-12,-13,-13,-12,-11,-9,-7,-6,-6,-3,79,118,118,105,31,-58,-86,-86,-61,-32,-23,-23,-23,-18,-11,-5,-4,-5,-6,-6,-6,-4,-2,0,1,1,1,1,3,4,6,8,11,14,17,19,21,20,19,17,14,11,8,6,4,4,4,3,2,2,2,2,1,0,-1,-2,-3,-4,-5,-5,-5,-5,-5,-5,-4,-2,-1,1,2,3,4,4,4,4,3,2,1,-2,-4,-7,-9,-11,-13,-14,-15,-16,-16,-16,-16,-15,-14,-12,-10,-8,-5,-3,-1,0,1,1,2,2,1,0,-1,-3,-5,-7,-10,-13,-16,-17,-17,-17,-17,-16,-15,-13,-8,75,113,113,107,37,-63,-99,-99,-68,-24,-9,-9,-10,-10,-10,-9,-9,-5,-1,-1,-3,-5,-6,-6,-6,-5,-5,-4,-3,-1,1,5,8,12,16,20,23,26,27,27,26,25,24,21,17,13,8,4,0,-4,-8,-11,-14,-15,-17,-19,-20,-21,-21,-20,-17,-14,-10,-6,-3,-1,1,2,2,1,0,-1,-1,-1,-1,-1,-1,0,0,0,1,1,2,2,1,-2,-4,-6,-7,-9,-9,-9,-7,-4,0,3,6,9,13,16,18,20,21,21,19,16,13,8,4,0,-4,-6,-7,-6,-5,-5,-5,-4,-3,2,88,126,126,113,31,-66,-94,-94,-66,-27,-15,-12,-10,-10,-13,-17,-17,-11,-3,0,2,4,6,7,7,8,8,9,12,14,16,18,20,22,23,24,24,25,25,25,24,22,21,19,17,13,10,7,4,2,0,-4,-7,-9,-10,-12,-13,-14,-14,-13,-12,-11,-11,-11,-11,-11,-11,-10,-10,-10,-9,-8,-8,-8,-8,-8,-7,-6,-6,-5,-3,-2,0,1,1,1,2,2,2,2,2,2,2,3,4,4,5,6,6,6,6,5,3,2,0,-1,-2,-2,-3,-4,-5,-5,-6,-6,-7,4,42,113,-102,-102,89,-39,-104,-104,-71,-26,-8,-8,-8,-5,-3,0,0,-1,-1,4,6,8,9,9,10,11,11,13,14,15,17,19,21,24,25,27,30,31,31,31,30,29,27,24,20,16,13,10,7,4,2,1,-1,-2,-3,-5,-6,-7,-8,-9,-9,-8,-7,-5,-4,-3,-1,-1,0,0,0,-1,-1,-1,-1,-1,-2,-2,-2,-1,-1,-2,-2,-1,-1,-1,-2,-3,-3,-3,-3,-3,-4,-4,-3,-2,-1,-1,-1,-1,0,0,-1,-3,-6,-10,-13,-16,-19,-21,-22,-22,-20,-19,-17,-14,31,98,-118,-118,82,-35,-98,-98,-76,-34,-12,-9,-7,-1,4,4,4,4,4,8,12,12,12,12,13,15,17,18,21,23,26,30,34,37,39,40,42,43,44,43,41,38,35,31,28,24,20,16,13,10,8,6,4,2,0,-2,-3,-4,-4,-5,-6,-7,-6,-6,-5,-5,-4,-3,-2,-1,-1,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-3,-4,-5,-5,-4,-4,-4,-3,-2,-1,-1,-1,-1,-1,1,3,5,6,7,8,7,6,5,2,-2,-5,-8,-10,-11,-13,-14,-15,-15,-14,-12,-6,90,127,127,109,29,-62,-92,-92,-65,-23,-8,-5,-4,-3,1,5,7,7,6,4,3,3,4,5,7,9,10,11,13,16,17,19,20,21,23,24,25,26,26,25,25,23,21,18,14,11,8,6,3,0,-3,-5,-7,-9,-11,-13,-14,-15,-15,-13,-12,-10,-9,-8,-7,-5,-5,-4,-5,-5,-5,-5,-4,-4,-4,-5,-6,-6,-5,-5,-4,-4,-3,-2,0,0,0,0,0,-1,-1,0,1,3,5,7,9,11,12,12,11,9,7,5,2,0,-1,-2,-2,-2,-3,-3,-3,-3,-2,1,78,113,113,92,6,-76,-92,-92,-63,-25,-15,-14,-11,-5,0,1,2,3,4,6,8,8,8,8,7,7,7,7,8,9,11,14,17,20,22,24,26,26,25,24,21,19,18,16,14,11,7,4,1,-1,-4,-6,-9,-12,-13,-15,-16,-16,-16,-16,-15,-13,-11,-9,-7,-6,-5,-4,-4,-4,-3,-3,-3,-4,-4,-4,-4,-4,-4,-5,-5,-4,-4,-3,-2,-2,-1,1,1,2,2,2,2,3,4,5,6,7,7,8,7,6,4,0,-3,-6,-7,-8,-9,-10,-10,-9,-8,-7,-6,28,99,-114,-114,115,24,-52,-63,-63,-39,-10,-3,-2,1,5,8,9,8,7,7,9,10,11,11,12,12,14,15,18,22,25,28,32,35,38,40,40,39,38,37,36,34,31,27,23,20,17,15,12,9,8,7,6,5,4,3,3,2,2,1,2,2,3,3,3,2,2,2,2,2,1,2,3,3,4,3,3,3,3,3,3,3,3,3,4,4,4,2,1,-1,-2,-2,-2,-2,-2,-2,-2,-1,1,3,4,6,7,6,5,2,-3,-8,-13,-18,-23,-26,-28,-30,-31,-33,-34,-36,-34,43,86,91,91,21,-96,112,112,-112,-67,-50,-49,-48,-42,-33,-30,-29,-26,-24,-24,-28,-30,-31,-31,-30,-27,-25,-22,-19,-15,-10,-4,1,5,7,10,12,13,14,15,15,15,14,13,11,8,5,2,-2,-6,-10,-12,-14,-14,-14,-14,-15,-15,-14,-13,-11,-10,-10,-8,-6,-4,-3,-2,-2,-2,-3,-2,-2,-2,-1,-1,-1,-2,-2,-2,-2,-3,-3,-4,-3,-3,-2,-2,-1,-1,-1,-1,-1,-1,-2,-3,-4,-4,-2,-1,0,3,6,9,12,13,12,10,9,6,3,0,-3,-5,-5,-5,-5,-4,-3,-2,0,5,89,126,126,117,41,-67,-108,-108,-81,-39,-23,-23,-23,-23,-23,-19,-12,-3,1,1,0,-3,-5,-6,-7,-7,-5,-3,-1,1,4,9,14,18,21,24,26,28,30,31,30,30,28,25,21,17,12,8,2,-4,-8,-11,-13,-14,-15,-16,-16,-16,-16,-16,-15,-15,-15,-14,-14,-12,-11,-9,-8,-7,-6,-5,-4,-3,-2,-2,-2,-2,-2,-2,-2,-3,-4,-4,-3,-3,-3,-3,-3,-2,-1,0,1,1,2,3,3,4,4,5,6,7,8,8,6,5,3,1,-1,-4,-6,-8,-8,-8,-6,-5,-5,-4,-3,0,62,109,123,123,62,-54,-110,-110,-83,-36,-15,-15,-16,-16,-11,-4,-1,-1,-2,-2,2,4,6,7,7,8,9,10,13,16,18,21,24,27,30,33,35,37,38,38,37,35,32,29,25,21,18,13,9,5,2,-2,-5,-8,-10,-11,-10,-10,-9,-8,-7,-6,-6,-5,-4,-3,-1,0,0,1,2,3,2,1,-1,-3,-3,-3,-3,-3,-2,-1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,0,0,1,4,7,10,12,13,12,11,8,5,0,-3,-6,-8,-9,-10,-10,-10,-10,-10,-10,-7,68,114,125,125,63,-46,-95,-95,-67,-23,-7,-6,-5,-5,-4,-3,1,8,14,16,17,18,20,22,23,24,24,26,29,32,34,35,37,39,41,43,44,44,45,46,46,44,41,37,34,29,24,19,14,10,6,3,0,-2,-3,-4,-4,-3,-2,-1,-1,-1,-1,-2,-2,-2,-3,-3,-3,-2,-1,0,0,1,1,2,2,3,3,3,2,2,1,1,1,1,1,0,-1,-1,-2,-3,-3,-4,-4,-4,-3,-2,0,2,4,6,8,9,8,8,7,5,2,-2,-7,-11,-14,-17,-19,-20,-21,-20,-19,-17,-12,80,117,117,90,-2,-85,-104,-104,-77,-41,-29,-28,-28,-23,-16,-10,-6,-4,-4,-4,-3,-3,-3,-3,-3,-2,-1,1,2,4,8,13,18,23,27,29,31,32,32,31,27,23,19,16,14,11,7,2,-1,-3,-5,-8,-11,-14,-17,-19,-20,-22,-23,-24,-23,-21,-18,-16];
  /////////////////////
/////////////////////
/////////////////////

var dataset1 = [];


for (let i=0; i<ecgValues.length; i++) {
  dataset1.push([i, ecgValues[i]])
}

////////////////////
////////////////////
////////////////////

console.log(dataset1)


      // Step 3
      var svg = d3.select("svg"),
          margin = 200,
          width = svg.attr("width") - margin, //300
          height = svg.attr("height") - margin //200

      // Step 4 
      var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
          yScale = d3.scaleLinear().domain([-170, 170]).range([height, 0]);
          
      var g = svg.append("g")
          .attr("transform", "translate(" + 100 + "," + 100 + ")");

      // Step 5
      // Title
      svg.append('text')
      .attr('x', width/2 + 100)
      .attr('y', 100)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text('Line Chart');
      
      // X label
      svg.append('text')
      .attr('x', width/2 + 100)
      .attr('y', height - 15 + 150)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text('Independant');
      
      // Y label
      svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(60,' + height + ')rotate(-90)')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text('Dependant');

      // Step 6
      g.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(xScale));
      
      g.append("g")
       .call(d3.axisLeft(yScale));
      
      // Step 7
      svg.append('g')
      //.selectAll("dot")
      .data(dataset1)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return xScale(d[0]); } )
      .attr("cy", function (d) { return yScale(d[1]); } )
      .attr("r", 3)
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .style("fill", "#CC0000");

      // Step 8        
      var line = d3.line()
      .x(function(d) { return xScale(d[0]); }) 
      .y(function(d) { return yScale(d[1]); }) 
      //.curve(d3.curveMonotoneX)
      
      svg.append("path")
      .datum(dataset1) 
      .attr("class", "line") 
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#CC0000")
      .style("stroke-width", "2");
////////////////////
////////////////////
////////////////////
// Log to console

//valuesWrapperECG.append(svg.node());

/*
  if (a.length == 15) {
  valuesWrapperECG.innerHTML += `
  <div class="value">Hex values: ${a.join(' ')}</div>
  <div class="value">UInt values: ${b.join(' ')}</div>
  <div class="value">Int values: ${c.join(' ')}</div>
  <div class="value">Array length: ${value.byteLength}</div>
`
}
*/




if (ecg) {
  ecg.stopNotifications()
  .then(() => {
    console.log('Notifications stopped.');
    ecg.removeEventListener('characteristicValueChanged', handleNotificationsECG)
  })
}
});

convertValuesButton.addEventListener('click', () => {
let values = randomValuesInput.value.toString().replaceAll('-',' ').split(" ");
let ab = [];
for (let i = 0; i < values.length; i++) {
  ab.push(parseInt(values[i], 16))
}
let intArray = new Uint8Array(ab);
let view = new DataView(intArray.buffer);
let a = [];
let b = [];
let c = [];

for (let i = 0; i < view.byteLength; i++) {
  a.push('0x' + ('00' + view.getUint8(i).toString(16)));
  b.push(view.getUint8(i).toString());
  c.push(view.getInt8(i));
}

valuesWrapperRandom.innerHTML = `
  <div class="value">Hex values: ${a.join(' ')}</div>
  <div class="value">UInt values: ${b.join(' ')}</div>
  <div class="value">Int values: ${c.join(' ')}</div>
  <div class="value">Array length: ${view.byteLength}</div>
`
})


const requestButtonTemperature = document.querySelector(".request-device.temperature");

const requestButtonOxy = document.querySelector(".request-device.oxy");

const requestButtonStetho = document.querySelector(".request-device.stetho");

const requestButtonGlucose = document.querySelector(".request-device.glucose");

const requestButtonECG = document.querySelector(".request-device.ecg");


requestButtonTemperature.addEventListener('click', () => {
      navigator.bluetooth.requestDevice( 
          {
            // acceptAllDevices: true
            filters: [
              // {services: [0x0001, 0xFFB0]} 
              {name: 'AOJ-20A'}
            ],
            optionalServices: [0xFFF0, 0xFFB0, 0x1800, 0x1801, 0xFFE0, 0x0003, 0x180F, 0x180A]
          }
        )
        .then(device => {
          console.log('device: ');
          console.log(device);
          return device.gatt.connect();
        })
        .then(server => {
          console.log('server: ');
          console.log(server);
          return server.getPrimaryService("0000ffe0-0000-1000-8000-00805f9b34fb");
        })
        .then(service => {
          console.log('service: ');
          console.log(service);
          return service.getCharacteristic("0000ffe1-0000-1000-8000-00805f9b34fb");
        })
        .then(char => {
          temperature = char;
          return char.startNotifications().then(() => {
            console.log('Temperature notifications started');
            temperature.addEventListener('characteristicvaluechanged', handleNotificationsTemperature)
          })
        })
        // .then(char => {
        //   console.log('char: ');
        //   console.log(char);
        //   return char.readValue()
        // })
        // .then(value => {
        //   console.log(value);
        // })
        // .then(characteristics => {
        //   console.log('characteristics: ');
        //   console.log(characteristics);
        //   characteristics.forEach(c => {
        //     c.readValue()
        //     .then(value => console.log(value))
        //   })
        // })
        .catch(error => {
          console.error('Argh! ' + error);
        });
});

requestButtonOxy.addEventListener('click', () => {
      navigator.bluetooth.requestDevice( 
          {
            // acceptAllDevices: true
            filters: [
              // {services: [0x0001, 0xFFB0]} 
              {name: 'VTM 20F'}
            ],
            optionalServices: [0xFFF0, 0xFFB0, 0x1800, 0x1801, 0xFFE0, 0x0003, 0x180F, 0x180A]
          }
        )
        .then(device => {
          console.log('device: ');
          console.log(device);
          return device.gatt.connect();
        })
        .then(server => {
          console.log('server: ');
          console.log(server);
          return server.getPrimaryService(0xFFE0);
        })
        .then(service => {
          console.log('service: ');
          console.log(service);
          return service.getCharacteristic(0xFFE4);
        })
        .then(char => {
          pulseOxy = char;
          return char.startNotifications().then(() => {
            console.log('Oxy notifications started');
            pulseOxy.addEventListener('characteristicvaluechanged', handleNotificationsOxy)
          })
        })
        // .then(char => {
        //   console.log('char: ');
        //   console.log(char);
        //   return char.readValue()
        // })
        // .then(value => {
        //   console.log(value);
        // })
        // .then(characteristics => {
        //   console.log('characteristics: ');
        //   console.log(characteristics);
        //   characteristics.forEach(c => {
        //     c.readValue()
        //     .then(value => console.log(value))
        //   })
        // })
        .catch(error => {
          console.error('Argh! ' + error);
        });
});


requestButtonStetho.addEventListener('click', () => {
navigator.bluetooth.requestDevice( 
    {
      // acceptAllDevices: true
      filters: [
        // {services: [0x0001, 0xFFB0]} 
        {name: 'Mintti'}
      ],
      optionalServices: [0xFFF0, 0xFFB0, 0x1800, 0x1801, 0xFFE0, 0x0003, 0x180F, 0x180A, "00000001-0000-1000-8000-00805f9b34fb"]
    }
  )
  .then(device => {
    console.log('device: ');
    console.log(device);
    return device.gatt.connect();
  })
  .then(server => {
    console.log('server: ');
    console.log(server);
    return server.getPrimaryService(0x0001);
  })
  .then(service => {
    console.log('service: ');
    console.log(service);
    return service.getCharacteristic(0x0003);
  })
  .then(char => {
    console.log('char: ');
    console.log(char);
    stetho = char;
    return char.startNotifications().then(() => {
      console.log('Stetho notifications started');
      stetho.addEventListener('characteristicvaluechanged', handleNotificationsStetho)
    })
  })
  // .then(char => {
  //   console.log('char: ');
  //   console.log(char);
  //   return char.readValue()
  // })
  // .then(value => {
  //   console.log(value);
  // })
  // .then(characteristics => {
  //   console.log('characteristics: ');
  //   console.log(characteristics);
  //   characteristics.forEach(c => {
  //     c.readValue()
  //     .then(value => console.log(value))
  //   })
  // })
  .catch(error => {
    console.error('Argh! ' + error);
  });
});

requestButtonGlucose.addEventListener('click', () => {
navigator.bluetooth.requestDevice( 
    {
      // acceptAllDevices: true
      filters: [
        // {services: [0x0001, 0xFFB0]} 
        {name: 'Contour7804H6373522'}
      ],
      optionalServices: [0xFFF0, 0xFFB0, 0x1800, 0x1801, 0xFFE0, 0x0003, 0x180F, 0x180A, "00001808-0000-1000-8000-00805f9b34fb"]
    }
  )
  .then(device => {
    console.log('device: ');
    console.log(device);
    return device.gatt.connect();
  })
  .then(server => {
    console.log('server: ');
    console.log(server);
    return server.getPrimaryService("00001808-0000-1000-8000-00805f9b34fb");
  })
  .then(service => {
    console.log('service: ');
    console.log(service);
    return service.getCharacteristic("00002a18-0000-1000-8000-00805f9b34fb");
  })
  .then(char => {
    console.log('char: ');
    console.log(char);
    glucose = char;
    return char.startNotifications().then(() => {
      console.log('Glucose notifications started');
      glucose.addEventListener('characteristicvaluechanged', handleNotificationsGlucose)
    })
  })
  // .then(char => {
  //   console.log('char: ');
  //   console.log(char);
  //   return char.readValue()
  // })
  // .then(value => {
  //   console.log(value);
  // })
  // .then(characteristics => {
  //   console.log('characteristics: ');
  //   console.log(characteristics);
  //   characteristics.forEach(c => {
  //     c.readValue()
  //     .then(value => console.log(value))
  //   })
  // })
  .catch(error => {
    console.error('Argh! ' + error);
  });
});

requestButtonECG.addEventListener('click', () => {
navigator.bluetooth.requestDevice( 
    {
      // acceptAllDevices: true
      filters: [
        // {services: [0x0001, 0xFFB0]} 
        {name: 'PC80B-BLE'}
      ],
      optionalServices: [0xFFF0, 0xFFB0, 0x1800, 0x1801, 0xFFE0, 0x0003, 0x180F, 0x180A, "00001808-0000-1000-8000-00805f9b34fb"]
    }
  )
  .then(device => {
    console.log('device: ');
    console.log(device);
    return device.gatt.connect();
  })
  .then(server => {
    console.log('server: ');
    console.log(server);
    return server.getPrimaryService(0xFFF0);
  })
  .then(service => {
    console.log('service: ');
    console.log(service);
    return service.getCharacteristic(0xFFF1);
  })
  .then(char => {
    console.log('char: ');
    console.log(char);
    glucose = char;
    return char.startNotifications().then(() => {
      console.log('ECG notifications started');
      glucose.addEventListener('characteristicvaluechanged', handleNotificationsECG)
    })
  })
  // .then(char => {
  //   console.log('char: ');
  //   console.log(char);
  //   return char.readValue()
  // })
  // .then(value => {
  //   console.log(value);
  // })
  // .then(characteristics => {
  //   console.log('characteristics: ');
  //   console.log(characteristics);
  //   characteristics.forEach(c => {
  //     c.readValue()
  //     .then(value => console.log(value))
  //   })
  // })
  .catch(error => {
    console.error('Argh! ' + error);
  });
});

// 00001808-0000-1000-8000-00805f9b34fb	