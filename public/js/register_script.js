window.addEventListener("load", function () {

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    document.querySelector("form").addEventListener("submit", function (evt) {
        evt.preventDefault();

        let email_error = document.querySelector('#email_error');
        let username_error = document.querySelector('#username_error');


        let username_input = document.querySelector("#username_input").value;
        let email_input = document.querySelector("#email_input").value;
        let password_input = document.querySelector("#password_input").value;
        let password_conf = document.querySelector('#password_conf').value;
        let symbols_error = document.querySelector('#symbols_error');
        let password_error = document.querySelector('#password_error');

        console.log(username_input);
        console.log(email_input);
        console.log(password_input);

        let data;

        if (containsSpecialChars(username_input) || containsSpecialChars(password_input)) {
            symbols_error.style.display = "block";
        } else if (password_input == password_conf) {
            console.log('match');

            data = JSON.stringify({
                username: username_input,
                email: email_input,
                password: password_input,
                password_conf: password_conf
            });

            const url = "/intune/register";
            let xhr = new XMLHttpRequest();

            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

            xhr.send(data);
            xhr.addEventListener("load", function () {
                console.log(xhr.status);
                if (xhr.status == 201) {
                    window.location.href = '/intune';
                } else {
                    console.log('Something went wrong');
                }
            });
        } else {
            console.log('no match');
            password_error.style.display = "block";
        }
    });

})