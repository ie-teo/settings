document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle
    var menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            var topMenu = document.getElementById('topMenu');
            if (topMenu) topMenu.classList.toggle('active');
        });
    }

    // 2. Sidebar Toggle (Categories)
    var sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            var sidebarMenu = document.getElementById('sidebarMenu');
            if (sidebarMenu) sidebarMenu.classList.toggle('active');
        });
    }

    // 3. Theme Toggle & Persistence (Works without changing HTML)
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Find the second stylesheet link (css/style_l.css) automatically since it doesn't have an ID in HTML
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    let themeStylesheet = null;
    
    // Look for the stylesheet ending with style_l.css or style_d.css
    stylesheets.forEach(sheet => {
        if (sheet.getAttribute('href') && sheet.getAttribute('href').includes('style_')) {
            themeStylesheet = sheet;
        }
    });

    if (themeToggleBtn && themeStylesheet) {
        // Load saved theme from localStorage or default to light ('style_l.css')
        const savedTheme = localStorage.getItem('theme') || 'css/style_l.css';
        setTheme(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            let currentHref = themeStylesheet.getAttribute('href');
            // Toggle between light and dark file paths
            let newTheme = currentHref.includes('style_l.css') ? 'css/style_d.css' : 'css/style_l.css';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        function setTheme(themeName) {
            themeStylesheet.setAttribute('href', themeName);
            // If it's the dark theme file, show the sun icon; otherwise show the moon icon
            if (themeName.includes('style_d.css')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    }
});