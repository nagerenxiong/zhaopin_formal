/**
 * Created by King on 2015/9/9.
 */

 function onlyHeadhuntCompany() {
        return isIdentityAudit('3,5', '2');
}

function isIdentityAudit(roleId, type){
    var roleIds = roleId.split(',');
    var types = type.split(',');
    var flag = true;
    $.ajax({
        async: false,
        type: 'post',
        url: '/ajax_isIdentityAudit',
        data: {'roleIds': roleIds, 'types': types},
        dataType: 'json',
        success: function(data){
            if(data.status == '110'){
                // 不需验证
            } else if(data.status == '120') {
                //审核没通过
                var type = data.type;
                var validStatus = data.validStatus;
                var account_type = data.account_type;
                if(type == '1') {
                    if(validStatus == '1') {
                        hint("您的个人信息尚未验证哦，点击<a href='/jobs/account/new_sfyz' >前往验证&nbsp;></a>");
                    } else if(validStatus == '2') {
                        hint('您的个人信息正在审核中，请耐心等待一会吧~<span class="yqts">如需加快审核，请拨打客服电话：400-666-4846<br>工作时间：9:00-20:00</span>');
                    }
                } else if(type == '2') {
                    if(account_type == 2 || account_type == 4) {
                        if(validStatus == '1') {
                            hint("您的企业信息尚未验证哦，点击<span class='light' onclick='openNewAuditPageForTpcUser()'>前往验证&nbsp;></span>");
                        } else if(validStatus == '2') {
                            hint("您的企业信息正在审核中哦，请耐心等待");
                        }
                    } else {
                        if(data.headHuntValidStatus == 1) {
                            hint("您的个人信息尚未验证哦，点击<a href='/jobs/account/new_sfyz'  >前往验证&nbsp;></a>");
                        } else if(data.headHuntValidStatus == 2){
                            hint('您的个人信息正在审核中，请耐心等待一会吧~<span class="yqts">如需加快审核，请拨打客服电话：400-666-4846<br>工作时间：9:00-20:00</span>');
                        } else if(validStatus == '1') {
                            if(data.isApplyJoinedCompany == 1)  hint("您提交的加入企业信息正在审核中哦~");
                            else                                hint("企业信息尚未验证哦，点击<a href='/jobs/position/notes'>前往验证&nbsp;></a>");
                        } else if(validStatus == '2') {
                            if(data.isJoinedCompany == 1)   hint("您加入的企业信息正在审核中哦，请再耐心等待一会吧~");
                            else                            hint("您的企业信息正在审核中哦，请再耐心等待一会吧~");
                        }
                    }
                }
                flag = false;
            } else if(data.state == '130') {
                //审核通过
            }
        }
    });
    return flag;
}

// 弹出框提示去验证身份信息
function doAlertToAudit(type) {
    //  top.html 中的隐藏域
    var loginAccountType = $(".loginAccountType").val();
    if(loginAccountType == '3' || loginAccountType == '5') {
        if(type == '1') hint("您的身份信息尚未认证，点击<a href='/jobs/account/new_sfyz'>前往认证&nbsp;></a>");
        else            hint("您的身份信息正在审核中，请您耐心等待");
    } else {
        if(type == '1') {
            hint("您的企业信息尚未认证，点击<span onclick='openNewAuditPageForTpcUser()'>前往验证&nbsp;></span>");
        } else {
            // 是否加入企业
//            var isJoinedCompany = $(".isJoinedCompany").val();
//            if(isJoinedCompany == 'True')   hint("您加入的企业信息正在审核中哦，请再耐心等待一会吧~");
//            else                            hint("您的企业信息正在审核中哦，请再耐心等待一会吧~");
            hint('您的企业信息正在审核中，请耐心等待一会吧~<span class="yqts">如需加快审核，请拨打客服电话：400-666-4846<br>工作时间：9:00-20:00</span>');
        }
    }
}

// 为企业用户打开新认证窗口
function openNewAuditPageForTpcUser() {
    $(".layui-layer-ico.layui-layer-close.layui-layer-close1").click();
    window.open("/scyyzz", "_blank");
}

// 未认证企业信息发布职位弹框
function isIdentityCompany(roleId, type){
    var roleIds = roleId.split(',');
    var types = type.split(',');
    var flag = true;
    $.ajax({
        async: false,
        type: 'post',
        url: '/ajax_isIdentityAudit',
        data: {'roleIds': roleIds, 'types': types},
        dataType: 'json',
        success: function(data){
            if(data.status == '110'){
                // 不需验证
            } else if(data.status == '120') {
                //审核没通过
                var type = data.type;
                var validStatus = data.validStatus;
                var account_type = data.account_type;
                if(account_type == 2 || account_type == 4) {
                    if(validStatus == '1') {
                        hint("您尚未完成企业身份认证，暂时只能发布1次职位<br>想要发布更多，请点击<span class='light' onclick='openNewAuditPageForTpcUser()'>前往认证&nbsp;></span>");
                    } else if(validStatus == '2') {
                        hint("您的企业信息正在审核中，暂时只能发布1次职位");
                    }
                } else {
                    if(validStatus == '1') {
                        if(data.isApplyJoinedCompany == 1)  hint("您提交的加入企业信息正在审核中，暂时只能发布1次职位");
                        else                                hint("您尚未加入经纪人企业，暂时只能发布1次职位<br>想要发布更多，请点击<a href='/jobs/position/notes'>立即加入&nbsp;></a>");
                    } else if(validStatus == '2') {
                        if(data.isJoinedCompany == 1)   hint("您申请的企业信息正在审核中，暂时只能发布1次职位");
                        else                            hint("您的企业信息正在审核中，暂时只能发布1次职位");
                    }
                }
                flag = false;
            } else if(data.state == '130') {
                //审核通过
            }
        }
    });
    return flag;
}

// 未认证经纪人个人信息发布职位弹框
function isIdentityHeadhunt(roleId, type){
    var roleIds = roleId.split(',');
    var types = type.split(',');
    var flag = true;
    $.ajax({
        async: false,
        type: 'post',
        url: '/ajax_isIdentityAudit',
        data: {'roleIds': roleIds, 'types': types},
        dataType: 'json',
        success: function(data){
            if(data.status == '110'){
                // 不需验证
            } else if(data.status == '120') {
                //审核没通过
                if(data.isJoinedCompany == true){
                    return;
                }
                var type = data.type;
                var validStatus = data.validStatus;
                if(type == '1') {
                    if(validStatus == '1') {
                        flag = false;
                        hint("您的身份信息尚未认证，点击<a href='/jobs/account/new_sfyz' >前往验证&nbsp;></a>");
                    } else if(validStatus == '2') {
                        flag = false;
                        hint('您的个人信息正在审核中，请耐心等待一会吧~<span class="yqts">如需加快审核，请拨打客服电话：400-666-4846<br>工作时间：9:00-20:00</span>');
                    }
                } else if(type == '2') {
                    if(data.headHuntValidStatus == 1) {
                        flag = false;
                        hint("您的身份信息尚未认证，点击<a href='/jobs/account/new_sfyz'  >前往验证&nbsp;></a>");
                    } else if(data.headHuntValidStatus == 2){
                        flag = false;
                        hint('您的个人信息正在审核中，请耐心等待一会吧~<span class="yqts">如需加快审核，请拨打客服电话：400-666-4846<br>工作时间：9:00-20:00</span>');
                    }
                }
            } else if(data.state == '130') {
                //审核通过
            }
        }
    });
    return flag;
}