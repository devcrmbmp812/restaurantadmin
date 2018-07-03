<?php

$API_ACCESS_KEY= 'AAAAaj9uEeU:APA91bHVpFFe38cLylFQP3vET6TFlV0zxCNpA49PIwN_z1WMS1jrvkBopwzIx6CZjTfegNTwyM3sgjc-gQQh8yw7RVcQapoKlCSmdB5LiLFPILEC6FPJXNzJ9ic_cQiheiIlboA_UGqg';
$name=$_GET['name'];
$description= $_GET['description'];
$url = 'https://fcm.googleapis.com/fcm/send';
$msg = array
(
    'body' => $description ,
    'title' => $name,
    'icon' => 'myicon',/*Default Icon*/
    'sound' => 'mySound'/*Default sound*/
);
$fields = array
(
    'to' => '/topics/public',
    'notification' => $msg
);

$headers = array
(
    'Authorization: key=' . $API_ACCESS_KEY,
    'Content-Type: application/json'
);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
$newresult = curl_exec($ch);
if ($newresult === FALSE) {
    echo "inide eror";
    print_r($newresult);
    return $newresult;
}
curl_close($ch);
print_r($newresult);
?>
