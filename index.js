
const express                   = require('express');
const app                       = express(); 
const port                      = 3000;
const bodyParser                = require('body-parser');
const urlencodedParser          = bodyParser.urlencoded({ extended: false });
const {check, validationResult} = require('express-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html") 
}); 

app.post('/formData', urlencodedParser,
  check('application').isLength({min:3}).withMessage('Application needs atleast two characters').trim()
 ,check('task').not().isEmpty().withMessage('Task must have a value')
 ,check('duration').not().isEmpty().withMessage('Duration must have a value')
 ,check('duration').isDecimal().optional({nullable:true, checkFalsy: true}).withMessage('Duration must be a number')
 ,(req, res) =>{

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(422).json({errors: errors.array()})

  } else {

    res.status(202).json({
    success: 'Yes'

  })
   }

//  errors.forEach(function(err){
//     errorMsg.innerHTML += '<br>';
//  });

})

app.listen(port, ()=>{ console.log('Server listening on port 3000')});