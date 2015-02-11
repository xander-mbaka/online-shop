
<form class="new-journal" enctype="multipart/form-data">
  <div class="loading" id="loading">
    <p class="loading-msg">VERIFYING</p>
    <div class="circle"></div>
    <div class="circle1"></div>
  </div>
  <div class="close"></div>
  <div class="login formTitle">NEW JOURNAL:</div>
  <div class="login journalData">
    <div class="labForm-group">
      <label class="lab-label">Name:</label>
      <input id="lab-jname" class="lab-input" name="name" type="text" value=""/>
    </div>
    <div class="labForm-group">
      <label class="lab-label">Journal URL:</label>
      <input id="lab-jurl" class="lab-input" name="url" type="text" value=""/>
    </div>
    <div class="labForm-group select">
      <label class="lab-label">Category:</label>
      <select id="lab-xcategory" class="lab-input" value="" name="category">
        <option value="1">Business</option>
        <option value="2">Finance</option>
        <option value="3">Economics</option>
      </select>
    </div>
    <div class="labForm-group five">
      <label class="lab-label">Scraping Function:</label>
      <textarea id="lab-xabstract" class="lab-textarea" value="" type="text" name="scrapingFn" rows="10"></textarea>
    </div>
    <div class="form-btns">
      <button class="btn btn-primary create-button">Create</button>
      <button class="btn btn-primary cancel-button">Cancel</button>      
    </div>
    
  </div>
</form>
<form class="new-journal-img" method="post" enctype="multipart/form-data" action="../presentation/journals/upload.php">
      <div class="labForm-group half three-high">
        <label for="erp-back-image" class="lab-label half">Cover Image:</label>
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
            <input id="lab-journal-image" class="setup-img-input" name="journal-image" type="file" multiple="multiple"value="">
          </div>
        </div>
      </div>
    </form>