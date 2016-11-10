var PageManager = new Object({
	BASE_URL: "http://localhost:8080",
	Url:{
		getPage: function(){
			return PageManager.BASE_URL+"/admin/page/"+Math.random()+"/get";
		}
	},
	Utils:{
		infilter:function(str){
			return str.replace(/\+/g,"/");
		}
	},
	Operate:{
		getPage: function(){
			$.get(PageManager.Url.getPage(),{},function(data,status){
				console.log(data);
				if(status){
					if(data.state){
						PageManager.View.renderPage(data);
					}
				}
				
			});
		}
	},
	View:{
		renderPage:function(data){
			//console.log(data.data);
			$("#page_title").html(data.data.header.title);
			$("#page_label").html(data.data.header.label);
			$("#page_footer").html(data.data.footer.label);
			$("#bt_setpage").attr("href","javascript:PageManager.View.setPage('"+data.data.header.title+"','"+data.data.header.label+"','"+data.data.footer.label+"')")
			$.each(data.data.links,function(key,value){
				name = PageManager.Utils.infilter(value.name);
				href = PageManager.Utils.infilter(value.hrefUrl);

				$("#page_links").append('<a href="'+href+'">'+name+'</a><span> / ');
			});
			$.each(data.data.links,function(key,value){
				name = PageManager.Utils.infilter(value.name);
				href = PageManager.Utils.infilter(value.hrefUrl);

				$("#page_links_ul").append('<li><a href="'+href+'">'+name+'</a></li>');
			});
			
			$.each(data.data.logos,function(key,value){
				desc = PageManager.Utils.infilter(value.descrip);
				href = PageManager.Utils.infilter(value.hrefUrl);
				img = PageManager.Utils.infilter(value.imgUrl);
				$("#page_logos").append('<a class="title animated fadeInLeft" alt="'+desc+'" href="'+href+'"><img class="col-md-2 " style="background:#fff;width:12em;height:4.5em;margin-left:0.5em;" src="'+img+'"/></a>');
			});
			$.each(data.data.banners,function(key,value){
				desc = PageManager.Utils.infilter(value.descrip);
				href = PageManager.Utils.infilter(value.hrefUrl);
				img = PageManager.Utils.infilter(value.imgUrl);
				$("#page_banners").append('<div class="swiper-slide">'+
										  '<a href="'+href+'" alt="'+desc+'"><img src="'+img+'"/>'+
								          '</a></div>');
			});
		}
	}
});