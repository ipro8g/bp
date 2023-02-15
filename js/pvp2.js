

function prepare(){
    
    dom_user_name = duel_ob.user_name;
        
    dom_rival_name = duel_ob.rival_user_name;
    
    duel_ob.points = 0;

    duel_ob.rival_points = 0;
    
    score = 0;

    rival_score = 0;

    if(!imrivalflag){
    
        ismyturnflag = true;       
    }else{
    
        ismyturnflag = false;
    }
    
    tl_user.innerText = dom_user_name;
        
    tl_rival.innerText = dom_rival_name;
    
    shapes.forEach((shape)=>{
    
        shape.style.display = "none";
    })
    
    traffic_light.setAttribute("style", "justify-content:center;");
    
    traffic_light.style.display = "flex";
    
    

    canvas.removeEventListener('click', pvp_getCoords);

    canvas.addEventListener('click', pvp_getshotCoords);
    
    pvp_drawScenario();
    
    pvp_time = 0;
    
    ipvp_waves = setInterval(pvp_waves, 30);
    
    monitor.appendChild(ani_canvas);
    ani_canvas.style.display = "block";
    
    monitor.appendChild(ani_canvas_el);
    monitor.appendChild(ani_canvas_el2);
    monitor.appendChild(ani_canvas_el3);
    monitor.appendChild(ani_canvas_el4);
    
    buffer_vessels[0].v_al_rival=false;
    buffer_vessels[0].v_al_user=false;
    
    buton_one.className = "";
    buton_one.src = "";
    buton_one.setAttribute("onclick", "");
    buton_one.style.display = "none";
    
    let msj = document.createElement('p');   
    msj.innerText = `Game Start!\n${duel_ob.user_name}'s turn`;
    console_user.appendChild(msj);
    console_user.scrollTop = console_user.scrollHeight;

    msgn = `Game Start!\n${duel_ob.user_name}'s turn`;
    notify_alert(msgn);    

    top_light.setAttribute("style", "background-image:radial-gradient(lime, forestgreen, lime);");
    down_light.setAttribute("style", "background-image:radial-gradient(pink, orangered, pink);");

    cclock = 10;

    tl_clock.innerText = cclock;
}

