var PageManager = new Object({
	BASE_URL: "http://localhost:8080",
	Url:{
		getPage: function(){
			return PageManager.BASE_URL+"/admin/page/"+$.cookie("uid")+"/"+$.cookie("token")+"/auth/"+Math.random()+"/get";
		},
		setPage: function(title,label,footer){
			return PageManager.BASE_URL+"/admin/page/header/"+$.cookie("uid")+"/"+$.cookie("token")+"/auth/"+title+"/"+label+"/set";	
		},
		del:function(which,id){
			return PageManager.BASE_URL+"/admin/page/"+which+"/"+$.cookie("uid")+"/"+$.cookie("token")+"/auth/"+id+"/delete"
		},
		add3:function(which,desc,href,img){
			desc = PageManager.Utils.filter(desc);
			href = PageManager.Utils.filter(href);
			img = PageManager.Utils.filter(img);
			
			return PageManager.BASE_URL+"/admin/page/"+which+"/"+$.cookie("uid")+"/"+$.cookie("token")+"/auth/"+desc+"/"+href+"/"+img+"/add"
		},
		add2:function(which,name,href){
			name = PageManager.Utils.filter(name);
			href = PageManager.Utils.filter(href);
			return PageManager.BASE_URL+"/admin/page/"+which+"/"+$.cookie("uid")+"/"+$.cookie("token")+"/auth/"+name+"/"+href+"/add"
		}
	},
	Utils:{
		filter:function(str){
			return str.replace(/\//g,"+");
		},
		infilter:function(str){
			return str.replace(/\+/g,"/");
		},
		alert:function(bool,msg){
			layer.msg(msg, {icon: bool?6:5});
		},
		httpRequest:function(url){
			$.get(url,{},function(data,status){
				if(status){
					if(data.state == false){
						if(msg == "管理员认证失败"){
							window.location.href="sign-in.html";
						}
						PageManager.Utils.alert(false,data.msg);
					}else{
						layer.closeAll();
						layer.msg('operate success!', {icon: 1});
						$("#page_links").html("");
						$("#page_logos").html("");
						$("#page_banners").html("");

						PageManager.Operate.getPage();
					}
				}else{
					PageManager.Utils.alert(false,"something wrong with server!");
				}
			});
		}
	},
	Operate:{
		getPage: function(){
			$.get(PageManager.Url.getPage(),{},function(data,status){
				console.log(data);
				if(status){
					if(data.state){
						PageManager.View.renderPage(data);
					}else{
						window.location.href="sign-in.html";
					}
				}
				
			});
		},
		setPage:function(title,label,footer){
			PageManager.Utils.httpRequest(PageManager.Url.setPage(title,label,footer));
		},
		addLink:function(name,href){
			PageManager.Utils.httpRequest(PageManager.Url.add2("link",name,href));
		},
		delLink:function(id){
			PageManager.Utils.httpRequest(PageManager.Url.del("link",id));
		},
		addLogo:function(desc,href,img){
			PageManager.Utils.httpRequest(PageManager.Url.add3("logo",desc,href,img));
		},
		delLogo:function(id){
			PageManager.Utils.httpRequest(PageManager.Url.del("logo",id));
		},
		addBanner:function(desc,href,img){
			PageManager.Utils.httpRequest(PageManager.Url.add3("banner",desc,href,img));
		},
		delBanner:function(id){
			PageManager.Utils.httpRequest(PageManager.Url.del("banner",id));
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
				name = PageManager.Utils.infilter(value.name);
				href = PageManager.Utils.infilter(value.hrefUrl);

				$("#page_links").append('<tr><td>'+name+'</td><td><a href="'+href+'">'+href+'</a></td><td> <a class="label label-danger" href="javascript:PageManager.View.delLink('+value.id+');">delete</a></td></tr>')
			});
			$.each(data.data.logos,function(key,value){
				desc = PageManager.Utils.infilter(value.descrip);
				href = PageManager.Utils.infilter(value.hrefUrl);
				img = PageManager.Utils.infilter(value.imgUrl);
				$("#page_logos").append('<tr><td>'+desc+'</td><td><a href="'+href+'">'+href+'</a></td><td><img style="width: 5em;" src="'+img+'"></td><td>  <a class="label label-danger" href="javascript:PageManager.View.delLogo('+value.id+');">delete</a></td></tr>');
			});
			$.each(data.data.banners,function(key,value){
				desc = PageManager.Utils.infilter(value.descrip);
				href = PageManager.Utils.infilter(value.hrefUrl);
				img = PageManager.Utils.infilter(value.imgUrl);
				$("#page_banners").append('<tr><td>'+desc+'</td><td><a href="'+href+'">'+href+'</a></td><td><img style="width: 5em;" src="'+img+'"></td><td><a class="label label-info" href=""></td><td><a class="label label-danger" href="javascript:PageManager.View.delBanner('+value.id+');">delete</a></td></tr>');
			});
		},
		addLogo:function(){
			layer.open({
  			type: 1,
  			closeBtn: 1, //不显示关闭按钮
  			anim: 1,
  			shadeClose: true, //开启遮罩关闭
  			title:'add logo',
  			content: '<div style="width:25em;padding:2em;">'+
  					 '<input id="add_logo_desc" class="form-control" placeholder="description" value=""/>'+
  					 '<input id="add_logo_href" style="margin-top:1em;" placeholder="href" class="form-control" value=""/>'+
  					 '<input id="add_logo_img" style="margin-top:1em;" placeholder="imgUrl" class="form-control" value=""/>'+
  					 '<a href="javascript:PageManager.Operate.addLogo($(\'#add_logo_desc\').val(),$(\'#add_logo_href\').val(),$(\'#add_logo_img\').val())"><button style="margin-top:2em;" class="btn btn-info form-control">add</button></a>'+
  					 '</div>'
			});
		},
		addBanner:function(){
			layer.open({
  			type: 1,
  			closeBtn: 1, //不显示关闭按钮
  			anim: 1,
  			shadeClose: true, //开启遮罩关闭
  			title:'add banner',
  			content: '<div style="width:25em;padding:2em;">'+
  					 '<input id="add_banner_desc" class="form-control" placeholder="description" value=""/>'+
  					 '<input id="add_banner_href" style="margin-top:1em;" placeholder="href" class="form-control" value=""/>'+
  					 '<input id="add_banner_img" style="margin-top:1em;" placeholder="imgUrl" class="form-control" value=""/>'+
  					 '<a href="javascript:PageManager.Operate.addBanner($(\'#add_banner_desc\').val(),$(\'#add_banner_href\').val(),$(\'#add_banner_img\').val())"><button style="margin-top:2em;" class="btn btn-info form-control">add</button></a>'+
  					 '</div>'
			});
		},
		addLink:function(){
			layer.open({
  			type: 1,
  			closeBtn: 1, //不显示关闭按钮
  			anim: 1,
  			shadeClose: true, //开启遮罩关闭
  			title:'add link',
  			content: '<div style="width:25em;padding:2em;">'+
  					 '<input id="add_link_name" placeholder="name" class="form-control" value=""/>'+
  					 '<input id="add_link_href" placeholder="href" style="margin-top:1em;" class="form-control" value=""/>'+
  					 '<a href="javascript:PageManager.Operate.addLink($(\'#add_link_name\').val(),$(\'#add_link_href\').val())"><button style="margin-top:2em;" class="btn btn-info form-control">add</button></a>'+
  					 '</div>'
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
			layer.confirm('confirm to delete？', {
  					btn: ['Yes','No'] //按钮
				}, function(){
					PageManager.Operate.delLink(id);
				}, function(){
  					layer.closeAll();
  				});
		},
		delLogo:function(id){
			layer.confirm('confirm to delete？', {
  					btn: ['Yes','No'] //按钮
				}, function(){
					PageManager.Operate.delLogo(id);
				}, function(){
  					layer.closeAll();
  				});
		},
		delBanner:function(id){
			layer.confirm('confirm to delete？', {
  					btn: ['Yes','No'] //按钮
				}, function(){
					PageManager.Operate.delBanner(id);
				}, function(){
  					layer.closeAll();
  				});
		}
	}
});