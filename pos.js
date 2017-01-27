/**
 * @author Joseph Nielson
 */

//Variables
var businessName = "";
var productNames = [""];
var productPrices = [0];
var totalPrice = 0;
var receipt = [0];
var addOrDiscount = 0;
var transactions = [];

$(document).ready(function() {
	
	//Show get started
	$("#create_products").hide();
	$("#point_of_sale").hide();
	$("#confirm_order").hide();
	$("#show_transactions").hide();
	
	//Button to link Google Account
	$('#link_g_account').click(function()
	{
		location = "https://accounts.google.com/o/oauth2/v2/auth?response_type='token'& \
			client_id=234987774387-h39chts8aro880r188duftnrdi03cmsr.apps.googleusercontent.com& \
			redirect_uri=https%3A%2F%2F127.0.0.1%3A8020%2FLemonade%20Stand%20Point-of-Sale/point_of_sale.html& \
			scope="
;	});
	
	//Saves business name and navigates to Create Product List
	$("#next_create_list").click(function() 
	{
		businessName = $("#business_name").val();
		$("#title").text(businessName);
		$("#get_started").hide();
		$("#create_products").show();
		
	}); //end click next_create_list
	
	//Programs add row button
	$("#add_row").click(function()
	{
		var nextProductNumber = receipt.length + 1;
		productNames[productNames.length] = 0;
		productPrices[productPrices.length]= 0;
		receipt[receipt.length] = 0;
		
		
		var product = "product" + nextProductNumber;
		var price = "price" + nextProductNumber;
		
		$("#enter_products").append("<label for=" + product + ">Product " + nextProductNumber + ":</label> \
        		<input type='text' id=" + product + " /> \
        		<label for=" + price + ">Price: $</label> \
        		<input type='text' id=" + price + "><br>");
        
	}); // end add row
	
	//Button saves product list and goes to sales
	$("#go_to_sales").click(function() 
	{
		//Populates product names and prices
		for (var i = 0; i < receipt.length; i++) 
		{
			var product = "#product" + (i + 1);
			var price = "#price" + (i + 1);
			productNames[i] = $(product).val();
			productPrices[i] = $(price).val();
		}
		
		//Add product buttons to POS page
		$("#buy_buttons").empty(); // when editing product list
		for (var i = 0; i < receipt.length; i++) 
		{
			var buy = "buy" + (i + 1);
			
			//Creates buttons for products in HTML
			$("#buy_buttons").append("<input type='button' class='buyButton' id=" + buy + " value='" + productNames[i] + "  " + productPrices[i] + "'></input><br>");
		}
		
		//Defines event methods for product buttons
		$(".buyButton").click(function()
		{
			var productNumber = $(this).attr("id")[3];// 3 is the index in 'buy1', 'buy2', so on 
			totalPrice += parseFloat(productPrices[productNumber - 1]);
			receipt[productNumber - 1] ++;
			$("#total_price").text(totalPrice.toFixed(2).toString());
		});
		
		$("#create_products").hide();
		$("#point_of_sale").show();
	}); // end click next_create_list
	
	//Buttons for add
	$("#add").click(function()
	{
		if (parseFloat($("#add_amount").val()) > 0)
		{
			var add_amount = parseFloat($("#add_amount").val());
			addOrDiscount += add_amount;
			totalPrice += add_amount;
			$("#total_price").text(totalPrice.toFixed(2).toString());
		}
	}); // end add button
	
	//Button for discount
	$("#discount").click(function()
	{
		if (parseFloat($("#discount_amount").val()) > 0)
		{
			var discount_amount = parseFloat($("#discount_amount").val());
			addOrDiscount -= discount_amount;
			totalPrice -= discount_amount;
			$("#total_price").text(totalPrice.toFixed(2).toString());
		}
	}); // end discount button
	
	//Button to edit product list
	$("#edit_product_list").click(function()
	{
		$("#point_of_sale").hide();
		$("#create_products").show();
	});
	
	//Button to clear order
	$("#clear").click(function()
	{
		totalPrice = 0;
		addOrDiscount = 0;
		$("#total_price").text(totalPrice.toFixed(2).toString());
		for (var i=0; i < receipt.length; i++) 
		{
			receipt[i] = 0;
		};
	});
	
	//Go to checkout
	$("#checkout").click(function()
	{
		//Populate receipt table
		for (var i = 0; i < receipt.length; i++)
		{
			if (receipt[i] > 0)
			{
				$("#receipt").append("<tr><td>" + productNames[i] + "</td><td>" + receipt[i] + "</td><td>$" + (receipt[i] * productPrices[i]).toFixed(2) + "</td></tr>");
			}
		}; // end populate receipt table
		
		//Populate add or discount row
		$("#addDiscountData").text("$" + addOrDiscount.toFixed(2));
		
		//Populate grand total
		$("#totalData").text("$" + totalPrice.toFixed(2) + "");
		
		//Switch to checkout
		$("#point_of_sale").hide();
		$("#confirm_order").show();
	});
	
	//Save order and return to POS
	$("#save_order").click(function()
	{
		//Retrieves current date and time
		var currentTime = new Date();
		
		//Copies receipt to save to transactions array
		var receiptCopy = [];
		for (var i = 0; i < receipt.length; i++)
		{
			receiptCopy[i] = receipt[i];
		}
		
		//Save the receipt and total price to the transactions array
		transactions[transactions.length] = [currentTime, totalPrice, receiptCopy, addOrDiscount];
		
		//Reset receipt and total price
		totalPrice = 0;
		addOrDiscount = 0;
		$("#receipt").empty();
		$("#total_price").text(totalPrice.toFixed(2).toString());
		for (var i=0; i < receipt.length; i++) 
		{
			receipt[i] = 0;
		};
		
		//Navigate to point-of-sale
		$("#confirm_order").hide();
		$("#point_of_sale").show();
		
	});
	
	//Go to transactions
	$("#go_to_transactions").click(function()
	{
		//Populate column headings with product names
		//Note: data class is removed each time the page is navigated away from
		for (var i = 0; i < receipt.length; i++)
		{
			$("#transaction_headings").append("<td class='data'>" + productNames[i] + "</td>");
		};
		
		//Append add/discount column
		$("#transaction_headings").append("<td class='data'>Add or Discount</td>");
		
		//Populate rows for transactions
		for (var i = 0; i < transactions.length; i++)
		{
			//Create an HTML string for the quanities of each product
			var receiptHTMLString = "";
			for (var j = 0; j < transactions[i][2].length; j++)
			{
				//If the receipt contains a quantity greater than zero, add it to the HTML string
				if (transactions[i][2][j] > 0)
				{
					receiptHTMLString += "<td>" + transactions[i][2][j] + "</td>";
				}
				
				else
				{
					receiptHTMLString += "<td></td>";
				}
			};
			$("#transaction_list").append("<tr class='data'><td>" + transactions[i][0].toString() + "</td><td>$" + transactions[i][1].toFixed(2) + "</td>" + receiptHTMLString + "<td>$" + transactions[i][3].toFixed(2) + "</td></tr>");
		};
		
		//Calculate total of all transactions and add to total row
		var totalTotals = 0;
		for (var i = 0; i < transactions.length; i++)
		{
			totalTotals += transactions[i][1];
		};
		$("#transaction_total").text("$" + totalTotals.toFixed(2));
		
		//Populate total row wih product totals
		for (var i = 0; i < receipt.length; i++)
		{
			var totalQuantity = 0;
			for (var j = 0; j < transactions.length; j++)
			{
				totalQuantity += transactions[j][2][i];
			}
			$("#transaction_totals").append("<td class='data'><strong>" + totalQuantity + "</strong></td>");
		};
		
		//Populate total of add and discount
		var addOrDiscountTotals = 0;
		for (var i = 0; i < transactions.length; i++)
		{
			addOrDiscountTotals += transactions[i][3];
		};
		$("#transaction_totals").append("<td class='data'><strong>$" + addOrDiscountTotals.toFixed(2) + "</strong></td>");
		
		$("#point_of_sale").hide();
		$("#show_transactions").show();
	});
	
	//Return to sales from transactions
	//Include empty transactions screen
	$("#return_to_sales").click(function()
	{
		//Clears transactions screen
		$(".data").remove();
		
		//Shows Point-of-Sale screen
		$("#show_transactions").hide();
		$("#point_of_sale").show();
	});
}); // end ready
