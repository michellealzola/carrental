function showClient() {
    var ajax_Client = new XMLHttpRequest();

    ajax_Client.open("GET", "./rental.html", true);

    ajax_Client.onreadystatechange = function () {
        if (ajax_Client.readyState == 4 && ajax_Client.status == 200) {
            var response_Client = ajax_Client.responseText;
            document.getElementById('client').innerHTML = response_Client;
        }
    };
    ajax_Client.send();
}