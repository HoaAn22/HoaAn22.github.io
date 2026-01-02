// Chuyển trang index.html render file .md
// Tránh xung đột khi cùng dùng URL Query String
function loadMarkdown(path) {
    const encodedPath = encodeURIComponent(path);
    window.location.href = `index.html?file=${encodedPath}`;
}

// URL Query String
function loadNotebook(notebookPath) {
    const encodedPath = encodeURIComponent(notebookPath);
    window.location.href = `notebook.html?file=${encodedPath}`;
}

function renderMath() {
    if (window.MathJax) {
        MathJax.Hub.Config({
            TeX: {
                equationNumbers: {
                    autoNumber: "AMS",
                    useLabelIds: true
                }
            },
            tex2jax: {
                inlineMath: [ ['$','$'], ["\\(","\\)"] ],
                displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
                processEscapes: true,
                processEnvironments: true
            },
            displayAlign: 'center',
            messageStyle: 'none',
            CommonHTML: {
                linebreaks: {
                    automatic: true
                }
            }
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    } else {
        setTimeout(renderMath, 100);
    }
}

function updateHeaderNotebook(selectedTitle){
    const notebookContainer = document.getElementById("notebook-content");
    const titleHeading = document.createElement("h1");
    titleHeading.textContent = `Notebook: ${selectedTitle}`;
    titleHeading.classList.add("notebook-title");
    notebookContainer.prepend(titleHeading);
}

function updateNotebookTitle(notebookPath) {
    const links = document.querySelectorAll('a[onclick]');
    let selectedTitle = "";
    let categoryTitle = "";

    for (let link of links) {
        const onclickValue = link.getAttribute('onclick');
        if (onclickValue.includes(notebookPath)) {
            selectedTitle = link.innerText.trim();

            let parent = link.parentElement;
            while (parent) {
                if (parent.classList.contains("dropdown-item")) {
                    let parentLink = parent.querySelector('a');
                    if (parentLink && parentLink !== link) {
                        categoryTitle = parentLink.innerText.trim();
                    }
                    break;
                }
                parent = parent.parentElement;
            }

            // const notebookContainer = document.getElementById("notebook-content");
            // updateHeaderNotebook(selectedTitle);
            // setTimeout(() => {
            //     if (!document.querySelector('h1.notebook-title')) {
            //         updateHeaderNotebook(selectedTitle);
            //     }
            // }, 100);
            
            if (categoryTitle) {
                document.title = `[${categoryTitle}] - ${selectedTitle}`;
            } else {
                document.title = `${selectedTitle} - An's blog`;
            }
            break;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const notebookPath = params.get("file"); // Đã được decode có thể dùng trực tiếp `fetch(notebookPath)`

    if (notebookPath) {
        fetch(decodeURIComponent(notebookPath))
            .then(response => {
                // Kiểm tra mã trạng thái của phản hồi
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById("notebook-content").innerHTML = html;
                renderMath();
                updateNotebookTitle(notebookPath);
            })
            .catch(error => {
                console.error('Error loading file:', error);
                // document.getElementById("notebook-content").innerHTML = "<p>" + error.message + "Không thể tải Notebook.</p>";
                const notebookContainer = document.getElementById("notebook-content");
                // notebookContainer.innerHTML = `<p>${error.message}</p>`;
                notebookContainer.innerHTML = `<p>Không thể tải Notebook. Kiểm tra lại đường dẫn.</p>`;
            });
    }
});
