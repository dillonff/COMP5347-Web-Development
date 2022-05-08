
// const refreshPage = function (defaultPhoneList) {
//     console.log("Default: ", defaultPhoneList)
//     let elementsToBeRefreshed =document.getElementsByClassName("toBeRefreshed");
//     for (let i = elementsToBeRefreshed.length - 1; i >= 0; i--) {
//         elementsToBeRefreshed[i].parentNode.removeChild(elementsToBeRefreshed[i]);
//     }
//     const location = document.getElementById("cartBody");
//
//     if (defaultPhoneList){
//         // let elementsToBeRefreshed =document.getElementsByClassName("toBeRefreshed");
//         // for (let i = elementsToBeRefreshed.length - 1; i >= 0; i--) {
//         //     elementsToBeRefreshed[i].parentNode.removeChild(elementsToBeRefreshed[i]);
//         // }
//         // const location = document.getElementById("cartBody");
//         const listTitle = Object.keys(defaultPhoneList[0]);
//
//         const cartTitle = document.getElementById("cartTitleRow");
//         const itemNumber = document.createElement("div");
//         itemNumber.setAttribute("class", "col align-self-center text-right text-muted toBeRefreshed");
//         let totalNumber = 0;
//         for (let i = 0; i < defaultPhoneList.length; i++) {
//             totalNumber = totalNumber + defaultPhoneList[i]["quantity"];
//         }
//         const itemNumberText = document.createTextNode(totalNumber.toString() + " items");
//         console.log(itemNumberText);
//         itemNumber.appendChild(itemNumberText);
//         cartTitle.appendChild(itemNumber);
//
//
//         for (let i = 0; i < defaultPhoneList.length; i++) {
//             const itemRow = document.createElement("div");
//             itemRow.setAttribute("class", "row main align-items-center");
//             const cartRow = document.createElement("div");
//             if (i === 0) {
//                 cartRow.setAttribute("class", "row border-top border bottom toBeRefreshed");
//             } else {
//                 cartRow.setAttribute("class", "row border bottom toBeRefreshed");
//             }
//             cartRow.appendChild(itemRow);
//             location.appendChild(cartRow);
//
//             for (let item of listTitle) {
//                 if (item === "image") {
//                     const phoneImage = document.createElement("img");
//                     phoneImage.setAttribute("class", "img-fluid");
//                     const address = defaultPhoneList[i][item];
//                     phoneImage.src = address;
//                     const imageCol = document.createElement("div");
//                     imageCol.setAttribute("class", "col-2");
//                     imageCol.appendChild(phoneImage);
//                     itemRow.appendChild(imageCol);
//                 } else if (item === "brand") {
//                     const brandValue = defaultPhoneList[i][item];
//                     const priceValue = defaultPhoneList[i]["price"];
//
//                     const brandNode = document.createTextNode(brandValue);
//                     const brandName = document.createElement("div");
//                     brandName.setAttribute("class", "row text-muted");
//                     brandName.appendChild(brandNode);
//
//                     const priceNode = document.createTextNode("$" + priceValue);
//                     const priceName = document.createElement("div");
//                     priceName.setAttribute("class", "row");
//                     priceName.appendChild(priceNode);
//
//                     const textCol = document.createElement("div");
//                     textCol.setAttribute("class", "col");
//                     textCol.appendChild(brandName);
//                     textCol.appendChild(priceName);
//                     itemRow.appendChild(textCol);
//                 } else if (item === "quantity") {
//                     const quantityCol = document.createElement("div");
//                     quantityCol.setAttribute("class", "col quantity")
//
//
//                     const decrease = document.createElement("a");
//                     decrease.setAttribute("href", "#");
//                     decrease.addEventListener("click", decreaseQuantity);
//                     decrease.markTag = "decrease"+ defaultPhoneList[i]["brand"];
//                     const decreaseNode = document.createTextNode("-");
//                     decrease.appendChild(decreaseNode);
//                     quantityCol.appendChild(decrease);
//
//                     const quantity = document.createElement("a");
//                     // quantity.setAttribute("href", "#");
//                     quantity.setAttribute("id",defaultPhoneList[i]["brand"]);
//                     quantity.setAttribute("class", "border");
//
//                     const quantityValue = defaultPhoneList[i][item];
//                     const quantityNode = document.createTextNode(quantityValue);
//                     quantity.appendChild(quantityNode);
//                     quantityCol.appendChild(quantity);
//
//                     const increase = document.createElement("a");
//                     increase.setAttribute("href", "#");
//                     increase.addEventListener("click", increaseQuantity);
//                     increase.markTag = "increase" + defaultPhoneList[i]["brand"];
//                     const increaseNode = document.createTextNode("+");
//                     increase.appendChild(increaseNode);
//                     quantityCol.appendChild(increase);
//
//                     itemRow.appendChild(quantityCol);
//
//                     const totalPriceCol = document.createElement("div");
//                     totalPriceCol.setAttribute("class", "col");
//
//                     const phonePrice = Number(defaultPhoneList[i]["price"]);
//                     const phoneQuantity = Number(defaultPhoneList[i]["quantity"]);
//                     const totalPrice = phonePrice * phoneQuantity;
//                     const totalPriceNode = document.createTextNode("$" + totalPrice);
//                     totalPriceCol.appendChild(totalPriceNode);
//
//                     const deleteButton = document.createElement("button");
//                     deleteButton.setAttribute("type", "button");
//                     deleteButton.setAttribute("class", "close");
//                     deleteButton.setAttribute("aria-label", "Close");
//                     totalPriceCol.appendChild(deleteButton);
//
//                     const deleteSpan = document.createElement("span");
//                     // deleteButton.setAttribute("aria-hidden","true");
//                     const deleteNode = document.createTextNode("X");
//                     deleteSpan.appendChild(deleteNode);
//                     deleteButton.appendChild(deleteSpan);
//
//                     deleteButton.addEventListener("click", deleteItem);
//                     deleteSpan.markTag = "delete" + defaultPhoneList[i]["brand"];
//
//                     itemRow.appendChild(totalPriceCol);
//                 }
//             }
//         }
//
//
//         const allTotal = document.createElement("div");
//         allTotal.setAttribute("class", "row toBeRefreshed");
//         allTotal.style.bordertop = "border-top: 1px solid rgba(0,0,0,.1)";
//         allTotal.style.padding = "2vh 0";
//
//         const titleCol = document.createElement("div");
//         titleCol.setAttribute("class", "col");
//         const titleText = document.createTextNode("TOTAL PRICE");
//         titleCol.appendChild(titleText);
//         allTotal.appendChild(titleCol);
//
//         const priceCol = document.createElement("div");
//         priceCol.setAttribute("class", "col text-right");
//         let allTotalPrice = 0;
//         for (let i = 0; i < defaultPhoneList.length; i++) {
//             allTotalPrice = allTotalPrice + Number(defaultPhoneList[i]["price"] * Number(defaultPhoneList[i]["quantity"]));
//         }
//         const priceText = document.createTextNode("$" + allTotalPrice);
//         priceCol.appendChild(priceText);
//         allTotal.appendChild(priceCol);
//
//         location.appendChild(allTotal);
//
//         const checkOutPlace = document.createElement("div");
//         checkOutPlace.setAttribute("class", "row toBeRefreshed");
//         const checkOutButton = document.createElement("button");
//         checkOutButton.setAttribute("class", "btn");
//         const checkOutText = document.createTextNode("CHECKOUT");
//         checkOutButton.appendChild(checkOutText);
//         checkOutPlace.appendChild(checkOutButton);
//         location.appendChild(checkOutPlace);
//
//
//         // const returnPart = document.createElement("div");
//         // returnPart.setAttribute("class", "back-to-shop toBeRefreshed");
//         //
//         // const returnSymbol = document.createElement("a");
//         // returnSymbol.setAttribute("href", "#");
//         // const returnNode = document.createTextNode("⇦");
//         // returnSymbol.appendChild(returnNode);
//         // returnPart.appendChild(returnSymbol);
//         //
//         // const textSpan = document.createElement("span");
//         // textSpan.setAttribute("class", "text-muted");
//         // const textNode = document.createTextNode("Back to shop");
//         // textSpan.appendChild(textNode);
//         // returnPart.appendChild(textSpan);
//         // location.appendChild(returnPart);
//
//     }else{
//         const emptyCartText = document.createTextNode("Your shopping cart is empty!");
//         const emptyCartP = document.createElement("p");
//         emptyCartP.appendChild(emptyCartText);
//         location.appendChild(emptyCartP);
//     }
//
//     const returnPart = document.createElement("div");
//     returnPart.setAttribute("class", "back-to-shop toBeRefreshed");
//
//     const returnSymbol = document.createElement("a");
//     returnSymbol.setAttribute("href", "#");
//     const returnNode = document.createTextNode("⇦");
//     returnSymbol.appendChild(returnNode);
//     returnPart.appendChild(returnSymbol);
//
//     const textSpan = document.createElement("span");
//     textSpan.setAttribute("class", "text-muted");
//     const textNode = document.createTextNode("Back to shop");
//     textSpan.appendChild(textNode);
//     returnPart.appendChild(textSpan);
//     location.appendChild(returnPart);
//
// };


