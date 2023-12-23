function onIframeLoadStart() {
    console.log("onIframeLoadStart");
    $("#download")
        .hide()
        .off("click");
}

function onIframeLoad(e) {
    var iframe = e.target;
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    var url = new URL(iframe.contentWindow.location.href);

    const params = new URLSearchParams(url.search);

    const link = params.get("link");
    const id = params.get("id");

    if (link === "gettxt") {
        try {
            iframe.contentWindow.eval(
                "document.getElementById('timeform').submit();"
            );
            console.log("Skipping countdown");
            return;
        } catch {}
    }

    if (link === "list") {
        $.ajax({
            url: '/api/usdb_ids',
            method: 'GET',
            success: function (response) {
                console.log(response)

                // language=JavaScript
                iframe.contentWindow.eval(
                    `let downloaded_ids = ${JSON.stringify(response)};` +
                    "for (const tr of document.querySelectorAll('#tablebg > tbody:nth-child(1) > tr:nth-child(3) > td.row1 > table tr.list_head')) {" +
                    "    let td = document.createElement('td');" +
                    "    tr.prepend(td);" +
                    "};" +
                    "for (const tr of document.querySelectorAll('#tablebg > tbody:nth-child(1) > tr:nth-child(3) > td.row1 > table tr:not(.list_head)')) {" +
                    "    let id = parseInt(tr.children[0].getAttribute('onclick').match(/\\((\\d+)\\)/)[1], 10);" +
                    "    let td = document.createElement('td');" +
                    "    td.style.fontWeight = 'bold';" +
                    "    td.style.display = 'flex';" +
                    "    td.style.justifyContent = 'center';" +
                    "    td.style.fontWeight = 'bold';" +
                    "    if (downloaded_ids.includes(id)) {" +
                    "        td.innerText = 'existing';" +
                    "        td.style.cursor = 'default';" +
                    "    } else {" +
                    "        td.innerText = 'Download';" +
                    "        td.style.color = `#f00`;" +
                    "        td.style.background = '#ea481b';" +
                    "        td.style.borderRadius = '8px';" +
                    "        td.style.color = '#fff';" +
                    "        td.style.padding = '4px 0';" +
                    "        td.style.cursor = 'pointer';" +
                    "        td.onclick = () => {" +
                    "            td.style.background = '#606060';" +
                    "            td.style.cursor = 'default';" +
                    "            td.onclick = () => {};" +
                    "            window.parent.postMessage({" +
                    "                command: 'download'," +
                    "                id: id" +
                    "            });" +
                    "        };" +
                    "    };" +
                    "    tr.prepend(td);" +
                    "};"
                );
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error while getting already downloaded USDB IDs:", xhr.responseText);
                alert(`Error while getting already downloaded USDB IDs: ${textStatus} (${xhr.status}) ${errorThrown} ${xhr.responseText}`);
                addConsoleMessage(`Error while getting already downloaded USDB IDs: ${textStatus} (${xhr.status}) ${errorThrown} ${xhr.responseText}`, true);
            }
        });
    } else if (id) {
        console.log("ID");

        // TODO: hide button on starting to load

        $("#download")
            .show()
            .off("click")
            .on("click", () => {
                $("#download").off("click");
                download(id);
            });

        iframe.contentWindow.onunload = () => {
            $("#download")
                .hide()
                .off("click");
        };
    }
}

window.addEventListener('message', function (event) {
    if (event.data.command === 'download') {
        download(event.data.id)
    }
}, false);