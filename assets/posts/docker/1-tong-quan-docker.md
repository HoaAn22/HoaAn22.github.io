# Tổng quan về Docker

## Chú thích (\*)

* LXC (Linux Containers) là một công nghệ ảo hóa mức hệ điều hành cho phép chạy nhiều hệ thống Linux biệt lập (container) trên một máy chủ vật lý duy nhất.

* Hệ thống tệp hợp nhất (union filesystem) là một hệ thống tệp cho phép kết hợp nhiều hệ thống tệp thành một hệ thống tệp duy nhất.

## Giới thiệu về Docker

![Docker](assets/images/docker/1-docker.png)

**Khái niệm**: Docker là một công cụ đóng gói ứng dụng cùng với tất cả các phần cần thiết để cho ứng dụng khởi chạy ổn định như cấu hình hệ thống, thư viện, môi trường,... Mục đích giúp cô lập ứng dụng không bị ảnh hưởng từ các xung đột hệ thống, dễ dàng vận chuyển, mở rộng và triển khai cho môi trường sản xuất `[1]`. 

**Sự Ra Đời của Docker** `[2]`

Docker được tạo ra bởi Solomon Hykes vào năm 2013, ban đầu là một phần của dotCloud, một công ty cung cấp nền tảng dịch vụ (PaaS). Mục tiêu của dotCloud là xây dựng một PaaS không phụ thuộc vào ngôn ngữ lập trình, khác biệt với các PaaS hiện có lúc bấy giờ, thường bị ràng buộc với một số ngôn ngữ nhất định.

Docker, lúc đầu, chỉ đơn giản là một lớp bao bọc xung quanh **LXC(\*)** kết hợp với hệ thống tệp hợp nhất. Tuy nhiên, tốc độ phát triển và mức độ phổ biến của nó tăng nhanh chóng mặt. Chỉ trong vòng 6 tháng, Docker đã thu hút hơn 6,700 lượt đánh dấu sao trên GitHub và có sự đóng góp từ 175 người không phải là nhân viên.

Sự thành công này đã thúc đẩy dotCloud đổi tên thành Docker, Inc. và thay đổi mô hình kinh doanh, tập trung vào việc phát triển Docker. Phiên bản Docker 1.0 được công bố vào tháng 6 năm 2014, chỉ 15 tháng sau phiên bản 0.1, đánh dấu một bước tiến lớn về tính ổn định và độ tin cậy, đủ để được tuyên bố là "sẵn sàng cho sản xuất". Cùng lúc đó, Docker bắt đầu chuyển hướng phát triển thành một nền tảng hoàn chỉnh thay vì chỉ là một công cụ container, với việc ra mắt Docker Hub, kho lưu trữ công cộng dành cho container.

Sự ra đời của Docker đã cách mạng hóa cách thức phát triển và triển khai phần mềm, biến container Linux từ một công nghệ ít được biết đến thành một công cụ phổ biến rộng rãi.

**Vì sao Docker được yêu thích ?**

**Ưu điểm sử dụng Docker**
* **Đóng gói ứng dụng và các phần cành thiết thành 1 Image duy nhất**: Docker cho phép đóng gói ứng dụng cùng các phần cần thiết để hệ thống chạy ổn định vào một Image duy nhất, đảm bảo ứng dụng chạy được trên mọi máy với môi trường nhất quán đã được thiết lập. Đảm bảo tính ổn định của ứng dụng từ máy của người phát triển đến máy khách mà không gặp các vấn đề về xung đột.`[1]` `[2]` `[3]`
* **Dễ dàng di chuyển**: Docker Image có tính di động cao, dễ dàng di chuyển và chạy trên bất kỳ máy nào có cài đặt Docker, kiến cho việc triển khai hệ thống trên nhiều môi trường khác nhau dễ dàng và không gặp xung đột.`[1]` `[2]` `[3]`
* **Xây dựng hệ thống/ứng dụng hiệu quả**: Docker cung cấp các công cụ mạnh mẽ trong việc xây dựng, kiểm tra và triển khai hệ thống thông qua *dockerfile* và *docker-compose*.
	* **dockerfile**: định nghĩa các bước để xây dựng một Image
	* **docker-compose**: cho phép xây dựng và quản lý nhiều Docker Container
* **Hiệu suất cao**: Docker Container khởi chạy nhanh và chiếm ít tài nguyên hơn so với khởi chạy máy ảo.
* **Dễ dàng mở rộng**: 
* **Tính bảo mật**:

**Vai trò của Docker đến dự án (Đồ án tốt nghiệp)**: Cùng với với những lợi ích trên khi sử dụng Docker trong việc xây dựng hệ thống, Docker cũng là một phần quan trọng của đồ án, vì Airflow không chính thức hỗ trợ hoàn toàn cho Windows do Airflow được phát triển tập trung hỗ trợ cho Linux, trong khi dự án được thực hiện chủ yếu trên nền tảng Windows. Do đó khi sử dụng Docker, nó sẽ chạy thông qua WSL2 (Windows Subsystem for Linux 2) giải quyết được vấn đề về hệ điều, đảm bảo môi trường tương thích cho hệ thống Aiflow.

## Tìm hiểu xây dựng hệ thống Docker

### Khái niệm chính trong Docker

**Container**:  là một đơn vị độc lập, có thể hiểu là một ứng ụng được khởi chạy với các phần đóng gói cần thiết, được chạy từ Image. 

**Image**: Là một mẫu (template) chỉ đọc chứa tất cả những gì cần thiết để chạy một container, bao gồm code, runtime, libraries, biến môi trường, file cấu hình,... Image là nền tảng để tạo ra container.

**dockerfile**: Là một file văn bản chứa tập hợp các lệnh để xây dựng một Docker image. Dockerfile cho phép bạn xác định chính xác cách mà container sẽ được xây dựng từ một image.

**docker-compose**: Là một công cụ cho phép định nghĩa và quản lý nhiều container như một dịch vụ duy nhất thông qua file `docker-compose.yml`. File này chứa cấu hình cho các container, network, và volume mà chúng sử dụng, giúp bạn dễ dàng quản lý và triển khai các ứng dụng phức tạp

### Công cụ hỗ trợ xây dựng 

**Docker Hub**: Là một registry công cộng của Docker, nơi lưu trữ và chia sẻ các Docker images. Bạn có thể tải các image lên hoặc tải về từ Docker Hub. Docker Hub là nơi mà các lập trình viên chia sẻ các image phổ biến.

**Docker Swarm**: Là một công cụ quản lý container (orchestrator) của Docker cho phép triển khai và quản lý các container trên nhiều máy chủ (cluster). Docker Swarm cung cấp các tính năng như load balancing và scale container dễ dàng.

### Cấu trúc hệ thống Docker

**Cấu trúc khởi chạy dockerdocker**

**Thành phần trong hệ thống docker**

## Tổng hợp lệnh Docker cơ bản

## Tài liệu tham khảo
[1] O'Reilly - Docker: Up and Running

[2] O'Reilly - Using Docker

[3] O'Reilly - Docker Cookbook

## Nguồn ảnh
[1]

Những người đóng góp vào các dự án Wikimedia, “Docker (phần mềm),” _Wikipedia.org_, Nov. 02, 2016. https://vi.wikipedia.org/wiki/Docker_(ph%E1%BA%A7n_m%E1%BB%81m) (accessed Oct. 23, 2024).