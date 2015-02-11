define(["app_admin"], function(LightningAbstracts){
  LightningAbstracts.module('BlogApp', function(BlogApp, LightningAbstracts, Backbone, Marionette, $, _){

    BlogApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "blog" : "showBlog"
      }
    });

    var API = {
      showBlog: function(){
        require(["apps/admin/blog/show/show_controller"], function(ShowController){
          ShowController.showBlog();
          //ShowController.showBlogContents(2);
          LightningAbstracts.execute("set:active:header", "blog");
        });
      }
    };

    LightningAbstracts.on("blog:show", function(){
      LightningAbstracts.navigate("blog");
      API.showBlog();
    });

    LightningAbstracts.addInitializer(function(){
      new BlogApp.Router({
        controller: API
      });
    });
  });

  return LightningAbstracts.BlogApp;
});
