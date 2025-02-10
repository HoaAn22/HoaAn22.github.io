# Ôn tập xác suất (Phần 1)

## Nguyên lý cơ bản trong xác suất

- **Nguyên lý cộng**: xác suất của 1 sự kiện xảy ra là tổng của các xác suất của các sự kiện con không giao nhau, tạo thành sự kiện đó.

	*Bài toán chia thành các trường hợp, chia thành các thành phần \\(\to \\) áp dụng nguyên lý cộng*
---

- **Nguyên lý nhân**: là một nguyên tắc cơ bản trong xác suất, dùng để tính xác suất xảy ra đồng thời của hai hoặc nhiều biến cố.

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

**3. Tổ hợp (Combination)**

**Khái niệm**: Tổ hợp của n phần tử lấy k phần tử là số cách chọn k phần tử từ n phần tử, nhưng **không quan tâm thứ tự**.

**Công thức**:

$$C(n, k) = \frac{n!}{k!(n-k)!}$$

- Trong đó: \\(k \leq n. \\)