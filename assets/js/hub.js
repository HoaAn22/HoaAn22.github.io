const baseURL = "https://daotaotructuyen.hub.edu.vn/uni/vao-hoc/";
const endURL = "/tai-lieu-thong-bao";
const content = document.getElementById("content");

window.onload = function () {
    fetch("assets/posts/HUB-second-bachelors-degree/course.md")
        .then(res => {
            if (!res.ok) throw new Error("Không đọc được file MD");
            return res.text();
        })
        .then(text => parseMD(text))
        .catch(err => {
            content.innerHTML = "<p>Lỗi: " + err.message + "</p>";
        });
};

function parseMD(text) {
    content.innerHTML = "";

    const lines = text.split("\n");

    let ul = null;

    lines.forEach((line, index) => {
        line = line.trim();
        if (!line) return;

        // 🔹 Học kỳ (# ...)
        if (line.startsWith("#")) {
            // đóng danh sách cũ
            if (ul) {
                content.appendChild(ul);
                content.appendChild(document.createElement("hr"));
            }

            // ul = document.createElement("ul");
            ul = document.createElement("ol");

            const h1 = document.createElement("h2");
            h1.innerText = line.replace("#", "").trim();
            content.appendChild(h1);
            return;
        }

        // 🔹 Dòng khóa học: "1. Tên - code"
        const match = line.match(/^\d+\.\s*(.+)\s-\s(.+)$/);
        if (!match) return;

        const name = match[1].trim();
        const code = match[2].trim();

        if (!isValidCode(code)) return;

        const url = baseURL + code + endURL;

        const li = document.createElement("li");

        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.innerText = name;

        li.appendChild(a);
        ul.appendChild(li);
    });

    // đóng block cuối
    if (ul) {
        content.appendChild(ul);
        content.appendChild(document.createElement("hr"));
    }
}

function isValidCode(code) {
    return /^[a-zA-Z0-9]+$/.test(code);
}