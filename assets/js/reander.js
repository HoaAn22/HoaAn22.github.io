// Hàm trích xuất ID video từ URL YouTube
function extractYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Hàm để tải và render file Markdown
function renderMarkdown(content) {
    const md = window.markdownit();
    let renderedContent = md.render(content);

    // Thêm nội dung đã render vào phần tử HTML
    const markdownContentElement = document.getElementById('markdown-content');
    
    // Xử lý ghi chú
    // const notePattern = /\[([^\]]+)\]\(note\.([^)]+)\)/g;
    const notePattern = /\[(.+?)\]\(note\.([^)]+)\)/g;

    renderedContent = renderedContent.replace(notePattern, function(match, text, annotation) {
        return `<span class="md-note">${text}<span class="note-tooltip">${annotation}</span></span>`;
    });

    markdownContentElement.innerHTML = renderedContent;

    // Sau khi render xong, thay thế các liên kết thành onclick hoặc iframe nếu là YouTube
    const a_tags = markdownContentElement.getElementsByTagName('a');
    for (let a of a_tags) {
        const href = a.getAttribute('href');

        if (href) {
            if (href.endsWith('.md')) {
                // Xử lý file Markdown (tải nội dung thay vì chuyển trang)
                a.setAttribute('href', '#');
                a.setAttribute('onclick', `loadMarkdownFile('${href}')`);
            } else if (href.includes('youtube.com') || href.includes('youtu.be')) {
                // Chuyển đổi URL YouTube thành iframe
                const videoId = extractYouTubeID(href);
                if (videoId) {
                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    videoContainer.innerHTML = `
                        <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
                    `;
                    a.replaceWith(videoContainer); // Thay thế thẻ <a> bằng iframe
                }
            } else {
                // Mở các liên kết bình thường trong tab mới
                a.setAttribute('target', '_blank');
            }
        }
    }

    if (window.MathJax) {
        MathJax.typeset();
    }
}

// Hàm để tải file Markdown khi nhấp vào liên kết
function loadMarkdownFile(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            renderMarkdown(text);
        })
        .catch(error => console.error('Error loading file:', error));
}