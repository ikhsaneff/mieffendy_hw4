<?php
$current_dir = __DIR__;
$product_json = json_decode(file_get_contents('php://input'), true);

$csv_row = implode(",",$product_json['value']) . "\n";;
echo $csv_row;
$file = fopen($current_dir.'\..\..\data\product.csv', 'a');

fwrite($file, $csv_row);

fclose($file);