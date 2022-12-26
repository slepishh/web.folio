document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.js-tabMenu')) {
        let tab = document.querySelector('.product__tab-content');
        tab.classList.add('is-show')
        let tabs = document.querySelectorAll('.js-tabItem');
        tabs.forEach(function(elem) {
            let tabItem = elem;
            function showContent() {
                let tabId = tabItem.id;
                let tabCollections = document.querySelectorAll(`[data-tab`);
                let tabContent = document.querySelector(`[data-tab="${tabId}"]`);
                tabCollections.forEach(function(elem) {
                    elem.classList.remove('is-show');
                })
                tabContent.classList.toggle('is-show');
            }
            elem.addEventListener("click", showContent);
        })
    }
    if(document.querySelector('.js-tabOpen')) {
        let tabOpen = document.querySelectorAll('.js-tabOpen');
        tabOpen.forEach(function(elem) {
            function showContent() {
                elem.classList.toggle('active');
            }
            elem.addEventListener("click", showContent);
        })
    }
})