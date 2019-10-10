"use strict";

$(function () {
	$(".btn_login").click(function (event) {
		event.preventDefault();
	});
	$(".username").on("blur", function () {
		var username = $(".username").val();
		if (username == "" || username == " ") {
			$(".usernametip").fadeIn();
		} else {
			$(".usernametip").fadeOut();
		}
	});
	$(".password").on("blur", function () {
		var password = $(".password").val();
		if (password == "" || password == " ") {
			$(".passwordtip").fadeIn();
		} else {
			$(".passwordtip").fadeOut();
		}
	});
	$(".email").on("blur", function () {
		var email = $(".email").val();
		if (email == "" || email == " ") {
			$(".emailtip").fadeIn();
		} else {
			$(".emailtip").fadeOut();
		}
	});

	$(".btn_login").on("click", function () {
		var username = $(".username").val();
		var password = $(".password").val();
		var email = $(".email").val();
		var re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
		if (username == "" || username == " ") {
			$(".usernametip").fadeIn();
		} else {
			$(".usernametip").fadeOut();
			if (password == "" || password == " ") {
				$(".passwordtip").fadeIn();
			} else {
				$(".passwordtip").fadeOut();
				if (re.test(email) == false) {
					$(".emailtip").fadeIn();
				} else {
					//验证用户名
					$.get("http://47.104.244.134:8080/username.do", {
						username: username
					}, function (data) {
						if (data.code == 0) {
							alert("用户名已被注册！");
						} else {
							//验证邮箱
							$.get("http://47.104.244.134:8080/useremail.do", {
								email: email
							}, function (data) {
								if (data.code == 0) {
									alert("邮箱已被注册！");
								} else {
									$.post("http://47.104.244.134:8080/usersave.do", {
										username: username,
										password: password,
										email: email,
										sex: "男"
									});
									$("#login").css({ "display": "block" });
								}
							});
						}
					});
				}
			}
		}
	});
});