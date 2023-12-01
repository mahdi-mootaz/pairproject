function generateID() {
  var count = 0;
  return function () {
    return count++;
  };
}
var id = generateID();

function makePatient(name,lastname,email,password){
var obj={}
obj.id=id()
obj.name=name
obj.lastname=lastname
obj.email=email
obj.password=password
return obj
}
function Makedoctor(email,pass){
  var obj ={}
  obj.email=email
  obj.pass=pass
  obj.add=add
  obj.listpatients=[]
  //obj.reservation=reservation
  return obj
}
var add=function(name,lastname,email,password){
var result=makePatient(name,lastname,email,password)
this.listpatients.push(result)
}



$("#create-account").on("click", function() {
  const name1=$("#name").val()
const lastname1=$("#lastname").val()
const email1=$("#email").val()
const password1=$("#password").val()
  if(!localStorage.getItem("doctor")){
      var p=Makedoctor()
p.add(name1,lastname1,email1,password1)
console.log(p)
var DoctorJason = JSON.stringify(p);
localStorage.setItem('doctor', DoctorJason);
console.log(DoctorJason)
window.location.href="doctor.html"
  }
  else{
  var doct1 = localStorage.getItem('doctor');
  var doct = JSON.parse(doct1);
  doct.listpatients.push({name:name1,lastname:lastname1,email:email1,password:password1})
  localStorage.clear();
var DoctorJason = JSON.stringify(doct);
localStorage.setItem('doctor', DoctorJason);
console.log(DoctorJason)
window.location.href="doctor.html"
  }
});


$("#login").on("click", function() {
  const email=$("#email").val();
  const password=$("#password").val();
  var doct1 = localStorage.getItem('doctor');
  var doct = JSON.parse(doct1);
  
  console.log(doct)
  if("mahdi.abichou@gmail.com"==email && 123456==password){
      window.location.href="doctor.html";  
  }
  else{
  for (let index = 0; index < doct.listpatients.length; index++) {
      console.log(doct.listpatients)
      if(doct.listpatients[index].email==email && doct.listpatients[index].password==password){
        return  window.location.href="patient.html";  
      }
    }
    
    alert('credentials are not valid')
      
  }
console.log(p)
});
function displaylist(){
  $("#add").empty()
  var doct1 = localStorage.getItem('doctor');
  var doct = JSON.parse(doct1);
  res=[]
  for (let index = 0; index < doct.listpatients.length; index++) {
    if(!(doct.listpatients[index].date===undefined)){
   res.push(doct.listpatients[index])
   res.sort(function(a,b){
    return new Date(a.date)-new Date(b.date)
   })
   console.log(res);
  }}
  for (let index = 0; index < res.length; index++) {
    $('#add').append(`<li> <span>${res[index].name}</span> <span>${res[index].email}</span>
<span>${res[index].date}</span></li>`) 
    
  }
}

  displaylist()
  var consultation = function(email, description, prescription) {
    var doct1 = localStorage.getItem('doctor');
    var doct = JSON.parse(doct1);
    for (let index = 0; index < doct.listpatients.length; index++) {
      console.log(doct.listpatients[index].hasOwnProperty('consultation'));
       if (email === doct.listpatients[index].email) {
         if (!doct.listpatients[index].hasOwnProperty('consultation')) {
           doct.listpatients[index].consultation = [];
           
         }
         doct.listpatients[index].consultation.push({
           description: description,
           prescription: prescription,
         });
         break;
       }
    }
    var DoctorJason = JSON.stringify(doct);
    localStorage.setItem('doctor', DoctorJason);
   };
  $('#btupinfo').on('click',function(){
    const patientemail=$('#patientemail').val()
    const description=$('#description').val()
    const prescreption=$('#prescreption').val()
    console.log(patientemail);
    console.log(description);
    console.log(prescreption);
    var doct1 = localStorage.getItem('doctor');
      var doct = JSON.parse(doct1);
      consultation(patientemail,description,prescreption)
    console.log(doct);
  });
  
  $('#btcons').on('click',function(){
    const mailpatient=$('#mailpatient').val()
    const date=$('#dat').val()
    var doct1 = localStorage.getItem('doctor');
    var doct = JSON.parse(doct1);
    for (let index = 0; index < doct.listpatients.length; index++) {
      if (mailpatient===doct.listpatients[index].email){
        doct.listpatients[index].date=date
    }
  }
  var DoctorJason = JSON.stringify(doct);
    localStorage.setItem('doctor', DoctorJason);
});
