# Bài tập - Ôn tập - Phần 1

## Bài tập - Định lý Cộng và Định lý Nhân Xác suất

**Bài toán**:  

Một túi có **4 bi đỏ**, **3 bi xanh** và **2 bi vàng**. Ta thực hiện **2 lần rút bi liên tiếp**, mỗi lần **chỉ rút 1 viên**, và **không trả lại** viên đã rút. Tính xác suất rút được: 

1. Hai viên **cùng màu**.  

2. Hai viên **khác màu**.  

---

**Giải - Chi tiết**:

1. Hai viên **cùng màu**:

Trường hợp cùng màu gồm: 2 viên đỏ, 2 viên xanh, 2 viên vàng.

- Xác suất rút **2 viên đỏ** là: 

\\( P(A) = \frac{4}{9} \\) (viên bi thứ nhất màu đỏ)

\\( P(A) = \frac{3}{8} \\) (viên bi thứ hai cùng là màu đỏ)

Trường hợp bốc 2 viên bi cùng màu đỏ, áp dụng nguyên lý nhân:

*Vì lần rút thứ hai phụ thuộc vào kết quả lần rút thứ nhất, ta cần dùng **Định lý Nhân** để tính xác suất trường hợp này.*

\\(\frac{4}{9} \times \frac{3}{8} = \frac{12}{72} \\)

- Tương tự trường hợp **2 viên xanh**, **2 viên vàng**:

\\(\frac{3}{9} \times \frac{2}{8} = \frac{6}{72} \\) (**Trường hợp 2 bi xanh**)

\\(\frac{2}{9} \times \frac{1}{8} = \frac{2}{72} \\) (**Trường hợp 2 bi vàng**)

- Xác suất bốc được 2 viên bi cùng màu, áp dụng nguyên lý cộng:

*Vì các trường hợp này **không thể xảy ra đồng thời**, ta dùng **Định lý Cộng** để cộng xác suất của từng trường hợp.*

\\(\frac{12}{72} + \frac{6}{72} + \frac{2}{72} = \frac{20}{72} \approx 0.278 \\)

2. Hai viên **khác màu**:

Trường hợp 2 viên khác màu:

*Vì lấy lần lượt từng viên bi, nên cách chọn 2 viên bi khác màu có **quan trọng thứ tự** nên ta dùng **chỉnh hợp** để biết số trường hợp*:

\\(\mathrm{C}_{3}^{2} = 6 \\)

Liệt kê từng trường hợp gồm: (Đỏ, Xanh), (Xanh, Đỏ), (Đỏ, Vàng), (Vàng, Đỏ), (Xanh, Vàng), (Vàng, Xanh).

Tính từng trường hợp bằng **Định lý Nhân**:
- **(Đỏ, Xanh)**:  
\\(\frac{4}{9} \times \frac{3}{8} = \frac{12}{72} \\)

- **(Xanh, Đỏ)**:  
\\(\frac{3}{9} \times \frac{4}{8} = \frac{12}{72} \\)

- **(Đỏ, Vàng)**:  
\\(\frac{4}{9} \times \frac{2}{8} = \frac{8}{72} \\)

- **(Vàng, Đỏ)**:  
\\(\frac{2}{9} \times \frac{4}{8} = \frac{8}{72} \\)

- **(Xanh, Vàng)**:  
\\(\frac{3}{9} \times \frac{2}{8} = \frac{6}{72} \\)

- **(Vàng, Xanh)**:  
\\(\frac{2}{9} \times \frac{3}{8} = \frac{6}{72} \\)

**Xác suất hai viên khác màu**:  
\\(\frac{12}{72} + \frac{12}{72} + \frac{8}{72} + \frac{8}{72} + \frac{6}{72} + \frac{6}{72} = \frac{52}{72} \approx 0.722 \\)

---

**Giải - nhanh**: áp dụng Tổ hợp

- **Tổng số cách chọn 2 viên bi**: \\(\mathrm{C}_{9}^{2} = \frac{9!}{2!(9-2)!} = \frac{9.8.7!}{2.1.7!} = \frac{9.8}{2}=36 \\)

- **Số cách lấy 2 viên bi cùng màu**:
  - **2 bi đỏ**: \\(\mathrm{C}_{4}^{2} = 6 \\)
  - **2 bi xanh**: \\(\mathrm{C}_{3}^{2} = 3 \\)
  - **2 bi vàng**: \\(\mathrm{C}_{2}^{2} = 1 \\)
  
  **Tổng số cách lấy 2 viên bi cùng màu là**: \\(\mathrm{C}\_{4}^{2} + \mathrm{C}\_{3}^{2} + \mathrm{C}\_{2}^{2} = 10\\)

  \\(\Rightarrow \\) **Tổng số cách lấy 2 viên bi khác màu** = Tổng số cách chọn 2 viên bi - Tổng số cách lấy 2 viên bi cùng màu = 36 - 10 = 26

- **Tính xác suất**:
  - Xác xuất bốc 2 viên cùng màu: P = \\(\frac{10}{36} \approx 0.278 \\)
  - Xác suất bốc 2 viên khác màu: P = \\(\frac{26}{36} \approx 0.722 \\)

## Bài tập - Hoán vị, Chỉnh hợp, Tổ hợp

**Hoán vị**:

**Ví dụ 1**:

