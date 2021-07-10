(function () {
    function getSection(url, titulo, id) {
        // $.getJSON = https://api.jquery.com/jquery.getjson/
        $.getJSON(`https://api.themoviedb.org/3${url}api_key=9306ec9b8cca574d2145a64c0f300996&language=pt-br`, function (resposta) {
            displayFlexItems(resposta.results, titulo, id);
        });
    }

    // Função que gera a Seção de posters
    function displayFlexItems(flexItems, titulo, id) {
        const slider = document.querySelector(`.slider`);
        let comecoSection = `<div class="slider__section">
                                <header class="slider__title">${titulo}</header>
                                <button id="${id}-prev" class="slider__button btn__left" type="button" aria-label="Botão mover para a os posters anteriores da seção">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                        style="fill:rgba(255, 255, 255, 1)">
                                        <path d="M12.707 17.293L8.414 13 18 13 18 11 8.414 11 12.707 6.707 11.293 5.293 4.586 12 11.293 18.707z">
                                        </path>
                                    </svg>
                                </button>
                                <button id="${id}-next" class="slider__button btn__right" type="button" aria-label="Botão mover para a os proximos posters da seção">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                        style="fill:rgba(255, 255, 255, 1)">
                                        <path
                                            d="M11.293 17.293L12.707 18.707 19.414 12 12.707 5.293 11.293 6.707 15.586 11 6 11 6 13 15.586 13z">
                                        </path>
                                    </svg>
                                </button>
                                <div class="section__item">`;

        // Filtra os poster com valor = null, para depois fazer um map, onde retorna
        // cada uma das divs com o poster dos filmes.
        let imagens = flexItems
            .filter(function (item) {
                return item.poster_path != null;
            })
            .map(function (item) {
                return `<div class="item">
                            <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="" />
                        </div>`;
            });
        imagens = imagens.join('');

        let fimSection = `</div></div>`;

        // Junção da div completa (1° parte que não se altera, 2° parte com as imagens e 3º parte para fechar a div)
        const section = comecoSection + imagens + fimSection;
        // Coloca a div section, dentro do HTML, na parte do slider.
        slider.innerHTML = slider.innerHTML.concat(section);


        // Seleciona os botões e a seção dos itens
        const slides = document.querySelectorAll('.section__item');
        let prevBtn = document.querySelectorAll('.btn__left');
        let nextBtn = document.querySelectorAll('.btn__right');

        // criando um counter para cada carrossel; Um array de objetos com valor inicial de 0
        let counters = new Array(prevBtn.length).fill({ count: 0 });

        // Para cada botão é adiconado um evento de click
        prevBtn.forEach(function (btn, index) {
            btn.addEventListener('click', function () {
                // Quando clicado, o counter do botão tem que diminuir (ele manipula o objeto/valor dentro do array);
                // e chamar a função carousel para movimentar o slider selecionado
                let counter = counters[index];
                counter.count--;
                carousel(counter, slides[index]);
            })
        });

        // Para cada botão é adiconado um evento de click
        nextBtn.forEach(function (btn, index) {
            btn.addEventListener('click', function () {
                // Quando clicado, o counter do botão tem que aumentar (ele manipula o objeto/valor dentro do array);
                // e chamar a função carousel para movimentar o slider selecionado
                let counter = counters[index];
                counter.count++;
                carousel(counter, slides[index]);
            })
        });

    };

    // Movimenta a seção dos posters de acordo com o valor do counter (array, objeto)
    function carousel(counter, slide) {
        if ($(window).width() < 1000) {
            if (counter.count === 6) {
                counter.count = 0;
            }
            if (counter.count < 0) {
                counter.count = 6 - 1;
            }
        } else if ($(window).width() < 450) {
            if (counter.count === 8) {
                counter.count = 0;
            }
            if (counter.count < 0) {
                counter.count = 8 - 1;
            }
        } else {
            if (counter.count === 4) {
                counter.count = 0;
            }
            if (counter.count < 0) {
                counter.count = 4 - 1;
            }
        };

        // é utilizado % dependendo da largura da tela, pois a seção é considerada com uma grande 'faixa'.
        if ($(window).width() < 1000) {
            slide.style.transform = `translateX(-${counter.count * 15}%)`
        } else if ($(window).width() < 450) {
            slide.style.transform = `translateX(-${counter.count * 5}%)`
        } else {
            slide.style.transform = `translateX(-${counter.count * 22}%)`
        };
    };

    // Chama as seções dando a URL referente aos posters, o Titulo da seção, e o ID de cada uma.
    getSection('/trending/all/week?', 'Trending', 'trending');
    getSection('/discover/movie?with_genres=35&', 'Comédia', 'comedia');
    getSection('/discover/movie?with_genres=28&', 'Ação', 'acao');
    getSection('/discover/tv?', 'Em alta', 'em-alta');
}());