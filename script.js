if (!('bluetooth' in navigator)) {
    console.log('Bluetooth API not enabled in your browser.');
}



let pulseOxy;

let stetho;


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



const stopButtonOxy = document.querySelector(".stop-notifications.oxy");

const stopButtonStetho = document.querySelector(".stop-notifications.stetho");


const handleNotificationsOxy = (e) => {
  let value = e.target.value;
  let a = [];
  let b = [];
  let c = [];
  let d = [];
  if (value.byteLength == 10) {
    for (let i = 0; i < value.byteLength; i++) {
      a.push('0x' + ('00' + value.getUint8(i).toString(16)));
      // c.push((int) (value.getUint8(i)));
      // .slice(-2)
    }
    for (let i = 0; i< value.byteLength; i++) {
      b.push(value.getUint8(i).toString())
    }
    // let int8Array = new Int8Array(value, 0, value.byteLength);
    // for (let i = 0; i< int8Array.byteLength; i++) {
    //   c.push(int8Array[i])
    // }
    // console.log('> ' + a.join(' '));
    // let view = new DataView(value);
    for (let i=0; i < value.byteLength; i++) {
      c.push(value.getInt8(i));
    }
    console.log(value);
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
  let d = [];
  
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16)));
    // c.push((int) (value.getUint8(i)));
    // .slice(-2)
  }
  for (let i = 0; i< value.byteLength; i++) {
    b.push(value.getUint8(i).toString())
  }
  // let int8Array = new Int8Array(value, 0, value.byteLength);
  // for (let i = 0; i< int8Array.byteLength; i++) {
  //   c.push(int8Array[i])
  // }
  // console.log('> ' + a.join(' '));
  // let view = new DataView(value);
  for (let i=0; i < value.byteLength; i++) {
    c.push(value.getInt8(i));
  }
  console.log(value);
  valuesWrapperStetho.innerHTML = `
    <div class="value">Hex values: ${a.join(' ')}</div>
    <div class="value">UInt values: ${b.join(' ')}</div>
    <div class="value">Int values: ${c.join(' ')}</div>
    <div class="value">Array length: ${value.byteLength}</div>
  `
  
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
    })
  }
});



const requestButtonOxy = document.querySelector(".request-device.oxy");

const requestButtonStetho = document.querySelector(".request-device.stetho");


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

// 00001808-0000-1000-8000-00805f9b34fb	