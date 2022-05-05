window.addEventListener("load", function() {

    let button = document.querySelector('.link_box');

    button.addEventListener("click", function(){
        let nav = document.querySelector('#nav');
        let icon = document.querySelector('#menu_icon');

        if (nav.style.display == "block") {
            nav.style.display = "none";
            icon.classList.remove("fa-solid", "fa-x");
            icon.classList.add("fa-solid", "fa-bars");
        } else {
            nav.style.display = "block";
            icon.classList.remove("fa-solid", "fa-bars");
            icon.classList.add("fa-solid", "fa-x");
        }
        
    })

})