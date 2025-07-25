# Bài 3: Lý thuyết danh mục đầu tư Markowitz và Mô hình CAPM

## Mục tiêu:

- Hiểu rõ về rủi ro và lợi nhuận
- Lý thuyết danh mục đầu tư trung bình - phương sai [#Markowitz]
- Mô hình định giá tài sản vốn ([CAPM](note. Capital asset pricing model)) và [beta](note. Hệ số beta, đo lượng mức độ nhạy cảm của tài sản so với thì trường)

## Lợi nhuận (Return)

Với một khoản đầu tư có số tiền ban đầu và $x_0$, số tiền nhận được cuối cùng khi kết thúc đầu tư là $x_1$, Khi đó lợi nhuận được tính bằng công thức:

$$r = \frac{x_1 - x_0}{x_0}$$

Ví dụ: mua một cổ phiếu với giá 100K, bán lại được 110K, khi đó lợi nhuận được tính:

$$r = \frac{110 - 100}{100} = \text{10\%}$$

*Lợi nhuận lúc này là 10%*

**Lợi nhuận (return)** có thể hiểu là sự thay đổi về giá của một tài sản, khoản đầu tư hoặc dự án theo thời gian. Thể hiện dưới dạng phần trăm. [1]

## Bán khống

**Bán khống (Short selling)**:[2] là việc bán một tài sản không thuộc sở hữu của mình cần vay tài sản để thực hiện. Thông thường người bán khống kỳ vọng tài sản sẽ giảm trong thời gian tiếp theo và mua lại tài sản đó để trả lại và nhận được chênh lệch giá. Nếu tài sản không giảm mà tăng, người bán khống sẽ thua lỗ.

Ví dụ: vay cổ phiếu giá 100K, trong thời gian một tháng, sau thời gian 1 tháng giá cổ phiếu tăng 110K, vẫn áp dụng công thức tính lợi nhuận để tính, ta được:

$$r = \frac{110 - 100}{100} = \text{10\%}$$

*Người bán khống phải trả thêm cho người cho vay 10% → Tức là thua lỗ 10%. Khi tài sản tăng, người bán khống sẽ thua lỗ tương ứng.*

Khi thực hiện bán khống, thông thường bạn vay từ các nhà mô giới (broken), công ty chứng khoản hoặc các quỹ nắm giữ nhiều loại tài sản đó.

Các công tư chứng khoán này thường có hệ thống gọi là [margin account](note. Tài sản ký quỹ) cho phép vay tài sản hoặc thực hiện [#đòn bẩy] từ chính công ty đó hoặc mạng lưới khách hàng đăng ký có đăng kí cho vay tài sản đó.

**Nếu tài sản có khả năng giảm giá (theo kỳ vọng của người bán khống), tại sao vẫn có người cho vay tài sản?**

- Người cho vay tài sản sẽ nhận được phí hoặc lãi suất về việc cho vay loại tài sản.

- Họ thường là những nhà đầu tư dài hạn, không quan tâm nhiều đến biến động giá ngắn hạn, nếu tài sản đủ mạnh thì nó có xu hướng vẫn tăng trong nhiều năm. Mặt khác, họ còn thường tận dụng điều này để sinh thêm lợi nhuận, khi nắm giữ tài sản dài hạn thông qua việc được nhận thêm phí cho vay.

- Tài sản thường có hợp đồng và quy định rõ ràng về phí vay, điều kiện buộc trả lại, biện pháp bảo vệ. Ngoài ra, cơ chế [margin account](note. Tài sản ký quỹ) với tài sản đảm bảo người cho vay vẫn an toàn ngay cả khi tài sản có biến động.

### Tài khoản ký quỹ (Margin account)[3]

**Tài khoản ký quỹ (Margin account)**: là một loại tài sản [#mô giới] cho chép nhà đầu tư được bán khống chứng khoán hoặc vay tiền để mua chứng khoán dựa trên số tiền hiện có trong tài khoản (tài sản đảm bảo). Tài khoản ký quỹ giúp nhà đầu tư mua/vay tài sản vượt xa số tiền đang có trong tài khoản, nâng cao lợi nhuận và rủi ro cũng cao hơn.

![Margin account](assets/images/financial-engineering/3-margin-account.jpg)
( Nguồn ảnh: https://www.litefinance.org/blog/for-beginners/margin-trading/margin-account-vs-cash-account/ )

Lợi nhuận chỉ có hạn, nhưng rủi ro thua lỗ là không giới hạn. Khi thực hiện bán khống trên lý thuyết lợi nhuận tốt nhất bạn đạt được khi tài sản trở về 0, lợi nhuận lúc này là 100%, nhưng rủi ro khi tài sản tăng giá là không giới hạn. Ví dụ, bạn bán khống số cổ phiếu với trị giá 100, khi giá có biến động mạnh là tăng lên 500 bạn lỗ 400 tức là 400% rủi ro có thể tăng lên không giới hạn nếu tài sản tiếp tục tăng. 

Tài sản ký quỹ, giúp bảo vệ người cho vay trong trường hợp bạn bị thua lỗ, không còn khả năng trả được nợ.

**Toàn bộ số tiền thu được từ việc bán khống sẽ được lưu trong tài khoản ký quỹ, không được phép sử dụng tự do**. Tiền do việc bán khống ban đầu không phải thực sự là lợi nhuận, bạn chỉ tạm thời giữa số tiền ban tiền và phải thực hiện nghĩa vụ nợ. Khi tài sản giảm, bạn mua lại và thực hiện nghĩa vụ nợ, phần chênh lệch mới là lợi nhuận bạn kiếm được.

---

**Chú thích**

[#Markowitz]: Lý thuyết Markowitz trong tài chính hiện đại giúp xác định cách tối ưu đa danh hóa danh mục đầu tư để đặt được mức kỳ vọng cao nhất và rủi ro thấp nhất có thể.

## Tài liệu tham khảo

[1] A. Hayes, “What Are Returns in Investing, and How Are They Measured?,” Investopedia, 2025. https://www.investopedia.com/terms/r/return.asp

[2] A. Hayes, “Short Selling: Your Step-by-Step Guide for Shorting Stocks,” Investopedia, 2024. https://www.investopedia.com/terms/s/shortselling.asp

[3] A. Hayes, “Margin Account: Definition, How It Works, and Example,” Investopedia, 2025. https://www.investopedia.com/terms/m/marginaccount.asp
‌