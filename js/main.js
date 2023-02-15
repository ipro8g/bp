let letters;

let cont_cache;

let show_once;

let end_duel_flag;

let last_fire;

let visible_chats;

let ws;

let user_id;

let ip;

let user_name;

let h1;

let h2;

let btn_name;

let res_ob;

let users;

let dom_users_list;

let timeout1;

let timeout2;

let chat_text;

let chat_check;

let console_user;

let canvas;

let shape_section_first;

let shape_section_second;

let user1_name_modal;

let user2_name_modal;

let closeBtn;

let modal;

let ani_box;

let game_req_ob;

let img1;

let img2;

let btn_go;

let await_flag1;

let count1;

let navy_container1;

let navy_container2;

let duel_ob;

let user3_name_modal;

let accept_btn;

let imrivalflag;

let imbusyflag;

let imusflag;

let blockundo;

let ismyturnflag;

let traffic_light;
    
let tl_user;

let top_light;

let tl_clock;

let down_light;

let tl_rival;

let introflag;

let img3;

let score;

let rival_score;

let notifyType;

let count_chat;

let flood_flag;

let demo_el;

let demoflag;

let modal_body;

let xhr;

window.addEventListener("load", charge);

function charge(){

    letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    document.addEventListener("click", printMousePos);

    h1 = document.getElementById("h1");
    
    h2 = document.getElementById("h2");
    
    dom_users_list = document.getElementById("dom_users_list");
    
    chat_text = document.getElementById("chat_text");
    
    chat_check = document.getElementById("chat_check");
    
    console_user = document.getElementById("console_user");
    
    console_user.addEventListener('mouseenter', readConsole);
    
    canvas = document.getElementById("canvas");
    
    shape_section_first = document.getElementById("shape_section_first");
    
    shape_section_second = document.getElementById("shape_section_second");
    
    user2_name_modal = document.getElementById("user2_name_modal");
    
    user1_name_modal = document.getElementById("user1_name_modal");
    
    modal = document.getElementById('simpleModal');
    
    ani_box = document.getElementById("ani_box");

    closeBtn = document.getElementsByClassName('closeBtn')[0];

    closeBtn.addEventListener('click', closeModal);
    
    canvas.style.display = "none";
    
    shape_section_first.style.display = "none";
    
    img1 = document.getElementById("img1");
    
    img2 = document.getElementById("img2");
    
    btn_go = document.getElementById("btn_go");
    
    navy_container1 = document.getElementById("navy_container1");
    
    navy_container2 = document.getElementById("navy_container2");
    
    user3_name_modal = document.getElementById("user3_name_modal");
    
    accept_btn = document.getElementById("accept_btn");
    
    traffic_light = document.getElementById("traffic_light");
    
    tl_user = document.getElementById("tl_user");
    
    top_light = document.getElementById("top_light");
    
    tl_clock = document.getElementById("tl_clock");
    
    down_light = document.getElementById("down_light");
    
    tl_rival = document.getElementById("tl_rival");
    
    img3 = document.getElementById("img3");

    notifyType = document.getElementById("notifyType");

    modal_body;
    
    imrivalflag = false;
    
    game_req_ob = {};
    
    await_flag1 = false;
    
    await_flag2 = false;
    
    imbusyflag = false;

    introflag = true;

    flood_flag = false;

    demoflag = true;

    finish_game = true;

    show_once = true;

    cont_cache = 0;    

    visible_chats = [];

    intro(); 

    count_chat = 0;

    index_start(); 
}

