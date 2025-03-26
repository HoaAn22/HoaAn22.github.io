# import os
# import nbformat
# from nbconvert import MarkdownExporter

# def convert(directory):
#     """Chuyển đổi tất cả các file .ipynb trong thư mục thành .md nếu chưa được chuyển đổi."""
#     # Đảm bảo thư mục đầu ra tồn tại
#     output_dir = os.path.join(directory, "converted")
#     os.makedirs(output_dir, exist_ok=True)
    
#     # Duyệt qua tất cả các file trong thư mục
#     for file in os.listdir(directory):
#         if file.endswith(".ipynb"):
#             ipynb_path = os.path.join(directory, file)
#             md_path = os.path.join(output_dir, file.replace(".ipynb", ".md"))
            
#             # Kiểm tra nếu file .md đã tồn tại thì bỏ qua
#             if os.path.exists(md_path):
#                 print(f"Bỏ qua (đã tồn tại): {file}")
#                 continue
            
#             # Đọc nội dung notebook
#             with open(ipynb_path, "r", encoding="utf-8") as f:
#                 notebook = nbformat.read(f, as_version=4)
            
#             # Chuyển đổi sang Markdown
#             exporter = MarkdownExporter()
#             body, _ = exporter.from_notebook_node(notebook)
            
#             # Lưu vào file .md
#             with open(md_path, "w", encoding="utf-8") as f:
#                 f.write(body)
            
#             print(f"Chuyển đổi thành công: {file} -> {md_path}")

# if __name__ == "__main__":
#     path = "assets/notebook/"
#     convert(path)


# import os
# import json

# def convert_ipynb_to_pure_markdown(input_dir):
#     """
#     Chuyển đổi Jupyter Notebook (.ipynb) sang Markdown thuần
    
#     Args:
#         input_dir (str): Đường dẫn đến thư mục chứa các file .ipynb
#     """
#     # Tạo thư mục output nếu chưa tồn tại
#     output_dir = os.path.join(input_dir, 'pure_markdown_output')
#     os.makedirs(output_dir, exist_ok=True)
    
#     # Duyệt qua tất cả các file trong thư mục
#     for filename in os.listdir(input_dir):
#         if filename.endswith('.ipynb'):
#             input_path = os.path.join(input_dir, filename)
            
#             try:
#                 # Đọc nội dung file Jupyter Notebook
#                 with open(input_path, 'r', encoding='utf-8') as f:
#                     notebook = json.load(f)
                
#                 # Tạo nội dung Markdown
#                 markdown_content = []
                
#                 for cell in notebook['cells']:
#                     if cell['cell_type'] == 'markdown':
#                         # Markdown cell: trực tiếp thêm nội dung
#                         markdown_content.extend(cell['source'])
                    
#                     elif cell['cell_type'] == 'code':
#                         # Code cell: thêm dưới dạng code block
#                         markdown_content.append('\n```python\n')
#                         markdown_content.extend(cell['source'])
#                         markdown_content.append('\n```\n')
                
#                 # Tạo tên file output
#                 output_filename = os.path.splitext(filename)[0] + '.md'
#                 output_path = os.path.join(output_dir, output_filename)
                
#                 # Ghi file Markdown
#                 with open(output_path, 'w', encoding='utf-8') as f:
#                     f.writelines(markdown_content)
                
#                 print(f'Đã chuyển đổi: {filename} -> {output_filename}')
            
#             except Exception as e:
#                 print(f'Lỗi khi chuyển đổi {filename}: {e}')

# def main():
#     # Nhập đường dẫn thư mục từ người dùng
#     input_dir = "assets/notebook/"
    
#     # Kiểm tra thư mục có tồn tại không
#     if not os.path.isdir(input_dir):
#         print("Đường dẫn thư mục không hợp lệ!")
#         return
    
#     # Gọi hàm chuyển đổi
#     convert_ipynb_to_pure_markdown(input_dir)
#     print("\nĐã hoàn tất chuyển đổi tất cả các file Jupyter Notebook sang Markdown thuần!")

# if __name__ == "__main__":
#     main()

import os
import json
import hashlib

def calculate_file_hash(filepath):
    """
    Tính toán hash của file để xác định sự thay đổi
    
    Args:
        filepath (str): Đường dẫn đến file
    
    Returns:
        str: Mã hash của file
    """
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def convert_ipynb_to_pure_markdown(input_dir):
    """
    Chuyển đổi Jupyter Notebook (.ipynb) sang Markdown thuần
    
    Args:
        input_dir (str): Đường dẫn đến thư mục chứa các file .ipynb
    """
    # Tạo thư mục output nếu chưa tồn tại
    output_dir = os.path.join(input_dir, 'converted')
    os.makedirs(output_dir, exist_ok=True)
    
    # Tạo file để lưu thông tin hash của các file đã chuyển đổi
    hash_log_path = os.path.join(output_dir, 'converted_files_hash.log')
    
    # Đọc các hash đã chuyển đổi trước đó (nếu có)
    converted_hashes = set()
    if os.path.exists(hash_log_path):
        with open(hash_log_path, 'r', encoding='utf-8') as f:
            converted_hashes = set(f.read().splitlines())
    
    # Mở file log hash để ghi (chế độ append)
    with open(hash_log_path, 'a', encoding='utf-8') as hash_log:
        # Duyệt qua tất cả các file trong thư mục
        for filename in os.listdir(input_dir):
            if filename.endswith('.ipynb'):
                input_path = os.path.join(input_dir, filename)
                
                try:
                    # Tính hash của file
                    file_hash = calculate_file_hash(input_path)
                    
                    # Kiểm tra nếu file đã được chuyển đổi trước đó
                    if file_hash in converted_hashes:
                        print(f'Bỏ qua: {filename} (đã chuyển đổi trước đó)')
                        continue
                    
                    # Đọc nội dung file Jupyter Notebook
                    with open(input_path, 'r', encoding='utf-8') as f:
                        notebook = json.load(f)
                    
                    # Tạo nội dung Markdown
                    markdown_content = []
                    
                    for cell in notebook['cells']:
                        if cell['cell_type'] == 'markdown':
                            # Markdown cell: trực tiếp thêm nội dung
                            markdown_content.extend(cell['source'])
                        
                        elif cell['cell_type'] == 'code':
                            # Code cell: thêm dưới dạng code block
                            markdown_content.append('\n```python\n')
                            markdown_content.extend(cell['source'])
                            markdown_content.append('\n```\n')
                    
                    # Tạo tên file output
                    output_filename = os.path.splitext(filename)[0] + '.md'
                    output_path = os.path.join(output_dir, output_filename)
                    
                    # Ghi file Markdown
                    with open(output_path, 'w', encoding='utf-8') as f:
                        f.writelines(markdown_content)
                    
                    # Ghi hash của file vào log
                    hash_log.write(f'{file_hash}\n')
                    hash_log.flush()  # Đảm bảo hash được ghi ngay lập tức
                    
                    print(f'Đã chuyển đổi: {filename} -> {output_filename}')
                
                except Exception as e:
                    print(f'Lỗi khi chuyển đổi {filename}: {e}')

def main():
    # Nhập đường dẫn thư mục từ người dùng
    input_dir = "assets/notebook/"
    
    # Kiểm tra thư mục có tồn tại không
    if not os.path.isdir(input_dir):
        print("Đường dẫn thư mục không hợp lệ!")
        return
    
    # Gọi hàm chuyển đổi
    convert_ipynb_to_pure_markdown(input_dir)
    print("\nĐã hoàn tất chuyển đổi tất cả các file Jupyter Notebook sang Markdown thuần!")

if __name__ == "__main__":
    main()