<?php
   include_once "../CLASSES/FAVORITES/favorites.php";

    session_start();

   $userId = $_SESSION['userId'];
   $playerName = str_replace(' ', '',$_POST['playerName']);
   $action = $_POST['action'];
   $favorites = new Favorites();
   
   if($action == 'add'){
      $favorites->addFavorite($userId, $playerName);
      echo "Retirer de mes favoris";
   }
   else{
      $favorites->removeFavorite($userId, $playerName);
      echo "Ajouter à mes favoris";
   }




 