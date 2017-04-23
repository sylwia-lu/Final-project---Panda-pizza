$(document).ready(function() {
    var meat = ["boczek", "kabanos", "kiełbasa wiejska", "kurczak", "salami", "szynka", "szynka parmeńska"];
    var vege = ["ananas", "brokuły", "cebula biała", "cebula czerwona", "czosnek", "feta", "kapary", "kukurydza", "ogórek konserowy",
        "oliwki czarne", "oliwki zielone", "papryka czerwona", "papryka chili", "papryka peperoni", "pieczarki", "podwójny ser",
        "pomidor" ,"parmezan", "ser pleśniowy", "szpinak"];
    var sea = ["krewetki", "mix owoców morza" , "tuńczyk", "anchois"];

    //prices
    var bigPrice = 14;
    var midPrice = 11;

    var bigGroup1 = 3.5;
    var bigGroup2 = 3;
    var bigGroup3 = 2.5;

    var midGroup1 = 3.5;
    var midGroup2 = 2.5;
    var midGroup3 = 2;

    var souce = 1.5;



    var meatList = $(".meat");
    var vegeList = $(".vege");
    var seaList = $(".sea");

    function createList(element) {
        var dataList = eval(element.attr("class"));
        for (var i=0; i<dataList.length; i++) {
            element.append("<li><label class='ingredient'>" + "<input class='checkbox' type='checkbox'"  + "value = '" +  dataList[i] + "'" +"name = '" +  dataList[i] + "'><span>" + dataList[i] + "</span></label></li>");
        }
    };


    createList(meatList);
    createList(vegeList);
    createList(seaList);





// check state of radio

    $("input[type='checkbox']").attr('disabled', 'disabled');


    function checkRadio() {
        var checked;
        $("input[type='radio']").each(function(index, el) {
            if ($(this).prop('checked') == true) {
                checked = true;
            }
        })
        return checked;
    }




    $(".all").click(function() {

        if (checkRadio()!=true) {
            $(".alert").removeClass("hide");
        }


    })






    $("input[type='radio']").each(function() {

        $(this).change(function() {


                if ($(this).prop('checked')==true) {

                    var name = $(this).attr("value");
                    var prize;
                    // setting prize
                    switch (name) {
                        case "duża":
                            prize = bigPrice;
                            break;
                        case "średnia":
                            prize = midPrice;
                            break;
                    }
                    $("input[type='checkbox']").removeAttr('disabled');

                    $("#pizzaSize").text(name);
                    $("#pizzaPrize").text(prize + "zł");

                }


        })
    })


    $(".output").on("click", ".close", function() {
        $(".output").empty();
    })







});




