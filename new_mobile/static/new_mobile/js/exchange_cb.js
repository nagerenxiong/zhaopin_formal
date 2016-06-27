function mmedchange(){
            var password = $(".password").val();
            if($.trim(password) == '') {
                alert(['请输入才才卡兑换码']);
                mmedclose();
                return false;
            }
             $('.modal_wrap').css('display', 'block');
             $('.confirm_dh1').css('display', 'block');
         }
function mmedclose(){
            $('.modal_wrap').css('display', 'none');
            $('.confirm_dh1').css('display', 'none');
         }
function ensure(){
//            if($('#convert').val().trim() ==""){
//                alert("请输入您的才才卡背面的兑换码");
//            }
//            else{
//
//            }

    var password = $(".password").val();
    if($.trim(password) == '') {
        alert(['请输入才才卡兑换码']);
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/ajax_add_gold_by_rechargecard",
        data: {'password': password},
        dataType: "json",
        success: function (data) {
            if(data == 'success') {
                alert(['充值成功!', 1]);
                setTimeout(function() {
                    window.history.go(-1);
                }, 1000)
            } else {
                alert([data]);
            }
        }
    });
    mmedclose();
 }