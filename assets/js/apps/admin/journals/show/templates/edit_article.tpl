<form class="new-article">
  <div class="loading" id="loading">
    <p class="loading-msg">VERIFYING</p>
    <div class="circle"></div>
    <div class="circle1"></div>
  </div>
  <div class="close"></div>
  <div class="login formTitle">EDIT ARTICLE:</div>
  <div class="login formData">
    <div class="labForm-group">
      <label class="lab-label">Title:</label>
      <input id="lab-xtitle" class="lab-input" name="title" type="text" value="<%= title %>"/>
    </div>
    <div class="labForm-group">
      <label class="lab-label">Author:</label>
      <input id="lab-xauthor" class="lab-input" name="author" type="text" value="<%= author %>"/>
    </div>
    <div class="labForm-group">
      <label class="lab-label">Hyperlink:</label>
      <input id="lab-xurl" class="lab-input" name="url" type="text" value="<%= URL %>"/>
    </div>
    <div class="labForm-group five">
      <label class="lab-label">Abstract:</label>
      <textarea id="lab-xabstract" class="lab-textarea" value="" type="text" name="abstract" rows="10"><%= abstract %></textarea>
    </div>
    <div class="labForm-group three">
      <label class="lab-label">Keywords:</label>
      <textarea id="lab-xkeywords" class="lab-textarea" value="" type="text" name="keywords" rows="3"><%= keywords %></textarea>
    </div>
    <div class="form-btns">
      <button class="btn btn-primary update-button">Update</button>
      <button class="btn btn-primary cancel-button">Cancel</button>      
    </div>
    
  </div>
</form>