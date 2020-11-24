<?php
    session_start();

    $module = "aboutView.php";
    $content = array();
    array_push($content, $module);

    $title = "À propos - LolStats";
    $styles = array('about.css');
    $scripts = array('about.js');

    require_once __DIR__ . "/HTML/masterpage.php";
?>