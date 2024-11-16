// Hàm để tải và render file Markdown
function renderMarkdown(content) {
    const md = window.markdownit();
    const renderedContent = md.render(content);

    // Thêm nội dung đã render vào phần tử HTML
    const markdownContentElement = document.getElementById('markdown-content');
    markdownContentElement.innerHTML = renderedContent;

    // Sau khi render xong, thay thế các liên kết thành onclick
    const a_tags = markdownContentElement.getElementsByTagName('a');
    for (let a of a_tags) {
        const href = a.getAttribute('href');
        if (href && href.endsWith('.md')) {
            a.setAttribute('href', '#');
            a.setAttribute('onclick', `loadMarkdownFile('${href}')`);
        } else {
            a.setAttribute('target', '_blank');
        }
    }

    MathJax.typeset();
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