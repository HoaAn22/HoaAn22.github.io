# Phương pháp MultiOutputRegressor

# **MultiOutputRegressor là gì?**

**MultiOutputRegressor** là một lớp (class) trong thư viện `scikit-learn`, được sử dụng để mở rộng các mô hình hồi quy (regressor) vốn chỉ hỗ trợ **một đầu ra (single-output)** thành các mô hình có thể xử lý **nhiều đầu ra (multi-output)**.

Nó hoạt động bằng cách:

1. **Tạo một bản sao của mô hình gốc cho từng biến mục tiêu đầu ra.**
2. **Huấn luyện từng mô hình trên từng biến đầu ra riêng biệt.**
3. Khi dự đoán, nó sử dụng từng mô hình con để đưa ra dự đoán cho từng biến đầu ra, rồi kết hợp lại thành kết quả tổng thể.

## **Cách thức hoạt động của MultiOutputRegressor**

### **Cấu trúc**

Giả sử bạn có dữ liệu:

- XX: Ma trận đầu vào với nn mẫu và mm đặc trưng (n×mn \times m).
- YY: Ma trận đầu ra với nn mẫu và kk đầu ra (n×kn \times k).

Khi sử dụng `MultiOutputRegressor`:

- Nó tạo ra **kk** mô hình con (bản sao của mô hình bạn chọn).
- Mỗi mô hình con sẽ được huấn luyện để dự đoán một biến đầu ra cụ thể yiy_i dựa trên XX.
- Quá trình dự đoán được thực hiện riêng lẻ trên từng mô hình con và kết quả được kết hợp thành ma trận đầu ra Y^\hat{Y}.

---

### **Ví dụ trực quan**

Giả sử bạn cần dự đoán Y=[y1,y2,y3]Y = [y_1, y_2, y_3] từ XX:

- **Mỗi biến đầu ra (y1,y2,y3y_1, y_2, y_3) được xử lý độc lập**:
    - Mô hình 1 dự đoán y1y_1.
    - Mô hình 2 dự đoán y2y_2.
    - Mô hình 3 dự đoán y3y_3.

Ví dụ mã code:

```python
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import make_regression

# Tạo dữ liệu giả với 3 đầu ra
X, Y = make_regression(n_samples=100, n_features=5, n_targets=3, noise=0.1, random_state=42)

# MultiOutputRegressor với RandomForest
model = MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42))
model.fit(X, Y)  # Huấn luyện mô hình

# Dự đoán
Y_pred = model.predict(X)

print("Dự đoán đầu ra:\n", Y_pred[:5])
```

Kết quả:

- Mỗi cột trong `Y_pred` tương ứng với một biến đầu ra được dự đoán (y^1,y^2,y^3\hat{y}_1, \hat{y}_2, \hat{y}_3).

## **Khi nào nên dùng MultiOutputRegressor?**

### **Ưu điểm**

1. **Khi mô hình gốc chỉ hỗ trợ đầu ra đơn:**
    
    - Các mô hình như **RandomForestRegressor**, **XGBRegressor** không hỗ trợ đa đầu ra tự nhiên.
    - MultiOutputRegressor giúp mở rộng khả năng của những mô hình này.
2. **Khi các đầu ra không phụ thuộc nhau hoặc mối quan hệ giữa chúng yếu:**
    
    - Nếu các biến đầu ra y1,y2,...,yky_1, y_2, ..., y_k độc lập, MultiOutputRegressor là lựa chọn hợp lý vì nó dự đoán riêng lẻ từng đầu ra.
3. **Dễ sử dụng và triển khai nhanh chóng:**
    
    - Không cần tùy chỉnh mô hình phức tạp, bạn chỉ cần "đóng gói" mô hình ban đầu vào MultiOutputRegressor.

### **Nhược điểm**

1. **Không học được mối quan hệ giữa các đầu ra:**
    
    - MultiOutputRegressor giả định các đầu ra là **độc lập**. Nếu các đầu ra có quan hệ chặt chẽ, mô hình này không tận dụng được thông tin đó.
