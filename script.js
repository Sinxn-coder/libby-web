/**
 * Libby — Premium Marketing Website Interactive Scripts
 * Pure vanilla JavaScript with accessibility, smooth interactions, and reduced-motion support.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mark document as js-enabled
  document.documentElement.classList.add('js-loaded');

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. Sticky Header Transformation on Scroll
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const scrollThreshold = 40;

  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initialize on load

  /* ==========================================================================
     2. Mobile Navigation Drawer Toggle (Robust Selector Support)
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle') || document.querySelector('.hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-nav') || document.getElementById('mobile-drawer') || document.querySelector('.nav-mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    const toggleDrawer = (open) => {
      const willOpen = typeof open === 'boolean' ? open : (mobileToggle.getAttribute('aria-expanded') !== 'true');
      mobileToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      mobileToggle.classList.toggle('active', willOpen);
      if (willOpen) {
        mobileDrawer.removeAttribute('hidden');
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        mobileDrawer.classList.remove('active');
        mobileDrawer.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    };

    mobileToggle.addEventListener('click', () => toggleDrawer());

    // Close drawer when any anchor link inside it is clicked
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleDrawer(false);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
        toggleDrawer(false);
        mobileToggle.focus();
      }
    });
  }

  /* ==========================================================================
     3. Smooth Anchor Scroll with Header Offset
     ========================================================================== */
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        
        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Set focus to target for accessibility if focusable
        if (targetEl.tabIndex >= 0) {
          targetEl.focus();
        }
      }
    });
  });

  /* ==========================================================================
     4. Interactive Product Showcase Tab Switcher
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.showcase-tab');
  const showcasePanels = document.querySelectorAll('.showcase-panel');

  if (tabButtons.length > 0 && showcasePanels.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Update tab buttons
        tabButtons.forEach(b => {
          const isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Switch active showcase panel
        showcasePanels.forEach(panel => {
          const isTarget = panel.id === `panel-${targetTab}`;
          if (isTarget) {
            panel.classList.add('active');
            panel.removeAttribute('hidden');
          } else {
            panel.classList.remove('active');
            panel.setAttribute('hidden', '');
          }
        });
      });
    });

    /* --- Interactive Simulation 1: Catalog Category Filter --- */
    const catPills = document.querySelectorAll('.cat-pill');
    const catalogRows = document.querySelectorAll('.catalog-row-item');
    const catalogToast = document.getElementById('catalog-toast');

    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const selectedCat = pill.getAttribute('data-category');

        catalogRows.forEach(row => {
          const rowCat = row.getAttribute('data-category');
          if (selectedCat === 'all' || rowCat === selectedCat) {
            row.style.display = 'flex';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });

    /* --- Interactive Simulation 1b: Reserve Book Button --- */
    const reserveBtns = document.querySelectorAll('.demo-reserve-btn');
    reserveBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.textContent = 'Hold Placed!';
        btn.style.background = 'var(--color-primary-green)';
        btn.style.borderColor = 'var(--color-primary-green)';
        btn.style.color = '#ffffff';
        btn.disabled = true;

        if (catalogToast) {
          catalogToast.textContent = '✓ Fair-share FIFO reservation placed for "Artificial Intelligence: A Modern Approach". You are position #1.';
          catalogToast.style.display = 'block';
          setTimeout(() => { catalogToast.style.display = 'none'; }, 4000);
        }
      });
    });

    /* --- Interactive Simulation 1c: Book Details Button --- */
    const detailBtns = document.querySelectorAll('.demo-details-btn');
    detailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (catalogToast) {
          catalogToast.textContent = '📖 Book Details: Copy #1 (Available, Shelf 04-B) • Copy #2 (Available, Shelf 04-B) • Loan duration: 14 Days.';
          catalogToast.style.display = 'block';
          setTimeout(() => { catalogToast.style.display = 'none'; }, 4000);
        }
      });
    });

    /* --- Interactive Simulation 2: Renew Loan Action --- */
    const renewBtn = document.getElementById('demo-renew-action');
    const loanBadge = document.getElementById('demo-loan-badge');
    const dueDateText = document.getElementById('demo-due-date');
    const loansToast = document.getElementById('loans-toast');

    if (renewBtn) {
      renewBtn.addEventListener('click', () => {
        renewBtn.textContent = 'Renewed ✓';
        renewBtn.disabled = true;
        if (loanBadge) {
          loanBadge.textContent = 'DUE IN 20 DAYS';
          loanBadge.style.background = 'rgba(52, 211, 153, 0.25)';
        }
        if (dueDateText) {
          dueDateText.textContent = 'Nov 11, 2026 (+14 Days)';
        }
        if (loansToast) {
          loansToast.textContent = '✓ Loan renewed successfully under campus 14-day policy. Next renewal will require librarian clearance.';
          loansToast.style.display = 'block';
          setTimeout(() => { loansToast.style.display = 'none'; }, 4000);
        }
      });
    }

    /* --- Interactive Simulation 3: Rotate Digital ID Pass --- */
    const flipBtn = document.getElementById('demo-flip-card-btn');
    const passCard = document.querySelector('.digital-pass-card');
    let isFlipped = false;

    if (flipBtn && passCard) {
      passCard.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      flipBtn.addEventListener('click', () => {
        isFlipped = !isFlipped;
        if (isFlipped) {
          passCard.style.transform = 'perspective(800px) rotateY(180deg)';
          flipBtn.textContent = 'View QR Front';
        } else {
          passCard.style.transform = 'perspective(800px) rotateY(0deg)';
          flipBtn.textContent = 'Rotate ID Pass';
        }
      });
    }

    /* --- Interactive Simulation 4: Reservation Hold & Pickup --- */
    const claimBtn = document.getElementById('demo-claim-btn');
    const cancelResBtn = document.getElementById('demo-cancel-res-btn');
    const queueCard = document.getElementById('demo-queue-card');
    const queueIndicator = document.getElementById('demo-queue-indicator');
    const queueStatus = document.getElementById('demo-queue-status');
    const queueTimerText = document.getElementById('demo-queue-timer-text');
    const resToast = document.getElementById('res-toast');

    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        claimBtn.disabled = true;
        claimBtn.textContent = 'Collected ✓';
        if (cancelResBtn) cancelResBtn.style.display = 'none';
        if (queueStatus) {
          queueStatus.textContent = 'CHECKED OUT (ACTIVE LOAN)';
          queueStatus.style.color = '#34D399';
        }
        if (queueTimerText) {
          queueTimerText.textContent = 'Book collected at circulation desk. Due in 14 days (Nov 6, 2026).';
        }
        if (resToast) {
          resToast.textContent = '✓ Simulated pickup confirmed. Copy CN-042 transitioned to ACTIVE_LOAN on student account.';
          resToast.style.display = 'block';
          setTimeout(() => { resToast.style.display = 'none'; }, 4000);
        }
      });
    }

    if (cancelResBtn) {
      cancelResBtn.addEventListener('click', () => {
        if (queueCard) {
          queueCard.style.opacity = '0.5';
          queueCard.style.pointerEvents = 'none';
        }
        if (resToast) {
          resToast.textContent = 'Hold cancelled. Copy CN-042 automatically reallocated to next student in FIFO queue.';
          resToast.style.display = 'block';
          setTimeout(() => { resToast.style.display = 'none'; }, 4000);
        }
      });
    }

    /* --- Interactive Simulation 5: Admin Command Quick Issue & Logs --- */
    const adminIssueBtn = document.getElementById('demo-admin-issue-btn');
    const adminInput = document.getElementById('demo-admin-input');
    const adminLogs = document.getElementById('demo-admin-logs');
    const adminNavItems = document.querySelectorAll('.admin-sidebar-sim .side-item');

    adminNavItems.forEach(item => {
      item.addEventListener('click', () => {
        adminNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const tabName = item.getAttribute('data-admin-tab');
        if (adminInput) {
          if (tabName === 'circulation') adminInput.value = 'Scan Accession: CS-10492';
          if (tabName === 'members') adminInput.value = 'Search Member: LIB-STU-0042';
          if (tabName === 'sessions') adminInput.value = 'Active Session: Morning (08:30 - 16:30)';
          if (tabName === 'logs') adminInput.value = 'Filter Logs: [ACTOR: LIBRARIAN]';
          if (tabName === 'clearance') adminInput.value = 'Verify Clearance: LIB-STU-0042 [ELIGIBLE]';
        }
      });
    });

    if (adminIssueBtn && adminLogs) {
      adminIssueBtn.addEventListener('click', () => {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        const val = adminInput ? adminInput.value : 'CS-10492';
        
        const newLog = document.createElement('div');
        newLog.className = 'log-row';
        newLog.style.animation = 'slideDown 0.3s ease';
        newLog.innerHTML = `<span class="log-time">${timeStr}</span> <span class="log-act" style="color:var(--text-green-accent);">ISSUE_SUCCESS</span> ${val} issued to LIB-STU-0042. Due date recorded: 14 days.`;
        
        adminLogs.insertBefore(newLog, adminLogs.firstChild);
        adminIssueBtn.textContent = 'Issued ✓';
        setTimeout(() => { adminIssueBtn.textContent = 'Issue to LIB-STU-0042'; }, 2000);
      });
    }
  }

  /* ==========================================================================
     5. Accessible FAQ Accordion (Universal Binding)
     ========================================================================== */
  const faqButtons = document.querySelectorAll('.faq-question, .faq-trigger');

  faqButtons.forEach(btn => {
    // Generate accessible relationship if not already set
    const item = btn.closest('.faq-item');
    let answerPanel = item ? item.querySelector('.faq-answer') : null;
    
    if (!answerPanel && btn.getAttribute('aria-controls')) {
      answerPanel = document.getElementById(btn.getAttribute('aria-controls'));
    }

    if (answerPanel && !btn.hasAttribute('aria-controls')) {
      const uniqueId = 'faq-panel-' + Math.random().toString(36).substr(2, 9);
      answerPanel.id = uniqueId;
      btn.setAttribute('aria-controls', uniqueId);
    }

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close all other FAQ panels in accordion
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherItem = otherBtn.closest('.faq-item');
          if (otherItem) otherItem.classList.remove('active');
          const otherPanel = otherItem ? otherItem.querySelector('.faq-answer') : null;
          if (otherPanel) {
            otherPanel.style.maxHeight = null;
            otherPanel.style.opacity = '0';
          }
        }
      });

      // Toggle clicked item
      const willExpand = !isExpanded;
      btn.setAttribute('aria-expanded', willExpand ? 'true' : 'false');
      if (item) {
        if (willExpand) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      }
      
      if (answerPanel) {
        if (willExpand) {
          answerPanel.style.maxHeight = answerPanel.scrollHeight + 'px';
          answerPanel.style.opacity = '1';
        } else {
          answerPanel.style.maxHeight = null;
          answerPanel.style.opacity = '0';
        }
      }
    });

    // Keyboard support for space and enter already native on <button>
  });

  /* ==========================================================================
     6. Scroll-Driven Reveal Observer
     ========================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Reveal everything immediately if reduced motion or no IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  } else {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply optional stagger delay if defined
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, parseInt(delay, 10));
          } else {
            entry.target.classList.add('revealed');
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Safety fallback: reveal all elements above viewport or on load
    setTimeout(() => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('revealed');
        }
      });
    }, 120);
  }

  /* ==========================================================================
     7. Hero Parallax / 3D Tilt on Desktop
     ========================================================================== */
  const heroVisual = document.querySelector('.hero-visual');
  const heroCardStack = document.getElementById('hero-parallax-card') || document.querySelector('.hero-card-stack');

  if (heroVisual && heroCardStack && !prefersReducedMotion && window.innerWidth >= 1024) {
    let ticking = false;

    heroVisual.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = heroVisual.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          const tiltX = (y / (rect.height / 2)) * -5;
          const tiltY = (x / (rect.width / 2)) * 5;

          heroCardStack.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    heroVisual.addEventListener('mouseleave', () => {
      heroCardStack.style.transition = 'transform 0.5s ease';
      heroCardStack.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      setTimeout(() => {
        heroCardStack.style.transition = '';
      }, 500);
    });
  }

  // Live Pulse in Desktop Console Mockup
  const sessionTimer = document.querySelector('.session-pulse');
  if (sessionTimer) {
    sessionTimer.setAttribute('title', 'Session sync active');
  }
});

