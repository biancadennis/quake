$(document).ready(function() {
    var quakes
    $.ajax({
        url: "http://interviewtest.getguru.com/seismic/data.json",
        method: 'GET',
        success: function(response) {
            quakes = response
            // quakes.sort(function(a, b){
            //     var a1= a.mag, b1= b.mag;
            //     if(a1== b1) return 0;
            //     return a1 < b1? 1: -1;
            // });
            quakes.sort(function(a, b) {
                return a["mag"] - b["mag"] || a["depth"] - b["depth"];
            });
            quakes.reverse()    
        }
    }).then(function(){
            console.log(quakes)
            quakes.forEach(function(quake) {
                $('table tbody').append(`<tr>
                                    <td>${quake.id}</td>
                                    <td> ${quake.time}</td>
                                    <td> ${quake.place}</td>
                                    <td> ${quake.mag}</td>
                                    <td> Holder </td>
                                    </tr>`)
            })
        })
    // function listQuakes () {
    //     console.log('hi')
    //     quakes.forEach(function(element) {
    //         $('#quakelist').html( "<li>Hello</li>")
    //     })
    // }
    // listQuakes()

})