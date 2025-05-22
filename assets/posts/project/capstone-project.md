# Giới thiệu: Đồ án tốt nghiệp

**Giới thiệu dự án**

* **Tên đề tài:** Xây dựng hệ thống thu thập thông tin kinh tế vĩ mô, dự đoán tỷ giá FX
* **Mục tiêu & mô tả:** Xây dựng hệ thống tự động thu thập thông tin kinh tế vĩ mô từ các nguồn dữ liệu uy tín, dữ liệu bao gồm (Lãi suất ngân hàng trung ương, lãi suất thị trường mở, lãi suất qua đêm, lãi suất liên ngân hàng, công bố của ngân hàng trung ương [Fed](note. Cục Dự trữ Liên bang)/[PBoc](note. Ngân hàng Nhân dân Trung Quốc)/[SVB](note. Ngân hàng nhà nước Việt Nam), Tỷ giá FX, lạm phát, tỷ lệ thất nghiệp, nguồn vốn đầu tư nước ngoài, % tăng trưởng GDP,...). Xây dựng mô hình học máy dự đoán tỷ giá và phân tích tương quan tác động của các yếu tố đến tỷ giá.

---

**Dữ liệu:**

*Bảng mô tả dữ liệu*

![alt text](assets/images/project/caps-data.png)

**Nguồn dữ liệu:** Yahoo Finance, Google Finance, Federal Reserve Economic Data, World Bank Open Data, Ngân hàng Trung ương,...

Code mẫu thu thập xem tại [NoteBook](assets/notebooks/convert/financial_data_collection.html).

---

**Công cụ kỹ thuật sử dụng:**

* Ngôn ngữ lập trình: python
* Công nghệ: Docker, Airflow
* Cơ sở dữ liệu: MySQL
* Mô hình: Học máy (Random Forest, XGboost), học sâu (LSTM)

---

**Triển khai:**

1. Sau khi chạy thử lấy dữ liệu mẫu bằng notebook thành công , tiến hành xây dựng hệ thống thu thập dữ liệu tự động bằng Airflow và Docker. Airflow cho phép lên lịch để tự động thu thập dữ liệu, dựa trên cài đặt thời gian đã được đặt trong hệ thống. Cho phép thu thập dữ liệu tự động liên tục. Tiến hành lưu trữ dữ liệu bằng MySQL.
2. Docker cho phép đóng gói hệ thống, đảm bảo hệ thống hoạt động tốt trên mọi máy. Ngoài ra, Docker còn cung cấp các Docker Image được build sẵn, giúp dễ dàng triển khai và mở rộng chức năng cho hệ thống.
3. Tiến hành kết nối CSDL đến Notebook để phân tích và xây dựng mô hình học máy, dự đoán tỷ giá.
4. Phân tích độ chính xác của mô hình dựa vào độ đo MSE, RMSE, MAE, $R^{2}$. Phân tích các yêu tố ảnh hưởng đến tỷ giá.

---

**Kết quả & Ứng dụng:**

Hệ thống thu thập dữ liệu được xây dựng bằng Airflow, Python và được triển khai bằng Docker. Thu thập tốt và tự động hóa quy trình. Dữ liệu được tổ chức, lưu trữ bằng DataBase MySQL.

*Các tasks được xây dựng trong hệ thống Airflow*

![alt text](assets/images/project/caps-airflow.png)

*Kết quả thu thập dữ liệu, thành công*

![alt text](assets/images/project/caps-result.png)

Mô hình được sử dụng dự đoán và phân tích là mô hình Random Forest, XGboot (ML)

*Bảng so sánh kết quả độ chính xác*

![alt text](assets/images/project/caps-1.png)

Độ chính xác với sai số thấp và độ đo $R^2$ cao, cho thấy mô hình học tốt và diễn giải được biến thiên dữ liệu.


---

**Hướng phát triển:**

- Mở rộng phân tích cảm xúc thị trường bằng các mô hình học máy/học sâu xử lý ngôn ngữ tự nhiên (NLP). Để phân tích toàn diện thị trường. Yếu tố cảm xúc và tin tức đóng vai trò lớn, ảnh hưởng đến biến động của thị trường. Như các thông tin ở các diễn đàn như Redit, Tw, Các báo về tài chính,...
- Xây dựng giao diện 

---

*Lưu ý: Các notebook được cung cấp trong bài viết, chỉ mang tính chất tham khảo và không phải bản hoàn chỉnh. **Không đại diện cho dự án**.*