var PageManager = new Object({
	BASE_URL: "http://localhost:8080",
	Url:{
		getPage: function(){
			return PageManager.BASE_URL+"/admin/page/"+Math.random()+"/get";
		}
	},
	Utils:{

	},
	Operate:{
		getPage: function(){
			$.get(PageManager.Url.getPage(),{},function(data,status){
				console.log(data);
				PageManager.View.renderPage(data);
			});
		}
	},
	View:{
		renderPage:function(data){
			//console.log(data.data);
			$("#page_title").html("title : "+data.data.header.title);
			$("#page_label").html("label : "+data.data.header.label);
			$("#page_footer").html("footer : "+data.data.footer.label);
			$.each(data.data.links,function(key,value){
				$("#page_links").append('<tr><td>'+value.name+'</td><td><a href="'+value.hrefUrl+'">'+value.hrefUrl+'</a></td><td><a class="label label-info" href="javascript:PageManager.Operate.modifyLink('+value.id+');">modify</a>  <a class="label label-danger" href="javascript:PageManager.Operate.delLink('+value.id+');">delete</a></td></tr>')
			});
			$.each(data.data.logos,function(key,value){
				$("#page_logos").append('<tr><td>'+value.descrip+'</td><td><a href="'+value.hrefUrl+'">'+value.hrefUrl+'</a></td><td><img style="width: 5em;" src="'+value.imgUrl+'"></td><td><a class="label label-info" href="javascript:PageManager.Operate.modifyLogo('+value.id+');">modify</a>  <a class="label label-danger" href="javascript:PageManager.Operate.delLogo('+value.id+');">delete</a></td></tr>');
			});
			$.each(data.data.banners,function(key,value){
				$("#page_banners").append('<tr><td>'+value.descrip+'</td><td><a href="'+value.hrefUrl+'">'+value.hrefUrl+'</a></td><td><img style="width: 5em;" src="'+value.imgUrl+'"></td><td><a class="label label-info" href=""></td><td><a class="label label-info" href="javascript:PageManager.Operate.modifyBanner('+value.id+');">modify</a>  <a class="label label-danger" href="javascript:PageManager.Operate.delBanner('+value.id+');">delete</a></td></tr>');
			});
		}
	}
});