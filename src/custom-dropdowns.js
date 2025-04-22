(function(){
  { // inject CSS
    const s = document.createElement('style');
    const css = `
    input[type="dummy"] {
      opacity: 0;
      position: absolute;
      pointer-events: none;
    }

    .dropdown {
      position: relative;
      display: inline-block;
      width: auto;
      border: 1px solid #ccc;
      background: white;
      cursor: pointer;
      user-select: none;
    }
    .dropdown .dropdown-options {
      position: absolute;
      top: 100%;
    }

    .dropdown .dropdown-selected::after {
      content: '⌄';
      position: absolute;
      top: 5px;
      right: 5px;
    }

    .dropdown .option.dropdown-selected {
      padding-right: 15px;
    }

    .dropdown.inactive .option:not(.dropdown-selected) {
      display: none;
    }

    .dropdown.active .option.extra {
      display: none;
    }

    .dropdown.active .option:not(.hidden):not(.extra) {
      display: block;
    }

    .dropdown .option {
      text-align: center;
      padding: 8px;
      cursor: pointer;
      background: white;
    }

    .dropdown .option.hidden {
      display: none;
    }

    .dropdown.active .option:hover:not(.dropdown-selected):not(#more) {
      background: #f0f0f0;
    }

    .dropdown #more {
      padding: 8px 0;
    }

    .dropdown #more:hover+.extra-options,
    .dropdown.active .extra-options:hover {
      position: absolute;
      box-sizing: border-box;
      border: 1px solid #ccc;
      top: 100%;
      left: 25px;

      .option.extra {
        display: block;
      }
    }
    `;
    s.textContent = css;
    document.head.appendChild(s);
  }
  function handleDropdown(dropdown) {
    dropdown.addEventListener('click', function(e) {
      const target = e.target;
      if (target.classList.contains('option') &&
          this.classList.contains('active') &&
          !target.classList.contains('disabled')) {
        this.classList.replace('active', 'inactive');
        const val = target.getAttribute('value') || target.textContent;
        this.querySelector('.dropdown-selected').textContent = target.textContent;
        this.value = val;
        this.querySelector('input[type="dummy"]').value = val;
      } else {
        this.classList.replace('inactive', 'active');
      }
    });
    document.addEventListener('click', e => {
      if (!dropdown.contains(e.target)) dropdown.classList.replace('active', 'inactive');
    });
  }

  document.querySelectorAll('div.dropdown').forEach(handleDropdown);

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) { // Element node
          if (node.matches('div.dropdown')) handleDropdown(node);
          node.querySelectorAll?.('div.dropdown')?.forEach(handleDropdown);
        }
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();