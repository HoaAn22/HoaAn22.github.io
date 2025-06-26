# Quay lại commit cũ đã được push lên git
## Thao tác với nhánh main
1.  `git log` - xem các commit trước 
2.  `git reset --hard <commit_hash>` - reset code về nhánh cũ
3.  `git push origin main --force` - push code lên git

\* **Giải thích tham số**: `--hard`, `--soft`, `--force`

Hoặc có thể dùng lệnh  `git reset --hard HEAD^` để reset về trước commit hiện tại \\(\to \\)  dùng `git push origin main --force` - push code lên github

`HEAD` - commit hiện tại, `HEAD~1` = `HEAD^`

*Muốn quay về nhiều commit có thể dùng `HEAD~2`* - commit về 2 bước
## Thao tác với nhán