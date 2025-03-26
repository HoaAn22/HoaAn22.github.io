import os
import re
import json
import hashlib

def slugify(text):
    """
    Chuyển đổi tiêu đề thành slug thân thiện với URL
    """
    # Loại bỏ dấu và chuyển sang chữ thường
    text = re.sub(r'[àáạảãâầấậẩẫăằắặẳẵ]', 'a', text)
    text = re.sub(r'[èéẹẻẽêềếệểễ]', 'e', text)
    text = re.sub(r'[ìíịỉĩ]', 'i', text)
    text = re.sub(r'[òóọỏõôồốộổỗơờớợởỡ]', 'o', text)
    text = re.sub(r'[ùúụủũưừứựửữ]', 'u', text)
    text = re.sub(r'[ỳýỵỷỹ]', 'y', text)
    text = re.sub(r'[đ]', 'd', text)
    
    # Loại bỏ các ký tự không phải chữ cái, số
    text = re.sub(r'[^a-z0-9\s-]', '', text.lower())
    
    # Thay thế khoảng trắng bằng dấu gạch ngang
    text = re.sub(r'\s+', '-', text).strip('-')
    
    return text

def generate_dropdown_menu(markdown_dir):
    """
    Tạo dropdown menu từ các file Markdown
    """
    # Đường dẫn đến file log và HTML
    log_path = os.path.join(markdown_dir, 'dropdown_menu_log.json')
    html_path = 'dropdown-menu.html'
    
    # Đọc log các file đã xử lý
    processed_files = set()
    if os.path.exists(log_path):
        with open(log_path, 'r', encoding='utf-8') as f:
            processed_files = set(json.load(f))
    
    # Danh sách file mới
    new_files = []
    
    # Duyệt các file Markdown
    for filename in os.listdir(markdown_dir):
        if filename.endswith('.md'):
            filepath = os.path.join(markdown_dir, filename)
            
            # Tính hash file
            with open(filepath, 'rb') as f:
                file_hash = hashlib.md5(f.read()).hexdigest()
            
            # Kiểm tra file đã xử lý chưa
            if file_hash in processed_files:
                continue
            
            # Đọc tiêu đề từ file
            with open(filepath, 'r', encoding='utf-8') as f:
                first_line = f.readline().strip('# \n')
            
            # Tạo slug
            slug = slugify(first_line)
            
            # Thêm file vào danh sách
            new_files.append({
                'title': first_line,
                'filename': filename,
                'slug': slug,
                'hash': file_hash
            })
            
            # Thêm hash vào tập đã xử lý
            processed_files.add(file_hash)
    
    # Nếu không có file mới, kết thúc
    if not new_files:
        print("Không có file mới để xử lý.")
        return
    
    # Đọc nội dung HTML gốc
    with open('dropdown-menu.html', 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Tạo nội dung dropdown
    dropdown_content = '\n'.join([
        f'<a href="#" onclick="loadMarkdownFile(\'assets/posts/notebook/{file["filename"]}\')">{file["title"]}</a>'
        for file in new_files
    ])
    
    # Thay thế nội dung dropdown
    html_content = html_content.replace(
        '<div class="auto-posts">\n            \n</div>', 
        f'<div class="auto-posts">\n            {dropdown_content}\n</div>'
    )
    
    # Ghi lại file HTML
    with open('dropdown-menu.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    # Cập nhật log
    with open(log_path, 'w', encoding='utf-8') as f:
        json.dump(list(processed_files), f)
    
    print(f"Đã thêm {len(new_files)} file mới vào dropdown menu.")

def main():
    markdown_dir = "assets/notebook/converted"
    
    if not os.path.isdir(markdown_dir):
        print("Đường dẫn thư mục không hợp lệ!")
        return
    
    generate_dropdown_menu(markdown_dir)

if __name__ == "__main__":
    main()