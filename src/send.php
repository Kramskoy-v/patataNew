<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь

// Основная форма ремонта

$brand = $_POST['brand'];
$model = $_POST['model'];
$engine = $_POST['engine'];
$years = $_POST['years'];
$text = $_POST['add-information'];
$name = $_POST['user-name'];
$phone = $_POST['user-phone'];
$email = $_POST['user-mail'];

if ($name && $phone) {
    $title = "Заявка на ремонт с сайта PaTaTa Club";
    $body = "
    <h2>Новая заявка на ремонт. Основная форма</h2>
    <p><b>Имя:</b> $name</p>
    <p><b>Номер телефона:</b> $phone</p>
    <p><b>Электронная почта:</b> $email</p>
    <p><b>Марка мотоцикла:</b> $brand</p>
    <p><b>Модель:</b> $model</p>
    <p><b>Тип двигателя:</b> $engine</p>
    <p><b>Год выпуска:</b> $years</p>
    <p><b>Дополнительная информация:</b> $text</p>
";
}

// форма из модалки

$mBrand = $_POST['mBrand'];
$mModel = $_POST['mModel'];
$mEngine = $_POST['mEngine'];
$mYears = $_POST['mYears'];

$mText = $_POST['mAdd-information'];
$mName = $_POST['mUsername'];
$mPhone = $_POST['mUserphone'];
$mEmail = $_POST['mUsermail'];

if ($mName && $mPhone) {
    $title = "Заявка на ремонт с сайта PaTaTa Club";
    $body = "
    <h2>Новая заявка на ремонт. Форма модального окна</h2>
    <p><b>Имя:</b> $mName</p>
    <p><b>Номер телефона:</b> $mPhone</p>
    <p><b>Электронная почта:</b> $mEmail</p>
    <p><b>Марка мотоцикла:</b> $mBrand</p>
    <p><b>Модель:</b> $mModel</p>
    <p><b>Тип двигателя:</b> $mEngine</p>
    <p><b>Год выпуска:</b> $mYears</p>
    <p><b>Дополнительная информация:</b> $mText</p>
";
}

// Форма вакансии

$vName = $_POST["vName"];
$vPhone = $_POST["vPhone"];
$vEmail = $_POST["vEmail"];
$vPosition = $_POST["vPosition"];
$vExperience = $_POST["vExperience"];

$experience = ($vExperience == "on") ? "Есть опыт работы" : "Нет опыта работы";

if ($vName && $vPhone) {
    $title = "Заявка по вакансии с сайта PaTaTa Club";
    $body = "
    <h2>Новая заявка на работу.</h2>
    <p><b>Имя:</b> $vName</p>
    <p><b>Номер телефона:</b> $vPhone</p>
    <p><b>Электронная почта:</b> $vEmail</p>
    <p><b>Должность:</b> $vPosition</p>
    <p><b>Опыт работы:</b> $experience</p>
   ";
}




// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function ($str, $level) {
        $GLOBALS['status'][] = $str;
    };

    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'kramskoy.va@yandex.ru'; // Логин на почте
    $mail->Password   = '***'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('kramskoy.va@yandex.ru', 'PaTaTa Club'); // Адрес самой почты и имя отправителя

    // Получатель письма
    //$mail->addAddress('leha-biker@mail.ru');
    $mail->addAddress('vencework42@gmail.com');

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отравленность сообщения
    if ($mail->send()) {
        $result = "success";
    } else {
        $result = "error";
    }
} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);
