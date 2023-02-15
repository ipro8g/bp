let end_flag, pvp_time = 0, matrix_discover_user, matrix_discover_rival, cont_user = 0, cont_rival = 0, pvp_cont_part = 0, pvp_num = -1, dom_user_name = "", dom_rival_name = "", iclock, cclock = 0, ani_canvas, ani_canvas2, ani_canvas3, ani_canvas4, ani_canvas_el, ani_canvas_el2, ani_canvas_el3, ani_canvas_el4, ani_ctx, ani_ctx2, ani_ctx3, ani_ctx4, torpedo, matrix_for_user, matrix_for_rival, iwaves, ipvp_waves, intro_vessel1, intro_vessel2, iden, iden_intro, intro_time, finish_game = false, end_game = false, msgn = "", animate_pair_x = false, animate_pair_y = false, test_flag = true;

const emergency_matrix = "[[0,0,0,0,0,0,0,0,0,0,0,0,0],[0,5,0,3,3,3,0,0,0,0,2,2,0],[0,5,0,0,0,0,0,0,0,0,0,0,0],[0,5,0,0,0,0,1,0,0,0,0,0,0],[0,5,0,0,0,0,0,0,0,0,0,0,0],[0,5,0,0,0,0,0,0,6,6,6,6,0],[0,0,0,0,0,0,0,0,6,6,6,6,0],[0,4,4,4,4,0,0,0,0,0,0,0,0]]";


// - - - - - - test

let test_buffer_vessels = '[{"sinked_user":false,"sinked_rival":false,"name_user":"I9 Class Submarine","name_rival":"Gato Class Submarine","src_h":"img/one.png","src_v":"img/one.png","src_jp_h":"img/one_jp.png","src_jp_v":"img/one_jp.png","v_al_user":false,"v_al_rival":false},{"sinked_user":false,"sinked_rival":false,"name_user":"Ukuru Class Frigate","name_rival":"Cannon Class Frigate","src_h":"img/two.png","src_v":"img/two_v.png","src_jp_h":"img/two_jp.png","src_jp_v":"img/two_jp_v.png","v_al_user":false,"v_al_rival":""},{"sinked_user":false,"sinked_rival":false,"name_user":"Akizuki Class Destroyer","name_rival":"Fletcher Class Destroyer","src_h":"img/three.png","src_v":"img/three_v.png","src_jp_h":"img/three_jp.png","src_jp_v":"img/three_jp_v.png","v_al_user":false,"v_al_rival":""},{"sinked_user":false,"sinked_rival":false,"name_user":"Takao Class Cruiser","name_rival":"Baltimore Class Cruiser","src_h":"img/four.png","src_v":"img/four_v.png","src_jp_h":"img/four_jp.png","src_jp_v":"img/four_jp_v.png","v_al_user":false,"v_al_rival":""},{"sinked_user":false,"sinked_rival":false,"name_user":"Yamato Class Battleship","name_rival":"North Carolina Class Battleship","src_h":"img/five.png","src_v":"img/five_v.png","src_jp_h":"img/five_jp.png","src_jp_v":"img/five_jp_v.png","v_al_user":false,"v_al_rival":""},{"sinked_user":false,"sinked_rival":false,"name_user":"Shokaku Class Carrier","name_rival":"Essex Class Carrier","src_h":"img/six.png","src_v":"img/six_v.png","src_jp_h":"img/six_jp.png","src_jp_v":"img/six_jp_v.png","v_al_user":false,"v_al_rival":""}]';



