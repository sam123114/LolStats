<?php
    session_start();

    $module = "favoritesView.php";
    $content = array();
    array_push($content, $module);

    $title = "Favoris - LolStats";
    $styles = array('favorites.css');
    $scripts = array('favorites.js');

    require_once __DIR__ . "/HTML/masterpage.php";
?>