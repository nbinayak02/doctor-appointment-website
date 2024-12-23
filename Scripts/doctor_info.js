var btn=document.querySelectorAll(".ap_btn");

var prevButton=null;



function btn_clicked(currentButton) {
    // If there's a previously clicked button, reset its style
    if (prevButton) {
        prevButton.style.background = "#f3f8ff";
        prevButton.style.color = "#504949";
    }

    // Apply styles to the currently clicked button
    currentButton.style.background = "#5f6fff";
    currentButton.style.color = "white";

    // Update the reference to the current button
    prevButton = currentButton;
}


for(let i=0;i<btn.length;i++){
    
    btn[i].addEventListener("click",()=>{

        btn_clicked(btn[i]);
    });
    
}




//function for changing the time button style

var time_btn=document.querySelectorAll(".ap_time_btn");
var prev_time_btn=null;

function time_btn_clicked(current_time_btn){

    // If there's a previously clicked button, reset its style
if(prev_time_btn){
prev_time_btn.style.background="#f3f8ff";
prev_time_btn.style.color="#504949";
}
// Apply styles to the currently clicked button
current_time_btn.style.background="#5f6fff";
current_time_btn.style.color="white";

//update the refrence of the current button
prev_time_btn=current_time_btn;


}

for(let i=0;i<time_btn.length;i++){

    time_btn[i].addEventListener("click",()=>{

     time_btn_clicked(time_btn[i]);
    });
}

