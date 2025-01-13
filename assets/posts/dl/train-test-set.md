# Từng bước chi tiết để xây dựng tập train/test cho mô hình học sâu

## Bước 1: Làm sạch và tiền xử lý dữ liệu
Bạn có thể xem chi tiết tại bài viết này

## Bước 2: Phân tích đặc tính và mối quan hệ của bộ dữ liệu
Vai trò của bước này vô cùng quan trọng vì các lý do sau:
* Xác định được các **features (đặc trưng)** nào ảnh hưởng đến đầu ra, lựa cho cho phù hợp với yêu cầu bài toán
* Biết được đặc tính của dữ liệu như: số lượng dòng/cột, kiểu dữ liệu, phân bố của dữ liệu từ đó phân chia bộ dữ liệu theo tỷ lệ phù hợp

Code:

## Bước 3: Chuẩn hóa dữ liệu
Việc chuẩn hóa dữ liệu về 1 khoảng giá trị nhất định là cần thiết với học sâu, 