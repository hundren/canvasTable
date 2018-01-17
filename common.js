  //转换弧度
  function rads(x){
    return Math.PI*x/180;
}
// 圆点坐标变换公式 
function changeDeToXy(radius,radian){
    var _x = Math.round(radius * Math.cos(radian));
    var _y = Math.round(radius * Math.sin(radian));
    return {x:_x,y:_y}
}
//圆
function ites(a,b,r,color){
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.arc(0,0,r,rads(a),rads(b),false);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}
  //线
  function line(a,b,c,d){
    ctx.beginPath();
    ctx.moveTo(a,b);
    ctx.lineTo(c,d);
    ctx.strokeStyle=bgColor;
    ctx.closePath();
    ctx.lineWidth =10;
    ctx.stroke();
}
// 遮盖扇形
function coverCircle(angleSum){
    // 生产遮盖层
    // 开始一条新路径
    ctx.save();
    ctx.rotate(rads(-angleSum));
    ctx.beginPath();
    // 移动到圆心
    ctx.moveTo(0, 0);
    // 绘制圆弧
    ctx.arc(0, 0, 500, Math.PI/180*340, Math.PI/180*200);
    // 闭合路径
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
}
function drawCircularText(s,string, startAngle, endAngle ,lv){
    var fontSize = 15;
    var radius = s,
        angleDecrement = (startAngle - endAngle)/(string.length-1),
        angle = parseFloat(startAngle),
        index = 0,
        character;
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = fontSize + 'px 微软雅黑';
    ctx.textAlign = lv;
    ctx.textBaseline = 'middle';
    while (index < string.length) {
        character = string.charAt(index);
        ctx.save();
        ctx.beginPath();
        ctx.translate(Math.cos(angle) * (radius-fontSize),
                      Math.sin(angle) * (radius-fontSize));
      
        
        ctx.rotate(Math.PI/2 + angle);
        ctx.fillText(character, 0, 0);
//            ctx.strokeText(character, 0, 0);
        angle -= angleDecrement;
        index++;
        ctx.restore();
    }
    ctx.restore();
}
function drawVerticalText(string,angle,radius){
    var rev_str = string.split("").reverse().join(""); 
    var fontSize = 12,
    index = 0,
    character;
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.font = fontSize + 'px 微软雅黑';
    while (index < rev_str.length) {
        character = rev_str.charAt(index);
        ctx.save();
        ctx.beginPath();
        // 每个字的坐标
        ctx.translate(Math.cos(angle) * (radius+fontSize*index),
                      Math.sin(angle) * (radius+fontSize*index));
        ctx.rotate(Math.PI/2 + angle);
        // console.log('text_x',text_x,'text_y',text_y);
        ctx.fillText(character, 0, 0);
        index++;
        ctx.restore();
    }
    ctx.restore();
}
function setPoint(_arr){
	// 计算平均角度 [ 360度 ÷ 个数 ] 
	var each_degree = 360/_arr.length;
	// 临时数组
	var arr = new Array(_arr.length);
	// 开始计算每个圆点坐标
	for(i=0;i<_arr.length;i++){
		// 基于圆心平移X,Y
		arr[i] = i*each_degree;
	}
	return arr;
}
// 记录重复的元素以及出现的次数
function getAreaDe(_arr){
    var _res = []; //
    var arrLength = _arr.length;
    var singleDe = 360 / arrLength;
    _arr.sort();  
    for (var i = 0; i < _arr.length;) {  
        var count = 0;  
        for (var j = i; j < _arr.length; j++) {  
            if (_arr[i] == _arr[j]) {  
                count++;  
            }  
        }  
        _res.push([_arr[i], count]);  
        i += count;  
    }  
    //_res 二维数维中保存了 值和值的重复数  
    var _newArr = [];
    var eachDe = [0];  
    for (var i = 0; i < _res.length; i++) {
        var lastDe = eachDe[eachDe.length-1]+singleDe*_res[i][1];
        eachDe.push(eachDe[eachDe.length-1]+singleDe*_res[i][1]);
        _newArr.push({"area":_res[i][0],"start":eachDe[eachDe.length-2],"end":eachDe[eachDe.length-1]-2});  
        eachDe.push(lastDe);
    } 
    return _newArr
}

// 数组对象排序
var compare = function (prop) {
    return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }            
    } 
}