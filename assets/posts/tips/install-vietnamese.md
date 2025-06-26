# Cài đặt tiếng Việt cho Windows Single Language

1. Vào [#Microsoft Store] tải [#Tiếng Việt gói trải nghiệm cục bộ]
![Tiếng Việt gói trải nghiệm cục bộ](assets/images/tips/1-install-vietnamese.png)

2. Sau đó vào [#Setting] → [#Time & Language] → [#Language & region] → [#Add a language] thêm Tiếng Việt và đặt tiếng Việt thành ngôn ngữ hiển thị.

---

Lệnh `Get-WinUserLanguageList`, xem chi tiết các ngôn ngữ được cài trong máy (PowerShell)

**Lọc danh sách các ngôn ngữ, loại bỏ tiếng Việt**
```bash
$LangList = Get-WinUserLanguageList
$NewLangList = $LangList | Where-Object { $_.LanguageTag -ne "vi" }
Set-WinUserLanguageList $NewLangList -Force
```

**Xóa bàn phím mặc định đi kèm theo ngôn ngữ nếu không sử dụng**
```bash
$languages = Get-WinUserLanguageList
foreach ($lang in $languages) {
    $lang.InputMethodTips.Clear()
    $lang.InputMethodTips.Add("0409:00000409")
}
Set-WinUserLanguageList $languages -Force
```