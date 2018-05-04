<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/3
 * Time: 上午11:25
 */

header("Content-Type:application/json");
@$start = $_REQUEST['start'];
$count = 3;
$output = [];

if(empty($start)){
    $start=0;
}

require('initconn.php');

$sql = "SELECT cid,cname,cprice,cimg_lg1,cimg_lg2 FROM coco_commodity LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
while (true){
    $row  = mysqli_fetch_assoc($result);
    if(!$row){
        break;
    }
    $output[] = $row;
}

echo json_encode($output);