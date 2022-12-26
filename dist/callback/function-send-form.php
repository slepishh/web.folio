<?php

if(isset($_POST)) {
	
	extract($_POST);
	
	ob_start();

	require('mail-tpl/'.$template.".tpl");

	$body = ob_get_contents();

  ob_end_clean();


   	//print_r($body);
   	// require_once('config.php'); //путь до конфигурационного файла для вашего smtp сервера
   	// print_r($__smtp);
	try{
    header('Content-Type: application/json; charset= utf-8');

		require_once('config.php'); //путь до конфигурационного файла для вашего smtp сервера

		require_once('phpmailer/class.phpmailer.php'); //путь до класса phpmailer

   		 $mail = new PHPMailer(true);
   		 $data = array('response' => false, 'errortext' => false);

  		 $mail->IsSMTP();
  		 $mail->Host       = $__smtp['host'];
    	 $mail->SMTPDebug  = $__smtp['debug'];
    	 $mail->SMTPAuth   = $__smtp['auth'];
    	 $mail->Port       = $__smtp['port'];
   		 $mail->SMTPSecure = $__smtp['secure'];
      	 $mail->CharSet    = "UTF-8";
      	 $mail->Username   = $__smtp['username'];
      	 $mail->Password   = $__smtp['password'];
    	 $mail->AddAddress($__smtp['addreply']);                //кому письмо
    	 // $mail->AddReplyTo($email, $name);
    	 $mail->SetFrom($__smtp['username'], $__smtp['name_site']); //от кого (желательно указывать свой реальный e-mail на используемом SMTP сервере
    	 $mail->Subject = $subject;
    	 $mail->MsgHTML($body);
       if (isset($_FILES)) {
        foreach ($_FILES as $key => $value) {
          if ($value['tmp_name']!="") {
            $mail->AddAttachment($value['tmp_name'],$value['name']);
          }
        }
       }

    	if($mail->Send() === true) {
        if(isset($response) && !empty($response)){
          $data['response'] = $response;
        }
        echo json_encode($data);
        //print_r($data);
//        $a = 2/0;
      }
  }
  catch (Exception $e) {
    header('Content-Type: application/json; charset= utf-8');

    $data['response'] = $e;
    echo json_encode($data);
  }
}

 ?>