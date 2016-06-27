$(function(){

    $('.input_disabled').focus(function(){
        $(this).blur();
    })


    $("body").append('<div class="errorTip"></div>');
    
    var clearTimeOutNum = null;
    $('.swiper-slide').each(function(index,element){
    	var athis = $(this);
    	var flagNumber = 0;
    	athis.find('.formcheck').blur(function(){
    		var bthis = $(this);
    		var $parent = bthis.parent();
         	var $gradeParent = $parent.parent();
         	
         	if( bthis.is('.required') ){
			    if( bthis.val()==""){
					//var errorMsg = tipLabel+'是必填项';
					//$('.errorTip').text(errorMsg).show();
			        $gradeParent.addClass("errorBox");
			        flagNumber = athis.find(".errorBox").length;
			        if(flagNumber == 0){
			    		$('.errorTip').fadeOut();
			    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
			    		athis.find(".halfCheckBtnNo").hide().next().show();
			    	}else{
			        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
			        	athis.find(".halfCheckBtnOk").hide().prev().show();
			        }
			    }else{
			    	$gradeParent.removeClass("errorBox errorColor");
			    	flagNumber = athis.find(".errorBox").length;
			    	if(flagNumber == 0){
			    		$('.errorTip').fadeOut();
			    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
			    		athis.find(".halfCheckBtnNo").hide().next().show();
			    	}else{
			        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
			        	athis.find(".halfCheckBtnOk").hide().prev().show();
			        }
			    }
			}
         	if( bthis.is('.textarea_required') ){
			    if( bthis.val().length<50){
			        $gradeParent.addClass("errorBox text_num_min");
			        $gradeParent.removeClass("text_num_max");
			        flagNumber = athis.find(".errorBox").length;
			        if(flagNumber == 0){
			    		$('.errorTip').fadeOut();
			    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
			    		athis.find(".halfCheckBtnNo").hide().next().show();
			    	}else{
			        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
			        	athis.find(".halfCheckBtnOk").hide().prev().show();
			        }
			    }else if(bthis.val().length>2000){
			        $gradeParent.addClass("errorBox text_num_max");
			        $gradeParent.removeClass("text_num_min");
			        flagNumber = athis.find(".errorBox").length;
			        if(flagNumber == 0){
			    		$('.errorTip').fadeOut();
			    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
			    		athis.find(".halfCheckBtnNo").hide().next().show();
			    	}else{
			        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
			        	athis.find(".halfCheckBtnOk").hide().prev().show();
			        }
			    }else{
			    	numFlag = 0;
			    	$gradeParent.removeClass("errorBox errorColor text_num_min text_num_max");
			    	flagNumber = athis.find(".errorBox").length;
			    	if(flagNumber == 0){
			    		$('.errorTip').fadeOut();
			    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
			    		athis.find(".halfCheckBtnNo").hide().next().show();
			    	}else{
			        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
			        	athis.find(".halfCheckBtnOk").hide().prev().show();
			        }
			    }
			}
         	
         	if( bthis.is('.pwdCheck') ){
			    if( bthis.val()==""){
			        $gradeParent.addClass("errorBox");
			        flagNumber = athis.find(".errorBox").length;
			        if(flagNumber == 0){
			    		$('.errorTip').fadeOut();
			    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
			    		athis.find(".halfCheckBtnNo").hide().next().show();
			    	}else{
			        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
			        	athis.find(".halfCheckBtnOk").hide().prev().show();
			        }
			    }else{
			    	if(bthis.val().length<6){
			    		$gradeParent.addClass("errorBox");
			        	flagNumber = athis.find(".errorBox").length;
			    	}else{
			    		$gradeParent.removeClass("errorBox errorColor");
				    	flagNumber = athis.find(".errorBox").length;
				    	if(flagNumber == 0){
				    		$('.errorTip').fadeOut();
				    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
				    		athis.find(".halfCheckBtnNo").hide().next().show();
				    	}else{
				        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
				        	athis.find(".halfCheckBtnOk").hide().prev().show();
				        }
			    	}
			    }
			}
         	
         	if( bthis.is('.telCheck') ){
				$(this).val($.trim(bthis.val()));
         		if( bthis.val()!=""){
         			$gradeParent.removeClass("errorBox");
         			var tel = bthis.val();
	         		if(!(/^(13|15|18)[0-9]{9}$/.test(tel))){
						$gradeParent.addClass("errorBox error_tel");
			        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
	         		}else{
	         			$gradeParent.removeClass("errorBox error_tel errorColor");
				    	flagNumber = athis.find(".errorBox").length;
				    	if(flagNumber == 0){
		         			$('.errorTip').fadeOut();
				    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
				    	}
	         		}
         		}else{
         			$gradeParent.addClass("errorBox");
				    flagNumber = athis.find(".errorBox").length;
         		}
         	}
         	
     		if( bthis.is('.emailCheck') ){
				var email =$.trim( bthis.val());
				$(this).val(email);
         		if( email!=""){
         			$gradeParent.removeClass("errorBox");
	         		if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]w+)*$/.test(email))){
	         			$gradeParent.addClass("errorBox error_email");
			        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
	         		}else{
	         			$gradeParent.removeClass("errorBox error_email errorColor");
						
				    	flagNumber = athis.find(".errorBox").length;
				    	if(flagNumber == 0){
		         			$('.errorTip').fadeOut();
				    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
				    	}
	         		}
         		}else{
         			$gradeParent.removeClass("errorBox");
				    // flagNumber = athis.find(".errorBox").length;
         		}
         	}
     		
     		if( bthis.is('.timeCheck') ){
     			var minYearNum;
     			var maxYearNum;
     			var minMoonNum;
     			var maxMoonNum;
     			if(bthis.is('.checkYearMin') ){
     				minYearNum = bthis.val();
         			maxYearNum = $gradeParent.parent().next().find('.checkYearMax').val();
         			minMoonNum = $gradeParent.find('.checkMoonMin').val();
         			maxMoonNum = $gradeParent.parent().next().find('.checkMoonMax').val();
     			}
     			if(bthis.is('.checkYearMax') ){
     				maxYearNum = bthis.val();
         			minYearNum = $gradeParent.parent().prev().find('.checkYearMin').val();
         			maxMoonNum = $gradeParent.find('.checkMoonMax').val();
         			minMoonNum = $gradeParent.parent().prev().find('.checkMoonMin').val();
     			}
     			if(bthis.is('.checkMoonMin') ){
     				minYearNum = $gradeParent.find('.checkYearMin').val();
         			maxYearNum = $gradeParent.parent().next().find('.checkYearMax').val();
         			minMoonNum = bthis.val();
         			maxMoonNum = $gradeParent.parent().next().find('.checkMoonMax').val();
     			}
     			if(bthis.is('.checkMoonMax') ){
     				minYearNum = $gradeParent.parent().prev().find('.checkYearMin').val();
         			maxYearNum = $gradeParent.find('.checkYearMax').val();
         			maxMoonNum = bthis.val();
         			minMoonNum = $gradeParent.parent().prev().find('.checkMoonMin').val();
     			}
     			
     			     		
	     		// if(minYearNum!="" && maxYearNum!="" && minMoonNum!="" && maxMoonNum!=""){
	     			if(maxYearNum==0){
	     				$('.errorTip').fadeOut();
 						$gradeParent.parent().parent().removeClass("errorBox errorColor");
	     			}else if(minYearNum<maxYearNum){
	     				// if(minYearNum<maxYearNum){
	     					$('.errorTip').fadeOut();
		     				$gradeParent.parent().parent().removeClass("errorBox errorColor");
		     				// if(minYearNum==maxYearNum){
		     				// 	if(minMoonNum<=maxMoonNum){
		     		  //   			$('.errorTip').fadeOut();
		     				// 		$gradeParent.parent().parent().removeClass("errorBox errorColor");
		     				// 	}else{
		     				// 		var errorMsg = '请正确选择起止年份';
				    			// 	$('.errorTip').text(errorMsg).fadeIn();
		     				// 		$gradeParent.parent().parent().addClass("errorBox");
		     				// 	}
		     				// }else{
	 				    		
		     				// 	$gradeParent.parent().parent().removeClass("errorBox errorColor");
		     				// }
		     			}else if(minYearNum==maxYearNum){
		     				
	     					if(minMoonNum<=maxMoonNum){
	     		    			$('.errorTip').fadeOut();
	     						$gradeParent.parent().parent().removeClass("errorBox errorColor");
	     					}else{
	     						var errorMsg = '请正确选择起止年份';
			    				$('.errorTip').text(errorMsg).fadeIn();
	     						$gradeParent.parent().parent().addClass("errorBox");
	     					}
		     				
		     			}else{
		     				var errorMsg = '请正确选择起止年份';
				    		$('.errorTip').text(errorMsg).show();
		     				$gradeParent.parent().parent().addClass("errorBox");
		     			}
	     				
	     		// }else{
	     		// 	$gradeParent.parent().parent().addClass("errorBox");
	     		// }
	     		
	  	        flagNumber = athis.find(".errorBox").length;
	     		
	     		if(flagNumber == 0){
				    athis.find(".halfCheckBtnNo").hide().next().show();
				}else{
					athis.find(".halfCheckBtnOk").hide().prev().show();
				}
     		}
     		
     		if( bthis.is('.mstime') ){
     			var flag = 0;
     			if($('.mstime').eq(0).val()!=""&&$('.mstime').eq(1).val()!=""&&$('.mstime').eq(2).val()!=""){
     				flag = 1;
     			}else{
     				flag = 0;
     			}
     			
	     		if(flag == 1){
     				$gradeParent.removeClass("errorBox error_mstime errorColor");
	     		}else{
	     			$gradeParent.addClass("errorBox error_mstime");
	     		}
	     		
	  	        flagNumber = athis.find(".errorBox").length;
	    		if(flagNumber == 0){
		    		$('.errorTip').fadeOut();
		    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
		    		athis.find(".halfCheckBtnNo").hide().next().show();
		    	}else{
		        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
		        	athis.find(".halfCheckBtnOk").hide().prev().show();
		        }
     		}
     		
     		if( bthis.is('.month_money') ){
     			var flag = 0;
     			if($('.min_salary').val()!=""&&$('.max_salary').val()!=""){
 				  		flag = 2;
     			}else{
     				flag = 0;
     			}
     			
	     		if(flag == 0){
	     			$gradeParent.addClass("errorBox salary_requier");
	     			$gradeParent.removeClass("salary_error");
	     		}else if(flag == 1){
	     			$gradeParent.addClass("errorBox salary_error");
	     			$gradeParent.removeClass("salary_requier");
	     		}else{
	     			$gradeParent.removeClass("errorBox errorColor salary_requier salary_error");
	     		}
	     		
	  	        flagNumber = athis.find(".errorBox").length;
	    		if(flagNumber == 0){
		    		$('.errorTip').fadeOut();
		    		athis.find(".formCheckBtn.btnUnable").hide().next().show();
		    		athis.find(".halfCheckBtnNo").hide().next().show();
		    	}else{
		        	athis.find(".formCheckBtn.btnAble").hide().prev().show();
		        	athis.find(".halfCheckBtnOk").hide().prev().show();
		        }
     		}
     		
     		if( bthis.is('.numberCount') ){
			   var num = 0;
			   if(bthis.val()!=""){
			   		num = bthis.val().length
			   }
			   bthis.parent().next().find('span').first().text(num);
			}

    	}).keyup(function(){
           $(this).triggerHandler("blur");
        }).focus(function(){
           $(this).triggerHandler("blur");
        })
        
        
        athis.find('.formCheckBtn.btnUnable').click(function(){
        		
        		athis.find(".formcheck").trigger('blur');
	  	        flagNumber = athis.find(".errorBox").length;
	  	        athis.find(".errorBox").addClass("errorColor")
	  	               
	            if(flagNumber>0){
	            	clearTimeout(clearTimeOutNum);
	            	if(athis.find(".error_tel").length>0){
		               	showErrMsg('请填写正确的手机号码')
	            	}else if(athis.find(".error_email").length>0){
	            		showErrMsg('请填写正确的邮箱')
	            	}else if(athis.find(".error_mstime").length>0){
	            		showErrMsg('请选择邀请时间')
	            	}else if(athis.find(".salary_requier").length>0){
	            		showErrMsg('请填写薪资要求')
	            	}else if(athis.find(".salary_error").length>0){
	            		showErrMsg('最小薪资不能大于最大薪资')
	            	}else if(athis.find(".text_num_min").length>0){
	            		showErrMsg('描述内容不可少于50字')
	            	}else if(athis.find(".text_num_max").length>0){
	            		showErrMsg('描述内容不可大于2000字')
	            	}else{
	            		showErrMsg('请完善必填项')
	            	}
	                athis.find(".formCheckBtn.btnAble").hide().prev().show();
	            } 
	            if(flagNumber==0){
	            	$('.errorTip').fadeOut();
	            	athis.find(".formCheckBtn.btnUnable").hide().next().show();
	            }
         });
         
         athis.find('.halfCheckBtnNo').click(function(){
         	
	            athis.find(".formcheck").trigger('blur');
	  	        flagNumber = athis.find(".errorBox").length;
                athis.find(".errorBox").addClass("errorColor")
	  	        
	            if(flagNumber>0){
	            	clearTimeout(clearTimeOutNum);
	            	if(athis.find(".error_tel").length>0){
		               	showErrMsg('请填写正确的手机号码')
	            	}else if(athis.find(".error_email").length>0){
	            		showErrMsg('请填写正确的邮箱')
	            	}else if(athis.find(".error_mstime").length>0){
	            		showErrMsg('请选择邀请时间')
	            	}else if(athis.find(".salary_requier").length>0){
	            		showErrMsg('请填写薪资要求')
	            	}else if(athis.find(".salary_error").length>0){
	            		// showErrMsg('最小薪资不能大于最大薪资')
	            	}else if(athis.find(".text_num_min").length>0){
	            		showErrMsg('描述内容不可少于50字')
	            	}else if(athis.find(".text_num_max").length>0){
	            		showErrMsg('描述内容不可大于2000字')
	            	}else{
	            		showErrMsg('请完善必填项')
	            	}
	                athis.find(".halfCheckBtnOk").hide().prev().show();
	            } 
	            if(flagNumber==0){
	            	$('.errorTip').fadeOut();
	            	athis.find(".halfCheckBtnNo").hide().next().show();
	            }
         });
         
        function showErrMsg(info){
     	 	$('.errorTip').text(info).fadeIn();
            clearTimeOutNum = setTimeout(function(){
            	$('.errorTip').text('').fadeOut();
            },3000)
        }
    })
    

    $("body").find(".swiper-slide").first().find(".formcheck").trigger('blur');
    $("body").find(".swiper-slide-resume").find(".formcheck").trigger('blur');
     
 	$("body").find(".swiper-slide-cominfo").find(".formcheck").trigger('blur');
  	$("body").find(".swiper-slide-jobinfo").find(".formcheck").trigger('blur');
    $(".formCheckBtn.next-btn").click(function(){
    	document.body.scrollTop=0;
    })
    
    //提交延迟-防止重复提交
    $(".subminDisable").click(function(){
    	setTimeout(function(){
    			$(".subminDisable").attr("disabled",true);
    	},200) 
    	setTimeout(function(){
    			$(".subminDisable").attr("disabled",false);
    	},2000) 
    })
})