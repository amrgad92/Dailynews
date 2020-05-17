
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


