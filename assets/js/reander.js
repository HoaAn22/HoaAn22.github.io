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

// Hàm để tải file Markdown khi nhấp vào liên kết
// function loadMarkdownFile(filePath) {
//     fetch(filePath)
//         .then(response => response.text())
//         .then(text => {
//             renderMarkdown(text);
//             window.location.hash = encodeURIComponent(filePath); // Cập nhật URL hash

//             // Cập nhật <title> thành tiêu đề bài viết từ link <a>
//             const links = document.querySelectorAll('a[onclick]'); // Lấy tất cả thẻ <a> có thuộc tính [onclick]
//             for (let link of links) { // duyệt tất cả thẻ <a> tìm được
//                 const onclickValue = link.getAttribute('onclick'); //getAttribute lấy nội dung của thuộc tính [onclick]
//                 if (onclickValue.includes(filePath)) { // Nếu nội dung thuộc tính chứa 'filePath'
//                     document.title = `${link.innerText} - An's blog`; // Đổi tên title
//                     break; //Kết thúc nếu đổi tên thành công
//                 }
//             }
//         })
//         .catch(error => console.error('Error loading file:', error));
// }

// function loadMarkdownFile(filePath) {
//     fetch(filePath)
//         .then(response => response.text())
//         .then(text => {
//             renderMarkdown(text);
//             window.location.hash = encodeURIComponent(filePath); // Cập nhật URL hash

//             // Cập nhật <title> thành tiêu đề bài viết từ link <a>
//             const links = document.querySelectorAll('a[onclick]'); // Lấy tất cả thẻ <a> có thuộc tính [onclick]
//             let selectedTitle = "";
            
//             for (let link of links) { // Duyệt tất cả thẻ <a> tìm được
//                 const onclickValue = link.getAttribute('onclick'); // Lấy nội dung của thuộc tính [onclick]
//                 if (onclickValue.includes(filePath)) { // Nếu nội dung thuộc tính chứa 'filePath'
//                     selectedTitle = link.innerText.trim(); // Lưu lại tiêu đề từ thẻ <a>
                    
//                     let parent = link.parentElement.parentElement; // Lấy thẻ cha của nó
//                     while (parent) { // Duyệt lên trên để tìm thẻ <a> khác trong thẻ cha
//                         let parentLink = parent.querySelector('a'); // Tìm thẻ <a> trong thẻ cha
//                         if (parentLink && parentLink !== link) { // Nếu tìm thấy và không phải chính nó
//                             document.title = `[${parentLink.innerText.trim()}] - ${selectedTitle} - An's blog`;
//                             return;
//                         }
//                         parent = parent.parentElement; // Tiếp tục tìm kiếm ở cấp cha tiếp theo
//                     }
                    
//                     document.title = `${selectedTitle} - An's blog`; // Nếu không tìm thấy thẻ <a> cha thì dùng tiêu đề gốc
//                     return;
//                 }
//             }
//         })
//         .catch(error => console.error('Error loading file:', error));
// }

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

// // Lưu đường dẫn notebook vào localStorage và chuyển hướng
// function loadNotebook(notebookPath) {
//     localStorage.setItem("selectedNotebook", notebookPath);
//     window.location.href = "notebook.html"; // Điều hướng đến trang hiển thị notebook
// }

// // Khi vào notebook.html, load nội dung notebook
// document.addEventListener("DOMContentLoaded", function () {
//     let notebookPath = localStorage.getItem("selectedNotebook");
//     if (notebookPath) {
//         fetch(notebookPath)
//             .then(response => response.text())
//             .then(html => {
//                 // Tạo một thẻ div tạm để xử lý nội dung HTML
//                 let tempDiv = document.createElement("div");
//                 tempDiv.innerHTML = html;

//                 // Xóa tất cả các thẻ <script> và <style>
//                 tempDiv.querySelectorAll("script, style, link[rel='stylesheet']").forEach(el => el.remove());

//                 // Lấy nội dung sạch và hiển thị lên trang
//                 document.getElementById("notebook-content").innerHTML = tempDiv.innerHTML;
//             })
//             .catch(error => {
//                 document.getElementById("notebook-content").innerHTML = "Không thể tải notebook.";
//                 console.error("Lỗi tải notebook:", error);
//             });
//     }
// });
