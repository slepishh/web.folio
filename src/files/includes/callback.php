<form class="sendler vertical-middle" method="POST" name="callback">
  <h3>Заказать звонок</h3>
    <p>Заполните форму ниже и мы свяжемся с Вами в ближайшее время.</p>

  <label class="fw-placeholder">
    <input class="fw-input callback__input Y-required" type="text" name="name">
    <span class="placeholder">Ваше имя</span>
    <span class="error-placeholder">Введите Ваше имя</span>
  </label>

  <label class="fw-placeholder">
    <input class="fw-input callback__input Y-required" type="text" name="phone">
    <span class="placeholder">Номер телефона</span>
    <span class="error-placeholder">Введите Ваш номер</span>
  </label>

  <label class="fw-placeholder">
    <textarea name="message" class="fw-input callback__input" placeholder="Опишите Ваш вопрос или просьбу и удобное время для связи."></textarea>
    <span class="placeholder">Комментарий</span>
  </label>


  <div class="fw-placeholder fw-placeholder-checkbox">
    <input type="checkbox" class="checkbox checkbox-black Y-required" id="checkbox__callback">
    <label for="checkbox__callback">Я ознакомился и согласен c&nbsp;<span class="load--agreement">правилами</span></label>
    <button class="btn btn-blue" type="submit">Отправить</button>
  </div>


  <div class="response">
    <div>
      <img src="/img/svg/response-image.svg" alt="" class="response__image">
      <h4 class="h24">Ваша заявка отправлена,</h4>
      <p>Мы свяжемся с вами в течении дня.</p>
    </div>
  </div>
  <div class="errortext">
    <div>
      <h3 class="h32">Ошибка отправки формы</h3>
      <p>При отправке формы произошла ошибка. Пожалуйста, попробуйте еще раз позже.</p>
    </div>
  </div>
  <input type="hidden" name="link_page" value="">
</form>
<script type="text/javascript">
	//$('input[name=phone]').mask('+7(999)-999-99-99');
	$('.callback form input[name=link_page]').attr('value', document.location.href);

	$(function () {
		$(".fw-placeholder .fw-input").on('focusout keyup', function () {
			if ($(this).val() === "" || $(this).val() === '+7(___)-___-__-__') {
				$(this).parent().removeClass('active');
			} else {
				$(this).parent().addClass('active');
			}
		});
	});

</script>