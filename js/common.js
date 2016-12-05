/**
 * Created by lhr on 16/11/21.
 */
//requestObj请求相关
var requestObj = {
    "port": "http://15.2.20.11:8080/",//侯周军
//    "port": "http://15.2.20.14:8080/",//彭丽
    //"port": "http://15.2.20.15:8080/",//侯长旭
    //"port": "http://localhost:8080/",//本地
    "timeoutTime": 60000,
    "address": {
        //"register": "fjjrServer/demoControlerCtrler/update.do",//注册第一步
        "zfbmEntRegisterPass":"",//金融办企业注册审批
        "zfbmEntRequest":"",//金融办企业需求审批
        "zfbmFinProduct":"",//金融办金融产品
        "zfbmGuideSetting":"",//金融办政策管理
        "zfbmEntSetting":"",//金融办企业信息管理
        "zfbmJrjgSetting":"",//金融办金融机构管理
        "zfbmJrbSetting":"",//金融办金融办管理
        "zfbmContactSetting": "",//金融办联系我们
        "zfbmAreaCount":"",//金融办区域业务统计
        "zfbmJrjgCount":"",//金融办金融机构业务统计
        "zfbmEntCount":"",//金融办企业业务统计
        "jrjgEntRequest": "fjjrServer/fjjrQyxq/getFjjrQyxqByYfb.do",//金融机构待办企业需求
        "jrjgMyRequest": "fjjrServer/fjjrXqgz/getFjjrQyxqByYgzxq.do",//金融机构待办我的需求
        "jrjgMyCredit":"fjjrServer/fjjrXqgz/getFjjrQyxqByWdsx.do",//金融机构待办我的授信
        "jrjgMyGrantLoan":"fjjrServer/fjjrXqgz/getFjjrQyxqByWdfk.do",//金融机构待办我的放款
        "jrjgMyBackLoan":"fjjrServer/fjjrXqgz/getFjjrQyxqByWdhk.do",//金融机构待办我的还款
        "jrjgEntSearch": "fjjrServer/fjjrJrjg/queryQy.do",//金融机构企业查询
        "jrjgMyproduct": "fjjrServer/fjjrJrjg/queryCp.do",//金融机构我的产品
        "jrjgCountSearch":"",//金融机构企业业务统计查询
        "jrjgGatherSearch":"",//金融机构业务汇总查询
        "entIssueReuqest": "fjjrServer/FjjrQyxq/save.do",//企业发布需求
        "entMyRequest": "fjjrServer/fjjrQyxq/getFjjrQyxqByYfb.do",//企业我的需求
        "entProductSearch": "fjjrServer/fjjrJrcp/qry.do",//企业金融机构产品查询
        "entEditInfoJb": "fjjrServer/fjjrQyxx/update.do",//企业基本信息修改
        "entEditPwd":"fjjrServer/fjjrQyxx/updateUserPwd.do",//企业密码修改
        "entEditInfoCw": "fjjrServer/fjjrQycwxx/update.do",//企业财务信息修改
        "entDetail": "fjjrServer/fjjrQyxx/getFjjrQyxxVOById.do",//企业详情
        "contactUs": "fjjrServer/fjjrJrb/query.do",//联系我们列表
        "dicQuery": "fjjrServer/fjjrSjzd/query.do",//数据字典下拉框
        "login": "fjjrServer/fjjrLogin/fjjrLogin.do",//登录第一步
        "register": "fjjrServer/register/save.do",//注册第一步
        "institutionSearch": "jsy/jsyKhCyfgl/detail.do",//金融机构查询
        "requestDetail": "fjjrServer/fjjrJrjg/queryQy.do",//金融机构详情
        "qyxqxq": "fjjrServer/fjjrQyxq/getFjjrQyxqByXqbh.do",//需求详情详情
        "queryCityCouty": "fjjrServer/fjjrXqglgx/qry.do",//市区发送0／区县发送code查询
    },
    "searchObj": {
        totalPage : 1,//总页码
        recordsTotal: 1,//总记录数目
        postData: {
            pageIndex : 1,//当前页
            pageSize: 10,//每页数目
            /*其余输入框内容*/
        }
    },
    "formatRequest": function(obj){
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];
                if (value instanceof Array || value instanceof Object) {
                    query += name + '=' + JSON.stringify(value) + '&';
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }
            return query.length ? query.substr(0, query.length - 1) : query;
    },
    "packRequest": function(str){
        var arr = str.split("&");
        var postObj = {};

        for(var i = 0 ; i< arr.length ; i ++){
            postObj[arr[i].split("=")[0]] = arr[i].split("=")[1];
        }
        return postObj;
    },
    "ajaxServer": function(ajaxRrl,postData,successFun){
        //alert("发送报文:" + JSON.stringify(postData));
        $.ajax({
            url: requestObj.port + ajaxRrl,
            timeout: this.timeoutTime,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(postData),
            contentType: "application/json",
            beforeSend: function(){
                pluginObj.showLoading();
            },
            success: function(data){
                if(data.head["_rd"] == "000000"){
                    //请求成功处理逻辑
                    //todo
                    //alert(successFun);
                    successFun(data,postData);
                }else if(data.head["_rd"] == "000001"){
                    //需要登录
                }else{
                    //请求失败提示
                    pluginObj.alert(data.head["_rd"],data.head["_rm"]);
                }
            },
            error: function(data){
                pluginObj.alert("ERROR: "+data.status+" ", data.statusText);
            },
            complete: function(data,status){
                pluginObj.hideLoading();
            }
        });
    },
    "initCity": function(){
        var postData = {"sjbh": 100,"pageIndex": 1,"pageSize": 10};
        requestObj.getCityCounty(postData,true);
    },
    "getCityCounty": function(postData){
        //获取市区和县区的数据
        this.ajaxServer(requestObj.address.queryCityCouty,postData,function(data,postData){
            if(postData.sjbh == "100"){
                //更新市的数据，清除下拉框数据
                pluginObj.initSeclect("sssq",data.body.data,"xqbh","xqmc");
            }else{
                //更新县的数据，清除县下拉框，再遍历数据
                pluginObj.initSeclect("ssxq",data.body.data,"xqbh","xqmc");
            }
        });
    },
    "initPager": function(url,successFun){
        //初始化分页
        kkpager.generPageHtml({
            isShowFirstPageBtn: false,
            isShowLastPageBtn: false,
            isGoPage: false,
            pno : requestObj.searchObj.postData.pageIndex,
            mode : 'click', //设置为click模式
            //总页码
            total : requestObj.searchObj.totalPage,
            //总数据条数
            totalRecords : requestObj.searchObj.recordsTotal,
            //点击页码、页码输入框跳转、以及首页、下一页等按钮都会调用click
            click : function(n){
                //处理完后可以手动条用selectPage进行页码选中切换
                requestObj.searchObj.postData.pageIndex = n;
                requestObj.ajaxServer(url,requestObj.searchObj.postData,successFun);
            }
        },true);

    },
    "searchServer": function(url, formName, successFun){
        var params = $("#"+formName).serialize();
        params += "&pageIndex=" + this.searchObj.postData.pageIndex + "&pageSize=" + this.searchObj.postData.pageSize;
        this.searchObj.postData = this.packRequest(params);
        //alert(JSON.stringify(this.searchObj.postData));
        this.ajaxServer(url,requestObj.packRequest(params),successFun);
    },
    //获得下拉框字典表的数据
    "getDictionary": function(dicId, selectId){
        this.ajaxServer(requestObj.address.dicQuery,{"zdlxbh": dicId,"pageIndex": 1,"pageSize": 10},function(data,postData){
            pluginObj.initSeclect(selectId, data.body.data, "sjbh", "sjmc");
        });
    }

};
//location相关方法
var locationObj = {
  //  获得url里边的参数
  "getParams": function(){
      var hrefStr = window.location.href;
      var paramArr = hrefStr.split("?")[1].split("&");
      var paramObj = {};
      for(var i = 0 ; i < paramArr.length ; i ++ ){
          paramObj[paramArr[i].split("=")[0]] = paramArr[i].split("=")[1];
      }
      return paramObj;
  }
};
//金额转大写
var moneyToUpperCase = function (num) {
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0)
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i=0; i < num.length; i++)
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
};
//日期插件
var dataPiker =  function(){
    $('.form_date').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
};
//插件
var pluginObj = {
    //alert插件，传入错误码，错误信息
    alert: function(titleText,alertText){
        $("body").append(
            "<div class='alert alert-danger alert-dismissible' role='alert'>"+
            "<button type='button' class='close' data-dismiss='alert'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button>"+
            "<strong>" + titleText +"</strong>" + alertText + "</div>"
        );
        setTimeout(function(){
            $(".alert.alert-danger.alert-dismissible").hide();
        },60000)

    },
    //确认框插件
    comfire: function(comfireText){

    },
    //显示loading
    showLoading: function(){
        var imgSrc = "img/loading1.gif";
        if(location.pathname.search("/myCenter/")>=0){
            //是在个人中心
            imgSrc = "../img/loading1.gif"
        }
        if($(".modal_container .loading").length > 0){
            $(".modal_container").show();
        }else{
            $("body").append(
                "<div class='modal_container'>"+
                    "<div class='bg'></div><div class='loading'><img src=" + imgSrc + " alt='加载动画'/></div>"+
                "</div>"
            );
        }
    },
    //隐藏loading
    hideLoading: function(){
        $(".modal_container").hide();
    },
    //下拉框遍历

    initSeclect: function(secId, arr, optvalue, optname){
        //更新市的数据，清除下拉框数据
        $("#"+secId).empty();
        $("#"+secId).append(
            "<option value=''></option>"
        );
        for(var i = 0 ; i < arr.length ; i ++ ){
            $("#"+secId).append(
                "<option value='" + arr[i][optvalue] + "'>" + arr[i][optname] + "</option>"
            )
        }
    },
    //页面赋值
    setFormValue: function(obj){
        for(val in obj){
            if($("#"+val)){
                $("#"+val).html(obj[val]);
            }
        }
    }

};
//        点击选择市的时候，联动县
$("#sssq").change(function(){
    var postData = {'sjbh':$("#sssq").val()};
    requestObj.getCityCounty(postData,false);
});
