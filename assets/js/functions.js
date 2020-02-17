import * as f from "../js/main.js";

const Functions = {
    create: (start,end,title,color,id) => {
        let colors = {
            1:"event-1",
            2:"event-2",
            3:"event-3",
            4:"event-4",
            5:"event-custom1",
            6:"event-custom2",
            7:"event-custom3",
            8:"event-custom4"
        }

        let li = document.createElement("li");li.setAttribute("class","cd-schedule__event");li.setAttribute("id",id);
        let a = document.createElement("a");a.setAttribute("data-start",start);a.setAttribute("data-end",end);a.setAttribute("data-event",colors[color]);
        
        let em = document.createElement("em");em.setAttribute("class","cd-schedule__name");em.innerText=title;
        a.appendChild(em);li.appendChild(a);
        return li;
      },
    putEvent:(event,when) =>{
        
        let days = document.getElementsByClassName("cd-schedule__events")[0].childNodes[1];
        //console.log(days.childNodes[when*2-1].childNodes[3])
        days.childNodes[when*2-1].childNodes[3].appendChild(event);
        f.default.create();
    }
    ,deleteElement(id){
        let element = document.getElementById(id);
        element.parentNode.removeChild(element);
    }

}


export default Functions;
