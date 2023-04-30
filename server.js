const experss = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const port = process.env.PORT || 3000
// Initialisation de l'application Express
const app = experss()

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
     console.log("conncetion reuissi")
    
    })
.catch((err)=> console.error(err))
//importation du model User
const userModel = require("./modeles/User")


//requete get REND TOUS LES UTILISATEURS
app.get("/users",(rep, res)=>{
   userModel.find()
   .then((doc)=>{
    console.log(doc)
    res.send(doc)
   })
  .catch((err)=> console.error(err))
})
//requete Post AJOUTER UN NOUVEL UTILISATEUR A LA BASE DE DONNEES
app.post("/user/ajout", (req, res) => {
    let user = new userModel({
        nom:req.query.nom,
        prenom:req.query.prenom,
        age:req.query.age
    })
    user.save()
    .then((doc)=>{
        console.log(doc)
        res.send(doc)
       })
    .catch((err)=> console.error(err))
})

//requete put  MODIFIER UN UTILISATEUR PAR ID 
app.put("/user/modif", (req, res) => {
    userModel.findByIdAndUpdate(req.query.id,{
        nom:req.query.nom,
        prenom:req.query.prenom,
        age:req.query.age},
        {new:true, runValidators:true})
        .then((doc)=>{
            console.log(doc)
            res.send(doc)
           })
        .catch((err)=> console.error(err))
})

//requete delete SUPPRIMER UN UTILISATEUR PAR ID
app.delete("/user/supp/:Id", (req, res)=>{
    userModel.findByIdAndRemove(req.params.Id)
    .then((doc)=>{
        console.log(doc)
        res.send(doc)
       })
    .catch((err)=> console.error(err))
})
// Démarrage du serveur
app.listen(port, ()=>{
    console.log("http://localhost:3000");
})