    var preloader = {
        start: function() {
            $('body').prepend('<section class="preloader"><div class="banter-loader__wrap"><div class="banter-loader"><div class="banter-loader__box"></div><div class="banter-loader__box"></div><div class="banter-loader__box"></div><div class="banter-loader__box"></div><div class="banter-loader__box"></div><div class="banter-loader__box"></div><div class="banter-loader__box"></div><div class="banter-loader__box"></div><div class="banter-loader__box"></div></div></div></section>');
        },
        stop: function() {
            $('section.preloader').remove();
        }
    }

    function getURLVar(key) {
        var value = [];

        var query = String(document.location).split('?');

        if (query[1]) {
            const part = query[1].split('&');

            for (i = 0; i < part.length; i++) {
                var data = part[i].split('=');

                if (data[0] && data[1]) {
                    value[data[0]] = data[1];
                }
            }

            if (value[key]) {
                return value[key];
            } else if ($key == undefined) {
                return value;
            } else {
                return '';
            }
        }
    }

    $(function () {

        /*
        Прелоадер для пагинации
        */
        $('.pagination li a').click(function () {
            preloader.start();
        });

        /*
        Имитация плайсхолдера
        */
        $(".fw-placeholder").each(function () {
            $(this).find('*[value]').each(function () {
                $(this).val() ? $(this).parents('.fw-placeholder').addClass('active') : false
            });
        });
        $(".fw-placeholder > *").on('focusout keyup', function () {
            if ($(this).val() === "" || $(this).val() === '+7(___)-___-__-__') {
                $(this).parent().removeClass('active');
            } else {
                $(this).parent().addClass('active');
            }
        });

        $('.page iframe').each(function () {
            // height =
            // $(this).height($(this).height()*($(this).parent().width()/$(this).height()));
            $(this).attr('height', $(this).height() * ($(this).parent().width() / $(this).width()));
            $(this).attr('width', $(this).parent().width());
        });

        /*
        Клик по бургеру
        */
        $('.mobile-menu').click(function () {
            $(".header").toggleClass("show-menu");
        });

        /*
        Аккардион
        */
        $('.spoiler-title,.spoiler > .fa-angle-down').click(function () {
            $(this).parent().toggleClass('open');
            $(this).parent().find('div.spoiler-content').slideToggle();
            return false;
        });

        /*
        Фиксация навигации при поркуртке
        */
        var tempScrollTop, currentScrollTop = $(window).scrollTop();

        $(window).on('scroll load', function () {
            if ($('section.preloader').length == 0) {
                currentScrollTop = $(window).scrollTop();
                if (currentScrollTop > $('.header').height() && !$('body').hasClass('hidden')) {
                    $('body').addClass('fixed-header');
                    if (tempScrollTop < currentScrollTop) {
                        $('.header').removeClass('show');
                    } else if (tempScrollTop > currentScrollTop) {
                        $('.header').addClass('show');
                    }
                } else {
                    $('body').removeClass('fixed-header');
                    $('.header').removeClass('show');
                }

                tempScrollTop = currentScrollTop;
            }
        });

        function number_format(number, decimals, dec_point, separator) {
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof separator === 'undefined') ? ',' : separator,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + (Math.round(n * k) / k)
                        .toFixed(prec);
                };
            // Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
                .split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '')
                .length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1)
                    .join('0');
            }
            return s.join(dec);
        }

        /*
        Загрузка динамических блоков
        */
        $('body').on('click', '[class *= "load--"]', function (evt) {
            var loadBtn = $(this);

            if (loadBtn.hasClass('disabled')) {
                return false;
            }

            var tpl = String(loadBtn.attr('class').split(' ').filter(function (e) {
                return e.indexOf('load--') !== -1;
            })).replace("load--", "");

            $.ajax({
                url: '/includes/' + tpl + '.php',
                type: "GET",
                contentType: false,
                processData: false,
                dataType: 'html',
                beforeSend: function () {
                    loadBtn.addClass('disabled');
                },
                success: function (data) {
                    $('body').append('<section class="float-box ' + tpl + '"><div class="float-box_inset">' + data + '</div><div class="exit"></div></section>');
                    if ($('section.float-box form').length > 0) {
                        $('section.float-box form').parents('.float-box').addClass('form');
                    } else {
                        $('section.float-box').addClass('page');
                    }
                    setTimeout(function () {
                        $('section.float-box').addClass('show');
                    }, 700);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                /*
                    $('.popup__inner').append('<h2 style="text-align:center">Error</h2>');
                    $(".popup--load").fadeIn(100);
                */
                },
                complete: function () {
                    loadBtn.removeClass('disabled');
                }
            });
            return false;
        });

        $('body').click(function (event) {
            if ($(event.target).hasClass('float-box') || $(event.target).hasClass('exit')) {

                if ($(event.target).hasClass('exit')) {
                    var box = $(event.target).parents(".float-box");
                } else if ($(event.target).hasClass('float-box')) {
                    var box = $(event.target);
                }

                if (box !== undefined) {
                    box.find(".exit").css('display', "none");
                    box.find(".float-box_inset").css('right', '-110%');
                    setTimeout(function () {
                        box.remove();
                    }, 500);
                }

            }
        });

        /*
        Отправка формы AJAX + валидация формы
        */

        $('body').on('submit', '.sendler', function () {
            var form = $(this);
    // Проверка полей формы
            var classError = 'wrong';
            var checkedGroups = ',';

            function checkFullness(handle) {
                var error = true;
                var attribute = String($(handle).attr('class').split(' ').filter(function (e) {
                    return e.indexOf('required') !== -1
                }));

                if (attribute.indexOf('group') === 0) {
                    attribute = attribute.substring(9);
                }

                var required = true;//флаг обязательности
                if (attribute.indexOf('Y') === -1) {
                    required = false;
                }
                var format = attribute;//проверка на формат
                if (required)
                    format = attribute.substr(2);
                switch ($(handle).attr('type')) {
                    case 'checkbox':
                        if (!$(handle).prop('checked')) {
                            error = false;
                        }
                        break;
                    case 'radio':
                        if (!$(handle).prop('checked') && $('[name="' + $(handle).attr('name') + '"]:checked').length == 0) {
                            error = false;
                        } else {
                            error = 'radio';
                        }
                        break;
                    default:
                        if ($(handle).val().trim().length == 0 || $(handle).val() == '0') {
                            if (required) error = false;
                        } else {
                            if (format === 'required-num') {
                                var regCheck = new RegExp('[^0-9\s-]+');
                                if (regCheck.test($(handle).val()))
                                    error = 'wrong';
                            }
                            if (format === 'required-email') {
                                var regCheck = new RegExp("^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$");
                                if (!regCheck.test($(handle).val()))
                                    error = 'wrong';
                            }
                        }
                        break;
                }
                if (!error && $(handle).attr('confirmInfo') && $(handle).attr('confirmInfo').indexOf('self') !== -1 && $(handle).attr('checkforconfirm').indexOf('group') !== -1)//выводим хинт для уникального множественного ошибки
                {
                    var title = " значение поля";//подпись к пункту
                    if (typeof $(handle).attr('title') !== 'undefined' && $(handle).attr('title').length > 0)
                        title = $(handle).attr('title');
                    $($(handle).attr('confirmInfo').substr(4)).after("<div class='wrong-text'>" + title + "</div>");
                }
                if (error === 'wrong' && $(handle).attr('confirmInfo') && $(handle).attr('checkforconfirm').indexOf('group') !== -1)//выводим хинт для уникального множественного оказии
                {
                    $($(handle).attr('confirmInfo').substr(4)).after("<div class='wrong-text'>Неверное значение поля</div>");
                }
                return error;

            }

            function prepareChecking(handle)// запускает проверку конкретного элемента и маркерует ошибочные
            {
                var error = true;//возвращаемое значение; смысл - просто показать, что есть ошибка принимает значение: true - нет ошибок; false - поле не заполнено; 'wrong' - поле заполнено неправильно; 'radio' - радиокнопка отмечена и нет ошибок
                var title = " значение поля " + $(handle).attr('placeholder');//подпись к пункту
                if (typeof $(handle).attr('title') !== 'undefined' && $(handle).attr('title').length > 0) {
                    title = $(handle).attr('title');
                }
                var after = handle;//куда лепить
                var attribute = String($(handle).attr('class').split(' ').filter(function (e) {
                    return e.indexOf('required') !== -1
                }));

                if (attribute.indexOf('group') !== -1)//группа
                {
                    var groupIndex = String(attribute.split('_').filter(function (e) {
                        return e.indexOf('group') !== -1
                    })).slice(5);
                    $("[class*='group" + groupIndex + "']").each(function () {
                        error = checkFullness(this);
                        switch (error) {
                            case true :
                                error = checkFullness(this);
                                break;
                            case 'radio' :
                                if (checkFullness(this) === 'wrong') error = false;
                                break;//???
                            case false :
                                if (checkFullness(this) === 'radio') {
                                    error = 'radio';
                                }
                                $("[class*='group" + groupIndex + "']").each(function () {
                                    if ($(this).val() != 0) {
                                        error = true;
                                    }
                                });
                                if (checkFullness(this) === 'radio') {
                                    error = 'radio';
                                }
                                break;

                            default:
                                checkFullness(this);
                                break;
                        }

                        if (error !== true && error !== 'radio') {
                            $("[class*='group" + groupIndex + "']").each(function () {
                                if (typeof $(this).attr('title') !== 'undefined') {
                                    title = $(this).attr('title');
                                }
                                after = $(this).attr('confirmInfo');
                            });

                            if (error === 'wrong')
                                $(after).after("<div class='wrong-text'>Неверное значение поля</div>");
                            else
                                $(after).after("<div class='wrong-text'>" + title + "</div>");//html ошибки

                            $("[class*='group" + groupIndex + "']").each(function () {
                                $(this).addClass(classError);//добавление класса всей группе
                            });
                            error = false;
                        }

                        if (error === 'radio')//Радио значит всё хорошо
                            error = true;
                    });
                } else { //одиночное
                    error = checkFullness(handle);
                    if (error) {
                    }
                    if (!error || error == 'wrong') {
                        if (typeof $(handle).attr('confirmInfo') !== 'undefined' && $(handle).attr('confirmInfo').length > 0) {
                            after = $(handle).attr('confirmInfo');
                        }
                        if (typeof $(handle).attr('title') !== 'undefined') {
                            if (typeof $(handle).attr('confirmInfo') !== 'undefined' && $(handle).attr('confirmInfo').length > 0) {
                                if (error === 'wrong')
                                    $(after).append("<div class='wrong-text'>Неверное значение поля</div>");
                                else
                                    $(after).append("<div class='wrong-text'>" + title + "</div>");//html ошибки в указаном блоке
                            } else {
                                if (error === 'wrong')
                                    $(after).after("<div class='wrong-text'>Неверное значение поля</div>");
                                else
                                    $(after).after("<div class='wrong-text'>" + title + "</div>");//html ошибки под блоком объекта
                            }
                        }
                        $(handle).addClass(classError).parent().addClass(classError);//добавление класса
                        error = false;
                    }
                }
                return error;
            }

            function checktrueAttr(form) { //подготавливает данные
                var error = true, classError = 'wrong';
                checkedGroups = ',';
                $('div.wrong-text').remove();//убираем сообщения ошибок если такие есть
                $('.' + classError).each(function () {
                    $(this).removeClass(classError);
                });//убираем подсветку ошибок
                $(form).find('[class *= "required"]').each(function () {//Перебираем объекты нуждающиеся в обязательном заполнении
                    if (error) error = prepareChecking(this);
                    else prepareChecking(this);
                });
                return error;
                // return false;
            }

            if (checktrueAttr(form)) {
                let formData = new FormData(form.get(0)); // создаем новый экземпляр объекта и передаем ему нашу форму (*)
                formData.append('template', form.attr('name'));
                $.get('/index.php?route=sendform/sendform/getHash',function(data){
                formData.append('hash',data);
                var method, action;
                if (form.attr('method') != undefined) {
                    method = form.attr('method');
                } else {
                    method = 'POST';
                }
                ;
                if (form.attr('action') != undefined) {
                    action = form.attr('action');
                } else {
                    action = '/index.php?route=sendform/sendform';
                }

                $.ajax({ // инициaлизируeм ajax зaпрoс
                    url: action,
                    type: method,
                    contentType: false, // важно - убираем форматирование данных по умолчанию
                    processData: false, // важно - убираем преобразование строк по умолчанию
                    dataType: 'json', // oтвeт ждeм в json фoрмaтe
                    data: formData, // дaнныe для oтпрaвки
                    beforeSend: function (data) { // сoбытиe дo oтпрaвки
                        form.find('button').prop('disabled', true); // нaпримeр, oтключим кнoпку, чтoбы нe жaли пo 100 рaз
                        preloader.start();
                    },
                    success: function (data) { // сoбытиe пoслe удaчнoгo oбрaщeния к сeрвeру и пoлучeния oтвeтa
                        form[0].reset();
                        $(form).addClass('sent');
                        $(form).find('.fw-placeholder').removeClass('active');

                        if (!$(form).find('.response').length) {
                            if (data['response']) {
                                $(form).append('<div class="response">' + data['response'] + '</div>');
                            } else {
                                var response = '<div><h4 class="h24">Ваша заявка отправлена</h4><p>Наш менеджер свяжется с Вами в ближайшее время</p></div>';
                                $(form).append('<div class="response">' + response + '</div>');
                            }

                        }

                        var $form = $(form);

                        setTimeout(function () {
                            if (!$form.parents('.float-box_inset').length <= 0) {
                            $form.removeClass('sent');
                            $form.parents('.float-box').find('.exit').click();
                            }
                        }, 5000);

    /*                     $('.exit').click(function () {
                            $(form).removeClass('sent');
                        }); */

                    },
                    error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
                        console.log(xhr, ajaxOptions, thrownError);

                        /* form[0].reset(); */
                        $(form).addClass('error');
                        /* $(form).find('.fw-placeholder').removeClass('active'); */

                        if (!$(form).find('.errortext').length <= 0) {

                            $(form).append('<div class="errortext"><div><h3 class="h32">Ошибка отправки</h3><p>При отправке формы произошла ошибка. Пожалуйста, попробуйте еще раз позже.</p></div></div><div class="exit"></div>');

                            var $form = $(form);

                            $('.exit').click(function () {
                                $(form).removeClass('error');
                            });
                        }

                    },
                    complete: function (data) { // сoбытиe пoслe любoгo исхoдa
                        form.find('button').prop('disabled', false); // в любoм случae включим кнoпку oбрaтнo
                        $(form).find('.fw-placeholder').removeClass('active');

                        preloader.stop();
                    }
                });
                });
            }
            return false;
        });//function-send

    });//document.ready