function pvp_state(result, opt){

    let sunk = pvp_count_vessel(opt, result);

    switch(opt){

        case 'user':

           if(sunk || result === 'submarine'){

                duel_ob.points++;

                let msg = document.createElement("p");

                if(result > 1 && result <= 6){

                    if(duel_ob.navy === "us"){

                        msg.innerHTML = `<span style=color:OrangeRed;font-weight:bold;> ${vessel_img_ob[result-1].name_jp} </span> of <span style='color:OrangeRed;font-weight:bold;'> ${duel_ob.rival_user_name} </span> has been sunk`;      
                    }else{

                        msg.innerHTML = `<span style=color:blue;font-weight:bold;> ${vessel_img_ob[result-1].name_us} </span> of <span style='color:MediumBlue;font-weight:bolder;'> ${duel_ob.rival_user_name} </span> has been sunk`;         
                    }

                }else{

                    if(duel_ob.navy === "us"){

                        msg.innerHTML = `<span style=color:OrangeRed;font-weight:bold;> ${vessel_img_ob[0].name_jp} </span> of <span style='color:OrangeRed;font-weight:bold;'> ${duel_ob.rival_user_name} </span> has been sunk`;      
                    }else{

                        msg.innerHTML = `<span style=color:blue;font-weight:bold;> ${vessel_img_ob[0].name_us} </span> of <span style='color:MediumBlue;font-weight:bolder;'> ${duel_ob.rival_user_name} </span> has been sunk`;         
                    }
                }

                console_user.appendChild(msg);
                console_user.scrollTop = console_user.scrollHeight;

                if(duel_ob.points === 6){

                    if(!imrivalflag){

                        msgn = duel_ob.user_name + " has defeated " + duel_ob.rival_user_name;

                            let req_ob = {
    
                                "method":"chat",
                                "all":true,
                                "msg":msgn,
                                "user_name":"notice"
                            }

                        xhr = new XMLHttpRequest();
                        xhr.open("POST", "handler.php", true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        xhr.send(JSON.stringify(req_ob));

                        msgn = "with " + top_light.innerText + " points, you have defeated " + duel_ob.rival_user_name;
                        notify_alert(msgn);

                        setTimeout(()=>{

                            trigger_end_duel();
                        }, 4000);

                        
                    }else{

                        msgn = "with " + top_light.innerText + " points, " + duel_ob.user_name + " has defeated you";
                        notify_alert(msgn);
                    }
                }  
           }        
        break;

        case 'rival':

           if(sunk || result === 'submarine'){

                duel_ob.rival_points++;

                let msg = document.createElement("p");

                if(result > 1 && result <= 6){

                    if(duel_ob.rival_navy === "us"){

                        msg.innerHTML = `<span style=color:OrangeRed;font-weight:bold;> ${vessel_img_ob[result-1].name_jp} </span> of <span style='color:OrangeRed;font-weight:bold;'> ${duel_ob.user_name} </span> has been sunk`;      
                    }else{

                        msg.innerHTML = `<span style=color:blue;font-weight:bold;> ${vessel_img_ob[result-1].name_us} </span> of <span style='color:MediumBlue;font-weight:bolder;'> ${duel_ob.user_name} </span> has been sunk`;         
                    }

                }else{

                    if(duel_ob.rival_navy === "us"){

                        msg.innerHTML = `<span style=color:OrangeRed;font-weight:bold;> ${vessel_img_ob[0].name_jp} </span> of <span style='color:OrangeRed;font-weight:bold;'> ${duel_ob.user_name} </span> has been sunk`;      
                    }else{

                        msg.innerHTML = `<span style=color:blue;font-weight:bold;> ${vessel_img_ob[0].name_us} </span> of <span style='color:MediumBlue;font-weight:bolder;'> ${duel_ob.user_name} </span> has been sunk`;         
                    }
                }

                console_user.appendChild(msg);
                console_user.scrollTop = console_user.scrollHeight;

                if(duel_ob.rival_points === 6){

                        if(imrivalflag){

                            msgn = duel_ob.rival_user_name + " has defeated " + duel_ob.user_name;

                            let req_ob = {
    
                                "method":"chat",
                                "all":true,
                                "msg":msgn,
                                "user_name":"notice"
                            }

                            xhr = new XMLHttpRequest();
                            xhr.open("POST", "handler.php", true);
                            xhr.setRequestHeader("Content-Type", "application/json");
                            xhr.send(JSON.stringify(req_ob));

                            msgn = "with " + down_light.innerText + " points, you have defeated " + duel_ob.user_name;
                            notify_alert(msgn);

                            setTimeout(()=>{

                                trigger_end_duel();
                            }, 4000);
                        }else{

                            msgn = "with " + down_light.innerText + " points, " + duel_ob.rival_user_name + " has defeated you";
                            notify_alert(msgn);
                        }
                }       
           }    
        break;
    }
}

function pvp_count_vessel(playe, n){
	
	let result = false;
	let cont1_ship = 0;
	
	switch(playe){
	
		case 'user':

			for(let a = 0; a <= 7; a++){

				for(let b = 0;b <= 12; b++){

					if(matrix_discover_user[a][b] === 1 && duel_ob.rival_matrix[a][b] === n){

						cont1_ship++;
					}
				}
			}
		
		break;
		
		case 'rival':
		
			for(let a = 0; a <= 7; a++){

				for(let b = 0; b <= 12; b++){

					if(matrix_discover_rival[a][b] === 1 && duel_ob.matrix[a][b] === n){

						cont1_ship++;
					}
				}
			}
		
		break;
	
	}
	
	if(n > 1 && n < 6){

		if(cont1_ship === n){

			result = true;	
		}
	}else if(n === 6){

		if(cont1_ship === 8){

			result = true;	
		}
	}
	
	return result;
}

function turn_out(){

    let fire_ob32 = {
    
            "method": "fire",
            "send_user_id":"",
            "rec_user_id":"",
            "is_us":imusflag,
            "click_y":-1,
            "click_x":-1,
            "game_index":-1,
            "game_id":duel_ob.game_id,
            "fire_id":guid()
    }


    if(imrivalflag){
        
        fire_ob32.send_user_id = duel_ob.rival_user_id;
        
        fire_ob32.rec_user_id = duel_ob.user_id;
    }else{
        
        fire_ob32.send_user_id = duel_ob.user_id;
        
        fire_ob32.rec_user_id = duel_ob.rival_user_id;
    }

    let shot_result = false;

    while(!shot_result){

        shot_result = send_shot(fire_ob32).then(()=>{

            if(shot_result){

                pvp_animateShot(false, imusflag);

                if(imrivalflag){
            
                    pvp_graphicMatrix(matrix_discover_user);
                
                    top_light.setAttribute("style", "background-image:radial-gradient(lime, forestgreen, lime);");
                    down_light.setAttribute("style", "background-image:radial-gradient(pink, orangered, pink);");
                }else{
                        
                    pvp_graphicMatrix(matrix_discover_rival);
            
                    top_light.setAttribute("style", "background-image:radial-gradient(pink, orangered, pink);");
                    down_light.setAttribute("style", "background-image:radial-gradient(lime, forestgreen, lime);");
                }
    
                ismyturnflag = false;

                cclock = 10;

                tl_clock.innerText = cclock;
            }
        });
    }
}


function handle_fire(ob){

    let result;
    
        if(imrivalflag){
           
            result = pvp_checkShot(ob.click_y, ob.click_x, "user");

            pvp_animateShot(result, ob.is_us);
        
            pvp_graphicMatrix(matrix_discover_user);

            pvp_state(result, "user"); 
        }else{
                   
            result = pvp_checkShot(ob.click_y, ob.click_x, "rival");

            pvp_animateShot(result, ob.is_us);
        
            pvp_graphicMatrix(matrix_discover_rival);

            pvp_state(result, "rival"); 
        }
    
        if(!result){

            setTimeout(() => {

            canvas.className = "canvas2";

                setTimeout(() => {

                    canvas.className = "canvas1";

                }, 200);

            }, 1300);

            setTimeout(() => {

                cclock = 10;

                tl_clock.innerText = cclock;
            
                ismyturnflag = true;
            
                if(imrivalflag){
            
                    pvp_graphicMatrix(matrix_discover_rival);    

                    top_light.setAttribute("style", "background-image:radial-gradient(pink, orangered, pink);");
                    down_light.setAttribute("style", "background-image:radial-gradient(lime, forestgreen, lime);");
                }else{
 
                    pvp_graphicMatrix(matrix_discover_user);
            
                    top_light.setAttribute("style", "background-image:radial-gradient(lime, forestgreen, lime);");
                    down_light.setAttribute("style", "background-image:radial-gradient(pink, orangered, pink);");
                }
            
            }, 1500);
        }else if(result){

                if(imrivalflag){

                    score += parseInt(tl_clock.innerText);
                    top_light.innerText = score;
                }else{

                    rival_score += parseInt(tl_clock.innerText);           
                    down_light.innerText = rival_score;
                }

                cclock = 10;

                tl_clock.innerText = cclock;    
        }
}


function pvp_getshotCoords(){
 
    if(!ismyturnflag){
    
        return;
    }

    ismyturnflag = false;

    let x=event.offsetX * canvas.width / canvas.clientWidth;
    let y=event.offsetY * canvas.height / canvas.clientHeight;

    

    let click_x;
    let click_y;


    for(let a=0;a<=12;a++){

        for(let b=0;b<=7;b++){

            if((x>(a*60))&&(x<((a+1)*60))){

                    click_x=a;
    
                    if((y>(b*46))&&(y<((b+1)*46))){
    
                        click_y=b;
    
                    }
            }

        }

    }

    let result;

    if(!imrivalflag){

        result = pvp_checkShot(click_y, click_x, "user");

        if(result === -1){

            ismyturnflag = true;

            return;
        }

        pvp_animateShot(result, imusflag);

        pvp_graphicMatrix(matrix_discover_user); 

        pvp_state(result, "user");  
    }else if(imrivalflag){

        result = pvp_checkShot(click_y, click_x, "rival");

        if(result === -1){

            ismyturnflag = true;

            return;
        }

        pvp_animateShot(result, imusflag);

        pvp_graphicMatrix(matrix_discover_rival);

        pvp_state(result, "rival"); 
    }

    const new_id = guid();

    let fire_ob14 = {
    
            "method": "fire",
            "send_user_id":"",
            "rec_user_id":"",
            "is_us":imusflag,
            "click_y":click_y,
            "click_x":click_x,
            "game_index":duel_ob.game_index,
            "game_id":duel_ob.game_id,
            "channel":duel_ob.channel,
            "fire_id":new_id
    }


    if(imrivalflag){
        
        fire_ob14.send_user_id = duel_ob.rival_user_id;
        
        fire_ob14.rec_user_id = duel_ob.user_id;
    }else{
        
        fire_ob14.send_user_id = duel_ob.user_id;
        
        fire_ob14.rec_user_id = duel_ob.rival_user_id;
    }

    let shot_result = false;

    while(!shot_result){

        shot_result = send_shot(fire_ob14).then(()=>{

                                    if(shot_result){

                                        after_shot(result);
                                    }
                                });
    }
}

function after_shot(result){

    if(!result){

        setTimeout(() => {

            canvas.className = "canvas2";

                setTimeout(() => {

                    canvas.className = "canvas1";

                }, 200);

            }, 1300);
    }

    setTimeout(() => {

        if(!result){

            if(imrivalflag){
            
                pvp_graphicMatrix(matrix_discover_user);
                
                top_light.setAttribute("style", "background-image:radial-gradient(lime, forestgreen, lime);");
                down_light.setAttribute("style", "background-image:radial-gradient(pink, orangered, pink);");
            }else{
                        
                pvp_graphicMatrix(matrix_discover_rival);
            
                top_light.setAttribute("style", "background-image:radial-gradient(pink, orangered, pink);");
                down_light.setAttribute("style", "background-image:radial-gradient(lime, forestgreen, lime);");
            }

            

            cclock = 10;

            tl_clock.innerText = cclock;

            ismyturnflag = false;

        }else if(result){

                if(!imrivalflag){

                    score += parseInt(tl_clock.innerText);
                    top_light.innerText = score;
                }else{

                    rival_score += parseInt(tl_clock.innerText);           
                    down_light.innerText = rival_score;
                }

            cclock = 10;

            tl_clock.innerText = cclock;

            ismyturnflag = true;
        }

        }, 1500);
}

async function send_shot(fire_ob12){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");    

    xhr.send(JSON.stringify(fire_ob12));
   
    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
            let ob24 = JSON.parse(xhr.response);

            if(ob24.fire_id === fire_ob12.fire_id){

                return true;
            }else{

                return false;
            }
        }
    }
}

