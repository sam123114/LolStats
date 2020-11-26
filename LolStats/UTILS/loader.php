<?php
function load_modules($moduleList){
    foreach($moduleList as $module => $moduleViewRef)
    {
    $path = __DIR__ . "/../HTML/$moduleViewRef";
    include $path;
    }
}
function load_styles($styleList){
    foreach($styleList as $style){
        echo "<link rel='stylesheet' href='STYLES/$style'>";
    }
    echo "<link rel='stylesheet' href='STYLES/nav.css'>";
}
function load_scripts($scriptList){
    foreach($scriptList as $script){
        echo "<script src='JS/$script'></script>";
    }
    echo "<script src='JS/nav.js'></script>
        <script src='JS/form.js'></script>";
}
?>
