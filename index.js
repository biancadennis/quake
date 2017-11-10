$(document).ready(function() {
//sorting algorithm
    function quakeSort(array) {
        compare = function(x, y){
            return x > y ? 1 : x < y ? -1 : 0; 
        };
        array.sort(function(a, b){
    //note the minus before -cmp, for descending order
            return compare( 
                [compare(a.mag, b.mag), -compare(b.time, a.time)], 
                [compare(b.mag, a.mag), -compare(a.time, b.time)]
            );
        });
            array.reverse()
            array.splice(20)
            return array
    }
//function for adding elements in array to dom
    function appendToTable (array) {
        array.forEach(function(quake) {
            $('table tbody').append(`<tr>
                                <td>${quake.id}</td>
                                <td> ${moment(quake.time).format("MMM Do YYYY @ h:mm a")}</td>
                                <td> ${quake.place}</td>
                                <td> ${quake.mag}</td>
                                <td><button type="button" onclick="$('#details').text('Longitude:${quake.longitude} and Latitude:${quake.latitude}')">Details</button> </td>
                                </tr>`)
        })
    }
// Request for url
    $.ajax({
        url: "http://interviewtest.getguru.com/seismic/data.json",
        method: 'GET',
        
        success: function(response) {
            quakes = response
            quakeSort(quakes);
//append quakes to dom
            quakes.forEach(function(quake) {
                $('table tbody').append(`<tr>
                                    <td>${quake.id}</td>
                                    <td> ${moment(quake.time).format("MMM Do YYYY @ h:mm:ss a")}</td>
                                    <td> ${quake.place}</td>
                                    <td> ${quake.mag}</td>
                                    <td><button type="button" onclick="$('#details').text('Longitude:${quake.longitude} and Latitude:${quake.latitude}')">Details</button> </td>
                                    </tr>`)
            })
            console.log(quakes)
//sarch functionality
            $('#searchButton').click( function(event){
            var queriedQuakes = []
            var search     = $('#searchQuery');
            var query = search.val();
	        // var condition = `%${query}%`;
            newRegex = new RegExp(query, 'g');
            quakes.forEach(function(quake){
                    result = newRegex.test(quake.place.toLowerCase());
                    if (result) {
                        queriedQuakes.push(quake);
                    }
            })
            quakeSort(queriedQuakes);
            console.log(queriedQuakes)
            $('table tbody').empty()
            appendToTable(queriedQuakes);
            })
        }
    })
})