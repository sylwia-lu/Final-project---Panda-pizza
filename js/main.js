$(document).ready(function() {

    var meat = ["boczek", "kabanos", "kiełbasa wiejska", "kurczak", "salami", "szynka", "szynka parmeńska"];
    var vege = ["ananas", "brokuły", "cebula biała", "cebula czerwona", "czosnek", "feta", "kapary", "kukurydza", "ogórek konserowy",
        "oliwki czarne", "oliwki zielone", "papryka czerwona", "papryka chili", "papryka peperoni", "pieczarki", "podwójny ser",
        "pomidor" ,"parmezan", "ser pleśniowy", "szpinak"];
    var sea = ["krewetki", "mix owoców morza" , "tuńczyk", "anchois"];
    var codes = ["30-710","30-711","30-712","30-713","30-714","30-715","30-716","30-717","30-718","30-719","30-720","30-721","30-722","30-723","30-724","30-725","30-726","30-727","30-730","30-731","30-732","30-733","30-734","30-735","30-736","30-737","30-738"]

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


    $(".output").on("click", ".close", function() {
        $(".alert").addClass("hide");
    });




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
                $(".priceList .big").attr("data-price", price);
                $(".priceList .big").text(price + " zł");

                changePrice();
            }
        }
        else {

            $(".ingList").append("<li class='big' data-size='" + size + "'>" + size + "</li>");
            $(".priceList").append("<li class='big' data-price='" + price + "'>" + price +" zł</li>");
            $(".total").removeClass("hide");
            sumAmount();
        }
    }


    function changePrice() {
        var ingAm = $("li[data-type='ingr']").length;
        var pizzaSize = $(".big").data("size");
        var ingPrice;
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
        $("li[data-type='ingrPrice']").text(ingPrice + " zł");
        $("li[data-type='ingrPrice']").attr("data-price", ingPrice);
        sumAmount();

    }




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
        changePrice();
        sumAmount();

    }


    function setPrice() {
        var ingAm = $("li[data-type='ingr']").length+1;
        var pizzaSize = $(".big").data("size");
        var ingPrice;

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

       return(ingPrice);
    }


    function addIng(ing, price) {
        var name = ing.attr("value");

        if (ing.hasClass("sauce")) {
            $(".ingList").append("<li data-name='" + name +"'>sos "+ name +"</li>");
            $(".priceList").append("<li data-name='" + name +"' data-price='" + saucePrice + "'>" + saucePrice +" zł</li>")
            sumAmount();

        } else {


            $(".ingList").append("<li data-name='" + name + "' data-type='ingr'>"+ name +"</li>");
            $(".priceList").append("<li data-name='" + name + "' data-type='ingrPrice'></li>")
            $("li[data-type='ingrPrice']").text(price + " zł").attr("data-price", price);

            sumAmount();
        }
    }

    function sumAmount() {
        var prices = $("li[data-price]");

        var total=0;

        for (var i=0; i<prices.length; i++) {

            total+=Number($(prices[i]).attr("data-price"));

        }
        $(".amount").text(total);
    }

    $(".creatorBtn").click(function(e) {
        e.preventDefault();
        $(".order").addClass("show");
    })



    // Sprawdzanie kodu pocztowego

    function checkCode(a) {
        var code = $.trim(a.val());
        a.val("");
        var result;
        for (var i = 0; i<codes.length; i++) {
            if (code == codes[i]) {
                result = true;
                return result;

            } else {
                result = false;
            }
        }

        return result;

    }

    $(".checkForm").submit(function (event) {
        var code = $(this).find(".postCode");
        event.preventDefault();
        $(".msgBox p").removeClass("show");
        if (checkCode(code)==true) {
            $(".positive").addClass("show");

        } else {
            $(".negative").addClass("show");
        }
    })


    $(".postCode").focus(function() {
        $(".msgBox p").removeClass("show");

    })


    $(".orderForm").submit(function (event) {
        var code = $(this).find(".postCode");
        event.preventDefault();
        if (checkCode(code)==true) {
            console.log("dzisla")

        } else {
            console.log("dzisla")

        }
    })

});