2. **Tốn thời gian và tài nguyên tính toán:**
    
    - Vì mỗi đầu ra yêu cầu huấn luyện một mô hình riêng biệt, thời gian huấn luyện và yêu cầu tài nguyên tăng tỷ lệ thuận với số lượng đầu ra.


### **Khác biệt giữa MultiOutputRegressor và các phương pháp khác**

#### **So với mô hình hồi quy hỗ trợ đa đầu ra tự nhiên**

Một số mô hình như `LinearRegression`, `GradientBoostingRegressor`, hoặc `LightGBM` hỗ trợ đa đầu ra tự nhiên, mà không cần sử dụng MultiOutputRegressor. Sự khác biệt:

- Các mô hình hỗ trợ đa đầu ra tự nhiên học được mối quan hệ giữa các đầu ra (nếu có).
- MultiOutputRegressor không học mối quan hệ giữa các đầu ra, mà chỉ dự đoán từng đầu ra độc lập.

#### **So với RegressorChain**

`RegressorChain` là một phương pháp khác để xử lý đa đầu ra. Nó dự đoán tuần tự từng đầu ra và sử dụng các đầu ra trước đó làm đặc trưng bổ sung để dự đoán các đầu ra tiếp theo:

- **Ưu điểm của RegressorChain**: Có thể học được mối quan hệ giữa các đầu ra.
- **Nhược điểm của RegressorChain**: Phụ thuộc vào thứ tự dự đoán, lỗi lan truyền từ các đầu ra trước đó.

---

### **Tóm tắt**

1. **MultiOutputRegressor** là công cụ giúp các mô hình hồi quy đơn đầu ra (single-output) có thể xử lý bài toán đa đầu ra (multi-output) bằng cách:
    
    - Tạo một mô hình độc lập cho mỗi đầu ra.
    - Huấn luyện và dự đoán từng đầu ra một cách riêng biệt.
2. **Khi nào nên dùng**:
    
    - Khi sử dụng mô hình không hỗ trợ đầu ra đa biến.
    - Khi các đầu ra có thể được coi là độc lập.
3. **Nhược điểm**:
    
    - Không khai thác được mối quan hệ giữa các đầu ra.
    - Tăng chi phí tính toán nếu số lượng đầu ra lớn.


### **Sự khác biệt khi sử dụng MultiOutputRegressor so với một mô hình đầu ra đơn**

Khi sử dụng **MultiOutputRegressor** cho các mô hình như XGBoost hoặc Random Forest trong bài toán hồi quy đa đầu ra, có một số khác biệt quan trọng so với việc xây dựng mô hình chỉ có một đầu ra:

---

### **1. Mục tiêu đầu ra**
- **Một đầu ra**: Mô hình được huấn luyện để dự đoán duy nhất một biến mục tiêu \(y\).
- **MultiOutputRegressor**: Mỗi biến mục tiêu trong \(Y = [y_1, y_2, ..., y_k]\) được xem là một bài toán hồi quy độc lập. MultiOutputRegressor tạo một mô hình riêng biệt cho từng biến đầu ra \(y_i\) và thực hiện huấn luyện riêng cho từng mô hình này.

---

### **2. Cách triển khai**
- **Một đầu ra**: 
  - Trực tiếp xây dựng và huấn luyện một mô hình hồi quy như XGBoost hoặc Random Forest.
  - Ví dụ: \( f(x) = y \), với \(x\) là đầu vào và \(y\) là đầu ra.
  
- **MultiOutputRegressor**:
  - Gói \(k\) mô hình hồi quy thành một pipeline.
  - Mỗi mô hình dự đoán một biến mục tiêu riêng lẻ \(y_i\).
  - Ví dụ: \( f_i(x) = y_i \) với \(i = 1, 2, ..., k\).

---

### **3. Kiến trúc và hiệu suất**
- **Một đầu ra**:
  - Cần huấn luyện một mô hình duy nhất.
  - Tiết kiệm thời gian và tài nguyên hơn nếu chỉ có một biến mục tiêu.

