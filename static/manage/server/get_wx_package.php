<?php
  if(isset($_GET['url'])) {
    $currentURL = $_GET['url'];
    require_once "jssdk.php";
    require_once "../config/info.php";
    $jssdk = new JSSDK($appid, $secret, $currentURL);
    $package = $jssdk->getSignPackage();
    $package['ret'] = 0;
    $package['ret_msg'] = 'success';
  } else {
    $package = array('ret'=>'1', 'ret_msg'=>'lack of url');
  }
  echo json_encode($package);
?>