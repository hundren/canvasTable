console.log('dddd');
canvas.onmousedown = function(ev){  
    var e = ev||event;  
    var x = e.clientX;  
    var y = e.clientY;  
    drag(x,y);  
};  
//拖拽函数  
function drag(x,y){  
    // 按下鼠标判断鼠标位置是否在圆上，当画布上有多个路径时，isPointInPath只能判断最后那一个绘制的路径  
    if(ctx){  
        //路径正确，鼠标移动事件 
        var oldX = [];
        oldX.push(x); 
        canvas.onmousemove = function(ev){  
            var e = ev||event;  
            var ax = e.clientX;  
            var ay = e.clientY;  
            oldX.push(ax);
            oldX = oldX.slice(-2);
            console.log('oldX',oldX);
            //鼠标移动每一帧都清楚画布内容，然后重新画圆
            if(ax > oldX[oldX.length-2]){
                rotateCan(2); 
            }else{
                rotateCan(-2); 
            }
            // setInterval(function(){
            //     rotateCan(2);
            // },1000)
        };  
        //鼠标移开事件  
        canvas.onmouseup = function(){  
            canvas.onmousemove = null;  
            canvas.onmouseup = null;  
        };  
    };  
}  
function rotateCan(angle){ 
    ctx.clearRect(-circleCenter.x,-circleCenter.y,canvas.width,canvas.height);
    ctx.rotate(rads(angle));
    console.log('angle',rads(angle));
    draw();
}  
    