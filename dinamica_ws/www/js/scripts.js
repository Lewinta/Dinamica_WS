(function ($) {

	'use strict';

	// =====================================================
	//      PRELOADER
	// =====================================================
	$(window).on('load', function () {
		if ($('.preloader').length) {
			$('.preloader').delay(100).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	// =====================================================
	//      BACK TO TOP BUTTON
	// =====================================================
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 500, 'easeInOutExpo');
		return false;
	});

	// =====================================================
	//      HAMBURGER MENU
	// =====================================================
	$('.navTrigger').on('click', function () {
		$(this).toggleClass('active');
	});

	// =====================================================
	//      SIDEBAR MANAGEMENT
	// =====================================================
	$('#sidebar').mCustomScrollbar({ theme: 'minimal' });

	$('#dismiss, .overlay').on('click', function () {
		$('#sidebar').removeClass('active');
		$('.overlay').removeClass('active');
		$('.navTrigger').removeClass('active');
	});

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').addClass('active');
		$('.overlay').addClass('active');
		$('.collapse.in').toggleClass('in');
		$('a[aria-expanded=true]').attr('aria-expanded', 'false');
	});

	// =====================================================
	//      DROPDOWN MANAGEMENT
	// =====================================================
	$('select').niceSelect();

	// Function for saving the selected dropdown item
    function saveSelectedDropdownItem() {

        // Get the actual value
        var selectedSubject = $('#subjectList option:selected').text();

        // Update hidden field
        $('#subject').val(selectedSubject);
	}

	// When subject is changed, get the new selected item
    $('#subjectList').on('change', function() {
        saveSelectedDropdownItem();
	});

	// If reset is clicked, set the selected item to default
	$('.btn-form-func-remove').on('click', function () {

		$("#subjectList").val(1).niceSelect('update');
		saveSelectedDropdownItem();

	});

	// =====================================================
	//      FILEPOND FILE UPLOAD
	// =====================================================

	// Register plugins
    FilePond.registerPlugin(
        FilePondPluginFileValidateSize,
        FilePondPluginFileValidateType
	);

	// Set default FilePond options
    FilePond.setOptions({

		// Maximum files
		maxFiles: 1,

		// Maximum allowed file size
		maxFileSize: '1MB',

		// Allowed file types
		acceptedFileTypes: ['image/png', 'image/jpeg', 'application/pdf'],

        // Upload to this server end point
        server: 'php/'
    });

	// Turn a file input into a file pond
	var pond = FilePond.create(document.querySelector('input[type="file"]'));

	// =====================================================
	//      FORM INPUT VALIDATION
	// =====================================================
	$('#contactForm').parsley();
	

	// =====================================================
	//      EDITABLE TABLE
	// =====================================================

	const $tableID = $('#table');
	const $BTN = $('#export-btn');
	const $EXPORT = $('#export');
	const newTr = `
	<tr class="hide">
	<td class="pt-3-half" contenteditable="true"> </td>
	<td class="pt-3-half" contenteditable="true"> </td>
	<td class="pt-3-half" contenteditable="true"> </td>
	<td>
	<span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
	</td>
	</tr>`;
	$(".table tbody tr").remove();
	$('tbody').append(newTr);
	$('tbody').append(newTr);
	$('tbody').append(newTr);
	$('.table-add').on('click', 'i', () => {

	// const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

	// if ($tableID.find('tbody tr').length === 0) {

	//  $('tbody').append(newTr);
	// }
	$('tbody').append(newTr);

	// $tableID.find('table').append($clone);
	});

	$tableID.on('click', '.table-remove', function () {

	$(this).parents('tr').detach();
	});

	$tableID.on('click', '.table-up', function () {

	const $row = $(this).parents('tr');

	if ($row.index() === 0) {
	 return;
	}

	$row.prev().before($row.get(0));
	});

	$tableID.on('click', '.table-down', function () {

	const $row = $(this).parents('tr');
	$row.next().after($row.get(0));
	});

	// A few jQuery helpers for exporting only
	jQuery.fn.pop = [].pop;
	jQuery.fn.shift = [].shift;

	$BTN.on('click', () => {

	const $rows = $tableID.find('tr:not(:hidden)');
	const headers = [];
	const data = [];

	// Get the headers (add special header logic here)
	$($rows.shift()).find('th:not(:empty)').each(function () {

	 headers.push($(this).text().toLowerCase());
	});

	// Turn all existing rows into a loopable array
	$rows.each(function () {
	 const $td = $(this).find('td');
	 const h = {};

	 // Use the headers from earlier to name our hash keys
	 headers.forEach((header, i) => {

	   h[header] = $td.eq(i).text();
	 });

	 data.push(h);
	});

	// Output the result
	$EXPORT.text(JSON.stringify(data));
});

})(jQuery);
