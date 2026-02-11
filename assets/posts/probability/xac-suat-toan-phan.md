## Quy tắc: Xác suất toàn phần

Tình huống dẫn nhập:  
\- Một sự kiện có thể diễn ra theo nhiều cách  
\- Có nhiều phương tiện để từ nhà đến trường (xe buýt, xe máy, grab, đi bộ,...).  
\- Không quan tâm đi bằng phương tiện nào? Chỉ muốn tính được xác suất đến đúng giờ? Đây chính là xác suất toàn phần.

Ý TƯỞNG CỐT LÕI:  
***XÁC SUẤT CẦN TÍNH = TỔNG XÁC SUẤT TẤT CẢ CÁC CÁCH  ĐỂ ĐẠT ĐƯỢC KẾT QUẢ.***

---

*Ví dụ (tư duy):*

Giả sử: Bạn hay đến trường bằng xe máy và xe buýt. 
- Khoảng 70% thời gian bạn chạy xe máy và tỉ lệ đến trường đúng giờ là 90%.
- 30% thời gian còn lại bạn đi xe buýt và chỉ đến đúng giờ 60%.
- Xác suất đến trường đúng giờ lúc này chính là **XÁC SUẤT TOÀN PHẦN**.

Xác xuất đến trường đúng giờ = $0.7 * 0.9$ *(đi xe máy)* + $0.3 * 0.6$ *(đi xe buýt)*

---

Bây giờ hãy thay các kí hiệu toán học, nó sẽ ra được công thức của **XÁC SUẤT TOÀN PHẦN**

Gọi các sự kiện:
- H1: đi xe máy
- H2: đi xe buýt
- X: đến đúng giờ

Khi đó ta sẽ có:
- P(H1) = 0,7 *(xác suất đi bằng xe máy)*
- P(H2) = 0,3 *(xác suất đi bằng xe buýt)*

***ĐÂY LÀ CHỖ KHIẾN NHIỀU NGƯỜI BỐI RỐI***
- P(C|H1) = 0.9 *(Đọc ngược lại, xác suất đến đúng giờ [C] khi đi bằng xe máy [H1])*
- P(C|H2) = 0.6 *(Đọc ngược lại, xác suất đến đúng giờ [C] khi đi bằng xe buýt [H2])*

Thay vào ta được công thức:
$$P(C) = P(C|H1)*P(H1) + P(C|H2)*P(H2)$$