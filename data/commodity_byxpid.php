<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/3
 * Time: 下午12:15
 */

header('Content-Type:application/json');
@$cid = $_REQUEST['cid'];

$output = [];

if(empty($cid)){
    echo '输入数据为空或者有误';
    return;
}

require('initconn.php');
$sql = "SELECT cid,cclass,cname,cprice,ccolor1,ccolor2,ccolor3,ccolor4,ccolor5,ccolor6,cimg_lg1,cimg_lg2,cimg_lg3,cimg_lg4,cimg_sm1,cimg_sm2,cimg_sm3,cimg_sm4,cimg_sm5,cimg_sm6,cdetail FROM coco_commodity WHERE cid=$cid";
$result  = mysqli_query($conn,$sql);
$row  = mysqli_fetch_assoc($result);

if(empty($row)){
    echo '[]';
}else{
    $output[] = $row;
    echo json_encode($output);
}
