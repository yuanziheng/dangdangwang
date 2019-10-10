$(function(){
		
		function draw(domobj) {
			//保存生成的验证码
			let show_num = "";
		
			var canvas_width = domobj.width();
			var canvas_height = domobj.height();
			var canvas = domobj[0]; //获取到canvas的对象，演员
			var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
			canvas.width = canvas_width;
			canvas.height = canvas_height;
		
			var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
			var aCode = sCode.split(",");
			var aLength = aCode.length; //获取到数组的长度
		
			for(var i = 0; i <= 3; i++) {
				var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
				var deg = Math.random() * 10 * Math.PI / 180; //产生0~10之间的随机弧度
				var txt = aCode[j]; //得到随机的一个内容
		
				show_num += txt.toLowerCase();
		
				var x = 4 + i * 13; //文字在canvas上的x坐标
				var y = 15; //文字在canvas上的y坐标
				context.font = "bold 16px 微软雅黑";
		
				context.translate(x, y);
				context.rotate(deg);
		
				context.fillStyle = "rgb(0,0,0)";
				context.fillText(txt, 0, 0);
		
				context.rotate(-deg);
				context.translate(-x, -y);
			}
			console.log(show_num);
			for(var i = 0; i <= 2; i++) { //验证码上显示线条
				context.strokeStyle = randomColor();
				context.beginPath();
				context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
				context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
				context.stroke();
			}
			for(var i = 0; i <= 30; i++) { //验证码上显示小点
				context.strokeStyle = randomColor();
				context.beginPath();
				var x = Math.random() * canvas_width;
				var y = Math.random() * canvas_height;
				context.moveTo(x, y);
				context.lineTo(x + 1, y + 1);
				context.stroke();
			}
			return show_num;
		}
		
		function randomColor() { //得到随机的颜色值
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return "rgb(" + r + "," + g + "," + b + ")";
		}
		
		
		$(".btn").on("click",function(){
			var username = $(".username").val();
			var password = $(".psw").val();
			
			$.post("http://47.104.244.134:8080/userlogin.do",{
				name:username,
				password:password,
			},data=>{
				console.log($(".yzm").val())
				if($(".yzm").val()!=show_num){
					$(".error").fadeIn();
					show_num = draw($("#canvas"));
				}else{
					$(".error").fadeOut();
					if(data.code==0){
						$.cookie("token",data.data.token,{
							path:"/",
							expires:7
						});
						let token = $.cookie("token")
						$(window).attr('location','index.html');
					}else{
						show_num = draw($("#canvas"));
						alert("用户名或密码错误，请重试");
					}
				}
				
				
			});
			
			
		})
		show_num = draw($("#canvas"));
//		console.log($(".yzm").val())
//		$(".yzm").on("blur",function(){
//			console.log($("yzh").text())
//			let show_num = "";
//			show_num = draw($("#canvas"));
//			if($("yzh").text()!=show_num){
//				$(".error").fadeIn();
//			}else{
//				$(".error").fadeOut();
//			}
//		})
		
		$(".change").on("click",function(){
			show_num = draw($("#canvas"));
		})
		
		
		
		
		
		
})