      <td><img src="<%= img_url %>"></td>
      <td><%= name %></td>
      <td><%= role %></td>
      <td><%= email %></td>
      <td><%= authority_level %></td>
      <td><% if (status == 0) { %>Suspended<% } else { %>Active<% } %></td>
      <td>
        <a class="btn btn-small js-edit" href="#">
          <i class="icon-pencil"></i>Manage
        </a>
        <button class="btn btn-small js-delete">
          <i class="icon-remove"></i>Delete
        </button>
      </td>