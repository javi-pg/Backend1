//iniciamos la conexion desde nuestro cliente 
const socket = io();

//emitimos un evento desde el cliente 
socket.emit("chat message", "Hola saludos desde el cliente web");