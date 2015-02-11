define(["marionette", "apps/config/marionette/regions/dialog", "bcarousel", "bcollapse"], function(Marionette){
  var LightningAbstracts = new Marionette.Application();

  LightningAbstracts.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
      el: "#dialog-region"
    }),
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
      require(["apps/user/feeds/feeds_app", "apps/user/archives/archives_app", "apps/user/prefs/prefs_app"], function () {
        
        Backbone.history.start();

        if(LightningAbstracts.getCurrentRoute() === ""){
          LightningAbstracts.trigger("feeds:show");
        }
      });
    }
  });

  return LightningAbstracts;
});
