Типо вторая страница


<?
echo $_COOKIE['name'];
echo $a;

session_start();
echo $_SESSION['title'];


$pass = 'qwe123';


//$hash_pass = crypt($_GET['password']);
//регистрация
$hash_pass = crypt($pass);
//$hash_pass_2 = crypt('qwe1234');
echo '<br>';
//$hash_pass_5 = md5('qwe1234');
echo $pass;
echo '<br>';
echo $hash_pass;
//авторизация
var_dump(hash_equals($hash_pass,crypt($pass,$hash_pass)));