$(function () {
    $(".area").droppable({
        accept: ".player",
        drop: function (event, ui) {
            const dropped = ui.draggable;
            $("#players").append(event.target.children);
            $(this).empty().append(dropped);
            dropped.css({top: 0, left: 0});
        }
    }).click((event) => {
        $("#players").append(event.currentTarget.children);
    });


    function addPlayer(name) {
        $('#players').append(
            $('<label class="player">')
                .text(name)
                .draggable({
                    revert: "invalid"
                })
                .append(
                    // $("<button onclick=\"deleteName('" + name + "')\">Delete</button>"),
                    $("<span class='delete'>")
                        .html("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon icon-tabler icon-tabler-square-rounded-minus\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2.5\" stroke=\"#ffffff\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n" +
                            "  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n" +
                            "  <path d=\"M9 12h6\" />\n" +
                            "  <path d=\"M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z\" />\n" +
                            "</svg>")
                        .on("click", (event) => {
                            deleteName(name, event.currentTarget.parentNode);
                        })
                )
        );
    }


    function getPlayers() {
        $.getJSON('/api/players', function (data) {
            $('#players').empty();
            $.each(data.players, function (key, value) {
                addPlayer(value)
            });
        });
    }

    $('#name-input').keyup(function (e) {
        if (e.keyCode == 13) {
            var name = $('#name-input').val();

            if (!name) return;

            $.ajax({
                type: "POST",
                url: '/api/players',
                data: JSON.stringify({name: name}),
                contentType: "application/json",
                success: function (response) {
                    addPlayer(name)
                    $('#name-input').val('');
                }
            });
        }
    });

    $('#add-name').on('click', function () {
        var name = $('#name-input').val();

        if (!name) return;

        $.ajax({
            type: "POST",
            url: '/api/players',
            data: JSON.stringify({name: name}),
            contentType: "application/json",
            success: function (response) {
                addPlayer(name)
                $('#name-input').val('');
            }
        });
    });

    window.deleteName = function (name, element) {
        $.ajax({
            url: '/api/players/?name=' + encodeURIComponent(name),
            type: 'DELETE',
            success: function (response) {
                if (response.success) {
                    console.log(element);
                    element.remove();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error deleting player:", error);
            }
        });
    }

    $('#submit').on('click', function () {
        if (confirm("Names can only be entered in the player selection. Do not run this if the player selection is not currently open.")) {
            let names = [];

            $(".area").each((i, area) => {
                console.log(area);
                let name = "Player" + (i + 1);
                area.childNodes.forEach((nameNode) => {
                    name = nameNode.firstChild.textContent;
                });

                names.push(name);
            });

            $.ajax({
                type: "POST",
                url: '/api/players/submit',
                data: JSON.stringify({players: names}),
                contentType: "application/json"
            });
        }
    });

    getPlayers();
});