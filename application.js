window.onload = function() {
	var qnt1 = $("#qnt1");
	var qnt2 = $("#qnt2");

	var coin1 = $("#coin1");
	var coin2 = $("#coin2");

	$("#name_coin1").html($("#coin1").val());
	$("#name_coin2").html($("#coin2").val());

	convert(coin1.val(), coin2.val(), qnt2, qnt1.val());

	function convert(from, to, result, quantity){
		$.ajax({
			url: "http://devel.farebookings.com/api/curconversor/" + from + "/" + to + "/" + quantity + "/",
			dataType: 'jsonp',
			success: function (data) {
				result.val(parseFloat(data[to]).toFixed(2));

				$("#resume1").html(parseFloat(data[to]).toFixed(2) + " (" + to + ")");

				convertOne(from, to);
			}
		}); 
	}

	function convertOne(from, to){
		$.ajax({
			url: "http://devel.farebookings.com/api/curconversor/" + from + "/" + to + "/1/",
			dataType: 'jsonp',
			success: function (data) {
				$("#resume2").html("1 (" + from + ") = " + parseFloat(data[to]).toFixed(2) + " (" + to + ")");
			}
		}); 	
	}

	$("#img1").live("click", function(e){
		$("#coin1").click();
	});


	$("#img2").live("click", function(e){
		$("#coin2").click();
	});

	$("#qnt1").live("keyup", function(e){
		quantity = $("#qnt1").val();
		convert(coin1.val(), coin2.val(), qnt2, qnt1.val());
	});

	$("#qnt2").live("keyup", function(e){
		quantity = $("#qnt2").val();
		convert(coin2.val(), coin1.val(), qnt1, qnt2.val());
	});
	
	$("#coin1").live("change", function(e){
		$("#img1").attr("src", "currency/-" + $("#coin1").val() + ".jpg");

		$("#name_coin1").html($("#coin1").val());

		convert(coin1.val(), coin2.val(), qnt2, qnt1.val());
	});

	$("#coin2").live("change", function(e){
		$("#img2").attr("src", "currency/-" + $("#coin2").val() + ".jpg");

		$("#name_coin2").html($("#coin2").val());

		convert(coin2.val(), coin1.val(), qnt1, qnt2.val());
	});
}
