# Đặt thời gian chạy DAG - Phần 2

[Đọc phần 1](assets/posts/airflow/cau-hinh-thoi-gian-chay.md)

## Tìm hiểu sâu về chuỗi cron

**Chuỗi cron** (cron expression) là một chuỗi ký tự được sử dụng để chỉ định lịch trình thực hiện các tác vụ định kỳ trong các hệ thống lập lịch, chẳng hạn như trong cron của hệ điều hành Unix/Linux hoặc các hệ thống khác như Quartz Scheduler trong Java. 

### 1. **Cấu trúc của chuỗi cron**  
Chuỗi cron thường gồm **5 hoặc 6 trường** (tùy hệ thống), mỗi trường biểu thị một phần của thời gian:  

| Trường  | Ý nghĩa               | Giá trị hợp lệ            |
|---------|-----------------------|---------------------------|
| **1**   | Phút (Minutes)        | `0-59`                    |
| **2**   | Giờ (Hours)           | `0-23`                    |
| **3**   | Ngày trong tháng (Day of Month) | `1-31`                    |
| **4**   | Tháng (Month)         | `1-12` hoặc `JAN-DEC`     |
| **5**   | Ngày trong tuần (Day of Week)  | `0-7` hoặc `SUN-SAT` (0 và 7 đều là Chủ nhật) |
| *(6)*   | Giây (Seconds)        | `0-59` *(tùy chọn, chỉ có trong một số hệ thống)* |

### 2. **Ví dụ về chuỗi cron**
- **`0 0 * * *`**  
  - Chạy vào **0:00** hàng ngày (nửa đêm).  

- **`*/15 * * * *`**  
  - Chạy mỗi **15 phút một lần** (vào phút 0, 15, 30, 45).

- **`0 12 * * MON-FRI`**  
  - Chạy vào **12:00 trưa từ thứ Hai đến thứ Sáu**.

- **`0 9 1 * *`**  
  - Chạy vào **9:00 sáng ngày 1 mỗi tháng**.

- **`0 0 1 1 *`**  
  - Chạy vào **nửa đêm ngày 1 tháng 1 hàng năm**.

### 3. **Ký hiệu đặc biệt trong cron**  
- `*` : Mọi giá trị có thể (ví dụ: mỗi phút, mỗi giờ).
- `,` : Liệt kê các giá trị cụ thể (ví dụ: `0,15,30` là phút 0, 15, và 30).
- `-` : Khoảng giá trị (ví dụ: `9-17` là từ 9h đến 17h).
- `/` : Bước nhảy (ví dụ: `*/10` là mỗi 10 đơn vị).
- `?` : Không chỉ định giá trị (chỉ dùng trong trường ngày hoặc ngày trong tuần).
- `L` : Giá trị cuối cùng (ví dụ: `L` trong ngày là ngày cuối tháng).
- `#` : Ngày cụ thể trong tuần (ví dụ: `2#3` là thứ Ba của tuần thứ ba).

### 4. **Ứng dụng của chuỗi cron**  
- Tự động hóa sao lưu dữ liệu.
- Chạy các tác vụ bảo trì hệ thống.
- Gửi email hoặc thông báo định kỳ.
- Thực hiện các công việc lặp lại (tải báo cáo, xóa dữ liệu cũ,...).

## Tài liệu tham khảo

[1] Apache Airflow, “Scheduling & Triggers — Airflow Documentation,” Apache.org, 2016. https://airflow.apache.org/docs/apache-airflow/1.10.1/scheduler.html (accessed Nov. 15, 2024).
‌