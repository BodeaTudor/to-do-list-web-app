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
            console.log(response);
            location.reload();
        })
    },

    bindEvents: function () {
        $("#new-item-form").submit(function (event) {
            event.preventDefault();

            ToDoList.createItem();
        });
    }
};

ToDoList.bindEvents();