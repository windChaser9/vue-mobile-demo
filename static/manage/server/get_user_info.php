<?php
  if(isset($_GET['url'])) {
    $code = $_GET['code'];
    require_once "jssdk.php";
    require_once "../config/info.php";
    $jssdk = new JSSDK($appid, $secret);
    $userInfo= getUserInfoBase($appid,$secret,$code,$jssdk);
    $userInfo->ret = 0;
    $userInfo->ret_msg = 'success';
  } else {
    $userInfo = array('ret'=>'1', 'ret_msg'=>'lack of url');
  }
  // 获取用户信息,snsapi_userinfo方式
  function getUserInfo($appid,$secret,$code,$jssdk){
    // 通过code置换openid，同时获取授权token
    $access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$secret&code=$code&grant_type=authorization_code";
    $res_token = json_decode($jssdk->httpGet($access_token_url));
    $access_token =$res_token->access_token;
    $openid = $res_token->openid;
    // 授权access token获得用户基本信息
    $user_info_url = "https://api.weixin.qq.com/sns/userinfo?access_token=$access_token&openid=$openid&lang=zh_CN";
    $res_user_info = json_decode($jssdk->httpGet($user_info_url));
    return $res_user_info;
  }

  // 获取用户信息,snsapi_base方式
  function getUserInfoBase($appid,$secret,$code,$jssdk){
    // 通过code置换openid，同时获取授权token
    $access_token_url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$secret&code=$code&grant_type=authorization_code";
    $res_token = json_decode($jssdk->httpGet($access_token_url));
    $access_token =$jssdk->getAccessToken();
    $openid = $res_token->openid;
    // 全局access token获得用户基本信息
    $user_info_url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=$access_token&openid=$openid&lang=zh_CN";
    $res_user_info = json_decode($jssdk->httpGet($user_info_url));
    return $res_user_info;
  }
  echo json_encode($userInfo);
?>