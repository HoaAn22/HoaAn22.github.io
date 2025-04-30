# Khởi chạy dự án

Các extention hỗ trợ:
Django temple

---

1. Cài đặt python và thư viện Django
    `pip install django`
2. Khởi tạo dự án trong cmd và di chuyển đến dự án.
    ```bash
    django-admin startproject [myproject](note. Tên dự án)
    cd [myproject](note. Tên dự án)
    ```
3. Tạo ứng dụng
    `python manage.py startapp [myapp](note. Tên ứng dụng)`
4. Khai báo app đã tạo vào dự án.
    ![khai báo](assets/images/django/1.png)
5. Khởi chạy django bằng lệnh `python manage.py runserver [Cổng](note. có thẻ để trống mặc định là 8000)`
    ![alt text](assets\posts\django\image-1.png)
    Sau khi chạy lệnh thông báo xuất hiện như thế này là thành công và có thể bắt đầu xây dựng dự án web.

## Tạo view và url

