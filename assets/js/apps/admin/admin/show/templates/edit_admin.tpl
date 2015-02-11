<form class="new-journal subscriber" enctype="multipart/form-data">
  <div class="loading" id="loading">
    <p class="loading-msg">VERIFYING</p>
    <div class="circle"></div>
    <div class="circle1"></div>
  </div>
  <div class="close"></div>
  <div class="login formTitle">EDIT ADMINISTRATOR:</div>
  <div class="login formData adminData">
    <div class="labForm-group">
      <label class="lab-label">Name:</label>
      <input id="lab-jname" class="lab-input" name="name" type="text" value="<%= name %>"/>
    </div>  
    <div class="labForm-group">
      <label class="lab-label">Email:</label>
      <input id="lab-jemail" class="lab-input" name="email" type="text" value="<%= email %>"/>
    </div>  
    <div class="labForm-group">
      <label class="lab-label">Role:</label>
      <input id="lab-jnetwork" class="lab-input" name="role" type="text" value="<%= role %>"/>
    </div>
    <div class="labForm-group select">
      <label class="lab-label">Authority Level:</label>
      <select id="lab-jauth" class="lab-input" value="" name="auth">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
    <div class="labForm-group select">
      <label class="lab-label">Status:</label>
      <select id="lab-jstatus" class="lab-input" value="" name="status">
        <option value="0">Suspended</option>
        <option value="1">Active</option>
      </select>
    </div>
    <div class="form-btns">
      <button class="btn btn-primary update-button">Update</button>
      <button class="btn btn-primary cancel-button">Cancel</button>      
    </div>    
  </div>
</form>
<form class="new-journal-img" method="post" enctype="multipart/form-data" action="../presentation/admin/upload.php">
      <div class="labForm-group half three-high">
        <label for="erp-back-image" class="lab-label half">Passport:</label>
        <div  id="img-cont" class="img-container">
          <ul>
            <li class="bg-img admin-img">
              <figure>
                <img src="<%= img_url %>">
                <figcaption id="jcover-img"><%= min_img_url %></figcaption>
              </figure>
            </li>
          </ul>
          <div id="admin-img" class="upload-img">
            <a class="browse-cover" href="#">Browse</a>
            <input id="lab-journal-image" class="setup-img-input" name="admin-image" type="file" multiple="multiple"value="">
          </div>
        </div>
      </div>
    </form>
<script type="text/javascript">
      var temp = '<%= authority_level %>';
      var temps = '<%= status %>';
      var mySelect = document.getElementById('lab-jauth');
      var mySelects = document.getElementById('lab-jstatus');

      for(var i, j = 0; i = mySelect.options[j]; j++) {
        if(i.value == temp) {
          mySelect.selectedIndex = j;
          break;
        }
      }

      for(var i, j = 0; i = mySelects.options[j]; j++) {
        if(i.value == temps) {
          mySelects.selectedIndex = j;
          break;
        }
      }
    </script>