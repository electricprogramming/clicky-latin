(function () {
  const inputTypes = ['input', 'textarea', 'select'];
  const selector = inputTypes.join(', ');

  function applyValidationMessage(el) {
    if (el.hasAttribute('required') && el.hasAttribute('validation-message')) {
      el.addEventListener('invalid', function () {
        const msg = this.getAttribute('validation-message');
        if (msg) {
          this.setCustomValidity(msg);
        }
      });
      el.addEventListener('input', function () {
        el.setCustomValidity('');
      });
      el.addEventListener('change', function () {
        el.setCustomValidity('');
      });
    }
  }

  document.querySelectorAll(selector).forEach(applyValidationMessage);

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          if (inputTypes.includes(node.tagName.toLowerCase())) {
            applyValidationMessageMessage(node);
          }
          node.querySelectorAll?.(selector)?.forEach(applyValidationMessageMessage);
        }
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();