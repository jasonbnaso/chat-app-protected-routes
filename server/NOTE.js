//POST a message
// DB stores it
// Sends back a response
//Back end decides where the response must go ie the other user(s)
// FE renders it

// FE can only render this message after reload because the server
//isnt  "talking" or sender the message directly
//to the other users without getting a request Such as using fetchChats which ids called on reload
// SO we use socket.io
// It opens up or communicates our node.js server to
// socket ip to keep an open channel
// Ie When i send a message socketIO hears that and inturn talks to the server and says
// Send that message
