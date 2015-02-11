define(["app_admin", "apps/admin/blog/show/show_view"], function(LightningAbstracts, View){
  LightningAbstracts.module('BlogApp.Show', function(Show, LightningAbstracts, Backbone, Marionette, $, _){
    Show.Controller = {
      showBlog: function(){
        require(["apps/admin/entities/lightning"], function(){
          $.when(LightningAbstracts.request("blog:entities")).done(function(content){
            if(content !== undefined){
              var blogview = new View.BlogRoll({ collection: content });
              LightningAbstracts.mainRegion.show(blogview);

              blogview.on("itemview:navigate", function(arg, model){
                $.when(LightningAbstracts.request("blog:entity", model)).done(function(content){
                  if(content !== undefined){
                    var blogfull = new View.BlogFull({ model: content });
                    LightningAbstracts.mainRegion.show(blogfull);
                    $(document).scrollTop(0);

                    blogfull.on('navblog', function() {
                      LightningAbstracts.trigger("blog:show");
                    });

                    blogfull.on('rpost', function(data, blogId) {
                      data['comblogid'] = blogId;
                      $.post('/lightning/presentation/blogs/index.php', data, function(result) {
                          if (result == 1) {
                            blogfull.triggerMethod("form:clear");
                          };
                      });
                    });
                  }
                });
              });

              blogview.on("itemview:edit", function(arg, model){
                $.when(LightningAbstracts.request("blog:entity", model)).done(function(content){
                  if(content !== undefined){
                    var blogedit = new View.BlogEdit({ model: content });
                    LightningAbstracts.mainRegion.show(blogedit);
                    $(document).scrollTop(0);

                    blogedit.on('navblog', function() {
                      LightningAbstracts.trigger("blog:show");
                    });

                    blogedit.on('submit', function(data, blogId) {
                      data['blogId'] = model.get('blog_id');
                      data['operation'] = 'updateBlog';
                      $.post('/lightning/presentation/blogs/index.php', data, function(result) {
                          if (result == 1) {
                            alert('Success: Blog updated');
                          }else{
                            alert('Fail: Blog not updated');
                            //blogcreate.triggerMethod("creation:error");
                          }
                      });
                    });
                  }
                });
              });

              blogview.on("itemview:delete", function(arg, model){
                var data = {};                
                data['blogId'] = model.get('blog_id');
                data['operation'] = 'deleteBlog';
                $.post('/lightning/presentation/blogs/index.php', data, function(result) {
                    if (result == 1) {
                      alert('Article deleted successfully');
                      LightningAbstracts.trigger("blog:show");
                    }else{
                      alert('Fail: Article not deleted');
                      //blogcreate.triggerMethod("creation:error");
                    }
                });
              });

              blogview.on("create", function(){
                var blogcreate = new View.BlogCreate();
                LightningAbstracts.mainRegion.show(blogcreate);

                blogcreate.on('navblog', function() {
                  LightningAbstracts.trigger("blog:show");
                });

                blogcreate.on('submit', function(data) {
                  data['operation'] = 'createBlog';
                  $.post('/lightning/presentation/blogs/index.php', data, function(result) {
                    if (result == 1) {
                      alert('Success: Blog created');
                      //blogcreate.triggerMethod("form:clear");
                    }else{
                      alert('Fail: Blog not created');
                      //blogcreate.triggerMethod("creation:error");
                    }
                  });
                });
              });
            }
          });
        });
      }
    }
  });

  return LightningAbstracts.BlogApp.Show.Controller;
});
 