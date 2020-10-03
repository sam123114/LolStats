<?php
    function getSummonerFromAPI(){
        $url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" . $_GET['summonerName'];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'X-Riot-Token: ' . "RGAPI-146d47a4-9931-44db-8a54-a7fc63dac064",
        ));
        curl_setopt( $ch, CURLOPT_URL, $url );  
        $content = curl_exec( $ch );
        $response = curl_getinfo( $ch );
        curl_close ( $ch );
        return $content;
    }

    $summoner = getSummonerFromAPI();
?>
<h1>Hello World</h1>