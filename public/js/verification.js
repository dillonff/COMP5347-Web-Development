$('#verify_form').on('submit',function(e) {
    e.preventDefault()
    const formData = $(this).serialize();
    $.ajax({
        url: '/verification',
        type: 'post',
        data: formData,
        dataType: 'json',
        success: function (data) {
            const err_code = data.err_code;
            if(err_code === 0) {
                const email = data.email;
                window.alert('verification success!');
                window.location.href = '/jump?email='+email;
            }
            else if (err_code === 1) {
                window.alert('email not exists!');
            }
            else if(err_code === 500) {
                window.alert('server busy!');
            }
        }
    });
});