- **MultiOutputRegressor**:
  - Huấn luyện \(k\) mô hình (với \(k\) là số lượng biến đầu ra).
  - Chi phí tính toán cao hơn đáng kể khi số đầu ra tăng.

---

### **4. Phụ thuộc giữa các đầu ra**
- **Một đầu ra**:
  - Mô hình không cần xem xét mối quan hệ giữa các biến mục tiêu vì chỉ có một biến đầu ra duy nhất.
  
- **MultiOutputRegressor**:
  - Các đầu ra được coi là độc lập. 
  - Mô hình không học được mối quan hệ hoặc tương quan giữa các biến đầu ra (nếu tồn tại).

  **Lưu ý**: Nếu các biến đầu ra có tương quan mạnh, phương pháp khác như `MultiOutputClassifier` hoặc `MultiTargetRegressor` với mô hình hỗ trợ đa đầu ra (như LightGBM, XGBoost với tùy chọn multi-output) có thể phù hợp hơn.

---

### **5. Cách đánh giá**
- **Một đầu ra**:
  - Dùng các thước đo lỗi cho bài toán hồi quy đơn, ví dụ: MSE, RMSE, MAE.
  
- **MultiOutputRegressor**:
  - Đánh giá lỗi trên từng biến đầu ra riêng lẻ hoặc trung bình trên toàn bộ biến đầu ra.
  - Ví dụ: tính RMSE hoặc MAE trung bình cho tất cả các biến \(y_1, y_2, ..., y_k\).

---

### **Ví dụ sử dụng MultiOutputRegressor**
```python
from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Tạo dữ liệu giả với 2 đầu ra
X, Y = make_regression(n_samples=1000, n_features=20, n_targets=2, noise=0.1, random_state=42)
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Random Forest với MultiOutputRegressor
rf_model = MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42))
rf_model.fit(X_train, Y_train)
rf_pred = rf_model.predict(X_test)

# XGBoost với MultiOutputRegressor
xgb_model = MultiOutputRegressor(XGBRegressor(n_estimators=100, random_state=42))
xgb_model.fit(X_train, Y_train)
xgb_pred = xgb_model.predict(X_test)

# Đánh giá hiệu quả
rf_mse = mean_squared_error(Y_test, rf_pred, multioutput='raw_values')
xgb_mse = mean_squared_error(Y_test, xgb_pred, multioutput='raw_values')

print("MSE của Random Forest:", rf_mse)
print("MSE của XGBoost:", xgb_mse)
```

---

### **Khi nào nên dùng MultiOutputRegressor**
- Khi bạn muốn sử dụng mô hình không hỗ trợ đầu ra đa biến trực tiếp (như Random Forest hoặc XGBoost mặc định).
- Khi các biến đầu ra có thể được coi là độc lập hoặc không có mối quan hệ phức tạp giữa chúng.

### **1. Khi bạn muốn sử dụng mô hình không hỗ trợ đầu ra đa biến trực tiếp**

- **Vấn đề**: Một số mô hình học máy phổ biến, chẳng hạn như **Random Forest** hoặc **XGBoost**, không hỗ trợ đầu ra đa biến (multi-output) một cách **trực tiếp**. Điều này có nghĩa là các mô hình này chỉ có khả năng dự đoán **một đầu ra tại một thời điểm**.
    
- **Tại sao lại không hỗ trợ trực tiếp?**  
    Kiến trúc của các mô hình như Random Forest và XGBoost được thiết kế để xử lý bài toán đầu ra đơn lẻ. Khi sử dụng chúng mà không có các công cụ hỗ trợ (như `MultiOutputRegressor`):
    
    - Random Forest sẽ chỉ tạo một tập hợp cây để dự đoán duy nhất một giá trị yy.
    - XGBoost xây dựng một bộ tăng cường gradient (gradient boosting) tối ưu hóa duy nhất một hàm lỗi L(y,y^)L(y, \hat{y}), nơi yy chỉ là một biến.
