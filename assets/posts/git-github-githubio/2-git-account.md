# Cấu hình tài khoản git

## Kiểm tra tài khoản có trong máy

git config --global --list

## Thiết lập tài khoản

**Thêm tài khoản**  
git config --global user.name "[name](note. Tên tài khoản github)"  
git config --global user.email "[email](note. email liên kết với tài khoản github)"

**Xóa tài khoản**  
git config --global --unset user.name "[name](note. Tên tài khoản github)"  
git config --global --unset user.email "[email](note. email liên kết với tài khoản github)"

---

**Lưu ý: Email được thiết lập là email ẩn danh được github tạo, để xem vào [#Setting] $\to$ [#Email], xem trong mục [#Keep my email addresses private]**