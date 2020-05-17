/*
-----------------------------------Ajaaaaaaaaax-------------------------------------
request.readyState=0; //request not initialized
request.readyState=1; //request established
request.readyState=2; //request received
request.readyState=3; //request proccesed
request.readyState=4; //request finieshed and response is ready

request.status = 404; //not found
request.status=403; //forbidden
request.status=200; //ok

*/

getData("general");
var myData;
var links=document.getElementsByClassName("nav-link");
for(var i=0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
        var currentCat=e.target.text;
        getData(currentCat)
    })
}
function getData(category){ 

    var httpReq = new XMLHttpRequest();
    
    httpReq.open("GET","http://newsapi.org/v2/top-headlines?country=eg&category="+category+"&apiKey=4a11fe849bbc431eaf0836f5ae2e6c9b");
    
    httpReq.send();
    
    myData=[];
    
    httpReq.addEventListener("readystatechange",function(){
          
           if(httpReq.readyState==4&&httpReq.status==200)
           {
              myData=JSON.parse(httpReq.response).articles;
              console.log(myData)
              displayPosts();
           }
    
    })
}

function displayPosts(){
    var  temp=``;

    for(var i=0;i<myData.length;i++){
        temp+=`
        <div class='col-md-4'>
           <div class='post-data'>
              <img class='img-fluid' src=`+myData[i].urlToImage+` />
              <h4 class="hader">`+myData[i].title+`</h4>
              <p>`+myData[i].description+`</p>
           </div>
        </div>
        `
    }

    document.getElementById("rowData").innerHTML=temp;

}

///////////----------------------------------------------------------------------------------------///////////


//data obj.
//var d=new Date();
// console.log(d.getDate());  //1-31
// console.log(d.getDay());  //0-6
// console.log(d.getFullYear());  //current year
// console.log(d.getHours());  //0-23
// console.log(d.getMinutes());  //0-59
// console.log(d.getSeconds());  //0-59
// console.log(d.getMilliseconds());  //0-999
// console.log(d.getMonth());  //0-999
//settimeout,setinterval-->schedule function calling
//settimeout(funName,interval)-->execute fun. once after interval and stopped
//setinterval(funName,interval)-->execute fun. every interval time and return value
//clearinterval(value)-->to stop interval

var d=new Date();
var today=document.getElementById("demo");
var clock=document.getElementById("clock")

var days=["sun","mon","tue","wen","thur","fri","sat"];

today.innerHTML="today is "+days[d.getDay()];
var btn=document.getElementById("btn")
//exersice for digital clock
function showTime(){
  var d=new Date();
  clock.innerHTML=d.getHours()+" : "+d.getMinutes()+" : "+d.getSeconds()
   setTimeout(showTime,1000)
}

showTime();

///////////----------------------------------------------------------------------------------------///////////


/*Crud operation with local storage and validations(rejex)*/
var nameInput=document.getElementById("name");
var ageInput=document.getElementById("age");
var phoneInput=document.getElementById("phone");
var titleInput=document.getElementById("title");
var addBtn = document.getElementById("addBtn");
var inputs=document.getElementsByClassName("form-control");
var table=document.querySelector(".list-table");
var row=document.querySelector(".grid-row")
var listBtn=document.querySelector(".list")
var gridBtn=document.querySelector(".grid") 
var empolyeesCont;
var currentIndex;


if(localStorage.getItem("empolyeesList")==null||JSON.parse(localStorage.getItem("empolyeesList")).length==0)
{
  empolyeesCont=[];
  table.classList.add("hide-table")
}

else{
  empolyeesCont=JSON.parse(localStorage.getItem("empolyeesList"));
  displayDataInTable();
}

// List View
function listView() {
  listBtn.classList.add("active")
  gridBtn.classList.remove("active")
  displayDataInTable();
}

// Grid View
function gridView() {
  gridBtn.classList.add("active")
  listBtn.classList.remove("active")
  displayInGrid()
 
}

addBtn.onclick = function(){
  if(addBtn.innerHTML=="add Empolyee")
    addEmp();
  else
    updateEmp(currentIndex)  
   
  displayDataInTable();
  clearForm()
  
}
var nameAlert=document.querySelector(".name-alert");
var ageAlert=document.querySelector(".age-alert");
var phoneAlert=document.querySelector(".phone-alert");

