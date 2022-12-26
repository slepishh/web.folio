document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.js-popupOpen')) {
        let popupOpeners = document.querySelectorAll('.js-popupOpen');
        popupOpeners.forEach(function(elem) {
            function showPopup() {
                let popups = document.querySelectorAll('.js-popup');
                popups.forEach(function(elem) {
                    elem.classList.add('js-hide');
                    wrapperUnfixPosition();
                })
                let popupId= elem.getAttribute('data-popup');
                let popup = document.querySelector('#' + popupId);
                popup.classList.remove('js-hide');
                popup.classList.add('js-block');
                wrapperFixPosition();
            }
        elem.addEventListener("click", showPopup);
        })
    }
    if(document.querySelector('.js-popupClose')) {
        let popupClose = document.querySelectorAll('.js-popupClose');
        popupClose.forEach(function(elem) {
            function closePopup() {
                elem.closest('.js-popup').classList.remove('js-block');
                elem.closest('.js-popup').classList.add('js-hide');
                wrapperUnfixPosition();
            }
        elem.addEventListener("click", closePopup);
        })
    }
    document.addEventListener('keydown', function(e) {
        let popups = document.querySelectorAll('.js-popup');
        if( e.keyCode == 27 ){ 
            popups.forEach(function(elem) {
                elem.classList.remove('js-block');
                elem.classList.add('js-hide');
                wrapperUnfixPosition();
            })
        }
    });
    $('.js-closeVideo').on('click', function () {
        $(".js-popup iframe").attr("src", $(".js-popup iframe").attr("src"));
        $(".js-popup video").attr("src", $(".js-popup video").attr("src"));
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            $(".js-popup iframe").attr("src", $(".js-popup iframe").attr("src"));
            $(".js-popup video").attr("src", $(".js-popup video").attr("src"));
        }
    });
});

function wrapperFixPosition() {
    const fixBlocks = document.querySelectorAll('.js-fixBlock');
    let paddingOffset = window.innerWidth - document.querySelector('body').offsetWidth + 'px'; 
    setTimeout( function() {
        if ( !document.querySelector('body').hasAttribute('wrapper-body-scroll-fix') ) {
            let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            fixBlocks.forEach((el) => {
                el.style.paddingRight = paddingOffset;
            });
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('body').setAttribute('wrapper-body-scroll-fix', scrollPosition);
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('body').style.position = 'fixed';
            document.querySelector('body').style.top = '-' + scrollPosition + 'px';
            document.querySelector('body').style.left = '0';
            document.querySelector('body').style.width = '100%';
            document.querySelector('body').style.paddingRight = paddingOffset;
            document.querySelector('header').style.display = "none";
        }
    }, 15 ); 
}
function wrapperUnfixPosition() {
    const fixBlocks = document.querySelectorAll('.js-fixBlock');
    if ( document.querySelector('body').hasAttribute('wrapper-body-scroll-fix') ) {
        let scrollPosition = document.querySelector('body').getAttribute('wrapper-body-scroll-fix');
        document.querySelector('body').removeAttribute('wrapper-body-scroll-fix');
        document.querySelector('body').style.overflow = '';
        document.querySelector('body').style.position = '';
        document.querySelector('body').style.top = '';
        document.querySelector('body').style.left = '';
        document.querySelector('body').style.width = '';
        document.querySelector('header').style.display = "";
        window.scroll(0, scrollPosition);
        fixBlocks.forEach((el) => {
            el.style.paddingRight = '0px';
        });
        document.querySelector('body').style.paddingRight = '0px';
    }
}