function pvp_checkShot(y, x, player){

    

    if(y === -1 && x === -1){
    
            return false;
    }

    try{

    switch(player){
		
	case 'user':
	
	if(matrix_discover_user[y][x] !== 0){
	
	    return false;
	}else if(duel_ob.rival_matrix[y][x] === 0){
	
        matrix_discover_user[y][x] = 9;

        animate_pair_x = x;
        animate_pair_y = y;

        return false;

    }else if((duel_ob.rival_matrix[y][x] > 1) && (duel_ob.rival_matrix[y][x] <= 6)){
    
        matrix_discover_user[y][x] = 1;

        animate_pair_x = x;
        animate_pair_y = y;

        return duel_ob.rival_matrix[y][x];		
	}else if(duel_ob.rival_matrix[y][x] === 1){
	
        matrix_discover_user[y][x] = 1;

        animate_pair_x = x;
        animate_pair_y = y;

        return 'submarine';
	}

    break;
	
	
	
	case 'rival':
	
	if(matrix_discover_rival[y][x] !== 0){
	
	    return false;
	}else if(duel_ob.matrix[y][x] === 0){
	
        matrix_discover_rival[y][x] = 9;

        animate_pair_x = x;
        animate_pair_y = y;

        return false;
    }else if((duel_ob.matrix[y][x] > 1) && (duel_ob.matrix[y][x] <= 6)){
    
        matrix_discover_rival[y][x] = 1;

        animate_pair_x = x;
        animate_pair_y = y;

        return duel_ob.matrix[y][x];
    }else if(duel_ob.matrix[y][x] === 1){
    
        matrix_discover_rival[y][x] = 1;

        animate_pair_x = x;
        animate_pair_y = y;

        return 'submarine';
	}
	
	break;
	
	}

    }catch(e){

        return -1;
    }
}

