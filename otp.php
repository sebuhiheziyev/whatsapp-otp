<?php
$number = $_POST['number'];
$code = rand(100000, 999999);

$data = [
   "number" => $number,
   "message" => "Sizin OTP kodunuz: $code"
];

$ch = curl_init("http://localhost:3000/send-message");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo "OK";
?>
