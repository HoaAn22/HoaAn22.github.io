# Giới thiệu: Đồ án tốt nghiệp

**Giới thiệu dự án**

* _Tên đề tài:_ Xây dựng hệ thống thu thập thông tin kinh tế vĩ mô, dự đoán tỷ giá FX
* _Mục tiêu & mô tả:_ Xây dựng hệ thống tự động thu thập thông tin kinh tế vĩ mô từ các nguồn dữ liệu uy tín, dữ liệu bao gồm (Lãi suất ngân hàng trung ương, lãi suất thị trường mở, lãi suất qua đêm, lãi suất liên ngân hàng, công bố của ngân hàng trung ương Fed/PBoc/[[SVB](note. Ngân hàng nhà nước Việt Nam)](https://www.sbv.gov.vn/), Tỷ giá FX, lạm phát, tỷ lệ thất nghiệp, nguồn vốn đầu tư nước ngoài, % tăng trưởng GDP,...). Xây dựng mô hình học máy dự đoán tỷ giá và phân tích tương quan tác động của các yếu tố đến tỷ giá.

---

**Dữ liệu:**

_Nguồn dữ liệu:_ Yahoo Finance, Google Finance, Federal Reserve Economic Data, World Bank Open Data, Ngân hàng Trung ương,...

Code mẫu thu thập xem tại [NoteBook](assets/notebooks/convert/financial_data_collection.html)[*](note. Tài liệu này chỉ mang tính chất tham khảo và không phải bản hoàn chỉnh của đồ án tốt nghiệp) này.

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
4. Phân tích độ chính xác của mô hình dựa vào độ đo MSE, RMSE, MAE, \\(R^{2} \\). Phân tích các yêu tố nào ảnh hưởng đến tỷ giá và giải thích - *Dựa trên tình hình thực tế*.

---

**Kết quả & Ứng dụng:**

---

**Hướng phát triển:**