function index_start(){

    const new_id = guid();

    user_id = new_id;

    user_name = "user_" + new_id;


    let p = document.createElement("p");

    const data24 = {

            "method":"connect",
            "user_id":new_id,
            "user_name":user_name
    } 

    let connect_result = false;

    while(!connect_result){

        connect_result = connect_data(data24).then(()=>{

            if(connect_result){

                p.setAttribute("style", "font-weight:bold;font-size:1.2rem;");
                
                p.innerText = "Welcome " + user_name;
                
                console_user.appendChild(p);
                              
                console_user.scrollTop = console_user.scrollHeight;
            }
        });
    }

    ws = new EventSource("responses.php");
    

    ws.onmessage = (event)=>{

        res_ob = JSON.parse(event.data);

        if(res_ob.method === "update"){



             tl_clock.innerText = cclock;

             if(cclock > 0){

                cclock--;
             }

             if(cclock <= 0 && ismyturnflag){

                turn_out();
             }

            let new_chats = [];

            if(res_ob.chat_logs){

                res_ob.chat_logs.forEach((chat)=>{

                    let insertflag = false;

                    visible_chats.forEach((chat2)=>{

                        if(chat.index == chat2.index){

                            insertflag = true;   
                        }    
                    })

                    if(!insertflag){

                        visible_chats.push(chat);
                        new_chats.push(chat);       
                    }    
                })

                append_chats(new_chats);

            }

            let users_listed = [];

            if(res_ob.users_list){

                let busy_flag = false;

                res_ob.users_list.forEach((user)=>{

                    if(user.busy){

                        busy_flag = true;    
                    }

                    let us = {

                        "busy":user.busy,
                        "method":user.method,
                        "user_id":user.user_id,
                        "user_name":user.user_name
                    }

                    users_listed.push(us);
                })

                if(!busy_flag){
           
                    cont_cache++;
                }

                if(cont_cache >= 60){

                    cont_cache = 0;

                    clear_cache();
                }
            }

            users = users_listed;
            
            render_users_list();

             if(res_ob.games){

                res_ob.games.forEach((game)=>{

                    if(game.rival_user_id === user_id && game.method === "req_duel" && !await_flag2){

                        challenge(game);
                    }else if(game.method === "refuse_duel" && game.user_id === user_id){
            
                        game_refused();
                    }else if(game.method === "set_matrix" && !imbusyflag && (game.user_id === user_id || game.rival_user_id === user_id)){
                                
                        duel_ob = game;

                        if(await_flag1 || await_flag2){

                            await_flag1 = false;
                            await_flag2 = false;
                                
                            closeModal();
                        }

                        if(game.rival_user_id === user_id){
            
                            imrivalflag = true;
                        }else if(game.user_id === user_id){
            
                            imrivalflag = false;
                        }
            
                        imbusyflag = true;

                        introflag = false;
            
                        if(game.navy === "us" && !imrivalflag){
            
                            imusflag = true;
                        }else if(game.rival_navy === "us" && imrivalflag){
            
                            imusflag = true;
                        }else{
            
                            imusflag = false;
                        }

                        duel_start();
                    }else if((game.method === "matrix_ready") && (game.game_id === duel_ob.game_id)){

                            if(cont1 !== 6 && show_once){

                                duel_ob = game;

                                if(imrivalflag){

                                    duel_ob.matrix = game.matrix;

                                    msgn = game.user_name + " is awaiting";
                                }else{

                                    duel_ob.rival_matrix = game.rival_matrix;

                                    msgn = game.rival_user_name + " is awaiting";
                                } 

                                notify_alert(msgn); 

                                show_once = false;    
                            }else if(cont1 === 6){

                                if(imrivalflag){

                                    duel_ob.matrix = game.matrix;
                                }else{

                                    duel_ob.rival_matrix = game.rival_matrix;
                                }

                                if(duel_ob.matrix !== -1 && duel_ob.rival_matrix !== -1){

                                    duel_ob.method = "matrix_defined";

                                    duel_ob.fire_id = guid(); 

                                    let mat_result = false;

                                    while(!mat_result){

                                        mat_result = send_matrix_defined().then();
                                    }                                   
                                }
                            }
                        }else if((game.method === "first_fire") && (game.game_id === duel_ob.game_id && game.fire_id !== last_fire)){

                            last_fire = game.fire_id; 

                            duel_ob = game;    

                            duel_ob.method = "fire";

                            prepare();
                        }else if(game.method === "fire" && game.rec_user_id === user_id && last_fire !== game.fire_id){

                            last_fire = game.fire_id;

                            handle_fire(game);    
                        }else if(game.method === "end_duel" && game.rec_user === user_id && last_fire !== game.fire_id){

                            last_fire = game.fire_id;

                            let ob22 = game;

                            ob22.method = "finish";
    
                            let send_result = false;

                            while(!send_result){

                                send_result = send_ob(ob22).then(()=>{

                                    if(send_result){

                                        end_duel();
                                    }
                                });
                            }
                        }
                })
             }

             if(await_flag1){

                count1--;

                btn_go.innerText = "await " + game_req_ob.rival_user_name + " response in " + count1;

                if(count1 <= 0){

                    count1 = 10;
    
                    btn_go.innerText = "no response, try again"; 

                    btn_go.onClick = "";
            
                    ani_box.style.display = "none";

                    xhr = new XMLHttpRequest();
                    xhr.open("POST", "handler.php", true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    game_req_ob.method = "delete_duel";
    
                    xhr.send(JSON.stringify(game_req_ob));
                    
                    setTimeout(()=>{

                        btn_go.onClick = "req_duel()";

                        await_flag1 = false;
                    
                        closeModal();
                    }, 3000)
                }
            }

            if(await_flag2){

                count1--;

                if(count1 <= 0){ 

                    closeModal();
                }  
            }

            

            h2.setAttribute("style", "color:orangered;");

            let users_length = 0;

            if(res_ob.users_list){

                users_length = res_ob.users_list.length;    
            }
            
            h2.innerText = "online users (" + users_length + ")";
            
            let active_flag = false;
            
            res_ob.users_list.forEach((user)=>{
                
                if(user.user_id === user_id){
                    
                    active_flag = true;
                }
            })
            
            if(!active_flag){

                let req_ob33 = {
            
                    "method":"active",
                    "user_id":user_id,
                    "user_name":user_name,
                    "ip":ip,
                    "busy":imbusyflag
                }

                let active_result = false;

                            while(!active_result){

                                active_result = send_active(req_ob33).then();
                            }
            }
        }
    }
}

async function clear_cache(){

    const cache_obj = {

        "method":"clear_cache"
    }

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify(cache_obj));  
}

