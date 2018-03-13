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

	$MENU_URL="https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$ACC_TOKEN;
	$data = $_POST["data"];
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_URL, $MENU_URL);
	curl_setopt($ch, CURLOPT_REFERER, $MENU_URL);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($data)));
	$info = curl_exec($ch);
	$menu = json_decode($info);
	if($menu->errcode == "0"){
		echo "菜单创建成功";
		echo $info;
	}else{
		echo "菜单创建失败";
		echo $info;
	}
?>