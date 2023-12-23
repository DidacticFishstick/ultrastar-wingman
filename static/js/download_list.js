let currentPage = 1; // Track the current page
let finished = false; // Track if the list has ended
let isLoading = false; // Flag to prevent multiple concurrent loads

function search(reset = false) {
    if (reset) {
        currentPage = 1;
        finished = false;
        $('#songs').empty();
    }

    if (finished) return;

    // Get the values from the form
    const artist = $('#artist').val().trim();
    const title = $('#title').val().trim();
    const order = $('#order').val();

    // Prevent multiple requests
    if (isLoading) return;
    isLoading = true;

    // Simulate a REST request with jQuery AJAX
    $.ajax({
        url: `/api/usdb/get_songs`, // Replace with your API endpoint
        type: 'GET',
        data: {
            artist: artist,
            title: title,
            order: order.split("-")[0],
            ud: order.split("-")[1],
            page: currentPage
        },
        success: function (data) {
            if (data.songs.length === 0 && data.paging.current === 1) {
                alert("No Songs found for the selection");
            }

            console.log(data);
            data.songs.forEach(song => {
                $('#songs').append(
                    // TODO: different eye
                    $(`<div class="song" id="${song.id}"><span class="cover" style="background-image: url('https://usdb.animux.de/data/cover/${song.id}.jpg');"></span><label class="title">${song.title}</label><label class="artist">${song.artist}</label><label class="stats">${song.rating} <i class="star"></i> | ${song.views} <i class="eye"></i></label></div>`)
                        .on("click", () => {
                            let element = $("#" + song.id);
                            if (!(element.hasClass("queued") || element.hasClass("downloading") || element.hasClass("downloaded"))) {
                                element.addClass("queued");
                                download(song.id);
                            }
                        })
                        .addClass(song.downloaded ? "downloaded" : "")
                );
            });

            if (data.paging.current === data.paging.pages) {
                finished = true;
            }

            currentPage++; // Increase the page count
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data: ' + textStatus, errorThrown);
        },
        complete: function () {
            isLoading = false;
        }
    });
}

$(document).ready(function () {
    // Infinite scrolling functionality
    $("main").scroll(function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
            search(); // Load new songs
        }
    });
});