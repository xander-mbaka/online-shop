  <h5 class="ititle"><%= name %></h5>
  <img src="<%= logo_url %>">
  <div class="isection">
    <% var d = new Date(); %>
    <% var y = d.getFullYear(); %>
    <p><%= current_period %> - <%= y %></p>
    <img src="./assets/img/pindicator.png">
    <h5><%= stytp %></h5>
  </div>
  <ul>
      <li class="isection">
        <p><%= previous_period %> - <%= y %></p>
        <img src="./assets/img/pindicator.png">
        <h5><%= stypp %></h5>
      </li>
      <li class="isection">
        <p><%= current_period %> - <%= y - 1 %></p>
        <img src="./assets/img/nindicator.png">
        <h5><%= slytp %></h5>
      </li>
  </ul>