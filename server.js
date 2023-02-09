const app = require("express")();
const port = 3000;
const http = require("http").Server(app);
const io = require("socket.io")(http); // package qui permet(au client) de communiquer avec le serveur
// route express
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

io.on("connection", (socket) => {
  console.log("connexion");
  socket.on('message', data => { // on écoute sur le canal "message"
    console.log(data) // data correspond ici au contenu de notre message 
    io.emit('message',data); // le serveur renvoie "data" sur le canal "message"
  });
});

http.listen(port, () => {}); // Mise en ecoute du port 3000 et des qu'une personne se connecte sur le port et récupère le fihier HTML via la route get et l'affiche.
