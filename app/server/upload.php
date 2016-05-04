<?php
    header('Access-Control-Allow-Origin: *');
    $dirname = "../".trim($_POST['value1']);
    $ran = $_POST['value2']."_".rand();
    // If uploading file
    if ($_FILES) {
        echo('here at php');
        //print_r($_FILES);

    	list($w, $h) = getimagesize($_FILES["file"]["tmp_name"]);
      /* calculate new image size with ratio */
      $width = 900;
      $height = 900;
      $ratio = max($width/$w, $height/$h);
      $h = ceil($height / $ratio);
      $x = ($w - $width / $ratio) / 2;
      $w = ceil($width / $ratio);
      /* new file name */
      $path = trim($dirname)."/".$ran.".jpg";
      /* read binary data from image file */
      $imgString = file_get_contents($_FILES['file']['tmp_name']);
      /* create image from string */
      $image = imagecreatefromstring($imgString);
      $tmp = imagecreatetruecolor($width, $height);
      imagecopyresampled($tmp, $image,
        0, 0,
        $x, 0,
        $width, $height,
        $w, $h);
      /* Save image */
      switch ($_FILES['file']['type']) {
        case 'image/jpeg':
          imagejpeg($tmp, $path, 60);
          break;
        case 'image/png':
          imagepng($tmp, $path, 0);
          break;
        case 'image/gif':
          imagegif($tmp, $path);
          break;
        default:
          exit;
          break;
      }
      return $path;
      echo $path;
      /* cleanup memory */
      imagedestroy($image);
      imagedestroy($tmp);
    }
    else {
        echo('cant find files ');
}
?>
