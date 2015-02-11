
<form class="new-journal" enctype="multipart/form-data">
  <div class="loading" id="loading">
    <p class="loading-msg">VERIFYING</p>
    <div class="circle"></div>
    <div class="circle1"></div>
  </div>
  <div class="close"></div>
  <div class="login formTitle">NEW INDICATOR:</div>
  <div class="login journalData">
    <div class="labForm-group">
      <label class="lab-label">Name:</label>
      <input id="lab-jname" class="lab-input" name="name" type="text" value=""/>
    </div>
    <div class="labForm-group">
      <label class="lab-label">Period:</label>
      <select id="lab-acategory" class="lab-input" value="" name="period">
        <option value="">Select</option>
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>                  
      </select>
    </div>
    <div class="form-btns">
      <button class="btn btn-primary create-button">Create</button>
      <button class="btn btn-primary cancel-button">Cancel</button>      
    </div>
    
  </div>
</form>
<form class="new-journal-img" method="post" enctype="multipart/form-data" action="../presentation/trends/upload.php">
      <div class="labForm-group half three-high">
        <label for="erp-back-image" class="lab-label half">Indicator Logo:</label>
        <div  id="img-cont" class="img-container">
          <ul>
            <li class="bg-img">
              <figure>
                <img src="../assets/img/upload-img.png">
                <figcaption></figcaption>
              </figure>
            </li>
          </ul>
          <div id="journal-img" class="upload-img">
            <a class="browse-cover" href="#">Browse</a>
            <input id="lab-indicator-logo" class="setup-img-input" name="indicator-logo" type="file" multiple="multiple"value="">
          </div>
        </div>
      </div>
    </form>