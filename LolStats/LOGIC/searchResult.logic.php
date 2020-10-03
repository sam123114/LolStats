<?php
    $summonerName = $_GET['searchBar'];

    header("Location: ../summoner.php?summonerName=" . $summonerName);
    die();