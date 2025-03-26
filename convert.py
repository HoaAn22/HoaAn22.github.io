import os
import json
import hashlib
import subprocess

def calculate_file_hash(filepath):
    """
    Tính toán hash của file để xác định sự thay đổi.
    """
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def convert_ipynb_to_html(input_dir, output_dir):
    """
    Chuyển đổi tất cả các file Jupyter Notebook (.ipynb) trong thư mục sang HTML.
    """
    os.makedirs(output_dir, exist_ok=True)
    hash_log_path = os.path.join(output_dir, 'idConvert.log')
    
    # Đọc danh sách hash đã chuyển đổi trước đó
    converted_hashes = set()
    if os.path.exists(hash_log_path):
        with open(hash_log_path, 'r', encoding='utf-8') as f:
            converted_hashes = set(f.read().splitlines())
    
    with open(hash_log_path, 'a', encoding='utf-8') as hash_log:
        for filename in os.listdir(input_dir):
            if filename.endswith('.ipynb'):
                input_path = os.path.join(input_dir, filename)
                file_hash = calculate_file_hash(input_path)
                
                if file_hash in converted_hashes:
                    print(f'Bỏ qua: {filename} (đã chuyển đổi trước đó)')
                    continue
                
                try:
                    # Chuyển đổi sang HTML
                    subprocess.run([
                        'python', '-m', 'jupyter', 'nbconvert', '--to', 'html',
                        '--output-dir', output_dir, input_path
                    ], check=True)
                    
                    # Lưu hash vào log
                    hash_log.write(f'{file_hash}\n')
                    hash_log.flush()
                    print(f'Đã chuyển đổi: {filename} -> HTML')
                except Exception as e:
                    print(f'Lỗi khi chuyển đổi {filename}: {e}')

def main():
    input_dir = "assets/notebooks"
    output_dir = "assets/convert"
    
    if not os.path.isdir(input_dir):
        print("Thư mục đầu vào không tồn tại!")
        return
    
    convert_ipynb_to_html(input_dir, output_dir)
    print("\nĐã hoàn tất chuyển đổi tất cả các file Jupyter Notebook sang HTML!")

if __name__ == "__main__":
    main()