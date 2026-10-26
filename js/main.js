

document.addEventListener('DOMContentLoaded', function () {

    const btn = document.querySelector('.pass_link');
    const panel = document.querySelector('.pass_panel');

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        panel.classList.toggle('active');

        if (panel.classList.contains('active')) {
       		btn.textContent = 'hide';
        } else {
        	btn.textContent = 'show';
        }
    });
});


/* button up */
const btn = document.getElementById('scrollToTopBtn');

// Показываем кнопку, если прокрутили страницу более чем на 300px
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});

// Возвращаем в начало при клике
btn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Обеспечивает плавную прокрутку
  });
});


// TABS
const tabsBtns = document.querySelectorAll(".tabs__nav button");
const tabsItems = document.querySelectorAll(".tabs__item");

// Ф-я скрывает табы и убирает active у кнопок
function hideTabs() {
  tabsItems.forEach(item => item.classList.add("hide"));
  tabsBtns.forEach(item => item.classList.remove("active"));
}

// Ф-я показывает переданный номер таба и делает соответствующую ему кнопку активной.
function showTab(index) {
  //tabsItems[index].classList.remove("hide");
  //tabsBtns[index].classList.add("active");
}
//alert(11);
hideTabs();
showTab(0);


tabsBtns.forEach((btn, index) => btn.addEventListener("click", () => {
  hideTabs();
  showTab(index);
}));


document.addEventListener('DOMContentLoaded', () => {
    // Структура элементов меню
    const menuData = [
        //{ type: 'link', href: 'telegram.html', text: 'Telegram' },
        {
            type: 'group',
            className: 'menu_option',
            items: [
                { href: 'telegram.html', text: 'Telegram' },
                { href: 'books.html', text: 'Books' },
                { href: 'links.html', text: 'Links' }
            ]
        },
        {
            type: 'group',
            className: 'menu_option2',
            items: [
                { href: 'html_template.html', text: 'HTML temp.' },
                //{ href: 'media.html', text: 'Media' },
                { href: 'img.html', text: 'Images' }
            ]
        },
        {
            type: 'group',
            className: 'menu_option',
            items: [
                { href: 'html.html', text: 'Html' },
                { href: 'css.html', text: 'Css' },
                { href: 'scripts.html', text: 'Js' }
            ]
        },
        {
            type: 'group',
            className: 'menu_option',
            items: [
                { href: 'seo.html', text: 'SEO' },
                { href: 'git.html', text: 'Git' },
                { href: 'linux.html', text: 'Linux' }
            ]
        },

        { 
            type: 'link', 
            href: 'https://wisebook.com.ua/', 
            text: 'wisebook.com.ua', 
            className: 'style_wisebook', 
            target: '_blank' 
        },
        { 
            type: 'link', 
            href: 'https://life-extrim.ru/', 
            text: 'life-extrim.ru', 
            className: 'style_lifextrim', 
            target: '_blank' 
        }
        ,
        { 
            type: 'link', 
            href: 'https://---.com/', 
            text: 'new irom-gym', 
            className: 'irongym', 
            target: '_blank' 
        }

    
    ];

    // Определение текущей страницы для сопоставления ссылок
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Функция генерации HTML для отдельной ссылки
    function createLinkHTML(item) {
        // Проверяем, совпадает ли ссылка с текущей страницей
        const isCurrentPage = item.href === currentPath;
        
        // Формируем список классов
        let classes = [];
        if (item.className) classes.push(item.className);
        if (isCurrentPage) classes.push('checked');

        const classAttr = classes.length > 0 ? ` class="${classes.join(' ')}"` : '';
        const targetAttr = item.target ? ` target="${item.target}"` : '';

        return `<a href="${item.href}"${classAttr}${targetAttr}>${item.text}</a>`;
    }

    // Построение итоговой разметки меню
    let menuHTML = '';
    
    menuData.forEach(item => {
        if (item.type === 'link') {
            menuHTML += createLinkHTML(item);
        } else if (item.type === 'group') {
            menuHTML += `<div class="${item.className}">`;
            item.items.forEach(subItem => {
                menuHTML += createLinkHTML(subItem);
            });
            menuHTML += `</div>`;
        }
    });

    // Вставка меню во все контейнеры с классом .menu-add
    const menuContainers = document.querySelectorAll('.menu-add');
    menuContainers.forEach(container => {
        container.innerHTML = menuHTML;
    });
});


// добавление блока ссылок в footer
// 1. Находим первый блок .container на странице
        const firstContainer = document.querySelector('.container');

        // 2. Создаем HTML-код нового блока, который хотим добавить
        const newBlockHTML = `
            <div class="container non-margin footer-block">
                <div class="footer-block-link">
                    <a target="_blank" href="safe.html">safe</a> <!-- | <a href="#">link</a>-->
                </div>
            </div>
        `;

        // 3. Вставляем новый блок сразу после первого контейнера
        if (firstContainer) {
            firstContainer.insertAdjacentHTML('afterend', newBlockHTML);
        }

        // на странице html_template есть миниатюры шаблонов этот скрипт открывает страницу при нажатии на картинку
        document.addEventListener('click', (e) => {
            const img = e.target.closest('img');
            if (!img) return;
            
            const link = img.closest('div').querySelector('a');
            if (link) window.open(link.href, '_blank');
        });