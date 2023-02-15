<?php

header("Content-Type: application/json");

$req_ob = json_decode(stripslashes(file_get_contents("php://input")));

if($req_ob->method == "connect"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    if(json_encode($logs) == '{"1":null}'){

        $logs = [];
    }


    if(empty($logs)){

        $logs[0] = [];
        $logs[1] = [];
        $logs[2] = 0;
        $logs[3] = [];
    }

    $flag = 0;

    foreach($logs[1] as $user){

        

            if($user->ip == $_SERVER["REMOTE_ADDR"]){

                $flag++;
            }
            
    }

    $user_info = array(
                                "method"=>false,
                                "user_id"=>false,
                                "user_name"=>false,
                                "ip"=>false,
                                "result"=>false,
                                "busy"=>false,
                                "reject"=>false
                                 );

    if($flag < 2 && count($logs[1]) < 10){

        $user_info["method"] = "active";
        $user_info["user_id"] = $req_ob->user_id;
        $user_info["user_name"] = $req_ob->user_name;
        $user_info["ip"] = $_SERVER["REMOTE_ADDR"];

        $logs[1] = [];

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

        $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

        if(!empty($logs[1])){

            $user_info["result"] = true;
            
        }
    }else{

        $user_info["reject"] = true;

        $logs[1] = [];

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);
    }

    echo json_encode($user_info);
}else if($req_ob->method == "active"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $flag = 0;

    foreach($logs[1] as $active){

        if($req_ob->ip == $active->ip && $req_ob->user_id == $active->user_id){

            $flag = 1;
        }
    }
    
    if($flag == 0){
     
        array_push($logs[1], $req_ob);

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);  
    }
    
    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $res_ob = array(
                    "user_id"=>$req_ob->user_id,
                    "result"=>false
                    );

        foreach($logs[1] as $user){

            if($user->user_id == $req_ob->user_id){

                $res_ob["result"] = true;    
            }
        }

    echo json_encode($res_ob);
}else if($req_ob->method == "change_name"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

       

    $flag = 0;
    $count = 0;
    $index = 0;

    foreach($logs[1] as $active){

        if($active->user_id == $req_ob->user_id){

            $flag = 1;
            $index = $count;  
        }

        $count++;    
    }    

    if($flag){

        $indx = 0;

        $str = $logs[1][$index]->user_name." has changed to ".$req_ob->new_name;

        if(count($logs[0]) > 20){

            $new_chats = [];

            for($p = count($logs[0]) - 10; $p < count($logs[0]); $p++){

                    array_push($new_chats, $logs[0][$p]);
            }

            $logs[0] = $new_chats;

        }

        $msg = array(
                "user_name"=>"notice",
                "msg"=>$str,
                "all"=>true,
                "index"=>$logs[2]
                ); 

        array_push($logs[0], $msg);    

        $logs[1][$index]->user_name = $req_ob->new_name;

        $logs[2]++;

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

        $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

        $res_ob = array(
                    "user_name"=>$req_ob->new_name,
                    "result"=>false
                    );

        foreach($logs[1] as $user){

            if($user->user_name == $req_ob->new_name){

                $res_ob["result"] = true;    
            }
        }

        echo json_encode($res_ob);
    }
}else if($req_ob->method == "chat"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));
    

    

        if(count($logs[0]) > 20){

            $new_chats = [];

            for($p = count($logs[0]) - 10; $p < count($logs[0]); $p++){

                    array_push($new_chats, $logs[0][$p]);
            }

            $logs[0] = $new_chats;

        }

        $msg = array(
                "user_name"=>$req_ob->user_name,
                "msg"=>$req_ob->msg,
                "all"=>$req_ob->all,
                "user_one"=>$req_ob->user_one,
                "user_two"=>$req_ob->user_two,
                "index"=>$logs[2]
                );

        array_push($logs[0], $msg);
       
        $logs[2]++;

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

        $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

        $res_ob = array(
                    "chat_id"=>$req_ob->chat_id,
                    "result"=>false
                    );

        foreach($logs[0] as $chat){

            if($chat->chat_id == $req_ob->chat_id){

                $res_ob["result"] = true;    
            }
        }

        echo json_encode($res_ob);
    
}else if($req_ob->method == "req_duel"){

        $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

        array_push($logs[3], $req_ob);

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

        $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

        $flag = false;

        foreach($logs[3] as $req){

            if($req->game_id == $req_ob->game_id){

                $flag = true;
            }
        }

        $res_ob = array(
                    "game_id"=>$req_ob->game_id,
                    "result"=>$flag
                    );

        echo json_encode($res_ob);
}else if($req_ob->method == "refuse_duel"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $count = 0;

    $index = -1;

    foreach($logs[3] as $game){

        if($req_ob->game_id == $game->game_id){

            $index = $count;
        }

        $count++;
    }

    if($index != -1){

        $logs[3][$index]->method = "refuse_duel";

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

        $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

        $flag = false;

        foreach($logs[3] as $req){

            if($req->game_id == $req_ob->game_id && $req->method == "refuse_duel"){

                $flag = true;
            }
        }

        $res_ob = array(
                    "game_id"=>$req_ob->game_id,
                    "result"=>$flag
                    );

        echo json_encode($res_ob);
    }
}else if($req_ob->method == "delete_duel"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $count = 0;

    $index = -1;

    foreach($logs[3] as $game){

        if($req_ob->game_id == $game->game_id){

            $index = $count;
        }

        $count++;
    }

    if($index != -1){

        $logs[3][$index] = false;

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);
    }
}else if($req_ob->method == "start_duel"){

     $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

     $user_indx = -1;

     $count1 = 0;

     $rival_indx = -1;

     $count2 = 0;

        foreach($logs[1] as $user){

                if($user->user_id == $req_ob->user_id){

                    $user_indx = $count1;
                }

                if($user->user_id == $req_ob->rival_user_id){ 

                    $rival_indx = $count2;
                }  

                $count2++;

                $count1++;
        }

        $logs[1][$user_indx]->busy = true;

        $logs[1][$rival_indx]->busy = true;




        $str = "duel between ".$logs[1][$user_indx]->user_name." and ".$logs[1][$rival_indx]->user_name." has begun";

        if(count($logs[0]) > 20){

            $new_chats = [];

            for($p = count($logs[0]) - 10; $p < count($logs[0]); $p++){

                    array_push($new_chats, $logs[0][$p]);
            }

            $logs[0] = $new_chats;
        }

        $msg = array(
                "user_name"=>"notice",
                "msg"=>$str,
                "all"=>true,
                "index"=>$logs[2]
                ); 

        array_push($logs[0], $msg);

        $logs[2]++;

        $req_ob->method = "set_matrix";


        $count3 = 0;

        $game_indx = -1;

        foreach($logs[3] as $game){

            if($game->game_id == $req_ob->game_id){

                $game_indx = $count3;
            }

            $count3++;
        }

        $logs[3][$game_indx] = $req_ob;

        file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

        $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

        $res_ob = array(
                            "game_id"=>$req_ob->game_id,
                            "result"=>false
                            );

        

        $flag = false;

        foreach($logs[3] as $game){

            if(($game->method == "set_matrix") && ($game->game_id == $req_ob->game_id)){

                $flag = true;
            }
        }

        $res_ob["result"] = $flag;

        echo json_encode($res_ob); 
}else if($req_ob->method == "matrix_ready"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $user_indx = -1;

    $count1 = 0;

    foreach($logs[3] as $game){

        if($game->game_id == $req_ob->game_id){

            $user_indx = $count1;
        }        

        $count1++;
    }

    if($user_indx != -1){

        $logs[3][$user_indx] = $req_ob;

    }

    file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $res_ob = array("game_id"=>$req_ob->game_id, "result"=>false);

    foreach($logs[3] as $game){

        if(($game->game_id == $req_ob->game_id) && ($game->method == "matrix_ready")){

            $res_ob["result"] = true;
        }        
    }

    echo json_encode($res_ob);        
}else if($req_ob->method == "matrix_defined"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $user_indx = -1;

    $count1 = 0;

    foreach($logs[3] as $game){

        if($game->game_id == $req_ob->game_id){

            $user_indx = $count1;
        }        

        $count1++;
    }

    $req_ob->method = "first_fire";

    $logs[3][$user_indx] = $req_ob;

    file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $res_ob = array("game_id"=>$req_ob->game_id, "result"=>false);

    foreach($logs[3] as $game){

        if(($game->game_id == $req_ob->game_id) && ($game->method == "first_fire")){

            $res_ob["result"] = true;
        }        
    }

    echo json_encode($res_ob);    
}else if($req_ob->method == "fire"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $indx = -1;
    $count1 = 0;

        foreach($logs[3] as $game){

            if($game->game_id == $req_ob->game_id){

                $indx = $count1;
            }

            $count1++;    
        }  

        if($indx != -1){
    
            $logs[3][$indx] = $req_ob;
        }

    file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX); 

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $res_ob = array("method"=>"result_fire","fire_id"=>$logs[3][$indx]->fire_id); 

    echo json_encode($res_ob);
}else if($req_ob->method == "end_duel"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $indx = -1;

    $count1 = 0;


    foreach($logs[3] as $game){

            if($game->game_id == $req_ob->game_id){

                $indx = $count1;
            }

            $count1++;    
    } 

    if($indx != -1){

        $logs[3][$indx] = $req_ob;
    }   

    file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $result = false;

    if($logs[3][$indx]->method == "end_duel"){

        $result = true;
    }

    $res_ob2 = array("method"=>"end_duel_result","result"=>$result);

    echo json_encode($res_ob2);
}else if($req_ob->method == "finish"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $indx = -1;

    $count1 = 0;

    foreach($logs[3] as $game){

        if($game->game_id == $req_ob->game_id){

            $indx = $count1;
        }

        $count1++;
    }

    
    
    $logs[3][$indx] = false;

    $indx2 = -1;
    $indx3 = -1;

    $count1 = 0;

    foreach($logs[1] as $user){

        if($user->user_id == $req_ob->user_id){

            $indx2 = $count1;
        }

        if($user->user_id == $req_ob->rival_user_id){

            $indx3 = $count1;
        }

        $count1++;
    }
    
    if($indx2 != -1){

        $logs[1][$indx2]->busy = false;
    }

    if($indx3 != -1){

        $logs[1][$indx3]->busy = false;
    }
    
    file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $result = false;

    if(!$logs[3][$indx]){

        $result = true;
    }

    $res_ob = array("result"=>$result);

    echo json_encode($res_ob);
}else if($req_ob->method == "clear_cache"){

    $logs = json_decode(file_get_contents("kq2qmrej7f2j8ox.txt"));

    $logs[3] = [];

    file_put_contents("kq2qmrej7f2j8ox.txt", json_encode($logs), LOCK_EX);
}


?>




