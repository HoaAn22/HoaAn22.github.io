// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');

function setDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', isDark);
}

// Apply the saved preference or default to light mode
if (savedDarkMode === 'true') {
    setDarkMode(true);
}

// Add event listener to toggle button
document.addEventListener('DOMContentLoaded', (event) => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            setDarkMode(isDarkMode);
        });
    }
});