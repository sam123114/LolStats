<div id="page-content">
    <form id="formModify" method='POST' action='LOGIC/updateProfile.logic.php'>
        <h3>Modifier mon profil</h3>
        <div class="form-group">
            <label>Nom</label>
            <input type="text" class="form-control" name="name" value='<?php echo $_SESSION['userName'] ?>' placeholder="Mon nom"/>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" name="email" value='<?php echo $_SESSION['userEmail'] ?>'placeholder="Mon email">
        </div>
        <div class="form-group">
            <label>Nouveau mot de passe</label>
            <input type="password" class="form-control" name="npw" placeholder="Nouveau mot de passe">
        </div>
        <div class="form-group">
            <label>Ancien mot de passe</label>
            <input type="password" class="form-control" name="pw" placeholder="Ancien mot de passe">
        </div>
        <button type="submit" class="btn btn-primary" id="submitCon">Mettre à jour mes informations</button>
    </form>
</div>

