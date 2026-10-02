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

//ниже код сгенировированный ии о списке новых слов

document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 1. ИНИЦИАЛИЗАЦИЯ И ПЕРЕМЕННЫЕ DOM
    // ============================================================
    const inputEng = document.querySelector('input[name="input-new-words-eng"]');
    const inputRu = document.querySelector('input[name="input-new-words-ru"]');
    const saveBtn = document.querySelector('.new-words-btn button');
    const listWordsContainer = document.querySelector('.list-words');
    const totalCountElement = document.querySelector('.new-words-total') || document.querySelector('.new-words-lotal');

    // Элементы 3D-сферы
    const sphere = document.getElementById("sphere");
    const info = document.getElementById("info");
    const english = document.getElementById("english");
    const translation = document.getElementById("translation");

    // Переменные вращения сферы
    let radius;
    let rotationX = 0;
    let rotationY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let lastTime = performance.now();
    const wordElements = [];

    // Загружаем массив слов из localStorage
    let wordsList = JSON.parse(localStorage.getItem('wordsAppList')) || [];

    // ============================================================
    // 2. ФУНКЦИИ 3D-СФЕРЫ
    // ============================================================
    function createSphere() {
        if (!sphere) return;
        
        sphere.innerHTML = "";
        wordElements.length = 0;
        radius = Math.min(sphere.clientWidth, sphere.clientHeight) * 0.40;

        const total = wordsList.length;
        if (total === 0) return; // Если слов нет, sphere остается пустой

        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        wordsList.forEach((item, index) => {
            // Расчет координат по золотому сечению
            const y = total === 1 ? 0 : 1 - (index / (total - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = goldenAngle * index;
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            const element = document.createElement("div");
            element.className = "word";
            element.textContent = item.eng; // Используем поле 'eng'

            element.dataset.x = x;
            element.dataset.y = y;
            element.dataset.z = z;
            element.dataset.word = item.eng;
            element.dataset.translation = item.ru; // Используем поле 'ru'

            element.addEventListener("click", function(event) {
                event.stopPropagation();
                english.textContent = this.dataset.word;
                translation.textContent = this.dataset.translation;
                info.classList.add("visible");
            });

            sphere.appendChild(element);
            wordElements.push(element);
        });
    }

    function updateSphere() {
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);

        wordElements.forEach(element => {
            let x = parseFloat(element.dataset.x);
            let y = parseFloat(element.dataset.y);
            let z = parseFloat(element.dataset.z);

            // Вращение X
            const y1 = y * cosX - z * sinX;
            const z1 = y * sinX + z * cosX;
            y = y1; z = z1;

            // Вращение Y
            const x1 = x * cosY + z * sinY;
            const z2 = -x * sinY + z * cosY;
            x = x1; z = z2;

            const screenX = x * radius;
            const screenY = y * radius;

            const depth = (z + 1) / 2;
            const scale = 0.55 + depth * 0.65;
            const opacity = 0.20 + depth * 0.80;

            element.style.transform = `translate(calc(-50% + ${screenX}px), calc(-50% + ${screenY}px)) scale(${scale})`;
            element.style.opacity = opacity;
            element.style.zIndex = Math.round(depth * 1000);
        });
    }

    function animate(currentTime) {
        const delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        if (!isDragging) {
            rotationY += 0.18 * delta;
            rotationX += 0.03 * delta;
            
            rotationY += velocityY * delta;
            rotationX += velocityX * delta;
            velocityX *= 0.96;
            velocityY *= 0.96;
        }

        updateSphere();
        requestAnimationFrame(animate);
    }

    // ============================================================
    // 3. ФУНКЦИИ ОТРИСОВКИ СПИСКА И СОХРАНЕНИЯ
    // ============================================================
    function renderList() {
        // 1. Обновляем счетчик
        if (totalCountElement) {
            totalCountElement.textContent = `total: ${wordsList.length}`;
        }

        // 2. Обновляем текстовый список под формой
        const oldBlocks = listWordsContainer.querySelectorAll('.new-words-block');
        oldBlocks.forEach(block => block.remove());

        wordsList.forEach((item, index) => {
            const wordBlock = document.createElement('div');
            wordBlock.classList.add('new-words-block');

            wordBlock.innerHTML = `
                <span class="new-words-one-eng">${escapeHtml(item.eng)}</span>
                <span class="new-words-one-ru">${escapeHtml(item.ru)}</span>
                <button class="new-words-close" data-index="${index}">x</button>
            `;

            listWordsContainer.appendChild(wordBlock);
        });

        // 3. Обновляем 3D-сферу
        createSphere();
    }

    function updateStorageAndRender() {
        localStorage.setItem('wordsAppList', JSON.stringify(wordsList));
        renderList();
    }

    // ============================================================
    // 4. СОБЫТИЯ И ОБРАБОТЧИКИ
    // ============================================================
    
    // Добавление слова
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const engValue = inputEng.value.trim();
            const ruValue = inputRu.value.trim();

            if (engValue === '' || ruValue === '') {
                alert('Пожалуйста, заполните оба поля!');
                return;
            }

            wordsList.push({ eng: engValue, ru: ruValue });
            inputEng.value = '';
            inputRu.value = '';

            updateStorageAndRender();
        });
    }

    // Удаление слова
    if (listWordsContainer) {
        listWordsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('new-words-close')) {
                const indexToDelete = event.target.getAttribute('data-index');
                wordsList.splice(indexToDelete, 1);
                updateStorageAndRender();
            }
        });
    }

    // Управление мышью / тачем для сферы
    if (sphere) {
        sphere.addEventListener("mousedown", (e) => {
            isDragging = true;
            previousX = e.clientX; previousY = e.clientY;
            velocityX = 0; velocityY = 0;
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - previousX;
            const deltaY = e.clientY - previousY;
            rotationY += deltaX * 0.006;
            rotationX += deltaY * 0.006;
            velocityY = deltaX * 0.15;
            velocityX = deltaY * 0.15;
            previousX = e.clientX; previousY = e.clientY;
        });

        window.addEventListener("mouseup", () => { isDragging = false; });

        sphere.addEventListener("touchstart", (e) => {
            isDragging = true;
            const touch = e.touches[0];
            previousX = touch.clientX; previousY = touch.clientY;
            velocityX = 0; velocityY = 0;
        }, { passive: true });

        sphere.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            const deltaX = touch.clientX - previousX;
            const deltaY = touch.clientY - previousY;
            rotationY += deltaX * 0.006;
            rotationX += deltaY * 0.006;
            velocityY = deltaX * 0.15;
            velocityX = deltaY * 0.15;
            previousX = touch.clientX; previousY = touch.clientY;
        }, { passive: true });

        sphere.addEventListener("touchend", () => { isDragging = false; });
    }

    document.addEventListener("click", (e) => {
        if (info && !e.target.classList.contains("word")) {
            info.classList.remove("visible");
        }
    });

    window.addEventListener("resize", createSphere);

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ============================================================
    // 5. СТАРТ
    // ============================================================
    renderList();
    requestAnimationFrame(animate);
});