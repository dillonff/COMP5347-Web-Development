$('#login_form').on('submit',function(e){
    e.preventDefault();
    const formData = $(this).serialize();
    $.ajax({
        url: '/login',
        type: 'post',
        data: formData,
        dataType: 'json',
        success: function (data) {
            const err_code = data.err_code;
            if(err_code === 0){
                window.alert('login success!')
                const prevLink = document.referrer;
                if($.trim(prevLink) ==='') {
                    window.location.href='/';
                }
                else {
                    if(prevLink.indexOf('reset') !== -1) {
                        window.location.href = '/';
                    }
                    else if(prevLink.indexOf('register') !== -1) {
                        window.location.href = document.getElementById("lastUrl").innerText;
                    }
                    else {
                        window.location.href = prevLink;
                    }
                }

            }
            else if (err_code === 1) {
                window.alert('email or password wrong!');
            }
            else if(err_code === 500) {
                window.alert('server busy!');
            }
        }
    });
});