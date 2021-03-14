const footerButton = document.getElementById("footerButton"),
    footerContainer = document.getElementById("footerContainer"),
    footerCloseBtn = document.getElementById("footerCloseBtn");

function handleButton(){
    footerContainer.classList.add("moveUp");
    footerContainer.classList.remove("moveDown");
    footerContainer.setAttribute("style","height:500px");
}

function handleCloseBtn(){
    footerContainer.classList.remove("moveUp");
    footerContainer.classList.add("moveDown");
    footerContainer.setAttribute("style","height:0px");
}

function init(){
    footerButton.addEventListener("click", handleButton);
    footerCloseBtn.addEventListener("click", handleCloseBtn);
}
init();
