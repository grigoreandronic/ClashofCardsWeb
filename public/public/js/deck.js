$(document).ready(function() {
    var card = 0;
    db.collection("Decks").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var id = "\'" + doc.id + "\'";
            var icons = doc.data().icons;
            var alpha = doc.data().alpha;
            var description = doc.data().description;
            var premium = doc.data().premium;
            var price = doc.data().price;

            var line1 = ' <div class="card"><img class="card-img-top" src="' + icons + '" alt="Card image cap">';
            var line2 = '    <ul class="list-group list-group-flush w-100 align-items-stretch "> '
            var line3 = '<li class="list-group-item active text-center d-inline-block"><h5 class="card-title">' + alpha + '</h5></li>';
            var line4 = '<li class="list-group-item text-center d-inline-block"> <b>Description</b><br> ' + description + ' </li>';
            var line5 = '  <li class="list-group-item text-center d-inline-block"><b>Premium </b> <br>' + premium + '</li>';
            var line6 = '<li class="list-group-item text-center d-inline-block "><b>Price</b><br> ' + price + '</li>';
            var line7 = '<li class="list-group-item text-center d-inline-block "><button type="button" class="btn btn-danger"  onclick="showCardofDeck(' + id + ') " >Show cards</button></li></ul></div></div>';
            $('#cardcolumn').append(line1 + line2 + line3 + line4 + line5 + line6 + line7);


            card++;

        });

    });

});