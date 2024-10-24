# Mô hình LSTM - Phần 1

## Tìm hiểu về ý tưởng mô hình và mô hình RNN

Trong lĩnh vực deel learning, một thuật toán nổi tiếng và quan trọng là RNN - thuật toán chuyên xử lý dữ liệu dạng chuỗi. RNN được ứng dụng với nhiều dịch máy, tạo văn bản, nhận dạng giọng nói và kết hợp cùng CNN để mô tả ảnh gắn nhãn cho hình ảnh `[1]`.

**Ý tưởng mô hình RNN**

Đối với các mô hình mạng neural không có khả năng xử lý dữ liệu tuần tự,  khi  train bộ dữ liệu tuần tự việc bộ dữ liệu bị đổ toàn bộ không có sự sắp xếp sẽ làm thay đổi ý nghĩa của dữ liệu.

*Ví dụ, “Con ăn cơm chưa” và “Con chưa ăn cơm”, nếu tách mỗi câu theo từ, ta được bộ vocab [ ‘con’, ‘ăn’, ‘cơm’, ‘chưa’], one hot encoding và cho tất cả vào mạng neural , có thể thấy ngay, không có sự phân biệt nào giữa 2 câu trên* `[1]`.

**RNN xử lý dữ liệu trình tự như thế nào?**

Mỗi block trong mô hình RNN sẽ lấy thông tin được trích xuât từ các blog trước và input hiện tại.

![Mô hình tổng quát RNN](assets/images/dl/1-kien-truc-rnn.png)
*Mô hình tổng quát RNN*

**Mô hình tổng quát của RNN gồm các thành phần chính sau** :
* **Input layer (lớp đầu vào)** : Là dữ liệu đầu vào (vector) được kí hiệu là *x*
* **Hidden Layer (Lớp ẩn)** : 
* 
*--Tìm hiểu thêm về lớp ẩn và trạng thái ẩn*

(\*) *t* : là đại diện cho bước thực hiện 

### Công thức 

---

* **Tính toán lớp ẩn**

$$
h_t = \sigma \left( W_{xh} \cdot x_t + W_{hh} \cdot h_{t-1} + b_h \right)
$$

Trong đó:
* \\(h_t \\): là lớp ẩn tại bước *t*
* \\(\sigma \\) : Hàm kích hoạt (thường là hàm `tanh` hoặc `ReLU`)
* \\(W_{xh} \\): 
* \\(W_{hh} \\):  
* \\(b_h \\): Bias (độ dịch)

---

* **Tính toán đầu ra**:

$$
o_{t} = \phi(W_{ho} \cdot h_{t} + b_{o})
$$

Trong  đó:
* \\(o_t \\): Đầu ra tại thời điểm t.
- \\(W_{ho} \\): Trọng số kết nối giữa trạng thái ẩn \\(h_t \\) và đầu ra.
- \\(b_o \\): Bias của đầu ra.
- \\(\phi \\): Hàm kích hoạt cho đầu ra (tùy thuộc vào bài toán, có thể là `softmax` hoặc `sigmoid`).

---

[Code](https://www.kaggle.com/)
# Tài liệu tham khảo
[1]

N. T. Huyen, “Recurrent Neural Network: Từ RNN đến LSTM,” _Viblo_, Jun. 24, 2021. https://viblo.asia/p/recurrent-neural-network-tu-rnn-den-lstm-gGJ597z1ZX2 (accessed Oct. 24, 2024).

‌[2]

Những người đóng góp vào các dự án Wikimedia, “Bộ nhớ dài-ngắn hạn,” _Wikipedia.org_, Nov. 18, 2020. https://vi.wikipedia.org/wiki/B%E1%BB%99_nh%E1%BB%9B_d%C3%A0i-ng%E1%BA%AFn_h%E1%BA%A1n (accessed Oct. 24, 2024).

[3]

A. Amidi and S. Amidi, “CS 230 - Recurrent Neural Networks Cheatsheet,” _Stanford.edu_, 2019. https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks

‌
# Nguồn ảnh
A. Amidi and S. Amidi, “CS 230 - Recurrent Neural Networks Cheatsheet,” _Stanford.edu_, 2019. https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks

‌