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

        $("input[type='radio']").each(function(index, el) {
            if ($(this).prop('checked') == true) {
                return true;
            }
        })

    }




    $(".all").click(function() {

        if (checkRadio()!=true) {
            $(".output .alert").removeClass("hide");
        }

    })


    $(".output").on("click", ".close", function() {
        $(".output .alert").addClass("hide");
    });




    $("input[type='radio']").each(function() {

        $(this).change(function() {

                if ($(this).prop('checked')==true) {
                    $(".output .alert").remove();

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
            $(".ingList").append("<li data-name='" + name +"' data-type='sauce'>sos "+ name +"</li>");
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
        $(".amount").text(total + " zł");
    }

    $(".creatorBtn").click(function(e) {
        e.preventDefault();
        $(".order").addClass("show");
    })



    // Sprawdzanie kodu pocztowego

    function checkCode(a) {
        var code = $.trim(a.val());
        //a.val("");
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

    $(".checkForm").submit(function (e) {
        e.preventDefault();
        var code = $(this).find(".postCode");

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







     function createPizza() {
            var pizza = {};
            var liItems = $(".ingList li[data-type =  'ingr']");
            var ingr =[];
            for (var i=0; i<liItems.length; i++) {
                //console.log($(liItems[i]).data("name"))
                ingr.push($(liItems[i]).data("name"));
            }

            pizza["rozmiar"] = $(".ingList li[data-size]").data("size");
            pizza["składniki"] = ingr;
            pizza["sos"] = $(".ingList li[data-type = 'sauce']").data("name");

            return pizza;
     }

    function createCust() {
        var customer = {};


    }


    function validate() {

        var pizza = createPizza();
        var custName = $("#custName").val();
        var address = $("#address").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var code = $(".order .postCode").val();

        var nameChecked;
        var addressChecked;
        var emailChecked;
        var phoneChecked;
        var codeChecked;

        if (custName.length<=0) {
            nameChecked = false;
            $(".order .alert").append("<p>Wprowadź imię i nazwisko</p>")
        }

        if (address.length<=0) {
            addressChecked = false;
            $(".order .alert").append("<p>Wprowadź adres</p>")
        }



        if (code.length<=0) {
            codeChecked = false;
            $(".order .alert").append("<p>Wprowadź kod pocztowy</p>")
        } else {
            if (code.match(/[a-z]/i) ) {
                codeChecked = false;
                $(".order .alert").append("<p>Niepoprawny kod pocztowy</p>")
            }
        }

        if (email.length<=0) {
            emailChecked = false;
            $(".order .alert").append("<p>Wprowadź email</p>")
        } else {

            if ((email.indexOf("@")==-1)||(email.indexOf(".")==-1)) {
                emailChecked = false;
                $(".order .alert").append("<p>Niepoprawny email</p>")
            }
        }

        if (phone.length<=0) {
            phoneChecked = false;
            $(".order .alert").append("<p>Wprowadź numer telefonu</p>")
        } else {
            if ( phone.match(/[a-z]/i)  || phone.length<9) {
                phoneChecked = false;
                $(".order .alert").append("<p>Niepoprawny numer telefonu</p>")
            }
        }


        if (nameChecked==false || addressChecked==false || emailChecked==false || codeChecked==false || phoneChecked==false ){
            $(".order .alert").removeClass("hide");

        } else {
            $(".order .alert").empty();
            $("#validateBtn").addClass("hide");
            $("#orderBtn").removeClass("hide");

            var postCode = $(".order .postCode");
            if (checkCode(postCode)==false) {
                $(".order .alert").append('<p>Niestety jesteś poza zasięgiem dostawy, musisz odebrać pizzę osobiście.</p>');
                $(".order .alert").removeClass("hide");
                pizza.dostawa = "odbiór osobisty";


            } else {
                $(".order .alert").append('<p>Dostarczymy Ci pizzę do domu. Czas oczekiwania - 45 min.</p>');
                $(".order .alert").removeClass("hide");
                pizza.dostawa = "dostawa do domu";


            }

            $(".orderForm").submit(function (e) {
                e.preventDefault();

                customer = {imieNazwisko: custName, adres: address,  email: email, telefon: phone, kodPocztowy: code };
                order(customer, pizza);
                console.log(customer, pizza)


            })
        }



    }


    function order(data1, data2) {

        var customerData = data1;
        var pizza = data2;
       // console.log(pizza, customerData);

        var url = "http://localhost:3000";
        var zamówienie = {
            customerData,
            pizza,
        }
        $.ajax({
            method: "POST",
            url: url + "/zamowienia",
            dataType: "json",
            data: zamówienie,
        }).done(function(response) {
            console.log(response);
        });

    }



    $("#validateBtn").click(function(e) {
        e.preventDefault();
        $(".order .alert").empty();
        validate();
    })









});








