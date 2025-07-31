# Kết nối Ariflow với DataBase trong Docker
## Tạo kết nối với DataBase trong Docker

1. Khởi chạy hệ thống Airflow bằng lệnh `docker compose up -d`

2. Trong giao diện Airflow, tại mục [#Admin] chọn [#Connections], Tạo kết nối mới

3. Điền thông tin DB để kết nối và lưu lại
	* **Connection Id**: là ID để Airflow kết nối đến DataBase
	* **Connection Type**: Loại CSDL cần kết nối
	* **Description**: Mô tả kết nối (tùy chọn)
	* **Host**: Máy chủ chứa CSDL
	* **Schema**: Tên của DataBase
	* **Login**: Tên tài khoản đăng nhập vào DataBase
	* **Password**: Mật khẩu
	* **Port**: Cổng dữ liệu
	
	*Lưu ý*
	- Có hai trường hợp khi điền [#Host]
		1. Cơ sở dữ liệu được đóng gói trực tiếp cùng container với hệ thống Airflow, khi này nhập vào *ID của services (trong ví dụ là macroeconomics-db)*
		![Định nghĩa DB](assets/posts/airflow/images/1-ket-noi-db.png)
		2. Cơ sở dữ liệu được cài đặt trực tiếp trên máy local hoặc được đóng gói bằng docker nhưng mằm riêng, khi này nhập vào câu lệnh `host.docker.internal`
	- [#Port] cũng chia làm 2 thì huống, với mỗi host:
		1. Nếu được đóng gói cùng container, lúc này nhập vào tên của cổng nằm trong container (*tức nghĩa là cổng nằm sau dấu ":", ở đây là 3306*)
		2. Trường hợp còn lại, nhập tên của cổng được ánh xạ localhost (*tức nghĩa là cổng nằm trước dấu ":", ở đây là 3307*)

4. Ví dụ cách điền (phiên bản 3.0.3)
![Định nghĩa DB](assets/posts/airflow/images/4-ket-noi-db.png)

---

## Sử dụng kết nối đã thiết lập