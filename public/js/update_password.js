window.addEventListener("load", function() {

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
      }

    // DETAILS FROM PAGE
    const pass_form = document.querySelector('#pass_form');
    let user_input = document.querySelector('#username_input');
    let pass_input = document.querySelector('#password_input');
    let new_pass_input = document.querySelector('#new_pass');
    let new_pass_conf_input = document.querySelector('#new_pass_conf');
    let symbols_error = document.querySelector('#symbols_error');
    let login_error = document.querySelector('#login_error');
    let conf_error = document.querySelector('#conf_error');
    let email_error = document.querySelector('#email_error');
    let success_text = document.querySelector('#success_prompt');

    // UPDATE PASSWORD
        pass_form.addEventListener("submit", function(evt) {

            evt.preventDefault();

            let user = user_input.value;
            let pass = pass_input.value;
            let new_pass = new_pass_input.value;
            let new_pass_conf = new_pass_conf_input.value;
            let data;

            if (containsSpecialChars(user) || containsSpecialChars(pass)) {
                symbols_error.style.display = "block";
            } else {
                data = JSON.stringify({
                    user: user,
                    pass: pass,
                    newpass: new_pass,
                    newpassconf: new_pass_conf
                });
            }

            if (data) {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/intune/update_password", false);
                xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                xhr.onload = function() {
                    console.log(xhr.response);
                    console.log(xhr.status);
                    if (xhr.status == 200) {
                        console.log('success');
                        success_text.style.display = "block";
                        user_input.value = "";
                        pass_input.value = "";
                        new_pass_input.value = "";
                        new_pass_conf_input.value = "";
                        login_error.style.display = "none";
                        conf_error.style.display = "none";
                    } else if (xhr.status == 500) {
                        location.reload();
                    } else if (xhr.status == 401) {
                        login_error.style.display = "block";
                        conf_error.display.style = "none";
                    } else if (xhr.status == 400) {
                        login_error.style.display = "none";
                        conf_error.style.display = "block";
                    }
                }
                xhr.send(data);
            }
        });
})