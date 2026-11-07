/* Membership payment and quote calculator - Next Level Gaming & Esports Arena */
(function () {
  'use strict';

  var VAT_PERCENT = 15;

  // Single source of truth for the membership plans (matches membership.html)
  var PLANS = [
    { id: 'player-one', name: 'Player One (Basic)', fee: 199 },
    { id: 'pro-gamer', name: 'Pro Gamer (Pro)', fee: 399 },
    { id: 'elite-arena', name: 'Elite Arena (VIP)', fee: 650 }
  ];

  var selectedPlan = null;
  var quoteShown = false;

  var form = document.getElementById('membership-form');
  var optionsBox = document.getElementById('plan-options');
  var quotePlaceholder = document.getElementById('quote-placeholder');
  var quoteWrap = document.getElementById('quote-table-wrap');
  var quoteCaption = document.getElementById('quote-caption');
  var quoteItems = document.getElementById('quote-items');
  var quoteTotals = document.getElementById('quote-totals');
  var formMessage = document.getElementById('form-message');

  var fields = {
    name: document.getElementById('member-name'),
    phone: document.getElementById('member-phone'),
    email: document.getElementById('member-email'),
    months: document.getElementById('member-months'),
    method: document.getElementById('member-method')
  };

  /* ---------- Helpers ---------- */

  function formatRand(cents) {
    var text = (cents / 100).toFixed(2);
    var parts = text.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
    return 'R' + parts.join('.');
  }

  function showError(input, errorId, message) {
    var error = document.getElementById(errorId);
    error.textContent = 'Error: ' + message;
    error.hidden = false;
    if (input) { input.setAttribute('aria-invalid', 'true'); }
  }

  function clearError(input, errorId) {
    var error = document.getElementById(errorId);
    error.textContent = '';
    error.hidden = true;
    if (input) { input.removeAttribute('aria-invalid'); }
  }

  function addCell(row, text, tag) {
    var cell = document.createElement(tag || 'td');
    cell.textContent = text;
    row.appendChild(cell);
    return cell;
  }

  /* ---------- Build the radio list from the PLANS array ---------- */

  function buildPlanOptions() {
    PLANS.forEach(function (plan) {
      var label = document.createElement('label');
      label.className = 'package-option';

      var radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'plan';
      radio.value = plan.id;

      var name = document.createElement('span');
      name.className = 'package-option-name';
      name.textContent = plan.name;

      var price = document.createElement('span');
      price.className = 'package-option-price';
      price.textContent = formatRand(plan.fee * 100) + ' / month';

      label.appendChild(radio);
      label.appendChild(name);
      label.appendChild(price);
      optionsBox.appendChild(label);
    });
  }

  function readSelectedPlan() {
    var checked = optionsBox.querySelector('input[type="radio"]:checked');
    selectedPlan = null;
    if (checked) {
      PLANS.forEach(function (plan) {
        if (plan.id === checked.value) { selectedPlan = plan; }
      });
    }
    return selectedPlan;
  }

  // Pre-select a plan when the visitor arrives from a Join button (?plan=pro-gamer)
  function preselectPlanFromLink() {
    var match = /[?&]plan=([a-z-]+)/.exec(window.location.search);
    if (!match) { return; }
    var radio = optionsBox.querySelector('input[value="' + match[1] + '"]');
    if (radio) { radio.checked = true; }
  }

  /* ---------- Quote calculation (all money in cents) ---------- */

  function calculateQuote(plan, months) {
    var feeCents = plan.fee * 100;
    var subtotal = feeCents * months;
    var vat = Math.round(subtotal * VAT_PERCENT / 100);
    return {
      name: plan.name,
      months: months,
      feeCents: feeCents,
      subtotal: subtotal,
      vat: vat,
      total: subtotal + vat
    };
  }

  function addTotalRow(label, amount, extraClass) {
    var row = document.createElement('tr');
    if (extraClass) { row.className = extraClass; }
    var labelCell = addCell(row, label);
    labelCell.colSpan = 2;
    addCell(row, amount);
    quoteTotals.appendChild(row);
  }

  function renderQuote(quote) {
    quoteItems.textContent = '';
    quoteTotals.textContent = '';

    var row = document.createElement('tr');
    addCell(row, quote.name + ' x ' + quote.months + (quote.months === 1 ? ' month' : ' months'));
    addCell(row, formatRand(quote.feeCents));
    addCell(row, formatRand(quote.subtotal));
    quoteItems.appendChild(row);

    quoteCaption.textContent = quote.months + (quote.months === 1 ? ' month selected' : ' months selected');

    addTotalRow('Subtotal', formatRand(quote.subtotal));
    addTotalRow('VAT (' + VAT_PERCENT + '%)', formatRand(quote.vat));
    addTotalRow('Total to pay', formatRand(quote.total), 'quote-total');

    quotePlaceholder.hidden = true;
    quoteWrap.hidden = false;
    quoteShown = true;
  }

  function hideQuote() {
    quoteWrap.hidden = true;
    quotePlaceholder.hidden = false;
    quoteShown = false;
  }

  function refreshQuote() {
    renderQuote(calculateQuote(selectedPlan, parseInt(fields.months.value, 10)));
  }

  /* ---------- Validation ---------- */

  function validatePlan() {
    if (!readSelectedPlan()) {
      showError(null, 'plan-options-error', 'Select a membership plan to calculate your total.');
      return false;
    }
    clearError(null, 'plan-options-error');
    return true;
  }

  function validateName() {
    var value = fields.name.value.trim();
    if (value === '') {
      showError(fields.name, 'member-name-error', 'Enter your full name.');
      return false;
    }
    if (!/^[A-Za-z\u00C0-\u024F' -]{2,}$/.test(value)) {
      showError(fields.name, 'member-name-error', 'Your name can only contain letters, spaces, hyphens and apostrophes.');
      return false;
    }
    clearError(fields.name, 'member-name-error');
    return true;
  }

  function validatePhone() {
    var value = fields.phone.value.replace(/[\s\-()]/g, '');
    if (value === '') {
      showError(fields.phone, 'member-phone-error', 'Enter your phone number.');
      return false;
    }
    if (!/^(\+27|0)[0-9]{9}$/.test(value)) {
      showError(fields.phone, 'member-phone-error', 'Enter a valid South African number, for example 0821234567 or +27821234567.');
      return false;
    }
    clearError(fields.phone, 'member-phone-error');
    return true;
  }

  function validateEmail() {
    var value = fields.email.value.trim();
    if (value === '') {
      showError(fields.email, 'member-email-error', 'Enter your email address.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      showError(fields.email, 'member-email-error', 'Enter a valid email address, for example name@example.com.');
      return false;
    }
    clearError(fields.email, 'member-email-error');
    return true;
  }

  function validateMethod() {
    if (fields.method.value === '') {
      showError(fields.method, 'member-method-error', 'Select a payment method.');
      return false;
    }
    clearError(fields.method, 'member-method-error');
    return true;
  }

  /* ---------- Events ---------- */

  document.getElementById('calculate-button').addEventListener('click', function () {
    formMessage.hidden = true;
    if (validatePlan()) {
      refreshQuote();
    } else {
      hideQuote();
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    formMessage.hidden = true;

    // Run every check so all errors show at once
    var results = [validateName(), validatePhone(), validateEmail(), validatePlan(), validateMethod()];
    if (results.indexOf(false) !== -1) {
      hideQuote();
      var firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) { firstError.focus(); }
      return;
    }

    refreshQuote();
    var reference = 'MEM-' + String(Math.floor(100000 + Math.random() * 900000));
    formMessage.textContent = 'Thank you, ' + fields.name.value.trim() +
      '. Your ' + selectedPlan.name + ' membership request (reference ' + reference + ') has been received. ' +
      'A consultant will contact you on ' + fields.phone.value.trim() +
      ' to confirm your membership. Payment method: ' + fields.method.options[fields.method.selectedIndex].text + '.';
    formMessage.hidden = false;
  });

  // Keep an open quote in step with the chosen plan and number of months
  optionsBox.addEventListener('change', function () {
    if (readSelectedPlan()) { clearError(null, 'plan-options-error'); }
    if (quoteShown && selectedPlan) { refreshQuote(); }
  });

  fields.months.addEventListener('change', function () {
    if (quoteShown && readSelectedPlan()) { refreshQuote(); }
  });

  fields.name.addEventListener('input', function () { clearError(fields.name, 'member-name-error'); });
  fields.phone.addEventListener('input', function () { clearError(fields.phone, 'member-phone-error'); });
  fields.email.addEventListener('input', function () { clearError(fields.email, 'member-email-error'); });
  fields.method.addEventListener('change', function () { clearError(fields.method, 'member-method-error'); });

  buildPlanOptions();
  preselectPlanFromLink();
})();
