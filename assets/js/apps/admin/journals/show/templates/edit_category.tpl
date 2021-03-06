
<form class="new-category" enctype="multipart/form-data">
  <div class="loading" id="loading">
    <p class="loading-msg">VERIFYING</p>
    <div class="circle"></div>
    <div class="circle1"></div>
  </div>
  <div class="close"></div>
  <div class="login formTitle">EDIT CATEGORY:</div>
  <div class="login formData">
    <div class="labForm-group">
      <label class="lab-label">Name:</label>
      <input id="lab-jname" class="lab-input" name="name" type="text" value="<%= name %>"/>
    </div>  
    <div class="labForm-group three">
      <label class="lab-label">Description:</label>
      <textarea id="lab-cdescription" class="lab-textarea" value="" type="text" name="description" rows="3"><%= description %></textarea>
    </div>
    <div class="form-btns">
      <button class="btn btn-primary update-button">Update</button>
      <button class="btn btn-primary cancel-button">Cancel</button>      
    </div>    
  </div>
</form>