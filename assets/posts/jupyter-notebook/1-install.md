## Jupyter Notebook

Notebook (hay Jupyter Notebook) là một môi trường làm việc tương tác, cho phép kết hợp:
- mã code Python
- văn bản Markdown
- công thức toán học
- biểu đồ trực quan 
- kết quả khi chạy code,...  Trong một file [#.ipynb] duy nhất.

*Notebook không chỉ là nơi để thực hiện code đơn thuần, mà là nơi trình bày và thể hiện tư duy, insight. Đặc biệt quan trọng đối với một nhà khoa học dữ liệu.*

## Notebook khác gì so với file [#.py] bình thường?

Khác với lập trình Python truyền thống [#.py], thường dùng để xây dựng ứng dụng và dự án. 

Notebook lại được thiết kế chia thành cell, mỗi cell có thể chạy độc lập. Mặc dù, không thích hợp để xây dựng ứng dụng, nhưng cực kì hữu ích khi muốn thử nghiệm, phân tích và trình bày insight. Điểm chung của [#.py] và [#.ipynb] là hỗ trợ nhiều thư viện tối ưu cho nhiều mục đích công việc khác nhau.

Lĩnh vực dữ liệu và trí tuệ nhân tạo nói chung, ngành Khoa học Dữ liệu nói riêng, thường xuyên cần khám phá dữ liệu, kiểm tra giả thuyết, tối ưu hóa mô hình, trực quan và xây dựng mô hình máy học,... Vì thế Notebook trở thành một công cụ tuyệt vời cho những người làm trong lĩnh vực trên.

## Giới thiệu Công cụ chạy Notebook

Một số công cụ làm việc với Notebook:

- Jupyter Notebook
- Jupyter Lab
- Google Colab

## Cách cài đặt Jupyter lab

1. Cài đặt ngôn ngữ Python: [Python.org](https://www.python.org/downloads/windows/) 

*Lưu ý: khi cài đặt cần tick chọn vào "Add to PATH"*

2. Mở [#CMD] và gõ lệnh `pip install jupyterlab`
![CMD](assets/posts/jupyter-notebook/images/1-cmd.png)

3. Sau khi cài đặt xong gõ lệnh `where jupyter-lab`, để tìm đường dẫn của ứng dụng.
![where-path](assets/posts/jupyter-notebook/images/1-where-path.png)

4. Để mở nhanh Jupyter Lab, bạn có thể tạo shortcut bằng cách, chọn `chuột phải → shortcut`
![alt text](assets/posts/jupyter-notebook/images/1-shortcut-1.png)

5. Dán đường link ở [#Bước 3] vào ô [# Type the location of the item]
![alt text](assets/posts/jupyter-notebook/images/1-shortcut-2.png)

6. Sau khi tạo xong shortcut, có thể cấu hình để cho Jupyer lab mở vào workspace bằng cách, mở [#Properties] và điền vị trí [#Workspace] vào `Start in`
![alt text](assets/posts/jupyter-notebook/images/1-shortcut-3.png)
---
![alt text](assets/posts/jupyter-notebook/images/1-shortcut-4.png)