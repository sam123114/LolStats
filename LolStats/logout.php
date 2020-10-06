<?php
    session_start();

    $module = "../LOGIC/logout.logic.php";
    $content = array();
    array_push($content, $module);

    $title = "Déconnexion";
    require_once __DIR__ . "/HTML/masterpage.php";
?>