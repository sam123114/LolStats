<ul>
    <a href="#">Accueil</a>
    <a href="#">Champions</a>
    <a href="#">Meilleurs joueurs</a>
    <a href="#" id="ins">S'inscrire</a>
    <a href="#" id="con" class="bg-primary">Se connecter</a>
</ul>
<div class="dropdown dropleft show">
  <button class="btn"data-toggle="dropdown" >
    <img src="IMG/hamburger.jpg" height="100"/>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Accueil</a>
    <a class="dropdown-item" href="#">Champions</a>
    <a class="dropdown-item" href="#">Meilleurs joueurs</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" id="ins" href="#">S'inscrire</a>
    <a class="dropdown-item" id="con" href="#">Se connnecter</a>
  </div>
</div>
<div class="modal-ins">
  <div class="modal-content">
    <span class="close-ins">&times;</span>
    <form action="#" method="post" class="modalForm">
        <h1>Créer un compte</h1>
        <div class="form-group">
            <label>Nom</label>
            <input type="text" class="form-control" id="nom" placeholder="Entrez votre nom">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" id="email" placeholder="Entrez votre email">
        </div>
        <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" class="form-control" id="pw" placeholder="Entrez votre mot de passe">
        </div><div class="form-group">
            <label>Confirmation</label>
            <input type="password" class="form-control" id="pwc" placeholder="Entrez votre mot de passe">
        </div>
        <button type="submit" class="btn btn-primary center">S'inscrire</button>
    </form>
  </div>
</div>
<div class="modal-con">
  <div class="modal-content">
    <span class="close-con">&times;</span>
    <form action="#" method="post" class="modalForm">
        <h1>Connexion</h1>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" id="email" placeholder="Entrez votre email">
        </div>
        <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" class="form-control" id="pw" placeholder="Entrez votre mot de passe">
        </div>
        <button type="submit" class="btn btn-primary center">Se connecter</button>
    </form>
  </div>
</div>