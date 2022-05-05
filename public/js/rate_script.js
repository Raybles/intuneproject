window.addEventListener("load", function() {

    const like_button = document.querySelector('#like_btn');
    const track_name = document.querySelector('.t-name').textContent;
    const artist_name = document.querySelector('.t-artist').textContent;

    like_button.addEventListener("click", function(evt) {
        evt.preventDefault();
        xhr_get = new XMLHttpRequest();
        xhr_get.open('GET', '/song_list', false);
        xhr_get.onload = function() {
            let response = xhr_get.response;
            console.log(response);
        }
    })

})