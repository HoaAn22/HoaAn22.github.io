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
    if (!markdownContentElement) return;

    // // Xử lý ghi chú
    const notePattern = /\[([^\]]+)\]\(note\.([^)]+)\)/gi;
    renderedContent = renderedContent.replace(notePattern, (_, text, annotation) => {
        return `<span class="md-note">${text}<span class="note-tooltip">${annotation}</span></span>`;
    });

    markdownContentElement.innerHTML = renderedContent;

    const a_tags = markdownContentElement.getElementsByTagName('a');
    for (let a of a_tags) {
        const href = a.getAttribute('href');

        if (href) {
            if (href.endsWith('.md')) {
                a.setAttribute('href', '#');
                a.setAttribute('onclick', `loadMarkdownFile('${href}')`);
            }  else if (href.includes('youtube.com') || href.includes('youtu.be')){
                    const videoId = extractYouTubeID(href);
                    if (videoId) {
                        const videoContainer = document.createElement('div');
                        videoContainer.classList.add('video-container');
                        videoContainer.innerHTML = `
                            <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
                        `;
                        a.replaceWith(videoContainer); // Thay thế thẻ <a> bằng iframe
                    }
                }    
            else {
                a.setAttribute('target', '_blank');
            }
        }
    }
    if (window.MathJax) {
        // MathJax.typeset();
        MathJax.typesetPromise();
    }
}

function loadMarkdownFile(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            renderMarkdown(text);
            window.location.hash = encodeURIComponent(filePath); // Cập nhật URL hash

            // Cập nhật <title> thành tiêu đề bài viết từ link <a>
            const links = document.querySelectorAll('a[onclick]');
            let selectedTitle = "";
            let categoryTitle = "";

            for (let link of links) {
                const onclickValue = link.getAttribute('onclick');
                if (onclickValue.includes(filePath)) { 
                    selectedTitle = link.innerText.trim(); 

                    let parent = link.parentElement;
                    while (parent) { 
                        if (parent.classList.contains("dropdown-item")) { // Chỉ lấy tiêu đề từ dropdown-item
                            let parentLink = parent.querySelector('a'); 
                            if (parentLink && parentLink !== link) { 
                                categoryTitle = parentLink.innerText.trim(); 
                            }
                            break;
                        }
                        parent = parent.parentElement;
                    }

                    // Cập nhật tiêu đề đúng format mong muốn
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

// Kiểm tra URL hash khi trang load lại
document.addEventListener('DOMContentLoaded', () => {
    const hash = decodeURIComponent(window.location.hash.substring(1));
    if (hash) {
        loadMarkdownFile(hash);
    }
});
 