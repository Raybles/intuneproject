window.addEventListener("load", function() {

    // DETAILS FROM PAGE
    const email_form = document.querySelector('#update_form');
    const pass_form = document.querySelector('#pass_form');
    let user_input = document.querySelector('#username_input');
    let pass_input = document.querySelector('#password_input');
    let new_pass_input = document.querySelector('#new_pass');
    let new_pass_conf_input = document.querySelector('#new_pass_conf');
    let email_input = document.querySelector('#email_input');
    let login_error = document.querySelector('#login_error');
    let email_error = document.querySelector('#email_error');
    let success_text = document.querySelector('#success_prompt');

    // UPDATE EMAIL
        email_form.addEventListener("submit", function(evt) {
            evt.preventDefault();

            let user = user_input.value;
            let pass = pass_input.value;
            let email = email_input.value;

            let data = JSON.stringify({
                user: user,
                pass: pass,
                email: email
            });

            console.log(data);

            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/intune/update_email", false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhr.onload = function() {
                console.log(xhr.status);
                if (xhr.status == 401) {
                    login_error.style.display = "block";
                    user_input.value = "";
                    pass_input.value = "";
                    email_input.value = "";
                } else {
                    login_error.style.display = "none";
                    success_text.style.display = "block";
                    user_input.value = "";
                    pass_input.value = "";
                    email_input.value = "";
                }
            }
            xhr.send(data);
        })
})