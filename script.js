if (!('bluetooth' in navigator)) {
    console.log('Bluetooth API not enabled in your browser.');
}



let pulseOxi;


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


const serviceInput = document.querySelector("#service-input");

const characteristicInput = document.querySelector('#characteristic-input');

const valuesWrapper = document.querySelector(".values-wrapper");


console.log(serviceInput);
console.log(characteristicInput);
console.log(valuesWrapper);


const stopButton = document.querySelector(".stop-notifications");

const handleNotifications = (e) => {
  let value = e.target.value;
  let a = [];
  let b = [];
  let c = [];
  let d = [];
  // Convert raw data bytes to hex values just for the sake of showing something.
  // In the "real" world, you'd use data.getUint8, data.getUint16 or even
  // TextDecoder to process raw data bytes.
  for (let i = 0; i < value.byteLength; i++) {
    a.push('0x' + ('00' + value.getUint8(i).toString(16))
    // .slice(-2)
    );
  }
  for (let i = 0; i< value.byteLength; i++) {
    b.push(value.getUint8(i).toString())
  }
  let int8Array = new Int8Array(value, 0, value.byteLength);
  for (let i = 0; i< int8Array.byteLength; i++) {
    c.push(int8Array[i])
  }
  // console.log('> ' + a.join(' '));
  console.log(value);
  valuesWrapper.innerHTML = `
    <div class="value">Hex values: ${a.join(' ')}</div>
    <div class="value">UInt values: ${b.join(' ')}</div>
  `
}

stopButton.addEventListener('click', () => {
  if (pulseOxi) {
    pulseOxi.stopNotifications()
    .then(() => {
      console.log('Notifications stopped.');
      pulseOxi.removeEventListener('characteristicValueChanged', handleNotifications)
    })
  }
})



const requestButton = document.querySelector(".request-device");

requestButton.addEventListener('click', () => {
        navigator.bluetooth.requestDevice( 
            {
              filters: [
              // {services: [0xFFF0, 0xFFB0]} 
                {name: 'VTM 20F'}
              ],
              optionalServices: [0xFFF0, 0xFFB0, 0x1800, 0x1801, 0xFFE0]
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
            pulseOxi = char;
            return char.startNotifications().then(() => {
              console.log('Notifications started');
              pulseOxi.addEventListener('characteristicvaluechanged', handleNotifications)
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