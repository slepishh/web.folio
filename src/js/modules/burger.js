document.addEventListener('DOMContentLoaded', () => {
  $(function () {
/*         $(window).resize(function () {
          if($('.js-menuBurger').css('display') !== 'none' && !$('.js-menu').hasClass('slinky-menu')) {
            let slinky = $('.js-menu').slinky({
              title: true
            });
          }
        });
    if($('.js-menuBurger').css('display') !== 'none') {
      let slinky = $('.js-menu').slinky({
        title: true
      });
    } */
    $('.js-menuBurger').click(function() {
        $(this).toggleClass('active');
        $('.js-menuWrap').toggleClass('active');
        $('.js-menu').toggleClass('active');
        if ($('.js-menu').hasClass('active')) {
          hiddenScroll();
        } else {
          addScroll();
        }
      });

    const hiddenScroll = () => {
      const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
      const body = document.body;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}`;
    };
    const addScroll = () => {
      const body = document.body;
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    window.addEventListener('scroll', () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });

  //     $('.js-menuBurger').click(() => {
  //         $('.menu__wrapper').toggleClass('menu__wrapper_active')
  // })
  //
  //     $('.js-menuBurger').click(() => {
  //         $('.js-menuBurger').toggleClass('menu-burger_active')
  // })
      const items = document.querySelectorAll('.production-menu__item');
      const submenu = document.querySelectorAll('.production-submenu');
      const rightside = document.querySelector('._right-side');


      for (let i = 0; i < items.length; i++) {
          items[i].addEventListener('click', function () {
              for (let j = 0; j < submenu.length; j++) {
                  submenu[j].classList.add('hidden')
              }
              submenu[i].classList.remove('hidden')
          })
      }
  });
  $('.js-menuCategory').click(function() {
    $(this).toggleClass('active');
  });
});