let cont1_rival;

let vessel_img_ob_rival = [
    {
    is_set:false,
    v_al:false
    },
    {
    is_set:false,
    v_al:false
    },
    {
    is_set:false,
    v_al:false
    },
    {
    is_set:false,
    v_al:false
    },
    {
    is_set:false,
    v_al:false
    },
    {
    is_set:false,
    v_al:false
    }
];





function stageTwo(){

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

    do{


    let res =  getCoords_rival(cont1_rival);

    if(res){

        cont1_rival++;
    }


    }while(cont1_rival<=5);

        for(let j=0;j<=5;j++){

            buffer_vessels[j].v_al_rival=vessel_img_ob_rival[j].v_al;
    }



stageThree();

}

function getRandomInt(min, max) {

    let floor = Math.ceil(min);
    let coil = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCoords_rival(number){

let vessel_rival = number;
let click_y_rival = getRandomInt(1, 8);
let click_x_rival = getRandomInt(1, 13);
let align_rival = getRandomInt(0, 1);

    try{

        let is_ok = rivalMatrix(vessel_rival, align_rival, click_y_rival, click_x_rival);
        return is_ok;

    }catch(err){

    return false;
    }

}


function rivalMatrix(vessel, align, y, x){

let num = vessel;
let click_x = x-1;
let click_y = y-1;
let flag_align;

if(align===1){
    flag_align=true;
    
}else if(align===0){
    flag_align=false;
    
}

switch(flag_align){

case false:

    switch(num){

        case 0:
        if((board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)){
        return false;  
        }

        else if((board_matrix_rows_rival[click_y][click_x]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
        
        return false;   
        }else{
        board_matrix_rows_rival[click_y][click_x]=1;
        vessel_img_ob_rival[num].is_set=true;
        
		return true;
        }
        break;

        case 1:

        if((board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)){
        return false;  
        }

        else if((click_x===12)||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 2;
                board_matrix_rows_rival[click_y][click_x+1] = 2;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

        case 2:

        if((board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+2]!==0)){
        return false;  
        }

        else if(click_x>=11||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (vessel_img_ob_rival[num].is_set==true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 3;
                board_matrix_rows_rival[click_y][click_x+1] = 3;
                board_matrix_rows_rival[click_y][click_x+2] = 3;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

        case 3:

        if((board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+3]!==0)){
        return false;  
        }

        else if((click_x>=10)||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y][click_x+3]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 4;
                board_matrix_rows_rival[click_y][click_x+1] = 4;
                board_matrix_rows_rival[click_y][click_x+2] = 4;
                board_matrix_rows_rival[click_y][click_x+3] = 4;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

        case 4:

        if((board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+4]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+4]!==0)){
        return false;  
        }

        else if((click_x>=9)||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y][click_x+4]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 5;
                board_matrix_rows_rival[click_y][click_x+1] = 5;
                board_matrix_rows_rival[click_y][click_x+2] = 5;
                board_matrix_rows_rival[click_y][click_x+3] = 5;
                board_matrix_rows_rival[click_y][click_x+4] = 5;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

        case 5:

        if((board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+3]!==0)){
        return false;  
        }

        else if((click_x>=10)||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+3]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 6;
                board_matrix_rows_rival[click_y][click_x+1] = 6;
                board_matrix_rows_rival[click_y][click_x+2] = 6;
                board_matrix_rows_rival[click_y][click_x+3] = 6;
                board_matrix_rows_rival[click_y+1][click_x] = 6;
                board_matrix_rows_rival[click_y+1][click_x+1] = 6;
                board_matrix_rows_rival[click_y+1][click_x+2] = 6;
                board_matrix_rows_rival[click_y+1][click_x+3] = 6;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

    }

break;


case true:

    switch(num){

        case 0:
        if((board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)){
            return false; 
        }

        else if((board_matrix_rows_rival[click_y][click_x]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
        
        return false;   
        }else{
        board_matrix_rows_rival[click_y][click_x]=1;
        vessel_img_ob_rival[num].is_set=true;
        
		return true;
        }
        break;

        case 1:

        if((board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)){
            return false; 
        }

        else if((click_y==7)||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 2;
                board_matrix_rows_rival[click_y+1][click_x] = 2;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

        case 2:

        if((board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+2]!==0)){
            return false; 
        }

        else if(click_y>=6||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 3;
                board_matrix_rows_rival[click_y+1][click_x] = 3;
                board_matrix_rows_rival[click_y+2][click_x] = 3;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

        case 3:

        if((board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+2]!==0)){
            return false; 
        }

        else if((click_y>=5)||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 4;
                board_matrix_rows_rival[click_y+1][click_x] = 4;
                board_matrix_rows_rival[click_y+2][click_x] = 4;
                board_matrix_rows_rival[click_y+3][click_x] = 4;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

        case 4:

        if((board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+4][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+4][click_x+2]!==0)){
            return false; 
        }

        else if((click_y>=4)||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x]!==0)||
        (board_matrix_rows_rival[click_y+4][click_x]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 5;
                board_matrix_rows_rival[click_y+1][click_x] = 5;
                board_matrix_rows_rival[click_y+2][click_x] = 5;
                board_matrix_rows_rival[click_y+3][click_x] = 5;
                board_matrix_rows_rival[click_y+4][click_x] = 5;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;

        case 5:

        if((board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+3]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+2]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+3]!==0)){
            return false; 
        }

        else if((click_y>=5)||
        (board_matrix_rows_rival[click_y][click_x]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x]!==0)||
        (board_matrix_rows_rival[click_y][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+1][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+2][click_x+1]!==0)||
        (board_matrix_rows_rival[click_y+3][click_x+1]!==0)||
        (vessel_img_ob_rival[num].is_set===true)){
                
		        return false;
            }else{
                board_matrix_rows_rival[click_y][click_x] = 6;
                board_matrix_rows_rival[click_y+1][click_x] = 6;
                board_matrix_rows_rival[click_y+2][click_x] = 6;
                board_matrix_rows_rival[click_y+3][click_x] = 6;
                board_matrix_rows_rival[click_y][click_x+1] = 6;
                board_matrix_rows_rival[click_y+1][click_x+1] = 6;
                board_matrix_rows_rival[click_y+2][click_x+1] = 6;
                board_matrix_rows_rival[click_y+3][click_x+1] = 6;
                vessel_img_ob_rival[num].v_al=flag_align;
                vessel_img_ob_rival[num].is_set=true;
                
		        return true;
            }

        break;


    }

break;


}

}