nameInput.addEventListener("keyup",function(){
    var nameRejex=/^[A-Z][a-z]{2,8}$/;
    if(nameRejex.test(nameInput.value)==false)
    {
          nameInput.classList.add("is-invalid");
          nameInput.classList.remove("is-valid");
          addBtn.disabled="true";
          nameAlert.style.display="block"
    }
    else{
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        addBtn.removeAttribute("disabled");
        nameAlert.style.display="none"


    }

})
ageInput.addEventListener("keyup",function(){
    var ageRejex=/^([2-7][0-9]|80)$/;
    if(ageRejex.test(ageInput.value)==false)
    {
        ageInput.classList.add("is-invalid");
        ageInput.classList.remove("is-valid");
          addBtn.disabled="true";
          ageAlert.style.display="block"
    }
    else{
        ageInput.classList.add("is-valid");
        ageInput.classList.remove("is-invalid");
        addBtn.removeAttribute("disabled");
        ageAlert.style.display="none"


    }

})
phoneInput.addEventListener("keyup",function(){
    var phoneRejex=/^(002)?(010|011|012|015)[0-9]{8}$/;
    if(phoneRejex.test(phoneInput.value)==false)
    {
        phoneInput.classList.add("is-invalid");
        phoneInput.classList.remove("is-valid");
          addBtn.disabled="true";
          phoneAlert.style.display="block"
    }
    else{
        phoneInput.classList.add("is-valid");
        phoneInput.classList.remove("is-invalid");
        addBtn.removeAttribute("disabled");
        phoneAlert.style.display="none"
    }

})

function addEmp(){

  if(nameInput.value!=""&&ageInput.value!=""&&phoneInput.value!=""&&titleInput.value!="")
  {
    var empolyee={
      empolyeeName:nameInput.value,
      empolyeeAge:ageInput.value,
      empolyeePhone:phoneInput.value,
      empolyeeTitle:titleInput.value,
    }
    empolyeesCont.push(empolyee);
    table.classList.remove("hide-table")

    localStorage.setItem("empolyeesList",JSON.stringify(empolyeesCont))
  
  }
  else{
    alert("fields are empty")
  }
  
}
function displayDataInTable(){
  table.classList.remove("hide-table")
  row.classList.add("hide-grid")

  var trs="";
  for(var i=0;i<empolyeesCont.length;i++){
    trs+=`
    <tr>
      <td>`+empolyeesCont[i].empolyeeName+`</td>
      <td>`+empolyeesCont[i].empolyeeAge+`</td>
      <td>`+empolyeesCont[i].empolyeePhone+`</td>
      <td>`+empolyeesCont[i].empolyeeTitle+`</td>
      <td>
        <button onclick='deleteEmp(`+i+`)' class='btn btn-danger'>delete</button>
        <button onclick='getCurrentEmp(`+i+`)' class='btn btn-info'>update</button>

      </td>
    </tr>`
  }

  document.getElementById("tableBody").innerHTML=trs
}
function displayInGrid(){
  table.classList.add("hide-table")
  row.classList.remove("hide-grid")

  var cols="";
  for(var i=0;i<empolyeesCont.length;i++){
    cols+=`<div class="col-md-3 mb-3">
    <div class="emp">
      <img  class="img-fluid" src="images/three.jpg">
      <span>`+empolyeesCont[i].empolyeeName+`</span>
      <span class="badge badge-primary">`+empolyeesCont[i].empolyeeTitle+`</span>
      <h2>`+empolyeesCont[i].empolyeePhone+`</h2>
      <span class="age">`+empolyeesCont[i].empolyeeAge+`</span>
      <button class="btn btn-danger" onclick='deleteEmp(`+i+`)'>delete</button>
      <button onclick='getCurrentEmp(`+i+`)' class='btn btn-info'>update</button>

    </div>
  </div>`
  }

  document.getElementById("dataRow").innerHTML=cols
}
function clearForm(){
  for(var i=0;i<inputs.length;i++){
    inputs[i].value=""
  }

}
function deleteEmp(index){
  empolyeesCont.splice(index,1);
  if(empolyeesCont.length==0)
  {
    table.classList.add("hide-table");
  }
  
    localStorage.setItem("empolyeesList",JSON.stringify(empolyeesCont))
    if(row.classList.contains("hide-grid"))
      displayDataInTable();
    else 
    displayInGrid()
  

}
function getCurrentEmp(index){
    currentIndex=index;
    nameInput.value=empolyeesCont[index].empolyeeName;
    ageInput.value=empolyeesCont[index].empolyeeAge;
    phoneInput.value=empolyeesCont[index].empolyeePhone;
    titleInput.value=empolyeesCont[index].empolyeeTitle;
    addBtn.innerHTML="update Empolyee";

}
function updateEmp(){
  var empolyee={
    empolyeeName:nameInput.value,
    empolyeeAge:ageInput.value,
    empolyeePhone:phoneInput.value,
    empolyeeTitle:titleInput.value,
  }
  empolyeesCont[currentIndex]=empolyee;
  localStorage.setItem("empolyeesList",JSON.stringify(empolyeesCont))

    
}
function search(term){
  if(row.classList.contains("hide-grid"))
{
  var trs=``;
  for(var i=0;i<empolyeesCont.length;i++){
    if(empolyeesCont[i].empolyeeName.toLowerCase().includes(term.toLowerCase()))
    {
      trs+="<tr><td>"+empolyeesCont[i].empolyeeName+"</td><td>"+empolyeesCont[i].empolyeeAge+"</td><td>"+empolyeesCont[i].empolyeePhone+"</td><td>"+empolyeesCont[i].empolyeeTitle+"</td><td><button onclick='deleteEmp("+i+")' class='btn btn-danger'>delete</button></td></tr>"

    }
  }

  document.getElementById("tableBody").innerHTML=trs
}
else{
  var cols="";
  for(var i=0;i<empolyeesCont.length;i++){
    if(empolyeesCont[i].empolyeeName.toLowerCase().includes(term.toLowerCase()))
{
  cols+=`<div class="col-md-3 mb-3">
  <div class="emp">
    <img  class="img-fluid" src="images/three.jpg">
    <span>`+empolyeesCont[i].empolyeeName+`</span>
    <span class="badge badge-primary">`+empolyeesCont[i].empolyeeTitle+`</span>
    <h2>`+empolyeesCont[i].empolyeePhone+`</h2>
    <span class="age">`+empolyeesCont[i].empolyeeAge+`</span>
    <button class="btn btn-danger" onclick='deleteEmp(`+i+`)'>delete</button>

  </div>
</div>`
}
    
  }

  document.getElementById("dataRow").innerHTML=cols
}

}



