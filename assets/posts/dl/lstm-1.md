# Mô hình LSTM - Phần 1

Trước khi tìm hiểu về mô hình LSTM, chúng ta hãy cùng tìm hiểu rõ về mô hình RNN - là nền tảng để xây dựng nên mô hình LSTM.

## Tìm hiểu về ý tưởng mô hình và mô hình RNN

Trong lĩnh vực deel learning, một thuật toán nổi tiếng và quan trọng là RNN - thuật toán chuyên xử lý dữ liệu dạng chuỗi. RNN được ứng dụng với nhiều dịch máy, tạo văn bản, nhận dạng giọng nói và kết hợp cùng CNN để mô tả ảnh gắn nhãn cho hình ảnh `[1]`.

**Ý tưởng mô hình RNN**

Đối với các mô hình mạng neural không có khả năng xử lý dữ liệu tuần tự,  khi  train bộ dữ liệu tuần tự việc bộ dữ liệu bị đổ toàn bộ không có sự sắp xếp sẽ làm thay đổi ý nghĩa của dữ liệu.

*Ví dụ, “Con ăn cơm chưa” và “Con chưa ăn cơm”, nếu tách mỗi câu theo từ, ta được bộ vocab [ ‘con’, ‘ăn’, ‘cơm’, ‘chưa’], one hot encoding và cho tất cả vào mạng neural , có thể thấy ngay, không có sự phân biệt nào giữa 2 câu trên* `[1]`.

**RNN xử lý dữ liệu trình tự như thế nào?**

Mỗi block trong mô hình RNN sẽ lấy thông tin được trích xuất từ các block trước và input hiện tại.

![Mô hình tổng quát RNN](assets/images/dl/1-kien-truc-rnn.png)
*Mô hình tổng quát RNN*

*(Nguồn ảnh: [https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks))*

**Mô hình tổng quát của RNN gồm các thành phần chính sau** :
* **Input layer (lớp đầu vào)** : Là dữ liệu đầu vào (vector) được kí hiệu là x
* **Hidden Layer (Lớp ẩn)** : (trong bài viết này) được kí hiệu là a, lớp ẩn là thành phần quan trọng của mô hình, giúp ghi nhớ thông tin của dữ liệu tuần tự. 
* **Ouput Layer (Lớp đầu ra)** : được kí hiệu là y

**x** là đại diện cho dữ liệu đầu vào. \\(x_t \\) đại diện cho dữ dữ liệu đầu vào ở bước **t**. **y** là output của 1 block trong mô hình RNN. với **a** là bộ nhớ của mạng RNN \\(a_t \\) là tổng hợp thông tin của lớp ẩn trước ( \\(a_t \\) -1) và input tại **t** là \\(x_t \\) 
### Công thức 

---

* **Tính toán lớp ẩn**

$$
a_t = g_a \left( W_{xa} \cdot x_t + W_{aa} \cdot a_{t-1} + b_a \right)
$$

Trong đó:
* \\(a_t \\): là lớp ẩn tại bước t
* \\(g_aa \\) : Hàm kích hoạt (thường là hàm `tanh` hoặc `ReLU`)
* \\(W_{xa} \\):  Trọng số giữa đầu vào x và lớp ẩn a
* \\(W_{aa} \\):  Trọng số giữa lớp ẩn trước đó \\(a_{t-1} \\) và và lớp ẩn hiện tại \\(a_{t} \\)
* \\(b_a \\): Bias (độ dịch)

---

* **Tính toán đầu ra**:

$$
y_{t} = g_y (W_{ay} \cdot a_{t} + b_{y})
$$

Trong  đó:
* \\(y_t \\): Đầu ra tại thời điểm t.
- \\(W_{ay} \\): Trọng số kết nối giữa trạng thái ẩn \\(h_t \\) và đầu ra.
- \\(b_y \\): Bias của đầu ra.
- \\(g_y \\): Hàm kích hoạt cho đầu ra (tùy thuộc vào bài toán, có thể là `softmax` hoặc `sigmoid`).

## Mô hình block chi tiết của RNN

![Mô hình khối RNN chi tiết](assets/images/dl/1-kien-truc-rnn-2.png)
Với 2 công thức trên ta sẽ diễn giải cách mô hình hoạt động:
* **Quá trình cập nhập lớp ẩn**: Dữ liệu đầu vào mô hình gồm \\(a_{t-1} \\) *(giá trị lớp ẩn trước đó)* và \\(x_t \\) *(giá trị đầu vào tại bước này)* \\(\to \\) dữ liệu đầu vào được nhân lần lược các trọng số \\(W_{aa} \\) và \\(W_{ax} \\) \\(\to \\) cộng 2 kết quả này với \\(b_a \\) *(bias lớp ẩn)* giúp điều chỉnh kết quả \\(\to \\) nhân kết quả với *(Hàm kích hoạt)* và đưa ra giá trị lớp ẩn
* **Quá trình đưa output**: Sau khi có \\(a_t \\) *(giá trị block hiện tại)* từ quá trình trước, dùng kết quả này nhân với trong số \\(W_{ay} \\) \\(\to \\) cộng kết quả với \\(b_y \\) *(bias đầu ra)* \\(\to \\) Nhân kết quả với *(Hàm kích hoạt đầu ra)* đưa ra output

Với mô hình này, để đưa ra lớp ẩn và output chúng ta cần tìm và tối ưu các trọng số \\(W_{xa} \\), \\(W_{aa} \\), \\(W_{ay} \\) - *Đó gọi là quá trình lan truyền ngược*



[Code](https://www.kaggle.com/code/kcsener/8-recurrent-neural-network-rnn-tutorial/)

# Tài liệu tham khảo
[1]

N. T. Huyen, “Recurrent Neural Network: Từ RNN đến LSTM,” _Viblo_, Jun. 24, 2021. https://viblo.asia/p/recurrent-neural-network-tu-rnn-den-lstm-gGJ597z1ZX2 (accessed Oct. 24, 2024).

‌[2]

Những người đóng góp vào các dự án Wikimedia, “Bộ nhớ dài-ngắn hạn,” _Wikipedia.org_, Nov. 18, 2020. https://vi.wikipedia.org/wiki/B%E1%BB%99_nh%E1%BB%9B_d%C3%A0i-ng%E1%BA%AFn_h%E1%BA%A1n (accessed Oct. 24, 2024).

[3]

A. Amidi and S. Amidi, “CS 230 - Recurrent Neural Networks Cheatsheet,” _Stanford.edu_, 2019. https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks

‌