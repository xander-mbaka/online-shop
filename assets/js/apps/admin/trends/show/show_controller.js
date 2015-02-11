define(["app_admin", "apps/admin/trends/show/show_view"], function(LightningAbstracts, View){
  LightningAbstracts.module('TrendsApp.Show', function(Show, LightningAbstracts, Backbone, Marionette, $, _){
    Show.Controller = {
      showTrends: function(){
        require(["apps/admin/entities/lightning"], function(){
          $.when(LightningAbstracts.request("indicator:entities")).done(function(content){
            if(content !== undefined){
              var indicatorview = new View.Indicators({ collection: content });
              LightningAbstracts.mainRegion.show(indicatorview);

              indicatorview.on("itemview:navigate", function(arg, model){
                $.when(LightningAbstracts.request("indicator:history", model)).done(function(content){
                  if(content !== undefined){
                    var globalJournal = content;

                    LightningAbstracts.navigate("trends/" + globalJournal.get('indicator_id'));

                    var trends = new View.IndicatorTrend({ model: content });
                    LightningAbstracts.mainRegion.show(trends);

                    trends.on('navindicators', function() {
                      LightningAbstracts.mainRegion.show(indicatorview);
                    });

                    trends.on('itemview:view', function(arg, model) {
                      $.when(LightningAbstracts.request("issue:articles", model)).done(function(contents){
                        contents.set('cover_img_url', globalJournal.get('cover_img_url'));
                        contents.set('name', globalJournal.get('name'));
                        //alert(JSON.stringify(contents));
                        var issueView = new View.Issue({ model: contents });
                        LightningAbstracts.mainRegion.show(issueView);

                        issueView.on('navtrends', function() {
                          LightningAbstracts.mainRegion.show(trends);
                        });
                      });
                    });

                    trends.on('itemview:edit', function(arg, model) {
                      $.when(LightningAbstracts.request("issue:articles", model)).done(function(content){

                          content.set('cover_img_url', globalJournal.get('cover_img_url'));
                          content.set('name', globalJournal.get('name'));

                          var indicatorentry = new View.EditIndicatorEntry({ model: content });
                          LightningAbstracts.modalRegion.show(lightboxLayout);
                          lightboxLayout.lightbox.show(indicatorentry);

                          indicatorentry.on('addarticle', function(model) {
                            var newarticle = new View.NewArticle({ model: model });
                            LightningAbstracts.modalRegion.show(lightboxLayout);
                            lightboxLayout.lightbox.show(newarticle);
                            //LightningAbstracts.lightBoxRegion.show(newarticle);
                            newarticle.on('createArticle', function(data, model) {
                              newarticle.triggerMethod("creation:loading");
                              data['operation'] = 'createArticle';
                              $.post('/lightning/presentation/journals/index.php', data, function(result) {
                                          
                                //newarticle.triggerMethod("creation:error");
                                if (result == 1) {
                                  alert('Success: Article created');
                                  newarticle.triggerMethod("creation:done");
                                }else{
                                  alert('Error: Article NOT created');
                                  newarticle.triggerMethod("creation:error");
                                }
                              });
                            });
                          });

                          issueView.on('navtrends', function() {
                            LightningAbstracts.mainRegion.show(trends);
                          });

                          issueView.on('itemview:editIndicator', function(arg, model) {
                            var editarticle = new View.EditIndicator({ model: model });
                            LightningAbstracts.modalRegion.show(lightboxLayout);
                            lightboxLayout.lightbox.show(editarticle);
                            //LightningAbstracts.lightBoxRegion.show(editarticle);
                            editarticle.on('updateArticle', function(data) {
                              editarticle.triggerMethod("creation:loading");
                              data['operation'] = 'updateArticle';
                              data['articleId'] = model.get('article_id');
                              $.post('/lightning/presentation/journals/index.php', data, function(result) {
                                          
                                //editarticle.triggerMethod("creation:error");
                                if (result == 1) {
                                  alert('Success: Article updated');
                                  editarticle.triggerMethod("creation:done");
                                }else{
                                  alert('Error: Article NOT updated');
                                  editarticle.triggerMethod("creation:error");
                                }
                              });
                            });
                          });

                          issueView.on('itemview:deleteIndicatorEntry', function(arg, model) {
                            //LightningAbstracts.lightBoxRegion.show(newarticle);
                            var data = {};
                            data['operation'] = 'deleteIndicatorEntry';
                            data['indicatorId'] = model.get('indicator_id');
                            //
                            $.post('/lightning/presentation/trends/index.php', data, function(result) {
                              //newarticle.triggerMethod("creation:error");
                              if (result == 1) {
                                alert('Success: Article deleted');
                              }else{
                                alert('Error: Article NOT deleted');
                              }
                            });
                          });
                      });
                    });

                    trends.on('addEntry', function(model) {
                      //LightningAbstracts.mainRegion.show(indicatorview);
                      //show create issue page
                      var newissue = new View.NewIndicator({ model: content });
                      
                      LightningAbstracts.modalRegion.show(lightboxLayout);
                      lightboxLayout.lightbox.show(newissue);
                      //LightningAbstracts.lightBoxRegion.show(newissue);

                      newissue.on('navtrends', function() {
                        LightningAbstracts.mainRegion.show(trends);
                      });

                      newissue.on('createIssue', function(data, model) {
                        newissue.triggerMethod("creation:loading");
                        data['operation'] = 'createIssue';
                        $.post('/lightning/presentation/journals/index.php', data, function(result) {
                            //alert(result);
                            //newissue.triggerMethod("creation:error");
                            if (result == 1) {
                              newissue.triggerMethod("creation:done");
                              //latest.triggerMethod("form:clear");
                              model.set('issue', data['issue']);

                              $.when(LightningAbstracts.request("issue:articles", model)).done(function(content){

                                  content.set('cover_img_url', globalJournal.get('cover_img_url'));
                                  content.set('name', globalJournal.get('name'));

                                  var issueView = new View.EditIssue({ model: content });

                                  LightningAbstracts.mainRegion.show(issueView);

                                  issueView.on('addarticle', function(model) {
                                    var newarticle = new View.NewArticle({ model: model });
                                    LightningAbstracts.modalRegion.show(lightboxLayout);
                                    lightboxLayout.lightbox.show(newarticle);
                                    //LightningAbstracts.lightBoxRegion.show(newarticle);
                                    newarticle.on('createArticle', function(data, model) {
                                      newarticle.triggerMethod("creation:loading");
                                      data['operation'] = 'createArticle';
                                      $.post('/lightning/presentation/journals/index.php', data, function(result) {
                                          
                                          //newarticle.triggerMethod("creation:error");
                                          if (result == 1) {
                                            alert('Article added');
                                            newarticle.triggerMethod("creation:done");
                                          }else{
                                            alert(result);
                                            newarticle.triggerMethod("creation:error");
                                          }
                                      });
                                    });
                                  });

                                  issueView.on('navtrends', function() {
                                    LightningAbstracts.mainRegion.show(trends);
                                  });

                                  issueView.on('itemview:editArticle', function(model) {
                                    var editarticle = new View.EditArticle({ model: model });
                                    LightningAbstracts.modalRegion.show(lightboxLayout);
                                    lightboxLayout.lightbox.show(editarticle);
                                    //LightningAbstracts.lightBoxRegion.show(editarticle);
                                    editarticle.on('updateArticle', function(data) {
                                      editarticle.triggerMethod("creation:loading");
                                      data['operation'] = 'updateArticle';
                                      data['articleId'] = model.get('article_id');
                                      $.post('/lightning/presentation/journals/index.php', data, function(result) {
                                                  
                                        //editarticle.triggerMethod("creation:error");
                                        if (result == 1) {
                                          alert('Success: Article updated');
                                          editarticle.triggerMethod("creation:done");
                                        }else{
                                          alert('Error: Article NOT updated');
                                          editarticle.triggerMethod("creation:error");
                                        }
                                      });
                                    });
                                  });

                                  issueView.on('itemview:deleteArticle', function(model) {
                                    //LightningAbstracts.lightBoxRegion.show(newarticle);
                                    var data = {};
                                    data['operation'] = 'deleteArticle';
                                    data['articleId'] = model.get('article_id');
                                    data['journalId'] = model.get('journal_id');
                                    data['issue'] = model.get('journal_issue');
                                    $.post('/lightning/presentation/journals/index.php', data, function(result) {
                                      //newarticle.triggerMethod("creation:error");
                                      if (result == 1) {
                                        alert('Success: Article deleted');
                                      }else{
                                        alert('Error: Article NOT deleted');
                                      }
                                    });
                                  });
                              });
                            }else{
                              newissue.triggerMethod("creation:error");
                            }
                        });
                      });
                    });

                    trends.on('itemview:delete', function(journalId, issue) {                      
                      var data = {};
                      data['operation'] = 'deleteIssue';
                      data['journalId'] = issue.get('journal_id');
                      data['issue'] = issue.get('issue');
                      alert(JSON.stringify(data));
                      $.post('/lightning/presentation/journals/index.php', data, function(result) {
                        if (result == 1) {
                          alert('Issue deleted successfully');
                        };
                      });
                    });
                  }
                });
              });

              indicatorview.on("itemview:edit", function(arg, model){
                //navigate to where journal can be edited i.e name, img, scraping function and url
                var editindicator = new View.EditIndicator({ model: model});
                LightningAbstracts.modalRegion.show(lightboxLayout);
                lightboxLayout.lightbox.show(editindicator);
                //LightningAbstracts.lightBoxRegion.show(newarticle);
                editindicator.on('updateIndicator', function(data) {
                  editindicator.triggerMethod("creation:loading");
                  data['operation'] = 'updateIndicator';
                  //alert(JSON.stringify(data));
                  $.post('/lightning/presentation/trends/index.php', data, function(result) {
                    //editindicator.triggerMethod("creation:error");
                    alert(result);
                    if (result == 1) {
                      editindicator.triggerMethod("creation:done");
                    }else{
                      alert(result);
                      editindicator.triggerMethod("creation:error");
                    }
                  });
                });
              });

              indicatorview.on("itemview:delete", function(arg, model){
                var data = {};
                data['operation'] = 'deleteIndicator';
                data['indicatorId'] = model.get('indicator_id');

                $.post('/lightning/presentation/trends/index.php', data, function(result) {
                  //newarticle.triggerMethod("creation:error");
                  if (result == 1) {
                    alert('Indicator: ' + model.get('name') + " deleted.");
                  }else{
                    alert('Error: Indicator NOT deleted');
                    //newarticle.triggerMethod("creation:error");
                  }
                });
              });

              indicatorview.on("addIndicator", function(arg, data){
                var indicator = new View.NewIndicator();
                LightningAbstracts.modalRegion.show(lightboxLayout);
                lightboxLayout.lightbox.show(indicator);
                //LightningAbstracts.lightBoxRegion.show(newarticle);
                indicator.on('createIndicator', function(data, model) {
                  indicator.triggerMethod("creation:loading");
                  data['operation'] = 'createIndicator';
                  $.post('/lightning/presentation/trends/index.php', data, function(result) {
                    //indicator.triggerMethod("creation:error");
                    if (result == 1) {
                      alert('Success: Indicator created');
                      indicator.triggerMethod("creation:done");
                    }else{
                      alert('Error: Indicator NOT created');
                      indicator.triggerMethod("creation:error");
                    }
                  });
                });
                //alert(JSON.stringify(data));
                //navigate to where journal can be deleted according to journal_id
              });
            }
          });
      	});
      }
    };
  });

  return LightningAbstracts.TrendsApp.Show.Controller;
});
 