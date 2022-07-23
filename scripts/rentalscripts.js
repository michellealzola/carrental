var rentalClientsData = [];

window.onload = initialize();

function initialize() {

    loadRentalClients();
    searchClientName();

}

function loadRentalClients() {
    var ajax = new XMLHttpRequest();

    ajax.open("GET", "./assets/rentalclients.json", true);

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var rawData = ajax.responseText;
            rentalClientsData = JSON.parse(rawData);
        }
    }
    ajax.send();
}

function searchClientName() {
    var searchClientsName = document.getElementById('search_ClientName').value;
    var searchIndex = "last_name";
    var searchClientNameResults = "";

    if (searchClientsName != null && searchClientsName != "") {
        searchClientNameResults += "<tr>";
        searchClientNameResults += "<th>Select Client</th>";
        searchClientNameResults += "<th>Last Name</th>";
        searchClientNameResults += "<th>First Name</th>";
        searchClientNameResults += "</tr>";

        for (var i = 0; i < rentalClientsData.length; i++) {
            var thisrentalClientsData = rentalClientsData[i];

            if (thisrentalClientsData[searchIndex] != null && thisrentalClientsData[searchIndex].startsWith(searchClientsName)) {

                // var lname = thisrentalClientsData.last_name;

                searchClientNameResults += "<tr>";
                searchClientNameResults += '<td> <input type="radio" name="c_lastName" onclick="displayForm(`' + i + '`);"> </td>';
                searchClientNameResults += "<td>" + thisrentalClientsData.last_name + "</td>";
                searchClientNameResults += "<td>" + thisrentalClientsData.first_name + "</td>";
                searchClientNameResults += "</tr>";
            }
        }

    }

    document.getElementById('ClientName_results').innerHTML = searchClientNameResults;

}

var lname = "";
var fname = "";
var address = "";
var prov = "";
var email = "";
var phone = "";



function displayForm(i) {
    var cars = document.getElementById('vehicle');
    var display = "";
    lname = rentalClientsData[i].last_name;
    fname = rentalClientsData[i].first_name;
    address = rentalClientsData[i].address;
    prov = rentalClientsData[i].state_prov;
    email = rentalClientsData[i].email;
    phone = rentalClientsData[i].phone;

    display += "<tr>";
    display += "<h2>Rental Form</h2>";
    display += "<td>Client Name: " + fname + ' ' + lname + "</td> <br>";
    display += "<td>Address: " + address + ', ' + prov + "</td> <br>";
    display += "<td>Email: " + email + "</td> <br>";
    display += "<td>Phone: " + phone + "</td> <br>";
    display += "</tr><br>";
    cars.style.opacity = 1;

    document.getElementById('client_display').innerHTML = display;

}

function submitOrder() {
    var display = "";
    display += "<tr>";
    display += "<h2>Invoice</h2>";
    display += "<td>Client Name: " + fname + ' ' + lname + "</td> <br>";
    display += "<td>Address: " + address + ', ' + prov + "</td> <br>";
    display += "<td>Email: " + email + "</td> <br>";
    display += "<td>Phone: " + phone + "</td> <br>";
    display += "</tr><br>";

    var compact = document.getElementById('compact');
    var midsize = document.getElementById('midsize');
    var luxury = document.getElementById('luxury');
    var truck = document.getElementById('truck');
    var roof = document.getElementById('roof_rack');
    var gps = document.getElementById('gps');
    var child_seat = document.getElementById('child_seat');
    var numDays= document.getElementById('num_days').value;

    var cost = 0;
    var total = 0;

    display += "<tr>";
    if(compact.checked){
        cost += 15;
        display += "<td>Compact: $15/day</td> <br>";
    }
    if(midsize.checked){
        cost += 20;
        display += "<td>Mid-Size: $20/day</td> <br>";
    }
    if(luxury.checked){
        cost += 35;
        display += "<td>Luxury: $35/day</td> <br>";
    }
    if(truck.checked){
        cost += 40;
        display += "<td>Truck/Van: $40/day</td> <br>";
    }
    if(roof.checked){
        cost += 5;
        display += "<td>Roof Rack or Bicycle Rack: $5/day</td> <br>";
    }
    if(gps.checked){
        cost += 10;
        display += "<td>GPS: $10/day</td> <br>";
    }
    if(child_seat.checked){
        cost += 0;
        display += "<td>Child seat: FREE</td> <br>";
    }

    total = (cost * numDays).toFixed(2);
    display += "<br>";
    display += "<td>Total Number of Days: " + numDays + " days</td> <br>";
    display += "<br>";
    display += "<td>Total: $" + total + "</td> <br>";
    display += "</tr><br>";

    document.getElementById('invoice').innerHTML = display;

}