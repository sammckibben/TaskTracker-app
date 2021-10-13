
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
 ,check('duration')
 .custom(val => {
    if (val > 0) {
      return true;
    } else {
      return false;
    }
 })
 .withMessage('Duration must have a value')
 ,(req, res) =>{

  const errors = validationResult(req);
  var successFlag;

  if (!errors.isEmpty()) {

    return res.status(422).json({errors: errors.array()})

  } else {

    return res.status(202).json({
    success: 'Yes'}
  )
  
  var successFlag = 'Y'
  res.send(successFlag);
   }

})


app.listen(port, ()=>{ console.log('Server listening on port 3000')});