- **Cách giải quyết với MultiOutputRegressor**: `MultiOutputRegressor` giúp "biến tấu" những mô hình đầu ra đơn thành **đa đầu ra** bằng cách:
    
    - Tạo **một bản sao của mô hình gốc** (Random Forest hoặc XGBoost) cho **mỗi biến mục tiêu**.
    - Huấn luyện từng mô hình trên một biến đầu ra riêng lẻ.
    - Khi dự đoán, nó sẽ kết hợp đầu ra của từng mô hình con thành một tập hợp kết quả.
- **Ví dụ trực quan**: Nếu bạn có dữ liệu XX với hai biến mục tiêu Y=[y1,y2]Y = [y_1, y_2]:
    
    - `MultiOutputRegressor` sẽ tạo hai mô hình độc lập:
        - Một mô hình dự đoán y1y_1 dựa trên XX.
        - Một mô hình khác dự đoán y2y_2 dựa trên XX.
    - Kết quả trả về là [y1^,y2^][\hat{y_1}, \hat{y_2}].
- **Tóm lại**:  
    **Random Forest** và **XGBoost** không thể tự mình dự đoán nhiều biến đầu ra. `MultiOutputRegressor` là một công cụ "gói bên ngoài", giúp mở rộng chức năng này bằng cách huấn luyện từng biến đầu ra riêng biệt.

### **2. Khi các biến đầu ra có thể được coi là độc lập hoặc không có mối quan hệ phức tạp giữa chúng**

- **Ý nghĩa**:
    
    - MultiOutputRegressor giả định rằng các biến mục tiêu **không có mối quan hệ phụ thuộc chặt chẽ** với nhau.
    - Vì mỗi mô hình con trong MultiOutputRegressor được huấn luyện riêng lẻ trên từng biến mục tiêu, chúng không "học" được mối liên kết giữa các biến mục tiêu (nếu có).
- **Ví dụ thực tế**: Giả sử bạn dự đoán hai biến mục tiêu:
    
    - y1y_1: Giá cổ phiếu của công ty A.
    - y2y_2: Lượng bán hàng tháng của một sản phẩm.
    - Trong trường hợp này, y1y_1 và y2y_2 có thể **không phụ thuộc** nhau (hoặc phụ thuộc rất yếu), do đó việc dự đoán chúng riêng biệt là hợp lý.
- **Trường hợp không phù hợp**: Nếu y1y_1 và y2y_2 có mối quan hệ chặt chẽ, chẳng hạn như:
    
    - y1y_1: Điểm trung bình của học sinh trong môn Toán.
    - y2y_2: Điểm trung bình của học sinh trong môn Lý.
    - Điểm số Toán và Lý thường có mối liên kết (vì học sinh giỏi Toán có khả năng giỏi Lý).
    - Khi đó, việc dùng `MultiOutputRegressor` không tối ưu, vì nó không khai thác mối liên hệ giữa các biến đầu ra.
- **Cách tiếp cận thay thế nếu biến đầu ra phụ thuộc nhau**:
    
    - **Multi-target learning**: Một số mô hình có thể xử lý đa đầu ra và học được mối quan hệ giữa các đầu ra (như LightGBM, mô hình neural network, hoặc các biến thể của XGBoost với cấu hình hỗ trợ đầu ra đa biến).
    - **Mô hình duy nhất cho tất cả đầu ra**:
        - Bạn có thể chuyển bài toán thành một mô hình đơn với hàm lỗi được tối ưu hóa trên toàn bộ tập hợp đầu ra, thay vì xử lý từng đầu ra riêng biệt.

---

### **Tóm lại**

1. MultiOutputRegressor cần thiết khi bạn dùng các mô hình như Random Forest hoặc XGBoost, vốn không hỗ trợ đầu ra đa biến.
2. MultiOutputRegressor thích hợp khi các đầu ra độc lập hoặc tương tác yếu. Nếu các đầu ra phụ thuộc mạnh, hãy dùng mô hình học đa đầu ra hoặc các kiến trúc khác có khả năng học mối liên kết giữa các biến mục tiêu.