async function send_active(req_ob77){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify(req_ob77));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
                const res_ob77 = JSON.parse(xhr.response);

                return res_ob77.result;
        }
    }
}

async function send_chat(req_ob88){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify(req_ob88));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
                const res_ob88 = JSON.parse(xhr.response);

                return res_ob88.result;
        }
    }    
}

async function send_matrix_defined(){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(duel_ob));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
                const res_ob55 = JSON.parse(xhr.response);

                return res_ob55.result;
        }
    }
}

async function connect_data(data24){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data24));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
                const res_ob24 = JSON.parse(xhr.response);
                
                if(!res_ob24.reject){

                    ip = res_ob24.ip;

                    return res_ob24.result;
                }else{

                    window.location.href = "http://www.github.com";
                }
        }
    }
}

function game_refused(){

    msgn = "your challenge has been refused";
    notify_alert(msgn);

    let req_ob = {

        "method":"delete_duel",
        "game_id":game_req_ob.game_id
    }

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify(req_ob));

    setTimeout(()=>{

        btn_go.onClick = "req_duel()";

        img2.className = "img2";
    
        img1.className = "img1";

        await_flag1 = false;

        game_req_ob = {};
                    
        closeModal();
        }, 3000)
}

function new_game(count){

    if(await_flag1){
    
        return;
    }

    user2_name_modal.scrollIntoView({behavior: 'smooth'});

    navy_container2.style.display = "none";
    
    navy_container1.style.display = "flex";

    btn_go.innerText = "GO";  

    if(users[count].user_id === user_id || users[count].busy){
    
        msgn = "this user is busy, you must fight another one";

        notify_alert(msgn);
        
        return;
    }
    
    user1_name_modal.innerText = user_name;
    
    user2_name_modal.innerText = users[count].user_name;
    
    img1.className = "img1";
    
    game_req_ob = {};
    game_req_ob.method = "req_duel";
    game_req_ob.user_id = user_id;
    game_req_ob.rival_user_id = users[count].user_id;
    game_req_ob.user_name = user_name;
    game_req_ob.rival_user_name = users[count].user_name;
    game_req_ob.navy = "jp";
    game_req_ob.rival_navy = "us";
    game_req_ob.channel = false;
    game_req_ob.game_id = guid();
    
    openModal();
    
}

function req_duel(){

    if(await_flag1){
    
        return;
    }

    

    let req_result = false;

    while(!req_result){

        req_result = send_duel_req(game_req_ob).then(()=>{

                                    if(req_result){

                                        count1 = 10;

                                        ani_box.style.display = "block";
    
                                        btn_go.innerText = "await " + game_req_ob.rival_user_name + " response in " + count1;

                                        await_flag1 = true;
                                    }
                                });
    }
}