function pvp_waves_intro(){
 
    if(!introflag){
    
        return;
    }

	ani_ctx.fillStyle = "MediumBlue";
	ani_ctx.fillRect(0, 0, ani_canvas.width, ani_canvas.height);

	ani_ctx.beginPath();
	ani_ctx.strokeStyle = 'RoyalBlue';
	ani_ctx.lineWidth = 5;
	ani_ctx.lineCap = "round";


    
	pvp_time++;
	
	if(pvp_time === 15){
	
		pvp_time = 0;
	}


for(let b=0;b<=17;b++){

	    for(let a=0;a<=9;a++){
	
            ani_ctx.beginPath();
            ani_ctx.moveTo(a * 30, b * 15 + pvp_time);
            ani_ctx.quadraticCurveTo((a * 30) + 15, ((b-1)*15) + pvp_time, (30 + (a*30)), (b*15) + pvp_time);
            ani_ctx.stroke();
	    }
}
}

 
function pvp_waves(){
 
    if(!imbusyflag){
    
        return;
    }

	ani_ctx.fillStyle = "MediumBlue";
	ani_ctx.fillRect(0, 0, ani_canvas.width, ani_canvas.height);

	ani_ctx.beginPath();
	ani_ctx.strokeStyle = 'RoyalBlue';
	ani_ctx.lineWidth = 5;
	ani_ctx.lineCap = "round";


    
	pvp_time++;
	
	if(pvp_time===15){
	
		pvp_time=0;
	}


for(let b=0;b<=17;b++){

	    for(let a=0;a<=9;a++){
	
            ani_ctx.beginPath();
            ani_ctx.moveTo(a * 30, b * 15 + pvp_time);
            ani_ctx.quadraticCurveTo((a * 30) + 15, ((b-1)*15) + pvp_time, (30 + (a*30)), (b*15) + pvp_time);
            ani_ctx.stroke();
	    }
}
}

