<?php
/**
 * Created by PhpStorm.
 * User: liuxiaoyu
 * Date: 2018/5/3
 * Time: 下午4:00
 */


header('Content-Type:application/json');
@$cart_id = $_REQUEST['cart_id'];

$output = [];

if(empty($cart_id)){
    echo '输入数据为空或者有误';
    return;
}

require('initconn.php');
$sql = "SELECT coco_cart.cart_color,coco_cart.cart_id,coco_cart.uphone,coco_commodity.cimg_cart,
coco_commodity.cname,coco_commodity.cprice,coco_commodity.cid FROM coco_cart,coco_commodity  
WHERE coco_cart.cart_id=$cart_id AND coco_commodity.cid=coco_cart.cid";
$result  = mysqli_query($conn,$sql);
$row  = mysqli_fetch_assoc($result);

if(empty($row)){
    echo '[]';
}else{
    $output[] = $row;
    echo json_encode($output);
}
