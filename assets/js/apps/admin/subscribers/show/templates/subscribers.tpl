<div class="archives-region">
      <div class="archives">        
        <div class="arch-head">
          <form>
              <div class="labForm-group">
                <label class="lab-label" for="lab-acategory">SUBSCRIBER FILTER</label>
                <select id="lab-afilter" class="lab-input" value="" name="filter">
                  <option value="0">All</option>
                  <option value="1">Paid</option>
                  <option value="2">Evaluation</option>
                  <option value="6">Active</option>
                  <option value="7">Suspended</option>
                </select>
              </div>
              <div class="labForm-group">
                <label class="lab-label" for="lab-asearch">NAME SEARCH</label>
                <input id="lab-asearch" class="lab-input" type="text" name="search" value="">
              </div>
          </form>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Package</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Paymode</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
      <!-- implement pagination here -->
    </div>
    <script type="text/javascript">
      var temp = '<%= filterkey %>';
      var mySelect = document.getElementById('lab-afilter');

      for(var i, j = 0; i = mySelect.options[j]; j++) {
        if(i.value == temp) {
          mySelect.selectedIndex = j;
          break;
        }
      }
    </script>