function pvp_animateShot(shot, is_us){

    if(duel_ob.rival_points === 6 || duel_ob.points === 6){

        return;
    }

    monitor.appendChild(ani_canvas);
    ani_canvas.style.display = "block";

    if(!shot){
    
        pvp_failhitAni(shot);
    }else if(shot && shot !== 'submarine'){
        
        ani_canvas2.style.display = "block";

        if(is_us){

            img_vessel.src = buffer_vessels[shot-1].src_jp_v;
        }else{

            img_vessel.src = buffer_vessels[shot-1].src_v;
        }
        
        img_vessel.onload = function() {
        
            switch(shot){

                case 2:

                ani_ctx2.drawImage(img_vessel, 127, 60, 50, 116);

                break;

                case 3:
                
                ani_ctx2.drawImage(img_vessel, 127, 40, 50, 172);

                break;

                case 4:
                
                ani_ctx2.drawImage(img_vessel, 127, 7, 50, 230);

                break;

                case 5:
                
                ani_ctx2.drawImage(img_vessel, 127, 4, 50, 245);

                break;

                case 6:
                
                ani_ctx2.drawImage(img_vessel, 105, 4, 100, 245);

                break;

            }
        }
        

    pvp_failhitAni(shot);
    setTimeout(() => pvp_clearAni(), 1500);
    

    }else if(shot === 'submarine'){

        ani_canvas2.style.display = "block";

        if(is_us){

            ani_ctx2.drawImage(img_vessel_sub_jp, 127, 100, 50, 50);
        }else{

            ani_ctx2.drawImage(img_vessel_sub, 127, 100, 50, 50);
        }
        
        pvp_failhitAni(shot);
        setTimeout(() => pvp_clearAni(), 1500);   
    }
}




function pvp_clearAni(){

    ani_ctx2.clearRect(0, 0, ani_ctx2.canvas.width, ani_ctx2.canvas.height);

}



function pvp_failhitAni(op){

    let point;

    ani_canvas3.style.display = "block";

    point = pvp_getRandomInt2(0, 7);

    if(op && op !== 'submarine'){

        do{
        
            point = pvp_getRandomInt2(0, 7);
        }while(point === 5 || point === 7);

    }

    torpedo[point].x = torpedo[point].x_ini;
    torpedo[point].y = torpedo[point].y_ini;


    let iden = setInterval(function() {  

            pvp_clearaniTor();

            pvp_drawTor(point);

            pvp_newPos(point);

        }, 100);

    setTimeout(()=>{

        clearInterval(iden);

        pvp_clearaniTor();

    }, 1500);

    if(op !== false){

    setTimeout(()=>{

        clearInterval(iden);

        pvp_drawPart(point);

        pvp_clearaniTor();

    }, 750);

    }

}

function pvp_clearaniTor(){

    ani_ctx3.clearRect(0, 0, ani_ctx3.canvas.width, ani_ctx3.canvas.height);

}



