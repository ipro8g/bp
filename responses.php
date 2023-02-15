<?php

header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
    
    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));


    $data = array(

        "method"=>"update",
        "users_list"=>$logs[1],
        "chat_logs"=>$logs[0],
        "games"=>$logs[3]
    );

    $data = stripslashes(json_encode($data));

    echo "retry: 1000\n\n";     
    echo "data: {$data}\n\n";
    flush();
     
?> 
