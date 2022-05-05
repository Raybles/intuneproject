window.addEventListener("load", function() {

    const username_input = document.querySelector('#username_input');
    const password_input = document.querySelector('#password_input');
    const form = document.querySelector('#login_form');
    const login_error = document.querySelector('#login_error');
    const url = "/intune/login";

    const title = document.querySelector(".site_title");

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
      }

    form.addEventListener('submit', function(evt) {
        evt.preventDefault();

        if (containsSpecialChars(username_input.value) || containsSpecialChars(password_input.value)) {

            console.log("no smbs pls");
            login_error.style.display = "block";

        } else {

            let data = JSON.stringify({
                username: username_input.value,
                password: password_input.value
            });
    
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
            xhr.onload = function() {
                console.log(xhr.status);
                if (xhr.status == 400) {
                    login_error.style.display = "block";
                } else {
                    window.location.href = "https://trh22.brighton.domains/intune";
                }
            }
    
            xhr.send(data);
            
        }
    });
});