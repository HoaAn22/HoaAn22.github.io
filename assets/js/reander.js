// Hàm để tải và render file Markdown
function renderMarkdown(content) {

    const md = window.markdownit();
    const renderedContent = md.render(content);

    // Thêm nội dung đã render vào phần tử HTML
    const markdownContentElement = document.getElementById('markdown-content');
    markdownContentElement.innerHTML = renderedContent;

    // Sau khi render xong, thay thế các liên kết thành onclick
    const links = markdownContentElement.getElementsByTagName('a');
    for (let link of links) {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.md')) {
            link.setAttribute('href', '#');
            link.setAttribute('onclick', `loadMarkdownFile('${href}')`);
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
