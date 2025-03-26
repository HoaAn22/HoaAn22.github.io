// Lưu đường dẫn notebook vào localStorage và chuyển hướng
function loadNotebook(notebookPath) {
    localStorage.setItem("selectedNotebook", notebookPath);
    window.location.href = "notebook.html";  // Điều hướng sang trang notebook.html
}

// Khi vào notebook.html, load nội dung notebook
document.addEventListener("DOMContentLoaded", function () {
    let notebookPath = localStorage.getItem("selectedNotebook");
    if (notebookPath) {
        fetch(notebookPath)
            .then(response => response.text())
            .then(html => {
                document.getElementById("notebook-content").innerHTML = html;
            })
            .catch(error => {
                document.getElementById("notebook-content").innerHTML = "Không thể tải notebook.";
                console.error("Lỗi tải notebook:", error);
            });
    }
});

// // Lưu đường dẫn notebook vào hash và chuyển hướng
// function loadNotebook(notebookPath) {
//     window.location.hash = notebookPath;  // Lưu đường dẫn vào hash
//     window.location.href = "notebook.html";  // Điều hướng sang trang notebook.html
// }

// // Khi vào notebook.html, load nội dung notebook
// document.addEventListener("DOMContentLoaded", function () {
//     let notebookPath = window.location.hash.substring(1);  // Lấy giá trị từ hash và loại bỏ ký tự '#'
//     if (notebookPath) {
//         fetch(notebookPath)
//             .then(response => response.text())
//             .then(html => {
//                 document.getElementById("notebook-content").innerHTML = html;
//             })
//             .catch(error => {
//                 document.getElementById("notebook-content").innerHTML = "Không thể tải notebook.";
//                 console.error("Lỗi tải notebook:", error);
//             });
//     }
// });


// // Lưu đường dẫn notebook vào URL hash và chuyển hướng
// function loadNotebook(notebookPath) {
//     // Mã hóa đường dẫn để an toàn trong URL hash
//     window.location.hash = encodeURIComponent(notebookPath);
//     window.location.href = "notebook.html";  // Điều hướng sang trang notebook.html
// }

// // Khi vào notebook.html, load nội dung notebook từ hash
// document.addEventListener("DOMContentLoaded", function () {
//     // Lấy đường dẫn notebook từ URL hash
//     let notebookPath = window.location.hash.substring(1);
    
//     if (notebookPath) {
//         // Giải mã đường dẫn
//         notebookPath = decodeURIComponent(notebookPath);
        
//         fetch(notebookPath)
//             .then(response => {
//                 // Kiểm tra xem response có hợp lệ không
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.text();
//             })
//             .then(html => {
//                 document.getElementById("notebook-content").innerHTML = html;
//             })
//             .catch(error => {
//                 document.getElementById("notebook-content").innerHTML = "Không thể tải notebook.";
//                 console.error("Lỗi tải notebook:", error);
//             });
//     }
// });

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

