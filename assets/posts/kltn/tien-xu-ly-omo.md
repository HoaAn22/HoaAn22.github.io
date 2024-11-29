### **Tạo cờ (Indicator Flags)**

Cách này sử dụng **các biến cờ (flags)** để báo hiệu rằng dữ liệu ngoại lai (như lãi suất 14 ngày, 3 tháng, 6 tháng) có sẵn tại một thời điểm cụ thể. Khi dữ liệu ngoại lai không liên tục, việc sử dụng cờ sẽ giúp mô hình biết rằng tại thời điểm đó thông tin từ các kỳ hạn này có thể được sử dụng, hoặc ngược lại, chúng không tồn tại.

---

### **1. Ý tưởng cơ bản**

Giả sử bạn có một bảng dữ liệu với các cột như sau:

|Ngày|Lãi suất 7 ngày|Lãi suất 14 ngày|Lãi suất 3 tháng|Lãi suất 6 tháng|
|---|---|---|---|---|
|2023-01-01|2.1|2.5|NaN|NaN|
|2023-01-02|2.2|NaN|NaN|NaN|
|2023-01-03|2.15|2.6|2.8|NaN|

#### **Vấn đề**

- Lãi suất 7 ngày có giá trị liên tục.
- Lãi suất 14 ngày, 3 tháng, 6 tháng xuất hiện ngẫu nhiên (không liên tục).

#### **Giải pháp với cờ**

Thêm một cột **cờ (flag)** tương ứng với mỗi kỳ hạn để chỉ ra thời điểm dữ liệu ngoại lai có sẵn.

|Ngày|Lãi suất 7 ngày|Lãi suất 14 ngày|Cờ 14 ngày|Lãi suất 3 tháng|Cờ 3 tháng|Lãi suất 6 tháng|Cờ 6 tháng|
|---|---|---|---|---|---|---|---|
|2023-01-01|2.1|2.5|1|NaN|0|NaN|0|
|2023-01-02|2.2|NaN|0|NaN|0|NaN|0|
|2023-01-03|2.15|2.6|1|2.8|1|NaN|0|

- **Cờ 14 ngày**: `1` khi dữ liệu lãi suất 14 ngày có sẵn, `0` khi không có.
- **Cờ 3 tháng**: `1` khi dữ liệu lãi suất 3 tháng có sẵn, `0` khi không có.
- **Cờ 6 tháng**: Tương tự.

---

### **2. Lợi ích của việc sử dụng cờ**

1. **Thông báo sự hiện diện của dữ liệu**:  
    Khi dữ liệu ngoại lai không có sẵn, mô hình sẽ biết rằng không nên sử dụng giá trị tại thời điểm đó.
    
2. **Tránh nhiễu từ giá trị điền tạm**:  
    Trong một số phương pháp khác (như nội suy hoặc điền giá trị mặc định), dữ liệu giả có thể làm mô hình hiểu sai. Cờ sẽ giúp phân biệt giữa dữ liệu thực tế và giá trị giả.
    
3. **Đơn giản hóa xử lý dữ liệu**:  
    Không cần nội suy hoặc cố làm dữ liệu ngoại lai liên tục.
    

---

### **3. Cách thêm cờ vào dữ liệu**

#### **Trong Python**

Giả sử bạn có DataFrame `data` với cột `rate_14d`, `rate_3m`, `rate_6m`:

```python
import pandas as pd

# Tạo cờ cho từng kỳ hạn
data['flag_14_day'] = data['rate_14d'].notna().astype(int)
data['flag_3_month'] = data['rate_3m'].notna().astype(int)
data['flag_6_month'] = data['rate_6m'].notna().astype(int)
```

---

### **4. Sử dụng trong mô hình LSTM**

Cờ được coi là **đặc trưng bổ sung** (additional features), đưa vào cùng với dữ liệu chính (lãi suất 7 ngày).

- Input shape cho LSTM sẽ bao gồm **dữ liệu gốc** và **cờ**.
- Ví dụ, nếu dữ liệu có `30 timesteps` và `7 đặc trưng` (lãi suất 7 ngày + các kỳ hạn ngoại lai + các cờ), thì input shape sẽ là `(samples, 30, 7)`.

#### **Xử lý trong Keras**

```python
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Giả sử input shape là (30, 7): 30 bước thời gian, 7 đặc trưng
model = Sequential([
    LSTM(50, activation='relu', input_shape=(30, 7)),  # 50 nơron LSTM
    Dense(1)  # Output là giá trị dự đoán
])

model.compile(optimizer='adam', loss='mse')
```

---

### **5. Một số lưu ý**

- Nếu sử dụng cờ, bạn có thể để trống (NaN) giá trị ngoại lai tại các thời điểm không có dữ liệu, thay vì cố gắng nội suy hoặc điền giá trị.
- Mô hình sẽ học cách **tận dụng thông tin** khi cờ bật và **bỏ qua** khi cờ tắt.
