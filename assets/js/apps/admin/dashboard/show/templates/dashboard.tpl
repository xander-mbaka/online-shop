<div class="preferences-region">
	<div id="dash-content" class="archives dashview">
	  <ul class="dash-tab">
        <h4>DASHBOARD</h4>
        <li class="dash-section">
        	<h6>Subscriptions:</h6>
        	<ul>
        		<li>
        			<p>Total</p>
        			<p>Subscribers: <%= total %></p>
        			<p>Paying: <%= totalpaid %></p>
        			<p>Evaluation: <%= totaleval %></p>
        			<p>Expired: <%= totalexp %></p>
        		</li>
        		<li>
        			<p>Previous Week</p>
        			<p>Paying: <%= weekpaid %></p>
        			<p>Evaluation: <%= weekeval %></p>
        		</li>
        		<li>
        			<p>Current Year</p>
        			<p>Paying: <%= yearpaid %></p>
        			<p>Evaluation: <%= yeareval %></p>
        		</li>
        		<li>
        			<p>Active Users</p>
        			<p class="dash-num"><%= active %></p>
        		</li>
        		<li>
        			<p>Suspended Users</p>
        			<p class="dash-num"><%= suspended %></p>
        		</li>
        	</ul>
        </li>
        <li class="dash-section">
        	<h6>Journals:</h6>
        	<ul>
        		<li>
        			<p>Total Journals</p>
        			<p class="dash-num"><%= journals %></p>
        		</li>
        		<li>
        			<p>Total Categories</p>
        			<p class="dash-num"><%= categories %></p>
        		</li>
        		<li>
        			<p>Total Issues</p>
        			<p class="dash-num"><%= issues %></p>
        		</li>
        		<li>
        			<p>Total Articles</p>
        			<p class="dash-num"><%= articles %></p>
        		</li>
        		<li>
        			<p>Popularity Index</p>
        			<ul>
        				<li>1. </li>
        				<li>2. </li>
        				<li>3. </li>
        				<li>4. </li>
        				<li>5. </li>
        			</ul>
        		</li>
        	</ul>
        </li>
      </ul>
	</div>
</div>