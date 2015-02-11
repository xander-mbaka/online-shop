<div class="blog-region blog-creation">

      <div class="blog-content">
        <a href="#blog" class="bloglink"><img src="../assets/img/prev-arrow.png"></a>
        <h3 id="blogtitle" contenteditable="true"><%= title %></h3>
        <form>
          <div id="toolbar" style="display: none;">
            <a data-wysihtml5-command="bold" title="CTRL+B"></a>
            <a data-wysihtml5-command="italic" title="CTRL+I"></a>
            <a data-wysihtml5-command="createLink"></a>
            <a data-wysihtml5-command="insertImage"></a>
            <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1"></a>
            <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h2"></a>
            <a data-wysihtml5-command="insertUnorderedList"></a>
            <a data-wysihtml5-command="insertOrderedList"></a>
            <a data-wysihtml5-command-group="foreColor" class="fore-color">
              <ul>
                <li data-wysihtml5-command-value="silver" data-wysihtml5-command="foreColor"></li>
                <li data-wysihtml5-command-value="gray" data-wysihtml5-command="foreColor"></li>
                <li data-wysihtml5-command-value="maroon" data-wysihtml5-command="foreColor"></li>
                <li data-wysihtml5-command-value="red" data-wysihtml5-command="foreColor"></li>
                <li data-wysihtml5-command-value="purple" data-wysihtml5-command="foreColor"></li>
                <li data-wysihtml5-command-value="green" data-wysihtml5-command="foreColor"></li>
                <li data-wysihtml5-command-value="olive" data-wysihtml5-command="foreColor"></li>
                <li data-wysihtml5-command-value="navy" data-wysihtml5-command="foreColor"></li>
                <li data-wysihtml5-command-value="blue" data-wysihtml5-command="foreColor"></li>
              </ul>
            </a>
            <a data-wysihtml5-command="insertSpeech"></a>
            <a data-wysihtml5-action="change_view"></a>
            
            <div data-wysihtml5-dialog="createLink" style="display: none;">
              <label>
                Link:
                <input data-wysihtml5-dialog-field="href" value="http://">
              </label>
              <a data-wysihtml5-dialog-action="save">OK</a>&nbsp;<a data-wysihtml5-dialog-action="cancel">Cancel</a>
            </div>
            
            <div data-wysihtml5-dialog="insertImage" style="display: none;">
              <label>
                Image:
                <input data-wysihtml5-dialog-field="src" value="http://">
              </label>
              <label>
                Align:
                <select data-wysihtml5-dialog-field="className">
                  <option value="">default</option>
                  <option value="wysiwyg-float-left">left</option>
                  <option value="wysiwyg-float-right">right</option>
                </select>
              </label>
              <a data-wysihtml5-dialog-action="save">OK</a>&nbsp;<a data-wysihtml5-dialog-action="cancel">Cancel</a>
            </div>
            
          </div>
          <textarea id="blogeditor" placeholder="Enter text ..."><%= full %></textarea>
          <div class="form-btns">
            <button class="btn btn-primary update-button">Update</button>
            <button class="btn btn-primary cancel-button">Cancel</button>      
          </div>
        </form>

        <!--div class="share-blog">
          <a href="#"><img src="../assets/img/fb.jpg"></a>
          <a href="#"><img src="../assets/img/twtr.jpg"></a>
          <a href="#"><img src="../assets/img/gplus.jpg"></a>
        </div-->
      </div>

    </div>
