define(["app_admin"], function(LightningAbstracts){
  LightningAbstracts.module('AuthApp.Login', function(Login, LightningAbstracts, Backbone, Marionette, $, _){
    Login.Controller = {
      displayLogin: function(){
        require(["apps/admin/auth/login/login_view"], function(View){
          var footerView = new View.Footer();
          var loginView = new View.Login();
          
          loginView.on("form:submit", function(data){
            data['operation'] = 'login';
            //setTimeout(function(){
              $.post('/lightning/presentation/admin/index.php', data, function(userData) {
                if (userData == false) {
                  loginView.triggerMethod("form:login:invalid");
                }else{
                  userData = JSON.parse(userData);
                  LightningAbstracts.execute('auth:ok', userData);
                }                
              });
            //}, 3000);
                      
          });

          LightningAbstracts.mainRegion.show(loginView);
          LightningAbstracts.footerRegion.show(footerView);
        });
      }
    };

  });

  return LightningAbstracts.AuthApp.Login.Controller;
});

