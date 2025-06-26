# Khởi chạy dự án

Các extention hỗ trợ:
Django temple

---

1. Cài đặt python và thư viện Django
    `pip install django`
2. Khởi tạo dự án trong cmd và di chuyển đến dự án.
    ```bash
    django-admin startproject [#myproject]
    cd [#myproject]
    ```
3. Tạo ứng dụng
    `python manage.py startapp [home](note. tên ứng dụng)`
4. Khai báo app đã tạo vào dự án.
    ![khai báo](assets/images/django/1.png)
5. Khởi chạy django bằng lệnh `python manage.py runserver [port](note. cổng truy cập, có thể để trống mặc định là 8000)`
    ![Thông báo](assets/images/django/2.png)
    Sau khi chạy lệnh thông báo xuất hiện như thế này là thành công và có thể bắt đầu xây dựng dự án web.
    ![Thành công](assets/images/django/3.png)

## Tạo view và url

1. Vào views.py trong ([home](note. tên ứng dụng)) → import thư viện và xây dựng hàm của mình
2. Tạo 1 file tên `urls.py` trong [home](note. tên ứng dụng) khai báo đường dẫn và hàm vào file
    ![Cài đặt hàm](assets/images/django/4.png)
3. Vào `urls.py` trong [myproject](note. tên dự án) và khai báo đường dẫn đó vào dự án chính.
    ![Thêm vào dự án chính](assets/images/django/5.png)