<form>
  <div class="loading" id="loading">
    <p class="loading-msg">VERIFYING</p>
    <div class="circle"></div>
    <div class="circle1"></div>
  </div>
  <div class="error" id="error">
    <p class="error-msg">ACCESS<br>DENIED!!!</p>
    <img class="error-img" src="../assets/img/sad.png">
    <button class="btn retry-button">Retry</button>
  </div>
  <div class="login formTitle">Login:</div>
  <div class="login formData">
    <div class="loginForm-group">
      <label for="erp-email" class="login-label">Email:</label>
      <input id="erp-email" class="login-input" name="email" type="text" value=""/>
    </div>
    <div class="loginForm-group">
      <label for="erp-password" class="login-label">Password:</label>
      <input id="erp-password" class="login-input" name="password" type="password" value=""/>
    </div>
    <button class="btn login-button">Authorize</button>
  </div>
</form>