function trackInputValue(input, indicator) {
	input.addEventListener('change', function(e) {
		var value = e.target.value;
		modifyIndicator(value);
	})

	function modifyIndicator(value) {
		indicator.innerHTML = value;
	}
}