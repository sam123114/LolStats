<?php
   include_once "../CLASSES/USER/user.php";

   session_start();

   if(isset($_SESSION["userID"]))
   {
      header("Location: ../". $_SESSION['currentPage']);
      die();
   }

   $email = $_POST["emailCon"];
   $pw = $_POST["pwCon"];

   $user = new User();
   $user->login($email, $pw);
   header("Location: ../". $_SESSION['currentPage']);
   die();
   ?>
