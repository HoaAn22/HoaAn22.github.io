import os
import hashlib
import subprocess
import tkinter as tk
from tkinter import messagebox

def calculate_file_hash(filepath):
    hasher = hashlib.md5()
    with open(filepath, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def convert_ipynb_to_html(input_dir, output_dir, overwrite_mode=0, selected_files=None):
    os.makedirs(output_dir, exist_ok=True)
    hash_log_path = os.path.join(output_dir, 'idConvert.log')

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
                    if overwrite_mode == 0:
                        continue
                    elif overwrite_mode == 2 and filename not in selected_files:
                        continue

                try:
                    subprocess.run([
                        'python', '-m', 'jupyter', 'nbconvert', '--to', 'html',
                        '--output-dir', output_dir, input_path
                    ], check=True)

                    hash_log.write(f'{file_hash}\n')
                    hash_log.flush()
                except Exception as e:
                    messagebox.showerror("Lỗi", f"Lỗi khi chuyển đổi {filename}:\n{e}")

    messagebox.showinfo("Hoàn tất", "Chuyển đổi hoàn tất!")

def show_file_selector(input_dir):
    file_selection = []

    selector = tk.Toplevel()
    selector.title("Chọn file muốn ghi đè")
    selector.geometry("500x400")
    selector.minsize(400, 300)
    selector.resizable(True, True)

    tk.Label(selector, text="Chọn các file muốn ghi đè lại:").pack(pady=5)

    container = tk.Frame(selector)
    container.pack(fill="both", expand=True, padx=10, pady=5)

    canvas = tk.Canvas(container)
    scrollbar = tk.Scrollbar(container, orient="vertical", command=canvas.yview)
    scrollable_frame = tk.Frame(canvas)

    scrollable_frame.bind(
        "<Configure>",
        lambda e: canvas.configure(
            scrollregion=canvas.bbox("all")
        )
    )

    canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
    canvas.configure(yscrollcommand=scrollbar.set)

    canvas.pack(side="left", fill="both", expand=True)
    scrollbar.pack(side="right", fill="y")

    file_vars = {}
    for filename in os.listdir(input_dir):
        if filename.endswith('.ipynb'):
            var = tk.BooleanVar()
            chk = tk.Checkbutton(scrollable_frame, text=filename, variable=var, anchor='w')
            chk.pack(anchor='w', pady=2)
            file_vars[filename] = var

    def on_ok():
        for file, var in file_vars.items():
            if var.get():
                file_selection.append(file)
        selector.destroy()

    def on_cancel():
        file_selection.clear()
        selector.destroy()

    btn_frame = tk.Frame(selector)
    btn_frame.pack(pady=10)
    tk.Button(btn_frame, text="OK", command=on_ok, width=10, bg="lightgreen").pack(side='left', padx=5)
    tk.Button(btn_frame, text="Cancel", command=on_cancel, width=10, bg="lightgray").pack(side='right', padx=5)

    selector.transient(root)
    selector.grab_set()
    root.wait_window(selector)

    return file_selection

def start_conversion():
    subdir = dir_entry.get().strip()

    input_dir = os.path.join("assets/notebooks", subdir) if subdir else "assets/notebooks"
    output_dir = os.path.join("assets/notebooks/.convert", subdir) if subdir else "assets/notebooks/.convert"

    if not os.path.isdir(input_dir):
        messagebox.showerror("Lỗi", f"❌ Thư mục không tồn tại: {input_dir}")
        return

    mode = overwrite_var.get()
    selected_files = []

    if mode == 2:
        selected_files = show_file_selector(input_dir)
        if not selected_files:
            messagebox.showinfo("Huỷ bỏ", "Không có file nào được chọn. Huỷ chuyển đổi.")
            return

    convert_ipynb_to_html(input_dir, output_dir, overwrite_mode=mode, selected_files=selected_files)

# Giao diện chính
root = tk.Tk()
root.title("Chuyển đổi Jupyter Notebook sang HTML")
root.geometry("500x300")
root.minsize(450, 250)

tk.Label(root, text="📂 Thư mục bài viết").pack(pady=(15, 5))
dir_entry = tk.Entry(root, width=50)
dir_entry.pack()
dir_entry.insert(0, "")

tk.Label(root, text="🛠️ Chế độ ghi đè:").pack(pady=(15, 0))
overwrite_var = tk.IntVar(value=0)
tk.Radiobutton(root, text="❌ Không ghi đè", variable=overwrite_var, value=0).pack(anchor='w', padx=40)
tk.Radiobutton(root, text="✅ Ghi đè tất cả", variable=overwrite_var, value=1).pack(anchor='w', padx=40)
tk.Radiobutton(root, text="📝 Ghi đè từng file", variable=overwrite_var, value=2).pack(anchor='w', padx=40)

tk.Button(root, text="🚀 Chuyển đổi", command=start_conversion, bg="lightgreen", width=20).pack(pady=20)

root.mainloop()

# pyinstaller --onefile --windowed convert-app.py