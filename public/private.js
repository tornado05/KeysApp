$(function () {
    window.KeysAppPrivate = (function () {

        var session = null;

        var initialize = function () {
           if (session) {

           }
        };        

        var authenticate = function () {
          var login = $('#login-form input[name="login"]').val(); 
          var pw = $('#login-form input[name="pw"]').val(); 
          $.ajax({
            url: '/authenticate',
            method: 'POST',
            data: {
                login: login,
                pw: pw
            }
          }).done(function (data) {
            session = data;
            $('#login-form').hide();
            $('#user-info').html('<div>Hello, ' + session.user_name + '</div>');
          });
        };

        var hello = function () {
            $.ajax({
                url: '/hello',
                data: {
                    token: session.token
                }
            }).done(function (data) {
                $('#hello').html(data);
            });
        };
        
        initialize();
        
        return {
            authenticate: authenticate,
            hello: hello
        };
    })();
});
