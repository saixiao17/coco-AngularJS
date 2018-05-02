<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/2
 * Time: 下午3:13
 */

header('Content-Type:application/json');
@$uphone = $_REQUEST['phone'];
@$upassword = $_REQUEST['password'];

$output = [];
$arr=[];

if(empty($uphone) || empty($upassword)){
    echo 'data null';
    return;
}

require('initconn.php');
$sql = "SELECT * FROM coco_user WHERE uphone='$uphone' AND upassword='$upassword'";
$result  = mysqli_query($conn,$sql);
$row  = mysqli_fetch_assoc($result);

if($result){
    $output['msg'] = 'success';
}else{
    $output['msg'] = 'error';
}

if(empty($row)){
    echo 'select error';
}else{
    $output[] = $row;
//    $output[] = $arr;
    echo json_encode($output);
}
