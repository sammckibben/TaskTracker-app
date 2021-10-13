
setDateDefaults();

let form = document.querySelector('form');

form.onsubmit = sendData;

function sendData(e) {

   e.preventDefault(); 

   let formData = new FormData(form);

   let Params = 
   {
      method:   "POST",
      headers: {'Content-Type': 'application/json'}
     ,body:      JSON.stringify ({
                 application: formData.get("application")
                ,task:        formData.get("task")
                ,duration:    formData.get("duration")
                ,date:        formData.get("date") 
                ,comments:    formData.get("comments") })
    }

fetch('http://localhost:3000/formData', Params)
  .then(response => response.json()) 
  .then(data => {

    console.log(data)

    let applicationInput = document.getElementById('applicationInput')
    let taskInput        = document.getElementById('taskInput')
    let durationInput    = document.getElementById('durationInput')
    let dateInput        = document.getElementById('dateInput')
    let commentsInput    = document.getElementById('commentsInput')

    let application_error = document.getElementById('application_error')
    let task_error        = document.getElementById('task_error')
    let duration_error    = document.getElementById('duration_error')
    let date_error        = document.getElementById('date_error')
    let comments_error    = document.getElementById('comments_error')
    let entrySuccess      = document.getElementById('entrySuccess')

    application_error.innerHTML = "";
    task_error.innerHTML        = "";
    duration_error.innerHTML    = "";
    date_error.innerHTML        = "";
    comments_error.innerHTML    = "";

    if (!!data.errors){
    data.errors.forEach(function(err) {

      let err_msg_raw = err.msg
      let err_msg     = err_msg_raw.replace(/(\r\n|\n|\r)/gm, "");

      if (err.param === 'application') {   
        application_error.innerHTML += '<li>' + err_msg + '. ' + '</li>' 
      }

      if (err.param === 'task') {   
        task_error.innerHTML += '<li>' + err_msg + '. ' + '</li>'
      }

      if (err.param === 'duration') {   
        duration_error.innerHTML += '<li>' + err_msg + '. ' + '</li>'
      }

      if (err.param === 'date') {   
        date_error.innerHTML += '<li>' + err_msg + '. ' + '</li>'
      }

      if (err.param === 'comments') {   
        comments_error.innerHTML += '<li>' + err_msg + '. ' + '</li>'
      }

        console.log(err.msg);
      })

    } else {
  
       entrySuccess.innerHTML = '<li> Entry for the ' + taskInput.value + ' task entered successfully.</li>';
       
       applicationInput.value = '';
       taskInput.value        = '';
       durationInput.value    = '';
       commentsInput.value    = '';

        function removeEntrySuccess() {
          entrySuccess.innerHTML = "";
        }

       setTimeout(removeEntrySuccess, 3000);

      console.log(data)
    }
})

 .catch(err => console.log(err) ) 
}


function setDateDefaults () {
  var dateInput  = document.getElementById("dateInput")
  var today      = new Date();
 
  var dd   = today.getDate();
  var mm   = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
     dd = '0' + dd;
  }

  if (mm < 10) {
     mm = '0' + mm;
  } 

  today = yyyy + '-' + mm + '-' + dd;

  dateInput.value = today;

  document.getElementById("dateInput").setAttribute("max", today);
}
   
