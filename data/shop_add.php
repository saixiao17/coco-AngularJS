<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/3
 * Time: 下午12:53
 */

header("Content-Type:application/json");

@$user_name = $_REQUEST['user_name'];
@$phone = $_REQUEST['phone'];
@$addr = $_REQUEST['addr'];
@$did = $_REQUEST['did'];
@$sex = $_REQUEST['sex'];
@$order_time = time()*1000;

require('initconn.php');
$output = [];
$arr=[];

if(empty($user_name) || empty($phone) || empty($addr) || empty($did) || empty($sex)){
    echo '[]';
    return;
}
$sql = "INSERT INTO kf_order  VALUES(NULL,'$phone','$user_name','$sex','$order_time','$addr','$did')";
//$sql = "INSERT INTO kf_order VALUES (NULL,'','','1','','','$did')";
$result = mysqli_query($conn,$sql);

if($result){
    $arr['msg'] = 'succ';
    $arr['oid'] = mysqli_insert_id($conn);
}else{
    $arr['msg'] = 'error';
}

$output[] = $arr;
echo json_encode($output);

