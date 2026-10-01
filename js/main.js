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
  tabsItems[index].classList.remove("hide");
  tabsBtns[index].classList.add("active");
}

hideTabs();
showTab(0);


tabsBtns.forEach((btn, index) => btn.addEventListener("click", () => {
  console.log('click');
  console.log(btn);
  console.log(index);
  hideTabs();
  showTab(index);
}));





