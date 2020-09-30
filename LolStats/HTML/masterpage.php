<?php
    include_once __DIR__ . "/../UTILS/loader.php";
?>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php
            load_styles($styles);
        ?>        
         <link rel="stylesheet" href="../STYLES/">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <?php echo (isset($script)?"<script src='JS/$script'></script>": "") ?>
        <script src="JS/nav.js"></script>
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