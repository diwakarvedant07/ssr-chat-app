

module.exports = function (io) {
    

  io.on("connection", (socket) => {
    //console.log("a user connected");
    //console.log('hello world');
    socket.on("Socket", (data) => {
      socket.broadcast.emit("Socket", data);
      //console.log(data);
    });

    

    socket.on("disconnect", (data) => {
      console.log(data);
      console.log("user disconnected");
    });
  });
};
