"use strict";

$(function () {
	$(".select").on("mouseover", function () {
		$(".select_pop").css({ "display": "block" });
	});
	$(".select").on("mouseout", function () {
		$(".select_pop").css({ "display": "none" });
	});
	$(".select_pop").on("mouseout", function () {
		$(".select_pop").css({ "display": "none" });
	});
	$(".select_pop li").on("click", function () {
		$(".select a").html($(this).text());
		$(".select_pop").css({ "display": "none" });
	});

	$(".midarea").on("mouseover", function () {
		$(".zoom").css({ "display": "block" });
		$(".bigarea").css({ "display": "block" });
	});

	$(".midarea").on("mouseout", function () {
		$(".zoom").css({ "display": "none" });
		$(".bigarea").css({ "display": "none" });
	});

	$(".midarea").on("mousemove", function (e) {
		var maxWid = $(".midarea").width() - $(".zoom").width();
		var maxHei = $(".midarea").height() - $(".zoom").height();

		var x = e.pageX - $(".midarea").offset().left;
		var y = e.pageY - $(".midarea").offset().top;

		var _left = x - $(".zoom").width() / 2;
		var _top = y - $(".zoom").height() / 2;

		_left = _left <= 0 ? 0 : _left >= maxWid ? maxWid : _left;
		_top = _top <= 0 ? 0 : _top >= maxHei ? maxHei : _top;

		$(".zoom").css({ "left": _left + "px" });
		$(".zoom").css({ "top": _top + "px" });

		$(".bigarea img").css({ "left": -$(".zoom").position().left / $(".midarea").width() * $(".bigarea img").width() });
		$(".bigarea img").css({ "top": -$(".zoom").position().top / $(".midarea").height() * $(".bigarea img").height() });
	});

	var str6 = "";
	$(".shurukuang").on("input", function () {
		$(".result").css({ "display": "block" });
		$.ajax({
			type: "get",
			url: "https://search.kongfz.com/sug/suggest_server.jsp?_=1570494898129",
			data: {
				"query": $(".shurukuang").val()
			},
			dataType: "jsonp",
			success: function success(data) {
				for (var m in data) {
					str6 += "\n\t\t\t\t\t\t<li class=\"searchitem\">" + data[m] + "</li>\n\t\t\t\t";
				}
				$(".result").append(str6);
			}
		});

		$(".result li").on("click", function () {
			$(".shurukuang").val($(this).text());
			$(".result").css({ "display": "none" });
		});

		$(".shurukuang").on("blur", function () {
			setTimeout(function () {
				$(".result").css({ "display": "none" });
			}, 100);
		});
	});

	$(".all").on("mouseover", function () {
		$(".sub_box").css({ "display": "block" }).stop().animate({ "height": "511px" });
	});

	$(".sub_box").on("mouseover", function () {
		$(".sub_box").css({ "display": "block" }).stop().animate({ "height": "511px" });
	});
	$(".sub_box").on("mouseout", function () {
		$(".sub_box").stop().animate({ "height": "0px" });
		$(".sub_box").css({ "display": "none" });
		$(".all").on("mouseout", function () {
			$(".sub_box").css({ "display": "none" }).stop().animate({ "height": "0px" });
		});
	});

	var id = window.location.search;
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/goodsbyid.do" + id,
		success: function success(data) {
			$(".midarea").append("<img src=" + data.picurl + ">");
			$(".bigarea").append("<img src=" + data.picurl + ">");
			$(".pub").append("上架时间：" + data.pubdate);
			$("h2").append(data.name);
			$(".price").append(data.price);
		}

	});

	$(".numadd,.numdel,.cartadd").click(function (event) {
		event.preventDefault();
	});
	//num+1
	$(".numadd").on("click", function () {
		var num = $(".numinput").val();
		num++;
		$(".numinput").val(num);
		console.log($(".num"));
	});
	//num-1
	$(".numdel").on("click", function () {
		var num = $(".numinput").val();
		num--;
		$(".numinput").val(num);
		if (num < 1) {
			$(".numinput").val(1);
		}
	});
	var token = $.cookie("token");
	var count = 0;
	$.ajax({
		type: "get",
		url: "http://47.104.244.134:8080/cartlist.do",
		data: {
			token: token
		},
		success: function success(data) {
			for (var i in data) {
				count += data[i].count;
			}
			if (count > 99) {
				console.log(count);
				count = 99;
				$(".num").text("99+");
			} else {
				$(".num").text(count);
			}
		}
	});

	//加入购物车

	$(".cartadd").on("click", function () {
		var token = $.cookie("token");
		var id = window.location.search.split("=")[1];
		var number = $(".numinput").val();
		//获取购物车列表并判断
		$.ajax({
			type: "get",
			url: "http://47.104.244.134:8080/cartlist.do",
			data: {
				token: token
			},
			success: function success(data) {
				for (var i in data) {
					//如果购物车已存在此商品
					if (data[i].gid == id) {
						console.log("已存在");
						$.ajax({
							type: "get",
							url: "http://47.104.244.134:8080/cartupdate.do",
							data: {
								gid: id,
								id: data[i].id,
								token: token,
								num: number
							},
							success: function success() {
								$(".spnum").text(number);
								$(".tishi").fadeIn();
								setTimeout(function () {
									$(".tishi").fadeOut();
								}, 1500);
							}
						});
						return;
					}
				}
				console.log("不存在");
				if (number == 1) {
					console.log("数量一件");
					$.ajax({
						type: "get",
						url: "http://47.104.244.134:8080/cartsave.do",
						data: {
							gid: id,
							token: token
						},
						success: function success() {
							console.log("加入1件");
							$(".spnum").text('1');
							$(".tishi").fadeIn();
							setTimeout(function () {
								$(".tishi").fadeOut();
							}, 1500);
						}
					});
				} else {
					console.log("要加入的数量不止一件");
					$.ajax({
						type: "get",
						url: "http://47.104.244.134:8080/cartsave.do",
						data: {
							gid: id,
							token: token
						},
						success: function success(data) {
							console.log("先加入购物车");
							$.ajax({
								type: "get",
								url: "http://47.104.244.134:8080/cartlist.do",
								data: {
									token: token
								},
								success: function success(data) {
									console.log("先加入购物车成功");
									for (var _i in data) {
										if (data[_i].gid == id) {
											console.log("已加入一件");
											console.log(id, data[_i].id, data[_i].gid);
											$.ajax({
												type: "get",
												url: "http://47.104.244.134:8080/cartupdate.do",
												data: {
													gid: id,
													id: data[_i].id,
													token: token,
													num: number - 1
												},
												success: function success(data) {
													console.log(data);
													console.log("再加入" + number + "件");
													$(".spnum").text(number);
													$(".tishi").fadeIn();
													setTimeout(function () {
														$(".tishi").fadeOut();
													}, 1500);
												}
											});
										}
									}
								}
							});
						}
					});
				}
			}
		});
		var count = 0;
		$.ajax({
			type: "get",
			url: "http://47.104.244.134:8080/cartlist.do",
			data: {
				token: token
			},
			success: function success(data) {
				for (var i in data) {
					count += data[i].count;
				}
				if (count > 99) {
					console.log(count);
					count = 99;
					$(".num").text("99+");
				} else {
					$(".num").text(count);
				}
			}
		});
	});
});