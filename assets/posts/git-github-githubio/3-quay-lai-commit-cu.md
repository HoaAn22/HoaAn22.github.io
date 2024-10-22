# Quay lại commit cũ đã được push lên git
## Thao tác với main
1.  `git log` - xem các commit trước ![git log](assets/images/git/3-git-log.png)
2.  `git reset --hard <commit_hash>` - reset code về nhánh cũ ![git reset](assets/images/git/3-git-reset.png)
3.  `git push origin main --force` - push code lên git

\* **Giải thích tham số**: `--hard`, `--soft`, `--force`
## Thao tác với nhánh