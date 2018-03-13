<?php
	require_once '../config/info.php';
	$url = $baseUrl.'/manage/server/get_wx_token.php';
	$curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $tokenData = curl_exec($curl);
    $tokenJson = json_decode($tokenData);
    curl_close($curl);
    $ACC_TOKEN = $tokenJson->access_token;

	$DATA_URL = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=".$ACC_TOKEN;
	$json1=stripslashes(getSslPage($DATA_URL));
	echo $json1;

    function getSslPage($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_REFERER, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }
?>
