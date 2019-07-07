const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
//// remove fs and use sequelize
// ! I don't think I did this right...
const db = require('./models');
const port = 3000;
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.get('/', function(req, res) {
    res.render('index')
});

// get /dinosaurs - index route - gets alllll dinos

// app.get('/dinosaurs', function(req, res) {


//     // TODO: Remove file system stuff and use sequelize functions
app.get('/dinosaurs', function(req,res) {
    db.dinosaur.findAll().then(function(dinosaurs) {
        res.render('dinos/index', {dinosaurs});
    });
});
//     db.dinosaur.findAll(
//         // ! what does this do? next (on function line), include: and where: and do we need that in this route?    
//     ).then(function(dinosaur) {
//     })
//     });
    // var dinosaurs = fs.readFileSync("./dinosaurs.json");
    // let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData);
    // res.render('dinos/index.ejs', {dinosaurs: dinoData});

// get /dinosaurs/new - serve up our NEW dino form

app.get('/dinosaurs/new', function(req, res) {
    res.render('dinos/new');
});
// get dinosaurs/:id/edit = serve up our edit dino form
app.get('/dinosaurs/:id/edit', function(req, res) {
    db.dinosaur.findByPk(parseInt(req.params.id))
        .then(function(dinosaur) {
            res.render('dinos/edit', {dinosaur});
    })
});

    // let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // let dinoData = JSON.parse(dinosaurs);
    // let id = parseInt(req.params.id);
    

// get /dinosaurs/:id  - show route - gets ONE dino

app.get('/dinosaurs/:id', function(req, res) {
    // let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // let dinoData = JSON.parse(dinosaurs);
    // let id = parseInt(req.params.id)
    db.dinosaur.findByPk(parseInt(req.params.id))
    .then(function(dino) {
        res.render('dinos/show', {dinosaur: dino})
    });
});


// POST /dinosaurs

app.post('/dinosaurs', function(req, res) {
    let newDino = {
        type: req.body.dinosaurType,
        name: req.body.dinosaurName
    }
    db.dinosaur.create(newDino).then(function(dino) {
        res.redirect('/dinosaurs');
    });
});



app.delete('/dinosaurs/:id', function(req, res) {
    db.dinosaur.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(data) {
        res.redirect('/dinosaurs');
    });
});



app.put('/dinosaurs/:id', function(req, res) {
    db.dinosaur.update({
        name: req.body.dinosaurName,
        type: req.body.dinosaurType
    }, {
        where: {id: parseInt(req.params.id)}
    }).then(function(dinos) {
        res.redirect('/dinosaurs/' + req.params.id);
        })
})


app.listen(port, function() {
    console.log('we are listening on port: ' + port);
});




// const express = require('express');
// const layouts = require('express-ejs-layouts');
// var db = require('./models');
// //TODO remove fs and use sequelize instead
// // const fs = require('fs');
// const methodOverride = require('method-override');
// const port = process.env.PORT || 3000;

// const app = express();

// app.set('view engine', 'ejs');
// app.use(layouts);
// app.use(express.static(__dirname + '/static'));
// app.use(express.urlencoded({extended: false}))
// app.use(methodOverride('_method'));

// app.get('/', function(req, res) {
//     res.render("index")
// });



// // GET /dinosaurs - index route - gets ALL dinos
// app.get('/dinosaurs', function(req, res){
//     db.dinosaur.findAll().then(function(dinosaurs){
//         res.render('dinos/index',{dinosaurs});
//     })
// });


// // GET /dinosaurs/new - serve up our NEW dino form
// app.get('/dinosaurs/new', function(req, res){
//     res.render('dinos/new');
// });

// // GET /dinosaurs/edit - serve up our EDIT dino form
// app.get('/dinosaurs/:id/edit', function(req, res){
//     var id = req.params.id;
//     db.dinosaur.findByPk(id)
//         .then(function(dinosaur){
//             res.render('dinos/edit', {dinosaur})
//         })
// });

// // GET /dinosaurs/:id - show route - gets ONE dino
// app.get('/dinosaurs/:id', function(req, res){ 
//     var id = req.params.id;
//     db.dinosaur.findByPk(id)
//         .then(function(dinosaur){
//             res.render('dinos/show', {dinosaur})
//         })
   
//     // res.render('dinos/show', {dinosaur: dinoData[id], id});
// });

// // POST /dinosaurs
// app.post('/dinosaurs', function(req, res){
    
//     db.dinosaur.create({
//         type: req.body.dinosaurType,
//         name: req.body.dinosaurName

//     }).then(function(dinosaur){

//         res.redirect('/dinosaurs');
//     })
// });




// app.delete('/dinosaurs/:id', function(req, res) {
//     db.dinosaur.destroy({
//         where: {id: parseInt(req.params.id)}
//     }).then(function(data) {
//         res.redirect('/dinosaurs');
//     })
// });

// app.put('/dinosaurs/:id', function(req, res){
//     var id = parseInt(req.params.id);
//     db.dinosaur.update({
//         type: req.body.dinosaurType,
//         name: req.body.dinosaurName
//     },
//     {
//         where: {id: id}
//     }).then(function(dinosaur){
//         res.redirect('/dinosaurs/' + req.params.id);
//     })
// })


// app.listen(port, function() {
//     console.log("we are listening on port:  🐘 😬 " + port);
// });