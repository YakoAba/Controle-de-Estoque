import React, { useEffect } from 'react';

const NotificationsPage = () => {
  useEffect(() => {
    // Solicitar permissão do usuário
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Subscrever o usuário
        navigator.serviceWorker.ready.then(registration => {
          registration.pushManager.subscribe({
            userVisibleOnly: true
          }).then(subscription => {
            // Enviar a notificação
            new Notification('Hello World!');
          });
        });
      }
    });
  }, []);

  return (
    <div>
      Notifications Page
    </div>
  );
};

export default NotificationsPage;
