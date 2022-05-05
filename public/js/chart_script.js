window.addEventListener("load", function() {

    function createItem(num, t_name, a_name) {
        const chart = document.querySelector('#chart_canvas');
        let item = document.createElement('div');
        item.classList.add('chart_item');
        chart.appendChild(item);
        let ranking = document.createElement('div');
        ranking.classList.add('ranking');
        item.appendChild(ranking);
        let rank = document.createElement('h3');
        rank.classList.add('item_text');
        rank.innerHTML = num;
        ranking.appendChild(rank);
        let song_name = document.createElement('div');
        song_name.classList.add('song_name');
        item.appendChild(song_name);
        let title = document.createElement('h3');
        title.classList.add('item_text');
        title.innerHTML = t_name;
        song_name.appendChild(title);
        let artist = document.createElement('div');
        artist.classList.add('chart_artist');
        item.appendChild(artist);
        let artist_name = document.createElement('h3');
        artist_name.classList.add('item_text');
        artist_name.innerHTML = a_name;
        artist.appendChild(artist_name);
    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/chart_list', false);
    xhr.onload = function() {
        console.log(xhr.status);
        let response = JSON.parse(xhr.response);
        
        for (let i = 0; i < 10; i++) {
            let n = i + 1;
            let t = response.tracks[i].track_name;
            let a = response.tracks[i].artist_name;
            createItem(n, t, a);
        }

    };
    xhr.send();

})