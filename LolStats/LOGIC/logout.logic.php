  
<?php
    session_start();
    $_SESSION = array();
    unset($_COOKIE["PHPSESSID"]);
    session_destroy();
    header("Location: ../index.php");
    die();
?>