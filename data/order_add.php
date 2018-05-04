<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/3
 * Time: 下午12:53
 */

header("Content-Type:application/json");

@$onum = $_REQUEST['onum'];
@$ocount = $_REQUEST['ocount'];
@$ototal = $_REQUEST['ototal'];
@$cart_id = $_REQUEST['cart_id'];
@$uphone = $_REQUEST['userinfo'];
@$order_time = time()*1000;

require('initconn.php');
$output = [];
$arr=[];

//if(empty($cart_class) || empty($cart_name) || empty($cart_price)  || empty($cart_color) || empty($uphone)){
//    echo '数据为空或者输入数据失败';
//    return;
//}

if(empty($onum) || empty($ocount) || empty($ototal) || empty($cart_id) || empty($uphone)){
    echo '数据为空或者输入数据失败';
//    echo {msg:'数据为空或者输入数据失败'}
    return;
}
$sql = "INSERT INTO coco_order VALUES(NULL,'$onum','$ocount','$ototal','$cart_id','$uphone','$order_time')";
//$sql = "INSERT INTO kf_order VALUES (NULL,'','','1','','','$did')";
$result = mysqli_query($conn,$sql);

if($result){
    $arr['msg'] = 'success';
    $arr['oid'] = mysqli_insert_id($conn);
}else{
    $arr['msg'] = 'error';
}

$output[] = $arr;
echo json_encode($output);

