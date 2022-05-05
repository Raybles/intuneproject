window.addEventListener("load", function () {

    // Portaplayer script
    // let t_art = document.querySelector(".t-art");
    // let t_name = document.querySelector(".t-name");
    // let t_artist = document.querySelector(".t-artist");
    // let t_album = document.querySelector(".t-album");

    // let playpause_btn = document.querySelector(".playpause-track");
    // let next_btn = document.querySelector(".next-track");
    // let prev_btn = document.querySelector(".prev-track");

    // let seek_slider = document.querySelector(".seek_slider");
    // let volume_slider = document.querySelector(".volume_slider");
    // let curr_time = document.querySelector(".current-time");
    // let total_duration = document.querySelector(".total-duration");

    // let like_btn = document.querySelector("#like_btn");

    // let trackname;
    // let artistname;
    // let albumname;
    // let songyear;
    // let artwork;
    // let trackreference;

    // let track_list = [];
    // // Specify globally used values
    // let track_index = 0;
    // let isPlaying = false;
    // let updateTimer;

    // // Create the audio element for the player
    // let curr_track = document.createElement('audio');

    // function loadTrack(track_index) {
    //     // Clear the previous seek timer
    //     clearInterval(updateTimer);
    //     resetValues();

    //     // Load a new track
    //     curr_track.src = track_list[track_index].path;
    //     curr_track.load();

    //     // Update details of the track
    //     t_art.style.backgroundImage =
    //         "url(" + track_list[track_index].image + ")";
    //     t_name.textContent = track_list[track_index].name;
    //     t_artist.textContent = track_list[track_index].artist;
    //     t_album.textContent = track_list[track_index].album;

    //     // Set an interval of 1000 milliseconds
    //     // for updating the seek slider
    //     updateTimer = setInterval(seekUpdate, 1000);

    //     // Move to the next track if the current finishes playing
    //     // using the 'ended' event
    //     curr_track.addEventListener("ended", nextTrack);
    // }

    // // Function to reset all values to their default
    // function resetValues() {
    //     curr_time.textContent = "00:00";
    //     total_duration.textContent = "00:00";
    //     seek_slider.value = 0;
    // }

    // function playpauseTrack() {
    //     // Switch between playing and pausing
    //     // depending on the current state
    //     if (!isPlaying) playTrack();
    //     else pauseTrack();
    // }

    // function playTrack() {
    //     // Play the loaded track
    //     curr_track.play();
    //     isPlaying = true;

    //     // Replace icon with the pause icon
    //     playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
    // }

    // function pauseTrack() {
    //     // Pause the loaded track
    //     curr_track.pause();
    //     isPlaying = false;

    //     // Replace icon with the play icon
    //     playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
    // }

    // function nextTrack() {
    //     // Go back to the first track if the
    //     // current one is the last in the track list
    //     if (track_index < track_list.length - 1)
    //         track_index += 1;
    //     else track_index = 0;

    //     // Load and play the new track
    //     loadTrack(track_index);
    //     playTrack();
    // }

    // function prevTrack() {
    //     // Go back to the last track if the
    //     // current one is the first in the track list
    //     if (track_index > 0)
    //         track_index -= 1;
    //     else track_index = track_list.length - 1;

    //     // Load and play the new track
    //     loadTrack(track_index);
    //     playTrack();
    // }

    // function seekTo() {
    //     // Calculate the seek position by the
    //     // percentage of the seek slider
    //     // and get the relative duration to the track
    //     seekto = curr_track.duration * (seek_slider.value / 100);

    //     // Set the current track position to the calculated seek position
    //     curr_track.currentTime = seekto;
    // }

    // function setVolume() {
    //     // Set the volume according to the
    //     // percentage of the volume slider set
    //     curr_track.volume = volume_slider.value / 100;
    // }

    // function seekUpdate() {
    //     let seekPosition = 0;

    //     // Check if the current track duration is a legible number
    //     if (!isNaN(curr_track.duration)) {
    //         seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    //         seek_slider.value = seekPosition;

    //         // Calculate the time left and the total duration
    //         let currentMinutes = Math.floor(curr_track.currentTime / 60);
    //         let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    //         let durationMinutes = Math.floor(curr_track.duration / 60);
    //         let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    //         // Add a zero to the single digit time values
    //         if (currentSeconds < 10) {
    //             currentSeconds = "0" + currentSeconds;
    //         }
    //         if (durationSeconds < 10) {
    //             durationSeconds = "0" + durationSeconds;
    //         }
    //         if (currentMinutes < 10) {
    //             currentMinutes = "0" + currentMinutes;
    //         }
    //         if (durationMinutes < 10) {
    //             durationMinutes = "0" + durationMinutes;
    //         }

    //         // Display the updated duration
    //         curr_time.textContent = currentMinutes + ":" + currentSeconds;
    //         total_duration.textContent = durationMinutes + ":" + durationSeconds;
    //     }
    // }

    // // Load the first track in the tracklist
    // loadTrack(track_index);

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
    xhr.open('GET', '/profile_details', false);
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

    xhr.open('GET', '/user_tracks', false);
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