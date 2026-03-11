const weekList = document.getElementById("weekList");
const goodList = document.getElementById("goodList");
const badList = document.getElementById("badList");

/* load danh sách tuần */

fetch("week/weeks.txt")
.then(r => r.text())
.then(text => {

    const weeks = text
        .split("\n")
        .map(w => w.trim())
        .filter(w => w !== "");

    // weeks.reverse();
    // weeks.sort((a,b)=>b-a);

    weeks.forEach(week => {

        const li = document.createElement("li");
        li.textContent = "Tuần " + week;

        li.onclick = () => loadWeek(week);

        weekList.appendChild(li);

    });

    if(weeks.length > 0){
        loadWeek(weeks[0]);
    }

});

/* load dữ liệu tuần */

function loadWeek(week){

fetch(`week/${week}.md`)
.then(r => r.text())
.then(text => parseMarkdown(text));

}

/* parse markdown */

function parseMarkdown(text){

goodList.innerHTML="";
badList.innerHTML="";

let mode=null;

text.split("\n").forEach(line=>{

    line=line.trim();

    if(line==="## good") mode="good";

    else if(line==="## bad") mode="bad";

    else if(line.includes("|")){

        let [name,note] = line.split("|");

        const li=document.createElement("li");

        li.textContent=name.trim()+" - "+note.trim();

        if(mode==="good") goodList.appendChild(li);

        if(mode==="bad") badList.appendChild(li);

    }

});

}