$(document).ready(function () {

  // DOM elements (jQuery wrapped)
  const $morphContainer = $('#morphSearchContainer');
  const $iconWrapper = $('#searchIconWrapper');
  const $expandedContent = $('#expandedSearchContent');
  const $searchInput = $('#morphSearchInput');
  const $clearBtn = $('#morphClearBtn');
  const $resultMessage = $('#resultMessage');

  let isExpanded = false;

  // Helper: Toggle clear button visibility based on input content
  function toggleClearButton() {
    if (!isExpanded) return;
    const hasValue = $searchInput.val().trim().length > 0;
    if (hasValue) {
      $clearBtn.removeClass('clear-btn-hidden').addClass('clear-btn-visible');
    } else {
      $clearBtn.removeClass('clear-btn-visible').addClass('clear-btn-hidden');
    }
  }

  // Escape HTML for safe output
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Simulated search function (displays dynamic results)
  function performSearch() {
    const query = $searchInput.val().trim();
    if (!query) {
      $resultMessage.html('🔍 Please type something before searching. Try "Bootstrap", "morph", or "animation".');
      return;
    }

    const lowerQuery = query.toLowerCase();
    let replyHtml = '';

    if (lowerQuery.includes('bootstrap') || lowerQuery.includes('bs5')) {
      replyHtml = `<strong class="text-primary">“${escapeHtml(query)}”</strong> — Bootstrap 5 provides the layout, spacing, and card components. The morphing container uses custom CSS transitions alongside Bootstrap utilities.`;
    }
    else if (lowerQuery.includes('morph') || lowerQuery.includes('expand') || lowerQuery.includes('transform')) {
      replyHtml = `<strong class="text-primary">“${escapeHtml(query)}”</strong> — The button smoothly transforms from a 40px rounded icon to a full input field using width & opacity transitions powered by jQuery toggles.`;
    }
    else if (lowerQuery.includes('jquery') || lowerQuery.includes('jq')) {
      replyHtml = `<strong class="text-primary">“${escapeHtml(query)}”</strong> — jQuery manages the expansion state, event listeners (click, keydown), outside click detection, and responsive width adjustments on window resize.`;
    }
    else if (lowerQuery.includes('animation') || lowerQuery.includes('transition') || lowerQuery.includes('smooth')) {
      replyHtml = `<strong class="text-primary">“${escapeHtml(query)}”</strong> — CSS transition with cubic-bezier creates the smooth morphing effect. The icon fades out while the input fades in seamlessly.`;
    }
    else {
      replyHtml = `<strong class="text-primary">“${escapeHtml(query)}”</strong> — Click the search icon, type anything, and hit Enter. This live preview demonstrates jQuery + Bootstrap integration. ESC collapses the bar.`;
    }

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    $resultMessage.html(`${replyHtml}<br><span class="text-muted small d-block mt-2"><i class="far fa-clock"></i> searched at ${timestamp}</span>`);

    // gentle input highlight
    $searchInput.addClass('text-primary');
    setTimeout(() => $searchInput.removeClass('text-primary'), 200);
  }

  // Collapse morph search bar (back to icon)
  function collapseMorphSearch() {
    if (!isExpanded) return;
    isExpanded = false;

    // Reset width to 40px (icon size)
    $morphContainer.css({
      width: '40px',
      height: '40px'
    });
    $morphContainer.removeClass('bg-white shadow-sm border-primary');
    $morphContainer.css('backgroundColor', '#f8f9fa');

    // Hide expanded content
    $expandedContent.css({
      opacity: '0',
      visibility: 'hidden'
    });

    // Show icon
    $iconWrapper.css({
      opacity: '1',
      visibility: 'visible'
    });

    // Blur input and remove focus ring
    $searchInput.blur();
    $clearBtn.removeClass('clear-btn-visible').addClass('clear-btn-hidden');
    $morphContainer.removeClass('ring ring-primary');
    $morphContainer.css('outline', 'none');
  }

  // Expand morph search bar (reveal input)
  function expandMorphSearch() {
    if (isExpanded) return;
    isExpanded = true;

    // Responsive width based on viewport (Bootstrap breakpoints)
    const winWidth = $(window).width();
    let targetWidth = '260px';
    if (winWidth >= 576) targetWidth = '280px';
    if (winWidth >= 768) targetWidth = '300px';
    if (winWidth >= 992) targetWidth = '320px';

    $morphContainer.css({
      width: targetWidth,
      height: '40px'
    });
    $morphContainer.css('backgroundColor', '#ffffff');
    $morphContainer.addClass('shadow-sm border-primary');

    // Hide icon
    $iconWrapper.css({
      opacity: '0',
      visibility: 'hidden'
    });

    // Show expanded input + clear button
    $expandedContent.css({
      opacity: '1',
      visibility: 'visible'
    });

    // Focus input after transition
    setTimeout(() => {
      $searchInput.trigger('focus');
      const inputEl = $searchInput[0];
      if (inputEl && $searchInput.val().length) {
        inputEl.setSelectionRange($searchInput.val().length, $searchInput.val().length);
      }
      toggleClearButton();
    }, 150);

    // optional subtle border highlight
    $morphContainer.css('outline', 'none');
  }

  // Clear input content
  function clearSearchInput() {
    $searchInput.val('');
    toggleClearButton();
    $searchInput.trigger('focus');
    $resultMessage.html('✨ Input cleared. Type a keyword and press Enter for results.');
  }

  // Event: Click on morph container (expand if collapsed, focus if expanded)
  $morphContainer.on('click', function (e) {
    e.stopPropagation();
    if (!isExpanded) {
      expandMorphSearch();
    } else {
      // If click target is clear button, skip focusing input (clear action will handle)
      if ($(e.target).closest('#morphClearBtn').length) {
        return;
      }
      // Otherwise focus input
      if (!$searchInput.is(':focus')) {
        $searchInput.trigger('focus');
      }
    }
  });

  // Clear button click handler
  $clearBtn.on('click', function (e) {
    e.stopPropagation();
    clearSearchInput();
  });

  // Input event: toggle clear button visibility
  $searchInput.on('input', function () {
    toggleClearButton();
  });

  // Keydown inside input: Enter -> search, Escape -> collapse
  $searchInput.on('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      collapseMorphSearch();
    }
  });

  // Global click: collapse if click outside morph container & expanded
  $(document).on('click', function (e) {
    if (!isExpanded) return;
    if ($(e.target).closest('#morphSearchContainer').length) return;
    collapseMorphSearch();
  });

  // Global keydown for Escape (even if input not focused)
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && isExpanded) {
      e.preventDefault();
      collapseMorphSearch();
    }
  });

  // Window resize: if expanded, adjust width to maintain responsiveness
  $(window).on('resize', function () {
    if (isExpanded) {
      const winWidth = $(window).width();
      let newWidth = '260px';
      if (winWidth >= 576) newWidth = '280px';
      if (winWidth >= 768) newWidth = '300px';
      if (winWidth >= 992) newWidth = '320px';
      $morphContainer.css('width', newWidth);
    }
  });

  // Initial state: collapsed, icon visible
  function initMorph() {
    $morphContainer.css({
      width: '40px',
      height: '40px'
    });
    $morphContainer.css('backgroundColor', '#f8f9fa');
    $expandedContent.css({
      opacity: '0',
      visibility: 'hidden'
    });
    $iconWrapper.css({
      opacity: '1',
      visibility: 'visible'
    });
    $clearBtn.removeClass('clear-btn-visible').addClass('clear-btn-hidden');
    $searchInput.val('');
    isExpanded = false;
    $resultMessage.html('✨ Click the search icon (🔍) — the button morphs into an input field. Type any keyword and hit Enter to see results.');
  }

  initMorph();
});