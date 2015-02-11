define(["app_admin", "apps/admin/journals/show/show_view"], function(LightningAbstracts, View){
  LightningAbstracts.module('JournalsApp.Show', function(Show, LightningAbstracts, Backbone, Marionette, $, _){
    Show.Controller = {
      showJournals: function(lightboxLayout){
      	require(["apps/admin/entities/lightning"], function(){
          $.when(LightningAbstracts.request("journal:entities")).done(function(content){
            if(content !== undefined){
              var journalcollection = new View.Journals({ collection: content });
              LightningAbstracts.mainRegion.show(journalcollection);

              journalcollection.on("itemview:navigate", function(arg, model){
                $.when(LightningAbstracts.request("journal:issues", model)).done(function(content){
                  if(content !== undefined){
                    var globalJournal = content;

                    LightningAbstracts.navigate("journals/" + globalJournal.get('journal_id'));

                    var issues = new View.IssuesPage({ model: content });
                    LightningAbstracts.mainRegion.show(issues);

                    issues.on('navjournal', function() {
                      LightningAbstracts.mainRegion.show(journalcollection);
                    }); 

                    issues.on('itemview:edit', function(arg, model) {
                      //var editjournal = new View.EditJournal({ model: model});
                      var editissue = new View.EditIssue({ model: model });
                      LightningAbstracts.modalRegion.show(lightboxLayout);
                      lightboxLayout.lightbox.show(editissue);
                      //LightningAbstracts.lightBoxRegion.show(newarticle);
                      editissue.on('updateIssue', function(data, model) {
                        editissue.triggerMethod("creation:loading");
                        data['operation'] = 'updateIssue';
                        data['previssue'] = model.get('issue');
                        $.post('/lightning/presentation/journals/index.php', data, function(result) {
                          //editissue.triggerMethod("creation:error");
                          if (result == 1) {
                            alert('Success: Issue name edited');
                            model.set('issue', data['issue']);
                            issues.render();
                            editissue.triggerMethod("creation:done");
                          }else{
                            alert('Fail: Issue name NOT edited' + result);
                            editissue.triggerMethod("creation:error");
                          }
                        });
                      });
                    });

                    issues.on('itemview:review', function(arg, model) {
                      $.when(LightningAbstracts.request("issue:articles", model)).done(function(content){

                          content.set('cover_img_url', globalJournal.get('cover_img_url'));
                          content.set('name', globalJournal.get('name'));

                          var issueView = new View.ReviewIssues({ model: content });

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
                                  alert('Success: Article created');
                                  newarticle.triggerMethod("creation:done");
                                }else{
                                  alert('Error: Article NOT created');
                                  newarticle.triggerMethod("creation:error");
                                }
                              });
                            });
                          });

                          issueView.on('navissues', function() {
                            LightningAbstracts.mainRegion.show(issues);
                          });

                          issueView.on('itemview:editArticle', function(arg, model) {
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
                                  //model.set('issue', data['issue']);
                                  //issueView.render();
                                  editarticle.triggerMethod("creation:done");
                                }else{
                                  alert('Error: Article NOT updated');
                                  editarticle.triggerMethod("creation:error");
                                }
                              });
                            });
                          });

                          issueView.on('itemview:deleteArticle', function(arg, model) {
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
                    });

                    issues.on('addIssue', function(model) {
                      //LightningAbstracts.mainRegion.show(journalcollection);
                      //show create issue page
                      var newissue = new View.NewIssue({ model: content });
                      
                      LightningAbstracts.modalRegion.show(lightboxLayout);
                      lightboxLayout.lightbox.show(newissue);
                      //LightningAbstracts.lightBoxRegion.show(newissue);

                      newissue.on('navissues', function() {
                        LightningAbstracts.mainRegion.show(issues);
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

                                  issueView.on('navissues', function() {
                                    LightningAbstracts.mainRegion.show(issues);
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

                    issues.on('itemview:delete', function(journalId, issue) {                      
                      var data = {};
                      data['operation'] = 'deleteIssue';
                      data['journalId'] = issue.get('journal_id');
                      data['issue'] = issue.get('issue');
                      //alert(JSON.stringify(data));
                      $.post('/lightning/presentation/journals/index.php', data, function(result) {
                        if (result == 1) {
                          alert('Issue deleted successfully');
                        };
                      });
                    });
                  }
                });
              });

              journalcollection.on("itemview:edit", function(arg, model){
                //navigate to where journal can be edited i.e name, img, scraping function and url
                var editjournal = new View.EditJournal({ model: model});
                LightningAbstracts.modalRegion.show(lightboxLayout);
                lightboxLayout.lightbox.show(editjournal);
                //LightningAbstracts.lightBoxRegion.show(newarticle);
                editjournal.on('updateJournal', function(data) {
                  editjournal.triggerMethod("creation:loading");
                  data['operation'] = 'updateJournal';
                  data['journalId'] = model.get('journal_id');
                  //alert(JSON.stringify(data));
                  $.post('/lightning/presentation/journals/index.php', data, function(result) {
                    //editjournal.triggerMethod("creation:error");
                    if (result == 1) {
                      //edit model and rerender journal collection
                      editjournal.triggerMethod("creation:done");
                    }else{
                      alert(result);
                      editjournal.triggerMethod("creation:error");
                    }
                  });
                });
              });

              journalcollection.on("itemview:delete", function(arg, model){
                var data = {};
                data['operation'] = 'deleteJournal';
                data['journalId'] = model.get('journal_id');

                $.post('/lightning/presentation/journals/index.php', data, function(result) {
                  //newarticle.triggerMethod("creation:error");
                  if (result == 1) {
                    alert('Journal: ' + model.get('name') + " deleted.");
                    //delete model and rerender journal collection
                  }else{
                    alert('Error: Journal NOT deleted');
                    //newarticle.triggerMethod("creation:error");
                  }
                });
              });

              journalcollection.on("addJournal", function(arg, data){
                var newjournal = new View.NewJournal();
                LightningAbstracts.modalRegion.show(lightboxLayout);
                lightboxLayout.lightbox.show(newjournal);
                //LightningAbstracts.lightBoxRegion.show(newarticle);
                newjournal.on('createJournal', function(data, model) {
                  newjournal.triggerMethod("creation:loading");
                  data['operation'] = 'createJournal';
                  $.post('/lightning/presentation/journals/index.php', data, function(result) {
                    //newjournal.triggerMethod("creation:error");
                    if (result == 1) {
                      alert('Success: Journal created');
                      //add model and rerender journal collection
                      newjournal.triggerMethod("creation:done");
                    }else{
                      alert('Error: Journal NOT created');
                      newjournal.triggerMethod("creation:error");
                    }
                  });
                });
                //alert(JSON.stringify(data));
                //navigate to where journal can be deleted according to journal_id
              });
            }
          });
      	});
      },

      showCategories: function(lightboxLayout){

        require(["apps/admin/entities/lightning"], function(){
          $.when(LightningAbstracts.request("category:entities")).done(function(content){
            if(content !== undefined){
              var categoriesview = new View.Categories({ collection: content });
              LightningAbstracts.mainRegion.show(categoriesview);

              categoriesview.on("itemview:edit", function(arg, model){
                //navigate to where journal can be edited i.e name, img, scraping function and url
                var editcategory = new View.EditCategory({ model: model});
                LightningAbstracts.modalRegion.show(lightboxLayout);
                lightboxLayout.lightbox.show(editcategory);
                //LightningAbstracts.lightBoxRegion.show(newarticle);
                editcategory.on('updateCategory', function(data) {
                  editcategory.triggerMethod("creation:loading");
                  data['operation'] = 'updateCategory';
                  //alert(JSON.stringify(data));
                  $.post('/lightning/presentation/journals/index.php', data, function(result) {
                    //editcategory.triggerMethod("creation:error");
                    //alert(result);
                    if (result == 1) {
                      editcategory.triggerMethod("creation:done");
                    }else{
                      alert(result);
                      editcategory.triggerMethod("creation:error");
                    }
                  });
                });
              });

              categoriesview.on("itemview:delete", function(arg, model){

                var data = {};
                data['operation'] = 'deleteCategory';
                data['categoryId'] = model.get('category_id');
                //alert(JSON.stringify(data));
                $.post('/lightning/presentation/journals/index.php', data, function(result) {
                  //newarticle.triggerMethod("creation:error");
                  if (result == 1) {
                    alert('Category: ' + model.get('name') + " deleted.");
                  }else{
                    alert('Error: Category NOT deleted');
                    //newarticle.triggerMethod("creation:error");
                  }
                });
              });

              categoriesview.on("addCategory", function(){
                var newcategory = new View.NewCategory();
                LightningAbstracts.modalRegion.show(lightboxLayout);
                lightboxLayout.lightbox.show(newcategory);
                //LightningAbstracts.lightBoxRegion.show(newarticle);
                newcategory.on('createCategory', function(data) {
                  newcategory.triggerMethod("creation:loading");
                  data['operation'] = 'createCategory';
                  //alert(JSON.stringify(data));
                $.post('/lightning/presentation/journals/index.php', data, function(result) {
                    //newcategory.triggerMethod("creation:error");
                    if (result == 1) {
                      alert('Success: Category created');
                      newcategory.triggerMethod("creation:done");
                    }else{
                      alert('Error: Category NOT created');
                      newcategory.triggerMethod("creation:error");
                    }
                  });
                });
              });
            }
          });
        });
      }
    };
  });

  return LightningAbstracts.JournalsApp.Show.Controller;
}); 
