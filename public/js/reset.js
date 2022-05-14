$('#reset_form').on('submit',function(e) {
    e.preventDefault();
    const formData = $(this).serialize();
    $.ajax({
        url: '/reset',
        type: 'post',
        data: formData,
        dataType: 'json',
        success: function (data) {
            const err_code = data.err_code;
            if(err_code === 0) {
                window.alert('reset success!');
                window.location.href='/login';
            }
            else if(err_code === 1) {
                window.alert('the two password should be same!');
            }
            else if(err_code === 500) {
                window.alert('server busy!');
            }
        }
    });
});