import * as functions from "../js/functions.js";

console.log(functions.default.create(1,1,1))
let objs=["data-end","data-start"];

objs.forEach(element => {
for(let i=8;i<=20;i++){
    if(i<10){
        let where = document.getElementById(element);
        let option1 = document.createElement("option");option1.setAttribute("value","0"+i+":00");option1.text="0"+i+":00";
        let option2 = document.createElement("option");option2.setAttribute("value","0"+i+":30");option2.text="0"+i+":30";
        where.appendChild(option1);
        where.appendChild(option2);

    }else{
    let where = document.getElementById(element);
    let option1 = document.createElement("option");option1.setAttribute("value",i+":00");option1.text=i+":00";
    let option2 = document.createElement("option");option2.setAttribute("value",i+":30");option2.text=i+":30";
    where.appendChild(option1);
    where.appendChild(option2);
}
}
});
let uid =uuidv4();
let add= document.getElementById("add-event");
let bimport = document.getElementById("import");

bimport.addEventListener("click",function(){
    let url= document.getElementById("urlf").value;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + url) 
    .then(response => response.text())
    .then(function(contents){
            let object = new DOMParser().parseFromString(contents, "text/html");
        console.log(object.getElementsByTagName("table")[0].childNodes[1]); 
        let table =object.getElementsByTagName("table")[0].childNodes[1]
        let day=0;
        for(let i = 1 ; i < table.getElementsByTagName("tr").length;i++)
        {
            let uuid =uuidv4();    
            if(table.getElementsByTagName("tr")[i].childNodes.length==3)day++;
            else {
        let elem = table.getElementsByTagName("tr")[i].childNodes;
        console.log(elem);
        let start =elem[1].innerText.trim();
        let end =elem[3].innerText.trim();
        let title =elem[5].innerText.trim() + elem[11].innerText.trim() +"("+elem[7].innerText.trim() +")";
        let color=i%7+1;
        functions.default.putEvent(functions.default.create(start,end,title,color,uuid),day);

        const event = {
            id:uuid,
            end: end,
            start:start,
            color:color,
            title:title,
            day:day,
        }
        window.localStorage.setItem('event-'+uuid, JSON.stringify(event));
        }

    }
    
    })
    .catch(() => console.log("Canâ€™t access " + url + " response. Blocked by browser?"))

    


})
add.addEventListener("click",function(){
let end = document.getElementById("data-end").value;
let start = document.getElementById("data-start").value;
let color = document.getElementById("color").value;
let title = document.getElementById("title").value;
let day = document.getElementById("day").value;
functions.default.putEvent(functions.default.create(start,end,title,color,uid),day);


const event = {
    id:uid,
    end: end,
    start:start,
    color:color,
    title:title,
    day:day,
}
window.localStorage.setItem('event-'+uid, JSON.stringify(event));


})

for (var key in localStorage){
    if(key.split("-")[0]=="event"){
        let event = JSON.parse(window.localStorage.getItem(key));
        functions.default.putEvent(functions.default.create(event.start,event.end,event.title,event.color,event.id),event.day);

        
    }
 }

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
