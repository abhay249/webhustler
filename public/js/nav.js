function toggleOptions(id) {
  var optionsList = document.getElementById('options-' + id);
  var toggleButton = document.querySelector('#' + id + ' button.toggle-btn');

  // Hide other options
  var allOptions = document.querySelectorAll('.options');
  allOptions.forEach(function (option) {
    if (option.id !== 'options-' + id) {
      option.style.maxHeight = null;
      var otherToggleButton = document.querySelector(
        '#' + option.id.replace('options-', '') + ' button.toggle-btn'
      );
      otherToggleButton.textContent = '+';
    }
  });

  if (optionsList.style.maxHeight) {
    optionsList.style.maxHeight = null;
    toggleButton.textContent = '+';
  } else {
    optionsList.style.maxHeight = optionsList.scrollHeight + 'px';
    toggleButton.textContent = '-';
  }
}
