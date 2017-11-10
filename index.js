$(document).ready(function() {
//sorting algorithm
    function quakeSort(array) {
        compare = function(x, y){
            return x > y ? 1 : x < y ? -1 : 0; 
        };
        array.sort(function(a, b){
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
    function getQuakeInfo (){
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

    //sarch functionality
                $('#searchButton').click( function(event){
                var queriedQuakes = []
                var search     = $('#searchQuery');
                var query = search.val();
                // var condition = `%${query}%`;
                newRegex = new RegExp(query, 'g');
                quakes.forEach(function(quake){
                        result1 = newRegex.test(quake.id.toLowerCase());
                        result2 = newRegex.test(quake.time.toLowerCase());
                        result3 = newRegex.test(quake.place.toLowerCase());
                        result4 = newRegex.test(quake.mag);
                        if (result1 || result2 || result3 || result4) {
                            queriedQuakes.push(quake);
                        }
                })
                quakeSort(queriedQuakes);
                $('table tbody').empty()
                if (queriedQuakes.length > 0){
                    appendToTable(queriedQuakes);
                    $('#errorInfo').text(' ')
                } else {
                    $('#errorInfo').text('No Results Found')
                }
                })
            }
        })
    }
getQuakeInfo()
$('h1').click(getQuakeInfo)
})