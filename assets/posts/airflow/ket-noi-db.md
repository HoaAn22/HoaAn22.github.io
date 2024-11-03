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
	* **Connection Type**: Loại CSDL cần kết nối
	* **Description**: Mô tả kết nối (tùy chọn)
	* **Host**: Máy chủ chứa CSDL
	* **Schema**: Tên của DataBase
	* **Login**: Tên tài khoản đăng nhập vào DataBase
	* **Password**: Mật khẩu
	* **Port**: Cổng dữ liệu
	
		**(\*) Lưu ý**: **Host** là ID của services CSDL (*db*), **Port** được định nghĩa trong ví dụ là *3307:3306*, *3307* là cổng để bên ngoài ánh xạ đến DataBase, do Airflow được định nghĩa và được đóng gói cùng DataBase trong Docker nên phải dùng *port:3306*.
	![Tạo kết nối 1](assets/images/airflow/tao-ket-noi-3.png)

## Tạo kết nối với DataBase trong local
Làm tương tự với các bước trên, phần điền thông tin cần điều chỉnh vài thông số để kết nối thành công. **Host**: *host.docker.internal*, **Port**: *3306*, *3306* thường là port mặc định của DataBase trong local.

`host.docker.internal` là một hostname được Docker cung cấp để cho phép các container Docker truy cập vào mạng của máy chủ (host) trên đó Docker đang chạy. Khi bạn sử dụng `host.docker.internal` trong một container, nó sẽ ánh xạ đến địa chỉ IP của máy local, giúp các container có thể kết nối trực tiếp tới các dịch vụ đang chạy trên máy chủ ngoài Docker.

**Hạn chế**
- `host.docker.internal` chỉ có sẵn trên Docker dành cho Windows và Mac. Trên Linux, Docker không hỗ trợ hostname này mặc định. 
- Đối với Linux, một giải pháp thay thế là:
  - **Sử dụng địa chỉ IP** của máy host trực tiếp trong cấu hình.
  - Hoặc sử dụng mạng kiểu `host` trong Docker (`--network="host"`), tuy nhiên, kiểu mạng này chỉ nên dùng khi thực sự cần thiết.