let test_rival_buffer_vessels = '[{"sinked_user":false,"sinked_rival":false,"name_user":"Gato Class Submarine","name_rival":"I9 Class Submarine","src_h":"img/one.png","src_v":"img/one.png","src_jp_h":"img/one_jp.png","src_jp_v":"img/one_jp.png","v_al_user":false,"v_al_rival":false},{"sinked_user":false,"sinked_rival":false,"name_user":"Cannon Class Frigate","name_rival":"Ukuru Class Frigate","src_h":"img/two.png","src_v":"img/two_v.png","src_jp_h":"img/two_jp.png","src_jp_v":"img/two_jp_v.png","v_al_user":false,"v_al_rival":""},{"sinked_user":false,"sinked_rival":false,"name_user":"Fletcher Class Destroyer","name_rival":"Akizuki Class Destroyer","src_h":"img/three.png","src_v":"img/three_v.png","src_jp_h":"img/three_jp.png","src_jp_v":"img/three_jp_v.png","v_al_user":false,"v_al_rival":""},{"sinked_user":false,"sinked_rival":false,"name_user":"Baltimore Class Cruiser","name_rival":"Takao Class Cruiser","src_h":"img/four.png","src_v":"img/four_v.png","src_jp_h":"img/four_jp.png","src_jp_v":"img/four_jp_v.png","v_al_user":false,"v_al_rival":""},{"sinked_user":false,"sinked_rival":false,"name_user":"North Carolina Class Battleship","name_rival":"Yamato Class Battleship","src_h":"img/five.png","src_v":"img/five_v.png","src_jp_h":"img/five_jp.png","src_jp_v":"img/five_jp_v.png","v_al_user":false,"v_al_rival":""},{"sinked_user":false,"sinked_rival":false,"name_user":"Essex Class Carrier","name_rival":"Shokaku Class Carrier","src_h":"img/six.png","src_v":"img/six_v.png","src_jp_h":"img/six_jp.png","src_jp_v":"img/six_jp_v.png","v_al_user":false,"v_al_rival":""}]';






// - - - - - - test






const buton_one = document.getElementById("buton_one");






