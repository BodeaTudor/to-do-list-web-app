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

        return `<tr>
            <td>${item.description}</td>
            <td>${formattedDate}</td>
            <td><input class="mark-done-checkbox" type="checkbox" title="Done"></td>
            <td><a href="#" class="delete-item fa fa-trash"></a></td>
            </tr>`
    },

    bindEvents: function () {
        $("#new-item-form").submit(function (event) {
            event.preventDefault();

            ToDoList.createItem();
        });
    }
};

ToDoList.getItems();
ToDoList.bindEvents();