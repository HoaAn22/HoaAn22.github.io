## Giải thích một số thuật ngữ trong bài (\*)

* LXC (Linux Containers) là một công nghệ ảo hóa mức hệ điều hành cho phép chạy nhiều hệ thống Linux biệt lập (container) trên một máy chủ vật lý duy nhất.

* Hệ thống tệp hợp nhất (union filesystem) là một hệ thống tệp cho phép kết hợp nhiều hệ thống tệp thành một hệ thống tệp duy nhất.

## Giới thiệu về Docker

![Docker](assets/images/docker/1-docker.png)

**Khái niệm**: Docker là một công cụ đóng gói ứng dụng cùng với tất cả các phần cần thiết để cho ứng dụng khởi chạy ổn định như cấu hình hệ thống, thư viện, môi trường,... Mục đích giúp cô lập ứng dụng không bị ảnh hưởng từ các xung đột hệ thống, dễ dàng vận chuyển, mở rộng và triển khai cho môi trường sản xuất `[1 - O'Reilly - Docker: Up and Running]`. 

**Sự Ra Đời của Docker** `[2 - O'Reilly - Using Docker]`

Docker được tạo ra bởi Solomon Hykes vào năm 2013, ban đầu là một phần của dotCloud, một công ty cung cấp nền tảng dịch vụ (PaaS). Mục tiêu của dotCloud là xây dựng một PaaS không phụ thuộc vào ngôn ngữ lập trình, khác biệt với các PaaS hiện có lúc bấy giờ, thường bị ràng buộc với một số ngôn ngữ nhất định.

Docker, lúc đầu, chỉ đơn giản là một lớp bao bọc xung quanh **LXC (\*)** kết hợp với hệ thống tệp hợp nhất. Tuy nhiên, tốc độ phát triển và mức độ phổ biến của nó tăng nhanh chóng mặt. Chỉ trong vòng 6 tháng, Docker đã thu hút hơn 6,700 lượt đánh dấu sao trên GitHub và có sự đóng góp từ 175 người không phải là nhân viên.

Sự thành công này đã thúc đẩy dotCloud đổi tên thành Docker, Inc. và thay đổi mô hình kinh doanh, tập trung vào việc phát triển Docker. Phiên bản Docker 1.0 được công bố vào tháng 6 năm 2014, chỉ 15 tháng sau phiên bản 0.1, đánh dấu một bước tiến lớn về tính ổn định và độ tin cậy, đủ để được tuyên bố là "sẵn sàng cho sản xuất". Cùng lúc đó, Docker bắt đầu chuyển hướng phát triển thành một nền tảng hoàn chỉnh thay vì chỉ là một công cụ container, với việc ra mắt Docker Hub, kho lưu trữ công cộng dành cho container.

Sự ra đời của Docker đã cách mạng hóa cách thức phát triển và triển khai phần mềm, biến container Linux từ một công nghệ ít được biết đến thành một công cụ phổ biến rộng rãi.

**Vì sao Docker được sử dụng rộng rãi và yêu thích**?

Docker mang đến nhiều lợi ích:
* **Đơn giản hóa quá trình phát triển và triển khai**
* **Đóng gói ứng dụng và các phần cành thiết thành 1 Image duy nhất**: Docker cho phép đóng gói ứng dụng cùng các phần cần thiết để hệ thống chạy ổn định vào một Image duy nhất, đảm bảo ứng dụng chạy được trên mọi máy với môi trường nhất quán đã được thiết lập. Đảm bảo tính ổn định của ứng dụng từ máy của người phát triển đến máy khách mà không gặp các vấn đề về xung đột.
* Dễ dàng di chuyển

**Vai trò của Docker đến dự án (Đồ án tốt nghiệp)**:
* Đảm bảo tính ổn định cho hệ thống
* Dễ dàng mở rộng
* Hỗ trợ xây dựng hệ thống Airflow trên hệ điều hành windows
## Cách thành phần chính khi xây dựng Docker

## Tổng hợp một số lệnh Docker cơ bản

## Tài liệu tham khảo

## Nguồn ảnh
[1]

Những người đóng góp vào các dự án Wikimedia, “Docker (phần mềm),” _Wikipedia.org_, Nov. 02, 2016. https://vi.wikipedia.org/wiki/Docker_(ph%E1%BA%A7n_m%E1%BB%81m) (accessed Oct. 23, 2024).

‌