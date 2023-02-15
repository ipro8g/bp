






function startpvp(){
    
    ctx = canvas.getContext("2d");

    pvp_drawScenario(); 
    
    pvp_resetBoard(); 
    
    
    
    count1 = 0;
    
    vessel_img = null;
    vessel_img_v = null;
    vessel_img2 = null;
    vessel_img_v2 = null;
    
    shapes.forEach((shape)=>{
    
        shape.style.display = "block";
    
        shape.setAttribute("onclick", "pvp_defineVessel("+ count1 +", this)");
        
        count1++;
    })
    
    buton_one.className = "buton1";
    buton_one.src = "img/undo.svg";
    buton_one.setAttribute("title", "Undo");
    
    buton_one.setAttribute("onclick", "pvp_undoPos()");
    
    canvas.addEventListener('click', pvp_getCoords); 
    
}

function pvp_drawScenario(){

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = 'MidnightBlue';

for(let c=0; c<=12; c++){
    for(let d=0; d<=7; d++){
        ctx.fillRect(c*60, d*46, 60, 46);

    }
}

for(let a=0; a<=12; a++){

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';

    for(let b=0; b<=7; b++){

    ctx.strokeRect(a*60, b*46, 60, 46);

    }
}
}



function pvp_confPos(){

    if(cont1 === 6){
    
        let ob76 = {
    
            "method": "matrix_ready",
            "navy":duel_ob.navy,
            "rival_navy":duel_ob.rival_navy,
            "user_id":duel_ob.user_id,
            "rival_user_id":duel_ob.rival_user_id,
            "user_name":duel_ob.user_name,
            "rival_user_name":duel_ob.rival_user_name,
            "matrix":-1,
            "rival_matrix":-1,
            "points":0,
            "rival_points":0,
            "score":0,
            "rival_score":0,
            "fire_id":-1,
            "game_index":-1,
            "channel":false,
            "game_id":duel_ob.game_id  
        
        }
        
        if(imrivalflag){
        
            ob76.rival_matrix = board_matrix_rows;
        }else if(!imrivalflag){
        
            ob76.matrix = board_matrix_rows;
        }
        
        if(confirm("is this OK?")){
        
            for(let h=0; h<=5; h++){
            
                if(imusflag){
                
                    buffer_vessels[h].name_user = vessel_img_ob[h].name_us;
                    buffer_vessels[h].name_rival = vessel_img_ob[h].name_jp;
                }else{
                
                    buffer_vessels[h].name_rival = vessel_img_ob[h].name_us;
                    buffer_vessels[h].name_user = vessel_img_ob[h].name_jp;
                }

                buffer_vessels[h].src_h = vessel_img_ob[h].src_h;
                buffer_vessels[h].src_v = vessel_img_ob[h].src_v;
                buffer_vessels[h].src_jp_h = vessel_img_ob[h].src_jp_h;
                buffer_vessels[h].src_jp_v = vessel_img_ob[h].src_jp_v;
                buffer_vessels[h].v_al_user = vessel_img_ob[h].v_al;
            }
        
            blockundo = true;

            duel_ob = ob76;

            let ready_result = false;

            while(!ready_result){

            ready_result = send_matrix_ready(ob76).then(()=>{

                                    if(ready_result){

                                        msgn = "awaiting for your rival";
                                        notify_alert(msgn);
                                    }
                                });
            } 
        }else{
    
            pvp_undoPos();
        }
    }
}


