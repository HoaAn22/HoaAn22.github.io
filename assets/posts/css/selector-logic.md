Trong CSS, các **selector logic** được sử dụng để chọn và áp dụng kiểu dáng cho các phần tử HTML theo các điều kiện cụ thể. Dưới đây là danh sách các loại selector logic phổ biến trong CSS:

---

## **1. Selectors cơ bản**

- **Universal selector (`*`)**: Chọn tất cả các phần tử.
    
    ```css
    * {
      margin: 0;
      padding: 0;
    }
    ```
    
- **Type selector**: Chọn các phần tử theo tên thẻ.
    
    ```css
    p {
      color: blue;
    }
    ```
    
- **Class selector (`.classname`)**: Chọn các phần tử với class cụ thể.
    
    ```css
    .button {
      background: red;
    }
    ```
    
- **ID selector (`#idname`)**: Chọn phần tử với một ID cụ thể.
    
    ```css
    #header {
      font-size: 20px;
    }
    ```
    
- **Group selector (`,`)**: Nhóm nhiều selector lại.
    
    ```css
    h1, h2, h3 {
      color: green;
    }
    ```
    

---

## **2. Selectors kết hợp**

- **Descendant selector (`E F`)**: Chọn phần tử F nằm trong phần tử E (bất kỳ cấp độ nào).
    
    ```css
    div p {
      color: gray;
    }
    ```
    
- **Child selector (`E > F`)**: Chọn phần tử F là con trực tiếp của phần tử E.
    
    ```css
    ul > li {
      list-style: none;
    }
    ```
    
- **Adjacent sibling selector (`E + F`)**: Chọn phần tử F đứng ngay sau phần tử E (cùng cấp).
    
    ```css
    h1 + p {
      font-size: 14px;
    }
    ```
    
- **General sibling selector (`E ~ F`)**: Chọn tất cả phần tử F nằm sau phần tử E (cùng cấp).
    
    ```css
    h1 ~ p {
      color: darkgray;
    }
    ```
    

---

## **3. Attribute selectors**

- **`[attribute]`**: Chọn các phần tử có thuộc tính cụ thể.
    
    ```css
    input[required] {
      border: 1px solid red;
    }
    ```
    
- **`[attribute=value]`**: Chọn các phần tử có thuộc tính với giá trị cụ thể.
    
    ```css
    input[type="text"] {
      background: lightblue;
    }
    ```
    
- **`[attribute^=value]`**: Chọn các phần tử có giá trị thuộc tính bắt đầu bằng giá trị cụ thể.
    
    ```css
    a[href^="https://"] {
      color: green;
    }
    ```
    
- **`[attribute$=value]`**: Chọn các phần tử có giá trị thuộc tính kết thúc bằng giá trị cụ thể.
    
    ```css
    a[href$=".pdf"] {
      color: red;
    }
    ```
    
- **`[attribute*=value]`**: Chọn các phần tử có giá trị thuộc tính chứa giá trị cụ thể.
    
    ```css
    a[href*="example"] {
      text-decoration: underline;
    }
    ```
    

---

## **4. Pseudo-classes**

- **Trạng thái động**:
    
    - `:hover`, `:focus`, `:active`, `:visited`, `:link`, `:checked`, `:enabled`, `:disabled`.
        
        ```css
        button:hover {
          background-color: yellow;
        }
        ```
        
- **Dựa trên vị trí**:
    
    - `:first-child`, `:last-child`, `:nth-child(n)`, `:nth-last-child(n)`, `:only-child`.
        
        ```css
        li:first-child {
          font-weight: bold;
        }
        ```
        
- **Khác**:
    
    - `:empty`, `:not(selector)`, `:root`, `:target`, `:lang(language)`.
        
        ```css
        div:not(.hidden) {
          display: block;
        }
        ```
        

---

## **5. Pseudo-elements**

- `::before`, `::after`, `::first-line`, `::first-letter`, `::marker`.
    
    ```css
    p::first-line {
      font-style: italic;
    }
    ```
    

---

## **6. Selector kết hợp nâng cao**

- **:is()**: Chọn phần tử khớp với bất kỳ selector nào trong danh sách.
    
    ```css
    :is(h1, h2, h3) {
      color: blue;
    }
    ```
    
- **:where()**: Giống `:is()`, nhưng không ảnh hưởng đến độ ưu tiên (specificity).
    
    ```css
    :where(h1, h2, h3) {
      margin: 0;
    }
    ```
    
- **:has()**: Chọn phần tử chứa các phần tử con khớp selector cụ thể.
    
    ```css
    div:has(img) {
      border: 2px solid green;
    }
    ```
    