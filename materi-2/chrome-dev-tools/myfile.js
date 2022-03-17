function onClickEvent() {
    let mycount = 1;
    alert("You completed "+mycount +"exercises");
    mycount = nestedCall(mycount)
    alert("You completed "+mycount +"exercises");
    
};

function nestedCall(mycount){
    document.querySelector('body > ul > li:nth-child(1)').remove();
    console.log("reached nestedCall");
    return mycount+6;
}