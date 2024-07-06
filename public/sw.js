self.addEventListener('push', (event) => {
  const data = event.data.json();
  const title = data.title;
  const body = data.body;
  const icon = data.icon;
  const url = data.data.url;

  const notificationOptions = {
    body: body,
    tag: 'calendar', // Use a unique tag to prevent duplicate notifications
    icon: icon,
    data: {
      url: '/app/calendar', // Replace with the desired URL for redirecting user to the desired page
    },
  };

  self.registration.showNotification(title, notificationOptions);
});

// TODO https://medium.com/@rajreetesh7/push-notification-in-react-and-next-js-app-using-node-js-da39ad1332ef