async function send_matrix_ready(ob67){

    xhr = new XMLHttpRequest();
    xhr.open("POST", "handler.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send(JSON.stringify(ob67));

    xhr.onreadystatechange = ()=>{

        if (xhr.readyState === 4) {
        
                const res_ob76 = JSON.parse(xhr.response);

                return res_ob76.result;
        }
    }
}


function pvp_resetBoard(){

board_matrix_rows = [
[],[],[],[],[],[],[],[]
];

    for(let m=0;m<=12;m++){
	for(let n=0;n<=7;n++){
		board_matrix_rows[m,n].push(0); 
        
	}
}

}



function pvp_graphicVessel(coord_y, coord_x){



let num = pvp_num;
let click_x=coord_x;
let click_y=coord_y;
let g=num;

let msg_text = " is positioned.";

if(!imrivalflag && duel_ob.navy === "jp"){

    msg_text = vessel_img_ob[g].name_jp + msg_text;
}else if(imrivalflag && duel_ob.navy === "jp"){

     msg_text = vessel_img_ob[g].name_us + msg_text;
}else if(!imrivalflag && duel_ob.navy === "us"){

     msg_text = vessel_img_ob[g].name_us + msg_text;
}else{

     msg_text = vessel_img_ob[g].name_jp + msg_text;
}


switch(flag_align){

case false:

    if(g==5){

        ctx.drawImage(vessel_img2, (click_x)*60, (click_y)*46, 240, 92);
        vessel_img_ob[g].v_al = false;
        msj = document.createElement('p');
        msj.innerText = msg_text;
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
    }else if(g!=5){
        
        ctx.drawImage(vessel_img2, (click_x)*60, (click_y)*46, (g+1)*60, 46);
        vessel_img_ob[g].v_al = false;
        msj = document.createElement('p');
        msj.innerText = msg_text;
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
        }
break;


case true:
    
    if(g==5){

        ctx.drawImage(vessel_img2_v, (click_x)*60, (click_y)*46, 120, 184);
        vessel_img_ob[g].v_al = true;
        msj = document.createElement('p');
        msj.innerText = msg_text;
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
    }else if(g!=5){

        ctx.drawImage(vessel_img2_v, (click_x)*60, (click_y)*46, 60, (g+1)*46);
        vessel_img_ob[g].v_al = true;
        msj = document.createElement('p');
        msj.innerText = msg_text;
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
        }
break;


}

shapes[g].style.display='none';

flag_define=false;



pvp_num = -1;

vessel_img.style.display='none';

pvp_confPos();


}




function pvp_getCoords(event){

    let msj;

        if(!flag_define){
                
                msgn = "click over any vessel to select it first";
                notify_alert(msgn);

                return;
        }

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

    

    try{
    
        pvp_placeVessel(pvp_num, click_x, click_y);
    }catch(err){
    
        return;
    }
}










function pvp_undoPos(){

    if(blockundo){
    
        let msg = "not valid"; 
        notify_alert(msg);
    
        return;
    }

    cont1 = 0;
    
    if(vessel_img){
    
        monitor.removeChild(vessel_img);
        monitor.removeChild(vessel_img_v);
    }
    
    
    vessel_img = null;
    vessel_img_v = null;
    vessel_img2 = null;
    vessel_img_v2 = null;
    
    pvp_num = -1; 
     
    flag_align=false;
    flag_define=false;


    shape_section = document.getElementById("shape_section");
    
    shapes = shape_section.querySelectorAll("img");  

    
    for(let a = 0; a < 6; a++){
        
        vessel_img_ob[a].is_set = false;
    }
    

    for(let c = 0; c <= shapes.length-1; c++){
    
        shapes[c].style.display="block";
    }
    
    pvp_drawScenario(); 
    
    pvp_resetBoard(); 
}






function pvp_defineVessel(n, img){

    flag_align = false;

    pvp_num = n;

    if(vessel_img){

        monitor.removeChild(vessel_img);
        monitor.removeChild(vessel_img_v);
    }

    vessel_img = document.createElement('img');
    vessel_img_v = document.createElement('img');

    vessel_img.setAttribute('src', vessel_img_ob[n].src_h);
    vessel_img_v.setAttribute('src', vessel_img_ob[n].src_v);

    vessel_img.setAttribute('class', vessel_img_ob[n].class_h);
    vessel_img_v.setAttribute('class', vessel_img_ob[n].class_v_v);

    vessel_img.setAttribute('onclick', 'pvp_switchAlign('+ n +', this)');

    vessel_img.setAttribute('style', 'cursor:pointer;float:left;');
    vessel_img.setAttribute('title', 'Alignment');


    vessel_img_v.setAttribute('style', 'display:none;');

    vessel_img.setAttribute('id', 'vessel_img');
    vessel_img_v.setAttribute('id', 'vessel_img_v');

    monitor.appendChild(vessel_img);
    monitor.appendChild(vessel_img_v);

    vessel_img2 = document.getElementById("vessel_img");
    vessel_img2_v = document.getElementById("vessel_img_v");
    
    flag_define = true;
}

function pvp_switchAlign(num, img){

    if(!flag_align){
    
        flag_align = true;
        
        img.className = vessel_img_ob[num].class_v;
    }else{
    
        flag_align = false;
        
        img.className = vessel_img_ob[num].class_h;
    }
}
























function pvp_clear_variables(){

end_duel_flag = false;

show_once = true;

await_flag1 = false;

score = 0;

rival_score = 0;

top_light.innerText = 0;

down_light.innerText = 0;

if(ani_ctx){

    ani_ctx.clearRect(0, 0, ani_ctx.canvas.width, ani_ctx.canvas.height);
}

if(ani_ctx2){

    ani_ctx2.clearRect(0, 0, ani_ctx2.canvas.width, ani_ctx2.canvas.height);
}

if(ani_ctx3){

    ani_ctx3.clearRect(0, 0, ani_ctx3.canvas.width, ani_ctx3.canvas.height);
}

if(ani_ctx4){

    ani_ctx4.clearRect(0, 0, ani_ctx4.canvas.width, ani_ctx4.canvas.height);
}

if(iden_intro){

    clearInterval(iden_intro);
}

if(iwaves){

    clearInterval(iwaves);
}

if(ipvp_waves){

    clearInterval(ipvp_waves);
}

if(iclock){

    clearInterval(iclock);
}
    
    if(ani_canvas){
    
        ani_canvas = null;
    }

    if(ani_canvas2){
    
        ani_canvas2 = null;
    }

    if(ani_canvas3){
    
        ani_canvas3 = null;
    }

    if(ani_canvas4){
    
        ani_canvas4 = null;
    }

    ani_canvas_el = null;
    ani_canvas_el2 = null;
    ani_canvas_el3 = null;
    ani_canvas_el4 = null;

    if(ani_canvas){
    
        monitor.removeChild(ani_canvas);
    }
    
    if(ani_canvas_el){
    
        monitor.removeChild(ani_canvas_el);
    }

    if(ani_canvas_el2){
    
        monitor.removeChild(ani_canvas_el2);
    }

    if(ani_canvas_el3){
    
        monitor.removeChild(ani_canvas_el3);
    }

    if(ani_canvas_el4){
    
        monitor.removeChild(ani_canvas_el4);
    }    

torpedo = null;

intro_vessel1 = null;
intro_vessel2 = null;

tl_user.innerText = "";
    
tl_clock.innerText = "";
    
tl_rival.innerText = "";

cclock = 0;

last_fire = false;

blockundo = false;

pvp_num = -1;

dom_user_name = "";

dum_rival_name = "";

shape_section = document.getElementById("shape_section");
    
shapes = shape_section.querySelectorAll("img");  

cont1 = 0;

flag_align = false;

flag_define = false;

board_matrix_rows = [
    [],[],[],[],[],[],[],[]
];
    
matrix_discover_rival = [
    [],[],[],[],[],[],[],[]
];

matrix_discover_user = [
    [],[],[],[],[],[],[],[]
];

for(let m=0;m<=12;m++){

	for(let n=0;n<=7;n++){
	
		matrix_discover_rival[m,n].push(0);
		matrix_discover_user[m,n].push(0); 
    }       
}
    

vessel_img_ob = [
			{
			class_h:'vessel_img_h1',
			class_v:'vessel_img_v1',
			class_v_v:'vessel_img_v1_v',
			src_h:'img/one.png',
			src_v:'img/one.png',
			src_jp_h:'img/one_jp.png',
			src_jp_v:'img/one_jp.png',
            is_set:false,
			v_al:false,
            name_us:'Gato Class Submarine',
            name_jp:'I9 Class Submarine'
			},
			{
			class_h:'vessel_img_h2',
			class_v:'vessel_img_v2',
			class_v_v:'vessel_img_v2_v',
			src_h:'img/two.png',
			src_v:'img/two_v.png',
			src_jp_h:'img/two_jp.png',
			src_jp_v:'img/two_jp_v.png',
            is_set:false,
			v_al:false,
            name_us:'Cannon Class Frigate',
            name_jp:'Ukuru Class Frigate'
			},
			{
			class_h:'vessel_img_h3',
			class_v:'vessel_img_v3',
			class_v_v:'vessel_img_v3_v',
			src_h:'img/three.png',
			src_v:'img/three_v.png',
			src_jp_h:'img/three_jp.png',
			src_jp_v:'img/three_jp_v.png',
            is_set:false,
			v_al:false,
            name_us:'Fletcher Class Destroyer',
            name_jp:'Akizuki Class Destroyer'
			},
			{
			class_h:'vessel_img_h4',
			class_v:'vessel_img_v4',
			class_v_v:'vessel_img_v4_v',
			src_h:'img/four.png',
			src_v:'img/four_v.png',
			src_jp_h:'img/four_jp.png',
			src_jp_v:'img/four_jp_v.png',
            is_set:false,
			v_al:false,
            name_us:'Baltimore Class Cruiser',
            name_jp:'Takao Class Cruiser'
			},
			{
			class_h:'vessel_img_h5',
			class_v:'vessel_img_v5',
			class_v_v:'vessel_img_v5_v',
			src_h:'img/five.png',
			src_v:'img/five_v.png',
			src_jp_h:'img/five_jp.png',
			src_jp_v:'img/five_jp_v.png',
            is_set:false,
			v_al:false,
            name_us:'North Carolina Class Battleship',
            name_jp:'Yamato Class Battleship'
			},
			{
			class_h:'vessel_img_h6',
			class_v:'vessel_img_v6',
			class_v_v:'vessel_img_v6_v',
			src_h:'img/six.png',
			src_v:'img/six_v.png',
			src_jp_h:'img/six_jp.png',
			src_jp_v:'img/six_jp_v.png',
            is_set:false,
			v_al:false,
            name_us:'Essex Class Carrier',
            name_jp:'Shokaku Class Carrier'
			}
];


buffer_vessels = [
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    src_jp_h:'',
    src_jp_v:'',
    v_al_user:'',
    v_al_rival:false
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    src_jp_h:'',
    src_jp_v:'',
    v_al_user:'',
    v_al_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    src_jp_h:'',
    src_jp_v:'',
    v_al_user:'',
    v_al_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    src_jp_h:'',
    src_jp_v:'',
    v_al_user:'',
    v_al_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    src_jp_h:'',
    src_jp_v:'',
    v_al_user:'',
    v_al_rival:''
    },
    {
    sinked_user:false,
    sinked_rival:false,
    name_user:'',
    name_rival:'',
    src_h:'',
    src_v:'',
    src_jp_h:'',
    src_jp_v:'',
    v_al_user:'',
    v_al_rival:''
    }
];

}










