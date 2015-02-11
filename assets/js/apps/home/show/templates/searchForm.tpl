      <div class="search-title">FIND YOUR PROPERTY:</div>
      <form class="search-form">
        <fieldset class="myn-fieldset">
          <legend class="myn-legend">LOCATION:</legend>
          <input class="lab-input topel" type="text" name="county" placeholder="County">
          <input class="lab-input" type="text" name="town" placeholder="Town">
        </fieldset>
        <fieldset class="myn-fieldset">
          <legend class="myn-legend">PROPERTY TYPE:</legend>
          <select class="lab-input topel" name="offer" value="">
            <option value="all">Rent or Buy?</option>
            <option value="rent">Rent/Lease</option>
            <option value="sale">Sale</option>
          </select>
          <select id="propcat" class="lab-input" name="category" value="">
            <option value="all">Property? [Any]</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>
          <select class="lab-input residential" name="restype-options" value="">
            <option value="all">Residence Type? [Any]</option>
            <option value="flat">Apartment</option>
            <option value="bungalow">Bungalow</option>
            <option value="maisonette">Maisonette</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
          </select>
          <select class="lab-input commercial" name="comtype-options" value="">
            <option value="all">Space Type? [Any]</option>
            <option value="office">Office Space</option>
            <option value="warehouse">Warehouse</option>
            <option value="industrial">Industrial</option>
          </select>
          <select class="lab-input land" name="landtype-options" value="">
            <option value="all">Land Type? [Any]</option>
            <option value="plot">Plot</option>
            <option value="farm">Farm</option>
            <option value="ranch">Ranch</option>
          </select>
        </fieldset>
        <fieldset class="myn-fieldset">
          <legend class="myn-legend">PROPERTY FEATURES:</legend>
          <div class="residential">
            <input class="lab-input topel" type="number" name="bedrooms" placeholder="Bedrooms">
            <input class="lab-input" type="number" name="bathrooms" placeholder="Bathrooms">
            <input class="lab-input" type="number" name="rsize" placeholder="Minimum size in Square Ft.">
          </div>
          <div class="commercial">
            <select class="lab-input" name="placement" value="">
              <option value="all">Property Elevation? [Any]</option>
              <option value="ground">Ground - First Floor</option>
              <option value="highrise">second Floor and above</option>
            </select>
            <select class="lab-input" name="location" value="">
              <option value="all">Zone? [Any]</option>
              <option value="cbd">CBD</option>
              <option value="outskirt">Town Outskirts</option>
              <option value="suburb">Suburbs</option>              
            </select>
            <input class="lab-input" type="number" name="csize" placeholder="Minimum size in Square Ft.">
          </div>
          <div class="land">
            <select class="lab-input" name="landuse" value="">
              <option value="all">Land Use? [Any]</option>
              <option value="development">Development</option>
              <option value="agriculture">Agriculture</option>
              <option value="prospecting">Prospecting</option>
            </select>
            <input class="lab-input" type="number" name="lsize" placeholder="Acres">
          </div>
          
        </fieldset>
        <fieldset class="myn-fieldset">
          <legend class="myn-legend">PRICE RANGE:</legend>
          
          <input class="lab-input topel" type="number" name="minprice" placeholder="Minimum: 50,000">
          <input class="lab-input" type="number" name="maxprice" placeholder="Maximum: 500,000,000">
          <!--input type="range" id="rangeInputx" min="500000" max="500000000">
          <input class="lab-input" type="text" name="rangeInput" id="textInputx" value="" placeholder=""-->
        </fieldset>
        <fieldset class="myn-fieldset">
          <button class="lab-button">SEARCH</button>
        </fieldset>
      </form>