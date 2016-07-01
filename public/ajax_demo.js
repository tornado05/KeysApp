$('#ajax-demo').click(function () {
    $.ajax('hello').done(function (data) {
        $('#ajax-result-demo').html(data);
    });
});
