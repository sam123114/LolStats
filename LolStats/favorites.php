<?php
    session_start();

    $module = "favoritesView.php";
    $content = array();
    array_push($content, $module);

    $title = "Favorites - LolStats";
    $styles = array();

    array_push($styles,'favorites.css');

    require_once __DIR__ . "/HTML/masterpage.php";
?>