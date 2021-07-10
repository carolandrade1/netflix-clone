(function () {
    const navegar = document.querySelector('.header__mobile');
    const links = document.querySelector('.header__menu');

    navegar.addEventListener('click', function () {
        links.classList.toggle('show-links');
    });
}());


(function () {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        const scrollHeight = window.pageYOffset;
        const headerHeight = header.getBoundingClientRect().height;

        if (scrollHeight > headerHeight) {
            header.classList.add('header__color');
        } else {
            header.classList.remove('header__color');
        }
    });

}());