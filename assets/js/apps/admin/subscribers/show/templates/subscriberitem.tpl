      <td><%= username %></td>
      <td><%= package %></td>
      <td><%= subscription_expiry %></td>
      <td><% if (status == 0) { %>Suspended<% } else { %>Active<% } %></td>
      <td><%= paymode %></td>
      <td>
        <a class="btn btn-small js-edit" href="#">
          <i class="icon-pencil"></i>Manage
        </a>
        <button class="btn btn-small js-delete">
          <i class="icon-remove"></i>Delete
        </button>
      </td>