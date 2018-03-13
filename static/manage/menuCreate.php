<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <?php
    require_once './config/info.php';
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
    echo 'token:'.$ACC_TOKEN.' ';
    $data='{
     "button":[
      {
        "name": "智·电视",
        "sub_button": [
          {
            "type": "view",
            "name": "微信电视",
            "url": "http://apps.homed.me/weixinnew"
          },
          {
            "type": "view",
            "name": "热播推荐",
            "url": "http://apps.homed.me/weixinnew/channel/hotList.html"
          },
          {
            "type": "view",
            "name": "电视相册",
            "url": "http://apps.homed.me/weixinnew/manage/menuCreate/checkToken.html?to=http://apps.homed.me/weixinnew/familyPhotowx/photos.html"
          },
          {
            "type": "view",
            "name": "遥控器",
            "url": "http://apps.homed.me/weixinnew/manage/menuCreate/checkToken.html?to=http://apps.homed.me/weixinnew/remote"
          },
          {
            "type": "view",
            "name": "视频会议",
            "url": "http://apps.homed.me/weixinnew/live"
          }
        ]
       },
       {
        "name": "峪·生活",
        "sub_button": [
          {
            "type": "click",
            "name": "生活缴费",
            "key": "V1001_PAY"
          },
          {
            "type": "view",
            "name": "家峪商城",
            "url": "http://apps.homed.me/weixinnew/wisdomCircle/zhsh/mall"
          },
          {
            "type": "click",
            "name": "福利放送",
            "key": "V1001_GOOD"
          },
          {
            "type": "view",
            "name": "广电营业厅",
            "url": "http://apps.homed.me/weixinnew/wisdomCircle/subWisdomCircle.html?loc=5&title=%E5%B9%BF%E7%94%B5%E8%90%A5%E4%B8%9A%E5%8E%85&fileName=zhsh/shenzhen.xml"
          },
          {
            "type": "view",
            "name": "智慧圈",
            "url": "http://apps.homed.me/weixinnew/manage/menuCreate/checkToken.html?to=http://apps.homed.me/weixinnew/wisdomCircle/wisdomCircle.html"
          }
        ]
       },
       {
        "name": "家·中心",
        "sub_button": [
          {
            "type": "view",
            "name": "个人中心",
            "url": "http://apps.homed.me/weixinnew/user/userIndex.html"
          },
          {
            "type": "view",
            "name": "APP下载",
            "url": "http://apps.homed.me/weixinnew/AppDownload"
          },
          {
            "type": "view",
            "name": "联系客服",
            "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd7342e5e1b7e78d4&redirect_uri=http%3A%2F%2Fapps.homed.me%2Fweixinnew%2Fcustomer%2Findex.html&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
          }
        ]
       }]
    }';

    $MENU_URL="https://api.weixin.qq.com/cgi-bin/menu/create?access_token=".$ACC_TOKEN;

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
    print_r($info);     //创建成功返回：{"errcode":0,"errmsg":"ok"}

    if($menu->errcode == "0"){
      echo "菜单创建成功";
      echo $data;
    }else{
      echo "菜单创建失败";
      echo $data;
      // echo $data1;
    }
  ?>
</body>
</html>