<form class="new-journal subscriber" enctype="multipart/form-data">
  <div class="loading" id="loading">
    <p class="loading-msg">VERIFYING</p>
    <div class="circle"></div>
    <div class="circle1"></div>
  </div>
  <div class="close"></div>
  <div class="login formTitle">EDIT SUBSCRIBER:</div>
  <div class="login formData">
    <div class="labForm-group">
      <label class="lab-label">Name:</label>
      <input id="lab-jname" class="lab-input" name="name" type="text" value="<%= username %>"/>
    </div>  
    <div class="labForm-group">
      <label class="lab-label">Email:</label>
      <input id="lab-jemail" class="lab-input" name="email" type="text" value="<%= email %>"/>
    </div>  
    <div class="labForm-group">
      <label class="lab-label">Network:</label>
      <input id="lab-jnetwork" class="lab-input" name="network" type="text" value="<%= oauth_provider %>" disabled=true/>
    </div>
    <div class="labForm-group">
      <label class="lab-label">Package:</label>
      <input id="lab-jpackage" class="lab-input" name="package" type="text" value="<%= package %>" disabled=true/>
    </div>
    <!--div class="labForm-group select">
      <label class="lab-label">Package:</label>
      <select id="lab-xcategory" class="lab-input" value="" name="package">
        <option value="1">Evaluation</option>
        <option value="2">Individual</option>
        <option value="3">Team</option>
      </select>
    </div-->
    <div class="labForm-group">
      <label class="lab-label">Expiry:</label>
      <input id="lab-jexpiry" class="lab-input" name="expiry" type="text" value="<%= subscription_expiry %>"/>
    </div>
    <div class="labForm-group">
      <label class="lab-label">Pay Mode:</label>
      <input id="lab-jpaymode" class="lab-input" name="paymode" type="text" value="<%= paymode %>" disabled=true/>
    </div>
    <div class="labForm-group">
      <label class="lab-label">Standing Order:</label>
      <input id="lab-jorder" class="lab-input" name="order" type="text" value="<% if (standing_order == 0) { %>Cancel on expiry<% } else { %>Renew on expiry<% } %>" disabled=true/>
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
<script type="text/javascript">
      var temp = '<%= status %>';
      var mySelect = document.getElementById('lab-jstatus');

      for(var i, j = 0; i = mySelect.options[j]; j++) {
        if(i.value == temp) {
          mySelect.selectedIndex = j;
          break;
        }
      }
    </script>