$(document).ready(function() {
    var deckid = localStorage.getItem("deckId")
    db.collection("Decks").doc(deckid).collection("Cards").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var icons = doc.data().icons;
            var alpha = doc.data().alpha;
            var attributename1 = doc.data().attributename1;
            var attributevalue1 = doc.data().attributevalue1;
            var attributename2 = doc.data().attributename2;
            var attributevalue2 = doc.data().attributevalue2;
            var attributename3 = doc.data().attributename3;
            var attributevalue3 = doc.data().attributevalue3;
            var attributename4 = doc.data().attributename4;
            var attributevalue4 = doc.data().attributevalue4;
            var attributename5 = doc.data().attributename5;
            var attributevalue5 = doc.data().attributevalue5;


            var line1 = ' <div class="card"><img class="card-img-top" src="' + icons + '" alt="Card image cap">';
            var line2 = '    <ul class="list-group list-group-flush w-100 align-items-stretch "> '
            var line3 = '<li class="list-group-item active text-center d-inline-block"><h5 class="card-title">' + alpha + '</h5></li>';
            var line4 = '<li class="list-group-item text-center d-inline-block"> <b>' + attributename1 + '</b><br> ' + attributevalue1 + ' </li>';
            var line5 = '<li class="list-group-item text-center d-inline-block"> <b>' + attributename2 + '</b><br> ' + attributevalue2 + ' </li>';
            var line6 = '<li class="list-group-item text-center d-inline-block"> <b>' + attributename3 + '</b><br> ' + attributevalue3 + ' </li>';
            var line7 = '<li class="list-group-item text-center d-inline-block"> <b>' + attributename4 + '</b><br> ' + attributevalue4 + ' </li>';
            var line8 = '<li class="list-group-item text-center d-inline-block"> <b>' + attributename5 + '</b><br> ' + attributevalue5 + ' </li>';








            var line9 = '</ul></div></div>';
            $('#cardcolumn').append(line1 + line2 + line3 + line4 + line5 + line6 + line7 + line8 + line9);


        });

    });

});