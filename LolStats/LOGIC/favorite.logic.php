<?php
   include_once "../CLASSES/FAVORITES/favorites.php";

    session_start();

   $UserId = $_SESSION['userId'];
   $PlayerId = $_REQUEST['PlayerId'];

   $favorites = new Favorites();
   $favorites->toggleFavorite($UserId, $PlayerId);