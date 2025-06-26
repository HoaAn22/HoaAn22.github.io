Trong CSS, bạn có thể đặt biến bằng cách sử dụng cú pháp `--tên-biến` trong một selector. Biến này có thể được sử dụng trong các thuộc tính CSS khác. Dưới đây là cách bạn có thể đặt và sử dụng biến trong CSS:

### Cú pháp để đặt biến:
```css
:root {
  --primary-color: #3498db;
  --font-size: 16px;
  --padding: 10px;
}
```

Ở đây, các biến được định nghĩa trong `:root` (phạm vi toàn cục), vì vậy chúng có thể được sử dụng ở bất kỳ đâu trong tài liệu CSS.

### Cú pháp để sử dụng biến:
```css
body {
  background-color: var(--primary-color);
  font-size: var(--font-size);
  padding: var(--padding);
}
```

Trong ví dụ trên, `var(--primary-color)`, `var(--font-size)` và `var(--padding)` là các biến được sử dụng trong các thuộc tính CSS.

### Ví dụ đầy đủ:
```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
}

body {
  font-size: var(--font-size);
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

h1 {
  font-size: 2em;
  color: var(--secondary-color);
}
```

Như vậy, CSS biến giúp bạn dễ dàng quản lý và thay đổi giá trị trong toàn bộ trang web của mình.