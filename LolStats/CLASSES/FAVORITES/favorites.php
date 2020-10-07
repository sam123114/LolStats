<?php

include_once __DIR__ . "/favoritesTDG.php";

class Favorites
{
    private $id;
    private $userId;
    private $playerId;

    public function __construct(){}

    public function getFavorites($userId){
        $TDG = FavoritesTDG::getInstance();
        $favorites = $TDG->get_favorites($userId);
        $TDG = null;
        return $favorites;
    }

    public function addFavorite($userId, $playerId){
        $TDG = FavoritesTDG::getInstance();
        $res = $TDG->add_favorite($userId, $playerId);
        $TDG = null;
        return $res;
    }

    public function removeFavorite($userId, $playerId){
        $TDG = FavoritesTDG::getInstance();
        $res = $TDG->remove_favorite($userId, $playerId);
        $TDG = null;
        return $res;
    }

    public function toggleFavorite($userId, $playerId){
        $TDG = FavoritesTDG::getInstance();
        $res = $TDG->toggle_favorite($userId, $playerId);
        $TDG = null;
        return $res;
    }
}