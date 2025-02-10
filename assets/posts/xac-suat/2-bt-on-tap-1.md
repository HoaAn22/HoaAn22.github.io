# Bài tập - Ôn tập - Phần 1

## Bài tập - Định lý Cộng và Định lý Nhân trong Xác suất

**Bài toán**:  

Một túi có **4 bi đỏ**, **3 bi xanh** và **2 bi vàng**. Ta thực hiện **2 lần rút bi liên tiếp**, mỗi lần **chỉ rút 1 viên**, và **không trả lại** viên đã rút. Tính xác suất rút được: 

1. Hai viên **cùng màu**.  

2. Hai viên **khác màu**.  

**Giải**:

Không gian mẫu (\\(\Omega \\)): 4 + 3 + 2 = 9 (*tổng số bi trong túi*)

1. Hai viên **cùng màu**:

Trường hợp cùng màu gồm: 2 viên đỏ, 2 viên xanh, 2 viên vàng.

xác suất rút 2 viên đỏ là: 
\\( P(A) = \frac{4}{9} \\) 









### **Giải thích cách áp dụng**  

1️⃣ **Áp dụng Định lý Cộng** (vì có nhiều cách rút hai viên cùng màu)  
- Hai viên **cùng màu** có thể là:
  - **Cả hai viên đỏ**.
  - **Cả hai viên xanh**.
  - **Cả hai viên vàng**.  
- Vì các trường hợp này **không thể xảy ra đồng thời**, ta dùng **Định lý Cộng** để cộng xác suất của từng trường hợp.

2️⃣ **Áp dụng Định lý Nhân** (tính xác suất từng trường hợp cụ thể)  
- Vì lần rút thứ hai phụ thuộc vào kết quả lần rút thứ nhất, ta cần dùng **Định lý Nhân** để tính xác suất mỗi trường hợp.

---

### **Lời giải**  

#### **Trường hợp 1: Hai viên cùng màu**  
- **Cả hai viên đỏ**:  
  - Xác suất rút viên đỏ đầu tiên: \( P(A) = \frac{4}{9} \)  
  - Xác suất rút viên đỏ thứ hai (sau khi đã rút 1 viên đỏ): \( P(B|A) = \frac{3}{8} \)  
  - Xác suất tổng:  
    \[
    P(RR) = P(A) \times P(B|A) = \frac{4}{9} \times \frac{3}{8} = \frac{12}{72}
    \]

- **Cả hai viên xanh**:  
  - Xác suất rút viên xanh đầu tiên: \( P(A) = \frac{3}{9} \)  
  - Xác suất rút viên xanh thứ hai: \( P(B|A) = \frac{2}{8} \)  
  - Xác suất tổng:  
    \[
    P(GG) = \frac{3}{9} \times \frac{2}{8} = \frac{6}{72}
    \]

- **Cả hai viên vàng**:  
  - Xác suất rút viên vàng đầu tiên: \( P(A) = \frac{2}{9} \)  
  - Xác suất rút viên vàng thứ hai: \( P(B|A) = \frac{1}{8} \)  
  - Xác suất tổng:  
    \[
    P(YY) = \frac{2}{9} \times \frac{1}{8} = \frac{2}{72}
    \]

- **Tổng xác suất hai viên cùng màu (dùng Định lý Cộng)**:  
  \[
  P(\text{Cùng màu}) = P(RR) + P(GG) + P(YY) = \frac{12}{72} + \frac{6}{72} + \frac{2}{72} = \frac{20}{72} \approx 0.278
  \]

---

#### **Trường hợp 2: Hai viên khác màu**  
- Ta có 3 trường hợp:
  - **(Đỏ, Xanh) hoặc (Xanh, Đỏ)**  
  - **(Đỏ, Vàng) hoặc (Vàng, Đỏ)**  
  - **(Xanh, Vàng) hoặc (Vàng, Xanh)**  
- Vì các trường hợp này **không xảy ra đồng thời**, ta lại dùng **Định lý Cộng**.

Tính từng trường hợp bằng **Định lý Nhân**:
- **(Đỏ, Xanh)**:  
  \[
  P(RG) = \frac{4}{9} \times \frac{3}{8} = \frac{12}{72}
  \]
- **(Xanh, Đỏ)**:  
  \[
  P(GR) = \frac{3}{9} \times \frac{4}{8} = \frac{12}{72}
  \]
- **(Đỏ, Vàng)**:  
  \[
  P(RY) = \frac{4}{9} \times \frac{2}{8} = \frac{8}{72}
  \]
- **(Vàng, Đỏ)**:  
  \[
  P(YR) = \frac{2}{9} \times \frac{4}{8} = \frac{8}{72}
  \]
- **(Xanh, Vàng)**:  
  \[
  P(GY) = \frac{3}{9} \times \frac{2}{8} = \frac{6}{72}
  \]
- **(Vàng, Xanh)**:  
  \[
  P(YG) = \frac{2}{9} \times \frac{3}{8} = \frac{6}{72}
  \]

- **Tổng xác suất hai viên khác màu**:  
  \[
  P(\text{Khác màu}) = P(RG) + P(GR) + P(RY) + P(YR) + P(GY) + P(YG)
  \]
  \[
  = \frac{12}{72} + \frac{12}{72} + \frac{8}{72} + \frac{8}{72} + \frac{6}{72} + \frac{6}{72} = \frac{52}{72} \approx 0.722
  \]

---

### **Kết luận** ✅  
- **Xác suất rút hai viên cùng màu**: **≈ 0.278**  
- **Xác suất rút hai viên khác màu**: **≈ 0.722**  

Ví dụ này đã áp dụng:  
✔️ **Định lý Nhân** để tính từng xác suất cụ thể.  
✔️ **Định lý Cộng** để tổng hợp các trường hợp riêng lẻ.  

Bạn thấy bài toán này thế nào? Có muốn thử một bài toán nâng cao hơn không? 😊