<html>
<head>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/slider.css">
	<title>Homework</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    
</head>

<?php


$slides = [
    ['https://jogdog.ru/upload/iblock/fc2/BoykoS_467_1920_1080.jpg','кнопка 1','https://yandex.ru'],
    ['https://jogdog.ru/upload/iblock/942/BoykoS_402_1920_1080_2.jpg','кнопка 2','https://google.com'],
    ['http://www.zbrzyznyryszard.pl/includes/templates/36089-pl/images/banner.jpg','кнопка 145','https://auto.ru'],
    ['http://www.zbrzyznyryszard.pl/includes/templates/36089-pl/images/banner.jpg','кнопка 145','https://auto.ru'],
    ['https://jogdog.ru/upload/iblock/942/BoykoS_402_1920_1080_2.jpg','кнопка 2','https://google.com'],
];


?>

<body>

    <div class="slider flex-box horizontal-nav horizontal-arrows vertical-nav vertical-arrows">
        <ul class="slides">
            <?foreach($slides as $elem){?>
                <li>
                    <div  class="bg-fix" style="background-image: url('<?=$elem[0]?>');  height: 500px">
                        <div>
                            <a href="<?=$elem[2]?>"><?=$elem[1]?></a>
                        </div>
                    </div>
                </li>
            <?}?>
        </ul>
    </div>

    <div>
        <br>
        <br>
        <br>
        <br>
    </div>


    <div class="slider flex-box horizontal-nav horizontal-arrows">
        <ul class="slides">
            <?foreach($slides as $elem){?>
                <li>
                    <div  class="bg-fix" style="background-image: url('<?=$elem[0]?>');  height: 500px">
                        <div>
                            <a href="<?=$elem[2]?>"><?=$elem[1]?></a>
                        </div>
                    </div>
                </li>
            <?}?>
        </ul>
    </div>

    <div>
        <br>
        <br>
        <br>
        <br>
    </div>

    <div class="slider flex-box vertical-nav vertical-arrows">
        <ul class="slides">
            <?foreach($slides as $elem){?>
                <li>
                    <div  class="bg-fix" style="background-image: url('<?=$elem[0]?>');  height: 500px">
                        <!--
								<div>
									<a href="<?=$elem[2]?>"><?=$elem[1]?></a>
								</div>
								-->
                    </div>
                </li>
            <?}?>
        </ul>
    </div>



	
	<script src="js/slider.js"></script> 

</body>
</html>
