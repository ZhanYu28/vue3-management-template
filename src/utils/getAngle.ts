interface GetAngle {
    (
    // 原点
     x1:number,
     y1:number,
    //  待计算相对原点旋转的点
     x2:number,
     y2:number
    ):number
}

export const getAngle:GetAngle = (x1,y1,x2,y2)=>{
    const x = x2 - x1;
    const y = y1 - y2;
    if(x > 0 ){
        return y == 0?90:y>0?angle(radian(x,y)):angle(radian(y,x)) + 90
    }else if(x < 0){
        return y == 0?270:y>0?angle(radian(y,x)) + 270:angle(radian(x,y)) + 180
    }else{
        return y == 0?0:y>0?0:180
    }
}
// 计算弧度
function radian(x:number,y:number):number{
    return Math.atan(Math.abs(x/y))
}
// 计算角度
function angle(radian:number):number{
    return Math.floor(radian * 180 / Math.PI)
}