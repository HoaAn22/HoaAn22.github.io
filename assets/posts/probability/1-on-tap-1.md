# Ôn tập xác suất (Phần 1)

[Phần 2](assets/posts/probability/3-on-tap-2.md)

## Nguyên lý cơ bản trong xác suất

- **Nguyên lý cộng (Addition Principle)**: Nguyên lý này áp dụng khi có nhiều cách thực hiện một công việc và **chúng không thể xảy ra đồng thời**.

	Nếu có \( A \) cách thực hiện công việc thứ nhất và \( B \) cách thực hiện công việc thứ hai và hai công việc này **không thể thực hiện cùng lúc**, có công thức:

 	$$A + B$$

 	*Bài toán chia thành các trường hợp, chia thành các thành phần \\(\to \\) áp dụng nguyên lý cộng*
---

- **Nguyên lý nhân (Multiplication Principle)**: Nguyên lý này áp dụng khi có nhiều bước thực hiện một công việc và **chúng có thể xảy ra đồng thời hoặc liên tiếp**.

	Nếu có \( A \) cách thực hiện công việc thứ nhất và \( B \) cách thực hiện công việc thứ hai, nếu 2 công việc này diễn ra **đồng thời/liên tiếp**, có công thức:
	
	$$A \times B$$

	*Bài toán chia thành các bước, chia thành các giai đoạn \\(\to \\) áp dụng nguyên lý nhân*
	
## Hoán vị, Chỉnh hợp, Tổ hợp.

**1. Hoán vị (Permutation)**:

**Khái niệm**: Hoán vị của một tập hợp gồm n phần tử là số cách sắp xếp toàn bộ n phần tử theo một thứ tự nhất định.

**Công thức**:

$$P(n)=n!$$

Trong đó:

- \\(n!=n×(n−1)×(n−2)×⋯×1 \\) (giai thừa)
---

**2. Chỉnh hợp (Arrangement)**:

**Khái niệm**: Chỉnh hợp của n phần tử lấy k phần tử là số cách chọn và sắp xếp k phần tử từ n, trong đó **thứ tự quan trọng**.

**Công thức**:

$$A(n, k) = \frac{n!}{(n-k)!}$$

- Trong đó: \\(k \leq n. \\)
---

**3. Tổ hợp (Combination)**:

**Khái niệm**: Tổ hợp của n phần tử lấy k phần tử là số cách chọn k phần tử từ n phần tử, nhưng **không quan tâm thứ tự**.

**Công thức**:

$$C(n, k) = \frac{n!}{k!(n-k)!}$$

- Trong đó: \\(k \leq n. \\)

## Xác xuất cổ điển (Probability)

Thực hiện phép thử (try), có không gian mẫu \\(\Omega \\) là tập hợp tất cả các kết quả có thể xảy ra. Biến cố (event) cần tính đặt tên là A với \\(\Omega_{A} \\) là tập hợp các kết quả có thể xảy ra cần tính, ta có công thức:

$$P(A) = \frac{|\Omega_{A}|}{|\Omega|}$$