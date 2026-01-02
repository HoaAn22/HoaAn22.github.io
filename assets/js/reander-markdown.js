// 1. CÁC HÀM CẤU HÌNH
function getExcludeLinks() {
    return ['cv.md', 'portfolio.md', 'hoa-hoc/', 'second-bachelors-degree/', 'self-development-plan.md', 'todo-list.md'];
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function loadNotebook(path) {
    window.location.href = `notebook.html?file=${encodeURIComponent(path)}`;
}

function renderMath() {
    if (window.MathJax) {
        MathJax.Hub.Config({
            TeX: { equationNumbers: { autoNumber: "AMS" } },
            tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$']] }
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

// 2. CORE: RENDER MARKDOWN
function renderMarkdown(content, isExcluded = false) {
    const md = window.markdownit({ breaks: false, html: true });
    let renderedContent = md.render(content);

    if (isExcluded) {
        renderedContent = renderedContent.replace(/<p>/g, '<p class="nonstandard-p">');
    }

    // [TÍNH NĂNG GỐC] Tự động gán link cho URL
    renderedContent = renderedContent.replace(/(?<!["'=])(https?:\/\/[^\s<>"']+)/g, (url) => `<a href="${url}" target="_blank">${url}</a>`);

    // [TÍNH NĂNG GỐC] Ghi chú đặc biệt [text](note.annotation)
    renderedContent = renderedContent.replace(/\[([^\]]+)\]\(note\.([^)]+)\)/gi, (_, text, annotation) =>
        `<span class="md-note">${text}<span class="note-tooltip">${annotation}</span></span>`
    );

    // [TÍNH NĂNG GỐC] Email tự động
    renderedContent = renderedContent.replace(/\b([a-zA-Z0-9._%+-]+@gmail\.com)\b/g, (email) => 
        `<a href="mailto:${email}">${email}</a>`
    );

    // [TÍNH NĂNG GỐC] Tô đậm thuật ngữ [#term]
    renderedContent = renderedContent.replace(/\[#(.*?)\]/g, '<span class="key-term">$1</span>');

    // [TÍNH NĂNG GỐC] Xuống dòng an toàn
    renderedContent = renderedContent.replace(/&lt;br&gt;|<br>/gi, '<br>');

    // [TÍNH NĂNG GỐC] Tô màu trích dẫn [1]
    renderedContent = renderedContent.replace(/\[(\d+)\]/g, '<span class="quote">[$1]</span>');

    const container = document.getElementById('markdown-content');
    container.innerHTML = renderedContent;

    // [TÍNH NĂNG GỐC] Xử lý link và YouTube bên trong nội dung
    const a_tags = container.getElementsByTagName('a');
    for (let a of a_tags) {
        const href = a.getAttribute('href');
        if (href) {
            if (href.startsWith('assets') && href.endsWith('.md')) {
                a.setAttribute('href', '#');
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    loadMarkdown(href, true);
                });
            } else if (href.startsWith('assets') && href.endsWith('.html')) {
                a.setAttribute('href', '#');
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                    loadNotebook(href);
                });
            } else if (href.includes('youtube.com/watch') || href.includes('youtu.be')) {
                const videoId = extractYouTubeID(href);
                if (videoId) {
                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen frameborder="0"></iframe>`;
                    a.replaceWith(videoContainer);
                }
            } else {
                a.setAttribute('target', '_blank');
            }
        }
    }
    renderMath();
}

// 3. CORE LOGIC: TẢI FILE & HISTORY (QUAN TRỌNG NHẤT)
/**
 * @param {string} filePath - Đường dẫn file
 * @param {boolean} updateHistory - Nếu true dùng pushState, nếu false không đẩy history
 */
function loadMarkdown(filePath, updateHistory = true) {
    const isExcluded = getExcludeLinks().some(ex => filePath.includes(ex));

    if (window.location.pathname.includes("notebook.html")) {
        window.location.href = `index.html?file=${encodeURIComponent(filePath)}`;
        return;
    }

    fetch(filePath)
        .then(res => {
            if (!res.ok) throw new Error(res.status);
            return res.text();
        })
        .then(text => {
            renderMarkdown(text, isExcluded);
            
            // XỬ LÝ LỊCH SỬ CHUẨN
            if (updateHistory) {
                const newUrl = `${window.location.pathname}?file=${encodeURIComponent(filePath)}`;
                // Kiểm tra xem URL mới có khác URL hiện tại không để tránh đẩy trùng
                if (window.location.search !== `?file=${encodeURIComponent(filePath)}`) {
                    window.history.pushState({ file: filePath }, '', newUrl);
                }
            }
            updateNotebookTitle(filePath);
        })
        .catch(err => {
            console.error(err);
            document.getElementById("markdown-content").innerHTML = `<p>Lỗi tải nội dung.</p>`;
        });
}

// 4. EVENT DELEGATION: CHẶN DẤU # TRÊN TOÀN TRANG
document.addEventListener('click', function (e) {
    const anchor = e.target.closest('a');
    if (anchor) {
        const onclickAttr = anchor.getAttribute('onclick');
        // Nếu link có gọi hàm điều hướng của chúng ta
        if (onclickAttr && (onclickAttr.includes('loadMarkdown') || onclickAttr.includes('loadNotebook'))) {
            e.preventDefault(); // CHẶN reload/nhảy trang
            // Không dùng eval trực tiếp để bảo mật, trích xuất tham số và gọi hàm
            const match = onclickAttr.match(/'([^']+)'/);
            if (match) {
                if (onclickAttr.includes('loadMarkdown')) loadMarkdown(match[1], true);
                else if (onclickAttr.includes('loadNotebook')) loadNotebook(match[1]);
            }
        }
    }
});

// 5. ĐIỀU HƯỚNG BẰNG NÚT BACK/FORWARD
window.addEventListener('popstate', (event) => {
    const fileParam = getQueryParam('file');
    if (fileParam) {
        // Rất quan trọng: updateHistory = false để không tạo vòng lặp
        loadMarkdown(fileParam, false);
    } else {
        // Quay về trạng thái ban đầu khi không còn tham số
        window.location.reload();
    }
});

// 6. KHỞI TẠO KHI LOAD TRANG
document.addEventListener('DOMContentLoaded', () => {
    const fileParam = getQueryParam('file');
    if (fileParam) {
        // Lần đầu load trang, đã có URL đúng -> updateHistory = false
        loadMarkdown(fileParam, false);
    }
});