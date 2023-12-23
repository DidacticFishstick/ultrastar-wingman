window.addEventListener("DOMContentLoaded", () => {
    const websocket = new WebSocket(`ws://${window.location.hostname}:5678/`);
    websocket.onmessage = ({data}) => {
        let msg = JSON.parse(data);
        addConsoleMessage(msg.msg, msg.type === "error");
    };

});


function restart() {
    if (confirm('Are you sure you want to restart UltraStar Deluxe? Be aware that you will be punched if you interrupt a song.')) {
        $.ajax({
            url: '/api/restart',
            method: 'POST',
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error while downloading:", xhr.responseText);
                alert(`Error while downloading: ${textStatus} (${xhr.status}) ${errorThrown} ${xhr.responseText}`);
            }
        });
    } else {
        alert('Good Choice!');
    }
}

function download(id) {
    $.ajax({
        url: '/api/download',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            id: id
        }),
        success: function (response) {
            console.log(`Added ${id} to download queue`)
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Error while downloading:", xhr.responseText);
            // alert(`Error while downloading: ${textStatus} (${xhr.status}) ${errorThrown} ${xhr.responseText}`);
            alert(`Error while downloading  (${xhr.status}): ${xhr.responseText}`);
            addConsoleMessage(`Error while downloading  (${xhr.status}): ${xhr.responseText}`, true);
        }
    });
}

function openConsole() {
    $("#console").addClass("shown");
}

function closeConsole() {
    $("#console").removeClass("shown");
}

function showPopupMessage(msg) {
    let message = $('<div class="message-box"></div>');
    message.text(msg);

    $("#message-container").append(message);


    setTimeout(() => {
        message.addClass("gone");
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 5000);
}

function addConsoleMessage(message, error = false) {
    const consoleDiv = document.getElementById('console-content');
    const messageLabel = document.createElement('label');
    messageLabel.textContent = message;
    if (error) {
        messageLabel.classList.add("error");
    }
    consoleDiv.appendChild(messageLabel);

    // Scroll to the bottom
    consoleDiv.scrollTop = consoleDiv.scrollHeight;

    if (error) {
        showPopupMessage(message);
    }
}