async function send_duel_req(duel_req86){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(duel_req86));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
            let res_ob86 = JSON.parse(xhr.response);

            return res_ob86.result;
        }
    }
}

function end_duel(){

    clearInterval(ipvp_waves);

    ani_canvas.style.display = "none";
    
    ani_canvas2.style.display = "none";
    
    ani_canvas3.style.display = "none";
    
    ani_canvas4.style.display = "none";

    pvp_clear_variables();

    pvp_num = 0;

    cont_user = 0;
    
    cont_rival = 0;
    
    pvp_cont_part = 0

    ismyturnflag = false;

    imrivalflag = false;
    
    imbusyflag = false;
    
    imusflag = false;

    introflag = true;
    
    duel_ob = {};
    
    shape_section_second.style.display = "flex";
    
    shape_section_first.style.display = "none";
    
    canvas.style.display = "none";
    
    traffic_light.style.display = "none";
    
    //pvp_undoPos();

    intro();
}

function trigger_end_duel(){

    let rec_user;

    if(imrivalflag){

        rec_user = duel_ob.user_id;
    }else{

        rec_user = duel_ob.rival_user_id;
    }

    let ob32 = {

        "method":"end_duel",
        "user_id":duel_ob.user_id,
        "rival_user_id":duel_ob.rival_user_id,
        "game_id":duel_ob.game_id,
        "rec_user":rec_user,
        "fire_id":guid()
    };
    
    let send_result = false;

    while(!send_result){

        send_result = send_ob(ob32).then(()=>{

                                    if(send_result){

                                        end_duel();
                                    }
                                });
    }
}

async function send_ob(ob32){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");    

    xhr.send(JSON.stringify(ob32));
   
    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
            let res_ob = JSON.parse(xhr.response);

            return res_ob.result;
        }
    }
}

function duel_start(){

    if(!finish_game){

            clear_variables();

            shape_section_second.style.display = "flex";
    
            shape_section_first.style.display = "none";
    
            canvas.style.display = "none";
    }

    document.getElementById("vertical_container").scrollIntoView({behavior: "smooth"})
    
    pvp_clear_variables();

    let p = document.createElement("p");
    
    p.innerText = "The Duel has started\n" + duel_ob.user_name + "(" + duel_ob.navy + ")" + " VS " + duel_ob.rival_user_name + "(" + duel_ob.rival_navy + ")" + "\n\nSelect and Place Your Vessels";

    console_user.appendChild(p);
                              
    console_user.scrollTop = console_user.scrollHeight;

    shape_section_second.style.display = "none";
    
    shape_section_first.style.display = "flex";
    
    canvas.style.display = "block";

    

    pvp_clear_variables();

    monitor.innerHTML = "";

    canvas_instantiate();
    
    startpvp();
}

function accept_duel(){

    duel_ob.method = "start_duel";

    await_flag2 = false;

    let accept_result = false;

    while(!accept_result){

        accept_result = accept_duel_res().then(()=>{

            if(accept_result){

                closeModal();
            }
        });
    }
}

async function accept_duel_res(){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify(duel_ob));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
            let res_ob33 = JSON.parse(xhr.response);

            return res_ob33.result;
        }
    }
}

function challenge(game){

    await_flag2 = true;

    count1 = 10;
        
    duel_ob = game;

    if(game.navy === "jp"){

        img3.src = "img/jpnavy.png";
    }else{

        img3.src = "img/usnavy.png";
    }
    
    ani_box.style.display = "block";

    navy_container1.style.display = "none";
    
    navy_container2.style.display = "flex";
    
    user3_name_modal.innerText = duel_ob.user_name + " has challenged you";
    
    openModal();
}



function use_us(){

    if(await_flag1){
    
        return;
    }

    game_req_ob.navy = "us";
    game_req_ob.rival_navy = "jp";
    
    user2_name_modal.innerText = user_name;
    
    user1_name_modal.innerText = game_req_ob.rival_user_name;
    
    img2.className = "img1";
    
    img1.className = "img2";
      
}

