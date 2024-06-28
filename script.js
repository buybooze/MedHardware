if (!('bluetooth' in navigator)) {
    console.log('Bluetooth API not enabled in your browser.');
}



let pulseOxy;

let stetho;

let glucose;

let stethoArr = [];

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

const valuesWrapperOxy = document.querySelector(".values-wrapper.oxy");

const valuesWrapperStetho = document.querySelector(".values-wrapper.stetho");

const valuesWrapperGlucose = document.querySelector(".values-wrapper.glucose");

const valuesWrapperRandom = document.querySelector(".values-wrapper.random");



const stopButtonOxy = document.querySelector(".stop-notifications.oxy");

const stopButtonStetho = document.querySelector(".stop-notifications.stetho");

const stopButtonGlucose = document.querySelector(".stop-notifications.glucose");

const randomValuesInput = document.querySelector("#random-values-input");

const convertValuesButton = document.querySelector(".convert-values");


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

stethoArr.push(c.slice(38, value.byteLength));

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
	
		var downloadBlob, downloadURL;

		downloadBlob = function(data, fileName, mimeType) {
		  var blob, url;
		  blob = new Blob([data], {
			type: mimeType
		  });
		  url = window.URL.createObjectURL(blob);
		  downloadURL(url, fileName);
		  setTimeout(function() {
			return window.URL.revokeObjectURL(url);
		  }, 1000);
		};

		downloadURL = function(data, fileName) {
		  var a;
		  a = document.createElement('a');
		  a.href = data;
		  a.download = fileName;
		  document.body.appendChild(a);
		  a.style = 'display: none';
		  a.click();
		  a.remove();
		};

    let flatStethoArr = new Uint8Array(stethoArr.flat());
		
		let myBinaryBlob = new Blob([flatStethoArr], {type: 'application/octet-stream'});
		
		downloadBlob(myBinaryBlob, 'some-file.pcm', 'application/octet-stream');
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



const requestButtonOxy = document.querySelector(".request-device.oxy");

const requestButtonStetho = document.querySelector(".request-device.stetho");

const requestButtonGlucose = document.querySelector(".request-device.glucose");


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

// 00001808-0000-1000-8000-00805f9b34fb	