<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/3
 * Time: 下午12:53
 */

header("Content-Type:application/json");

@$cid = $_REQUEST['cid'];
@$uphone = $_REQUEST['userinfo'];
//@$cart_class = $_REQUEST['cart_class'];
//@$cart_name = $_REQUEST['cart_name'];
//@$cart_price = $_REQUEST['cart_price'];
//@$cart_img_sm = $_REQUEST['cart_img_sm'];
@$cart_color = $_REQUEST['cart_color'];
//@$uphone = $_REQUEST['phone'];
//@$uid = $_REQUEST['uid'];
@$cart_time = time()*1000;

require('initconn.php');
$output = [];
$arr=[];

//if(empty($cart_class) || empty($cart_name) || empty($cart_price)  || empty($cart_color) || empty($uphone)){
//    echo '数据为空或者输入数据失败';
//    return;
//}

if(empty($cart_color) || empty($cid)){
    echo '数据为空或者输入数据失败';
    return;
}
$sql = "INSERT INTO coco_cart  VALUES(NULL,'$cart_color','$cid','$uphone','$cart_time')";
//$sql = "INSERT INTO kf_order VALUES (NULL,'','','1','','','$did')";
$result = mysqli_query($conn,$sql);

if($result){
    $arr['msg'] = 'success';
    $arr['cart_id'] = mysqli_insert_id($conn);
}else{
    $arr['msg'] = 'error';
}

$output[] = $arr;
echo json_encode($output);

