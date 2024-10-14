# Chương 2: Tỷ giá hối đoái kỳ hạn

## Giải thích một số khái niệm trong chương này (\*\*)


## Chuyển đổi báo giá kỳ hạn được biểu thị dưới dạng điểm hoặc tỷ lệ phần trăm thành báo giá kỳ hạn trực tiếp.

**Tỷ giá kỳ hạn** được thể hiện dưới dạng chênh lệch **tỷ giá giao ngay**(\*)  và **tỷ giá kì hạn**(\*). Một các để biểu thị điều này là thông qua dạng **điểm** hoặc **tỷ lệ phần trăm**.

Đơn vị của điểm là chữ số thập phân cuối cùng trong tỷ giá giao ngay. Đối với tỷ giá ngoại tệ giao ngay có 4 chữ số thập phân, chẳng hạn như 2.3481, mỗi điểm tương đương 0.0001 hay 1/10.000.**(Tìm hiểu thêm)**.

*Ví dụ: một báo giá **+18,3 điểm** cho tỷ giá kỳ hạn 90 ngày, có nghĩa là tỷ giá kỳ hạn cao hơn tỷ giá giao ngay **0,00183***. 

Giải thích ví dụ này, chữ số thập phân thứ 4 là hàng đơn vị, +18,3 điểm thì 8 ở vị trí thứ 4 trong báo giá, 1 đứng trước nó và ở vị trí thứ 3.

Ví dụ: **báo giá tỷ giá giao ngay VND/USD 23000** và  **+5 điểm** tỷ giá kì hạn lúc này được tính bằng:

$$
23000 + 0,0005 = 23000,0005
$$

Đối với **tỷ lệ phần trăm**, với công thức:

$$
\text{tỷ giá giao ngay} \times (1+\text{phần trăm thay đổi})
$$

*Ví dụ tỷ giá giao ngay AUD/EUR được báo ở mức 0.7313, và tỷ giá kỳ hạn 120 ngày được cho là -0.062%. Tỷ giá kỳ hạn 120 ngày AUD/EUR là bao nhiêu?*

$$
0.7313 \times (1 – 0.00062) = 0.7308.
$$

## Mối quan hệ chênh lệch giá giữa tỷ giá giao ngay, tỷ giá kỳ hạn và lãi suất.

Khi các tiền tệ được giao dịch tự tự do và có hợp đồng kỳ hạn, chênh lệch giữa tỷ giá giao ngay và kỳ hạn **gần bằng chêch lệch lãi suất của 2 quốc gia**. 

Điều này xảy ra vì sẽ có một cơ hội chênh lệch giá với lợi nhuận không rủi ro khi mối quan hệ này không được duy trì.

