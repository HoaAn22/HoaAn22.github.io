# Thư viện
```python
import pandas as pd
import numpy as np
import chardet # Thư viện xử lý mã hóa
import os # Thư viện hỗ trợ đường dẫn

```
# Đọc và xử lý file csv: Đối với file mã hóa bất thường
```python
file_path = '../../Data/pboc_omo_interest_rate.csv'
```

```python
# Đọc một phần của tệp để xác định mã hóa
def detect_encoding(file_path):
    with open(file_path, 'rb') as f:
        result = chardet.detect(f.read(10000000))  # Số dòng dữ liệu đọc
    return result['encoding']

# Xác định mã hóa của tệp
encoding = detect_encoding(file_path)
print(f"Detected encoding: {encoding}")

# Đọc tệp CSV với pandas sử dụng mã hóa đã xác định
df = pd.read_csv(file_path, encoding=encoding)
# df.to_csv('../../Data/uf8.csv', index=False, encoding="utf-8")
df.head()

```

```python

```

```python
def detect_encoding(file_path):
    with open(file_path, 'rb') as f:
        result = chardet.detect(f.read(100000))  # Số dòng dữ liệu đọc
    return result['encoding']

# Đường dẫn tới tệp CSV
file_path = "../../Data/backup.sql"

# Xác định mã hóa của tệp
encoding = detect_encoding(file_path)
print(f"Detected encoding: {encoding}")
```

```python
df = pd.read_csv(file_path)
df.head()

```
# Định dạng lại kiểu ngày## Xử lý kiểu dữ liệu DateTime(kiểu dữ kiệu có giờ)
```python
# Chuyển đổi cột Date về dạng datetime với múi giờ UTC
df['Date'] = pd.to_datetime(df['Date'], utc=True)

# Chỉ lấy phần ngày của cột Date
df['Date'] = df['Date'].dt.date

# Hiển thị DataFrame
df.head()
```
## Hàm to_datetime, định dạng kiểu ngày
```python
# Định dạng lại cột 'Date'
"""
%d-%b-%Y: Ngày-Tên Tháng-Năm
%Y-%m-%d: Năm-Tháng-Ngày
"""
df['date'] = pd.to_datetime(df['date'], format='mixed').dt.strftime('%Y-%m-%d') # format='%b %d, %Y'
df.head()

```
# Thêm xóa các cột hàng trong DataFrame## Thêm 1 cột để làm khóa ngoại
```python
# Thêm cột 'CountryID' với giá trị 1 cho tất cả các hàng
# df['CountryID'] = 1

df['BaseCurrencyID'] = 2
df['QuoteCurrencyID'] = 3
df.head()

```

```python
cols = list(df.columns)

# Specify the columns to reorder
cols_to_front = ['title', 'summary', 'decision', 'date', 'url', 'CountryID']

# Reorder the columns: remove them from the original list and insert them at the beginning
cols = [col for col in cols_to_front if col in cols] + [col for col in cols if col not in cols_to_front]

# Apply the new order to the DataFrame
df = df[cols]

df.head()

```

```python
cols = list(df.columns)
cols.insert(0, cols.pop(cols.index('title')))
df = df[cols]

df.head()
```

```python
df.to_csv('../../Data/CNYVND_ID.csv', index= False)

```
## Xóa các hàng/cột bị lỗi
```python
"""
tham số axis = 1: xóa cột
tham số axis = 0: xóa hàng
"""
df = df.drop('Unnamed: 4', axis=1)
df.head()

```

```python
# prompt: xóa các cột Dividends, Stock Splits, 	FromCountryID

df = df.drop(['Dividends', 'Stock Splits', 'Volume'], axis=1)
df

```

```python
df.to_csv('../../Data/USDCNYwith.csv', index=False)
```

```python
# prompt: xóa 2 cột cuối
df = df.iloc[:, :-2]
df

```
# Xử lý dữ liệu trong file csv để nhập vào bảng bằng câu lệnh sql
```python
df.to_csv('../../Data/PBOCDecision_ID2.csv')
```

```python
def format_row(row):
  formatted_values = []
  for value in row:
    if isinstance(value, (int, float)):
      formatted_values.append(str(value))
    elif isinstance(value, str):
      if not (value.startswith("'") and value.endswith("'") or \
              value.startswith('"') and value.endswith('"')):
        value = '"' + value + '"'
      formatted_values.append(value)
    else:
      formatted_values.append(str(value))
  return "(" + ", ".join(formatted_values) + "),"

# Áp dụng hàm format_row cho mỗi hàng trong DataFrame
formatted_data = df.apply(format_row, axis=1)

# In ra dữ liệu đã được định dạng
for row in formatted_data:
  print(row)
```

