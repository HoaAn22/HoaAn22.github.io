// Lưu đường dẫn notebook vào localStorage và chuyển hướng
function loadNotebook(notebookPath) {
    localStorage.setItem("selectedNotebook", notebookPath);
    window.location.href = "notebook.html";  // Điều hướng sang trang notebook.html
}

function renderMath() {
    if (window.MathJax) {
        // MathJax loaded
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
        // Nếu MathJax chưa sẵn sàng, thử đợi rồi gọi lại
        setTimeout(renderMath, 100);
    }
}

// Khi vào notebook.html, load nội dung notebook
document.addEventListener("DOMContentLoaded", function () {
    let notebookPath = localStorage.getItem("selectedNotebook");
    if (notebookPath) {
        fetch(notebookPath)
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