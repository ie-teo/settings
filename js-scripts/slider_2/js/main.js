const swiper = new Swiper('.swiper-container', {
    // Цикличность
    loop: true,
    // Пагинация
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    a11y: {
        paginationBulletMessage: 'Тут название слайда {{index}}',
    }
});