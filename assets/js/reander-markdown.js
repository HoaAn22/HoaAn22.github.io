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

// Hàm xử lý văn bản Markdown
function renderMarkdown(content) {
    const md = window.markdownit();
    let renderedContent = md.render(content);

    const markdownContentElement = document.getElementById('markdown-content');
    if (!markdownContentElement) return;

    // Ghi chú tùy chỉnh
    const notePattern = /\[([^\]]+)\]\(note\.([^)]+)\)/gi;
    renderedContent = renderedContent.replace(notePattern, (_, text, annotation) => {
        return `<span class="md-note">${text}<span class="note-tooltip">${annotation}</span></span>`;
    });

    markdownContentElement.innerHTML = renderedContent;

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
            } else if (href.includes('youtube.com/watch')) {
                const videoId = extractYouTubeID(href);
                if (videoId) {
                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    videoContainer.innerHTML = `
                        <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
                    `;
                    a.replaceWith(videoContainer);
                }
            } else {
                a.setAttribute('target', '_blank');
            }
        }
    }

    renderMath();
    
}

// Lấy query string
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Load file Markdown
function loadMarkdown(filePath) {
    // Nếu đang ở trang notebook.html thì chuyển sang index.html trước
    if (window.location.pathname.includes("notebook.html")) {
        window.location.href = `index.html?file=${encodeURIComponent(filePath)}`;
        return;
    }

    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            renderMarkdown(text);

            // Cập nhật URL bằng query string
            const newUrl = `${window.location.pathname}?file=${encodeURIComponent(filePath)}`;
            window.history.replaceState(null, '', newUrl);

            // Cập nhật <title>
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
                    return;
                }
            }
        })
        .catch(error => console.error('Error loading file:', error));
}

// Load khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    const fileParam = getQueryParam('file');
    if (fileParam) {
        loadMarkdown(fileParam);
    }
});