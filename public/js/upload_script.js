window.addEventListener("load", function(){

    const form = document.querySelector("#upload_form");

    form.addEventListener("submit", function(evt) {
        evt.preventDefault();

        let formData = new FormData();

        let track_name = document.querySelector("#track_name_input").value;
        let artist_name = document.querySelector("#artist_input").value;
        let album_name = document.querySelector("#album_input").value;
        let track_year = document.querySelector("#year_input").value;
        let artwork_upload = document.querySelector("#artwork_input").files[0];
        let track_upload = document.querySelector("#track").files[0];
        let exist_error = document.querySelector('#exist_error');
        let success_prompt = document.querySelector('#success_prompt');

        formData.append('track_name', track_name);
        formData.append('artist_name', artist_name);
        formData.append('album_name', album_name);
        formData.append('track_year', track_year);
        formData.append('album_artwork', artwork_upload);
        formData.append('track', track_upload);

        // console.log(...formData);
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/intune/upload', false);

        xhr.onload = function() {
            if (xhr.status == 200) {
                exist_error.style.display = "none";
                success_prompt.style.display = "block";
            } else if (xhr.status == 409) {
                exist_error.style.display = "block";
                success_prompt.style.display = "none";
            }

        };

        xhr.send(formData);
    });

        

})