function pvp_drawTor(n3){

    ani_ctx3.drawImage(torpedo[n3].src, torpedo[n3].x, torpedo[n3].y, torpedo[n3].w, torpedo[n3].h);
}

function pvp_newPos(n4){

    torpedo[n4].x += torpedo[n4].speed_x;
    torpedo[n4].y += torpedo[n4].speed_y;
}


function pvp_drawPart(op){

    if(!torpedo){

        return;
    }

    ani_canvas4.style.display = "block";

    let iden;

    pvp_cont_part = 0;

    iden = setInterval(function() { 
     
        ani_ctx4.save();
        pvp_drawParts(op);
        ani_ctx4.restore();
    }, 107);

    

    setTimeout(()=>{

        clearInterval(iden);
        ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
        
    }, 750);

}

function pvp_graphicMatrix(matrix){



    ctx.clearRect(0, 0, canvas.width, canvas.height);

    

    for(let c = 0; c <= 12; c++){

        for(let d = 0; d <= 7; d++){

                if(matrix[d][c] == 0){

                    ctx.fillStyle = 'MidnightBlue';

                    ctx.fillRect(c * 60, d * 46, 60, 46);

                }else if((matrix[d][c] > 0) && (matrix[d][c] <= 6)){

                    if(c === animate_pair_x && d === animate_pair_y && (animate_pair_x || animate_pair_x === 0) && (animate_pair_y || animate_pair_y === 0)){

                        ctx.fillStyle = 'orangeRed';

                        ctx.fillRect(c * 60, d * 46, 60, 46);

                        setTimeout(()=>{

                            ctx.fillStyle = 'DimGray';

                            ctx.fillRect(c * 60, d * 46, 60, 46);
                            
                            setTimeout(()=>{
                            
                                ctx.fillStyle = 'orangeRed';

                                ctx.fillRect(c * 60, d * 46, 60, 46);
                            
                                setTimeout(()=>{

                                    ctx.fillStyle = 'DimGray';

                                    ctx.fillRect(c * 60, d * 46, 60, 46);

                                    animate_pair_x = false;
                                    animate_pair_y = false;     
                                }, 400)    
                            }, 400)       
                        }, 400)
                    }else{

                        ctx.fillStyle = 'DimGray';

                        ctx.fillRect(c * 60, d * 46, 60, 46);
                    }
                    
                }else if(matrix[d][c] == 9){

                    if(c === animate_pair_x && d === animate_pair_y && (animate_pair_x || animate_pair_x === 0) && (animate_pair_y || animate_pair_y === 0)){

                    ctx.fillStyle = 'lightBlue';

                    ctx.fillRect(c * 60, d * 46, 60, 46);

                    setTimeout(()=>{

                        ctx.fillStyle = 'MediumBlue';

                        ctx.fillRect(c * 60, d * 46, 60, 46);

                        setTimeout(()=>{

                            ctx.fillStyle = 'lightBlue';

                            ctx.fillRect(c * 60, d * 46, 60, 46);

                            setTimeout(()=>{ 

                                ctx.fillStyle = 'MediumBlue';

                                ctx.fillRect(c * 60, d * 46, 60, 46);

                                animate_pair_x = false;
                                animate_pair_y = false;

                                },400)   
                            },400)    
                        },400)

                    }else{

                        ctx.fillStyle = 'MediumBlue';

                        ctx.fillRect(c * 60, d * 46, 60, 46);
                    }
                }

        }
    }

    for(let a = 0; a <= 12; a++){

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';

        for(let b = 0; b <= 7; b++){

            ctx.strokeRect(a * 60, b * 46, 60, 46);

        }
    }
}


function pvp_drawParts(opt){

    if(!imbusyflag){

        return;
    }

    try{

    pvp_cont_part++;
    ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
    
    
    ani_ctx4.translate(torpedo[opt].part_x, torpedo[opt].part_y);
    ani_ctx4.rotate(torpedo[opt].angle);
    ani_ctx4.drawImage(torpedo[pvp_cont_part].src_part, ani_ctx4.canvas.width/2, ani_ctx4.canvas.height/2, 100, 100);
    
    if(pvp_cont_part === 7){
    
        ani_ctx4.restore();
        ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
    }

    }catch{

        return;
    }
}


function pvp_getRandomInt2(min, max) {

    let floor = Math.ceil(min);
    let coil = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
