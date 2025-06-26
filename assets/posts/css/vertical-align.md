# `vertical-align` trong CSS

Thuộc tính `vertical-align` trong CSS được dùng để **canh chỉnh vị trí theo chiều dọc** của các phần tử **inline** hoặc **inline-block** (như `span`, `img`, `a`, `input`...) so với dòng chữ chứa nó. Đây là thuộc tính thường được dùng để tạo hiệu ứng **chỉ số trên** (superscript), **chỉ số dưới** (subscript), hoặc **căn giữa hình ảnh nhỏ với văn bản**.

<br>
| Giá trị             | Ý nghĩa mô tả                                                                 |
|---------------------|-------------------------------------------------------------------------------|
| `baseline`          | Mặc định. Căn phần tử theo **đường cơ sở** (baseline) của dòng văn bản cha.   |
| `top`               | Căn đỉnh phần tử với đỉnh dòng cao nhất trong hàng.                          |
| `middle`            | Căn giữa phần tử theo chiều cao dòng (thường dùng để căn giữa hình ảnh nhỏ). |
| `bottom`            | Căn đáy phần tử với đáy dòng hiện tại.                                       |
| `text-top`          | Căn phần tử với **đỉnh của font chữ** dòng cha.                              |
| `text-bottom`       | Căn phần tử với **đáy của font chữ** dòng cha.                               |
| `sub`               | Dịch phần tử xuống dưới, dùng cho **chỉ số dưới** (ví dụ H₂O).               |
| `super`             | Dịch phần tử lên trên, dùng cho **chỉ số trên** (ví dụ x², [1]).             |
| `<length>` (vd: `5px`) | Dịch chuyển phần tử theo chiều dọc một **khoảng cụ thể** (dùng đơn vị như `px`, `em`). |
| `<percentage>`      | Dịch chuyển phần tử theo **tỉ lệ chiều cao dòng** (ít dùng).                |