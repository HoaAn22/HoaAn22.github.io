# Thu thập dữ liệu - Phần 1

**Giới thiệu tổng quan về thu thập dữ liệu**: Thu thập dữ liệu trong Khoa học dữ liệu là một trong những công việc quan trọng, không chỉ là lấy dữ liệu để phục vụ cho nhu cầu phân tích, mà còn là nền tảng quan trọng trong xây dựng pipeline lưu trữ dữ liệu.

*Theo kinh nghiệm của bản thân mình, để có thể thành thạo kỹ năng này bạn có thể xây dựng một web cơ bản để hiểu rõ hơn về cấu trúc của 1 trang web, các thẻ và chức năng của nó, đồng thời thực hành thu thập nhiều trang web khác nhau để tích lũy thêm kinh nghiệm*

Bạn có thể tìm hiểu các thẻ trong html và chức năng nó [tại đây](assets/posts/html/1-the-html.md) 

## Các bước thu thập dữ liệu

1. Khai báo đường dẫn trang cần thu thập dữ liệu
2. Gửi yêu cầu truy cập
3. Phân tích cứu pháp
4. Tìm các phần tử cần thu thập
5. Lưu trữ dữ liệu

*Đối với việc thu thập hàng loạt, có thể xử lý bằng logic vòng lặp*

## Thư viện sử dụng để thu thập dữ liệu

**Thư viện kết nối đến trang web và phân tích cứu pháp**:
* `requests`: Thư viện giử yêu cầu truy cập
* `requests_html`: Thư viện truy cập, cung cấp các tùy chọn nâng cao
* `Selenium`: Thư viện truy cập, một công cụ mạnh mẽ, cung cấp tùy chọn nâng cao và tương tác với trang web
* `BeautifulSoup`: Thư viện phân tích trang

**Thư viện để xử lý và lưu trữ dữ liệu**:
* `csv`: Thư viện xử lý và lưu trữ file csv
* `pdfplumber`: Thư viện trích xuất nội dung từ file  `pdf`
* `pandas`: Thư viện tiền xử lý dữ liệu mạnh mẽ

## Thực hành thu thập dữ liệu từ trang web cơ bản

[Thu thập dữ liệu cơ bản](https://colab.research.google.com/drive/1Zhxx7Wm8VRQ1HiCAXdqbccMatfvUr9gR?usp=sharing)

Bây giờ chúng ta sẽ thực hiện theo các bước đã trình bày ở trên
![Thực hành](assets/images/thu-thap-du-lieu/1-thuc-hanh.png)

Khi thành công, `soup` sẽ lưu trữ mã nguồn của trang, điều tiếp theo cần làm là xác định được nội dung và vị trí cần thu thập. Tại giao diện của trang web bạn, có thể nhấn `F12` trên bàn phím và trỏ đến phần tử muốn thu thập, nó sẽ hiển thị thuộc tính của thẻ đó và sau đó bạn có thể dụng các hàm trong `BeautifulSoup` để thu thập dữ liệu đó.

**`BeautifulSoup` hỗ trợ nhiều hàm để tiến hành lấy dữ liệu mong muốn sau đây là một số hàm thông dụng**:
* `soup.find()`: trả về 1 phần tử đầu tiên phù hợp với tham số truyền vào
* `soup.find_all()`: trả về `list` chứa nhiều phần tử phù hợp với tham số truyền vào
* `soup.select()`:
* `.text`, `.get_text()`: trích xuất văn bản

