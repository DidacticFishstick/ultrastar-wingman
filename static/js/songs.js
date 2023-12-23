function searchTable() {
    let input, filter, list, div, label, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    list = document.getElementById("songs");
    div = list.getElementsByTagName("div");

    for (i = 0; i < div.length; i++) {
        console.log(div[i]);
        div[i].style.display = "none";
        label = div[i].getElementsByTagName("label");
        for (j = 0; j < label.length; j++) {
            if (label[j]) {
                txtValue = label[j].textContent || label[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    console.log(div[i]);
                    div[i].style.display = "";
                    break;
                }
            }
        }
    }
}