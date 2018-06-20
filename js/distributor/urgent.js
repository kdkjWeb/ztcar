$(function(){
	var relationship = ["夫妻","父子","父女","母子","母女"];
	
    $("#relative").select({
        title:"与申请人关系",
        items:relationship
    })
    $(".relative1").select({
        title:"与申请人关系",
        items:relationship
    })
    $(".weui-btn").on("click",function(){
        let name=$("#name").val()
        let name1=$("#name").val()
        let name2=$("#name").val()
        let tel=$("#tel").val()
        let tel1=$("#tel").val()
        let tel2=$("#tel").val()
        if(isName(name,"直属亲人")==false){
            return false
        }else if(isName(name1)==false){
            return false
        }else if(isName(name2)==false){
            return false
        }else if(isPhone(tel)==false){
            return false
        }else if(isPhone(tel1)==false){
            return false
        }else if(isPhone(tel2)==false){
            return false
        }else{
            window.location.href="application.html"
        }
    })
})