```python
df.head()
```

```python
def format_row(row):
    formatted_values = []
    for value in row:
        if isinstance(value, (int, float)):
            # Chuyển số thành chuỗi
            formatted_values.append(str(value))
        elif isinstance(value, str):
            # Kiểm tra chuỗi có dấu nháy chưa, nếu không có thêm dấu nháy đôi
            if not (value.startswith("'") and value.endswith("'") or \
                    value.startswith('"') and value.endswith('"')):
                value = '"' + value + '"'
            formatted_values.append(value)
        elif isinstance(value, datetime):
            # Chuyển đổi datetime thành chuỗi và bao quanh bằng dấu nháy đôi
            value_str = value.strftime('%Y-%m-%d %H:%M:%S')
            formatted_values.append(f'"{value_str}"')
        else:
            # Chuyển đổi các kiểu dữ liệu khác thành chuỗi
            formatted_values.append(str(value))
    return "(" + ", ".join(formatted_values) + "),"

# Áp dụng hàm format_row cho mỗi hàng trong DataFrame
formatted_data = df.apply(format_row, axis=1)

# In ra dữ liệu đã được định dạng
for row in formatted_data:
    print(row)
    
```

```python
def format_row(row):
  formatted_values = []
  for i, value in enumerate(row): # thêm enumerate để lấy index
    if i == 0: # nếu là cột đầu tiên (cột ngày)
      formatted_values.append("'" + str(value) + "'") # thêm dấu nháy đơn
    elif isinstance(value, (int, float)):
      formatted_values.append(str(value))
    elif isinstance(value, str):
      if not (value.startswith("'") and value.endswith("'") or \
              value.startswith('"') and value.endswith('"')):
        value = "'" + value + "'"
      formatted_values.append(value)
    else:
      formatted_values.append(str(value))
  return "(" + ", ".join(formatted_values) + "),"
  # return "(" + ", ".join(formatted_values) + ");"

# Áp dụng hàm format_row cho mỗi hàng trong DataFrame
formatted_data = df.apply(format_row, axis=1)

```

```python
# prompt: hàng cuối cùng không để dấu, mà để dấu;

def format_row(row, is_last_row=False):
  formatted_values = []
  for i, value in enumerate(row):
    if i == 0:
      formatted_values.append("'" + str(value) + "'")
    elif isinstance(value, (int, float)):
      formatted_values.append(str(value))
    elif isinstance(value, str):
      if not (value.startswith("'") and value.endswith("'") or \
              value.startswith('"') and value.endswith('"')):
        value = "'" + value + "'"
      formatted_values.append(value)
    else:
      formatted_values.append(str(value))
  if is_last_row:
    return "(" + ", ".join(formatted_values) + ");"
  else:
    return "(" + ", ".join(formatted_values) + "),"

# Áp dụng hàm format_row cho mỗi hàng trong DataFrame
formatted_data = []
for index, row in df.iterrows():
  is_last_row = index == df.index[-1]
  formatted_data.append(format_row(row, is_last_row))

# In ra dữ liệu đã được định dạng
# for row in formatted_data:
#   print(row)

```

```python
# prompt: xuất formatted_data ra file txt

# Lưu formatted_data vào file txt
with open('formatted_data.txt', 'w') as f:
  for row in formatted_data:
    f.write(row + '\n')

```

```python

```

```python
# prompt: code đọc dữ liệu file csv, thêm đấu () và dấu , cuối mỗi dòng trong đoạn. với kiêu dữ liệu không phải số như date hoắc string kiểm tra đã có dấu ' hoặc " chưa, nếu chưa thêm '' vào trong chuỗi. vd:('2020-01-01', 1.55, 1),
# Chuẩn bị dữ liệu
df = df

# Xử lý từng ô trong DataFrame
def process_cell(cell):
  if isinstance(cell, str):
    if not (cell.startswith("'") and cell.endswith("'") or cell.startswith('"') and cell.endswith('"')):
      cell = '"' + cell + '"'
  return str(cell)

# Áp dụng hàm process_cell cho từng ô trong DataFrame
df_processed = df.applymap(process_cell)

# Chuyển đổi DataFrame thành chuỗi với định dạng mong muốn
output_string = df_processed.apply(lambda row: '(' + ', '.join(row) + '),', axis=1).str.cat(sep='\n')

# Ghi chuỗi vào file txt
with open('sql.txt', 'w') as f:
  f.write(output_string)

```

