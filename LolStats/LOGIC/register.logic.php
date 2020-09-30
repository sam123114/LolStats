<?php
    include_once "../CLASSES/USER/user.php";

    session_start();

    if(isset($_SESSION["userID"]))
    {
       header("Location: ../index.php");
       die();
    }
    $username = $_POST['nom'];
    $email = $_POST['emailIns'];
    $password = $_POST["pw"];

    $user = new User();

    if($user->register($username, $email, $password)){
        header("Location: ../index.php");
    }
    else
        header("Location: ../index.php");
    die();