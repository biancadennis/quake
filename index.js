$(document).ready(function() {
    function quakeSort(array) {
        array.sort(function(a, b) {
                return a["mag"] - b["mag"] || a["depth"] - b["depth"];
            })
        array.reverse()
        array.splice(20)
        return array
    }
    $.ajax({
        url: "http://interviewtest.getguru.com/seismic/data.json",
        method: 'GET',
        
        success: function(response) {
            quakes = response
            quakeSort(quakes);
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
            })
        }
    })
})