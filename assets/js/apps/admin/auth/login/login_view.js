define(["app_admin", "tpl!apps/admin/auth/login/templates/login.tpl", "tpl!apps/admin/auth/login/templates/footer.tpl", "backbone.syphon"], 
  function(LightningAbstracts, loginTpl, footerTpl){
  LightningAbstracts.module('AuthApp.Views.Login', function(Views, LightningAbstracts, Backbone, Marionette, $, _){
    Views.Login = Marionette.ItemView.extend({
      className: "login-container",

      template: loginTpl,

      events: {
        'click button.login-button': 'submitClicked',
        'click button.retry-button': 'retryClicked'
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger("form:submit", data);
      },

      retryClicked: function(e){
        e.preventDefault();
        $("#error").slideUp();
        $("input[name=password]").val("");
        $("input[name=password]").focus();
      },

      onFormLoginInvalid: function(){
        $("#loading").slideUp();
        //$("#error-msg").text('Unable to login.');
        $("#error").slideDown();
      },

      onFormLoginLoading: function(){
        $("#loading").slideDown();
      },

      onRender: function() {
        $("#loading").hide();
        $("#error").hide();
        $("input[name=username]").focus();
      }
    });

    Views.Footer = Marionette.ItemView.extend({
      className: "login-logo",

      template: footerTpl,

      events: {
        'click div.login-logo': 'brandClicked',
      },

      brandClicked: function(){
        History.navigate("http://lightningabstract.com/");
      }
    });
  });

  return LightningAbstracts.AuthApp.Views.Login;
});