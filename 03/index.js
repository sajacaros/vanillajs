
const selector = document.querySelector("select");
const ITEM_NAME = 'country';
const INIT_VALUE = undefined;

function storeCountry(country) {
    localStorage.setItem(ITEM_NAME, country);
}

function initCountry() {
    storeCountry(INIT_VALUE);
}


function init() {
    initCountry();
    selector.addEventListener( 'change', (event)=>{
        if(selector.selectedIndex === 0) {
            initCountry();
        } else {
            storeCountry(selector.options[selector.selectedIndex].text);
        }
    });
}
init();
