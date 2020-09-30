<?php
    session_start();

    $module = "../LOGIC/logout.logic.php";
    $content = array();
    array_push($content, $module);

    $title = "Déconnexion";
    $styles = array();
    require_once __DIR__ . "/HTML/masterpage.php";
?>