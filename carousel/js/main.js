var oImagbox=document.querySelector(".imgBox");
var oPervbtn=document.querySelector(".prev");
var oNextbtn=document.querySelector(".next");
var oIdots=document.querySelectorAll(".idot");
var oWrap=document.querySelector(".wrap");
var currentImgIdx=1;
var isAnomating=false;//是否正在进行动画
var timer=null;//自动轮播定时器

play();

//循环为小圆点添加点击事件
for(var i=0;i<oIdots.length;i++){
    //为小圆点添加自定义属性
    oIdots[i].idx=i+1 ;
    oIdots[i].onclick=function() {

        if(isAnomating){
            return;
        }
       if(this.idx!=currentImgIdx){
            //    offset=-(target-currentImgIdx)*520
           var offset=-(this.idx-currentImgIdx)*520;
           tab(offset);
           currentImgIdx=this.idx;
           updateIdots();
       }
    }
}
//函数封装
function play() {
        timer=setInterval(function () {
            oNextbtn.onclick();
        },3000);
}
function stop() {
    clearInterval(timer);
    timer=null;
}

function updateIdots() {
    //清除上一次的active
    for(var i=0;i<oIdots.length;i++){
        if(oIdots[i].classList.contains("active")){
            oIdots[i].classList.remove("active");
            break;
        }
    }
    oIdots[currentImgIdx-1].classList.add("active");
}
function getStyle(obj, attr) {
    // 兼容IE
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }else {
        return getComputedStyle(obj, null)[attr];
    }
}
function tab(offset){
    isAnomating=true;
    //设计帧动画
    var duration=500,//动画时间
        interval=15,//每一帧偏移时间
        frames=duration/interval, //有多少帧
        move=Math.ceil(offset/frames);//每一帧移动的偏移量,向上取整
    //定时器启动帧动画
    var currentLeft=parseInt(getStyle(oImagbox,"left"));
    var destination=currentLeft+offset;

    var t=setInterval(function () {
        if((offset<0&&currentLeft>destination)||(offset>0&&currentLeft<destination)){

            oImagbox.style.left=currentLeft+move+"px";
            //    更新当前的偏移量
            currentLeft=parseInt(getStyle(oImagbox,"left"));
        }else{
        //    停止帧动画
            clearInterval(t);
            isAnomating=false;
            oImagbox.style.left=destination+"px";
            //    无限滚动
            currentLeft=parseInt(getStyle(oImagbox,"left"));
            if(currentLeft<-3120){
                oImagbox.style.left="-520px";
            }else if(currentLeft>-520){
                oImagbox.style.left="-3120px";
            }
        }
    },interval);


}
//添加点击事件
oPervbtn.onclick=function () {
    if(isAnomating){
        return;
    }
    if(currentImgIdx==1){
        currentImgIdx=6;
    }
    else{
        currentImgIdx--;
    }
    // console.log(currentImgIdx);
    tab(520);
    updateIdots();
}
oNextbtn.onclick=function () {
    if(isAnomating){
        return;
    }
    if(currentImgIdx==6){
        currentImgIdx=1;
    }
    else{
        currentImgIdx++;
    }
    tab(-520);
    updateIdots();
}
//停止轮播
oWrap.onmouseenter=stop;
oWrap.onmouseleave=play;

