/* Payment and quote calculator - Next Level Gaming & Esports Arena */
(function () {
  'use strict';

  var VAT_PERCENT = 15;

  // Single source of truth for the items on the payment page
  var PACKAGES = [
    { id: 'battle-royal', name: 'Battle Royal Championship', players: 8, fee: 1200 },
    { id: 'vip-esports', name: 'VIP E-Sports Championship', players: 6, fee: 1500 },
    { id: 'family-fun', name: 'Family Fun Championship', players: 4, fee: 800 },
    { id: 'retro-arcade', name: 'Retro Arcade Showdown', players: 8, fee: 650 },
    { id: 'kids-birthday', name: 'Kids Birthday Bash', players: 6, fee: 950 },
    { id: 'all-nighter', name: 'All-Nighter Marathon', players: 10, fee: 2200 }
  ];

  // The customer's chosen packages are stored in this array
  var selectedPackages = [];
  var quoteShown = false;

  var form = document.getElementById('booking-form');
  var optionsBox = document.getElementById('package-options');
  var quotePlaceholder = document.getElementById('quote-placeholder');
  var quoteWrap = document.getElementById('quote-table-wrap');
  var quoteCaption = document.getElementById('quote-caption');
  var quoteItems = document.getElementById('quote-items');
  var quoteTotals = document.getElementById('quote-totals');
  var formMessage = document.getElementById('form-message');

  var fields = {
    name: document.getElementById('customer-name'),
    phone: document.getElementById('customer-phone'),
    email: document.getElementById('customer-email'),
    method: document.getElementById('payment-method')
  };

  /* ---------- Helpers ---------- */

  function formatRand(cents) {
    var text = (cents / 100).toFixed(2);
    var parts = text.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
    return 'R' + parts.join('.');
  }

  function getDiscountPercent(bookingCount) {
    if (bookingCount > 3) { return 15; }
    if (bookingCount === 3) { return 10; }
    if (bookingCount === 2) { return 5; }
    return 0;
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

  /* ---------- Build the checkbox list from the PACKAGES array ---------- */

  function buildPackageOptions() {
    PACKAGES.forEach(function (pack) {
      var label = document.createElement('label');
      label.className = 'package-option';

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'package';
      checkbox.value = pack.id;

      var name = document.createElement('span');
      name.className = 'package-option-name';
      name.textContent = pack.name + ' (' + pack.players + ' players)';

      var price = document.createElement('span');
      price.className = 'package-option-price';
      price.textContent = formatRand(pack.fee * 100);

      label.appendChild(checkbox);
      label.appendChild(name);
      label.appendChild(price);
      optionsBox.appendChild(label);
    });
  }

  function readSelectedPackages() {
    var checked = optionsBox.querySelectorAll('input[type="checkbox"]:checked');
    selectedPackages = [];
    Array.prototype.forEach.call(checked, function (box) {
      PACKAGES.forEach(function (pack) {
        if (pack.id === box.value) { selectedPackages.push(pack); }
      });
    });
    return selectedPackages;
  }

  /* ---------- Quote calculation (all money in cents) ---------- */

  function calculateQuote(packages) {
    var discountPercent = getDiscountPercent(packages.length);
    var lines = packages.map(function (pack) {
      var feeCents = pack.fee * 100;
      var discountCents = feeCents * discountPercent / 100;
      return {
        name: pack.name,
        feeCents: feeCents,
        finalCents: feeCents - discountCents
      };
    });

    var subtotal = 0;
    var afterDiscount = 0;
    lines.forEach(function (line) {
      subtotal += line.feeCents;
      afterDiscount += line.finalCents;
    });

    var vat = Math.round(afterDiscount * VAT_PERCENT / 100);
    return {
      lines: lines,
      discountPercent: discountPercent,
      subtotal: subtotal,
      discount: subtotal - afterDiscount,
      vat: vat,
      total: afterDiscount + vat
    };
  }

  function addTotalRow(label, amountCents, extraClass) {
    var row = document.createElement('tr');
    if (extraClass) { row.className = extraClass; }
    var labelCell = addCell(row, label);
    labelCell.colSpan = 2;
    addCell(row, amountCents);
    quoteTotals.appendChild(row);
  }

  function renderQuote(quote) {
    quoteItems.textContent = '';
    quoteTotals.textContent = '';

    quote.lines.forEach(function (line) {
      var row = document.createElement('tr');
      addCell(row, line.name);
      addCell(row, formatRand(line.feeCents));
      addCell(row, formatRand(line.finalCents));
      quoteItems.appendChild(row);
    });

    var bookings = quote.lines.length;
    quoteCaption.textContent = bookings + (bookings === 1 ? ' booking selected' : ' bookings selected');

    addTotalRow('Subtotal', formatRand(quote.subtotal));
    addTotalRow('Discount (' + quote.discountPercent + '%)', '-' + formatRand(quote.discount));
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

  /* ---------- Validation ---------- */

  function validatePackages() {
    if (readSelectedPackages().length === 0) {
      showError(null, 'package-options-error', 'Select at least one package to calculate your total.');
      return false;
    }
    clearError(null, 'package-options-error');
    return true;
  }

  function validateName() {
    var value = fields.name.value.trim();
    if (value === '') {
      showError(fields.name, 'customer-name-error', 'Enter your full name.');
      return false;
    }
    if (!/^[A-Za-z\u00C0-\u024F' -]{2,}$/.test(value)) {
      showError(fields.name, 'customer-name-error', 'Your name can only contain letters, spaces, hyphens and apostrophes.');
      return false;
    }
    clearError(fields.name, 'customer-name-error');
    return true;
  }

  function validatePhone() {
    var value = fields.phone.value.replace(/[\s\-()]/g, '');
    if (value === '') {
      showError(fields.phone, 'customer-phone-error', 'Enter your phone number.');
      return false;
    }
    if (!/^(\+27|0)[0-9]{9}$/.test(value)) {
      showError(fields.phone, 'customer-phone-error', 'Enter a valid South African number, for example 0821234567 or +27821234567.');
      return false;
    }
    clearError(fields.phone, 'customer-phone-error');
    return true;
  }

  function validateEmail() {
    var value = fields.email.value.trim();
    if (value === '') {
      showError(fields.email, 'customer-email-error', 'Enter your email address.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      showError(fields.email, 'customer-email-error', 'Enter a valid email address, for example name@example.com.');
      return false;
    }
    clearError(fields.email, 'customer-email-error');
    return true;
  }

  function validateMethod() {
    if (fields.method.value === '') {
      showError(fields.method, 'payment-method-error', 'Select a payment method.');
      return false;
    }
    clearError(fields.method, 'payment-method-error');
    return true;
  }

  /* ---------- Events ---------- */

  document.getElementById('calculate-button').addEventListener('click', function () {
    formMessage.hidden = true;
    if (validatePackages()) {
      renderQuote(calculateQuote(selectedPackages));
    } else {
      hideQuote();
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    formMessage.hidden = true;

    // Run every check so all errors show at once
    var results = [validateName(), validatePhone(), validateEmail(), validateMethod(), validatePackages()];
    if (results.indexOf(false) !== -1) {
      hideQuote();
      var firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) { firstError.focus(); }
      return;
    }

    renderQuote(calculateQuote(selectedPackages));
    var reference = 'NLG-' + String(Math.floor(100000 + Math.random() * 900000));
    formMessage.textContent = 'Thank you, ' + fields.name.value.trim() +
      '. Your booking request (reference ' + reference + ') has been received. ' +
      'A consultant will contact you on ' + fields.phone.value.trim() +
      ' to confirm your booking. Payment method: ' + fields.method.options[fields.method.selectedIndex].text + '.';
    formMessage.hidden = false;
  });

  optionsBox.addEventListener('change', function () {
    if (readSelectedPackages().length > 0) {
      clearError(null, 'package-options-error');
    }
    if (quoteShown) {
      if (selectedPackages.length > 0) {
        renderQuote(calculateQuote(selectedPackages));
      } else {
        hideQuote();
      }
    }
  });

  fields.name.addEventListener('input', function () { clearError(fields.name, 'customer-name-error'); });
  fields.phone.addEventListener('input', function () { clearError(fields.phone, 'customer-phone-error'); });
  fields.email.addEventListener('input', function () { clearError(fields.email, 'customer-email-error'); });
  fields.method.addEventListener('change', function () { clearError(fields.method, 'payment-method-error'); });

  buildPackageOptions();
})();
