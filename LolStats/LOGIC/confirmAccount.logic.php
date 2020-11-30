<?php
    include_once "../CLASSES/USER/user.php";

    session_start();
    $email = $_GET['email'];
    
    $user = new User();
    $user->confirm_account($email);

    $_SESSION['msg'] = "Votre à été confirmé avec succès, vous pouvez maintenant vous connecter";
    header('Location: ../');
    die();
?>