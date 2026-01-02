// Chuyển trang notebook.html render file .ipynb
// Tránh xung đột khi cùng dùng URL Query String
function loadNotebook(path) {
    const encodedPath = encodeURIComponent(path);
    window.location.href = `notebook.html?file=${encodedPath}`;
}

// Hàm trích xuất ID video từ URL YouTube
function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Cấu hình và render MathJax
function renderMath() {
    if (window.MathJax) {
        MathJax.Hub.Config({
            TeX: {
                equationNumbers: { autoNumber: "AMS", useLabelIds: true }
            },
            tex2jax: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true,
                processEnvironments: true
            },
            displayAlign: 'center',
            messageStyle: 'none',
            CommonHTML: { linebreaks: { automatic: true } }
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    } else {
        setTimeout(renderMath, 100);
    }
}

// Cập nhật tiêu đề dựa trên file đang mở
function updateNotebookTitle(filePath) {
    const links = document.querySelectorAll('a[onclick]');
    let selectedTitle = "";
    let categoryTitle = "";

    for (let link of links) {
        const onclickValue = link.getAttribute('onclick');
        if (onclickValue.includes(filePath)) {
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
            break;
        }
    }
}

// Danh sách các file Markdown cần xử lý đặc biệt (ngoại lệ)
function getExcludeLinks() {
    return [
        'cv.md',
        'portfolio.md',
        'hoa-hoc/',
        'second-bachelors-degree/',
        'self-development-plan.md',
        'todo-list.md',
        // Thêm các file markdown đặc biệt khác tại đây có thể thêm thư mục sẽ xử lý các file trong thư mục
    ];
}

// Hàm hiển thị nội dung Markdown (và xử lý ngoại lệ)
function renderMarkdown(content, isExcluded = false) {
    // const md = window.markdownit();
    const md = window.markdownit({
        breaks: false
    });
    let renderedContent = md.render(content);

    if (isExcluded) {
        renderedContent = renderedContent.replace(/<p>/g, '<p class="nonstandard-p">');
    }

    // Tự động gán link cho URL
    renderedContent = renderedContent.replace(/(?<!["'=])(https?:\/\/[^\s<>"']+)/g, (url) => `<a href="${url}" target="_blank">${url}</a>`);

    // Ghi chú đặc biệt theo cú pháp [text](note.annotation)
    renderedContent = renderedContent.replace(/\[([^\]]+)\]\(note\.([^)]+)\)/gi, (_, text, annotation) =>
        `<span class="md-note">${text}<span class="note-tooltip">${annotation}</span></span>`
    );

    renderedContent = renderedContent.replace(/\b([a-zA-Z0-9._%+-]+@gmail\.com)\b/g, (email) => 
        `<a href="mailto:${email}">${email}</a>`
    );

    // Tô đậm thuật ngữ định dạng [#term]
    renderedContent = renderedContent.replace(/\[#(.*?)\]/g, '<span class="key-term">$1</span>');

    // Xuống dòng an toàn
    renderedContent = renderedContent.replace(/&lt;br&gt;|<br>/gi, '<br>');

    // Tô màu trích dẫn dạng [1], [2], ...
    renderedContent = renderedContent.replace(/\[(\d+)\]/g, '<span class="quote">[$1]</span>');
    // renderedContent = renderedContent.replace(/\[([^\]]+)\]/g, '<span class="quote">[$1]</span>');

    const markdownContentElement = document.getElementById('markdown-content');
    markdownContentElement.innerHTML = renderedContent;

    // Gắn sự kiện vào các thẻ <a>
    const a_tags = markdownContentElement.getElementsByTagName('a');
    for (let a of a_tags) {
        const href = a.getAttribute('href');
        if (href) {
            if (href.startsWith('assets') && href.endsWith('.md')) {
                a.setAttribute('href', '#');
                a.setAttribute('onclick', `loadMarkdown('${href}')`);
            } else if (href.startsWith('assets') && href.endsWith('.html')) {
                a.setAttribute('href', '#');
                a.setAttribute('onclick', `loadNotebook('${href}')`);
            } else if (href.includes('youtube.com/watch') || href.includes('youtu.be')) {
                const videoId = extractYouTubeID(href);
                if (videoId) {
                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
                    a.replaceWith(videoContainer);
                }
            } else {
                a.setAttribute('target', '_blank');
            }
        }
    }

    renderMath();
}

// Lấy giá trị từ query string (?file=xxx)
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Load nội dung Markdown
function loadMarkdown(filePath) {
    const excludeLinks = getExcludeLinks();
    const isExcluded = excludeLinks.some(excludedFile => filePath.includes(excludedFile));

    // Nếu đang ở trang notebook.html thì chuyển về index.html
    if (window.location.pathname.includes("notebook.html")) {
        window.location.href = `index.html?file=${encodeURIComponent(filePath)}`;
        return;
    }

    fetch(filePath)
        // .then(response => response.text())
        .then(response => {
            // Kiểm tra mã trạng thái của phản hồi
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.text();
        })
        .then(text => {
            renderMarkdown(text, isExcluded);
            const newUrl = `${window.location.pathname}?file=${encodeURIComponent(filePath)}`;
            window.history.replaceState(null, '', newUrl);
            updateNotebookTitle(filePath);
        })
        .catch(error => console.error('Error loading file:', error));
        const notebookContainer = document.getElementById("markdown-content");
        notebookContainer.innerHTML = `<p>Không thể tải nội dung Markdown. Nội dung đang cập nhật hoặc đường dẫn sai.</p>`;
}

// Khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    const fileParam = getQueryParam('file');
    if (fileParam) {
        loadMarkdown(fileParam);
    }
});

// Notebook
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