function use_jp(){

    if(await_flag1){
    
        return;
    }

    game_req_ob.navy = "jp";
    game_req_ob.rival_navy = "us";
    
    user1_name_modal.innerText = user_name;
      
    user2_name_modal.innerText = game_req_ob.rival_user_name;
    
    img2.className = "img2";
    
    img1.className = "img1";
}



function append_chats(new_chats){

    new_chats.forEach((chat)=>{

            let p = document.createElement("p");

            if(chat.all){
       
                p.setAttribute("style", "font-style:italic;color:white;");

                let up = document.createElement("p");
                up.setAttribute("style", "font-style:italic;color:white;font-weight:bold;");
                up.innerText = "\n" + chat.user_name + ":";

                p.innerText = chat.msg;

                console_user.appendChild(up);
                console_user.appendChild(p);
                
            }else if(!chat.all && (chat.user_one === user_id || chat.user_two === user_id)){

                p.setAttribute("style", "font-style:italic;color:yellow;");

                let up = document.createElement("p");
                up.setAttribute("style", "font-style:italic;color:yellow;font-weight:bold;");
                up.innerText = "\n" + chat.user_name + ":";

                p.innerText = chat.msg;

                console_user.appendChild(up);
                console_user.appendChild(p);  
            }

            
                              
            console_user.scrollTop = console_user.scrollHeight;
    })
}



function change_name(){

    if(imbusyflag){

        msgn = "name cannot be changed during pvp";
        
        notify_alert(msgn);

        return;
    }

    let new_name = prompt("enter new name");

    let name_flag = false;

    users.forEach((user)=>{

        if(new_name === user.user_name || new_name.length > 20){

            msgn = "cannot use that name";
        
            notify_alert(msgn);

            name_flag = true;    
        }
    })
    
    if(!new_name || name_flag){
    
        return;
    }
    
    let req_ob71 = {
            
                "method":"change_name",
                "user_id":user_id,
                "user_name":user_name,
                "new_name":new_name
    }
            
    let name_result = false;

        while(!name_result){

            name_result = send_change_name(req_ob71).then();
        }    
}

async function send_change_name(req_ob17){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify(req_ob17));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
            let res_ob117 = JSON.parse(xhr.response);

            return res_ob117.result;
        }
    }
}

function demo(){

    demoflag = false;

    monitor.removeChild(demo_el);

    window.open('./img/demo.gif', '_blank');
}


// ALERT

function notify_alert(text){

    notifyType.innerText = text;

    notifyType.className = "active";

    let timeout = setTimeout(()=>{

        notifyType.className = "notify";

  }, 5000)
}

// ALERT


// CLICK FLASH EFFECT

function printMousePos(event){

  let pure = document.getElementById('pure');
  pure.style.position = "absolute";
  pure.style.left = event.clientX - 40 + 'px';
  pure.style.top = event.clientY - 40 + 'px';
  pure.className = "pure_end";

  let timeout = setTimeout(()=>{

        pure.className = "pure_start";
  }, 500)
}


// CLICK FLASH EFFECT





function intro(){

    for(let h=0;h<=5;h++){
        
            buffer_vessels[h].name_user = vessel_img_ob[h].name_us;
            buffer_vessels[h].name_rival = vessel_img_ob[h].name_jp;
            buffer_vessels[h].v_al_user = vessel_img_ob[h].v_al;
            buffer_vessels[h].src_h = vessel_img_ob[h].src_h;
            buffer_vessels[h].src_v = vessel_img_ob[h].src_v; 
            buffer_vessels[h].src_jp_h = vessel_img_ob[h].src_jp_h;
            buffer_vessels[h].src_jp_v = vessel_img_ob[h].src_jp_v; 
    }
    
    canvas_instantiate();

    ipvp_waves = setInterval(pvp_waves_intro, 30);

    monitor.appendChild(ani_canvas);
    ani_canvas.style.display = "block";
    
    monitor.appendChild(ani_canvas_el);
    monitor.appendChild(ani_canvas_el2);
    monitor.appendChild(ani_canvas_el3);
    monitor.appendChild(ani_canvas_el4);

    pvp_failhitAni_intro(4);
}


