const express = require('express'); // Q -- this is instead of import? 
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Pet = require('./models/pet.js');
const bodyParser = require('body-parser'); // when a request has data, it taskes the data and adds it back into the request. 

const port = process.env.PORT || 8080 //env is the environment variable, in this case it's the computer, or it would be the server 

mongoose.connect('mongodb://localhost/updog');
// const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/updog';
// mongoose.connect(dbURL);

app.use(express.static('public'));

app.use(bodyParser.json());

router.route('/')
  .get((req, res) => {




router.route('/pets')
  .get((req,res)=> {
    Pet.find({},(err,docs) => {
      if(err !== null){
        res
          .status(400)
          .json({
            message: "there is an error!!!!!"
          });
        return // this stops the fucntion here if there is an error 
      } 
      res 
        .status(200)
        .json(docs);
    })
  })
  .post((req,res) => {
      const body = req.body;
      const pet = new Pet();

      pet.name = body.name;
      pet.description = body.description;
      pet.photo = body.photo;
      pet.score = 0;

      console.log(body);
      pet.save((err,doc)=>{
        if(err !== null){
          res
            .status(400)
            .json({
              message: "errrrrrrrrooooooor!!!"
            });
          return;
        }
        res
          .status(200)
          .json(doc);
      })
   })
  
router.route('/pets/:pet_id')
   .get((req,res) => {
    const petId = req.params.pet_id;
    console.log(petId);
    Pet.findById(petId, (err, doc)=> {
      if(err !== null){
        res
          .status(400)
          .json({
            message: "AN ERRRROR"
          });
      }
      res
        .status(200)
        .json(doc);
    })
   })
   .put((req,res)=> {
     const petId = req.params.pet_id;
     Pet.findById(petId, (err, doc) =>{
       if(err !== null) {
         res
          .status(400)
          .json({
            message: "un error"
          });
        return
       }
       Object.assign(doc, req.body, {score: doc.score + 1});

       doc.save ((err, savedDoc) => {
         if (err !== null) {
           res
             .status(400)
             .json({
               message: "un error"
             });
           return
         }
         res
          .status(203)
          .json(savedDoc);
       })
     })
    })
       .delete((req,res)=> {
         const petId = req.params.pet_id;
  
         Pet.findByIdAndRemove(petId, (err,doc)=> {
                    if (err !== null) {
             res
               .status(400)
               .json({
                 message: "un error"
               });
             return
           }
  
           res
            .status(200)
            .json(doc)
         })
  
       });

app.use('/api', router);

app.listen(port); 