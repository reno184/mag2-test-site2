
const errorToast = bootstrap.Toast.getOrCreateInstance( document.getElementById('errorToast'))
const successToast = bootstrap.Toast.getOrCreateInstance( document.getElementById('successToast'))
document.getElementById("frmSubscribe").addEventListener("submit", function (e) {
    e.preventDefault()
    const form = e.target
    console.log(form.txtEmail.value)
    grecaptcha.ready(function () {
        grecaptcha.execute('6LcaPR0pAAAAAMOVo29LEulfayjvszu_37CW_ZYs', {action: 'submit'}).then(function (token) {
            console.log('re')
            fetch('https://obscure-headland-74730.herokuapp.com/api/recaptcha', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                        'g-recaptcha-response': token
                    }, body: JSON.stringify({email: form.txtEmail.value})
                }
            ).then(function (rep) {
                rep.ok ? successToast.show() :errorToast.show()
            }).catch(() => {
                errorToast.show()
            });
        });
    });
})
document.getElementById("frmJoinUs").addEventListener("submit", function (e) {
    e.preventDefault()
    const form = e.target
    grecaptcha.ready(function () {
        grecaptcha.execute('6LcaPR0pAAAAAMOVo29LEulfayjvszu_37CW_ZYs', {action: 'submit'}).then(function (token) {
            fetch('https://obscure-headland-74730.herokuapp.com/api/recaptcha', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                        'g-recaptcha-response': token
                    }, body: JSON.stringify({email: form.txtEmail.value})
                }
            ).then(function (rep) {
                rep.ok ? successToast.show() :errorToast.show()
            }).catch(() => {
                errorToast.show()
            });
        });
    });
})
