<?php
    include_once "../CLASSES/USER/user.php";

    session_start();

    $name = $_POST['name'];
    $email = $_POST['email'];
    $npw = $_POST['npw'];
    $pw = $_POST['pw'];

    $user = new User();
    $user->update($name,$email,$npw,$pw);
    header("Location: ../modify-profile.php");
    die();
    ?>
    
    
?>