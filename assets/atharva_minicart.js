
		var cart_layout = "sidebar";
		var cart_display = "click";
		var cart_title = "Cart Item(s)";
		var cart_desc = "This app gives your shoppers a quick access to cart preview in a click.";
		var checkout_btn_title = "CHECKOUT";
		var cart_btn_title = "VIEW CART";
		var empty_cart_title = "Your shopping cart is empty!";
		var total_title = "Subtotal";
		var background_color = "#efefef";
		var border_color = "#e4e2e2";
		var text_color = "#78665e";
		var desc_color = "#3e3e3e";
		var product_text_color = "#4f4f4f";
		var product_price_color = "#4f4f4f";
		var btn_text_color = "#ffffff";
		var cart_btn_color = "#2a1c09";
		var checkout_btn_color = "#230805";
		var subtotal_text_color = "#463f3f";
		var minicart_count_color = "#8f7d70";
		var quantity_button_color = "";
		var minicart_visibility_overlay = "1";
		var minicart_visibility_addtocart = "1";
		var cart_counter_visibility = "1";
		var minicart_font_family = "Merienda";
		var minicart_image_url = "https://as-minicart.atharvasystem.com/minicart-app/images/default.jpg";
		var minicart_css_code = "";
		var minicart_js_code = "";
		var minicart_cart_btn_visibility = "1";
		var minicart_checkout_btn_visibility = "1";
		var minicart_dropdown_top_margin = "80px";
		$(document).ready(function() {

	$("#CartCount, .cart-link__bubble--visible, .site-header__cart-bubble--visible, .header-cart-btn .cart-count, .site-header__cart-indicator").css('background-color','#ff000000').html(''); // hide original cartcounter
	$(".cart-popup-wrapper").remove();	// remove original cartpopup	
	var qtyJS = "jQuery('.quantity').each(function() {  var spinner = jQuery(this), input = spinner.find('.minicart_input_qty'), btnUp = spinner.find('.quantity-up'), btnDown = spinner.find('.quantity-down'), min = input.attr('min'), max = input.attr('max'); btnUp.click(function() { var oldValue = parseFloat(input.val()); if (oldValue >= max) { var newVal = oldValue; } else { var newVal = oldValue + 1; } spinner.find('input').val(newVal);   spinner.find('input').trigger('change'); }); btnDown.click(function() { var oldValue = parseFloat(input.val()); if (oldValue <= min) { var newVal = oldValue; } else { var newVal = oldValue - 1; } spinner.find('input').val(newVal); spinner.find('input').trigger('change'); }); }); ";
	
	window.AtharvaMinicart = window.AtharvaMinicart || {};
	
	AtharvaMinicart.removeMinicartBtn = function(variant_id) { 		
		$(".atharva_minicart_table").addClass('section_disabled');
		$('.atharva_minicart_table').before("<div class='qty_update_loader'></div>");
		var data11 = { id: variant_id, quantity: 0 };
	    $.ajax({
	        type: 'post',
	        url: '/cart/change.js',
	        data: data11,
	        dataType: 'json',
	        success: function(data) {
	        	AtharvaMinicart.getAtharvaMinicart();	
	        },
	        fail: function() {
	          console.log('request fail..');
	        }
	    });
	};

	AtharvaMinicart.updateItemQuantity = function(variant_id) { 
		$(".atharva_minicart_table").addClass('section_disabled');
		$('.atharva_minicart_table').before("<div class='qty_update_loader'></div>");
		var qty = $('#quantity-'+variant_id).val();
		var data11 = { quantity: qty, id: variant_id };
	    $.ajax({
	        type: 'post',
	        url: '/cart/change.js',
	        data: data11,
	        dataType: 'json',
	        success: function(data) {
	        	AtharvaMinicart.getAtharvaMinicart();	
	        },
	        fail: function() {
	          console.log('request fail..');
	        }
	    });
	};

	AtharvaMinicart.addMinicartBtn = function() { 
		x = document.querySelectorAll('form[action="/cart/add"] input[type="submit"], form[action="/cart/add"] button[type="submit"], button[type="submit"][name="add"], form[action="/cart/add"] button[data-product-add]');
		$(x).click(function(){ //load cart data onClick add to cart button 
		    setTimeout(function() {
				AtharvaMinicart.getAtharvaMinicart(); 
			}, 1400);
			if(minicart_visibility_addtocart==1){
			  setTimeout(function() {
				  $('#atharva_minicart').addClass('show_minicart');
				  $('.minicart-overlay').show();  
			  },1800);
			}
		});
	};
	  
	AtharvaMinicart.getCartCount = function() {     
		$.getJSON( "/cart.js", function( data ) {	
			var totalcount = data['item_count'];
			$(".site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link").append("<div id='atharva_minicart_count'><span>"+totalcount+"</span></div>");
		});
	}

	AtharvaMinicart.getAtharvaMinicart = function() { 
		$.getJSON( "/cart.js", function( data ) { 
			var cart_content = "";
			var p_id="";
			var p_handle="";
			var p_title="";
			var property="";
			var p_price="";
			var p_image="";			
			items = data['items'];
			itemcount = data['item_count'];
			currency = data['currency'];
			total_price = currency+" "+(data['original_total_price']/100).toFixed(2);
		  	cart_content = cart_content + "<div class='minicart_header'><div class='minicart-title'>"+cart_title+"</div><span class='minicart-desc'>"+cart_desc+"</span></div>";
			cart_content = cart_content + "<div class='atharva_minicart_close'>x</div>";
		   	cart_content = cart_content + "<table class='atharva_minicart_table'>";
		   	$.each( items, function( key, val ) {  
		    	cart_content = cart_content + "<tr>";  	
		    	each_data = val; 
		    	$.each( each_data, function( key, val ) {
		    		if(key == 'title')	{  p_title=val;    }
		    		if(Shopify.shop=="chahneke-north.myshopify.com" && key == 'properties')	{  
		    			var properties=val; 
		    			property = " - ";
		    			$.each( properties, function( key, val ) {  
		    				property = property+val+" / ";
		    			});
		    			property = property.substring(0, property.length-2);
		    		}
		    		if(key == 'handle')	{  p_handle='/products/'+val;    }
		    		if(key == 'price')	{  p_price=(val/100).toFixed(2);    }
		    		if(key == 'original_line_price')	{  p_price=(val/100).toFixed(2);    }
		    		if(key == 'image')	{
		    		 	p_image=val;  if(p_image==null){ p_image=minicart_image_url; }  		    		 	
				        p_image = p_image.replace('.jpg', '_200x.jpg');
				        p_image = p_image.replace('.jpeg', '_200x.jpeg');
				        p_image = p_image.replace('.png', '_200x.png');
		    		}
		    		if(key == 'variant_id')	{  variant_id=val;    }
		    		if(key == 'quantity')	{  quantity=val;    }
					if(key == 'line_level_total_discount')	{ 
		    			cart_content = cart_content + "<td> <div class='minicart_table_left'><a href='"+p_handle+"'><img class='minicart_product_image' src='"+p_image+"' width='50px'></a></div> <div class='minicart_table_right'><div class='minicart_product_text'>"+p_title+property+"</div> <div class='minicart_quantity quantity'><input type='number' class='minicart_input_qty' id='quantity-"+variant_id+"' value='"+quantity+"' min='0' pattern='[0-9]*' onchange='AtharvaMinicart.updateItemQuantity("+variant_id+");' /> <div class='minicart-quantity-nav'><div class='minicart-quantity-button quantity-up'>+</div><div class='minicart-quantity-button quantity-down'>-</div></div> </div> <div class='minicart_test_price' style='display:none;'>"+currency+" "+p_price+"</div> <div class='minicart_product_price'>"+currency+" "+p_price+"</div> <a onclick='AtharvaMinicart.removeMinicartBtn("+variant_id+");' class='minicart_product_remove'>X</a> </div> </td>";
		    		}
		    	});	  
		    	cart_content = cart_content + "</tr>";	
		  	});
		  	if(itemcount==0){
				cart_content = cart_content + "<tr><td colspan='4' class='atharva_minicart_empty'><span>"+empty_cart_title+"</span></td></tr>";
		  	}
		  	cart_content = cart_content + "</table>";
		  	cart_content = cart_content + "<div class='minicart_bottom_stiky'>";
		  	cart_content = cart_content + "<div class='minicart_subtotal'><strong class='title'>"+total_title+"</strong><strong class='price'>"+total_price+"</strong></div>";
		  	cart_content = cart_content + "<div class='minicart_button'><a href='/cart' class='atharva_minicart_cart'>"+cart_btn_title+"</a> <a href='/checkout' class='atharva_minicart_checkout'>"+checkout_btn_title+"</a></div>";
		  	cart_content = cart_content + "</div>";
		  	cart_content = cart_content + "<script id='atharva_minicart_qty_js'>"+qtyJS+"</script>";
		    $("#atharva_minicart").html(cart_content);
			if(cart_counter_visibility==1){
			    $("#atharva_minicart_count span").html(itemcount);  //add total cart count on page load
			    if($("div.minicart-title span").length>0){ $("div.minicart-title span").html(itemcount); } //add total cart count on page load
			}		

			$('#atharva_minicart_custom_js, #atharva_minicart_custom_css').remove();
			$('body').append("<script type='text/javascript' id='atharva_minicart_custom_js'>"+minicart_js_code+"</script>");
			$('body').append("<style type='text/css' id='atharva_minicart_custom_css'>"+minicart_css_code+"</style>");

		});
	}     
  
	/*----------START STYLESHEET-----------*/  
		$('body').append('<link href="https://fonts.googleapis.com/css?family='+minicart_font_family+'" rel="stylesheet" type="text/css">');
		
		var cart_checkout_btn_visibility = "";
		if(minicart_cart_btn_visibility==0){ cart_checkout_btn_visibility = cart_checkout_btn_visibility + " .atharva_minicart_cart{ display:none;} .atharva_minicart_checkout{  width: 100% !important;  margin: 0px; }"; }
		if(minicart_checkout_btn_visibility==0){ cart_checkout_btn_visibility = cart_checkout_btn_visibility + " .atharva_minicart_checkout{ display:none;} .atharva_minicart_cart{  width: 100% !important;  margin: 0px; }"; }
		if(minicart_cart_btn_visibility==0 && minicart_checkout_btn_visibility==0) { cart_checkout_btn_visibility = cart_checkout_btn_visibility + " #atharva_minicart table{ height: calc(100vh - 185px) !important; }"; }

		var header_desc_dropdown_css = "", header_desc_sidebar_css = "";
		if(cart_desc==""){
			header_desc_sidebar_css = ".minicart_header { min-height: 52px; } #atharva_minicart table {  height: calc(100vh - 170px); }";
			header_desc_dropdown_css = ".minicart_header { min-height: 52px; } #atharva_minicart table { height: 360px; }";
		}

		var qty_disable_css = ".qty_update_loader { top: 50%; left: 45%;  transform: translate(-45%,-50%); position: absolute;  z-index: 1; border: 5px solid #727272; border-radius: 50%; border-top: 5px solid #262626; width: 50px; height: 50px; -webkit-animation: spin 1s linear infinite; animation: spin 1s linear infinite; } @-webkit-keyframes spin { 0% { -webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); }} .section_disabled{ pointer-events: none; opacity: 0.5; }";
		var font_family = "#atharva_minicart .minicart-title, #atharva_minicart input, #atharva_minicart .minicart-quantity-nav div { font-family: "+minicart_font_family+" !important;  } #atharva_minicart { font-family: "+minicart_font_family+" !important; font-size: 15px !important;  }"; 
		if(cart_layout=='sidebar'){ 		
			var minicart_overlay_style = "background: rgba(0, 0, 0, 0.7);";
			var minicart_layout = cart_checkout_btn_visibility+" "+qty_disable_css+" "+font_family+" #atharva_minicart .minicart-desc{padding-bottom:0}.minicart_header{line-height: 1.4; padding: 10px 10px;text-align: left;border-bottom: none!important;background: #fff;margin: 5px;width: calc(100% - 10px);min-height: 112px;display: flex;flex-flow: column; box-shadow: #d9d7d7 1px 2px 4px 1px; }.minicart_header .minicart-title{font-size:22px; line-height: 1.2;  letter-spacing: 0em;}#atharva_minicart table tr{padding:5px}#atharva_minicart table tr td{position:relative;background-color:#fff; box-shadow: #e6e6e6 1px 1px 4px 1px;}#atharva_minicart table tr td:first-last{padding:0}.atharva_minicart_close{position:absolute;right:11px;top:10px;border-radius:0;width:20px;height:20px;line-height:20px;cursor:pointer;font-size:16px;font-weight:400} table .minicart_product_remove{float:right;border:none!important;border-radius:0;padding:2px 6px;cursor:pointer;font-weight:400;font-size:14px;color:#929292;position:absolute;top:0px;right:0px}#atharva_minicart .minicart_product_price{font-weight:700;text-align:left;padding:5px 0; float: right;}#atharva_minicart .minicart_button{padding-top:0;padding-bottom:0}#atharva_minicart table{ background:"+background_color+"!important; width:100%!important;margin-bottom:0;overflow:auto;height:calc(100vh - 230px); display:block;overflow-x:hidden;overflow-y:auto; border-bottom: #e6e6e6 1px solid;}.quantity{position:relative}.quantity input[type=number]::-webkit-inner-spin-button,.quantity input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.quantity input[type=number]{-moz-appearance:textfield}.quantity input{text-align:center; width:64px;height:36px;line-height:1.65;float:left;display:block;padding:0;margin:0;padding-left:2px; padding-right: 22px; border:1px solid #eee; font-family:Roboto,sans-serif;font-size:14px;color:#4a4a4a; border-radius: 0px;}.quantity input:focus{outline:0}.minicart-quantity-nav{float:left;position:relative;height:36px; margin-right: 10px; } .minicart-quantity-button.quantity-up{position:absolute;height:50%;top:0;border-bottom:1px solid #eee; font-weight:600; }.minicart-quantity-button.quantity-down{position:absolute;bottom:0px;height:48%; font-weight: 600; } .minicart-quantity-button{position:relative;cursor:pointer;border-left:1px solid #eee;width:20px;text-align:center;color:#333;font-size:14px;font-family:'Trebuchet MS',Helvetica,sans-serif!important;line-height:18px;-webkit-transform:translateX(-100%);transform:translateX(-100%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}#atharva_minicart{max-width:400px;top:0;right:-450px!important;left:auto;margin:0;transform:none;height:100%!important;background:"+background_color+"!important;padding:0!important;border:10px solid "+border_color+"!important;border-radius:0;z-index:999;opacity:0;visibility:hidden;-webkit-transition:ease all .55s;-moz-transition:ease all .55s;transition:ease all .55s;display:block}#atharva_minicart.show_minicart{opacity:1;visibility:visible;right:0!important} "+header_desc_sidebar_css+" ";
		}
		if(cart_layout=='dropdown'){ 
			var minicart_overlay_style = "";
			var header_height = $("header").height()+"px";
			var minicart_layout = cart_checkout_btn_visibility+" "+qty_disable_css+" "+font_family+" #atharva_minicart .minicart-desc{padding-bottom:0}.minicart_header{padding: 10px 10px;text-align: left;border-bottom: none!important;background: #fff;margin: 5px;width: calc(100% - 10px);min-height: 112px;display: flex;flex-flow: column; box-shadow: #d9d7d7 1px 2px 4px 1px; }.minicart_header .minicart-title{font-size:22px; line-height: 1.2; letter-spacing: 0em;}#atharva_minicart table tr{padding:5px}#atharva_minicart table tr td{position:relative;background-color:#fff; box-shadow: #e6e6e6 1px 1px 4px 1px;}#atharva_minicart table tr td:first-last{padding:0}.atharva_minicart_close{position:absolute;right:11px;top:10px;border-radius:0;width:20px;height:20px;line-height:20px;cursor:pointer;font-size:16px;font-weight:400} table .minicart_product_remove{float:right;border:none!important;border-radius:0;padding:2px 6px;cursor:pointer;font-weight:400;font-size:14px;color:#929292;position:absolute;top:0px;right:0px}#atharva_minicart .minicart_product_price{font-weight:700;text-align:left;padding:5px 0; float: right;}#atharva_minicart .minicart_button{padding-top:0;padding-bottom:0}#atharva_minicart table{ background:"+background_color+"!important; width:100%!important;margin-bottom:0;overflow:auto;height:300px; display:block;overflow-x:hidden;overflow-y:auto; border-bottom: #e6e6e6 1px solid;}.quantity{position:relative}.quantity input[type=number]::-webkit-inner-spin-button,.quantity input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.quantity input[type=number]{-moz-appearance:textfield}.quantity input{text-align:center; width:64px;height:36px;line-height:1.65;float:left;display:block;padding:0;margin:0;padding-left:2px; padding-right: 22px; border:1px solid #eee; font-family:Roboto,sans-serif;font-size:14px;color:#4a4a4a; border-radius: 0px;}.quantity input:focus{outline:0}.minicart-quantity-nav{float:left;position:relative;height:36px; margin-right: 10px; } .minicart-quantity-button.quantity-up{position:absolute;height:50%;top:0;border-bottom:1px solid #eee; font-weight:600; }.minicart-quantity-button.quantity-down{position:absolute;bottom:0px;height:48%; font-weight: 600; } .minicart-quantity-button{position:relative;cursor:pointer;border-left:1px solid #eee;width:20px;text-align:center;color:#333;font-size:14px;font-family:'Trebuchet MS',Helvetica,sans-serif!important;line-height:18px;-webkit-transform:translateX(-100%);transform:translateX(-100%);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}#atharva_minicart{max-width:400px;top:0;right:0px!important;left:auto;margin:0;transform:none;height:100%!important;background:"+background_color+"!important;padding:0!important;border:10px solid "+border_color+"!important;border-radius:0;z-index:999;opacity:0;visibility:hidden;-webkit-transition:none;-moz-transition:none;transition:none;display:none; -webkit-box-shadow:0px 6px 12px -3px rgba(0,0,0,.4); -moz-box-shadow:0px 6px 12px -3px rgba(0,0,0,.4); box-shadow:0px 6px 12px -3px rgba(0,0,0,.4); } #atharva_minicart.show_minicart{opacity:1;visibility:visible;right:40px!important;display:block;top:"+minicart_dropdown_top_margin+";height:526px!important} @media screen and (max-width: 700px) {#atharva_minicart.show_minicart{right: 0px!important;}} "+header_desc_dropdown_css+" ";
		}

		
		minicart_layout = minicart_layout + "@media screen and (max-width: 450px) {   #atharva_minicart .minicart_bottom_stiky { background:"+background_color+" !important; position: absolute; -webkit-overflow-scrolling: touch; transform: translate3d(0, 0, 0); backface-visibility: hidden; padding-bottom: 5px; bottom: -10px; border-bottom: 10px solid "+border_color+" !important;  width: 100%; }   }";    
		$('body').append("<style type='text/css' id='atharva_minicart_css'> .minicart_test_price { color: red; } .cart-link.cart-bubble--visible:before { background-color : #ff000000; } tr:first-child th:after, tr:first-child td:after { border-bottom: 0px; } .atharva_minicart_table::-webkit-scrollbar { width: 8px; } .atharva_minicart_table::-webkit-scrollbar-track { background: #f1f1f1; } .atharva_minicart_table::-webkit-scrollbar-thumb { background: #888; } .atharva_minicart_table::-webkit-scrollbar-thumb:hover { background: #555; } .minicart_header { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; } input[type='number'] { width: 45px; padding: 5px; } .minicart_button, .minicart_subtotal { line-height: 1.5; width:100%; padding: 10px 5px; float: left;} .minicart_subtotal .title {  width:auto; float: left; font-weight: 500; color: "+subtotal_text_color+"; } .minicart_subtotal .price { width:auto; float: right; font-weight: 500; color: "+subtotal_text_color+"; } #atharva_minicart tr { border:0px;} .minicart_product_text{ color: "+product_text_color+"; } .minicart_product_price{ text-align: right; color: "+product_price_color+"; } #atharva_minicart table a { border-bottom: 0px; } table .minicart_product_remove { float: right; border: 1px solid #d6d6d6 !important; border-radius: 5px; padding: 5px 10px; cursor: pointer; } .minicart-title { color: "+text_color+"; margin: 0 0 5px; } .minicart-desc{ margin-bottom: 0; color: "+desc_color+";  padding-bottom:10px; font-weight:400;  line-height: 1.8; } .atharva_minicart_checkout{ -webkit-transition: background 1s; transition: background 0.5s; width: 100%; text-align: center; display: block; background-color: "+checkout_btn_color+" !important; padding: 7px 20px; color: "+btn_text_color+" !important; border: 1px solid "+checkout_btn_color+"; } .atharva_minicart_cart{ -webkit-transition: background 1s; transition: background 0.5s; text-decoration:none; margin-bottom:0px; width: 100%; text-align: center; display: block;  background-color: "+cart_btn_color+" !important; padding: 7px 20px; color: "+btn_text_color+" !important; border: 1px solid "+cart_btn_color+"; } .atharva_minicart_empty{ text-align: center; padding: 0px 10px; display: flex !important; align-items: center;justify-content: center; height: 100px;} .atharva_minicart_empty span { color: "+product_text_color+"} #atharva_minicart { color:white; font-weight:900; position:absolute; width:100%; height:auto; z-index:100; background:#000; }.minicart-overlay { position: fixed; left: 0px; width: 100%; "+ minicart_overlay_style +" height: 100%; top: 0px; z-index: 1000; display:none; }.atharva_minicart_close { position: absolute; right: 0px; top: 0px; border-radius:0px; width: 30px; height: 30px; background: "+text_color+"; color: #ffffff; text-align: center; line-height: 30px; cursor: pointer; font-size: 22px; font-weight: normal; } #atharva_minicart th, #atharva_minicart td { border: none !important; }  #atharva_minicart { color: white !important; font-weight: 400 !important; position: fixed !important; width: 95% !important; padding: 5px !important; height: auto !important; z-index: 1000000000 !important; background: "+background_color+" !important; border: 10px solid "+border_color+" !important; border-radius: 8px; max-width: calc(700px - 30px); top: 50%; right: 0px; left: 50%; margin: 0px; transform: translate(-50%, -50%); display: none; } #atharva_minicart table { width:100% !important; margin-bottom:20px; overflow: auto;  display: block; overflow-x: hidden; overflow-y: auto; } #atharva_minicart table tbody, #atharva_minicart table tbody tr, #atharva_minicart table tbody tr td { width:100%; display: block; border-radius: 3px; } .atharva_minicart_checkout, .atharva_minicart_cart{ text-decoration: none; border-radius: 0px; float: left;width: calc(50% - 10px ) !important; font-weight: normal; text-transform: uppercase;text-shadow: initial; letter-spacing: 1px;}.atharva_minicart_checkout:hover { border: 1px solid "+checkout_btn_color+" !important; background-color:#ffffff !important; color:"+checkout_btn_color+" !important;}  .atharva_minicart_cart:hover { border: 1px solid "+cart_btn_color+" !important; background-color:#ffffff !important; color: "+cart_btn_color+" !important;} .atharva_minicart_checkout {margin-left: 10px;}.atharva_minicart_cart{margin-right: 10px; text-decoration:none;} #atharva_minicart_count { display: flex; align-items: center; justify-content: center; position: absolute; right: 0; font-size: 9px; top: 0; font-weight: bold; background-color: "+minicart_count_color+"; color: #fff; border-radius: 50%; min-width: 2em; height: 2em; }  @media screen and (max-width: 600px) { th, td { padding: 5px; } } "+ minicart_layout +" .minicart_table_left{max-width:60px;display:inline-block;vertical-align:middle;margin-right:10px;width:100%; border: #eaeaea 1px solid; padding: 3px; } .minicart_table_right{display:inline-block;max-width:calc(100% - 80px);vertical-align:middle;width:100%}.minicart_table_left img{display:block;text-align:center;margin:auto}.minicart_product_text{margin-bottom:5px; padding-right: 10px;} th, td { padding: 10px 10px; } .minicart_quantity input { background-color: white; color:"+product_text_color+";} .site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link { position: relative; } #localization_form .selectors-form__item{ display:none; } </style>");
		
	/*----------END STYLESHEET-----------*/ 

	/*----------START JAVASCFRIPT-----------*/

		var unbindJs = " $('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').unbind('click'); ";  //$('form[action=\"/cart/add\"] button[type=\"submit\"]').unbind('click');

		var quantity_js = " jQuery(document).ready(function(){  "+qtyJS+"  }); "; 
		
		if(cart_display=='hover'){
			if(cart_layout=='sidebar'){ 
				$('body').append("<script type='text/javascript' id='atharva_minicart_js'> "+unbindJs+" jQuery('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').mouseover(function(e) { e.preventDefault(); return false; }); jQuery('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').mouseover(function() { jQuery('.minicart-overlay').toggle(); jQuery('#atharva_minicart').addClass('show_minicart'); jQuery('#atharva_minicart').mouseleave(function(){ jQuery('#atharva_minicart').removeClass('show_minicart'); jQuery('.minicart-overlay').hide();  });   }); jQuery(document).on('click', '.atharva_minicart_close, .minicart-overlay', function(){ jQuery('#atharva_minicart').removeClass('show_minicart'); jQuery('.minicart-overlay').toggle(); });  "+quantity_js+" </script>");
			}
			if(cart_layout=='dropdown'){ 
				$('body').append("<script type='text/javascript' id='atharva_minicart_js'> "+unbindJs+" jQuery('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').mouseover(function(e) { e.preventDefault(); return false; }); jQuery('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').mouseover(function() { jQuery('.minicart-overlay').toggle(); jQuery('#atharva_minicart').addClass('show_minicart'); jQuery('#atharva_minicart').mouseleave(function(){ jQuery('#atharva_minicart').removeClass('show_minicart'); jQuery('.minicart-overlay').hide();  });   }); jQuery(document).on('click', '.atharva_minicart_close, .minicart-overlay', function(){ jQuery('#atharva_minicart').removeClass('show_minicart'); jQuery('.minicart-overlay').toggle(); });  "+quantity_js+" </script>");
			} 
		}
		if(cart_display=='click'){
			if(cart_layout=='sidebar'){
				$('body').append("<script type='text/javascript' id='atharva_minicart_js'> "+unbindJs+" jQuery('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').on('click', function(e) { e.preventDefault(); return false; }); jQuery('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').click(function() { jQuery('.minicart-overlay').toggle(); jQuery('#atharva_minicart').addClass('show_minicart');  }); jQuery(document).on('click', '.atharva_minicart_close, .minicart-overlay', function(){ jQuery('#atharva_minicart').removeClass('show_minicart'); jQuery('.minicart-overlay').toggle(); });  "+quantity_js+" </script>");
			}
			if(cart_layout=='dropdown'){ 
				$('body').append("<script type='text/javascript' id='atharva_minicart_js'> "+unbindJs+" jQuery('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').on('click', function(e) { e.preventDefault(); return false; }); jQuery('.site-header__cart, .header-cart-btn, .site-nav__link--icon.cart-link, .header-bar__module .header-bar__sep + .cart-page-link').click(function() { jQuery('.minicart-overlay').toggle(); jQuery('#atharva_minicart').addClass('show_minicart');  }); jQuery(document).on('click', '.atharva_minicart_close, .minicart-overlay', function(){ jQuery('#atharva_minicart').removeClass('show_minicart'); jQuery('.minicart-overlay').toggle(); });  "+quantity_js+" </script>");
			} 			
		}

	/*----------END JAVASCFRIPT-----------*/
	
	/*----------- START DATA LOAD ON PAGE LOAD ----------- */
		$('body').append("<span class='minicart-overlay'></span>");
		var elem = document.createElement("div");
		elem.setAttribute("id","atharva_minicart");
		document.body.appendChild(elem);
		document.getElementById("atharva_minicart").innerHTML = "Some Text";
		if(cart_layout=='sidebar'){
			$('#atharva_minicart').attr('class','atharva_minicart_layout_sidebar');
		}	
		if(cart_layout=='dropdown'){
			$('#atharva_minicart').attr('class','atharva_minicart_layout_dropdown');
		}
		if(cart_counter_visibility==1){
			AtharvaMinicart.getCartCount(); 	//cart count on page load
		}
		AtharvaMinicart.getAtharvaMinicart(); 	//get minicart data on pageload event
		AtharvaMinicart.addMinicartBtn();  		// load add to cart function
	/*----------- END DATA LOAD ON PAGE LOAD ----------- */

});