# Quay lại commit cũ đã được push lên git
## Thao tác với nhánh main
1.  `git log` - xem các commit trước 
2.  `git reset --hard <commit_hash>` - reset code về nhánh cũ
3.  `git push origin main --force` - push code lên git

\* **Giải thích tham số**: `--hard`, `--soft`, `--force`
## Thao tác với nhánh