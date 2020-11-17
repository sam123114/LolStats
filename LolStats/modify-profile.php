<?php
    session_start();

    $module = "modifyProfileView.php";
    $content = array();
    array_push($content, $module);

    $title = "Modifier mon profil - LolStats";
    $styles = array('modifyProfile.css');
    $scripts = array();

    require_once __DIR__ . "/HTML/masterpage.php";
?>