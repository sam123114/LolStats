<?php
    include_once __DIR__ . "/../UTILS/loader.php";
?>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
        <?php
            load_styles($styles);      
        ?>       
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.min.js"></script>
        <script>const urlFetcher = 'http://167.114.152.54/~LolStats01/LOGIC/fetchFromAPI.logic.php';</script>
        <?php load_scripts($scripts) ?>
        <title><?php echo $title ?></title>
    </head>
    <body>
        <div id="cont">
            <?php 
                include_once "nav.php";      
                load_modules($content); 
            ?>       
        </div>
    </body>
</html>