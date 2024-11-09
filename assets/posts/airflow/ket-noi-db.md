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

## Cách khác để kết nối đến CSDL

Đối với các đã thành thạo với python và sử dụng python trong truy vấn CSDL thì có thể sẽ quen thuộc với các thư viện kết nối và truy vấn CSDL điển hình là `pymysql`, `mysql.connector`, `sqlalchemy`,...

Trong bài này, sẽ giới thiệu 1 ví dụ cơ bản với thư viện `pymysql`, có 2 cách để sử dụng thư viện này kết nối trong airflow:
* Sử dụng các tham số của kết nối được tạo trong giao diện airflow. Ở đây nó sẽ lấy thông tin từ kết nối được thiết lập trong airflow để làm tham số cho kết nối, với ưu điểm dễ dàng đồng bộ chỉ cần đổi kết nối trong giao diện code vẫn chạy được mà không cần chỉnh sửa tham số.
	```python
	# Lấy thông tin connection từ Airflow 
	connection = BaseHook.get_connection("conn") 
	
	# Kết nối đến MySQL 
	conn = pymysql.connect( 
	host=connection.host, 
	user=connection.login, 
	password=connection.password, 
	database=connection.schema, 
	port=connection.port )
	```

* Có thể truyền tham số trực tiếp (trong trường hợp lỗi hoặc khó khăn khi tạo kết nối)
	```python 
	connection = pymysql.connect(
    host="localhost",       # Địa chỉ host
    user="username",        # Tên đăng nhập MySQL
    password="password",    # Mật khẩu MySQL
    database="dbname",      # Tên cơ sở dữ liệu
    port=3306               # Cổng (mặc định là 3306)
	)
	```

Với cách này dễ dàng hơn cho các bạn đã quen với kết nối bằng python, nhưng khi sử dụng cần thực hiện nhiều bước hơn để tương tác với CSDL, sau đây là một số thao tác cơ bản:

Tạo kết nối
```python
cursor = connection.cursor()
```

Truy vấn dữ liệu
```python
cursor.execute("SELECT * FROM your_table") 
results = cursor.fetchall() # Lấy toàn bộ kết quả
```

Thêm dữ liệu vào bảng
```python
sql = "INSERT INTO your_table (column1, column2) VALUES (%s, %s)" 
cursor.execute(sql, ("value1", "value2")) 
connection.commit() # Xác nhận để lưu thay đổi
```

Đóng kết nối
```python
cursor.close() 
connection.close()
```

## Tạo kết nối với DataBase trong local
Làm tương tự với các bước trên, phần điền thông tin cần điều chỉnh vài thông số để kết nối thành công. **Host**: *host.docker.internal*, **Port**: *3306*, *3306* thường là port mặc định của DataBase trong local.

`host.docker.internal` là một hostname được Docker cung cấp để cho phép các container Docker truy cập vào mạng của máy chủ (host) trên đó Docker đang chạy. Khi bạn sử dụng `host.docker.internal` trong một container, nó sẽ ánh xạ đến địa chỉ IP của máy local, giúp các container có thể kết nối trực tiếp tới các dịch vụ đang chạy trên máy chủ ngoài Docker.

**Hạn chế**
- `host.docker.internal` chỉ có sẵn trên Docker dành cho Windows và Mac. Trên Linux, Docker không hỗ trợ hostname này mặc định. 
- Đối với Linux, một giải pháp thay thế là:
  - **Sử dụng địa chỉ IP** của máy host trực tiếp trong cấu hình.
  - Hoặc sử dụng mạng kiểu `host` trong Docker (`--network="host"`), tuy nhiên, kiểu mạng này chỉ nên dùng khi thực sự cần thiết.