function pvp_placeVessel(ship, x, y){




let num = ship;
let click_x = x;
let click_y = y;



switch(flag_align){

case false:

    switch(num){

        case 0:
        if((board_matrix_rows[click_y][click_x] !== 0) || vessel_img_ob[num].is_set){
        click_x='';
        click_y='';
        return;   
        }else{
        board_matrix_rows[click_y][click_x]=1;
        vessel_img_ob[num].is_set=true;
        pvp_graphicVessel(click_y, click_x);
        click_x='';
        click_y='';
		return;
        }
        break;

        case 1:

            if((click_x==12)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 2;
                board_matrix_rows[click_y][click_x+1] = 2;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 2:

            if(click_x>=11||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y][click_x+2]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 3;
                board_matrix_rows[click_y][click_x+1] = 3;
                board_matrix_rows[click_y][click_x+2] = 3;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 3:

            if((click_x>=10)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y][click_x+2]!=0)||(board_matrix_rows[click_y][click_x+3]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 4;
                board_matrix_rows[click_y][click_x+1] = 4;
                board_matrix_rows[click_y][click_x+2] = 4;
                board_matrix_rows[click_y][click_x+3] = 4;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 4:

        if((click_x>=9)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y][click_x+2]!=0)||(board_matrix_rows[click_y][click_x+3]!=0)||(board_matrix_rows[click_y][click_x+4]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 5;
                board_matrix_rows[click_y][click_x+1] = 5;
                board_matrix_rows[click_y][click_x+2] = 5;
                board_matrix_rows[click_y][click_x+3] = 5;
                board_matrix_rows[click_y][click_x+4] = 5;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 5:

            if((click_x>=10)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y][click_x+2]!=0)||(board_matrix_rows[click_y][click_x+3]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+1][click_x+1]!=0)||(board_matrix_rows[click_y+1][click_x+2]!=0)||(board_matrix_rows[click_y+1][click_x+3]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 6;
                board_matrix_rows[click_y][click_x+1] = 6;
                board_matrix_rows[click_y][click_x+2] = 6;
                board_matrix_rows[click_y][click_x+3] = 6;
                board_matrix_rows[click_y+1][click_x] = 6;
                board_matrix_rows[click_y+1][click_x+1] = 6;
                board_matrix_rows[click_y+1][click_x+2] = 6;
                board_matrix_rows[click_y+1][click_x+3] = 6;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

    }

break;


case true:

    switch(num){

        case 0:
        if((board_matrix_rows[click_y][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
        click_x='';
        click_y='';
        return;   
        }else{
        board_matrix_rows[click_y][click_x]=1;
        vessel_img_ob[num].is_set=true;
        pvp_graphicVessel(click_y, click_x);
        click_x='';
        click_y='';
		return;
        }
        break;

        case 1:

            if((click_y==7)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 2;
                board_matrix_rows[click_y+1][click_x] = 2;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 2:

            if(click_y>=6||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+2][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 3;
                board_matrix_rows[click_y+1][click_x] = 3;
                board_matrix_rows[click_y+2][click_x] = 3;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 3:

            if((click_y>=5)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+2][click_x]!=0)||(board_matrix_rows[click_y+3][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 4;
                board_matrix_rows[click_y+1][click_x] = 4;
                board_matrix_rows[click_y+2][click_x] = 4;
                board_matrix_rows[click_y+3][click_x] = 4;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 4:

        if((click_y>=4)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+2][click_x]!=0)||(board_matrix_rows[click_y+3][click_x]!=0)||(board_matrix_rows[click_y+4][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 5;
                board_matrix_rows[click_y+1][click_x] = 5;
                board_matrix_rows[click_y+2][click_x] = 5;
                board_matrix_rows[click_y+3][click_x] = 5;
                board_matrix_rows[click_y+4][click_x] = 5;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;

        case 5:

            if((click_y>=5)||(board_matrix_rows[click_y][click_x]!=0)||(board_matrix_rows[click_y+1][click_x]!=0)||(board_matrix_rows[click_y+2][click_x]!=0)||(board_matrix_rows[click_y+3][click_x]!=0)||(board_matrix_rows[click_y][click_x+1]!=0)||(board_matrix_rows[click_y+1][click_x+1]!=0)||(board_matrix_rows[click_y+2][click_x+1]!=0)||(board_matrix_rows[click_y+3][click_x+1]!=0)||(vessel_img_ob[num].is_set==true)){
                click_x='';
                click_y='';
                num='';
		        return;
            }else{
                board_matrix_rows[click_y][click_x] = 6;
                board_matrix_rows[click_y+1][click_x] = 6;
                board_matrix_rows[click_y+2][click_x] = 6;
                board_matrix_rows[click_y+3][click_x] = 6;
                board_matrix_rows[click_y][click_x+1] = 6;
                board_matrix_rows[click_y+1][click_x+1] = 6;
                board_matrix_rows[click_y+2][click_x+1] = 6;
                board_matrix_rows[click_y+3][click_x+1] = 6;
                vessel_img_ob[num].v_al=flag_align;
                vessel_img_ob[num].is_set=true;
                pvp_graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;


    }

break;


}



}

