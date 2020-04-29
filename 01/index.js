const title = document.querySelector("h1");
console.log(title);

const colors =  ["green", "red"];
const superEventHandler = {
    handleMouseOver: function() {
        title.innerHTML = "The mouse is here";
        title.style.color = colors[0];
    },

    handleMouseOut: function() {
        title.innerHTML = "The mouse is gone!";
        title.style.color = colors[0];
    },

    handleResize: function () {
        title.innerHTML = "You just resized!";
        title.style.color = colors[1];
    },

    handleRightClick: function() {
        title.innerHTML = "That was right click.";
        title.style.color = colors[1];
    }
}
title.addEventListener("mouseover", superEventHandler.handleMouseOver);
title.addEventListener("mouseleave", superEventHandler.handleMouseOut);
window.addEventListener("resize", superEventHandler.handleResize)
window.addEventListener("contextmenu", superEventHandler.handleRightClick);

