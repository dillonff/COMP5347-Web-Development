
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
        if (i == 0) {
            cartRow.setAttribute("class", "row border-top border bottom toBeRefreshed");
        } else {
            cartRow.setAttribute("class", "row border bottom toBeRefreshed");
        }
        cartRow.appendChild(itemRow);
        location.appendChild(cartRow);

        for (let item of listTitle) {
            if (item == "image") {
                const phoneImage = document.createElement("img");
                phoneImage.setAttribute("class", "img-fluid");
                const address = defaultPhoneList[i][item];
                phoneImage.src = address;
                const imageCol = document.createElement("div");
                imageCol.setAttribute("class", "col-2");
                imageCol.appendChild(phoneImage);
                itemRow.appendChild(imageCol);
            } else if (item == "brand") {
                const brandValue = defaultPhoneList[i]["brand"];
                const titleValue = defaultPhoneList[i]["title"];
                const priceValue = defaultPhoneList[i]["price"];
                const idValue = defaultPhoneList[i]["phoneId"];

                const brandNode = document.createTextNode(brandValue);
                const brandName = document.createElement("div");
                brandName.setAttribute("class", "row");
                brandName.appendChild(brandNode);

                const titleNode = document.createTextNode(titleValue);
                const titleName = document.createElement("div");
                titleName.setAttribute("class","row text-muted");
                titleName.appendChild(titleNode);

                const idNode = document.createTextNode(idValue);
                const idName = document.createElement("div");
                idName.setAttribute("class", "row");
                idName.appendChild(idNode);
                idName.style.visibility = "hidden";

                const priceNode = document.createTextNode("$" + priceValue);
                const priceName = document.createElement("div");
                priceName.setAttribute("class", "row");
                priceName.appendChild(priceNode);

                const textCol = document.createElement("div");
                textCol.setAttribute("class", "col");
                textCol.appendChild(brandName);
                textCol.appendChild(titleName);
                textCol.appendChild(idName);
                textCol.appendChild(priceName);
                itemRow.appendChild(textCol);
            } else if (item == "quantity") {
                const quantityCol = document.createElement("div");
                quantityCol.setAttribute("class", "col quantity")

                const decrease = document.createElement("a");
                decrease.setAttribute("href", "#");
                decrease.addEventListener("click", decreaseQuantity);
                decrease.markTag = "decrease"+ defaultPhoneList[i]["phoneId"];
                const decreaseNode = document.createTextNode("-");
                decrease.appendChild(decreaseNode);
                quantityCol.appendChild(decrease);

                const quantity = document.createElement("a");
                // quantity.setAttribute("href", "#");
                quantity.setAttribute("id",defaultPhoneList[i]["phoneId"]);
                quantity.setAttribute("class", "border");

                const quantityValue = defaultPhoneList[i][item];
                const quantityNode = document.createTextNode(quantityValue);
                quantity.appendChild(quantityNode);
                quantityCol.appendChild(quantity);

                const increase = document.createElement("a");
                increase.setAttribute("href", "#");
                increase.addEventListener("click", increaseQuantity);
                increase.markTag = "increase" + defaultPhoneList[i]["phoneId"];
                const increaseNode = document.createTextNode("+");
                increase.appendChild(increaseNode);
                quantityCol.appendChild(increase);

                itemRow.appendChild(quantityCol);

                const totalPriceCol = document.createElement("div");
                totalPriceCol.setAttribute("class", "col");

                const phonePrice = Number(defaultPhoneList[i]["price"]);
                const phoneQuantity = Number(defaultPhoneList[i]["quantity"]);
                const totalPrice = (phonePrice * phoneQuantity).toFixed(2);
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
                deleteSpan.markTag = "delete" + defaultPhoneList[i]["phoneId"];

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
    allTotalPrice = allTotalPrice.toFixed(2);
    const priceText = document.createTextNode("$" + allTotalPrice);
    priceCol.appendChild(priceText);
    allTotal.appendChild(priceCol);

    location.appendChild(allTotal);

    const checkOutPlace = document.createElement("div");
    checkOutPlace.setAttribute("class", "row toBeRefreshed");
    const checkOutButton = document.createElement("button");
    checkOutButton.setAttribute("class", "btn");
    checkOutButton.setAttribute("onclick","checkoutButton()");
    const checkOutText = document.createTextNode("CHECKOUT");
    checkOutButton.appendChild(checkOutText);
    checkOutPlace.appendChild(checkOutButton);
    location.appendChild(checkOutPlace);


    const returnPart = document.createElement("div");
    returnPart.setAttribute("class", "back-to-shop toBeRefreshed");

    const returnSymbol = document.createElement("a");
    returnSymbol.setAttribute("href", "#");
    returnSymbol.setAttribute("onclick", "returnButton()")
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

const emptyCart = function() {
    const newLocation = document.getElementById("cartBody");

    const emptyText = document.createTextNode("Your shopping cart is empty!");
    const emptyNode = document.createElement("div")
    emptyNode.appendChild(emptyText);
    newLocation.appendChild(emptyNode);

    const returnPart = document.createElement("div");
    returnPart.setAttribute("class", "back-to-shop toBeRefreshed");

    const returnSymbol = document.createElement("a");
    returnSymbol.setAttribute("href", "#");
    returnSymbol.setAttribute("onclick", "returnButton()")
    const returnNode = document.createTextNode("⇦");
    returnSymbol.appendChild(returnNode);
    returnPart.appendChild(returnSymbol);

    const textSpan = document.createElement("span");
    textSpan.setAttribute("class", "text-muted");
    const textNode = document.createTextNode("Back");
    textSpan.appendChild(textNode);
    returnPart.appendChild(textSpan);
    newLocation.appendChild(returnPart);

}



window.onload = function () {
    // let data = {uid: "test"};
    $.ajax({
        url: '/checkout/load',
        type: 'get',
        // data: data,
        dataType: 'json',
        success: function (res) {
            if(res.item != ""){
                console.log("your shopping cart is not empty!")
                console.log(res.item);
                refreshPage(res.item);
            }
            else{
                console.log("your shopping cart is empty!");
                emptyCart();
            }
        }
    })
}



async function increaseQuantity(sender){

    let idName = (sender.target.markTag).slice(8);
    let phoneData = {id: idName};

    $.ajax({
        url:'/item/getPhoneById',
        type:'get',
        data:phoneData,
        dataType:'json',
        success:async function (res) {
            console.log("test successfully!");
            // console.log(res.stock);
            const stock = res.stock;
            console.log(stock);

            let phoneId = document.getElementById(idName);
            let originalQuantity = Number(phoneId.innerText);

            if (stock > originalQuantity) {

                let newQuantity = originalQuantity + 1;

                // let data = {uid: "test", phoneId: idName, quantity: newQuantity};
                let data = {phoneId: idName, quantity: newQuantity};
                console.log("frontend send data:");
                console.log(data);
                try {
                    const res = await changeQuantity(data);
                    phoneId.innerText = newQuantity.toString();
                } catch (err) {}

                // let userdata = {uid: "test"};
                // console.log(userdata);

                $.ajax({
                    url: '/checkout/load',
                    type: 'get',
                    // data: userdata,
                    dataType: 'json',
                    success: function (res) {
                        console.log("Reload successfully!")
                        // console.log(res.item);
                        // refreshPage(res.item);
                        if(res.item != ""){
                            console.log("your shopping cart is not empty!")
                            console.log(res.item);
                            refreshPage(res.item);
                        }
                        else{
                            console.log("your shopping cart is empty!");
                            emptyCart();
                        }
                    }
                })
            }else {
                alert("There is no stock for this product!");
            }
        }
    })


}


async function decreaseQuantity(sender){

    let idName = (sender.target.markTag).slice(8);
    let phoneId = document.getElementById(idName);

    let originalQuantity = Number(phoneId.innerText);
    if (originalQuantity > 1){
        let newQuantity = originalQuantity - 1;
        console.log(newQuantity);

        // let data = {uid: "test",phoneId: idName, quantity: newQuantity};
        let data = {phoneId: idName, quantity: newQuantity};
        console.log("frontend send to backend: ")
        console.log(data);

        try {
            const res = await changeQuantity(data);
            phoneId.innerText = newQuantity.toString();
        } catch (err){}

        // location.reload()

        // let userdata = {uid: "test"};

        $.ajax({
            url: '/checkout/load',
            type: 'get',
            // data: userdata,
            dataType: 'json',
            success: function (res) {
                console.log("Reload successfully!")
                // refreshPage(res.item);
                if(res.item != ""){
                    console.log("your shopping cart is not empty!")
                    console.log(res.item);
                    refreshPage(res.item);
                }
                else{
                    console.log("your shopping cart is empty!");
                    emptyCart();
                }
            }
        })
    }
    else{
        // let deleteData = {uid: "test",phoneId: idName};
        let deleteData = {phoneId: idName};

        try {
            const res = deletePhone(deleteData);
            // const res = await deletePhone(deleteData);
        } catch (err){}

        // location.reload()

        // let userdata = {uid: "test"};

        $.ajax({
            url: '/checkout/load',
            type: 'get',
            // data: userdata,
            dataType: 'json',
            success: function (res) {
                console.log("Reload successfully!")
                // refreshPage(res.item);
                if(res.item != ""){
                    console.log("your shopping cart is not empty!")
                    console.log(res.item);
                    refreshPage(res.item);
                }
                else{
                    console.log("your shopping cart is empty!");
                    emptyCart();
                }
            }
        })
    }

}

function changeQuantity(data) {
    return $.ajax({
        url: '/checkout/changeQuantity',
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (res) {
            console.log(" Frontend quantity is changed successfully!");
        }
    })
}



async function deleteItem(sender){
    let idName = (sender.target.markTag).slice(6);

    // let deleteData = {uid: "test", phoneId: idName};
    let deleteData = {phoneId: idName};
    console.log("frontend send to backend:")
    console.log(deleteData);

    try {
        // const res = await deletePhone(deleteData);
        const res = deletePhone(deleteData);
    } catch (err){}

    // location.reload()

    // let userdata = {uid: "test"};

    $.ajax({
        url: '/checkout/load',
        type: 'get',
        // data: userdata,
        dataType: 'json',
        success: function (res) {
            console.log("Reload successfully!")
            // console.log(res)
            // refreshPage(res.item);
            if(res.item != ""){
                console.log("your shopping cart is not empty!")
                console.log(res.item);
                refreshPage(res.item);
            }
            else{
                console.log("your shopping cart is empty!");
                emptyCart();
            }
        }
    })


}

function deletePhone(deleteData){
    return $.ajax({
        url: '/checkout/deleteItems',
        type: 'post',
        data: deleteData,
        dataType: 'json',
        success: function () {
            console.log("delete successfully!")
        }
    })
}


function returnButton(){
    // window.location.href = "http://localhost:3000/";
    window.history.back();
    window.location.go(-1);
    // window.location.reload();
    // window.location.replace(document.referrer)
}


async function checkoutButton(){
    try {
        const res = await checkout();
        // const res = checkout();
    } catch (err){}

    // let userdata = {uid: "test"};
    $.ajax({
        url:'/checkout/empty',
        type:'post',
        // data:userdata,
        dataType:'json',
        success:function(){}
    })
    // window.location.href = "http://localhost:3000/";
}

function checkout(){
    // let userdata = {uid: "test"};
    $.ajax({
        url: '/checkout/load',
        type: 'get',
        // data: userdata,
        dataType: 'json',
        success: function (res) {
            console.log("Find user's items successfully!")

            const cartLength = res.item.length

            for (let i = 0; i < cartLength; i++) {
                // console.log(res.item[i]);
                let currentQuantity = res.item[i].quantity;
                let currentId = res.item[i].phoneId;
                let phoneIdData = {id: currentId}
                // console.log("frontend:")
                // console.log(phoneIdData)

                $.ajax({
                    url:'/item/getPhoneById',
                    type:'get',
                    data: phoneIdData,
                    dataType: 'json',
                    success: function(res){
                        // console.log(res);
                        // console.log(res.stock);
                        let databaseStock = res.stock
                        let newStock = databaseStock - currentQuantity
                        console.log(newStock);
                        let changedStock = {phoneId: currentId, newStock:newStock}
                        console.log(changedStock);
                        $.ajax({
                            url:'/checkout/finalCheckout',
                            type: 'post',
                            data: changedStock,
                            dataType: 'json',
                            success: function(){}
                        })
                    }
                })
            }
        }
    })
}

