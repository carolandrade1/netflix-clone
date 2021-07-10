(function () {
    // Ativar o som
    unmuteButton.addEventListener('click', function () {
        video.muted = false;
    });

    // Desativar o som
    muteButton.addEventListener('click', function () {
        video.muted = true;
    });

    // Carregar poster depois do video
    const video = document.getElementById('video');

    video.addEventListener('ended', function () {
        video.src = './assets/img/teste03.webP';
    });

}());