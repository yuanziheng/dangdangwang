"use strict";

$(function () {

	//show
	var token = $.cookie("token");
	var str = "";
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/cartlist.do",
		data: {
			token: token
		},
		success: function success(data) {
			for (var i in data) {
				str += "\n\t\t\t\t\t<div class=\"good\" data-id=\"" + data[i].id + "\">\n\t\t\t\t\t\t<input type=\"checkbox\" class=\"checkbtn\"/>\n\t\t\t\t\t\t<img src=\"" + data[i].goods.picurl + "\"/>\n\t\t\t\t\t\t<a href=\"detail.html?id=" + data[i].goods.id + "\"><p class=\"name\">" + data[i].goods.name + "</p></a>\n\t\t\t\t\t\t<span class=\"price\">" + data[i].goods.price + "</span>\n\t\t\t\t\t\t<div class=\"numbox\">\n\t\t\t\t\t\t\t<a href=\"#\" class=\"numadd\" data-id=\"" + data[i].id + "\" data-gid=\"" + data[i].gid + "\">+</a>\n\t\t\t\t\t\t\t<input type=\"text\" value=" + data[i].count + " class=\"num\" data-id=\"" + data[i].id + "\" data-gid=\"" + data[i].gid + "\"/>\n\t\t\t\t\t\t\t<a href=\"#\" class=\"numdel\" data-id=\"" + data[i].id + "\" data-gid=\"" + data[i].gid + "\">-</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span class=\"allprice\">" + data[i].count * data[i].goods.price + "</span>\n\t\t\t\t\t\t<span class=\"del\" data-id=\"" + data[i].id + "\" data-gid=\"" + data[i].gid + "\">\u5220\u9664</span>\n\t\t\t\t\t</div>\n\t\t\t\t";
			}
			$(".cartlist").append(str);
			//全选

			$(".checkbtn").click(function () {
				if ($(".checkbtn:checked").length == $(".checkbtn").length) {
					$("#checkAll").prop("checked", true);
				} else {
					$("#checkAll").prop("checked", false);
				}
				zongjia();
			});

			var zongjia = function zongjia() {
				var totalprice = 0;
				var goodsnum = 0;
				for (var _i = 0; _i < $(".checkbtn:checked").length; _i++) {
					if ($(".checkbtn:checked")) {
						totalprice += Number($(".checkbtn:checked").eq(_i).parent().find(".allprice").text());
						goodsnum += Number($(".checkbtn:checked").eq(_i).parent().find(".num").val());
						console.log(totalprice, goodsnum);
					}
				}
				$(".zongjia").text("￥ " + totalprice);
				$(".goodsnum").text(goodsnum);
			};

			if ($(".checkbtn:checked").length == 0) {
				$(".zongjia").text("￥ 0");
				$(".goodsnum").text("0");
			}

			$(".numadd,.numdel,.jiesuanbtn").click(function (event) {
				event.preventDefault();
			});
			//num+1
			$(".numadd").on("click", function () {
				var num = $(this).parent().find(".num").val();
				var id = $(this).attr("data-id");
				var gid = $(this).attr("data-gid");
				num++;
				$(this).parent().find(".num").val(num);
				var price = $(this).parent().parent().find(".price").text();
				var allprice = num * price * 1;
				$.ajax({
					type: "get",
					url: "http://47.104.244.134:8080/cartupdate.do",
					data: {
						id: id,
						gid: gid,
						num: 1,
						token: token
					},
					success: function success(data) {
						console.log(data);
					}
				});
				$(this).parent().parent().find(".allprice").text(allprice);
				zongjia();
			});

			//num-1
			$(".numdel").on("click", function () {
				var num = $(this).parent().find(".num").val();
				var id = $(this).attr("data-id");
				var gid = $(this).attr("data-gid");
				num--;
				if (num < 1) {
					num = 1;
				} else {
					$.ajax({
						type: "get",
						url: "http://47.104.244.134:8080/cartupdate.do",
						data: {
							id: id,
							gid: gid,
							num: -1,
							token: token
						},
						success: function success() {}
					});
				}
				$(this).parent().find(".num").val(num);
				var price = $(this).parent().parent().find(".price").text();
				var allprice = num * price * 1;

				$(this).parent().parent().find(".allprice").text(allprice);
				zongjia();
			});

			//删除
			$(".del").on("click", function () {
				var id = $(this).attr("data-id");
				var gid = $(this).attr("data-gid");
				$.ajax({
					type: "get",
					url: "http://47.104.244.134:8080/cartupdate.do",
					data: {
						id: id,
						gid: gid,
						num: 0,
						token: token
					},
					success: function success() {}
				});
				$(this).parent().remove();
				zongjia();
			});

			//全选
			$("#checkAll").click(function () {
				if ($("input:checked").length == $(".checkbtn").length) {
					$("#checkAll").prop("checked", false);
					$(".checkbtn").prop("checked", false);
				} else {
					$("input[type='checkbox']").prop("checked", true);
				}
				zongjia();
			});

			//input输入 添加多个商品
			$(".num").on("blur", function () {
				var id = $(this).attr("data-id");
				var gid = $(this).attr("data-gid");
				var count1 = $(this).val();
				var price = $(this).parent().parent().find(".price").text();
				var allprice = count1 * price * 1;
				var _this = $(this);
				console.log(id, gid, count1);
				$.ajax({
					type: "get",
					url: "http://47.104.244.134:8080/cartlist.do",
					data: {
						token: token
					},
					success: function success(data) {
						console.log(data);
						for (var _i2 in data) {
							if (id == data[_i2].id) {
								var count2 = data[_i2].count;
								var thisid = data[_i2].id;
								var thisgid = data[_i2].gid;
								console.log(count1, count2);
								if (count1 >= count2) {
									$.ajax({
										type: "get",
										url: "http://47.104.244.134:8080/cartupdate.do",
										data: {
											id: thisid,
											gid: thisgid,
											num: count1 - count2,
											token: token
										},
										success: function success() {}
									});
									$(_this).parent().parent().find(".allprice").text(allprice);
									zongjia();
								} else {
									$.ajax({
										type: "get",
										url: "http://47.104.244.134:8080/cartupdate.do",
										data: {
											id: thisid,
											gid: thisgid,
											num: -(count2 - count1),
											token: token
										},
										success: function success(data) {}
									});
									$(_this).parent().parent().find(".allprice").text(allprice);
									zongjia();
								}
							}
						}
					}
				});
			});
		}
	});
});