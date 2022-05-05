window.addEventListener("load", function () {

    // Main Section Script

    let portaplayer = document.querySelector('#portaplayer');
    let mainsection = document.querySelector('.container');
    let backbutton = document.querySelector('#back_track');

    function populateTracks(title, artist) {
        let track_list = document.querySelector('#track_list');
        let track = document.createElement('div');
        track.classList.add('track');
        track_list.appendChild(track);
        let t_list_name = document.createElement('div');
        t_list_name.classList.add('t_list_name');
        track.appendChild(t_list_name);
        let name = document.createElement('h3');
        name.innerHTML = title;
        t_list_name.appendChild(name);
        let t_list_artist = document.createElement('div');
        t_list_artist.classList.add('t_list_artist');
        track.appendChild(t_list_artist);
        let aName = document.createElement('h3');
        aName.innerHTML = artist;
        t_list_artist.appendChild(aName);

        track.addEventListener("click", function () {
            console.log(name.textContent + " clicked");
        })

    }

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/intune/profile_details', false);
    xhr.onload = function () {
        if (xhr.status == 200) {
            let response = JSON.parse(xhr.response);
            let user_text = document.querySelector('#profile_user');
            let user_email = document.querySelector('#profile_email');
            user_text.innerHTML = `${response.user}`;
            user_email.innerHTML = `${response.email} <a href="/update_email"><i class="fa-solid fa-pen"></i></a>`;
        } else {
            console.log("something went wrong");
        }
    }
    xhr.send();

    xhr.open('GET', '/intune/user_tracks', false);
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.status == 200) {
            let response = JSON.parse(xhr.response);
            for (let i = 0; i < 6; i++) {
                let t = response.tracks[i].track_name;
                let a = response.tracks[i].artist_name;
                populateTracks(t, a);
            }
        }
    }
    xhr.send();

})