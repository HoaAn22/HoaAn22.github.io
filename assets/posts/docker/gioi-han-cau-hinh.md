# Giới hạn cấu hình Container Docker

`docker info` - Xem cấu hình được cấp cho Docker

## Giới hạn cấu hình khi sử dụng docker-compose
1. `docker stats` - Kiểm tra mức sử dụng CPU và Ram của Container
2. Để giới hạn, thêm mục **deploy** - **resources**, với **limits** là giới hạn cấu hình khi sử dụng, **reservations** là mục dự phòng khi container cần thêm cấu hình ![Docker](assets/images/docker/gioi-han-cau-hinh.png)