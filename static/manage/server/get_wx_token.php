<?php
  require_once "jssdk.php";
  require_once "../config/info.php";
  $jssdk = new JSSDK($appid, $secret, "");
  $access_token = $jssdk->getAccessToken();
  $data = new stdClass();
  $data->expire_time = time().'000';
  $data->access_token = $access_token;

  if($access_token == '') {
    $data->ret = 1;
    $data->ret_msg = 'faild';
  } else {
    $data->ret = 0;
    $data->ret_msg = 'success';
  }

  $data = json_encode($data);
  echo $data;
?>