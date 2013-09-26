var addPager = function() {
	$('#custpager').remove();
	
	$('body').append('<div id="custpager" style="color:#000;background:#ccc;border:1px solid black;padding:10px;position:fixed;top:10px;right:10px;opacity:.75;"> \		<p>Starting at  \		<select name="startIndex" id="custpager-start"></select>, \		show at most \		<select name="startIndex" id="custpager-count"> \
			<option>(default)</option> \			<option>5</option> \
			<option>10</option> \			<option>20</option> \			<option>30</option> \			<option>40</option> \			<option>50</option> \			<option>60</option> \			<option>70</option> \			<option>80</option> \			<option>90</option> \			<option>100</option> \		</select> \		items.</p> \
		<div id="custpager-status" style="color:red;font-weight:bold;text-align:center;"></div> \	 </div>');
	 
	var applyPaging = function() {
		$('body').append('<style type="text/css" id="style-hideall">#pullrequest-diff{display:none!important;}</style>');
		
		var displayCount = parseInt($('#custpager-count').val());
		var startAt = parseInt($('#custpager-start').val());
		var items = $('.bb-udiff');
		
		if (isNaN(displayCount) || displayCount > items.length) {
			displayCount = items.length;
		}
		
		var visibleItems = 0;
		items.each(function(index, element) {
			if (index < startAt || visibleItems > displayCount) {
				$(this).hide()
			}
			else {
				visibleItems++;
				$(this).show();
			}
		});
		
		if (visibleItems < items.length) {	
			$('#custpager-status').text((items.length - visibleItems) + ' items have been hidden.');
		}
		else {
			$('#custpager-status').text('');
		}
		
		$('#style-hideall').remove();
	}

	var selectHtml = '';
	$('.bb-udiff').each(function(index, element) {
		var fileName = $(this).find('h1').text();
		selectHtml += '<option value="' + index + '">' + (index + 1) + '. ' + fileName.substring(fileName.indexOf('/') != -1 ? fileName.lastIndexOf('/') + 1 : 0) + '</option>';
	});
	$('#custpager-start').append(selectHtml);
	
	$('#custpager-start').on('change', $.proxy(applyPaging));
	$('#custpager-count').on('change', $.proxy(applyPaging));
};
addPager();