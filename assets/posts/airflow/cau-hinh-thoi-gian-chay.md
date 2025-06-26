# Đặt thời gian chạy DAG - Phần 1

[Đọc phần 2](assets/posts/airflow/chuoi-cron.md)

Trong Airflow, tham số `schedule_interval` được sử dụng để định nghĩa thời gian và tần suất chạy của một DAG. Dưới đây là các kiểu định dạng phổ biến mà bạn có thể sử dụng:

---

### 1. **Từ khóa đặc biệt (Preset Keywords)**
Airflow hỗ trợ các từ khóa sẵn có để thiết lập thời gian chạy DAG:

| Từ khóa          | Ý nghĩa                  | Tương đương cron             |
|-------------------|--------------------------|-------------------------------|
| `@once`          | Chạy ngay một lần sau khi được kích hoạt | N/A                           |
| `@hourly`        | Chạy mỗi giờ             | `0 * * * *`                   |
| `@daily`         | Chạy mỗi ngày lúc 12:00 đêm UTC | `0 0 * * *`               |
| `@weekly`        | Chạy mỗi tuần vào Chủ Nhật, lúc 12:00 đêm UTC | `0 0 * * 0`     |
| `@monthly`       | Chạy vào ngày đầu tiên của tháng lúc 12:00 đêm UTC | `0 0 1 * *` |
| `@yearly` / `@annually` | Chạy vào ngày đầu tiên của năm lúc 12:00 đêm UTC | `0 0 1 1 *` |

---

### 2. **Cron Expression**
Dạng cron expression cung cấp sự linh hoạt cao để đặt lịch chạy DAG. Định dạng cơ bản của cron expression:
```
<phút> <giờ> <ngày trong tháng> <tháng> <ngày trong tuần>
```

#### Ví dụ:
| Cron Expression   | Ý nghĩa                                          |
|--------------------|-------------------------------------------------|
| `0 8 * * *`       | Chạy vào 8:00 sáng hàng ngày                    |
| `0 18 * * 1-5`    | Chạy vào 6:00 chiều từ thứ Hai đến thứ Sáu       |
| `0 0 1 * *`       | Chạy vào ngày đầu tiên mỗi tháng, lúc 12:00 đêm |
| `30 23 15 6 *`    | Chạy lúc 11:30 tối, ngày 15 tháng 6 hàng năm     |

---

### 3. **`timedelta` (Python Object)**
Bạn có thể sử dụng `timedelta` từ thư viện `datetime` để thiết lập lịch chạy theo khoảng thời gian cụ thể.

#### Ví dụ:
```python
from datetime import timedelta

dag = DAG(
    'example_dag',
    default_args=default_args,
    schedule_interval=timedelta(hours=6),  # Chạy mỗi 6 giờ
)
```

---

### 4. **Không định nghĩa lịch (`None`)**
Nếu bạn không muốn DAG chạy tự động theo lịch, đặt `schedule_interval=None`. DAG chỉ chạy khi bạn **kích hoạt thủ công**.

#### Ví dụ:
```python
dag = DAG(
    'manual_run_dag',
    default_args=default_args,
    schedule_interval=None,  # Chạy thủ công
)
```

---

### 5. **Các Múi Giờ (Timezone)**
Airflow mặc định sử dụng UTC. Nếu muốn chạy DAG theo múi giờ khác, bạn cần định nghĩa múi giờ bằng cách sử dụng thư viện `pendulum`.

#### Ví dụ:
```python
from pendulum import timezone

local_tz = timezone("Asia/Ho_Chi_Minh")  # Múi giờ Việt Nam

dag = DAG(
    'example_dag',
    default_args=default_args,
    schedule_interval='0 22 * * *',  # 10:00 tối mỗi ngày
    start_date=datetime(2024, 1, 1, tzinfo=local_tz),
)
```

---

### Tổng Kết
Bạn có thể chọn kiểu định dạng phù hợp với nhu cầu của mình:
1. **Từ khóa sẵn có** (nhanh, tiện lợi).
2. **Cron expression** (linh hoạt, chi tiết).
3. **`timedelta`** (đơn giản, dùng khi khoảng thời gian cố định).
4. **Không định nghĩa lịch** (thủ công). 
