// Khởi tạo Markdown-it
var md = window.markdownit();

// Tùy chỉnh bộ render cho thẻ `a` để thêm thuộc tính `onclick`
var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var href = tokens[idx].attrGet('href');

    if (href && href.endsWith('.md')) {
        tokens[idx].attrSet('href', '#');  
        tokens[idx].attrPush(['onclick', `loadMarkdownFile('${href}')`]);
        console.log('tokens[idx]: ', tokens[idx]);
    }

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
    }