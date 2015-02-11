define(["app_admin"], function(LightningAbstracts){
  LightningAbstracts.module('AuthApp', function(AuthApp, LightningAbstracts, Backbone, Marionette, $, _){
    AuthApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "displayLogin": "displayLogin",
        "logout": "logout",
        "changePassword": "changePassword"
      } 
    });

    var API = {
      displayLogin: function(){
        //deferred instantiation
        require(["apps/admin/auth/login/login_controller"], function(LoginController){
          LoginController.displayLogin();
        })
      },

      logout: function(){
        LightningAbstracts.trigger('logout');
      },

      changePassword: function(id){
        require(["apps/admin/auth/authControl/password_controller"], function(PasswordController){
          PasswordController.changePassword(id);
        });
      }
    };

    LightningAbstracts.on("auth:displayLogin", function(){
      LightningAbstracts.navigate("login");
      API.displayLogin();
    });

    LightningAbstracts.on("auth:logout", function(){
      LightningAbstracts.navigate("logout");
      API.logout();
    });


    LightningAbstracts.on("auth:changePassword", function(id){
      LightningAbstracts.navigate("changePassword");
      API.showContact(id);
    });

    LightningAbstracts.commands.setHandler("auth:ok", function(data){
      //data object includes all allowable views to be set in the require.js define input
      require(["apps/admin/header/header_app", "apps/admin/footer/footer_app", "apps/admin/dashboard/dashboard_app", 
        "apps/admin/journals/journals_app", "apps/admin/trends/trends_app", "apps/admin/subscribers/subscribers_app", "apps/admin/blog/blog_app", "apps/admin/admin/admin_app"], function () {
        
        //Backbone.history.start({ pushState: true, root: "/lightning/admin/" });

        //if(LightningAbstracts.getCurrentRoute() === ""){
          LightningAbstracts.trigger("dash:show");
          LightningAbstracts.trigger("header:start", data);
          LightningAbstracts.trigger("footer:start");
        //}
      });
    });

    LightningAbstracts.addInitializer(function(){
      new AuthApp.Router({
        controller: API
      });
    });
  });

  return LightningAbstracts.AuthApp;
});
