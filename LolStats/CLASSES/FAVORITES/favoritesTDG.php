<?php

include_once __DIR__ . "/../../UTILS/connector.php";

class FavoritesTDG extends DBAO{

    private static $_instance = null;

    public function __construct(){
        parent::__construct();
    }
    public static function getInstance()
    {
        if(is_null(self::$_instance))
        {
            self::$_instance = new FavoritesTDG();  
        }
        return self::$_instance;
    }

    public function get_favorites($userId){
        try{
            $conn = $this->connect();
            $query = 'call 	GetFavorites(?)';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(1, $userId, PDO::PARAM_INT, 11);
            $stmt->execute();
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $result = $stmt->fetch();
        }
        catch(PDOException $e)
        {
            echo "Error: " . $e->getMessage();
        }
        $conn = null;
        return $result;
    }

    public function add_favorite($userId, $playerId){
        try{
            $conn = $this->connect();
            $query = 'call AddFavorite(?,?)';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(1, $userId, PDO::PARAM_INT, 11);
            $stmt->bindParam(2, $playerId, PDO::PARAM_INT, 11);
            $stmt->execute();
            $resp = true;
        }
        catch(PDOException $e)
        {
           $resp = false;
        }
        $conn = null;
        return $resp;
    }

    public function remove_favorite($userId, $playerId){
        try{
            $conn = $this->connect();
            $query = 'call RemoveFavorite(?,?)';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(1, $userId, PDO::PARAM_INT, 11);
            $stmt->bindParam(2, $playerId, PDO::PARAM_INT, 11);
            $stmt->execute();
            $resp = true;
        }
        catch(PDOException $e)
        {
           $resp = false;
        }
        $conn = null;
        return $resp;
    }

    public function toggle_favorite($userId, $playerId){
        try{
            $conn = $this->connect();
            $query = 'call ToggleFavorite(?,?)';
            $stmt = $conn->prepare($query);
            $stmt->bindParam(1, $userId, PDO::PARAM_INT, 11);
            $stmt->bindParam(2, $playerId, PDO::PARAM_INT, 11);
            $stmt->execute();
            $resp = true;
        }
        catch(PDOException $e)
        {
           $resp = false;
        }
        $conn = null;
        return $resp;
    }

}