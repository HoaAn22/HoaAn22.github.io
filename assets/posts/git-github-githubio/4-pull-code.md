# Pull code
## Pull code không cần giữ lại code trong local
1. Dùng lệnh `git reset --hard HEAD^` - reset code trở về nhánh hiện tại đã pull trong local
2. Dùng lệnh `git pull origin main` - pull code mới nhất về máy

## Pull code giữ lại code trong máy

**C1: Lưu thay đổi bằng commit**

---
**C2: Lưu thay đổi tạm thời trong máy Stash**
1. `git stash` - lưu code máy tạm thời
2. `git pull origin main` - pull code từ nhánh chính về máy
3. `git stash pop` áp dụng bảng lưu gần nhất vào code local và sẽ xóa bản lưu - `git stash apply` nếu muốn áp dụng bản lưu nhưng vẫn giữ thì dùng lệnh này
4. Xử lý các file bị trùng lặp, bằng lệnh `git add .`
5. Commit và Push code