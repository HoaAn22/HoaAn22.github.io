# Pull code
## Pull code không cần giữ lại code trong local
1. Dùng lệnh `git reset --hard HEAD^` - reset code trở về nhánh hiện tại đã pull trong local
2. Dùng lệnh `git pull origin main` - pull code mới nhất về máy

## Pull code giữ lại code trong máy

**C1: Lưu thay đổi bằng commit**

---
**C2: Lưu thay đổi tạm thời trong máy Stash**
1. `git stash` lưu code máy lại
2. git pull - pull code mới nhất về máy
3. git stash 