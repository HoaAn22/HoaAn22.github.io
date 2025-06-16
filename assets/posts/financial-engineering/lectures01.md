# Bài 1: Giới thiệu về Kỹ thuật tài chính

**Khủng hoảng tài chính (2007-2010)**

Bắt đầu từ 2007, sự sụp đổ của các khoản vay dưới chuẩn đã kéo theo cuộc khủng hoảng kinh tế toàn cầu. Đẩy tỷ lệ thất nghiệp từ 4.4% (Tháng 10, 2007) lên 9.6% (Tháng 6, 2010).

*Lý do dẫn đến cuộc khủng hoảng:*

* Lãi suất vào những năm 1990 thấp, dẫn đến hình thành nên "bong bóng bất động sản".
* Các "bong bóng bất động sản" được duy trì bởi các khoan vay dưới chuẩn. 
* Do nhu cầu thêm vốn cho vay, các ngân hàng đóng gói các khoản vay thành các [**MBS(1)**](note. Mortgage-Backed Securities) và sự đánh giá không đúng chuẩn của các công ty xếp hạng tín dụng.
* Sự cảm tính và tin tưởng của các nhà đầu tư vào tình hình kinh tế bất ổn.

*Cuộc khủng hoảng kinh tế bắt đầu như thế nào?*

Nhận thấy tình trạng lãi suất thấp, dẫn đến hình thành nên tình trạng tạm phát, chính phủ Mỹ đã quyết định gia tăng lãi suất nhằm kiềm chế lạm phát. Nhưng đó chính là quyết định đẩy cuộc khủng hoảng bắt đầu, việc tăng lãi suất đã dẫn đến vỡ nợ hàng loạt cùng sự bùng nổ của các bong bóng bất động sản.

Khi lãi suất tăng lên người dân, người mà còn nợ các khoản vay mua nhà không còn đủ điều kiện tài chính để chi trả cho các khoan vay, các khoản vay đồng loạt vỡ nợ, các ngân hàng buộc phải thu hồi căn nhà thế chấp để chi trả. Nhưng nhà thu về nhiều trong khi nhu cầu mua bất động sản giảm xuống do lãi suất tăng, lại kéo theo giá nhà giảm và người dân cảm thấy giá trị bất động sản không còn đủ động lực để tiếp tục trả các khoản vay. Khiến nên kinh tế trở thành 1 vòng lẩn quẩn, làm suy thoái nền kinh tế.

*Video tham khảo về cuộc khủng hoảng tài chính:*
[Khủng Hoảng Tài Chính 2008: Giải Thích Đơn Giản](https://www.youtube.com/watch?v=ptJBSM7TWFI)

---

**Giới thiệu về Kỹ thuật tài chính**

**Kỹ thuật tài chính** là một lĩnh vực liên ngành ứng dụng toán học, thống kê và khoa học máy tính vào tài chính, giải quyết một số vấn đề như tối ưu hóa danh mục đầu tư, quản lý rủi ro, mô hình hóa tài chính và xây dựng hệ thống/công cụ cho tài chính. Đặc biệt, tập trung nghiên cứu vào chứng khoán phái sinh bao gồm: Hợp đồng kỳ hạn, hợp đồng tương lai, quyền chọn,... 

**Chứng khoán phái sinh/Sản phẩm phái sinh**: là một dạng hợp đồng có giá trị được xác định từ giá trị của [**tài sản/biến cố cơ sở (2)**](note. Underlying assets/variables).

---

**Ứng dụng của [FE](note. Financial Engineering) trong định giá Chứng khoán Phái sinh & Quản lý rủi ro**

* Mô hình hóa và xác định mối quan hệ giữa giá trị của [**tài sản cơ sở (2)**](note. Underlying assets/variables) và sản phẩm phái sinh.

    *Giải thích:* Chứng khoán phái sinh có giá trị phụ thuộc và [**tài sản cơ sở (2)**](note. Underlying assets/variables), khi tài sản sở có biến động giá chứng khoán phái sinh cũng sẽ bị ảnh hưởng, do đó cần tính toán để tối ưu lợi nhuận, hạn chế rủi ro hoặc tạo ra các sản phẩm phái sinh theo yêu cầu.

* Để định giá, ta cần xây dựng mô hình động học (mô tả sự thay đổi theo thời gian) của [**tài sản cơ sở (2)**](note. Underlying assets/variables). Trong thực tế, các sản phẩm phái sinh có thể có cấu trúc phức tạp, nên mô hình cũng phải đủ linh hoạt để xử lý những yêu cầu đặc thù này theo từng khách hàng.

* Để phục vụ 2 mục tiêu chính:
    * Xác định giá trị hợp lý của hợp đồng phái sinh.
    * Quản lý rủi ro phát sinh khi nắm giữ hoặc giao dịch phái sinh.

*Phương pháp thực hiện*
* Ngôn ngữ lập trình: C/C++, Python, MATHLAB, R
* Mô hình toán: Xác suất
* Các phương pháp tính toán thường dùng: 
    * Binomial Tree (Cây nhị phân): Phương pháp rời rạc hóa diễn biến giá để tính giá phái sinh.
    * Solving PDEs (giải phương trình đạo hàm riêng): Một số mô hình dẫn đến PDE, như phương trình Black-Scholes.
    * Monte Carlo Simulation: Mô phỏng ngẫu nhiên nhiều kịch bản tương lai của tài sản để định giá.
    * Fast Fourier Transform (FFT): Dùng trong một số phương pháp định giá dựa trên đặc trưng Fourier của hàm sinh.

---

## Thực hành

[Lab 1: Đường trung bình động](assets/notebooks/convert/Dual_Moving_Average_Crossover.html)

---

## Chú thích về thuật ngữ

**(1).** *MBS*

**(2).** *Tài sản/biến số cơ sở (Underlying assets/variables)* có thể là cổ phiếu, hàng hóa, tỷ giá hối đoái hoặc lãi suất. Giá của chúng thường không cố định mà biến động theo thời gian.