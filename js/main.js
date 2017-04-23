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

    var saucePrice = 1.5;



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
                    $(".alert").remove();

                    $("input[type='checkbox']").removeAttr('disabled');

                    addSize($(this));

                }
        })
    })



    function addSize(radio) {
        var size = radio.attr("value");
        var price;

        // setting price
        switch (size) {
            case "duża":
                price = bigPrice;
                break;
            case "średnia":
                price = midPrice;
                break;
        }
        if ($(".big").length) {
            if  ($(".ingList .big").data("price") != size) {
                    $(".ingList .big").data("size", size);
                    $(".ingList .big").text(size);
                    $(".priceList .big").data("price", price);
                    $(".priceList .big").text(price + " zł");
            }
        }


        else {

            $(".ingList").append("<li class='big' data-size='" + size + "'>" + size + "</li>");
            $(".priceList").append("<li class='big' data-price='" + size + "'>" + price +" zł</li>")

        }
    }

    $(".output").on("click", ".close", function() {
        $(".alert").addClass("hide");
    });





    $("input[type='checkbox']").change(function() {
        var name = $(this).attr("value");

        checkIngState($(this));

    })

    function checkIngState(checkbox) {
        var ingredient;
        if (checkbox.prop('checked') == true) {
                ingredient=checkbox;
                addIng(ingredient, setPrice());
        } else {
            ingredient=checkbox
            removeIng(ingredient);

        }

    }



    function removeIng(ing) {
        var name = ing.attr("value");
        $(".ingList li").each(function(index, el) {
            if ($(this).data('name') == name) {
                $(this).remove();

            }
        })

        $(".priceList li").each(function(index, el) {
            if ($(this).data('name') == name) {
                $(this).remove();

            }
        })
    }


    function setPrice() {
        var ingAm = $("li[data-type='ingr']").length+1;
        var pizzaSize = $(".big").data("size");
        var ingPrice;
        //var ingList =  document.querySelectorAll("[data-type='ingr']")

        if (pizzaSize == "średnia") {
            if (ingAm<=2) {
                ingPrice = midGroup1;
            }
            if (ingAm==3||ingAm==4) {
                ingPrice = midGroup2
            }
            if (ingAm>4) {
                ingPrice = midGroup3
            }
        }

        if (pizzaSize == "duża")    {
            if (ingAm<=2) {
                ingPrice = bigGroup1;
            }
            if (ingAm==3||ingAm==4) {
                ingPrice = bigGroup2
            }
            if (ingAm>4) {
                ingPrice = bigGroup3
            }
        }
        console.log(ingPrice);
       return(ingPrice);
    }


    function addIng(ing, price) {
        var name = ing.attr("value");
        var ingPrice = setPrice();
        if (ing.hasClass("sauce")) {
            $(".ingList").append("<li data-name='" + name +"'>sos "+ name +"</li>");
            $(".priceList").append("<li data-name='" + name +"' data-price='" + saucePrice + "'>" + saucePrice +" zł</li>")

        } else {

          //  var price = setPrice();
            $(".ingList").append("<li data-name='" + name + "' data-type='ingr'>"+ name +"</li>");
            $(".priceList").append("<li data-name='" + name + "' data-price data-type='ingrPrice'></li>")
            $("li[data-type='ingrPrice']").text(price + " zł");
            $("li[data-type='ingrPrice']").data("price", price);

        }
    }






});




