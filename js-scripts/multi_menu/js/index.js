document.querySelectorAll(".menu__button").forEach(button => {
    button.addEventListener('click', function(event) {
        document.querySelectorAll('.menu__item').forEach(item => {
            if (item.querySelector('.menu__button') !== button) {
                item.classList.remove('menu__item_open')
            }
        })
        event._isClick == true

        button.parentElement.classList.toggle('menu__item_open')
    })
})

document.body.addEventListener('click', function(event) {
    console.log(event.target.parentElement.classList.contains('menu__item_open'));

    if (
        event._isClick == true ||
        event.target.classList.contains('menu__button') == true ||
        event.target.classList.contains('dropdown-menu') == true
    ) return

    document.querySelectorAll('.menu__item').forEach(item => {
        item.classList.remove('menu__item_open')
    })
})