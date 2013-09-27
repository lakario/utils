var addPager = function() {
	$('#custpager').remove();
	
	$('body').append('<div id="custpager" style="width:475px;color:#000;background:#ccc;border:1px solid black;position:fixed;top:10px;right:10px;height:45px;"> \
		<div style="width:15px;background:red;float:left;height:45px;"></div> \
		<div style="float:left;margin:0;padding:10px 5px;"> \
			<p>Starting at  \
			<select name="startIndex" id="custpager-start" style="max-width:150px"></select>, \
			show at most \
			<select name="startIndex" id="custpager-count"> \
				<option>(all)</option> \
				<option>1</option> \
				<option>5</option> \
				<option>10</option> \
				<option>25</option> \
				<option>50</option> \
			</select> \
			items.</p> \
			<div id="custpager-status" style="clear:both;color:red;font-weight:bold;text-align:center;margin-top:15px"></div> \
		</div> \	 </div>');
	 
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
			if (index < startAt || visibleItems >= displayCount) {
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
	
	$('#custpager').on('dblclick', function() {
		var $this = $(this);
		if (parseInt($this.css('right')) > 0) {
			$this.animate({'right': '-465px'}, 'slow');
		}
		else {
			$this.animate({'right': '10px'}, 'slow');
		}

	});
	
	$('.bb-udiff .heading').css({'user-select':'none','-o-user-select':'none','-moz-user-select':'none','-khtml-user-select':'none','-webkit-user-select':'none'});
	
	$('.bb-udiff .heading').unbind('.custpager').on('dblclick.custpager', function() {
		var container = $(this).siblings('.refract-container');
		if (container.is(':visible')) {
			container.slideUp('slow');
		} else {
			container.slideDown('slow');
		}
	});
};
addPager();