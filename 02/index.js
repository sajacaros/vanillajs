

function handleResize() {
    console.log("outer width : ", window.outerWidth, ", inner width : ", window.innerWidth) ;
    const ratio = window.innerWidth/window.outerWidth*100;
    console.log("ratio : ", ratio);

    if( ratio > 80 ) {
        document.body.style.backgroundColor = "yellow";
    } else if (ratio > 50) {
        document.body.style.backgroundColor = "violet";
    } else {
        document.body.style.backgroundColor = "#50bcdf";
    }
}

function init() {
    handleResize();
    window.addEventListener("resize", handleResize);
}
init();