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

        /* nếu muốn tuần mới nhất lên đầu */
        // weeks.sort((a, b) => b - a);

        weeks.forEach(week => {

            const li = document.createElement("li");
            li.textContent = "Tuần " + week;

            li.onclick = () => loadWeek(week);

            weekList.appendChild(li);

        });

        if (weeks.length > 0) {
            loadWeek(weeks[0]);
        }

    });


/* load dữ liệu tuần */

function loadWeek(week) {

    fetch(`week/${week}.md`)
        .then(r => r.text())
        .then(text => parseMarkdown(text));

}


/* parse markdown */
function parseMarkdown(text) {

    goodList.innerHTML = "";
    badList.innerHTML = "";

    let mode = null;
    let currentNoteList = null;

    text.split("\n").forEach(line => {

        line = line.trim();

        /* xác định section */

        if (line === "## good") {
            mode = "good";
            return;
        }

        if (line === "## bad") {
            mode = "bad";
            return;
        }

        /* dòng lớp */

        if (line.includes("|")) {

            const [name, rate] = line.split("|");

            const li = document.createElement("li");

            /* container tiêu đề */

            const title = document.createElement("div");
            title.className = "classTitle";

            /* tên lớp */

            const className = document.createElement("span");
            className.textContent = name.trim();
            className.className = "className";

            /* dấu gạch */

            const dash = document.createElement("span");
            dash.textContent = " - ";
            dash.className = "classDash";

            /* đánh giá */

            const classRate = document.createElement("span");
            classRate.textContent = rate.trim();
            classRate.className = "classRate";

            title.appendChild(className);
            title.appendChild(dash);
            title.appendChild(classRate);

            li.appendChild(title);

            /* đường phân cách */

            const hr = document.createElement("hr");
            li.appendChild(hr);

            /* danh sách ghi chú */

            currentNoteList = document.createElement("ul");
            currentNoteList.className = "noteList";

            li.appendChild(currentNoteList);

            if (mode === "good") {
                goodList.appendChild(li);
            }

            if (mode === "bad") {
                badList.appendChild(li);
            }

            return;
        }

        /* dòng ghi chú */

        if (line.startsWith("-") && currentNoteList) {

            const note = document.createElement("li");
            note.textContent = line.substring(1).trim();

            currentNoteList.appendChild(note);

        }

    });

}