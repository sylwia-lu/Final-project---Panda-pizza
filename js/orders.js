$(document).ready(function() {


    var url = "http://localhost:3000";


    $.ajax({
        method: "GET",
        url: url + "/zamowienia",
        dataType: "json",

    }).done(function(response) {

        for (var i=0; i<response.length; i++) {
            var newObj = response[i];


            $(".collectOrder").append("<ul class='orderList'>"+
                                         "<span data-id='" + newObj.id + "'>ID: " + newObj.id + "</span>" +
                                         "<li>Imię i nazwisko: " + newObj.imieNazwisko + "</li>" +
                                         "<li>Adres: " + newObj.adres + "</li>" +
                                         "<li>Kod pocztowy: " + newObj.kodPocztowy + "</li>" +
                                         "<li>Adres: " + newObj.adres + "</li>" +
                                         "<li>Telefon: " + newObj.telefon + "</li>" +
                                         "<li>Email: " + newObj.email + "</li>" +
                                         "<li>Dostawa: " + newObj.dostawa + "</li>" +
                                         "<li>Rozmiar pizzy: " + newObj.rozmiar + "</li>" +
                                         "<li>Składniki: " + newObj["skladniki[]"] + "</li>" +
                                         "<li>Sos: " + newObj.sos + "</li>" +
                                         "<button class='button delete'>Zrealizowano</button> </ul>"


                                        )

        }


    });



    $(".collectOrder").on("click", ".delete", function() {
        var id = $(this).parent().find("span").data("id");


        $.ajax({
            method: "DELETE",
            url: url + "/zamowienia/" + id,
            dataType: "json",

        }).done(function(response) {

            window.location.reload();

        });




    })


    $("#refresh").click(function() {
        window.location.reload();

    })


});