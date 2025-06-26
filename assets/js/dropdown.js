// Tải Menu vào trang
document.addEventListener('DOMContentLoaded', function() {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-placeholder').innerHTML = data;
            initializeSidebar();
        })
        .catch(error => console.error('Error loading sidebar:', error));
        
    const dropdowns = document.querySelectorAll('.dropdown');
    const categoryBtn = document.querySelector('.category-btn');
    const dropdownContainer = document.querySelector('.dropdown-container');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownCategory = dropdown.querySelector('.dropdown-category');

        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Kiểm tra kích thước màn hình
            if (window.innerWidth > 768) {
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherDropdownCategory = otherDropdown.querySelector('.dropdown-category');
                        otherDropdownCategory.style.display = 'none';
                    }
                });
            }

            dropdownCategory.style.display = dropdownCategory.style.display === 'block' ? 'none' : 'block';
        });

        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            const link = item.querySelector('a');
            const subMenu = item.querySelector('.dropdown-content');

            if (subMenu) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Kiểm tra kích thước màn hình
                    if (window.innerWidth > 768) {
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                const otherSubMenu = otherItem.querySelector('.dropdown-content');
                                if (otherSubMenu) {
                                    otherSubMenu.style.display = 'none';
                                }
                            }
                        });
                    }

                    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
                });
            }
        });
    });

    categoryBtn.addEventListener('click', function() {
        dropdownContainer.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.category-btn')) {
            dropdowns.forEach(dropdown => {
                const dropdownCategory = dropdown.querySelector('.dropdown-category');
                const dropdownContents = dropdown.querySelectorAll('.dropdown-content');
                dropdownCategory.style.display = 'none';
                dropdownContents.forEach(content => {
                    content.style.display = 'none';
                });
            });
            dropdownContainer.classList.remove('show');
        }
    });
});

function initializeSidebar() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const categoryBtn = document.querySelector('.category-btn');
    const dropdownContainer = document.querySelector('.dropdown-container');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownCategory = dropdown.querySelector('.dropdown-category');

        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (window.innerWidth > 768) {
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherDropdownCategory = otherDropdown.querySelector('.dropdown-category');
                        otherDropdownCategory.style.display = 'none';
                    }
                });
            }

            dropdownCategory.style.display = dropdownCategory.style.display === 'block' ? 'none' : 'block';
        });

        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            const link = item.querySelector('a');
            const subMenu = item.querySelector('.dropdown-content');

            if (subMenu) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (window.innerWidth > 768) {
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                const otherSubMenu = otherItem.querySelector('.dropdown-content');
                                if (otherSubMenu) {
                                    otherSubMenu.style.display = 'none';
                                }
                            }
                        });
                    }

                    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
                });
            }
        });
    });

    categoryBtn.addEventListener('click', function() {
        dropdownContainer.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.category-btn')) {
            dropdowns.forEach(dropdown => {
                const dropdownCategory = dropdown.querySelector('.dropdown-category');
                const dropdownContents = dropdown.querySelectorAll('.dropdown-content');
                dropdownCategory.style.display = 'none';
                dropdownContents.forEach(content => {
                    content.style.display = 'none';
                });
            });
            dropdownContainer.classList.remove('show');
        }
    });
}
