<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/3
 * Time: 下午5:13
 */

header("Content-Type:application/json");
@$start = $_REQUEST['start'];
@$uphone = $_REQUEST['userinfo'];
$count = 1;
$output = [];

if(empty($start)){
    $start=0;
}

require('initconn.php');

$sql = "SELECT coco_cart.cart_id,coco_commodity.cimg_cart,coco_commodity.cname,coco_commodity.cprice,coco_cart.cart_color,coco_cart.uphone,coco_cart.cart_time
  FROM coco_cart,coco_commodity WHERE coco_cart.uphone = '$uphone' AND coco_cart.cid=coco_commodity.cid LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
while (true){
    $row  = mysqli_fetch_assoc($result);
    if(!$row){
        break;
    }
    $output[] = $row;
}

echo json_encode($output);