let buffer_vessels = [
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

let flag_end_start=false;

let ctx = canvas.getContext("2d");

let board_matrix_rows_rival = [
    [],[],[],[],[],[],[],[]
    ];

let board_matrix_rows = [
    [],[],[],[],[],[],[],[]
    ];
    
let msj;

let vessel_img_ob = [
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
			
			




let img_vessel = new Image();

const img_vessel_sub = new Image();
img_vessel_sub.src = 'img/one.png';

const img_vessel_sub_jp = new Image();
img_vessel_sub_jp.src = 'img/one_jp.png';

const img_torpedo1 = new Image();
img_torpedo1.src = 'img/torpedo1.png';

const img_torpedo2 = new Image();
img_torpedo2.src = 'img/torpedo2.png';

const img_torpedo3 = new Image();
img_torpedo3.src = 'img/torpedo3.png';

const img_torpedo4 = new Image();
img_torpedo4.src = 'img/torpedo4.png';

const img_torpedo5 = new Image();
img_torpedo5.src = 'img/torpedo5.png';

const img_torpedo6 = new Image();
img_torpedo6.src = 'img/torpedo6.png';

const img_torpedo7 = new Image();
img_torpedo7.src = 'img/torpedo7.png';

const img_torpedo8 = new Image();
img_torpedo8.src = 'img/torpedo8.png';

const img_part1 = new Image();
img_part1.src = 'img/part1.png';

const img_part2 = new Image();
img_part2.src = 'img/part2.png';

const img_part3 = new Image();
img_part3.src = 'img/part3.png';

const img_part4 = new Image();
img_part4.src = 'img/part4.png';

const img_part5 = new Image();
img_part5.src = 'img/part5.png';

const img_part6 = new Image();
img_part6.src = 'img/part6.png';

const img_part7 = new Image();
img_part7.src = 'img/part7.png';






let vessel_img2, vessel_img2_v, num='', flag_align=false, cont1=0, start_flag=true, flag_define=false, current_img;

let shapes = shape_section.querySelectorAll("img");    





// - - - - - - - st1 script - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function resetBoard(){

board_matrix_rows = [
[],[],[],[],[],[],[],[]
];

    for(let m=0;m<=12;m++){
	for(let n=0;n<=7;n++){
		board_matrix_rows[m,n].push(0); 
        
	}
}

}





function drawScenario(){

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





function start(){
    
    count1 = 0;
    
    let shape_section = document.getElementById("shape_section");
    
    let shapes = shape_section.querySelectorAll("img");    
    
    shapes.forEach((shape)=>{
    
        shape.setAttribute("onclick", "defineVessel("+ count1 +", this)");
        
        count1++;
    })
    
    buton_one.className = "buton1";
    buton_one.src = "img/undo.svg";
    buton_one.setAttribute("onclick", "undoPos()");
    buton_one.setAttribute("title", "Undo");
    
    resetBoard();

    start_flag=true;

    for(let p=0;p<=5;p++){
            vessel_img_ob[p].is_set=false;
        }

    drawScenario();

    canvas.addEventListener('click', getCoords);

}

function switchAlign(){

if(!flag_define){
    return;
}

switch(flag_align){
    case false:

    flag_align=true;
    vessel_img2.className = vessel_img_ob[num].class_v;
    
    break;

    case true:
    flag_align=false;
    vessel_img2.className = vessel_img_ob[num].class_h;
    
    break;
}
}

function defineVessel(n, el_img){

if(demoflag){
    
    monitor.removeChild(demo_el);
    demoflag = false;
}



current_img = el_img;

num=n;

flag_align=false;

if(start_flag==false){
monitor.removeChild(vessel_img);
monitor.removeChild(vessel_img_v);
}

vessel_img = document.createElement('img');
vessel_img_v = document.createElement('img');

vessel_img.setAttribute('src', vessel_img_ob[n].src_h);
vessel_img_v.setAttribute('src', vessel_img_ob[n].src_v);

vessel_img.setAttribute('class', vessel_img_ob[n].class_h);
vessel_img_v.setAttribute('class', vessel_img_ob[n].class_v_v);

vessel_img.setAttribute('onclick', 'switchAlign()');

vessel_img.setAttribute('style', 'cursor:pointer;float:left;');
vessel_img.setAttribute('title', 'Alignment');


vessel_img_v.setAttribute('style', 'display:none;');

vessel_img.setAttribute('id', 'vessel_img');
vessel_img_v.setAttribute('id', 'vessel_img_v');

monitor.appendChild(vessel_img);
monitor.appendChild(vessel_img_v);

vessel_img2 = document.getElementById("vessel_img");
vessel_img2_v = document.getElementById("vessel_img_v");

flag_define=true;

start_flag=false;

}

function  getCoords(event){

    

    let msj;

        if((cont1<6)&&(flag_define==false)){
                num='';
                
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

        placeVessel(num, click_x, click_y);
    }catch(err){

        return;
    }

setTimeout(preConf, 500);

}



function canvas_instantiate(){

    ani_canvas = document.getElementById("ani_canvas");
    ani_canvas2 = document.getElementById("ani_canvas2");
    ani_canvas3 = document.getElementById("ani_canvas3");
    ani_canvas4 = document.getElementById("ani_canvas4"); 
    
    
    
    ani_canvas_el = document.createElement('canvas');
    ani_canvas_el.setAttribute("height", "250px");
    ani_canvas_el.setAttribute("style", "box-shadow:0 0 10px 10px DarkCyan;cursor:none;display:none;position:absolute;z-index:1;");
    ani_canvas_el.setAttribute("id", "ani_canvas");

    monitor.appendChild(ani_canvas_el);


    ani_canvas_el2 = document.createElement('canvas');
    ani_canvas_el2.setAttribute("height", "250px");
    ani_canvas_el2.setAttribute("style", "box-shadow:0 0 10px 10px DarkCyan;cursor:none;display:none;position:absolute;z-index:3;");
    ani_canvas_el2.setAttribute("id", "ani_canvas2");

    monitor.appendChild(ani_canvas_el2);


    ani_canvas_el3 = document.createElement('canvas');
    ani_canvas_el3.setAttribute("height", "250px");
    ani_canvas_el3.setAttribute("style", "box-shadow:0 0 10px 10px DarkCyan;cursor:none;display:none;position:absolute;z-index:2;");
    ani_canvas_el3.setAttribute("id", "ani_canvas3");

    monitor.appendChild(ani_canvas_el3);

    ani_canvas_el4 = document.createElement('canvas');
    ani_canvas_el4.setAttribute("height", "250px");
    ani_canvas_el4.setAttribute("style", "box-shadow:0 0 10px 10px DarkCyan;cursor:none;display:none;position:absolute;z-index:2;");
    ani_canvas_el4.setAttribute("id", "ani_canvas4");

    monitor.appendChild(ani_canvas_el4);


    ani_canvas = document.getElementById("ani_canvas");
    ani_canvas2 = document.getElementById("ani_canvas2");
    ani_canvas3 = document.getElementById("ani_canvas3");

    ani_canvas4 = document.getElementById("ani_canvas4");
    
    ani_ctx = ani_canvas.getContext("2d");
    
    ani_ctx2 = ani_canvas2.getContext("2d");

    ani_ctx3 = ani_canvas3.getContext("2d");

    ani_ctx4 = ani_canvas4.getContext("2d"); 
    
torpedo = [
{
    w:50,
    h:50,
    x:0,
    y:0,
    x_ini:0,
    y_ini:0,
    src:img_torpedo1,
    speed_x:21,

    speed_y:18,
    part_x:140,
    part_y:-90,
    angle:0.785,
    src_part:img_part1
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(8/10),
    y:0,
    x_ini:ani_ctx3.canvas.width*(8/10),
    y_ini:0,
    src:img_torpedo2,
    speed_x:-21,
    speed_y:18,
    part_x:370,
    part_y:170,
    angle:2.356,
    src_part:img_part2
},

{
    w:50,
    h:50,
    x:0,
    y:ani_ctx3.canvas.height*(8/10),
    x_ini:0,
    y_ini:ani_ctx3.canvas.height*(8/10),
    src:img_torpedo3,
    speed_x:21,
    speed_y:-18,
    part_x:-65,
    part_y:110,
    angle:-0.785,
    src_part:img_part3
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(8/10),
    y:ani_ctx3.canvas.height*(8/10),
    x_ini:ani_ctx3.canvas.width*(8/10),
    y_ini:ani_ctx3.canvas.height*(8/10),
    src:img_torpedo4,
    speed_x:-21,
    speed_y:-18,

    part_x:155,
    part_y:360,
    angle:-2.356,
    src_part:img_part4
},
{
    w:50,
    h:50,
    x:0,
    y:ani_ctx3.canvas.height*(21/50),
    x_ini:0,
    y_ini:ani_ctx3.canvas.height*(21/50),
    src:img_torpedo5,
    speed_x:21,
    speed_y:0,
    part_x:-5,
    part_y:-50,
    angle:0,
    src_part:img_part5
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(21/50),

    y:0,
    x_ini:ani_ctx3.canvas.width*(21/50),
    y_ini:0,
    src:img_torpedo6,
    speed_x:0,
    speed_y:19,
    part_x:320,
    part_y:-60,
    angle:1.57,
    src_part:img_part6
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(8/10),
    y:ani_ctx3.canvas.height*(21/50),
    x_ini:ani_ctx3.canvas.width*(8/10),
    y_ini:ani_ctx3.canvas.height*(21/50),
    src:img_torpedo7,

    speed_x:-21,
    speed_y:0,
    part_x:320,
    part_y:298,
    angle:3.142,
    src_part:img_part7
},
{
    w:50,
    h:50,
    x:ani_ctx3.canvas.width*(21/50),
    y:ani_ctx3.canvas.height*(8/10),
    x_ini:ani_ctx3.canvas.width*(21/50),
    y_ini:ani_ctx3.canvas.height*(8/10),
    src:img_torpedo8,

    speed_x:0,
    speed_y:-19,
    part_x:-20,
    part_y:265,
    angle:-1.57,
    src_part:img_part1
}
]; 
}



function placeVessel(ship, x, y){


let num = ship;
let click_x = x;
let click_y = y;

switch(flag_align){

case false:

    switch(num){

        case 0:
        if((board_matrix_rows[click_y][click_x]!=0)||(vessel_img_ob[num].is_set==true)){
        click_x='';
        click_y='';
        return;   
        }else{
        board_matrix_rows[click_y][click_x]=1;
        vessel_img_ob[num].is_set=true;
        graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
        graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
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
                graphicVessel(click_y, click_x);
                click_x='';
                click_y='';
		        return;
            }

        break;


    }

break;


}



}

function graphicVessel(coord_y, coord_x){

let click_x=coord_x;
let click_y=coord_y;
let g=num;

switch(flag_align){

case false:

    if(g==5){

        ctx.drawImage(vessel_img2, (click_x)*60, (click_y)*46, 240, 92);
        vessel_img_ob[g].v_al = false;
        msj = document.createElement('p');
        msj.innerText = vessel_img_ob[g].name_us+" is positioned.";
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
    }else if(g!=5){
        
        ctx.drawImage(vessel_img2, (click_x)*60, (click_y)*46, (g+1)*60, 46);
        vessel_img_ob[g].v_al = false;
        msj = document.createElement('p');
        msj.innerText = vessel_img_ob[g].name_us+" is positioned.";
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
        msj.innerText = vessel_img_ob[g].name_us+" is positioned.";
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
    }else if(g!=5){

        ctx.drawImage(vessel_img2_v, (click_x)*60, (click_y)*46, 60, (g+1)*46);
        vessel_img_ob[g].v_al = true;
        msj = document.createElement('p');
        msj.innerText = vessel_img_ob[g].name_us+" is positioned.";
        console_user.appendChild(msj);
        console_user.scrollTop = console_user.scrollHeight;
        cont1++;
        }
break;


}



shapes[g].style.display='none';

flag_define=false;



num='';

vessel_img.style.display='none';
vessel_img_v.style.display='none';




}

function preConf(){
            let cont_final=0;

            for(let n=0;n<=5;n++){

                if(vessel_img_ob[n].is_set===true){
                    cont_final++;
                }

            }

            if(cont_final===6 && !imbusyflag){
                confPos();
                return;
            }
}


function confPos(){


    let res = confirm('Is this OK?');

    if(!res){

        undoPos();

    }else if(res){

        for(let h=0;h<=5;h++){
        
            buffer_vessels[h].name_user = vessel_img_ob[h].name_us;
            buffer_vessels[h].name_rival = vessel_img_ob[h].name_jp;
            buffer_vessels[h].v_al_user = vessel_img_ob[h].v_al;
            buffer_vessels[h].src_h = vessel_img_ob[h].src_h;
            buffer_vessels[h].src_v = vessel_img_ob[h].src_v; 
            buffer_vessels[h].src_jp_h = vessel_img_ob[h].src_jp_h;
            buffer_vessels[h].src_jp_v = vessel_img_ob[h].src_jp_v; 
        }
        
        cont1=0;
        canvas.removeEventListener('click', getCoords);       

        try{

            stageTwo();
        }catch{

            end_flag = false;
    
            waves = setInterval(waves, 30);

            computer_game_flag = true;

            board_matrix_rows_rival = [
                [],[],[],[],[],[],[],[]
                ];



            cont1_rival = 0;

            for(let m=0;m<=12;m++){

                for(let n=0;n<=7;n++){

                    board_matrix_rows_rival[m,n].push(0); 
                }
            }

            board_matrix_rows_rival = JSON.parse(emergency_matrix);                
        }
    }
}




function undoPos(){

    cont1 = 0;
    monitor.removeChild(vessel_img);
    monitor.removeChild(vessel_img_v);
    vessel_img2 = '';
    vessel_img2_v = '';
    num = '';  
    flag_align = false;
    start_flag = true;
    flag_define = false;


    let shape_section = document.getElementById("shape_section");
    

    for(let c=0;c<=shapes.length-1;c++){

        shapes[c].style.display="block";
    }

    start();
}



