# Cài đặt Chronium Cho Windows
Trong quá trình thu thập dữ liệu, bạn có thể gặp phải các trang web với nội dung được tải động - nghĩa là dữ liệu sẽ được tải lên bằng code (thường là js) trong quá trình tải trang. Lúc này sẽ có 2 cách để crawl dữ liệu mà mình thường sử dụng là `requests_html` và `selenium`.

Với `requests_html` dễ sử dụng, nhưng trong quá trình crawl cần có nhân `chronium` trong máy để khởi chạy trang web. Khi chưa có `chronium`nó sẽ tiến hành cài đặt nhưng trong Windows  nó đang bị gặp lỗi, bài viết này sẽ hướng dẫn cách để cài đặt `chronium`.

1. Cài đặt thư viện `pyppeteer` - `pip install pyppeteer`
2. Hãy truy cập vào trang web chứa mã nguồn `Chronium` của Windows [tại đây](https://storage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Win_x64/) và xem phiên bản khả dụng và chọn phiên bản bạn muốn cài đặt.
3. Vào thư mục `User` chọn xem thư mục ẩn và vào `~\AppData\Local\Programs\Python\Python312\Lib\site-packages\pyppeteer`.
4. Chọn vào tệp `chromium_downloader.py` thêm code `REVISION=Phiên bản muốn cài đặt` 
![Cài đặt Chronium](assets/images/thu-thap-du-lieu/cai-dat-chronium.png)

Sau khi cài đặt xong, Chronium sẽ nằm trong thư mục `~/AppData/Local/pyppeteer/pyppeteer/local-chromium/1122110)`