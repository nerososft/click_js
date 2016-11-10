var PageManager = new Object({
	BASE_URL: "http://localhost:8080",
	Url:{
		getPage: function(){
			return PageManager.BASE_URL+"/admin/page/"+Math.random()+"/get";
		},
		setPage: function(title,label,footer){
			var uid  = 0;
			var token= 'sss';
			return PageManager.BASE_URL+"/admin/page/header/"+uid+"/"+token+"/auth/"+title+"/"+label+"/set";	
		}
	},
	Utils:{
		httpRequest:function(url){
			$.get(url,{},function(data,status){
				if(status){
					console.log(data);
				}else{
					alert("something wrong with server!");
				}
			});
		}
	},
	Operate:{
		getPage: function(){
			$.get(PageManager.Url.getPage(),{},function(data,status){
				console.log(data);
				PageManager.View.renderPage(data);
			});
		},
		setPage:function(title,label,footer){
			PageManager.Utils.httpRequest(PageManager.Url.setPage(title,label,footer));
		},
		modifyLink:function(){

		},
		delLink:function(id){

		},
		modifyLogo:function(){

		},
		delLogo:function(id){

		},
		modifyBanner:function(){

		},
		delBanner:function(id){

		}
	},
	View:{
		renderPage:function(data){
			//console.log(data.data);
			$("#page_title").html("title : "+data.data.header.title);
			$("#page_label").html("label : "+data.data.header.label);
			$("#page_footer").html("footer : "+data.data.footer.label);
			$("#bt_setpage").attr("href","javascript:PageManager.View.setPage('"+data.data.header.title+"','"+data.data.header.label+"','"+data.data.footer.label+"')")
			$.each(data.data.links,function(key,value){
				$("#page_links").append('<tr><td>'+value.name+'</td><td><a href="'+value.hrefUrl+'">'+value.hrefUrl+'</a></td><td><a class="label label-info" href="javascript:PageManager.Operate.modifyLink('+value.id+');">modify</a>  <a class="label label-danger" href="javascript:PageManager.Operate.delLink('+value.id+');">delete</a></td></tr>')
			});
			$.each(data.data.logos,function(key,value){
				$("#page_logos").append('<tr><td>'+value.descrip+'</td><td><a href="'+value.hrefUrl+'">'+value.hrefUrl+'</a></td><td><img style="width: 5em;" src="'+value.imgUrl+'"></td><td><a class="label label-info" href="javascript:PageManager.Operate.modifyLogo('+value.id+');">modify</a>  <a class="label label-danger" href="javascript:PageManager.Operate.delLogo('+value.id+');">delete</a></td></tr>');
			});
			$.each(data.data.banners,function(key,value){
				$("#page_banners").append('<tr><td>'+value.descrip+'</td><td><a href="'+value.hrefUrl+'">'+value.hrefUrl+'</a></td><td><img style="width: 5em;" src="'+value.imgUrl+'"></td><td><a class="label label-info" href=""></td><td><a class="label label-info" href="javascript:PageManager.Operate.modifyBanner('+value.id+');">modify</a>  <a class="label label-danger" href="javascript:PageManager.Operate.delBanner('+value.id+');">delete</a></td></tr>');
			});
		},
		setPage:function(title,label,footer){
			//自定页
			layer.open({
  			type: 1,
  			closeBtn: 1, //不显示关闭按钮
  			anim: 1,
  			shadeClose: true, //开启遮罩关闭
  			title:'set page',
  			content: '<div style="width:25em;padding:2em;">'+
  					 '<input id="new_title" class="form-control" value="'+title+'"/>'+
  					 '<input id="new_label" style="margin-top:1em;" class="form-control" value="'+label+'"/>'+
  					 '<input id="new_footer" style="margin-top:1em;" class="form-control" value="'+footer+'"/>'+
  					 '<a href="javascript:PageManager.Operate.setPage($(\'#new_title\').val(),$(\'#new_label\').val(),$(\'#new_footer\').val())"><button style="margin-top:2em;" class="btn btn-info form-control">change</button></a>'+
  					 '</div>'
			});
		},
		delLink:function(id){

		},
		modifyLogo:function(){

		},
		delLogo:function(id){

		},
		modifyBanner:function(){

		},
		delBanner:function(id){

		}
	}
});