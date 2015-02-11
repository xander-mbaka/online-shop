define(["app_admin", "tpl!apps/admin/journals/show/templates/journals.tpl", "tpl!apps/admin/journals/show/templates/journal_item.tpl",
  "tpl!apps/admin/journals/show/templates/new_journal.tpl", "tpl!apps/admin/journals/show/templates/edit_journal.tpl",
  "tpl!apps/admin/journals/show/templates/categories.tpl", "tpl!apps/admin/journals/show/templates/category_item.tpl",
  "tpl!apps/admin/journals/show/templates/new_category.tpl", "tpl!apps/admin/journals/show/templates/edit_category.tpl",
  "tpl!apps/admin/journals/show/templates/issues.tpl", "tpl!apps/admin/journals/show/templates/issue_item.tpl",
  "tpl!apps/admin/journals/show/templates/issue.tpl", "tpl!apps/admin/journals/show/templates/article_item.tpl", 
  "tpl!apps/admin/journals/show/templates/review_issues.tpl", "tpl!apps/admin/journals/show/templates/edit_issue.tpl",
   "tpl!apps/admin/journals/show/templates/edit_article_item.tpl", "tpl!apps/admin/journals/show/templates/new_issue.tpl", 
   "tpl!apps/admin/journals/show/templates/new_article.tpl", "tpl!apps/admin/journals/show/templates/edit_article.tpl", 
   "backbone.modelBinder", "backbone.syphon", "fileupload"],
   function(LightningAbstracts, journalsTpl, journalItemTpl, newJournalTpl, editJournalTpl, categoriesTpl, categoryItemTpl, 
    newCategoryTpl, editCategoryTpl, issuesTpl, issueItemTpl, issueTpl, articleItemTpl, reviewIssuesTpl, editIssueTpl,
    editArticleItemTpl, newIssueTpl, newArticleTpl, editArticleTpl){
  LightningAbstracts.module('JournalsApp.Show.View', function(View, LightningAbstracts, Backbone, Marionette, $, _){

    View.JournalItem = Marionette.ItemView.extend({      

      	template: journalItemTpl,

      	tagName: "li",

      	className: "ajournal",   	 

      	events: {
        	"click .joptions #btn-view": "viewJournal",
          "click .joptions #btn-edit": "editJournal",
          "click .joptions #btn-delete": "deleteJournal"
      	},

      	viewJournal: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("navigate", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        },

        editJournal: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        },

        deleteJournal: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("delete", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.Journals = Marionette.CompositeView.extend({

      template: journalsTpl,

      itemView: View.JournalItem,

      itemViewContainer: "ul",

      events: {
        "click .addjournal-btn": "addJournal"
      },

      initialize: function(){  },

      onRender: function(){  },

      onShow: function(){  },

      addJournal: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("addJournal");
      },

      viewNode: function (e) {
        e.preventDefault();
        e.stopPropagation();
        //alert("boom");
      }
    });

    View.NewJournal = Marionette.ItemView.extend({      

        template: newJournalTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .create-button": "createJournal"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
           var ul = $('#img-cont ul');

          $('#journal-img a').click(function(){
              // Simulate a click on the file input button
              // to show the file browser dialog
              $(this).parent().find('input').click();
          });

          var tplj, dtx;

          // Initialize the jQuery File Upload plugin
          $('.new-journal-img').fileupload({

              // This element will accept file drag/drop uploading
              dropZone: $('#journal-img'),

              // This function is called when a file is added to the queue;
              // either via the browse button, or via drag/drop:
              add: function (e, data) {

                  var tpl = $('<li class="working bg-img"><figure><img><figcaption id="jcover-img"></figcaption></figure><!-- input type="text" value="0" data-width="48" data-height="48"'+
                      ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" />< p></p ><span></span --></li>');

                  // Append the file name and file size
                  dtx = data;
                  tplj = tpl;

                  
                  tpl.find('figcaption').text(data.files[0].name)
                  //tpl.find('p').text(data.files[0].name)
                               //.append('<i>' + formatFileSize(data.files[0].size) + '</i>');

                  // Add the HTML to the UL element
                  ul.empty();

                  data.context = tpl.appendTo(ul);

                  // Initialize the knob plugin
                  //tpl.find('input').knob();

                  // Listen for clicks on the cancel icon
                  /*tpl.find('span').click(function(){

                      if(tpl.hasClass('working')){
                          jqXHR.abort();
                      }

                      tpl.fadeOut(function(){
                          tpl.remove();
                      });

                  });*/

                  // Automatically upload the file once it is added to the queue
                  var jqXHR = data.submit();
              },

              progress: function(e, data){

                  // Calculate the completion percentage of the upload
                  var progress = parseInt(data.loaded / data.total * 100, 10);

                  // Update the hidden input field and trigger a change
                  // so that the jQuery knob plugin knows to update the dial

                  //data.context.find('input').val(progress).change();

                  if(progress == 100){
                      data.context.removeClass('working');
                      tplj.find('img').attr('src', '../assets/journalcovers/'+dtx.files[0].name);
                      //$(new Image()).attr('src', '' + _filename).appendTo($('#imageContainter')).fadeIn();
                  }
              },

              fail:function(e, data){
                  // Something has gone wrong!
                  data.context.addClass('error');
              }

          });


          // Prevent the default action when a file is dropped on the window
          $(document).on('drop dragover', function (e) {
              e.preventDefault();
          });

          // Helper function that formats the file sizes
          function formatFileSize(bytes) {
              if (typeof bytes !== 'number') {
                  return '';
              }

              if (bytes >= 1000000000) {
                  return (bytes / 1000000000).toFixed(2) + ' GB';
              }

              if (bytes >= 1000000) {
                  return (bytes / 1000000).toFixed(2) + ' MB';
              }

              return (bytes / 1000).toFixed(2) + ' KB';
          }
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          //var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal-image]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=issue]").focus();

         
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=issue]").focus();
        },


        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        createJournal: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['coverImgUrl'] = $("#jcover-img").text();
          this.trigger("createJournal", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.EditJournal = Marionette.ItemView.extend({      

        template: editJournalTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .update-button": "updateJournal"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
          var m = this.model.get('cover_img_url').split('/');
          //alert(m[3]);
          this.model.set('min_img_url', m[3]);
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
           var ul = $('#img-cont ul');

          $('#journal-img a').click(function(){
              // Simulate a click on the file input button
              // to show the file browser dialog
              $(this).parent().find('input').click();
          });

          var tplj, dtx;

          // Initialize the jQuery File Upload plugin
          $('.new-journal-img').fileupload({

              // This element will accept file drag/drop uploading
              dropZone: $('#journal-img'),

              // This function is called when a file is added to the queue;
              // either via the browse button, or via drag/drop:
              add: function (e, data) {

                  var tpl = $('<li class="working bg-img"><figure><img><figcaption id="jcover-img"></figcaption></figure><!-- input type="text" value="0" data-width="48" data-height="48"'+
                      ' data-fgColor="#0788a5" data-readOnly="1" data-bgColor="#3e4043" />< p></p ><span></span --></li>');

                  // Append the file name and file size
                  dtx = data;
                  tplj = tpl;

                  
                  tpl.find('figcaption').text(data.files[0].name)
                  //tpl.find('p').text(data.files[0].name)
                               //.append('<i>' + formatFileSize(data.files[0].size) + '</i>');

                  // Add the HTML to the UL element
                  ul.empty();

                  data.context = tpl.appendTo(ul);

                  // Initialize the knob plugin
                  //tpl.find('input').knob();

                  // Listen for clicks on the cancel icon
                  /*tpl.find('span').click(function(){

                      if(tpl.hasClass('working')){
                          jqXHR.abort();
                      }

                      tpl.fadeOut(function(){
                          tpl.remove();
                      });

                  });*/

                  // Automatically upload the file once it is added to the queue
                  var jqXHR = data.submit();
              },

              progress: function(e, data){

                  // Calculate the completion percentage of the upload
                  var progress = parseInt(data.loaded / data.total * 100, 10);

                  // Update the hidden input field and trigger a change
                  // so that the jQuery knob plugin knows to update the dial

                  //data.context.find('input').val(progress).change();

                  if(progress == 100){
                      data.context.removeClass('working');
                      tplj.find('img').attr('src', '../assets/journalcovers/'+dtx.files[0].name);
                      //$(new Image()).attr('src', '' + _filename).appendTo($('#imageContainter')).fadeIn();
                  }
              },

              fail:function(e, data){
                  // Something has gone wrong!
                  data.context.addClass('error');
              }

          });


          // Prevent the default action when a file is dropped on the window
          $(document).on('drop dragover', function (e) {
              e.preventDefault();
          });

          // Helper function that formats the file sizes
          function formatFileSize(bytes) {
              if (typeof bytes !== 'number') {
                  return '';
              }

              if (bytes >= 1000000000) {
                  return (bytes / 1000000000).toFixed(2) + ' GB';
              }

              if (bytes >= 1000000) {
                  return (bytes / 1000000).toFixed(2) + ' MB';
              }

              return (bytes / 1000).toFixed(2) + ' KB';
          }
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          //var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal-image]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=issue]").focus();

         
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=issue]").focus();
        },


        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        updateJournal: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['coverImgUrl'] = $("#jcover-img").text();
          this.trigger("updateJournal", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.IssueItem = Marionette.ItemView.extend({      

        template: issueItemTpl,

        tagName: "li",

        className: "anissue",     

        events: {
          "click .ioptions #btn-edit": "editIssue",
          "click .ioptions #btn-review": "reviewIssue",
          "click .ioptions #btn-delete": "deleteIssue"
        },

        editIssue: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        },

        reviewIssue: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("review", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        },

        deleteIssue: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("delete", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.IssuesPage = Marionette.CompositeView.extend({

      template: issuesTpl,

      itemView: View.IssueItem,

      itemViewContainer: "ul#issue-roll",

      events: {
        "click .journalslink": "viewJournals",
        "click .addissue-btn": "addIssue"
      },

      initialize: function(){ 
        this.collection = this.model.get('issues');
      },

      onRender: function(){  },

      onShow: function(){  },

      addIssue: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("addIssue", this.model);
      },

      viewJournals: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("navjournal");
      }
    });

    View.ArticleItem = Marionette.ItemView.extend({      

        template: articleItemTpl,

        tagName: "li",

        className: "anarticle"

    });

    /*View.NoArticle = Marionette.ItemView.extend({      

        template: noArticleTpl,    

        events: {
          "click .aoptions #btn-edit": "editArticle",
          "click .aoptions #btn-delete": "deleteArticle"
        },

        editArticle: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        },

        deleteArticle: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("delete", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });*/

    View.Issue = Marionette.CompositeView.extend({

      template: issueTpl,

      itemView: View.ArticleItem,

      itemViewContainer: "ul#article-roll",

      events: {
        "click .issueslink": "viewIssues",
      },

      initialize: function(){  
        this.collection = this.model.get('articles');
      },

      viewIssues: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("navissues");
      },

      onRender: function(){  },

      onShow: function(){  }
    });

    View.NewIssue = Marionette.ItemView.extend({      

        template: newIssueTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .create-button": "createIssue"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=issue]").focus();
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=issue]").focus();
        },


        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        createIssue: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['journalId'] = this.model.get('journal_id');
          this.trigger("createIssue", data, this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.EditIssue = Marionette.ItemView.extend({      

        template: editIssueTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .update-button": "updateIssue"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          //var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=issue]").focus();
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=issue]").focus();
        },


        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        updateIssue: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['journalId'] = this.model.get('journal_id');
          this.trigger("updateIssue", data, this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.NewArticle = Marionette.ItemView.extend({      

        template: newArticleTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .create-button": "createArticle"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          //var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=issue]").focus();
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=issue]").focus();
        },


        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        createArticle: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['journalId'] = this.model.get('journal_id');
          data['issue'] = this.model.get('issue');
          data['abstract'] = data['abstract'].replace(/"/g, '\'');
          this.trigger("createArticle", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.EditArticle = Marionette.ItemView.extend({      

        template: editArticleTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .update-button": "updateArticle"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          //var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=issue]").focus();
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=issue]").focus();
        },


        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        updateArticle: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['journalId'] = this.model.get('journal_id');
          data['issue'] = this.model.get('issue');
          data['abstract'] = data['abstract'].replace(/"/g, '\'');
          this.trigger("updateArticle", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.EditArticleItem = Marionette.ItemView.extend({      

        template: editArticleItemTpl,

        tagName: "li",

        className: "anarticle",     

        events: {
          "click .ioptions #btn-edit": "editArticle",
          "click .ioptions #btn-delete": "deleteArticle"
        },

        editArticle: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("editArticle", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        },

        deleteArticle: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("deleteArticle", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.ReviewIssues = Marionette.CompositeView.extend({

      template: reviewIssuesTpl,

      itemView: View.EditArticleItem,

      itemViewContainer: "ul#article-roll",

      events: {
        "click .issueslink": "viewIssues",
        "click .addarticle-btn": "addArticle"
      },

      initialize: function(){  
        this.collection = this.model.get('articles');
      },

      viewIssues: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("navissues");
      },

      addArticle: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("addarticle", this.model);
      },

      onRender: function(){  },

      onShow: function(){  }
    });

    View.CategoryItem = Marionette.ItemView.extend({      

        template: categoryItemTpl,

        tagName: "li",

        className: "acategory-item",    

        events: {
          "click .coptions #btn-edit": "editCategory",
          "click .coptions #btn-delete": "deleteCategory"
        },


        editCategory: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        },

        deleteCategory: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("delete", this.model);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.Categories = Marionette.CompositeView.extend({

      template: categoriesTpl,

      itemView: View.CategoryItem,

      itemViewContainer: "ul",

      events: {
        "click .addjournal-btn": "addCategory"
      },

      initialize: function(){  },

      onRender: function(){  },

      onShow: function(){  },

      addCategory: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.trigger("addCategory");
      },

      viewNode: function (e) {
        e.preventDefault();
        e.stopPropagation();
        //alert("boom");
      }
    });

    View.NewCategory = Marionette.ItemView.extend({      

        template: newCategoryTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .create-button": "createCategory"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          //var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal-image]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=name]").focus();

         
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=name]").focus();
        },


        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        createCategory: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          this.trigger("createCategory", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.EditCategory = Marionette.ItemView.extend({      

        template: editCategoryTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .update-button": "updateCategory"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
        },

        onRender: function() {
          $("#loading").hide();
          //$("#error").hide();
          //var name = this.model.get('name');
          //document.getElementById("lab-journalx").value = name;
          //$("input[name=journal-image]").val(name); //-- dereda nie??? i dont know why it refuse!
          $("input[name=name]").focus();

         
        },

        onCreationLoading: function(){
          $("#loading").slideDown();
        },

        onCreationDone: function(){
          $("#lightbox").removeClass("active");
        },

        onCreationError: function(){
          $("#loading").slideUp();
          $("input[name=name]").focus();
        },


        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        updateCategory: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['categoryId'] = this.model.get('category_id');
          this.trigger("updateCategory", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });
    

  });
  return LightningAbstracts.JournalsApp.Show.View;
  
});



 