function getJsonObject(path, success, error) {
       var xhr = new XMLHttpRequest();
       xhr.onreadystatechange = function() {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                     if (xhr.status === 200) {
                            if (success){
                                   data = JSON.parse(xhr.responseText);
                                   phoneList = data;
                                   success(data);
                            }
                     } else {
                            if (error) error(xhr);
                     }
              }
       };
       xhr.open("GET", path, true);
       xhr.send();
}


var refreshPage = function (defaultPhoneList){
    var location = document.getElementById("cartBody");
    var listTitle = Object.keys(defaultPhoneList[0]);

    var cartTitle = document.getElementById("cartTitleRow");
    var itemNumber = document.createElement("div");
    itemNumber.setAttribute("class","col align-self-center text-right text-muted");
    var totalNumber = 0;
    for (let i=0; i < defaultPhoneList.length; i++){
        totalNumber = totalNumber + defaultPhoneList[i]["quantity"];
    }
    var itemNumberText = document.createTextNode(totalNumber.toString() + " items");
    console.log(itemNumberText);
    itemNumber.appendChild(itemNumberText);
    cartTitle.appendChild(itemNumber);


    for (let i=0; i < defaultPhoneList.length; i++){
        var itemRow = document.createElement("div");
        itemRow.setAttribute("class","row main align-items-center");
        var cartRow = document.createElement("div");
        if (i==0){
            cartRow.setAttribute("class","row border-top border bottom");
        }else{
            cartRow.setAttribute("class","row border bottom");
        }
        cartRow.appendChild(itemRow);
        location.appendChild(cartRow);

        for (let item of listTitle){
            if(item == "image"){
                var phoneImage = document.createElement("img");
                phoneImage.setAttribute("class","img-fluid");
                var address = defaultPhoneList[i][item];
                phoneImage.src = address;
                var imageCol = document.createElement("div");
                imageCol.setAttribute("class","col-2");
                imageCol.appendChild(phoneImage);
                itemRow.appendChild(imageCol);
            }
            else if (item == "brand"){
                var brandValue = defaultPhoneList[i][item];
                var priceValue = defaultPhoneList[i]["price"];

                var brandNode = document.createTextNode(brandValue);
                var brandName = document.createElement("div");
                brandName.setAttribute("class", "row text-muted");
                brandName.appendChild(brandNode);

                var priceNode = document.createTextNode("$" + priceValue);
                var priceName = document.createElement("div");
                priceName.setAttribute("class", "row");
                priceName.appendChild(priceNode);

                var textCol = document.createElement("div");
                textCol.setAttribute("class", "col");
                textCol.appendChild(brandName);
                textCol.appendChild(priceName);
                itemRow.appendChild(textCol);
            }
            else if(item == "quantity"){
                var quantityCol = document.createElement("div");
                quantityCol.setAttribute("class","col")

                var decrease = document.createElement("a");
                decrease.setAttribute("href","#");
                var decreaseNode = document.createTextNode("-");
                decrease.appendChild(decreaseNode);
                quantityCol.appendChild(decrease);

                var quantity = document.createElement("a");
                quantity.setAttribute("href","#");
                quantity.setAttribute("class","border");
                var quantityValue = defaultPhoneList[i][item];
                var quantityNode = document.createTextNode(quantityValue);
                quantity.appendChild(quantityNode);
                quantityCol.appendChild(quantity);

                var increase = document.createElement("a");
                increase.setAttribute("href","#");
                var increaseNode = document.createTextNode("+");
                increase.appendChild(increaseNode);
                quantityCol.appendChild(increase);

                itemRow.appendChild(quantityCol);

                var totalPriceCol = document.createElement("div");
                totalPriceCol.setAttribute("class", "col");

                var phonePrice = Number(defaultPhoneList[i]["price"]);
                var phoneQuantity = Number(defaultPhoneList[i]["quantity"]);
                var totalPrice = phonePrice * phoneQuantity;
                var totalPriceNode = document.createTextNode("$" + totalPrice);
                totalPriceCol.appendChild(totalPriceNode);

                var deleteButton = document.createElement("button");
                deleteButton.setAttribute("type","button");
                deleteButton.setAttribute("class","close");
                deleteButton.setAttribute("aria-label", "Close");
                totalPriceCol.appendChild(deleteButton);

                var deleteSpan = document.createElement("span");
                // deleteButton.setAttribute("aria-hidden","true");
                var deleteNode = document.createTextNode("X");
                deleteSpan.appendChild(deleteNode);
                deleteButton.appendChild(deleteSpan);

                itemRow.appendChild(totalPriceCol);
            }
        }
    }



    var allTotal = document.createElement("div");
    allTotal.setAttribute("class","row");
    allTotal.style.bordertop ="border-top: 1px solid rgba(0,0,0,.1)";
    allTotal.style.padding ="2vh 0";

    var titleCol = document.createElement("div");
    titleCol.setAttribute("class","col");
    var titleText = document.createTextNode("TOTAL PRICE");
    titleCol.appendChild(titleText);
    allTotal.appendChild(titleCol);

    var priceCol = document.createElement("div");
    priceCol.setAttribute("class","col text-right");
    var allTotalPrice =0;
    for (let i=0; i < defaultPhoneList.length; i++){
        allTotalPrice = allTotalPrice + Number(defaultPhoneList[i]["price"] * Number(defaultPhoneList[i]["quantity"]));
    }
    var priceText = document.createTextNode("$" + allTotalPrice);
    priceCol.appendChild(priceText);
    allTotal.appendChild(priceCol);

    location.appendChild(allTotal);

    var checkOutPlace = document.createElement("div");
    checkOutPlace.setAttribute("class","row");
    var checkOutButton = document.createElement("button");
    checkOutButton.setAttribute("class","btn");
    var checkOutText = document.createTextNode("CHECKOUT");
    checkOutButton.appendChild(checkOutText);
    checkOutPlace.appendChild(checkOutButton);
    location.appendChild(checkOutPlace);



    var returnPart = document.createElement("div");
    returnPart.setAttribute("class","back-to-shop");

    var returnSymbol = document.createElement("a");
    returnSymbol.setAttribute("href","#");
    var returnNode = document.createTextNode("⇦");
    returnSymbol.appendChild(returnNode);
    returnPart.appendChild(returnSymbol);

    var textSpan = document.createElement("span");
    textSpan.setAttribute("class","text-muted");
    var textNode = document.createTextNode("Back to shop");
    textSpan.appendChild(textNode);
    returnPart.appendChild(textSpan);
    location.appendChild(returnPart);

}

window.onload = function (){
       getJsonObject('datalist.json',
           function success (data) {
               refreshPage(phoneList);
               // console.log(phoneList.length);
           },
           function error (xhr){console.error(xhr);}
       );
}


