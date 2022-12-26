<?php
$subject = "Заявка обратного звонка!";
$response = '<div><img src="/image/response-image.svg" /><h4 class="h24">Ваша заявка отправлена</h4><p>Наш менеджер свяжется с Вами в ближайшее время</p></div>';
$errortext = '<div><h3 class="h32">Ошибка отправки</h3><p>При отправке формы произошла ошибка. Пожалуйста, попробуйте еще раз позже.</p></div>';
 ?>
	<h1>Заявка обратного звонка от: <?php echo strip_tags($name);?></h1>

	<p style="font-size: 16px;">Данные для обратной связи: <?php echo strip_tags($phone);?></p>

	<?php if(isset($message)) { ?>
	<p style="font-size: 16px;">Текст сообщения:</p>
	<p style="font-size: 16px;"><?php echo strip_tags($message);?></p>
	<?php } ?>
	<?php if(isset($link_page)) { ?>
	<p style="font-size: 16px;">Ссылка на страницу: <a href="<?php echo $link_page;?>" target="_blank"><?php echo $link_page;?></a></p>
	<?php } ?>