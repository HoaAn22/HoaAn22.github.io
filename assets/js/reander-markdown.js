/**
 * STABLE BLOG SCRIPT - Fix lỗi nhấn Back 2 lần
 */

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

function updateNotebookTitle(filePath) {
    const links = document.querySelectorAll('a[onclick]');
    for (let link of links) {
        if (link.getAttribute('onclick')?.includes(filePath)) {
            document.title = `${link.innerText.trim()} - An's blog`;
            break;
        }
    }
}

// 2. CORE: RENDER MARKDOWN
function renderMarkdown(content, isExcluded = false) {
    const md = window.markdownit({ breaks: false, html: true });
    let html = md.render(content);

    // Xử lý các định dạng đặc biệt (Note, Term, Email, Math...)
    if (isExcluded) html = html.replace(/<p>/g, '<p class="nonstandard-p">');
    html = html.replace(/(?<!["'=])(https?:\/\/[^\s<>"']+)/g, (url) => `<a href="${url}" target="_blank">${url}</a>`);
    html = html.replace(/\[([^\]]+)\]\(note\.([^)]+)\)/gi, (_, t, a) => `<span class="md-note">${t}<span class="note-tooltip">${a}</span></span>`);
    html = html.replace(/\[#(.*?)\]/g, '<span class="key-term">$1</span>');
    html = html.replace(/\b([a-zA-Z0-9._%+-]+@gmail\.com)\b/g, (e) => `<a href="mailto:${e}">${e}</a>`);
    html = html.replace(/\[(\d+)\]/g, '<span class="quote">[$1]</span>');

    const container = document.getElementById('markdown-content');
    container.innerHTML = html;

    // Gán sự kiện click cho link nội bộ trong nội dung vừa render
    const a_tags = container.getElementsByTagName('a');
    for (let a of a_tags) {
        const href = a.getAttribute('href');
        if (href && (href.endsWith('.md') || href.endsWith('.html'))) {
            a.addEventListener('click', function(e) {
                e.preventDefault();
                if (href.endsWith('.md')) loadMarkdown(href, true);
                else loadNotebook(href);
            });
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