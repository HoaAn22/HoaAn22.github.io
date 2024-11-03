# Kết nối Ariflow với DataBase trong Docker
## Tạo kết nối với DataBase trong Docker
1. Định nghĩa 1 DataBase trong docker-compose 
	![Định nghĩa DB](assets/images/airflow/dinh-nghia-db.png)
2. Khởi chạy hệ thống Airflow
3. Trong giao diện Airflow, tại mục **Admin** chọn  **Connections**
	![Tạo kết nối 1](assets/images/airflow/tao-ket-noi-1.png)
4. Tạo kết nối mới
	![Tạo kết nối 1](assets/images/airflow/tao-ket-noi-2.png)
5. Điền thông tin DB để kết nối
	* **Connection Id**: là ID để Airflow kết nối đến DataBase
	* **Connection Type**: Tên CSDL cần kết nối
	* **Description**: Mô tả kết nối (tùy chọn)
	* **Host**: Máy chủ chứa CSDL
	* **Schema**: Tên của DataBase
	* **Login**: Tên tài khoản đăng nhập vào DataBase
	* **Password**: Mật khẩu
	* **Port**: Cổng dữ liệu
		**(\*) Lưu ý**: **Host** là ID của services CSDL (*db*), **Port** được định nghĩa trong ví dụ là *3307:3306*, *3307* là cổng để bên ngoài ánh xạ đến DataBase, do Airflow được định nghĩa và được đóng gói cùng DataBase trong Docker nên phải dùng *port:3306*.
	![Tạo kết nối 1](assets/images/airflow/tao-ket-noi-3.png)