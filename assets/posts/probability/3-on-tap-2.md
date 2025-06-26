# Ôn tập xác suất (Phần 2)

[Phần 1](assets/posts/probability/1-on-tap-1.md)

## Các quy tác tính xác suất

Xét mối quan hệ giữa 2 biến cố A và B

**Biến cố đối**: khi A xảy ra \\(\rightleftharpoons \\) B không xảy ra. Khi đó P(A) + P(B) = 1 \\(\rightleftharpoons \\) A, B đối nhau. *Là cơ sở của nguyên tắc tính xác suất bằng phần bù*.

**Biến cố xung khắc (mutual disjoint)**: 

*so sánh biến cố đối và biến cố xung khắc {hiểu kỹ hơn về hai trường hợp này do có sự tương tự nhau}*

**Biến cố độc lập (independent events)**: Khi biến cố A xảy ra không ảnh hưởng đến khả năng xảy ra B và **ngược lại**.

## Xác suất có điều kiện (conditional probability):

**Xác suất có điều kiện**: là xác xảy ra biến cố **A** khi đã biết thông tin về biến cố **B**. Nó đo lường khả năng xảy ra 1 sự kiện khi 1 sự kiện khác đã xảy ra.

**Công thức**:

$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$

*Trong đó*:
* P(A|B): Xác suất xảy ra biến cố **A** khi biến cố **B** đã xảy ra.
* \\(P(A \cap B) \\): Xác suất xảy ra cả 2 biến cố **A** và **B**.
* P(B): Xác suất xảy ra biến cố **B**.

*Giải thích công thức*

Công thức xác suất có điều kiện được hình thành từ các tính **xác suất cổ điển**.

$$P = \frac{số }{tổng}$$

Khi biết rằng biến cố **B** đã xảy ra, chúng ta chỉ quan tâm đến những lần biến cố **B** đã xảy ra, thay vì phải xét toàn bộ **không gian mẫu \\(\Omega \\)**.