function pvp_failhitAni_intro(op){

    ani_canvas2.style.display = "block";

    intro_vessel1 = new Image();
    intro_vessel2 = new Image();

    intro_vessel1.src = buffer_vessels[2].src_jp_v;

    intro_vessel1.onload = function() {

        ani_ctx2.drawImage(intro_vessel1, 25, 40, 50, 172);
    }

    intro_vessel2.src = buffer_vessels[3].src_v;

    intro_vessel2.onload = function() {

        ani_ctx2.drawImage(intro_vessel2, 220, 7, 50, 230);
    }

    ani_canvas3.style.display = "block";

    switch(op){

        case 4:

            torpedo[op].x = torpedo[op].x_ini + 50;
            torpedo[op].y = torpedo[op].y_ini - 25;
        break;

        case 6:

            torpedo[op].x = torpedo[op].x_ini - 50;
            torpedo[op].y = torpedo[op].y_ini + 25;
        break;
    }

    


    iden_intro = setInterval(function() {  

            pvp_clearaniTor_intro();

            pvp_drawTor_intro(op);

            pvp_newPos_intro(op);

        }, 100);

    setTimeout(()=>{

        clearInterval(iden_intro);

        pvp_clearaniTor_intro();

        switch(op){

            case 4:

                pvp_drawPart_intro(op);

                setTimeout(()=>{

                    if(imbusyflag || !introflag){

                        return;
                    }

                    pvp_failhitAni_intro(6);

                }, 1000);
            break;

            case 6:

                pvp_drawPart_intro(op);

                setTimeout(()=>{

                    if(imbusyflag || !introflag){

                        return;
                    }

                    pvp_failhitAni_intro(4);

                }, 1000);
            break;
        }  

    }, 1000);
}

function pvp_clearaniTor_intro(){

    ani_ctx3.clearRect(0, 0, ani_ctx3.canvas.width, ani_ctx3.canvas.height);

}



function pvp_drawTor_intro(n3){

    ani_ctx3.drawImage(torpedo[n3].src, torpedo[n3].x, torpedo[n3].y, torpedo[n3].w, torpedo[n3].h);
}

function pvp_newPos_intro(n4){

    torpedo[n4].x += torpedo[n4].speed_x;
    torpedo[n4].y += torpedo[n4].speed_y;
}

function pvp_drawPart_intro(op){

    if(imbusyflag || !introflag){

            return;
    }

    ani_canvas4.style.display = "block";

    pvp_cont_part = 0;

    iden = setInterval(function() { 
     
        ani_ctx4.save();
        pvp_drawParts_intro(op);
        ani_ctx4.restore();
    }, 107);

    

    setTimeout(()=>{

        clearInterval(iden);
        ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
        
    }, 750);

}

function pvp_drawParts_intro(opt){

    pvp_cont_part++;
    ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
    
    
    ani_ctx4.translate(torpedo[opt].part_x, torpedo[opt].part_y);
    ani_ctx4.rotate(torpedo[opt].angle);

    switch(opt){

        case 4:
        ani_ctx4.drawImage(torpedo[pvp_cont_part].src_part, ani_ctx4.canvas.width/2 + 50, ani_ctx4.canvas.height/2 - 25, 100, 100);
        break;

        case 6:
        ani_ctx4.drawImage(torpedo[pvp_cont_part].src_part, ani_ctx4.canvas.width/2 + 70, ani_ctx4.canvas.height/2 - 25, 100, 100);
        break;

    }
    
    if(pvp_cont_part === 7){
    
        ani_ctx4.restore();
        ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
    }
}


function render_users_list(){

    dom_users_list.innerHTML = "";
    
    let count = 0;

    for(var key in users){
            
        let p = document.createElement("div");
                
        p.innerHTML = `<p>${users[key].user_name}<img src="img/ss.png" style="width:40px;height:40px;cursor:pointer;" title="challenge this user" onclick="new_game(`+ count +`)"></img></p>`;
        
        dom_users_list.appendChild(p);
        
        if(users[key].user_id === user_id){
                
            h1.innerHTML = "<span style='color:white;'>name:</span> " + users[key].user_name;
            
            user_name = users[key].user_name;
        }
        
        count++;
    }
}



function guid(){

    return Math.round(Math.random() * 10000) + Math.round(Math.random() * 10000) + letters[random_int(0, 25)]; 
} 



