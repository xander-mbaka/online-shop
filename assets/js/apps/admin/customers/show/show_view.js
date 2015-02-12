define(["app_admin", "tpl!apps/admin/admin/show/templates/admins.tpl", "tpl!apps/admin/admin/show/templates/adminitem.tpl", 
	"tpl!apps/admin/admin/show/templates/new_admin.tpl", "tpl!apps/admin/admin/show/templates/edit_admin.tpl", 
   "tpl!apps/admin/admin/show/templates/changepass.tpl", "backbone.syphon", "fileupload"], 
   function(LightningAbstracts, adminsTpl, adminItemTpl, newAdminTpl, editAdminTpl, changePassTpl){
  LightningAbstracts.module('AdminApp.Show.View', function(View, LightningAbstracts, Backbone, Marionette, $, _){

    View.AdminItem = Marionette.ItemView.extend({      

      	template: adminItemTpl,

      	tagName: "tr",   	

      	events: {
          "click .js-edit": "editClicked",
          "click .js-delete": "deleteClicked"
      	},

        editClicked: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("edit", this.model);
        },

        deleteClicked: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          this.trigger("delete", this.model.get('admin_id'));
        }
    });

    View.Admins = Marionette.CompositeView.extend({

      template: adminsTpl,

      itemView: View.AdminItem,

      itemViewContainer: "tbody",

      events: {
        "click .btn-art": "fetchMore",
        "click .js-add": "addAdmin",
        "change #lab-afilter": "filter",
        "keyup #lab-asearch": "search"
      },

      initialize: function(){ 
        
      },

      onRender: function(){  },

      onShow: function(){ 
        this.$el.on('keyup keypress', 'form input[type="text"]', function(e) {
          if(e.which == 13) {
            e.preventDefault();
            return false;
          }
        });
      },

      fetchMore: function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert("No more currently");
      },

      filter: function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $view = this.$el;
        var $form = $view.find("form");
        var key = $view.find('#lab-afilter').val();
        //alert(key);
        this.trigger('filter', key);       
      },

      addAdmin: function (e) {
        e.preventDefault();
        e.stopPropagation();
        //alert(key);
        this.trigger('add');       
      },

      search: function (e) {
        if(e.which == 13)
        {
          e.preventDefault();
          e.stopPropagation();
          var $view = this.$el;
          var $form = $view.find("form");
          var name = $view.find('#lab-asearch').val();
          //alert(name);
          this.trigger('search', name);
        }
      }
    });

   View.Admin = Marionette.ItemView.extend({      

        template: editAdminTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .update-button": "updateAdmin"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
          var m = this.model.get('img_url').split('/');
          //alert(m[3]);
          this.model.set('min_img_url', m[3]);
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
          var ul = $('#img-cont ul');

          this.$el.on('keyup keypress', 'form input[type="text"]', function(e) {
            if(e.which == 13) {
              e.preventDefault();
              return false;
            }
          });

          $('#admin-img a').click(function(){
              // Simulate a click on the file input button
              // to show the file browser dialog
              $(this).parent().find('input').click();
          });

          var tplj, dtx;

          // Initialize the jQuery File Upload plugin
          $('.new-journal-img').fileupload({

              // This element will accept file drag/drop uploading
              dropZone: $('#admin-img'),

              // This function is called when a file is added to the queue;
              // either via the browse button, or via drag/drop:
              add: function (e, data) {

                  var tpl = $('<li class="working bg-img admin-img"><figure><img><figcaption id="jcover-img"></figcaption></figure></li>');

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
                      tplj.find('img').attr('src', '../assets/adminimages/'+dtx.files[0].name);
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

        onFormDone: function(){
          $("#lightbox").removeClass("active");
          this.close();
        },

        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        updateAdmin: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['adminId'] = this.model.get('admin_id');
          data['imgUrl'] = $("#jcover-img").text();
          //alert(JSON.stringify(data));
          this.trigger("update", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.NewAdmin = Marionette.ItemView.extend({      

        template: newAdminTpl,   

        events: {
          "click .close": "closeClicked",
          "click .cancel-button": "closeClicked",
          "click .create-button": "createAdmin",
          "keyup input[name='email']": "generatePassword",
          "change input[name='email']": "generatePassword"
        },

        initialize: function() {
          $("#lightbox").addClass("active");
        },

        onShow: function(){ 
          $("#lightbox").addClass("active");
          var ul = $('#img-cont ul');

          this.$el.on('keyup keypress', 'form input[type="text"]', function(e) {
            if(e.which == 13) {
              e.preventDefault();
              return false;
            }
          });

          $('#admin-img a').click(function(){
              // Simulate a click on the file input button
              // to show the file browser dialog
              $(this).parent().find('input').click();
          });

          var tplj, dtx;

          // Initialize the jQuery File Upload plugin
          $('.new-journal-img').fileupload({

              // This element will accept file drag/drop uploading
              dropZone: $('#admin-img'),

              // This function is called when a file is added to the queue;
              // either via the browse button, or via drag/drop:
              add: function (e, data) {

                  var tpl = $('<li class="working bg-img admin-img"><figure><img><figcaption id="jcover-img"></figcaption></figure></li>');

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
                      tplj.find('img').attr('src', '../assets/adminimages/'+dtx.files[0].name);
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

        onFormDone: function(){
          $("#lightbox").removeClass("active");
          this.close();
        },

        closeClicked: function(e) {
          e.preventDefault();
          e.stopPropagation();
          $("#lightbox").removeClass("active");
          this.close();
        },

        generatePassword: function() {
          var $view = this.$el;
          var $form = $view.find("form");
          //var pass1 = $("input[name=password]").val();
          //var pass2 = $("input[name=rptpassword]").val();
          var name = $form.find('input[name=email]').val();
          var m = name.split('@');
          $("input[name=password]").val(m[0]+'999admin');
          //alert(name +"::"+ m[0]);
        },

        createAdmin: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          data['imgUrl'] = $("#jcover-img").text();
          //alert(JSON.stringify(data));
          this.trigger("create", data);
          //alert("Head to latest article");
          //this.trigger("edit:division", this);
        }
    });

    View.Account = Marionette.ItemView.extend({
        template: changePassTpl,

        events: {
          'click button.csubmit': 'submitClicked',
          'keyup input[name=rptpassword]': 'verifyPassword'
        },

        initialize: function(){},

        onShow: function(){
          this.$el.find("button.csubmit").attr('disabled', true);
        },

        verifyPassword: function(e){
          var pass1 = $("input[name=newpassword]").val();
          var pass2 = $("input[name=rptpassword]").val();
          if (pass1 == pass2) {
            var data = Backbone.Syphon.serialize(this);
            $("input[name=rptpassword]").parent().removeClass('errors');
            $("input[name=rptpassword]").parent().addClass('ok');
            $("button.csubmit").attr('disabled', false);
          }else{
            $("input[name=rptpassword]").parent().removeClass('ok');
            $("input[name=rptpassword]").parent().addClass('errors');
            $("button.csubmit").attr('disabled', true);
          }
        },
        
        submitClicked: function(e){
            e.preventDefault();
            var pass1 = $("input[name=newpassword]").val();
            var pass2 = $("input[name=rptpassword]").val();
            if (pass1 == pass2) {
              var data = Backbone.Syphon.serialize(this);
              $("input[name=rptpassword]").parent().removeClass('errors');
              $("input[name=rptpassword]").parent().addClass('ok');
              this.trigger("changePassword", data, this.model.get('user_id'));
            }else{
              $("input[name=rptpassword]").parent().removeClass('ok');
              $("input[name=rptpassword]").parent().addClass('errors');
              alert("Please ensure both passwords are the same")
            }
        },

         onCreationDone: function(){
          $("input[name=password]").val('');
          $("input[name=newpassword]").val('');
          $("input[name=rptpassword]").val('');
        },

        onCreationError: function(){
          $("input[name=newpassword]").val('');
          $("input[name=rptpassword]").val('');
        }

    });
  });

  return LightningAbstracts.AdminApp.Show.View;
});
 