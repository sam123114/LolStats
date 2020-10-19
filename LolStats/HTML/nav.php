<?php
  if(isset($_SESSION['msg'])){
    echo '<script>alert("'.$_SESSION['msg'].'");</script>';
    unset($_SESSION['msg']);
  }
?>
<div id="navbar">
  <div id="logo">
    <p>Lol</p>
    <p>Stats</p>
  </div>
  <ul>
    <a class='link' href='./'>Accueil</a>
    <a class='link' href='#'>Champions</a>
    <a class='link' href='best-player.php'>Meilleurs joueurs</a>
    <?php
      if(isset($_SESSION['userId'])){
        echo "<div class='dropleft show'>
        <button id='dropdownToggle'data-toggle='dropdown'>".
          $_SESSION['userName']."
        </button>
        <div class='dropdown-menu'>
          <a class='dropdown-item' href='#'>Mes Favoris</a>
          <a class='dropdown-item' href='#'>Modifier mon profil</a>
          <a class='dropdown-item' href='LOGIC/logout.logic.php'>Se déconnecter</a>
        </div>
      </div>";
      }
      else{
        echo "<a class='ins'href='#'>S'inscrire</a>
              <a class='con bg-primary' href='#'>Se connnecter</a>";
      }
    ?>
  </ul>
  <div class="dropdown dropleft show droplinks">
    <button id="dropDown" class="btn"data-toggle="dropdown" >
      <img id="hamburgerImg" src="IMG/hamburger.jpg" height="100"/>
    </button>
    <div class="dropdown-menu">

      <a class="dropdown-item" href="#">Accueil</a>
      <a class="dropdown-item" href="#">Champions</a>
      <a class="dropdown-item" href="best-player.php">Meilleurs joueurs</a>
      <div class="dropdown-divider"></div>
      <?php
        if(isset($_SESSION['userId'])){
          echo "<a class='dropdown-item' href='#'>Mes Favoris</a>
          <a class='dropdown-item' href='#'>Modifier mon profil</a>
          <a class='dropdown-item' href='LOGIC/logout.logic.php'>Se déconnecter</a>";
        }
        else{ 
          echo "<a class='dropdown-item ins' href='#'>S'inscrire</a>
          <a class='dropdown-item con' href='#'>Se connnecter</a>";
        }
      ?>
      
    </div>
  </div>
  <div class="modal-ins">
    <div class="modal-content">
      <span id="close-ins" class="close">&times;</span>
      <form action="LOGIC/register.logic.php" method="post" class="modalForm" id="formIns">
          <h1>Créer un compte</h1>
          <div class="form-group">
              <label>Nom d'utilisateur</label>
              <input type="text" name="nom" class="form-control" placeholder="Entrez votre nom">
          </div>
          <div class="form-group">
              <label>Email</label>
              <input type="email" name="emailIns" class="form-control" placeholder="Entrez votre email">
          </div>
          <div class="form-group">
              <label>Mot de passe</label>
              <input type="password" id="pw" class="form-control" name="pwIns" placeholder="Entrez votre mot de passe">
          </div><div class="form-group">
              <label>Confirmation</label>
              <input type="password" class="form-control" name="pwc" placeholder="Entrez votre mot de passe">
          </div>
          <button id="subIns" type="submit" class="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  </div>
  <div class="modal-con">
    <div class="modal-content">
      <span id="close-con" class="close">&times;</span>
      <form action="LOGIC/login.logic.php" method="post" class="modalForm" id="formCon">
          <h1>Connexion</h1>
          <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" name="emailCon" placeholder="Entrez votre email">
          </div>
          <div class="form-group">
              <label>Mot de passe</label>
              <input type="password" class="form-control" name="pwCon" placeholder="Entrez votre mot de passe">
          </div>
          <button type="submit" class="btn btn-primary" id="submitCon">Se connecter</button>
      </form>
    </div>
  </div>
</div>