const refreshPage = function (defaultPhoneList) {
    console.log("Default: ", defaultPhoneList)

    let elementsToBeRefreshed =document.getElementsByClassName("toBeRefreshed");
    for (let i = elementsToBeRefreshed.length - 1; i >= 0; i--) {
        elementsToBeRefreshed[i].parentNode.removeChild(elementsToBeRefreshed[i]);
    }


    const location = document.getElementById("cartBody");
    const listTitle = Object.keys(defaultPhoneList[0]);

    const cartTitle = document.getElementById("cartTitleRow");
    const itemNumber = document.createElement("div");
    itemNumber.setAttribute("class", "col align-self-center text-right text-muted toBeRefreshed");
    let totalNumber = 0;
    for (let i = 0; i < defaultPhoneList.length; i++) {
        totalNumber = totalNumber + defaultPhoneList[i]["quantity"];
    }
    const itemNumberText = document.createTextNode(totalNumber.toString() + " items");
    console.log(itemNumberText);
    itemNumber.appendChild(itemNumberText);
    cartTitle.appendChild(itemNumber);


    for (let i = 0; i < defaultPhoneList.length; i++) {
        const itemRow = document.createElement("div");
        itemRow.setAttribute("class", "row main align-items-center");
        const cartRow = document.createElement("div");
        if (i === 0) {
            cartRow.setAttribute("class", "row border-top border bottom toBeRefreshed");
        } else {
            cartRow.setAttribute("class", "row border bottom toBeRefreshed");
        }
        cartRow.appendChild(itemRow);
        location.appendChild(cartRow);

        for (let item of listTitle) {
            if (item === "image") {
                const phoneImage = document.createElement("img");
                phoneImage.setAttribute("class", "img-fluid");
                const address = defaultPhoneList[i][item];
                phoneImage.src = address;
                const imageCol = document.createElement("div");
                imageCol.setAttribute("class", "col-2");
                imageCol.appendChild(phoneImage);
                itemRow.appendChild(imageCol);
            } else if (item === "brand") {
                const brandValue = defaultPhoneList[i][item];
                const priceValue = defaultPhoneList[i]["price"];

                const brandNode = document.createTextNode(brandValue);
                const brandName = document.createElement("div");
                brandName.setAttribute("class", "row text-muted");
                brandName.appendChild(brandNode);

                const priceNode = document.createTextNode("$" + priceValue);
                const priceName = document.createElement("div");
                priceName.setAttribute("class", "row");
                priceName.appendChild(priceNode);

                const textCol = document.createElement("div");
                textCol.setAttribute("class", "col");
                textCol.appendChild(brandName);
                textCol.appendChild(priceName);
                itemRow.appendChild(textCol);
            } else if (item === "quantity") {
                const quantityCol = document.createElement("div");
                quantityCol.setAttribute("class", "col quantity")


                const decrease = document.createElement("a");
                decrease.setAttribute("href", "#");
                decrease.addEventListener("click", decreaseQuantity);
                decrease.markTag = "decrease"+ defaultPhoneList[i]["brand"];
                const decreaseNode = document.createTextNode("-");
                decrease.appendChild(decreaseNode);
                quantityCol.appendChild(decrease);

                const quantity = document.createElement("a");
                // quantity.setAttribute("href", "#");
                quantity.setAttribute("id",defaultPhoneList[i]["brand"]);
                quantity.setAttribute("class", "border");

                const quantityValue = defaultPhoneList[i][item];
                const quantityNode = document.createTextNode(quantityValue);
                quantity.appendChild(quantityNode);
                quantityCol.appendChild(quantity);

                const increase = document.createElement("a");
                increase.setAttribute("href", "#");
                increase.addEventListener("click", increaseQuantity);
                increase.markTag = "increase" + defaultPhoneList[i]["brand"];
                const increaseNode = document.createTextNode("+");
                increase.appendChild(increaseNode);
                quantityCol.appendChild(increase);

                itemRow.appendChild(quantityCol);

                const totalPriceCol = document.createElement("div");
                totalPriceCol.setAttribute("class", "col");

                const phonePrice = Number(defaultPhoneList[i]["price"]);
                const phoneQuantity = Number(defaultPhoneList[i]["quantity"]);
                const totalPrice = phonePrice * phoneQuantity;
                const totalPriceNode = document.createTextNode("$" + totalPrice);
                totalPriceCol.appendChild(totalPriceNode);

                const deleteButton = document.createElement("button");
                deleteButton.setAttribute("type", "button");
                deleteButton.setAttribute("class", "close");
                deleteButton.setAttribute("aria-label", "Close");
                totalPriceCol.appendChild(deleteButton);

                const deleteSpan = document.createElement("span");
                // deleteButton.setAttribute("aria-hidden","true");
                const deleteNode = document.createTextNode("X");
                deleteSpan.appendChild(deleteNode);
                deleteButton.appendChild(deleteSpan);

                deleteButton.addEventListener("click", deleteItem);
                deleteSpan.markTag = "delete" + defaultPhoneList[i]["brand"];

                itemRow.appendChild(totalPriceCol);
            }
        }
    }


    const allTotal = document.createElement("div");
    allTotal.setAttribute("class", "row toBeRefreshed");
    allTotal.style.bordertop = "border-top: 1px solid rgba(0,0,0,.1)";
    allTotal.style.padding = "2vh 0";

    const titleCol = document.createElement("div");
    titleCol.setAttribute("class", "col");
    const titleText = document.createTextNode("TOTAL PRICE");
    titleCol.appendChild(titleText);
    allTotal.appendChild(titleCol);

    const priceCol = document.createElement("div");
    priceCol.setAttribute("class", "col text-right");
    let allTotalPrice = 0;
    for (let i = 0; i < defaultPhoneList.length; i++) {
        allTotalPrice = allTotalPrice + Number(defaultPhoneList[i]["price"] * Number(defaultPhoneList[i]["quantity"]));
    }
    const priceText = document.createTextNode("$" + allTotalPrice);
    priceCol.appendChild(priceText);
    allTotal.appendChild(priceCol);

    location.appendChild(allTotal);

    const checkOutPlace = document.createElement("div");
    checkOutPlace.setAttribute("class", "row toBeRefreshed");
    const checkOutButton = document.createElement("button");
    checkOutButton.setAttribute("class", "btn");
    const checkOutText = document.createTextNode("CHECKOUT");
    checkOutButton.appendChild(checkOutText);
    checkOutPlace.appendChild(checkOutButton);
    location.appendChild(checkOutPlace);


    const returnPart = document.createElement("div");
    returnPart.setAttribute("class", "back-to-shop toBeRefreshed");

    const returnSymbol = document.createElement("a");
    returnSymbol.setAttribute("href", "#");
    const returnNode = document.createTextNode("⇦");
    returnSymbol.appendChild(returnNode);
    returnPart.appendChild(returnSymbol);

    const textSpan = document.createElement("span");
    textSpan.setAttribute("class", "text-muted");
    const textNode = document.createTextNode("Back");
    textSpan.appendChild(textNode);
    returnPart.appendChild(textSpan);
    location.appendChild(returnPart);

};

