<div class="blog-region">

      <div class="blog-content">
        <a href="index.php#blog" class="bloglink"><img src="./assets/img/prev-arrow.png"></a>
        <h3><%= title %></h3>
        <div class="authority">
          <img src="<%= author_img_url %>">
          <p><%= author %>, <span><%= author_title %></span></p>
          <h6><%= date_added %></h6>
        </div>
        <p class="full-content"><%= full %></p>
        <div class="share-blog">
          <a href="#"><img src="./assets/img/fb.jpg"></a>
          <a href="#"><img src="./assets/img/twtr.jpg"></a>
          <a href="#"><img src="./assets/img/gplus.jpg"></a>
        </div>
      </div>

      <div class="blog-responses">
        <ul>
         
        </ul>
        <form>
          <div class="labForm-group">
              <label class="lab-label" for="lab-comname">NAME</label>
              <input id="lab-comname" class="lab-input" type="text" name="comname" value="">
            </div>
            <div class="labForm-group five">
              <label class="lab-label" for="lab-commessage">COMMENT</label>
              <textarea id="lab-commessage" class="lab-textarea five"  placeholder="Comment" type="text" name="commessage" rows="5"></textarea>
            </div>
          <button class="btn btn-primary btn-small rpost">POST</button>
        </form>
      </div>
    </div>
