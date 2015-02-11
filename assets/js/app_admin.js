define(["marionette"], function(Marionette){
  var LightningAbstracts = new Marionette.Application();

  var checkLogin = function(callback) {
    $.ajax("/lightning/presentation/admin/?adminDetails", {
      method: "GET",
      success: function(data) {
        //data == OK
        data = JSON.parse(data);
        if (data) {
          return callback(data);
        }else{
          return callback(false);
        }
      },
      error: function(data) {
        return callback(false);
      }
    });
  };

  var runApplication = function(data) {
    if (data) {
      LightningAbstracts.execute("auth:ok", data);
    } else {
      LightningAbstracts.trigger("auth:displayLogin");
    }
  };

  LightningAbstracts.addRegions({
    headerRegion: "#header-region",
    navRegion: "#nav-region",
    mainRegion: "#main-region",
    modalRegion: "#modal-region",
    footerRegion: "#footer-region"
  });

  LightningAbstracts.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  LightningAbstracts.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  LightningAbstracts.on("initialize:after", function(){
    if(Backbone.history){
      checkLogin(runApplication);
      Backbone.history.start();
      //Backbone.history.start({ pushState: true, root: "/lightning/admin/" });
    }
  });

  return LightningAbstracts;
});
