
self.addEventListener('message', (event) => {
  
  if (event.data && event.data.action === 'START_ALARM') {
    
    const delayTime = event.data.delay;

    setTimeout(() => {
      
      self.registration.showNotification('⏰ حان وقت المنبه!', {
        body: 'الفرص مش بتستنى، قوم خلص اللي وراك!',
        icon: 'https://www.pngarts.com/files/12/Vector-Alarm-Clock-Transparent-Image.png',    
        vibrate: [200, 100, 200]  
      });

    }, delayTime);
  }
});