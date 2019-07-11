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
  const $totalActivityCost = $("<h4 id='total-cost'></h4>").appendTo(
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

  const payment = $('#payment');
  const creditCard = $('#credit-card');

  $('p').hide();

  //when selecting the payment method, the relevant fields or text will be shown.
  // payment.click(function () {

  $('#payment option:eq(1)').prop('selected', true);
  $('#payment option:eq(0)').prop('disabled', true);

  payment.change(function() {
    if ($(this).val() === 'credit card') {
      creditCard.show();
      payment.find('option:eq(0)').hide();
      $('p').hide();
    } else if ($(this).val() === 'paypal') {
      payment.find('option:eq(0)').hide();
      creditCard.hide();
      $('p')
        .eq(0)
        .show();
      $('p')
        .eq(1)
        .hide();
    } else if ($(this).val() === 'bitcoin') {
      payment.find('option:eq(0)').hide();
      $('#payment option:eq(1)').prop('selected', false);
      creditCard.hide();
      $('p')
        .eq(0)
        .hide();
      $('p')
        .eq(1)
        .show();
      payment.find('option:eq(0)').hide();
    }
  });

  //**/VALIDATION**//

  //markField mark the field according to the boolean return
  function markField(input, label, isValid) {
        if (!isValid) {
      input.css('border-color', 'red');
      label.css('color', 'red');
    } else {
      input.css('border-color', '#b0d3e2');
      label.css('color', 'black');
    }
  }
  //individual input fields send their id and regex to the validateInput function
  function isValidInputName() {
    const id = 'name';
    const regex = /^[a-z][a-z '-.,]{0,31}$|^$/i;
    const value = $(`#${id}`).val();
    const label = $(`label[for="${id}"]`);
    const isValid = value !== '' && regex.test(value);
    markField($(`#${id}`), label, isValid);
    return isValid ? true : false;
  }

  function isValidEmail() {
    const id = 'mail';
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const value = $(`#${id}`).val();
    const label = $(`label[for="${id}"]`);
    const isValid = value !== '' && regex.test(value);
    markField($(`#${id}`), label, isValid);
    return isValid ? true : false;
  }

  function isActivitiesChecked() {
    const label = $('.activities > legend');
    const input = $('input [type="checkbox"]');
    let isValid = false;
    if (totalCost === 0) {
      isValid = false;
    } else {
      isValid = true;
    }
    markField(input, label, isValid);
    return isValid;
  }

  function isValidCreditCard() {
    const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    const id = 'cc-num';
    const value = $(`#${id}`).val();
    const label = $(`label[for="${id}"]`);
    const isValid = value !== '' && regex.test(value);
    if ($('#payment').val() === 'paypal' || $('#payment').val() === 'bitcoin') {
      return true;
    } else if ($('#payment').val() === 'credit card' && isValid) {
      markField($(`#${id}`), label, isValid);
      return true;
    } else if ($('#payment').val() === 'credit card' && !isValid) {
      markField($(`#${id}`), label, isValid);
      return false;
    } else if ($('#payment').val() === 'select_method' && !isValid) {
      markField($(`#${id}`), label, isValid);
      return false;
    } else if ($('#payment').val() === 'select_method' && isValid) {
      markField($(`#${id}`), label, isValid);
      return true;
    }
  }

  function isValidZip() {
    const regex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    const id = 'zip';
    const value = $(`#${id}`).val();
    const label = $(`label[for="${id}"]`);
    const isValid = value !== '' && regex.test(value);
    if ($('#payment').val() === 'paypal' || $('#payment').val() === 'bitcoin') {
      return true;
    } else if ($('#payment').val() === 'credit card' && isValid) {
      markField($(`#${id}`), label, isValid);
      return true;
    } else if ($('#payment').val() === 'credit card' && !isValid) {
      markField($(`#${id}`), label, isValid);
      return false;
    } else if ($('#payment').val() === 'select_method' && !isValid) {
      markField($(`#${id}`), label, isValid);
      return false;
    } else if ($('#payment').val() === 'select_method' && isValid) {
      markField($(`#${id}`), label, isValid);
      return true;
    }
  }

  function isValidCVV() {
    const regex = /^[0-9]{3,4}$/;
    const id = 'cvv';
    const value = $(`#${id}`).val();
    const label = $(`label[for="${id}"]`);
    const isValid = value !== '' && regex.test(value);
    if ($('#payment').val() === 'paypal' || $('#payment').val() === 'bitcoin') {
      return true;
    } else if ($('#payment').val() === 'credit card' && isValid) {
      markField($(`#${id}`), label, isValid);
      return true;
    } else if ($('#payment').val() === 'credit card' && !isValid) {
      markField($(`#${id}`), label, isValid);
      return false;
    } else if ($('#payment').val() === 'select_method' && !isValid) {
      markField($(`#${id}`), label, isValid);
      return false;
    } else if ($('#payment').val() === 'select_method' && isValid) {
      markField($(`#${id}`), label, isValid);
      return true;
    }
  }

  //general validation function,that also takes into consideration which payment checkbox is chosen.

  function generalValidation() {
    let isValid = false;
    isValidInputName();
    isValidEmail();
    isActivitiesChecked();
    isValidCreditCard();
    isValidCVV();
    isValidZip();
    if (
      isValidInputName() === true &&
      isValidEmail() === true &&
      isActivitiesChecked() === true &&
      isValidCreditCard() === true &&
      isValidCVV() === true &&
      isValidZip() === true
    ) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  }
  $('#name').on('input', event => isValidInputName(event));
  $('#name').on('focusout', event => isValidInputName(event));
  $('#mail').on('input', event => isValidEmail(event));
  $('#mail').on('focusout', event => isValidEmail(event));
  $('.activities').on('change', event => isActivitiesChecked(event));
  $('#cc-num').on('input', event => isValidCreditCard(event));
  $('#cc-num').on('focusout', event => isValidCreditCard(event));
  $('#cvv').on('input', event => isValidCVV(event));
  $('#cvv').on('focusout', event => isValidCVV(event));
  $('#zip').on('input', event => isValidZip(event));
  $('#zip').on('focusout', event => isValidZip(event));

  $('form').submit(function(event) {
    if (!generalValidation()) {
      event.preventDefault();
    } else if (generalValidation()) {
      return;
    }
  });
});
