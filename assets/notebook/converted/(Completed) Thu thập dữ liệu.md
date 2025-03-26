
```python
import datetime

import pandas as pd
import pandas_datareader as web

import yfinance as yf

```
# Tỷ giá USD/VND, USD/CNY

Thu thập bằng [Yahoo finance](https://finance.yahoo.com/) - `yfinance`
```python
# Kiểm tra ngày bắt đầu có dữ liệu

ticker = 'USDVND=X'
# ticker = 'USDCNY=X'

df = yf.download(ticker, start='1900-01-01')

first_date = df.index[0]
print(f'Ngày đầu tiên {ticker}: {first_date}')

```
Lấy tất cả dữ liệu từ trước đến nay
```python
# Cách 1:
start_date = first_date
end_date = datetime.date.today()

df = yf.download(ticker, start=start_date, end=end_date)
df.head()

```

```python
# Cách 2:
# df = yf.download(ticker, period="max")
# df.head()

```

```python
df.info()

```
Thư viện `yfinance` phiên bản mới đã thay đổi cấu trúc dfframe. Cần tiền xử lý trước khi sử dụng.

```python
# Cách 1: Xóa level columns không mong muốn
df.columns = df.columns.droplevel(1)

# Cách 2: Lấy level 0 của MultiIndex làm index cho columns
# df.columns = [col[0] for col in df.columns]

df.head()

```

```python
df.info()

```

```python
# Chuyển cột Date trở thành dữ liệu bình thường
df = df.reset_index()
df['Date'] = pd.to_datetime(df['Date'])
df.head()

# Đặt lại thành index (nếu cần)
# df["Date"] = pd.to_datetime(df["Date"])
# df = df.set_index("Date")

```

```python
df = df.drop('Volume', axis=1)
df.head()

```

```python
df.to_csv('USDVND.csv', index=False)

```
# Thu thập dữ liệu CNY/VND

Thu thập bằng Google Finance (trang tính)
```python
def convert_url(sheet_url: str) -> str:
    """
    Chuyển đổi URL Google Sheets từ dạng chỉnh sửa thành dạng CSV có thể tải xuống.

    :param sheet_url: Đường dẫn Google Sheets gốc
    :return: Đường dẫn CSV để tải dữ liệu
    """
    if "/edit" in sheet_url:
        sheet_id = sheet_url.split("/d/")[1].split("/edit")[0]  # Lấy ID của Google Sheets
        url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
        return url
    else:
        raise ValueError("URL không hợp lệ. Truy cập vào tệp google sheets, mở quyền truy cập (người xem) và copy đường dẫn.")

```

```python
url = "https://docs.google.com/spreadsheets/d/1XQdpdxnucpFn4hhoLLh_Np5BFzEP2qX3_KjYWKtrIiU/edit?gid=0"
csv_url = convert_url(url)
print(csv_url)

```

```python
df = pd.read_csv(csv_url)
df.head()

```

```python
df["Date"] = pd.to_datetime(df["Date"], format="mixed").dt.date
# df["Date"] = pd.to_datetime(df["Date"], format="mixed", dayfirst=True).dt.strftime("%d/%m/%Y")
# df["Date"] = pd.to_datetime(df["Date"], format="mixed", dayfirst=True).dt.strftime("%d/%m/%y")
df.head()

```
Hàm `pd.to_datetime()` mặc định, trích xuất ngày theo định dạng  `mm/dd/yyyy`(Châu Âu). Khi thêm tham số `dayfirst=True` vào `pd.to_datetime()`, pandas sẽ ưu tiên hiểu ngày theo định dạng `dd/mm/yyyy` (Việt Nam).
```python

```
# Thu thập lãi suất của Fed

Bằng thư viện `pandas_datareader` - API của [FRED (Federal Reserve Economic Data)](https://fred.stlouisfed.org/)<br>

**FRED (Federal Reserve Economic Data)** là cơ sở dữ liệu kinh tế do **Federal Reserve Bank of St. Louis (Ngân hàng Dự trữ Liên bang St. Louis)** cung cấp.

Các [mã lãi suất FED](https://fred.stlouisfed.org/categories/118), một số mã tiêu biểu:
* Effective Federal Funds Rate **([EFFR](https://fred.stlouisfed.org/series/EFFR))**: **Tần suất: hàng ngày**
* Federal Funds Effective Rate **([DFF](https://fred.stlouisfed.org/series/DFF))**: **Tần suất: hàng ngày/ 7 ngày**
* Federal Funds Effective Rate (FEDFUNDS)

*Tham khảo: Các [lãi suất](https://fred.stlouisfed.org/categories/22) khác*
```python
fed_ticker='EFFR'
start = datetime.datetime(2019, 1, 1)
end = datetime.date.today()

df = web.DataReader(fed_ticker, 'fred', start, end)
df.tail()

```

```python

```
