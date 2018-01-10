var urlPrefix=UrlPrefix;define("attachment_upload",["jquery.ui.widget","fileupload"],function(){function formatFileSize(bytes){if(typeof bytes!=="number"){return""}if(bytes>=1e9){return(bytes/1e9).toFixed(2)+" GB"}if(bytes>=1e6){return(bytes/1e6).toFixed(2)+" MB"}return(bytes/1e3).toFixed(2)+" KB"}function setDropStyle(dropzoneId,formId){var dropZone=$(dropzoneId);$(formId).bind("dragover",function(e){e.preventDefault();var timeout=window.dropZoneTimeoutAttach;if(timeout){clearTimeout(timeout)}var found=false,node=e.target;do{if(node===dropZone[0]){found=true;break}node=node.parentNode}while(node!=null);if(found){dropZone.addClass("hover")}else{dropZone.removeClass("hover")}window.dropZoneTimeoutAttach=setTimeout(function(){window.dropZoneTimeoutAttach=null;dropZone.removeClass("in hover")},100)})}setDropStyle("#dropAttach","#uploadAttach");setDropStyle("#dropAvatar","#uploadAvatar");var initUploader=function(){$(".dropzone .btn-choose-file").click(function(){$(this).parent().find("input").click()});var $msg=$("#attachUploadMsg");$("#uploadAttach").fileupload({dataType:"json",pasteZone:"",dropZone:$("#dropAttach"),formData:function(form){return[{name:"noteId",value:Note.curNoteId}]},add:function(e,data){var note=Note.getCurNote();if(!note||note.IsNew){alert("This note hasn't saved, please save it firstly!");return}var tpl=$('<div class="alert alert-info"><img class="loader" src="/tinymce/plugins/leaui_image/public/images/ajax-loader.gif"> <a class="close" data-dismiss="alert">×</a></div>');tpl.append(data.files[0].name+" <small>[<i>"+formatFileSize(data.files[0].size)+"</i>]</small>");$msg.html(tpl);data.context=$msg;var size=data.files[0].size;var maxFileSize=+GlobalConfigs["uploadAttachSize"]||100;if(typeof size=="number"&&size>1024*1024*maxFileSize){tpl.find("img").remove();tpl.removeClass("alert-info").addClass("alert-danger");tpl.append(" Warning: File size is bigger than "+maxFileSize+"M");setTimeout(function(tpl){return function(){tpl.remove()}}(tpl),3e3);return}var jqXHR;setTimeout(function(){jqXHR=data.submit()},10)},done:function(e,data){if(data.result.Ok==true){data.context.html("");Attach.addAttach(data.result.Item)}else{var re=data.result;data.context.html("");var tpl=$('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a></div>');tpl.append("<b>Error:</b> "+data.files[0].name+" <small>[<i>"+formatFileSize(data.files[0].size)+"</i>]</small> "+data.result.Msg);data.context.html(tpl);setTimeout(function(tpl){return function(){tpl.remove()}}(tpl),3e3)}$("#uploadAttachMsg").scrollTop(1e3)},fail:function(e,data){data.context.html("");var tpl=$('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a></div>');tpl.append("<b>Error:</b> "+data.files[0].name+" <small>[<i>"+formatFileSize(data.files[0].size)+"</i>]</small> "+data.errorThrown);data.context.html(tpl);setTimeout(function(tpl){return function(){tpl.remove()}}(tpl),3e3);$("#uploadAttachMsg").scrollTop(1e3)}});var $msg2=$("#avatarUploadMsg");$("#uploadAvatar").fileupload({dataType:"json",dropZone:$("#dropAvatar"),pasteZone:"",add:function(e,data){var tpl=$('<div class="alert alert-info"><img class="loader" src="/tinymce/plugins/leaui_image/public/images/ajax-loader.gif"> <a class="close" data-dismiss="alert">×</a></div>');tpl.append(data.files[0].name+" <small>[<i>"+formatFileSize(data.files[0].size)+"</i>]</small>");$msg2.html(tpl);data.context=$msg2;var size=data.files[0].size;var maxFileSize=+GlobalConfigs["uploadAvatarSize"]||100;if(typeof size=="number"&&size>1024*1024*maxFileSize){tpl.find("img").remove();tpl.removeClass("alert-info").addClass("alert-danger");tpl.append(" Warning: File size is bigger than "+maxFileSize+"M");setTimeout(function(tpl){return function(){tpl.remove()}}(tpl),3e3);return}var jqXHR;setTimeout(function(){jqXHR=data.submit()},10)},done:function(e,data){if(data.result.Ok==true){data.context.html("");var re=data.result;$("#avatar").attr("src",UrlPrefix+"/"+re.Id)}else{var re=data.result;data.context.html("");var tpl=$('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a></div>');tpl.append("<b>Error:</b> "+data.files[0].name+" <small>[<i>"+formatFileSize(data.files[0].size)+"</i>]</small> "+data.result.Msg);data.context.html(tpl);setTimeout(function(tpl){return function(){tpl.remove()}}(tpl),3e3)}},fail:function(e,data){data.context.html("");var tpl=$('<div class="alert alert-danger"><a class="close" data-dismiss="alert">×</a></div>');tpl.append("<b>Error:</b> "+data.files[0].name+" <small>[<i>"+formatFileSize(data.files[0].size)+"</i>]</small> "+data.errorThrown);data.context.html(tpl);setTimeout(function(tpl){return function(){tpl.remove()}}(tpl),3e3)}})};initUploader()});