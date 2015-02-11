<?php
  // Include utility files
  require_once 'include/config.php';
  require_once DOMAIN_DIR . 'error_handler.php';

  // Sets the error handler
  ErrorHandler::SetHandler();
  session_start();

  // Try to load inexistent file
  //require_once 'inexistent_file.php';

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pablo Gift Shop</title>
    <link href="./assets/css/bootstrap.css" rel="stylesheet">
    <link href="./assets/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="./assets/css/application.css" rel="stylesheet">
    <link href="./assets/css/responsiveslides.css" rel="stylesheet">
  </head>

  <body>
    <div id="header-region"></div>
    <div id="auth-region"></div>
    <div id="main-region">
      <div class="homeloading">
        <div class="circlex"></div>
        <div class="circlex1"></div>
        <h5>Loading Catalog ... <br>Please wait</h5>
      </div>
    </div>
    <div id="dialog-region"></div>
    <div id="footer-region"></div>
    
    <script data-main="./assets/js/require_main.js" src="./assets/js/vendor/require.js"></script>
  </body>
</html>
