<?php 
$subject = "Новый отзыв на сайте!";
$response = '<div class="vertical-middle"><h3 class="h32">Спасибо!</h3><h4 class="h24">Ваша отзыв отправлен</h4><p>Он появится на сайте после модерации</p></div>';
$errortext = '<div><h3 class="h32">Ошибка отправки</h3><p>При отправке сообщения произошла ошибка. Пожалуйста, попробуйте еще раз позже.</p></div>';
 ?>

				<h1>Новый отзыв на сайте от: <?php echo strip_tags($name);?></h1>

				<p style="font-size: 16px;">Достоинства: <br><?php echo strip_tags($options['dignities']);?></p>

				<p style="font-size: 16px;">Недостатки: <br><?php echo strip_tags($options['disadvantages']);?></p>

				<p style="font-size: 16px;">Текст отзыва: <br><?php echo strip_tags($review);?></p>
	
				<p style="font-size: 16px;">Время отправки отзыва: <?php $time = date("F j, Y, g:i a"); echo $time;?></p>
				
				<?php if(isset($link_page)) { ?>
				<p style="font-size: 16px;">Ссылка на страницу: <a href="<?php echo $link_page;?>" target="_blank"><?php echo $link_page;?></a></p>
				<?php } ?>