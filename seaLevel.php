<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

<?php
  $seaLevel = 25;
?>

<div class="slidecontainer">
  <p>Default range slider:</p>
  <input type="range" min="1" max="100" value="50">
<iframe style="width:600px;height:600px"
   src="http://flood.firetree.net/?ll=46.9533,5.3696&m=<?php $seaLevel ?>"
   scrolling="no" frameborder="no" marginheight="0"></iframe>
</body>
</html>