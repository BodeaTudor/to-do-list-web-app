window.ToDoList = {
    API_BASE_URL: "http://localhost:8083/to-do-items",

    createItem: function () {
        var description = $("#description-field").val();
        var deadline = $("#deadline-pick").val();

        var item = {
            description: description,
            deadline: deadline
        };

        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(item)
        }).done(function (response) {
            ToDoList.getItems();
            location.reload();
        })
    },

    getItems: function () {
        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "GET",
        }).done(function (response) {
            ToDoList.displayItems(JSON.parse(response));
        })
    },

    displayItems: function (items) {

        var tableBodyHtml = "";

        items.forEach(item => tableBodyHtml += ToDoList.getItemRow(item));

        $("#to-do-items-table tbody").html(tableBodyHtml);
    },

    getItemRow: function (item) {
        var formattedDate = new Date(...item.deadline).toLocaleDateString("us-US");

        var checkedAttribute = item.done ? "checked" : "";

        return `<tr>
            <td>${item.description}</td>
            <td>${formattedDate}</td>
            <td><input class="mark-done-checkbox" type="checkbox" title="Done" data-id="${item.id}" ${checkedAttribute}></td>
            <td><a href="#" class="delete-item fa fa-trash" data-id="${item.id}"></a></td>
            </tr>`
    },

    updateItem: function (itemId, done) {
        $.ajax({
            url: ToDoList.API_BASE_URL + "?id=" + itemId,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify({
                done: done,
            })
        }).done(function (response) {
            ToDoList.getItems();
        })
    },

    deleteItem: function (itemId) {
        $.ajax({
            url: ToDoList.API_BASE_URL + "?id=" + itemId,
            method: "DELETE",
        }).done(function (response) {
            ToDoList.getItems();
        })
    },

    bindEvents: function () {
        $("#new-item-form").submit(function (event) {
            event.preventDefault();

            ToDoList.createItem();
        });

        $("#to-do-items-table").delegate(".mark-done-checkbox", "change", function (event) {
            event.preventDefault();

            var itemId = $(this).data('id');
            var checkboxChecked = $(this).is(':checked');

            ToDoList.updateItem(itemId, checkboxChecked);
        });

        $("#to-do-items-table").delegate(".delete-item", "click", function (event) {
            event.preventDefault();

            var itemId = $(this).data('id');

            ToDoList.deleteItem(itemId);
        });
    }

};

ToDoList.getItems();
ToDoList.bindEvents();