<?php
$data=file_get_contents('php://input');
$data=json_decode($data,true);
// var_dump($data);

// Сообщение
$message .= 'Имя: '.$data['name']."\n";
$message .= 'Email: '.$data['email']."\n";
$message .= 'Комментарий: '.$data['text']."\n";

// Отправляем
$mail=mail($data['email'].','.'admin@dimon713.ru', 'Новое сообщение', $message);
if($mail){
    echo 'yes';
} else {
    echo 'no';
}
?>