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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Render công thức Toán học
function renderMath() {
    if (window.MathJax) {
        MathJax.Hub.Config({
            TeX: { equationNumbers: { autoNumber: "AMS" } },
            tex2jax: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true
            }
        });
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    } else {
        setTimeout(renderMath, 100);
    }
}

/**
 * Hàm tải file Markdown
 * @param {string} filePath - Đường dẫn file .md
 * @param {boolean} updateHistory - Có đẩy tham số vào URL không
 */
function loadMarkdown(filePath, updateHistory = true) {
    const container = document.getElementById("markdown-content");
    if (!container) return;

    // Cập nhật URL trước khi render để đảm bảo tính đồng bộ
    if (updateHistory) {
        const currentPath = window.location.pathname;
        const newUrl = `${currentPath}?file=${encodeURIComponent(filePath)}`;
        window.history.pushState({ file: filePath }, '', newUrl);
    }

    fetch(filePath)
        .then(res => {
            if (!res.ok) throw new Error(`Không tìm thấy file (Mã lỗi: ${res.status})`);
            return res.text();
        })
        .then(text => {
            const isExcluded = getExcludeLinks().some(ex => filePath.includes(ex));
            renderMarkdown(text, isExcluded);
            
            // Cập nhật tiêu đề tab
            const fileName = filePath.split('/').pop().replace('.md', '').toUpperCase();
            document.title = `${fileName} - An's Blog`;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = `<div style="color:red; padding:20px;">Lỗi: ${err.message}</div>`;
        });
}

function renderMarkdown(content, isExcluded) {
    if (typeof window.markdownit !== 'function') {
        console.error("Thiếu thư viện markdown-it!");
        return;
    }

    const md = window.markdownit({ breaks: false, html: true });
    let html = md.render(content);

    // --- Xử lý Regex Post-processing ---
    if (isExcluded) html = html.replace(/<p>/g, '<p class="nonstandard-p">');
    
    // Auto-link URL
    html = html.replace(/(?<!["'=])(https?:\/\/[^\s<>"']+)/g, url => `<a href="${url}" target="_blank">${url}</a>`);
    
    // Ghi chú tooltip: [text](note.annotation)
    html = html.replace(/\[([^\]]+)\]\(note\.([^)]+)\)/gi, (_, t, a) => 
        `<span class="md-note">${t}<span class="note-tooltip">${a}</span></span>`);

    // Highlight thuật ngữ: [#term]
    html = html.replace(/\[#(.*?)\]/g, '<span class="key-term">$1</span>');
    
    // Email link
    html = html.replace(/\b([a-zA-Z0-9._%+-]+@gmail\.com)\b/g, email => `<a href="mailto:${email}">${email}</a>`);

    // Đẩy vào DOM
    const container = document.getElementById('markdown-content');
    container.innerHTML = html;

    // --- Xử lý Link & YouTube sau khi Render ---
    const links = container.getElementsByTagName('a');
    for (let a of links) {
        const href = a.getAttribute('href');
        if (!href) continue;

        // 1. Link bài viết nội bộ
        if (href.startsWith('assets') && href.endsWith('.md')) {
            a.addEventListener('click', function(e) {
                e.preventDefault(); // CHẶN reload trang tuyệt đối
                loadMarkdown(href, true);
            });
        } 
        // 2. Link YouTube
        else if (href.includes('youtube.com') || href.includes('youtu.be')) {
            const videoId = extractYouTubeID(href);
            if (videoId) {
                const div = document.createElement('div');
                div.className = 'video-container';
                div.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen frameborder="0"></iframe>`;
                a.replaceWith(div);
            }
        } 
        // 3. Link ngoài
        else if (href.startsWith('http')) {
            a.target = '_blank';
        }
    }

    renderMath();
}

// Lắng nghe nút Back/Forward của trình duyệt
window.addEventListener('popstate', (event) => {
    const file = getQueryParam('file');
    if (file) {
        // Load lại file cũ, nhưng KHÔNG đẩy thêm history mới
        loadMarkdown(file, false);
    } else {
        // Nếu URL sạch tham số -> Quay về trang chủ hoàn toàn
        window.location.reload();
        // window.location.href = "https://hoaan22.github.io";

    }
});

// Khi trang vừa tải xong
document.addEventListener('DOMContentLoaded', () => {
    const file = getQueryParam('file');
    if (file) {
        // Load bài viết từ URL (ví dụ do người khác gửi link hoặc nhấn F5)
        loadMarkdown(file, false);
    }
});

// Hàm hỗ trợ để gọi từ Menu HTML (giảm thiểu lỗi dấu #)
window.loadPage = function(path) {
    loadMarkdown(path, true);
};