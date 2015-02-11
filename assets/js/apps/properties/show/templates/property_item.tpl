           <img src="<%= img_url %>">
            <ul class="pFeatures">
              <li class="pFeature"><span><%= feature_one_val %></span><br><br><%= feature_one %></li>
              <li class="pFeature"><span><%= feature_two_val %></span><br><br><%= feature_two %><li>
            </ul>
            <div class="pCenter">
              <h3 class="pcName"><%= name %></h3>
              <p class="pcAddress"><%= address %>, <%= county %> County</p>
              <p class="pcTown"><%= town %></p>
              <p class="pcDescription"><%= description %></p>
            </div>
            <div class="pExt">
              <p class="peOffer"><%= offer %></p>
              <p class="pePrice"><%= display_price %> <span>KES.</span></p>
              <a href="#properties/<%= property_id %>" class="peDetails">Details</a>
            </div>            
