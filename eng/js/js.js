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

document.addEventListener('DOMContentLoaded', () => {
    // Структура элементов меню
    const menuData = [
        { type: 'link', href: 'words.html', text: '1000 words' },
        { type: 'link', href: 'iverb.html', text: 'Irregular verbs' },
        { type: 'link', href: 'voc.html', text: 'My vocabulary' }
    ];
    // Определение текущей страницы для сопоставления ссылок
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    //console.log(currentPath);

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
        //} else if (item.type === 'group') {
        //    menuHTML += `<div class="${item.className}">`;
        //    item.items.forEach(subItem => {
        //        menuHTML += createLinkHTML(subItem);
        //    });
        //    menuHTML += `</div>`;
        }
    });

    // Вставка меню во все контейнеры с классом .menu-add
    const menuContainers = document.querySelectorAll('.menu-add');
    menuContainers.forEach(container => {
        container.innerHTML = menuHTML;
    });
});



