// Gọi hàm để mở notebook với URL có query string (?file=...)
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

// Khi vào notebook.html, load nội dung notebook từ query string
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const notebookPath = params.get("file");

    if (notebookPath) {
        fetch(decodeURIComponent(notebookPath))
            .then(response => response.text())
            .then(html => {
                document.getElementById("notebook-content").innerHTML = html;

                // Render công thức toán sau khi tải nội dung html
                renderMath();

                // Cập nhật <title> thành tiêu đề bài viết từ link <a>
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

                        // Thêm thẻ <h1> vào đầu nội dung notebook
                        const notebookContainer = document.getElementById("notebook-content");
                        const titleHeading = document.createElement("h1");
                        titleHeading.textContent = `Notebook: ${selectedTitle}`;
                        titleHeading.classList.add("notebook-title");
                        notebookContainer.prepend(titleHeading);

                        // Cập nhật <title>
                        if (categoryTitle) {
                            document.title = `[${categoryTitle}] - ${selectedTitle}`;
                        } else {
                            document.title = `${selectedTitle} - An's blog`;
                        }
                        return;
                    }
                }
            })
            .catch(error => {
                document.getElementById("notebook-content").innerHTML = "Không thể tải notebook.";
                console.error("Lỗi tải notebook:", error);
            });
    }
});
