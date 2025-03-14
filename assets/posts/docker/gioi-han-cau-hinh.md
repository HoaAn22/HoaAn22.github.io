# Giới hạn cấu hình Container Docker

Khi sử dụng docker, CPU và Ram sẽ được chia sẻ tự động theo cấu hình máy, khi khởi chạy container khi không được giới hạn, nó sẽ sử dụng hết cấu hình được cấp gây quá tải cho máy.

`docker info` - Xem cấu hình được cấp cho Docker

## Giới hạn cấu hình khi sử dụng docker-compose
1. `docker stats` - Kiểm tra mức sử dụng CPU và Ram của Container
2. Để giới hạn, thêm mục **deploy** - **resources**, với **limits** là giới hạn cấu hình khi sử dụng, **reservations** là mục dự phòng khi container cần thêm cấu hình ![Docker](assets/images/docker/gioi-han-cau-hinh.png)

## Giới hạn cấu hình khi dùng lệnh run docker

```python
docker run --name <container_name> --cpus=1 --memory=1024m <image>
hoặc
docker run --name <container_name> --cpus=1 --m 1024m <image>
```

**container_name**: là tên tự đặt để quản lý trong docker destop

**image**: là image muốn khởi chạy

## Sự khác nhau khi dùng docker-compose và docker run