window.onload = function () {

    let data = {uid: "test"};

    $.ajax({
        url: '/checkout/load',
        type: 'get',
        data: data,
        dataType: 'json',
        success: function (res) {
            console.log(res.item);
            refreshPage(res.item);
            // let brand1 = document.getElementById("Samsung");
            // console.log(brand1.innerText);
        }
    })
}


function increaseQuantity(sender){
    let brandName = (sender.target.markTag).slice(8);
    // console.log(brandName);

    let brand = document.getElementById(brandName);
    let originalQuantity = Number(brand.innerText);
    let newQuantity = originalQuantity + 1;

    let data = {uid: "test",brand: brandName, quantity: newQuantity};
    // console.log(data);

    $.ajax({
        url: '/checkout/changeQuantity',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (res) {
            console.log(" Frontend Increase successfully!")
            brand.innerText = newQuantity;
        }
    })


    let userdata = {uid: "test"};

    $.ajax({
        url: '/checkout/load',
        type: 'get',
        data: userdata,
        dataType: 'json',
        success: function (res) {
            console.log("Reload successfully!")
            refreshPage(res.item);
        }
    })
}

function decreaseQuantity(sender){
    // console.log(sender.target.markTag);
    let brandName = (sender.target.markTag).slice(8);
    // console.log(brandName);

    let brand = document.getElementById(brandName);
    // console.log(brand);
    let originalQuantity = Number(brand.innerText);
    if (originalQuantity > 1){
        let newQuantity = originalQuantity - 1;
        // console.log(newQuantity);

        let data = {uid: "test",brand: brandName, quantity: newQuantity};
        // console.log(data);

        $.ajax({
            url: '/checkout/changeQuantity',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function (res) {
                console.log(" Frontend quantity is changed successfully!")
                brand.innerText = newQuantity;
            }
        })
    }
    else{
        let deleteData = {uid: "test",brand: brandName};

        $.ajax({
            url: '/checkout/deleteItems',
            type: 'post',
            data: deleteData,
            dataType: 'json',
            success: function () {}
        })
    }
    let userdata = {uid: "test"};

    $.ajax({
        url: '/checkout/load',
        type: 'get',
        data: userdata,
        dataType: 'json',
        success: function (res) {
            console.log("Reload successfully!")
            refreshPage(res.item);
        }
    })
}

function deleteItem(sender){
    console.log(sender.target.markTag);
    let brandName = (sender.target.markTag).slice(6);
    console.log(brandName);

    let deleteData = {uid: "test",brand: brandName};

    $.ajax({
        url: '/checkout/deleteItems',
        type: 'post',
        data: deleteData,
        dataType: 'json',
        success: function () {}
    })

    let userdata = {uid: "test"};

    $.ajax({
        url: '/checkout/load',
        type: 'get',
        data: userdata,
        dataType: 'json',
        success: function (res) {
            console.log("Reload successfully!")
            refreshPage(res.item);
        }
    })

}








