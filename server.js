const app = require("express")();
const port = 3000;
const http = require("http").Server(app);
const io = require("socket.io")(http); // package qui permet(au client) de communiquer avec le serveur
var counter = 0;

// route express
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

io.on("connection", (socket) => {
  console.log("connected:" + socket.id);
  socket.emit("yourId", socket.id);
  socket.on("message", (texto) => {
    // on écoute sur le canal "message"
    console.log(texto); // data correspond ici au contenu de notre message
    var sentId = socket.id
    var newData = { texto, counter,sentId};
    console.log(newData.texto);
    console.log(newData.counter);

    io.emit("message", newData); // le serveur renvoie "data" sur le canal "message"
    // création d'un compteur
    counter += 1; 
  });
  socket.on("disconnect", function () { 
    console.log("disconnected" + socket.id);
  });

  socket.on("delete", (number) => {
    // on écoute sur le canal "delete"
    io.emit("deleteMessage", number); // le serveur renvoie le numeroe de notre message à supprimer sur le canal "deleteMessage"
  });
});

http.listen(port, () => {}); // Mise en ecoute du port 3000 et des qu'une personne se connecte sur le port et récupère le fichier HTML via la route get et l'affiche.
