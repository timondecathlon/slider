<a href="page2.php">на другую </a>

<?

//$_COOKIE['name'] = 3344  ;
$a = 1000;
setcookie('name',$a, time() + 10);


session_start();
$_SESSION['title'] = 'привет я новый сайт';