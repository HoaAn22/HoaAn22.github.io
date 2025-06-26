# Bài 2: Xác suất và biến ngẫu nhiên trong Tài chính

**Nền tảng về Xác suất và Biến ngẫu nhiên cho tài chính**

* [Biến ngẫu nhiên (Random Variable)](https://vi.wikipedia.org/wiki/Bi%E1%BA%BFn_ng%E1%BA%ABu_nhi%C3%AAn) là một ánh xạ toán học với đặc điểm là nó gán một giá trị cho kết quả đầu ra của một phép thử ngẫu nhiên. *Định nghĩa khác*, là một biến có giá trị được phụ thuộc vào kết quả của 1 phép thử ngẫu nhiên.

* [Hàm khối xác suất (Probability Mass Function - PMF)](https://vi.wikipedia.org/wiki/H%C3%A0m_kh%E1%BB%91i_x%C3%A1c_su%E1%BA%A5t) là khái niệm dùng để mô tả phân phối xác suất của một biến ngẫu nhiên **rời rạc**. *Hàm khối xác suất chính là một hàm dùng để tính xác suất tại giá trị biến x rời rạc*, có công thức là

    $$P(X=x)=p(x)$$

    * *Chú thích*:

        **Khác biệt giữa X và x:**
        * **X (Biến ngẫu nhiên)**: là một hàm ánh xạ kết quả của một phép thử hiểu như công thức tổng quát
        * **$x_{i}$ (Giá trị cụ thể)**: là một **giá trị cụ thể** mà biến ngẫu nhiên **X** có thể nhận được.

        **Cách hình dung:**

        Giả sử bạn tung một con xúc xắc.

        - X: là biến ngẫu nhiên biểu diễn số chấm trên mặt hiện ra.
        - $x_{i}$: là một giá trị cụ thể, ví dụ 3, 4, hoặc 6.

        Khi đó:

        P(X = \\(x_{i} \\)) nghĩa là *xác suất để xúc xắc ra đúng giá trị \\(x_{i} \\)* 

        P(X = 4) = \\(\frac{1}{6} \\) *Xác suất tung 4 nút*

    * **Tính chất của hàm khối xác suất:**

        1. \\( 0 \leq p(x) \leq 1 \\) với mọi giá trị x
        2. Tổng tất cả xác suất bằng 1: \\(\sum_{x} p(x) = 1 \\)
        
* [Hàm mật độ xác suất Probability density function - PDF](https://vi.wikipedia.org/wiki/H%C3%A0m_m%E1%BA%ADt_%C4%91%E1%BB%99_x%C3%A1c_su%E1%BA%A5t): là hàm tính xác suất của một biến ngẫu nhiên liên tục. Vì biến liên tục, để tính được xác suất cần tính tính phân của 1 khoảng giá trị mong muốn. Có công thức là 
    
    $$P(a \leq X \leq b) = \int_{a}^{b} f(x) dx$$

    * Tính chất hàm mật độ xác suất
        1. Không âm với mọi x: $f(X) \ge 0$
        2. Xác suất tại một điểm bằng 0

* Hàm phân phối tích lũy (Cumulative distribution function - CDF): 

* **Kỳ vọng (mean)**: giá trị trung bình, là một đại lượng đặc trưng cho giá trị trung bình [dài hạn](note. kết quả trung bình của nhiều phép thử) 

* Phương sai: 

---

Phân phối Xác suất

**Chú thích**

## Tài liệu tham khảo

