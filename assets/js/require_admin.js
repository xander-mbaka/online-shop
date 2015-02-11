requirejs.config({
  baseUrl: "../assets/js",
  paths: {
    backbone: "vendor/backbone",
    "backbone.picky": "vendor/backbone.picky",
    "backbone.syphon": "vendor/backbone.syphon",    
    "backbone.modelBinder": "vendor/backbone.modelbinder",
    jquery: "vendor/jquery",
    "jquery-ui": "vendor/jquery-ui",
    json2: "vendor/json2",
    localstorage: "vendor/backbone.localstorage",
    marionette: "vendor/backbone.marionette",
    bcarousel: "additions/bootstrap-carousel",
    bcollapse: "additions/bootstrap-collapse",
    dlmenu: "additions/jquery.dlmenu",
    modnav: "additions/modernizr.nav",
    fileupload: "additions/jquery.fileupload",
    iframe: "additions/jquery.iframe-transport",
    knob: "additions/jquery.knob",
    widget: "additions/jquery.ui.widget",
    spin: "vendor/spin",
    "spin.jquery": "vendor/spin.jquery",
    tpl: "vendor/tpl",
    underscore: "vendor/underscore",
    wysiwyg: "additions/wysihtml5",
    padvanced: "additions/parser_rules/advanced"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    "backbone.picky": ["backbone"],
    "backbone.syphon": ["backbone"],
    "backbone.modelBinder": ["backbone"],
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "jquery-ui": ["jquery"],
    bcarousel: ["jquery"],
    bcollapse: ["jquery"],
    dlmenu: ["jquery"],
    knob: ["jquery"],
    fileupload: ["knob", "widget", "iframe"],
    localstorage: ["backbone"],
    "spin.jquery": ["spin", "jquery"]
  }
});

require(["app_admin", "apps/admin/auth/auth_app"], function(LightningAbstracts){
  LightningAbstracts.start();
});
