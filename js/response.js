/**
 * Created by lhr on 16/11/21.
 * IE8以下响应式样式处理
 */
(function(){
    //处理H5新标签
    var newTag = ['nav','section','article','header','footer','menu','aside','time'];
    for(var i = 0 ; i < newTag.length ; i ++){
        document.createElement(newTag[i]);
    }
    //处理首页不支持CSS nth-child 选择器的首页支持中心
    if(document.getElementById("supportCenter")){
        var supportLi = document.getElementById("supportCenter").getElementsByTagName("li");
        for(var j = 0 ; j < supportLi.length ; j ++ ){
            if(j % 5 === 0){
                supportLi[j].style.marginRight = 0;
            }
        }
    }

})();