<html>
<body>

<?php
if (isset($_COOKIE["user"]))
  echo "" . $_COOKIE["user"] . "!<br />";
else
  echo "Welcome guest!<br />";
?>

</body>
</html>