// js Dom --> document object Model
/*
var x=document.getElementById("demo");
var x=document.getElementsByClassName("test");
var x=document.getElementsByTagName("h3");
var x=document.getElementsByTagNameNS("h1");
var x=document.getElementsByName("fname");

var x=document.querySelector(".test");
var x=document.querySelectorAll(".test");
var h1s=document.getElementsByClassName("test");


for(var i=0;i<h1s.length;i++){
   h1s[i].addEventListener("click",function(){
     alert("hjdjhjhdjh")
   })
}

//set attribute. to element

var img=document.getElementById("myImg");
var link=document.getElementById("myLink")
var test1=document.querySelector(".test1")
link.href="https://www.google.com/?hl=ar"
img.src="images/01-thumbnail.jpg";

*/

// -------------------------slider--------------------------------------------

var imgs=document.getElementsByClassName("img-fluid");
var overlayCont=document.querySelector(".overlay-container");
var overlayInner=document.querySelector(".overlay-inner");
var imgsArray=[];
var wClose=document.getElementById("wClose");
var next=document.getElementById("next");
var prev=document.getElementById("prev");

var currentIndex=0;
for(var i=0;i<imgs.length;i++){

 imgsArray.push(imgs[i]);
  imgs[i].addEventListener("click",function(e){
    overlayCont.classList.add("show");
    var imgSrc=e.target.src;
    currentIndex=imgsArray.indexOf(e.target);
   
    overlayInner.style.backgroundImage="url("+imgSrc+")";

      
  })
}
next.addEventListener("click",function(){
  getNextImg()
})
function getNextImg(){
  currentIndex++;
  if(currentIndex>imgsArray.length-1){
    currentIndex=0
  }
  overlayInner.style.backgroundImage="url("+imgsArray[currentIndex].src+")";

}

prev.addEventListener("click",function(){
 getPrevImg()
})
function getPrevImg(){
  currentIndex--;

  if(currentIndex<0){
    currentIndex=imgsArray.length-1
  }
   overlayInner.style.backgroundImage="url("+imgsArray[currentIndex].src+")";
 
}

wClose.addEventListener("click",function(){
  overlayCont.classList.remove("show");
})

document.addEventListener("keydown",function(e){
  if(e.keyCode==27){
    overlayCont.classList.remove("show");
  }
  else if(e.keyCode==39){
    getNextImg();
  }
  else if(e.keyCode==37){
    getPrevImg()
  }
  
})

overlayCont.addEventListener("click",function(e){
  if(e.target==overlayCont)
  {
    overlayCont.classList.remove("show");

  }
 

})