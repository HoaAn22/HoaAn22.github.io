// Khởi tạo Markdown-it
var md = window.markdownit();

// Tùy chỉnh bộ render cho thẻ `a` để thêm thuộc tính `onclick`
var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var href = tokens[idx].attrGet('href');

    // Kiểm tra nếu là liên kết nội bộ thì thêm thuộc tính `onclick`
    if (href && href.startsWith('#')) {
        tokens[idx].attrPush(['onclick', `loadMarkdownFile('${href.replace('#', '')}')`]);
        tokens[idx].attrSet('href', '#');
    }

    // Sử dụng bộ render mặc định để xử lý thẻ
    return defaultRender(tokens, idx, options, env, self);
};

// Hàm load file Markdown từ bên ngoài
function loadMarkdownFile(filePath) {
    // Sử dụng Fetch API để lấy nội dung file Markdown
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            // Render nội dung Markdown thành HTML
            document.getElementById('markdown-content').innerHTML = md.render(data);

            // Gọi MathJax để render các công thức toán
            MathJax.typeset();
        })
        .catch(error => {
            console.error('Error loading the markdown file:', error);
            document.getElementById('markdown-content').innerText = 'Error loading content.';
        });
}
