<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/1
 * Time: 下午9:59
 */
header("Content-Type:application/json");


@$uname = $_REQUEST['uname'];
@$uaddress= $_REQUEST['uaddress'];
@$uphone = $_REQUEST['uphone'];
@$upassword = $_REQUEST['upassword'];
require('initconn.php');

$output = [];
$arr=[];

if(empty($uname) || empty($uaddress) || empty($uphone) || empty($upassword)){
    echo '当前数据为空或数据输入有误';
    return;
}
$sql = "INSERT INTO coco_user  VALUES(NULL,'$uname','$uaddress','$uphone','$upassword')";
$result = mysqli_query($conn,$sql);

if($result){
    $arr['msg'] = 'success';
    $arr['id'] = mysqli_insert_id($conn);
}else{
    $arr['msg'] = 'error';
}

$output[] = $arr;
echo json_encode($output);