function random_int(min, max) {

    let floor = Math.ceil(min);
    let coil = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function chunkSubstr(str, size) {

  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {

        chunks[i] = str.substr(o, size);
  }

  return chunks;
}

function readConsole(){

    console_user.style.height = '200px';

    console_user.addEventListener('mouseleave', playConsole);

    console_user.style.opacity = .8;
                              
    console_user.scrollTop = console_user.scrollHeight;
}

function playConsole(){

    console_user.style.height = '40px';

    console_user.addEventListener('mouseenter', readConsole);

    console_user.style.opacity = 1;
                              
    console_user.scrollTop = console_user.scrollHeight;
}


function self_game(){

    if(ipvp_waves){

        clearInterval(ipvp_waves);    
    }

    

    clearInterval(iden);

    clearInterval(iden_intro);

    ani_canvas.style.display = "none";
    
    ani_canvas2.style.display = "none";
    
    ani_canvas3.style.display = "none";
    
    ani_canvas4.style.display = "none";

    monitor.removeChild(ani_canvas);

    monitor.removeChild(ani_canvas2);

    monitor.removeChild(ani_canvas3);

    monitor.removeChild(ani_canvas4);

    clear_variables();

    pvp_clear_variables();

    introflag = false;

    finish_game = false;

    end_game = false;
    
    end_flag = false;

    monitor.innerHTML = "";

    if(demoflag){

        demo_el = document.createElement("button");

        demo_el.setAttribute("class", "btn_demo");

        demo_el.setAttribute("onclick", "demo()");

        demo_el.innerText = "How to Play?";

        monitor.appendChild(demo_el);    
    }

    

    canvas_instantiate();

    let p = document.createElement("p");
    
    p.innerText = "Select and Place Your Vessels"

    console_user.appendChild(p);
                              
    console_user.scrollTop = console_user.scrollHeight;

    shape_section_second.style.display = "none";
    
    shape_section_first.style.display = "flex";
    
    canvas.style.display = "block";

    start();
    
    canvas.addEventListener('click', getCoords);
}


function openModal(){
    
    modal.style.display = 'block'
}

function closeModal(){

    if(await_flag1){

        return;
    }else if(await_flag2){

        let req_ob61 = {

            "method":"refuse_duel",
            "game_id":duel_ob.game_id
        }

        let refuse_result = false;

        while(!refuse_result){

            refuse_result = send_modal_refuse(req_ob61).then(()=>{

                                    if(refuse_result){

                                        await_flag2 = false;

                                        duel_ob = false;
            
                                        ani_box.style.display = "none";
                                    }
                                });
        }
    }

    modal.style.display = "none";
}

async function send_modal_refuse(ob61){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(ob61));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
                const res_ob61 = JSON.parse(xhr.response);

                return res_ob61.result;
        }
    }
}


function chat(){

    if(chat_text.value === "" || !chat_text.value || (!imbusyflag && !chat_check.checked)){
    
        return;
    }else if(chat_text.value.length > 255){

        msgn = "maximum 255 characters";
        notify_alert(msgn);
        return;
    }else if(flood_flag){

        msgn = "maximum 1 message per second";
        notify_alert(msgn);
        return;   
    }

    let chunks;

    if(window.matchMedia("(max-width:540px)").matches){
  
        chunks = chunkSubstr(chat_text.value, 27);

    }else if(window.matchMedia("(min-width:768px)").matches){
        
        chunks = chunkSubstr(chat_text.value, 81);
    }else{
        
        chunks = chunkSubstr(chat_text.value, 50);
    }

    
    let big_str = "";

    chunks.forEach((chunk)=>{

        big_str += chunk + " ";
    })

    let req_ob11 = {
    
            "method":"chat",
            "all":chat_check.checked,
            "msg":big_str,
            "user_name":user_name,
            "user_one":"",
            "user_two":"",
            "chat_id":guid()
        }

    
    if(imbusyflag){

        req_ob11.user_one = duel_ob.user_id;
        req_ob11.user_two = duel_ob.rival_user_id;
    }

        let chat_result = false;

        while(!chat_result){

        chat_result = send_chat(req_ob11).then(()=>{

                                    if(chat_result){

                                        chat_text.value = "";
                                    }
                                });
        }
}

