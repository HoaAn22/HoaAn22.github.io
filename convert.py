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

def convert_ipynb_to_html(input_dir, output_dir, overwrite=False):
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
                    if not overwrite:
                        print(f'file {filename} (Đã được chuyển đổi trước đó) - Không ghi đè')
                        print('---')
                        continue
                    else:
                        print(f'file {filename} (Đã được chuyển đổi trước đó) - Ghi đè')
                
                try:
                    # Chuyển đổi sang HTML
                    subprocess.run([
                        'python', '-m', 'jupyter', 'nbconvert', '--to', 'html',
                        '--output-dir', output_dir, input_path
                    ], check=True)
                    
                    # Lưu hash vào log
                    hash_log.write(f'{file_hash}\n')
                    hash_log.flush()
                    print(f'Đã chuyển đổi: {filename} sang .html')
                except Exception as e:
                    print(f'Lỗi khi chuyển đổi {filename}: {e}')

def main():
    input_dir = "assets/notebooks"
    output_dir = "assets/notebooks/convert"
    
    if not os.path.isdir(input_dir):
        print("Thư mục đầu vào không tồn tại!")
        return
    
    # Hỏi người dùng chọn chế độ ghi đè
    print("1. ❌ - Không ghi đè")
    print("2. ✅ - Ghi đè")
    print('-----------------------------------------------')
    print("Nhập lựa chọn 1 hoặc 2. Mặc định 'KHÔNG GHI ĐÈ'")
    print("[Ctrl + C] - để thoát")
    print('-----------------------------------------------')
    # choice = input("Nhập lựa chọn (1 hoặc 2), Ctrl + C để : ").strip()
    choice = input().strip()
    print('---')

    if choice == "1":
        overwrite = False
    elif choice == "2":
        overwrite = True
    else:
        print("Lựa chọn không hợp lệ. Mặc định: Không ghi đè.")
        overwrite = False
    
    convert_ipynb_to_html(input_dir, output_dir, overwrite=overwrite)
    print("\nĐã hoàn thành chuyển đổi file .ipynb")

if __name__ == "__main__":
    main()