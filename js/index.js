$(function(){
	$("a").bind("mouseover",function(){
		$(this).find(".icon-xia").removeClass("icon-xia").addClass("icon-shang")
	})
	$("a").bind("mouseout",function(){
		$(this).find(".icon-shang").removeClass("icon-shang").addClass("icon-xia")
	})
	$(".area").bind("mouseover",function(){
		$(this).find(".icon-xia").removeClass("icon-xia").addClass("icon-shang")
	})
	$(".area").bind("mouseout",function(){
		$(this).find(".icon-shang").removeClass("icon-shang").addClass("icon-xia")
	})
	$(".curent_area li").on("click",function(){
		$(".diqu").html($(this).text()+" <span class='iconfont icon-xia'>");
		$(".curent_area").css({"display":"none"});
	})
	$(".area").on("mouseover",function(){
		$('.curent_area').css({"display":"block"});
	})
	$(".area").on("mouseout",function(){
		$('.curent_area').css({"display":"none"});
	})
	$(".select").on("mouseover",function(){
		$(".select_pop").css({"display":"block"});
	})
	$(".select").on("mouseout",function(){
		$(".select_pop").css({"display":"none"});
	})
	$(".select_pop").on("mouseout",function(){
		$(".select_pop").css({"display":"none"});
	})
	
	$(".select_pop li").on("click",function(){
		$(".select a").html($(this).text());
		$(".select_pop").css({"display":"none"});
	})
	var index = 0;
	var timer = setInterval(function(){
		index++;
		if(index>$(".swiper-container img").length-1){index=0;}
		$("circle").css({"z-index":2});
		$(".swiper-container img").eq(index).css({"z-index":"1"}).siblings().css({"z-index":0});
		$(".circle span").eq(index).css({"background":"red","color":"white"}).siblings().css({"background":"white","color":"black"});
	},4000)
	
	$(".swiper-container img").on("mouseover",function(){
		clearInterval(timer);
	})
	$(".swiper-container img").on("mouseout",function(){
		timer = setInterval(function(){
		index++;
		if(index>$(".swiper-container img").length-1){index=0;}
		$("circle").css({"z-index":2});
		$(".swiper-container img").eq(index).css({"z-index":"1"}).siblings().css({"z-index":0});
		$(".circle span").eq(index).css({"background":"red","color":"white"}).siblings().css({"background":"white","color":"black"});
	},4000)
	})
	
	$(".circle span").on("mouseover",function(){
		$(".swiper-container img").eq($(this).index()).css({"z-index":"1"}).siblings().css({"z-index":0});
		$(this).css({"background":"red","color":"white"}).siblings().css({"background":"white","color":"black"});
		index = $(this).index();
	})
	var str = "";
	$.ajax({
		type:"get",
		url:"https://www.fastmock.site/mock/e0f574f3cfae9d6ad10c50c31a237f0f/api/book_online",
		success:function(data){
			for(var i in data.data.list){
				str+=`
					<div class="item">
						<img src="${data.data.list[i].image}">
						<p class="bookname">${data.data.list[i].title}</p>
						<p class="zuozhe">${data.data.list[i].name}</p>
						<p>
							<span class="price">${data.data.list[i].price}</span>
							<span class="oldprice">${data.data.list[i].oldprice}</span>
						</p>
					</div>
				`
			}
			$(".page1").append(str);
			$(".page2").append(str);
			$(".page3").append(str);
			$(".page4").append(str);
			let count = 0;
			$(".page").eq(0).css({"left":0})
			$(".page").eq(1).css({"left":"750px"})
			$(".page").eq(2).css({"left":"1500px"})
			$(".page").eq(3).css({"left":"2250px"})
			
			$(".btn_next").eq(0).on("click",function(){
				count++;
				if(count>$(".page").length-1){count=0;}
				$(".book_online").stop().animate({"left":-count*750+'px'});
				
				console.log(count)
			})
			$(".btn_prev").eq(0).on("click",function(){
				count--;
				if(count<0){count=$(".page").length-1;}
				$(".book_online").stop().animate({"left":-count*750+'px'});
				console.log(count)
				
			})
			
		}
	});
	var str2 = "";
	$.ajax({
		type:"get",
		url:"https://www.fastmock.site/mock/e0f574f3cfae9d6ad10c50c31a237f0f/api/roll",
		success:function(data){
			for(var j in data.data.list){
				str2+=`
					<div class="slide">
						<img src="${data.data.list[j].image}">
						<p class="bookname">${data.data.list[j].title}</p>
						<p>
							<span class="price">${data.data.list[j].price}</span>
						</p>
						<p>
							<span class="oldprice">${data.data.list[j].oldprice}</span>
						</p>
					</div>
				`
			}
			$(".wrapper").append(str2);
			$(".slide").eq(0).css({"left":0})
			$(".slide").eq(1).css({"left":"240px"})
			$(".slide").eq(2).css({"left":"480px"})
			$(".slide").eq(3).css({"left":"720px"})
			$(".slide").eq(4).css({"left":"960px"})
			let count = 0;
			$(".btn_next").eq(1).on("click",function(){
				count++;
				if(count>$(".slide").length-1){count=0;}
				$(".wrapper").stop().animate({"left":-count*240+'px'});
				$(".smcircle span").eq(count).css({"background":"#487A6F"}).siblings().css({"background":"#969696"})
			})
			$(".btn_prev").eq(1).on("click",function(){
				count--;
				if(count<0){count=$(".slide").length-1;}
				$(".wrapper").stop().animate({"left":-count*240+'px'});
				console.log(count)
				$(".smcircle span").eq(count).css({"background":"#487A6F"}).siblings().css({"background":"#969696"})
			})
			
			$(".smcircle span").on("mouseover",function(){
				$(this).css({"background":"#487A6F"}).siblings().css({"background":"#969696"})
				$(".wrapper").stop().animate({"left":-$(this).index()*240+'px'});
			})
			
		}
	});
	
	
	var str3 = "";
	$.ajax({
		type:"get",
		url:"https://www.fastmock.site/mock/e0f574f3cfae9d6ad10c50c31a237f0f/api/bang",
		success:function(data){
			for(var k in data.data.list){
				str3+=`
					<div class="items">
						<span class="id">${data.data.list[k].id}</span>
						<img src="${data.data.list[k].image}" class="ph">
						<div class="text">
						<p class="bookname">${data.data.list[k].title}</p>
						<p>
							<span class="price">${data.data.list[k].price}</span>
						</p>
						<p>
							<span class="oldprice">${data.data.list[k].oldprice}</span>
						</p>
						<p class="pinglun">${data.data.list[k].num}条评论</p>
						</div>
					</div>
				`
			}
			$(".num1").append(str3);
			$(".num2").append(str3);
			
			
			$(".bang_title li").on("mouseover",function(){
				$(this).addClass("active").siblings().removeClass("active");
				console.log($(this).index())
				$(".num1").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"})
			})
			$(".bang_title li").on("mouseover",function(){
				$(this).addClass("active").siblings().removeClass("active");
				$(".num2").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"})
			})
			
			$(".items").on("mouseover",function(){
				$(this).find(".ph").css({"display":"inline-block"})
				.end().find(".price").css({"display":"inline-block"})
				.end().find(".text").css({"width":"70px","line-height":"21px","text-indent":"0"})
				.end().find(".oldprice").css({"display":"inline-block"})
				.end().find(".pinglun").css({"display":"inline-block"})
				.end().siblings().find(".price").css({"display":"none"})
				.end().find(".ph").css({"display":"none"})
				.end().find(".text").css({"width":"120px","line-height":"28px","text-indent":"10px"})
				.end().find(".oldprice").css({"display":"none"})
				.end().find(".pinglun").css({"display":"none"})
			})
			
		}
	});
	//商品列表
//	
	var list1 = ""; 
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodsbytid.do?tid=13&page=1&limit=10",
		success:function(data){
			for(var k in data.data){
				list1+=`
					<div class="itemss">
						<img src="${data.data[k].picurl}">
						<a href="detail.html?id=${data.data[k].id}">
						<p class="bookname">${data.data[k].name}</p>
						</a>
						<p class="icon"><span class="iconfont icon-shu"></span>当当独家特供</p>
						<p>
							<span class="price">${data.data[k].price}元</span>
						</p>
					</div>
				`
			}
			$(".page11").append(list1);
			$(".page111").append(list1);
		}
	});
	
	
	
	
	$(".tnav li").on("mouseover",function(){
		var page = $(this).index()+1;
		var list3 = ""; 
		console.log(page);
		$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/goodsbytid.do?tid=13&limit=10",
			data:{
				page:page
			},
			success:function(data){
				for(var k in data.data){
					list3+=`
						<div class="itemss">
						
							<img src="${data.data[k].picurl}">
							<a href="detail.html?id=${data.data[k].id}">
								<p class="bookname">${data.data[k].name}</p>
							</a>	
							<p class="icon"><span class="iconfont icon-shu"></span>当当独家特供</p>
							<p>
								<span class="price">${data.data[k].price}元</span>
							</p>
						
						</div>
					`
				}
				$(".dujia").eq(page-1).append(list3);
			}
		});
	})
	
	
	$(".tnav li").on("mouseover",function(){
		$(this).addClass("active1").siblings().removeClass("active1");
		$(".dujia").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"})
	})
	
	$(".tnav2 li").on("mouseover",function(){
		$(this).addClass("active2").siblings().removeClass("active2");
		$(".tuijian").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"})
	})

	$(".tnav2 li").on("mouseover",function(){
		var page2 = $(this).index()+1;
		var list4 = ""; 
		console.log(page2);
		$.ajax({
			type:"get",
			url:"http://47.104.244.134:8080/goodsbytid.do?tid=13&limit=10",
			data:{
				page:page2
			},
			success:function(data){
				for(var k in data.data){
					list4+=`
						<div class="itemss">
							<img src="${data.data[k].picurl}">
							<p class="bookname">${data.data[k].name}</p>
							<p class="icon"><span class="iconfont icon-shu"></span>当当独家特供</p>
							<p>
								<span class="price">${data.data[k].price}元</span>
							</p>
						</div>
					`
				}
				$(".tuijian").eq(page2-1).append(list4);
			}
		});
	})
	
	$(".hotzuojia li").on("mouseover",function(){
		$(this).addClass("active2").siblings().removeClass("active2");
		$(".hotzuozhe").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"})
	})
	
	
	$(".icon-huan").on("click",function(){
		if($(".diyipi").hasClass("active3")){
			$(".diyipi").removeClass("active3").siblings().addClass("active3");
		}else{
			$(".diyipi").addClass("active3").siblings().removeClass("active3");
		}
	})
	
	
	
	var str5 = ""; 
	$.ajax({
		type:"get",
		url:"https://www.fastmock.site/mock/e0f574f3cfae9d6ad10c50c31a237f0f/api/tejia",
		success:function(data){
			for(var n in data.data.list){
				str5+=`
				<li class= "jia">
						<img src="${data.data.list[n].image}">
						<span class="price">${data.data.list[n].price}</span>
						<span class="shuming">${data.data.list[n].name}</span>
						</li>
				`
			}
			
			$(".storey_eight ul").append(str5);
			
		}
	});
	
	$(window).scroll(function(){
		if($(this).scrollTop()>300){
			$(".dingbu").css({"display":"block"});
		}else{
			$(".dingbu").css({"display":"none"});
		}
	})
	
	$(".dingbu").on("click",function(){
		$('html,body').animate({scrollTop:0});
	})
	
	//完善输入
	$(".shurukuang").on("input",function(){
		$(".result").css({"display":"block"})
		$.ajax({
			type:"get",
			url:"http://search.winxuan.com/autoCom.jsonp",
			data:{
				callback:"data",
				"keyword":$(".shurukuang").val(),
			},
			dataType:"jsonp",
			success:function(data){
				let str6 = "";
				$(".result").html("");
				for(var m in data.autoComResult){
				str6+=`
						<li class="searchitem">${data.autoComResult[m].name}</li>
				`
				}
				$(".result").html(str6);
				
				$(".result li").on("click",function(){
					console.log($(this).text());
					$(".shurukuang").val($(this).text());
					$(".result").css({"display":"none"});
				})
				
				$(".shurukuang").on("blur",function(){
					setTimeout(function(){
		       			 $(".result").css({"display":"none"});
		    		}, 200);
				})

				
			}
		});
		
		
	})
	
	//全部商品分类
	var str7 = "";
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/goodstypelist.do?l=1",
		success:function(data){
			for(let i in data){
				str7+=`
						<li class="yijiliebiao" data_id=${data[i].id}>${data[i].name}</li>
				`
				}
			$(".sub_box ul").append(str7);
			var str8 = "";
			$.ajax({
				type:"get",
				url:"http://47.104.244.134:8080/goodstypelist.do?l=2",
				success:function(data){
					for(let i in data){
						$parent = $(".yijiliebiao[data_id="+data[i].parentid+"]")
						str8 = `
						<li data-id="${data[i].id}" class="erjiliebiao">${data[i].name}</li>
						`
												
						if($parent.children().length == 0){
							$parent.append("<ul>"+str8+"</ul>");
						}else{
							$parent.children().append(str8);
						}
					}

					$(".all").on("mouseover",function(){
						$(".sub_box").css({"display":"block"}).stop().animate({"height":"160px"})
					})
					
					$(".sub_box").on("mouseover",function(){
						$(".sub_box").css({"display":"block"}).stop().animate({"height":"160px"})
					})
					$(".sub_box ul li").hover(function(){
						$(this).find("ul").css({"display":"block"});
						$(this).siblings().find("ul").css({"display":"none"});
					},function(){
						$(this).find("ul").css({"display":"block"});
					})
					$(".sub_box ul li ul").on("mouseover",function(){
						$(this).show();
					})
					
					$(".sub_box").on("mouseout",function(){
						$(".sub_box").stop().animate({"height":"0px"})
						$(".sub_box").css({"display":"none"})
						$(".all").on("mouseout",function(){
								$(".sub_box").css({"display":"none"}).stop().animate({"height":"0px"})
						})
					})
					
				}
			});
		}
		
	});
	
	let token = $.cookie("token");
	let count = 0;
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/cartlist.do",
		data:{
			token:token
		},
		success:function(data){
			for(let i in data){
				count += data[i].count;
			}
			if(count>99){
				$(".num").text("99+");
			}else{
				$(".num").text(count);
			}
			
		}
	});
	
	
})