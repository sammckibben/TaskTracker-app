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
                ,comments:    formData.get("comments") })
    }

fetch('http://localhost:3000/formData', Params)
  .then(response => response.json()) 
  .then(data => {

    console.log(data)

    let application_error = document.getElementById('application_error')
    let task_error        = document.getElementById('task_error')
    let duration_error    = document.getElementById('duration_error')
    let comments_error    = document.getElementById('comments_error')

    application_error.innerHTML = "";
    task_error.innerHTML        = "";
    duration_error.innerHTML    = "";
    comments_error.innerHTML    = "";

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

      if (err.param === 'comments') {   
        comments_error.innerHTML += '<li>' + err_msg + '. ' + '</li>'
      }

        console.log(err.msg);
    })

  })

 .catch(err => console.log(err) ) 

}
   