var navMenuAnchorTags = document.querySelectorAll('.nav-menu a')
var interval
// selected the nav menu and under taht all 'a' anchor tags
for(var i =0; i<navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click',function(event){
        event.preventDefault();
        var targetSectionID = this.textContent.trim().toLowerCase();  //trim the extra spaces and lower case as 
        // ids are in lowercase
        var targetSection = document.getElementById(targetSectionID)
        
        interval = setInterval(scrollVertically,10, targetSection);
    });
}

function scrollVertically(targetSection){           //passing targetfucntion as it is in local scope
    // now fetching the cordinates for the target section
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if(targetSectionCoordinates.top <=0){
        clearInterval(interval);
        return;
        }
    window.scrollBy(0,50);
}

//skill bar demo ----------------------> using single function use
// var progressBars = document.querySelectorAll('.skill-progress > div');
// var skillsContainer = document.getElementById('.skills-container');
// window.addEventListener('scroll',checkScroll);
// var animationDone = false;

// function initialiseBars(){
//     for(var bar of progressBars){
//         bar.style.width = 0 + '%';
//     }
// }

// initialiseBars();

// function fillBars(){
//     for(let bar of progressBars){
//         let targetWidth = bar.getAttribute("data-bar-width");   //let vs  var use -> as let keeps new initialisation 
//         let currenWidth = 0;
//         let interval1 = setInterval(function(){
//             if(currentWidth >= targetWidth){
//                 clearInterval(interval1);
//                 return;
//             }
//             currentWidth++;
//             bar.style.width = currenWidth + '%';
//         },3);
//     }
// }
// function checkScroll(){
//     //checking whether the skill section is visible or not in the viewport 
//     //also check while the skill sectionis visible just stop the scrolling function
//     var coordinates = skillsContainer.getBoundingClientRect();
//     if(!animationDone && coordinates.top <= window.innerHeight){       //height of the viewport with the help of window.innerheig
//         animationDone = true;
//         fillBars();
//     }else if (coordinates.top> window.innerHeight){     //again scrooling thru the page starts from 0, wont need to refresh
//         animationDone = false;  
//         initialiseBars();       //again set to 0
//     }
// }


//slkill bar demo funciton reusability 
//----------------------------------------
//handle scrool evnet in window (whether at this point of window skill section is visible or not )
//start animation on every skill inc skill width(that color) from 0 to its specific score(80,60,50 whatever it is 
//ensure initial width is at 0 and then anoimate to that skill lvl(80,50,60 etc.) at regular interval
//store skill level -> html with the help of dataAttribute( and in JS fetch that D.Attrivute
var progressBars =  document.querySelectorAll(".skill-progress > div");

function initialiseBars(bar){
    bar.setAttribute("data-visited", false);
    bar.style.width = 0 + '%';
}

for(var bar of progressBars){
    initialiseBars(bar);
}

function fillBars(bar){

    var currentWidth = 0;
    var targetWidth = bar.getAttribute("data-bar-width");
    var interval = setInterval(function(){
        if (currentWidth >= targetWidth){
            clearInterval(interval);
            return;
        } currentWidth ++;
        bar.style.width = currentWidth + "%";
    },5);
}
// this funct uses a for loop for individual progress here
function checkScroll(){
    for(let bar of progressBars){
        var barCoordinates = bar.getBoundingClientRect();
        if((bar.getAttribute("data-visited")== "false") &&
            (barCoordinates.top <=(window.innerHeight - barCoordinates.height))){
                bar.setAttribute("data-visited",true);
                fillBars(bar);
            }else if(barCoordinates.top > window.innerHeight){
                bar.setAttribute("data-visted", false);
                initialiseBars(bar);
            }
    }
}
window.addEventListener("scroll", checkScroll);