```python
# prompt: code đọc dữ liệu file csv, thêm đấu () và dấu , cuối mỗi dòng trong đoạn. với kiêu dữ liệu không phải số như date hoắc string kiểm tra đã có dấu ' hoặc " chưa, nếu chưa thêm '' vào trong chuỗi. khi kết thúc dòng cuối cùng thêm dấu ; . vd:('2020-01-01', 1.55, 1),...('2024-01-01', 1.55, 1);

import pandas as pd

# Đọc dữ liệu từ file CSV
df = df

# Xử lý từng ô trong DataFrame

def process_cell(cell):
  if isinstance(cell, str):
    if not (cell.startswith("'") and cell.endswith("'") or cell.startswith('"') and cell.endswith('"')):
      cell = '"' + cell + '"'
  return str(cell)

# def process_cell(cell):
#   if isinstance(cell, str):
#     if not (cell.startswith("'") and cell.endswith("'") or cell.startswith('"') and cell.endswith('"')):
#       cell = '"' + cell + '"'
#   return str(cell)

# Áp dụng hàm process_cell cho từng ô trong DataFrame
df_processed = df.applymap(process_cell)

# Chuyển đổi DataFrame thành chuỗi với định dạng mong muốn
output_string = df_processed.apply(lambda row: '(' + ', '.join(row) + '),', axis=1).str.cat(sep='\n')

# Thay dấu phẩy cuối cùng bằng dấu chấm phẩy
output_string = output_string[:-1] + ';'

# In kết quả
print(output_string)

```

```python
# prompt: code đọc dữ liệu file "USDCNY_Exchange_Rate.csv", thêm đấu () và dấu , cuối mỗi dòng trong đoạn. với kiêu dữ liệu không phải số như Date hoắc string kiểm tra đã có dấu ' hoặc " chưa, nếu chưa thêm '' vào trong chuỗi. khi kết thúc dòng cuối cùng thêm dấu ; . vd:('2020-01-01', 1.55, 1),...('2024-01-01', 1.55, 1);. kiểu ngày vẫn không được bỏ trong ngoặc""

import pandas as pd

# Đọc dữ liệu từ file CSV
# df = pd.read_csv('USDCNY_Exchange_Rate.csv')
df=df

# Xử lý từng ô trong DataFrame
def process_cell(cell):
  if isinstance(cell, str):
    if not (cell.startswith("'") and cell.endswith("'") or cell.startswith('"') and cell.endswith('"')):
      cell = '"' + cell + '"'
  return str(cell)

# Áp dụng hàm process_cell cho từng ô trong DataFrame
df_processed = df.applymap(process_cell)

# Chuyển đổi DataFrame thành chuỗi với định dạng mong muốn
output_string = df_processed.apply(lambda row: '(' + ', '.join(row) + '),', axis=1).str.cat(sep='\n')

# Thay dấu phẩy cuối cùng bằng dấu chấm phẩy
output_string = output_string[:-1] + ';'

# In kết quả
print(output_string)

```

```python
import pandas as pd

# Đọc dữ liệu từ file CSV
df = df

# Hàm để kiểm tra và thêm dấu nháy đơn nếu cần thiết
def format_value(value):
    if isinstance(value, str) and (not value.startswith("'") or not value.endswith("'")):
        return f'"{value}"'
    return value

# Chuyển đổi từng dòng của DataFrame thành chuỗi với định dạng yêu cầu
rows = []
for index, row in df.iterrows():
    formatted_row = [format_value(value) if isinstance(value, str) or isinstance(value, pd.Timestamp) else value for value in row]
    formatted_row_str = "(" + ", ".join(map(str, formatted_row)) + ")"
    rows.append(formatted_row_str)

# Kết hợp các dòng lại với dấu phẩy và thêm dấu chấm phẩy cuối cùng
output = ",\n".join(rows) + ";"
print(output) # Dùng lệnh print thì mới ra đúng định dạng xuống dòng

```
**with open("file.txt", "w") as file:**
* w : mở file, nếu chưa có tạo mới file
* a : ghi file vào cuối
* r : chỉ đọc
* x : tạo mới file, nếu đã có sẽ báo lỗi
* b : mở file ở chế độ nhị phân**df.to_csv('../../Data/data.csv', index=False)**

* ./ thư mục hiện tại
* ../ Trỏ đến thư mục trước đó
* ../../ Trỏ đến thư mục trước đó nữa, tương tự với các trường hợp khác
```python
# Tìm đường dẫn đến thư mục cha
current_dir = os.getcwd() # Lấy đường link của thư mục hiện tại
parent_dir = os.path.dirname(current_dir) # lấy đường link cha của thư mục trước

# Tạo thư mục Data nếu chưa tồn tại
data_dir = os.path.join(parent_dir, "Data") # Tạo thư mục
os.makedirs(data_dir, exist_ok=True)

# Lưu file CSV
path = os.path.join(data_dir, "df.csv")
df.to_csv(path, index=False)

```

```python

```
