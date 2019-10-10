$(function(){
	
	
	//show
	let token = $.cookie("token");
	var str = ""
	$.ajax({
		type:"get",
		url:"http://47.104.244.134:8080/cartlist.do",
		data:{
			token:token
		},
		success:function(data){
			for(let i in data){
				str += `
					<div class="good" data-id="${data[i].id}">
						<input type="checkbox" class="checkbtn"/>
						<img src="${data[i].goods.picurl}"/>
						<a href="detail.html?id=${data[i].goods.id}"><p class="name">${data[i].goods.name}</p></a>
						<span class="price">${data[i].goods.price}</span>
						<div class="numbox">
							<a href="#" class="numadd" data-id="${data[i].id}" data-gid="${data[i].gid}">+</a>
							<input type="text" value=${data[i].count } class="num" data-id="${data[i].id}" data-gid="${data[i].gid}"/>
							<a href="#" class="numdel" data-id="${data[i].id}" data-gid="${data[i].gid}">-</a>
						</div>
						<span class="allprice">${data[i].count*data[i].goods.price}</span>
						<span class="del" data-id="${data[i].id}" data-gid="${data[i].gid}">删除</span>
					</div>
				`
				
			}
			$(".cartlist").append(str);
			//全选
			
			$(".checkbtn").click(function(){
				if($(".checkbtn:checked").length == $(".checkbtn").length){
					$("#checkAll").prop("checked",true);
				}else{
					$("#checkAll").prop("checked",false);
				}
				zongjia();
			})
			
			var zongjia = function(){
				let totalprice = 0;
				let goodsnum = 0;
				for(let i =0;i<$(".checkbtn:checked").length;i++){
					if($(".checkbtn:checked")){
						totalprice += Number($(".checkbtn:checked").eq(i).parent().find(".allprice").text());
						goodsnum += Number($(".checkbtn:checked").eq(i).parent().find(".num").val()) 
						console.log(totalprice,goodsnum);
					}
				}
				$(".zongjia").text("￥ "+totalprice);
				$(".goodsnum").text(goodsnum);
			}
				
				
			if($(".checkbtn:checked").length == 0){
				$(".zongjia").text("￥ 0")
				$(".goodsnum").text("0");
			}
			
			
			
			
			$(".numadd,.numdel,.jiesuanbtn").click(function(event){
				event.preventDefault();
			});
			//num+1
			$(".numadd").on("click",function(){
				let num = $(this).parent().find(".num").val();
				let id = $(this).attr("data-id");
				let gid = $(this).attr("data-gid");
				num++;
				$(this).parent().find(".num").val(num);
				let price = $(this).parent().parent().find(".price").text();
				let allprice = num*price*1;
				$.ajax({
					type:"get",
					url:"http://47.104.244.134:8080/cartupdate.do",
					data:{
						id:id,
						gid:gid,
						num:1,
						token:token
					},
					success:function(data){
						console.log(data)
					}
				});
				$(this).parent().parent().find(".allprice").text(allprice);
				zongjia();
			})
			
		
			//num-1
			$(".numdel").on("click",function(){
				let num = $(this).parent().find(".num").val();
				let id = $(this).attr("data-id");
				let gid = $(this).attr("data-gid");
				num--;
				if(num<1){
					num = 1;
				}else{
					$.ajax({
					type:"get",
					url:"http://47.104.244.134:8080/cartupdate.do",
					data:{
						id:id,
						gid:gid,
						num:-1,
						token:token
					},
					success:function(){
					}
				});
				}
				$(this).parent().find(".num").val(num);
				let price = $(this).parent().parent().find(".price").text();
				let allprice = num*price*1;
				
				$(this).parent().parent().find(".allprice").text(allprice);
				zongjia();
			})
			
			//删除
			$(".del").on("click",function(){
				let id = $(this).attr("data-id");
				let gid = $(this).attr("data-gid");
				$.ajax({
					type:"get",
					url:"http://47.104.244.134:8080/cartupdate.do",
					data:{
						id:id,
						gid:gid,
						num:0,
						token:token
					},
					success:function(){
					}
				});
				$(this).parent().remove();
				zongjia();
			})
			
			
			//全选
			$("#checkAll").click(function(){
				if($("input:checked").length == $(".checkbtn").length){
					$("#checkAll").prop("checked",false);
					$(".checkbtn").prop("checked",false);
				}else{
					$("input[type='checkbox']").prop("checked",true);
				}
				zongjia();
			});
			
			
			//input输入 添加多个商品
			$(".num").on("blur",function(){
				let id = $(this).attr("data-id");
				let gid = $(this).attr("data-gid");
				let count1 = $(this).val();
				let price = $(this).parent().parent().find(".price").text();
				let allprice = count1*price*1;
				let _this = $(this);
				console.log(id,gid,count1)
				$.ajax({
					type:"get",
					url:"http://47.104.244.134:8080/cartlist.do",
					data:{
						token:token
					},
					success:function(data){
						console.log(data)
						for(let i in data){
							if(id==data[i].id){
								let count2 = data[i].count;
								let thisid = data[i].id;
								let thisgid = data[i].gid;
								console.log(count1,count2)
								if(count1>=count2){
									$.ajax({
										type:"get",
										url:"http://47.104.244.134:8080/cartupdate.do",
										data:{
											id:thisid,
											gid:thisgid,
											num:count1-count2,
											token:token
										},
										success:function(){
										}
									});
									$(_this).parent().parent().find(".allprice").text(allprice);
									zongjia();
								}else{
									$.ajax({
										type:"get",
										url:"http://47.104.244.134:8080/cartupdate.do",
										data:{
											id:thisid,
											gid:thisgid,
											num:-(count2-count1),
											token:token
										},
										success:function(data){
										}
									});
									$(_this).parent().parent().find(".allprice").text(allprice);
									zongjia();
								}
							}
						}
					}
				});
			})
			
			
			
		}
	});
	
	
	
	
	
	
})