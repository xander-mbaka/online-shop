<form class="new-issue">
  <div class="loading" id="loading">
    <p class="loading-msg">VERIFYING</p>
    <div class="circle"></div>
    <div class="circle1"></div>
  </div>
  <div class="close"></div>
  <div class="login formTitle">EDIT ISSUE:</div>
  <div class="login formData">
    <div class="labForm-group">
      <label class="lab-label">Journal:</label>
      <input id="lab-journal" class="lab-input" name="journal" type="text" value="<%= journal_name %>" disabled="true"/>
    </div>
    <div class="labForm-group">
      <label class="lab-label">Issue:</label>
      <input id="lab-issue" class="lab-input" name="issue" type="text" value="<%= issue %>"/>
    </div>
    <div class="form-btns">
      <button class="btn btn-primary update-button">Update</button>
      <button class="btn btn-primary cancel-button">Cancel</button>      
    </div>
    
  </div>
</form>