**(Đọc thêm: Nền tảng toán \\(\to \\) Khai phá đồ thị \\(\to \\) Bài tập - Ứng dụng thuật toán Bellman-Ford tìm chu trình âm trong chuyển đổi tiền tệ.**

Mối quan hệ này được gọi là **điều kiện không có chênh lệch giá** (**no-arbitrage condition**), bởi vì nếu nó không đúng, sẽ có cơ hội kiếm lời mà không gặp rủi ro. Một ví dụ về giao dịch chênh lệch giá như sau:

1. Vay **tiền tệ A** với lãi suất A.
2. Đổi sang **tiền tệ B** theo tỷ giá giao ngay và đầu tư với lãi suất B.
3. Bán số tiền nhận được từ khoản đầu tư này theo hợp đồng kỳ hạn với tỷ giá kỳ hạn để đổi lại thành **tiền tệ A**.

Nếu tỷ giá kỳ hạn không phản ánh chính xác sự khác biệt giữa lãi suất, việc kinh doanh chênh lệch giá này có thể tạo ra lợi nhuận đến mức mà lợi nhuận từ đầu tư tiền tệ B và đổi lại thành tiền tệ A qua hợp đồng kỳ hạn lớn hơn chi phí vay tiền tệ A trong khoảng thời gian đó.

Mối quan hệ không chênh lệch giá này thường được gọi là **ngang giá lãi suất** (**interest rate parity**). Công thức của nó như sau:

$$
\text{Forward Rate} = \text{Spot Rate} \times \left( \frac{1 + \text{Interest Rate of Price Currency}}{1 + \text{Interest Rate of Base Currency}} \right)
$$

Trong đó:
* Forward rate: Tỷ giá kỳ hạn
* Spot rate: tỷ giá giao giao ngay
* Interest rate: lãi xuất 
## Tính toán và giải thích mức chiết khấu hoặc phí bảo hiểm kỳ hạn.


**Chiết khấu kỳ hạn** hoặc **bù trừ kỳ hạn** cho một loại tiền tệ được tính dựa trên **tỷ lệ phần trăm** chênh lệch giữa giá kỳ hạn và giá giao ngay. Chúng ta sẽ xem xét ví dụ về tỷ giá USD/EUR để minh họa.

**Ví dụ:**

- **Tỷ giá giao ngay USD/EUR** = $1.312 (một euro bằng 1.312 đô la Mỹ)
- **Tỷ giá kỳ hạn 90 ngày USD/EUR** = $1.320

Để tính toán tỷ lệ chiết khấu hoặc bù trừ kỳ hạn:

$$
\text{Bù trừ kỳ hạn} = \left( \frac{\text{Forward Rate}}{\text{Spot Rate}} \right) - 1
$$

Thay số vào công thức:

$$
\text{Bù trừ kỳ hạn} = \left( \frac{1.320}{1.312} \right) - 1 = 0.609\%
$$

Vì giá trị này là **dương**, nó được diễn giải là **bù trừ kỳ hạn** cho đồng euro là **0.609%** trong 90 ngày. Nếu muốn tính toán tỷ lệ này cho cả năm, chúng ta nhân nó với 4 (bởi vì 12 tháng chia cho 3 tháng kỳ hạn = 4).

**Diễn giải:**  
Vì tỷ giá kỳ hạn lớn hơn tỷ giá giao ngay, điều này có nghĩa là **phải cần nhiều đô la Mỹ hơn để mua một euro sau 90 ngày**. Do đó, đồng **euro được kỳ vọng tăng giá** so với đô la Mỹ, và ngược lại, đồng **đô la Mỹ được kỳ vọng giảm giá** so với đồng euro.

Nếu tỷ giá kỳ hạn nhỏ hơn tỷ giá giao ngay, giá trị tính toán sẽ là **âm** và chúng ta sẽ diễn giải đó là **chiết khấu kỳ hạn** cho đồng euro so với đô la Mỹ.

## Tính toán và diễn giải tỷ giá kỳ hạn phù hợp với tỷ giá giao ngay và lãi suất của mỗi loại tiền tệ

**Khái niệm chính:**  
Khi hai loại tiền tệ được giao dịch tự do và có hợp đồng kỳ hạn, **tỷ giá kỳ hạn** có thể được tính toán dựa trên **tỷ giá giao ngay** và **lãi suất không rủi ro** của từng quốc gia. Mục tiêu là tìm ra tỷ giá kỳ hạn để đảm bảo rằng không có cơ hội kinh doanh chênh lệch giá mà không gặp rủi ro. 

Công thức tỷ giá kỳ hạn:

$$
\text{Tỷ giá kỳ hạn} = \text{Tỷ giá giao ngay} \times \left( \frac{1 + \text{Lãi suất của tiền tệ định giá}}{1 + \text{Lãi suất của tiền tệ cơ sở}} \right)
$$

**Ví dụ 1: Tính toán tỷ giá kỳ hạn không chênh lệch giá**

Giả sử có hai loại tiền tệ, **ABE** và **DUB**. Tỷ giá giao ngay **ABE/DUB** là 4.5671, lãi suất không rủi ro 1 năm của ABE là 5%, và lãi suất không rủi ro 1 năm của DUB là 3%. Tính toán tỷ giá kỳ hạn 1 năm để tránh lợi nhuận chênh lệch giá.

**Giải pháp:**

Sử dụng công thức tỷ giá kỳ hạn:

$$
\text{Tỷ giá kỳ hạn} = 4.5671 \times \left( \frac{1 + 0.03}{1 + 0.05} \right) = 4.6558
$$

Tỷ giá kỳ hạn là **4.6558**. Điều này có nghĩa là sau 1 năm, tỷ giá ABE/DUB sẽ tăng lên từ 4.5671 lên 4.6558 nếu không có lợi nhuận chênh lệch giá.

**Giải thích:**  
- **Chênh lệch lãi suất**: Chênh lệch lãi suất giữa hai quốc gia là 5% - 3% = 2%. Điều này tương đối phù hợp với chênh lệch tỷ giá kỳ hạn và tỷ giá giao ngay, khi tỷ giá kỳ hạn tăng thêm 1.94%. Thông thường, tiền tệ có lãi suất cao hơn (ABE) sẽ giảm giá trị theo thời gian, với mức giảm gần bằng chênh lệch lãi suất này.

---

**Ví dụ 2: Tính toán tỷ giá kỳ hạn không chênh lệch giá với lãi suất 90 ngày**

Giả sử tỷ giá giao ngay **ABE/DUB** là 4.5671, lãi suất không rủi ro 90 ngày của ABE là 5%, và lãi suất không rủi ro 90 ngày của DUB là 3%. Tính toán tỷ giá kỳ hạn 90 ngày để tránh lợi nhuận chênh lệch giá.

**Giải pháp:**

Công thức tương tự với lãi suất 90 ngày:

$$
\text{Tỷ giá kỳ hạn 90 ngày} = 4.5671 \times \left( \frac{1 + \frac{0.03}{4}}{1 + \frac{0.05}{4}} \right)
$$

---

### **Ví dụ: Tính toán lợi nhuận chênh lệch giá nếu tỷ giá kỳ hạn khác với tỷ giá không chênh lệch giá**

Giả sử tỷ giá kỳ hạn **ABE/DUB** là **4.6000**, thấp hơn mức tỷ giá không chênh lệch giá đã tính ở ví dụ trước. Nhà đầu tư **DUB** có thể thực hiện giao dịch chênh lệch giá và kiếm lời theo các bước sau:

1. **Vay 1.000 DUB** với lãi suất 3% trong 1 năm.
2. Đổi **1.000 DUB** sang **4.5671 ABE** theo tỷ giá giao ngay.
3. **Đầu tư 4.5671 ABE** với lãi suất 5%, để cuối năm nhận được:

$$
4.5671 \times 1.05 = 4.79545 \text{ ABE}
$$
   
4. Ký hợp đồng kỳ hạn để đổi **4.79545 ABE** với tỷ giá kỳ hạn 4.6000. Sau 1 năm, nhận được:

$$
\frac{4.79545}{4.6000} = 1.04249 \text{ DUB}
$$

Kết thúc năm, nhà đầu tư có **1.04249 DUB**, tương ứng với lợi nhuận 4.249% từ khoản đầu tư ban đầu là 1.000 DUB, cao hơn mức lãi suất 3% của DUB.

Nhà đầu tư trả lại khoản vay ban đầu **1.000 DUB** cùng với 3% lãi suất, tổng cộng **1.030 DUB**, và giữ lại **12.49 DUB** lợi nhuận thuần mà không có rủi ro, không cần vốn ban đầu (lợi nhuận chênh lệch giá).

---

### **Kết luận:**
- **Tỷ giá kỳ hạn không chênh lệch giá** có thể được tính dựa trên tỷ giá giao ngay và lãi suất của các loại tiền tệ.
- Nếu tỷ giá kỳ hạn khác với tỷ giá không chênh lệch giá, có cơ hội kinh doanh chênh lệch giá và thu lợi nhuận mà không có rủi ro. Tuy nhiên, các nhà kinh doanh sẽ theo đuổi cơ hội này cho đến khi tỷ giá trở về mức không chênh lệch giá, làm giảm khả năng kiếm lời.
