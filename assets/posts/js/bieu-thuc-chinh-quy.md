# Biểu thức chính quy (Regex) trong JavaScript

Biểu thức chính quy (Regular Expression - Regex) là một công cụ mạnh để xử lý chuỗi trong JavaScript. Regex giúp tìm kiếm, thay thế, kiểm tra định dạng chuỗi một cách linh hoạt.

---

## **1. Cách tạo Regex trong JavaScript**
Có hai cách để khai báo một biểu thức chính quy trong JavaScript:

### **Cách 1: Sử dụng dấu gạch chéo `/.../`**
```js
const regex = /hello/;
```

### **Cách 2: Sử dụng `RegExp` constructor**
```js
const regex = new RegExp("hello");
```

---

## **2. Các ký tự cơ bản trong Regex**
| Ký tự | Ý nghĩa |
|-------|---------|
| `.`   | Đại diện cho **bất kỳ ký tự nào** ngoại trừ xuống dòng |
| `\d`  | Một chữ số (0-9) |
| `\D`  | Một ký tự không phải số |
| `\w`  | Một ký tự chữ cái, số hoặc `_` |
| `\W`  | Một ký tự **không** phải chữ cái, số, hoặc `_` |
| `\s`  | Một khoảng trắng (space, tab, xuống dòng) |
| `\S`  | Một ký tự không phải khoảng trắng |
| `\b`  | Ranh giới từ (word boundary) |
| `\B`  | Không phải ranh giới từ |

---

## **3. Các toán tử lặp**
| Ký tự | Ý nghĩa |
|-------|---------|
| `*`   | Lặp **0 hoặc nhiều lần** |
| `+`   | Lặp **1 hoặc nhiều lần** |
| `?`   | Lặp **0 hoặc 1 lần** (tùy chọn) |
| `{n}` | Xuất hiện **chính xác n lần** |
| `{n,}` | Xuất hiện **ít nhất n lần** |
| `{n,m}` | Xuất hiện **từ n đến m lần** |

🔹 **Ví dụ**:
```js
const regex = /\d{3,5}/;
console.log(regex.test("12345")); // true
console.log(regex.test("12")); // false
```

---

## **4. Các nhóm và lựa chọn**
| Ký tự | Ý nghĩa |
|-------|---------|
| `(abc)` | Nhóm các ký tự **abc** lại với nhau |
| `(?:abc)` | Nhóm nhưng không lưu trữ (non-capturing group) |
| `a|b` | Khớp **a hoặc b** |

🔹 **Ví dụ**:
```js
const regex = /(hello|hi) world/;
console.log(regex.test("hello world")); // true
console.log(regex.test("hi world")); // true
console.log(regex.test("hey world")); // false
```

---

## **5. Các ký tự bắt đầu & kết thúc**
| Ký tự | Ý nghĩa |
|-------|---------|
| `^`   | Bắt đầu chuỗi |
| `$`   | Kết thúc chuỗi |

🔹 **Ví dụ**:
```js
const regex = /^hello/;
console.log(regex.test("hello world")); // true
console.log(regex.test("world hello")); // false
```

---

## **6. Các ký tự đặc biệt**
| Ký tự | Ý nghĩa |
|-------|---------|
| `\`   | Escape ký tự đặc biệt |
| `[]`  | Một tập hợp ký tự |
| `[^]` | Phủ định tập hợp ký tự |

🔹 **Ví dụ**:
```js
const regex = /^[A-Z][a-z]+$/;
console.log(regex.test("Hello")); // true
console.log(regex.test("hello")); // false
```

---

## **7. Các flag trong Regex**
| Flag | Ý nghĩa |
|------|---------|
| `g`  | Tìm **tất cả** các kết quả trong chuỗi |
| `i`  | **Không phân biệt chữ hoa/thường** |
| `m`  | **Chế độ nhiều dòng** (`^` và `$` hoạt động trên từng dòng) |
| `y`  | **Sticky mode**, khớp từ vị trí hiện tại |

🔹 **Ví dụ**:
```js
const regex = /hello/gi;
console.log("Hello hello".match(regex)); // ["Hello", "hello"]
```

---

## **8. Các phương thức Regex trong JavaScript**
### **1️⃣ Kiểm tra với `test()`**
```js
const regex = /\d+/;
console.log(regex.test("abc123")); // true
console.log(regex.test("abcdef")); // false
```

### **2️⃣ Tìm kiếm với `match()`**
```js
const regex = /\d+/g;
console.log("abc123 xyz456".match(regex)); // ["123", "456"]
```

### **3️⃣ Thay thế với `replace()`**
```js
const regex = /\d+/g;
console.log("abc123 xyz456".replace(regex, "XXX")); // "abcXXX xyzXXX"
```

### **4️⃣ Tách chuỗi với `split()`**
```js
const regex = /\s+/;
console.log("hello   world".split(regex)); // ["hello", "world"]
```

---

## **9. Một số Regex thông dụng**
| Mục đích | Regex |
|----------|---------|
| Số điện thoại (Việt Nam) | `/^0\d{9,10}$/` |
| Email | `/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/` |
| URL | `/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/` |
| Chỉ chứa chữ cái | `/^[a-zA-Z]+$/` |
| Mật khẩu mạnh | `/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/` |

---

### **Kết luận**
Biểu thức chính quy trong JavaScript là một công cụ hữu ích để làm việc với chuỗi, từ tìm kiếm, kiểm tra định dạng đến thay thế và xử lý văn bản phức tạp. Bạn có thể thử nghiệm regex tại [Regex101](https://regex101.com/) để kiểm tra cú pháp.