// Usdb.js
import {useEffect, useRef} from "react";
import {USDBApi} from "../api/src";
import './Usdb.css';

function Usdb() {
    const iframeRef = useRef(null);

    const api = new USDBApi();

    // TODO: is called multiple times for some reason
    const download = async (id) => {
        // TODO: helpers.js
        api.apiUsdbDownloadApiUsdbDownloadPost(JSON.stringify({id: id}), (error, data, response) => {
            if (error) {
                console.error(error, response.text);
            }
        });
    };

    useEffect(() => {
        iframeRef.current.addEventListener('loadstart', () => {
            // TODO: create this button
            // $("#download")
            //     .hide()
            //     .off("click");
        });

        iframeRef.current.onload = () => {
            const url = new URL(iframeRef.current.contentWindow.location.href);

            const params = new URLSearchParams(url.search);

            const link = params.get("link");
            const id = params.get("id");

            if (link === "gettxt") {
                try {
                    iframeRef.current.contentWindow.eval(
                        "document.getElementById('timeform').submit();"
                    );
                    console.log("Skipping countdown");
                    return;
                } catch {
                }
            }

            if (link === "list") {
                api.apiUsdbIdsApiUsdbIdsGet((error, data, response) => {
                    if (error) {
                        console.error(error, response.text);
                    } else {
                        // language=JavaScript
                        iframeRef.current.contentWindow.eval(
                            `let downloaded_ids = ${JSON.stringify(data.ids)};` +
                            "for (const tr of document.querySelectorAll('#tablebg > tbody:nth-child(1) > tr:nth-child(3) > td.row1 > table tr.list_head')) {" +
                            "    let td = document.createElement('td');" +
                            "    tr.prepend(td);" +
                            "};" +
                            "for (const tr of document.querySelectorAll('#tablebg > tbody:nth-child(1) > tr:nth-child(3) > td.row1 > table tr:not(.list_head)')) {" +
                            "    let id = tr.children[0].getAttribute('onclick').match(/\\((\\d+)\\)/)[1];" +
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
                    }
                });
            } else if (id) {
                // TODO: hide button on starting to load
                // $("#download")
                //     .show()
                //     .off("click")
                //     .on("click", () => {
                //         $("#download").off("click");
                //         download(id);
                //     });
                //
                // iframeRef.current.contentWindow.onunload = () => {
                //     $("#download")
                //         .hide()
                //         .off("click");
                // };
            }
        }
    }, []);

    window.addEventListener('message', function (event) {
        if (event.data.command === 'download') {
            download(event.data.id);
        }
    });

    return <div>
        <iframe ref={iframeRef} id={"usdb"} src={"/proxy/"}></iframe>
    </div>;
}

export default Usdb;
