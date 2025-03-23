# Giới thiệu python
Download: [Python](https://www.python.org/downloads/windows/)

# Tổng hợp thư viện python

## Thư viện thu thập dữ liệu

requests

requests_html

BeautifulSoup4

Puppeteer

Selenium

Scrapy

## Thư viện xử lý dữ liệu

Numpy: Thư viện hỗ trợ tính toán mạnh mẽ các dạng dữ liệu số, ma trận,....

Pandas: Xử lý Datafarme

Scipy

chardet: Thư viện xử lý file mã hóa

pdfplumber: Xử lý file pdf

# Thư viện xây dựng ứng dụng

Django

## Thư viện xây dựng và kết nối CSDL

SQLite

mysql.connector

pymysql

## Thư viện trực quan hóa

Matplotlib

Seaborn

Plotly

## Thư viện xây dựng mô hình ML/DL

Scikit-learn

TensorFlow

PyTorch

## Thư viện Dữ liệu lớn (Big Data)

PySpark

Hadoop

## Thư viện xử lý BlockChain

web3

Bitcoinlib

Brownie

PySolcX


Dưới đây là danh sách các thư viện trực quan hóa dữ liệu trong Python, được sắp xếp từ cơ bản đến nâng cao:

---

### **1. Cơ bản**  
Các thư viện này đơn giản, dễ sử dụng, phù hợp với người mới bắt đầu.  

- **Matplotlib**: Thư viện trực quan hóa dữ liệu cổ điển, hỗ trợ đồ thị đường, cột, tán xạ, histogram,...  
- **Seaborn**: Phát triển dựa trên Matplotlib, cung cấp các biểu đồ thống kê đẹp hơn và dễ sử dụng hơn.  
- **Pandas Visualization**: Chức năng vẽ biểu đồ tích hợp trong Pandas, dựa trên Matplotlib.  

---

### **2. Trung cấp**  
Các thư viện này có nhiều tính năng hơn, hỗ trợ tương tác tốt hơn.  

- **Plotly**: Hỗ trợ tạo biểu đồ tương tác với JavaScript, phù hợp cho web app.  
- **Bokeh**: Hỗ trợ trực quan hóa tương tác với tốc độ cao, có thể nhúng vào web app.  
- **Altair**: Hỗ trợ tạo biểu đồ khai báo (declarative visualization), dễ sử dụng với dữ liệu Pandas.  

---

### **3. Nâng cao**  
Các thư viện này được sử dụng trong trực quan hóa dữ liệu lớn hoặc phức tạp.  

- **Dash (dựa trên Plotly)**: Dùng để xây dựng dashboard tương tác trên web.  
- **Holoviews**: Giúp tạo biểu đồ nhanh chóng với code ngắn gọn, hỗ trợ tương tác mạnh mẽ.  
- **Geopandas + Folium**: Chuyên về trực quan hóa dữ liệu địa lý.  
- **D3.js (kết hợp với Python)**: Nếu cần trực quan hóa cực kỳ tùy chỉnh trên web, có thể kết hợp với D3.js.  
- **GGPlot (ggplot2 cho Python)**: Dựa trên triết lý của ggplot2 trong R, giúp tạo đồ thị đẹp theo cú pháp khai báo.  

---

Bạn đang muốn sử dụng trực quan hóa dữ liệu trong lĩnh vực nào? Nếu là tài chính thì có một số thư viện đặc thù khác nữa.


Trong tài chính, trực quan hóa dữ liệu rất quan trọng để phân tích xu hướng, mô hình và tín hiệu giao dịch. Dưới đây là các thư viện trực quan hóa dành riêng cho tài chính, sắp xếp từ cơ bản đến nâng cao:  

---

### **1. Cơ bản** (Dùng để vẽ biểu đồ tài chính đơn giản)  
- **Matplotlib**: Hỗ trợ các biểu đồ cơ bản như giá cổ phiếu, đường trung bình động.  
- **Seaborn**: Hữu ích để phân tích thống kê dữ liệu tài chính, như phân phối lợi nhuận, tương quan giữa các tài sản.  
- **Pandas Visualization**: Có thể vẽ nhanh biểu đồ giá cổ phiếu từ DataFrame.  

---

### **2. Trung cấp** (Hỗ trợ biểu đồ chuyên sâu hơn)  
- **mplfinance**: Chuyên vẽ biểu đồ nến, đường trung bình động, khối lượng giao dịch. (Phiên bản mới của `matplotlib.finance`)  
- **Plotly**: Hỗ trợ vẽ biểu đồ nến, biểu đồ OHLC (Open-High-Low-Close) có thể tương tác.  
- **Bokeh**: Phù hợp để tạo dashboard tài chính có tính tương tác cao.  

---

### **3. Nâng cao** (Tích hợp với hệ thống giao dịch, phân tích tài chính chuyên sâu)  
- **TA-Lib + mplfinance**: Dùng để tính toán và trực quan hóa các chỉ báo kỹ thuật như RSI, MACD, Bollinger Bands.  
- **Quantlib + Matplotlib**: Hỗ trợ mô hình định giá quyền chọn và trực quan hóa kết quả.  
- **Plotly Dash**: Dùng để xây dựng dashboard tài chính có tính tương tác cao, phù hợp với các ứng dụng phân tích dữ liệu lớn.  
- **Pyfolio**: Dùng để phân tích hiệu suất danh mục đầu tư, tạo báo cáo đánh giá rủi ro và lợi nhuận.  
- **Holoviews**: Kết hợp với Bokeh để vẽ các biểu đồ tài chính động.  

---

### **4. Đặc thù tài chính lượng tử (Quantitative Finance)**  
- **bt + matplotlib**: Hữu ích trong backtesting chiến lược giao dịch.  
- **zipline + pyfolio**: Trực quan hóa hiệu suất backtesting.  
- **D3.js (kết hợp với Python)**: Nếu cần trực quan hóa phức tạp trên web, có thể kết hợp với Flask hoặc Django.  

Bạn đang muốn trực quan hóa dữ liệu tài chính theo hướng nào? Phân tích kỹ thuật, hiệu suất danh mục hay mô hình dự đoán?