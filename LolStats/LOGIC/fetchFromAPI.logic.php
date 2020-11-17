<?php
$url = $_GET['url'];
$apiKey = "RGAPI-efd891be-4907-4070-b58a-8aac9b24b2c1";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'X-Riot-Token:' . $apiKey,
    'Content-Type: application/json'
));
curl_exec($curl);
curl_close($curl);