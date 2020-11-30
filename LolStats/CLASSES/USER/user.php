<?php

include_once __DIR__ . "/userTDG.php";

class User
{
    private $id;
    private $email;
    private $userName;
    private $pw;
    private $isConfirmed;

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
        $this->isConfirmed = $res['isConfirmed'];

        $TDG = null;
        return true;
    }
    public function login($email, $pw)
    {
        if (!$this->load_user($email)) {
            return false;
        }
        if(!$this->isConfirmed){
            $_SESSION['msg'] = "Votre compte doit être vérifié pour pouvoir vous connnecter. Il se peut que l'email de confirmation soit dans vos courriers indésirables";
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
        $this->send_mail($email);
        $_SESSION['msg'] = "Votre compte a été créé avec succès, nous vous avons envoyer un email de confirmation afin de vous connnecter";
        return true;
    }
    public function send_mail($email){
        $subject = 'Email de confirmation';
        $message = "
        <h1>Email de confirmation</h1>
        <p>
        Merci de votre inscription sur LolStats<br>
        Veuillez confirmer votre inscription en cliquant sur le bouton ci-desssous
        </p>
        <div style=' background-color: #00BFFF; width: auto; padding: 20px; text-align: center'>
            <a style='color: #FFF; text-decoration: none;'  href='http://167.114.152.54/~LolStats01/LOGIC/confirmAccount.logic.php?email=$email' target='_blank'>V&#233rifier mon compte</a>
        </div>
        ";
        $headers = 'From: LolStats' . "\r\n" .
        'Content-type: text/html; charset=utf8mb4' . 
        'X-Mailer: PHP/' . phpversion();
    
        mail($email, $subject, $message, $headers);
    }
    public function confirm_account($email){
        $TDG = UserTDG::getInstance();
        $TDG->confirm_account($email);
        $TDG = null;
        return;
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
        $this->login($email,$npw);
        return;
    }
}