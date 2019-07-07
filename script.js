'use strict';

$(document).ready(() => {
  //when the page after the DOM loading the focus will be on the name tab. I decided to use "ready" and not
  //  "load" method since it has no point to wait until all the static assets will be loaded.
  $('#name').focus();

  //on title job first hide the "other field"
  //the funciton will show the "other field when there is a trigger to change the selection to "other" value
  // reference: https://www.solodev.com/blog/web-design/how-to-hide-form-fields-based-upon-user-selection.stml
  $('#other-title').hide();
  $('#title').change(function() {
    if ($(this).val() == 'other') {
      $('#other-title').show();
    } else {
      $('#other-title').hide();
    }
  });
  $('#title').trigger('change');

  //Hiding the first option of design
  $('#design')
    .find('option:eq(0)')
    .hide();
  //adding an option to select t-shirt theme
  $('#color').append(
    '<option value="selectShirt" selected>Please select T-shirt theme</option> '
  );

  //hiding all other options before selecting the theme
  $('#color > option').each(function() {
    $(this).hide();
  });

  // after selecting the theme the relevant options will be showed.
  $('#design').change(function() {
    if ($(this).val() === 'js puns') {
      //reference for deleting selected - https://stackoverflow.com/questions/1857781/best-way-to-unselect-a-select-in-jquery
      for (let i = 0; i < 3; i++) {
        $('#color')
          .find('option:eq(' + i + ')')
          .show();
      }
      for (let i = 3; i < $('#color > option').length; i++) {
        $('#color')
          .find('option:eq(' + i + ')')
          .hide();
      }
      $('#color')
        .find('option:eq(0)')
        .prop('selected', true);
    } else if ($(this).val() === 'heart js') {
      for (let i = 0; i < 3; i++) {
        $('#color')
          .find('option:eq(' + i + ')')
          .hide();
      }
      for (let i = 3; i < $('#color > option').length - 1; i++) {
        $('#color')
          .find('option:eq(' + i + ')')
          .show();
      }
      $('#color')
        .find('option:eq(3)')
        .prop('selected', true);
      $('#color')
        .find('option:eq(6)')
        .hide();
    }
  });
  // activation of change function by selection
  $('#design').trigger('change');

  //creating global variables to the activities section.
  let totalCost = 0;
  const $totalActivityCost = $("<p id='total-cost'></p>").appendTo(
    '.activities'
  );
  const $activities = document.querySelector('.activities');
  //listening the the event of checking the checkboxes and updating the variables according it.
  $activities.addEventListener('change', event => {
    let $inputCheckbox = $(event.target);
    let inputText = $inputCheckbox.parent().text();
    const dollarSign = '$';
    let index$Sign = inputText.indexOf(dollarSign);
    let price = inputText.slice(index$Sign + 1);
    price = parseInt(price);
    //when the checkbox is checked or uncheckced the total price is being updated
    if ($($inputCheckbox).prop('checked')) {
      totalCost += price;
      $totalActivityCost.text('Total Cost: $' + totalCost).show();
    } else if (!$($inputCheckbox).prop('checked')) {
      totalCost -= price;
      $totalActivityCost.text('Total Cost: $' + totalCost).show();
    }
    //creating variables to check the similarity between checked input labels and other labales
    const dashSign = '—';
    const commaSign = ',';
    let indexDashSign = inputText.indexOf(dashSign);
    let indexCommaSign = inputText.indexOf(commaSign);
    let dayAndTime = inputText.slice(indexDashSign + 2, indexCommaSign);
    let checkBoxes = $('.activities').find('input');
    let checkBox;

    //looping over all the lables in the activities parts to check similaritis.
    // if there are similarities, the checkbox is being disabled, if it unchecked the disable mode is being removed.
    for (let i = 0; i < checkBoxes.length; i++) {
      checkBox = $(checkBoxes[i])
        .parent()
        .text();
      if (checkBox.includes(dayAndTime) && checkBox !== inputText) {
        $(checkBoxes[i])
          .prop('disabled', true)
          .parent()
          .css('color', '#7E93CC');
      }
      if (
        !$($inputCheckbox).prop('checked') &&
        checkBox.includes(dayAndTime) &&
        checkBox !== inputText
      ) {
        $(checkBoxes[i])
          .prop('disabled', false)
          .parent()
          .css('color', '#000');
      }
    }
  });

  //payment section, if the credit card is chosen the details of credit card will be shown on the form
  $('#payment')
    .find('option:eq(0)')
    .attr('disabled', true);
  $('fieldset p').hide();
  //when selecting the payment method, the relevant fields or text will be shown.
  $('#payment').change(function() {
    $('#payment')
      .find('option:eq(1)')
      .attr('selected', true);
    if ($(this).val() === 'credit card') {
      $('#credit-card').show();
      $('fieldset p').hide();
      $('#payment')
        .find('option:eq(0)')
        .hide();
    } else if ($(this).val() === 'paypal') {
      $('#credit-card').hide();
      $('p')
        .eq(1)
        .show();
      $('p')
        .eq(2)
        .hide();
      $('#payment')
        .find('option:eq(0)')
        .hide();
    } else if ($(this).val() === 'bitcoin') {
      $('#credit-card').hide();
      $('p')
        .eq(1)
        .hide();
      $('p')
        .eq(2)
        .show();
      $('#payment')
        .find('option:eq(0)')
        .hide();
    }
  });
  //validation part, each section is being validated by a function
  function isValidInputName(name) {
    const nameRegex = /^[a-z][a-z '-.,]{0,31}$|^$/i;
    if (!nameRegex.test(name) || $('#name').val() === '') {
      $('#name').css('border-color', 'red');
      $('label[for="name"]').css('color', 'red');
      return false;
    } else {
      $('#name').css('border-color', '#b0d3e2');
      $('label[for="name"]').css('color', 'black');
      return true;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(email) || $('#mail').val() === '') {
      $('#mail').css('border-color', 'red');
      $('label[for="mail"]').css('color', 'red');
      console.log('false email');
      return false;
    } else if (emailRegex.test(email) || $('#mail').val() !== '') {
      $('#mail').css('border-color', '#b0d3e2');
      $('label[for="mail"]').css('color', 'black');
      console.log('true email');
      return true;
    }
  }

  function isActivitiesChecked(activity) {
    if (totalCost === 0) {
      $('.activities > legend').css('color', 'red');
      console.log('activities false');
      return false;
    } else {
      $('.activities > legend').css('color', 'black');
      console.log('activities true');
      return true;
    }
  }

  // $('.activities input').on('change', event => isActivitiesChecked(event.target.value));

  function isValidCreditCard(number) {
    const creditNumRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    if (
      $('#credit-card').show() &&
      (!creditNumRegex.test(number) || $('#cc-num').val() === '')
    ) {
      $('#cc-num').css('border-color', 'red');
      $('label[for="cc-num"]').css('color', 'red');
      console.log('credit num false');
      return false;
    } else {
      $('#cc-num').css('border-color', '#b0d3e2');
      $('label[for="cc-num"]').css('color', 'black');
      console.log('activities true');
      return true;
    }
  }

  function isValidZip(num) {
    const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    if (
      $('#credit-card').show() &&
      (!zipRegex.test(num) || $('#zip').val() === '')
    ) {
      $('#zip').css('border-color', 'red');
      $('label[for="zip"]').css('color', 'red');
      console.log('zip false');
      return false;
    } else {
      $('#zip').css('border-color', '#b0d3e2');
      $('label[for="zip"]').css('color', 'black');
      console.log('zip true');
      return true;
    }
  }

  function isValidCVV(num) {
    const CVVRegex = /^[0-9]{3,4}$/;
    if (
      $('#credit-card').show() &&
      (!CVVRegex.test(num) || $('#cvv').val() === '')
    ) {
      $('#cvv').css('border-color', 'red');
      $('label[for="cvv"]').css('color', 'red');
      console.log('cvv false');
      return false;
    } else {
      $('#cvv').css('border-color', '#b0d3e2');
      $('label[for="cvv"]').css('color', 'black');
      console.log('cvv true');
      return true;
    }
  }

  function generalValidation(submit) {
    if (
      isValidInputName(name) === true &&
      isValidEmail(email) === true &&
      isActivitiesChecked(activity) === true &&
      ($('#payment').val() === 'credit card' &&
        isValidCreditCard(num) === true &&
        isValidCVV(num) === true &&
        isValidZip(num) === true)
    ) {
      console.log('general validation', true);
      return true;
    } else if (
      isValidInputName(name) === true &&
      isValidEmail(email) === true &&
      isActivitiesChecked(activity) === true &&
      ($('#payment').val() === 'paypal' || $('#payment').val() === 'bitcoin')
    ) {
      console.log('general validation with paypal/bitcoin', true);
      return true;
    } else {
      console.log('general validation', false);
      return false;
    }
  }

  $('#name').on('input', event => isValidInputName(event.target.value));
  $('#name').on('focusout', event => isValidInputName(event.target.value));
  $('#mail').on('input', event => isValidEmail(event.target.value));
  $('#mail').on('focusout', event => isValidEmail(event.target.value));
  $('#cc-num').on('input', event => isValidCreditCard(event.target.value));
  $('#cc-num').on('focusout', event => isValidCreditCard(event.target.value));
  $('#cvv').on('input', event => isValidCVV(event.target.value));
  $('#cvv').on('focusout', event => isValidCVV(event.target.value));
  $('#zip').on('input', event => isValidZip(event.target.value));
  $('#zip').on('focusout', event => isValidZip(event.target.value));
  $('form').on('submit', event => generalValidation(event.target.value));

  document.querySelector('form').addEventListener(
    'submit',
    function(event) {
      generalValidation(event.target.value);
      event.preventDefault();
    },
    false
  );
});
