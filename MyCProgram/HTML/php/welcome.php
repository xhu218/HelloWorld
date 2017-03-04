<html>

<body>
    Welcome
    <?php echo $_POST["name"]; ?>
    <br> Your email address is:
    <?php echo $_POST["email"]; ?>
    <br>
     <?php 
     echo str_replace("\r\n"," <br>",$_POST["t1"]);
     ?>
     <br>
</body>
</html>
