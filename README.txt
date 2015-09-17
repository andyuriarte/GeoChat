

GEOCHAT
by: Andreas Uriarte

GeoChat is a web application that uses Node.js, Socket.io and Express to allow for event based communications, providing a real-time geo-located chat! Users are prompted to provide a username and are then taken to a chat server overlayed on Google Maps. Typing in a "message" will display the message on the map from your point in the world. The nature of Node.js and websockets allows for other users to connect to the service and chat in real-time - no page refreshes needed.

In order to get started - please make sure you have Node.js running on your Mac or PC. In the command line execute the following:

1. Navigate to the root of the GeoChat folder where index.js is located
2. Execute the following command (without quotations) in your terminal to start the server:
    "node index.js"
3. Navigate to localhost:3000 from Chrome (Safari is a little buggy).
4. Enter a username
5. Open another browser window side-by-side. Load the same site and enter a different username.
6. Enjoy!
