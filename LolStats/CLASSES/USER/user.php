<?php

include_once __DIR__ . "/userTDG.php";

class User
{
    private $id;
    private $email;
    private $userName;
    private $pw;

    public function __construct(){}

    public function load_user($email)
    {
        $TDG = UserTDG::getInstance();
        $res = $TDG->get_by_email($email);

        if (!$res) {
            $TDG = null;
            $_SESSION['msg'] = "Aucun compte trouvé selon le email donné!";
            return false;
        }

        $this->id = $res['id'];
        $this->email = $res['email'];
        $this->userName = $res['username'];
        $this->pw = $res['password'];

        $TDG = null;
        return true;
    }


    //Login Validation
    public function login($email, $pw)
    {
        if (!$this->load_user($email)) {
            return false;
        }

        if (!password_verify($pw, $this->pw)) {
            $_SESSION['msg'] = "Mot de passe incorrect!";
            return false;
        }
        $_SESSION["userId"] = $this->id;
        $_SESSION["userEmail"] = $this->email;
        $_SESSION["userName"] = $this->userName;

        return true;
    }
    public function existing_account($email)
    {
        $TDG = UserTDG::getInstance();
        $existing = $TDG->get_by_email($email);
        $TDG = null;
        return(!$existing)?false:true;
    }
    public function register($username, $email, $password)
    {
        if($this->existing_account($email)){
            $_SESSION['msg'] = "Ce email existe déjà!";
            return false;
        }
        $TDG = UserTDG::getInstance();
        $resp = $TDG->register($username, $email, password_hash($password, PASSWORD_DEFAULT));
        if(!$resp){
            $_SESSION['msg'] = "Une erreur s'est produite lors de la création du compte";
            return false;
        }
        $TDG = null;
        $_SESSION['msg'] = "Votre compte a été créé avec succès, vous pouvez maintenant vous connecter";
        return true;
    }
    public function update($name,$email,$npw,$pw){

        $TDG = UserTDG::getInstance();
        $oldPassword = $TDG->getPassWordByUserId($_SESSION['userId']);
        if (!password_verify($pw, $oldPassword)) {
            $_SESSION['msg'] = "Mauvais ancien mot de passe entré";
            return;
        }
        $resp = $TDG->update($name, $email, password_hash($npw, PASSWORD_DEFAULT));
        if(!$resp){
            $_SESSION['msg'] = "Une erreur s'est produite lors de la création du compte";
            return;
        }
        $TDG = null;
        $_SESSION['msg'] = "Votre profil à été modifié averc succès";
        return;
    }
}