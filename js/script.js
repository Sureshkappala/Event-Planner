/**
 * EVENTORA - LUXURY EVENT PLANNER
 * Core JavaScript Module (Pure Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAppState();
  initNavigation();
  initActiveNavLink();
  initInputFilters();
  initContactForm();
  initBookingForm();
  initAuthForms();
  initGalleryLightbox();
  initFiltersAndSearch();
  initTestimonialsSlider();
  initCountdowns();
  initAccordions();
  initNewsletter();
  initDashboardTabs();
  initUserDashboard();
  initAdminDashboard();
});

/* ==========================================================================
   APP STATE & LOCAL STORAGE INITIALIZATION
   ========================================================================== */
function initAppState() {
  if (!localStorage.getItem('eventora_bookings')) {
    const initialBookings = [
      {
        id: 'EVT-9041',
        name: 'Eleanor Vance',
        email: 'eleanor.vance@example.com',
        phone: '9876543210',
        type: 'Luxury Wedding',
        date: '2026-11-18',
        guests: 350,
        location: 'The Grand St. Regis Ballroom',
        budget: '$15,000 - $30,000',
        package: 'Imperial Bespoke',
        status: 'Confirmed',
        notes: 'Burgundy and champagne gold theme, 5-tier cake, classical string quartet.',
        created: '2026-10-01'
      },
      {
        id: 'EVT-8832',
        name: 'Marcus Sterling',
        email: 'marcus.s@sterlingtech.io',
        phone: '9123456780',
        type: 'Corporate Gala',
        date: '2026-12-05',
        guests: 200,
        location: 'Skyline Terrace & Pavilion',
        budget: '$10,000 - $15,000',
        package: 'Royal Grande',
        status: 'Pending',
        notes: 'Annual tech leadership summit and awards dinner with stage lighting.',
        created: '2026-10-03'
      },
      {
        id: 'EVT-7724',
        name: 'Sophia Laurent',
        email: 'sophia.laurent@gmail.com',
        phone: '9898989898',
        type: 'Birthday Celebration',
        date: '2026-10-25',
        guests: 80,
        location: 'Château Rose Villa',
        budget: '$5,000 - $10,000',
        package: 'Classic Elegance',
        status: 'Completed',
        notes: 'Floral arch, custom dessert station, acoustic duo.',
        created: '2026-09-15'
      },
      {
        id: 'EVT-6519',
        name: 'Julian Montgomery',
        email: 'julian.m@vanguard.com',
        phone: '9765432109',
        type: 'Engagement Ceremony',
        date: '2026-11-30',
        guests: 120,
        location: 'Belvedere Glasshouse',
        budget: '$10,000 - $15,000',
        package: 'Royal Grande',
        status: 'Confirmed',
        notes: 'Sunset cocktail hour followed by intimate sit-down dinner.',
        created: '2026-10-04'
      }
    ];
    localStorage.setItem('eventora_bookings', JSON.stringify(initialBookings));
  }

  if (!localStorage.getItem('eventora_messages')) {
    const initialMessages = [
      {
        id: 'MSG-101',
        name: 'Victoria Adams',
        email: 'victoria@adamsluxury.com',
        phone: '9811223344',
        subject: 'Destination Wedding Inquiry',
        message: 'Looking to book your Imperial Bespoke package for a 3-day wedding in Lake Como.',
        date: '2026-10-05',
        status: 'Unread'
      },
      {
        id: 'MSG-102',
        name: 'David Chen',
        email: 'd.chen@innovatex.org',
        phone: '9877001122',
        subject: 'Annual Charity Soirée',
        message: 'Seeking venue curation and audiovisual stage production for 400 attendees.',
        date: '2026-10-04',
        status: 'Read'
      }
    ];
    localStorage.setItem('eventora_messages', JSON.stringify(initialMessages));
  }

  // Prepopulate session credentials if not present
  if (!localStorage.getItem('eventora_session')) {
    const defaultSession = {
      name: 'Kappalasuresh92',
      email: 'kappalasuresh92@gmail.com',
      role: 'Product Lead',
      phone: '9876543210'
    };
    localStorage.setItem('eventora_session', JSON.stringify(defaultSession));
    localStorage.setItem('eventora_user', JSON.stringify(defaultSession));
  }
}

/* ==========================================================================
   NAVIGATION, STICKY HEADER & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.main-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  // Sticky navbar shadow on scroll
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Drawer Toggle
  function openDrawer(e) {
    if (e) e.preventDefault();
    if (!drawer || !backdrop) return;
    drawer.classList.add('active');
    backdrop.classList.add('active');
    if (hamburgerBtn) hamburgerBtn.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeDrawer(e) {
    if (e && e.type === 'click' && e.target.closest('#mobile-drawer') && !e.target.closest('#drawer-close-btn') && !e.target.closest('.nav-link')) {
      return;
    }
    if (!drawer || !backdrop) return;
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (drawer && drawer.classList.contains('active')) {
        closeDrawer(e);
      } else {
        openDrawer(e);
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer(e);
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeDrawer(e);
    }
  });

  // Close drawer when any mobile nav link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-nav-links .nav-link, .mobile-drawer-footer a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

function initActiveNavLink() {
  let currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPath === '') currentPath = 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '<i class="fa-solid fa-circle-check" style="color:#D4AF37;"></i>';
  if (type === 'error') {
    icon = '<i class="fa-solid fa-circle-exclamation" style="color:#E74C3C;"></i>';
  } else if (type === 'info') {
    icon = '<i class="fa-solid fa-circle-info" style="color:#3498DB;"></i>';
  }

  toast.innerHTML = `\${icon} <span>\${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.35s ease';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}


/* ==========================================================================
   REAL-TIME INPUT FILTERS & VALIDATION HELPERS
   ========================================================================== */
function initInputFilters() {
  // Name fields: letters and spaces only (strictly blocks digits and special chars)
  const nameInputs = document.querySelectorAll('#c-name, #reg-name, #customer-name, input[name="name"], .name-input');
  nameInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    });
  });

  // Phone / Mobile fields: numbers only, max 10 digits (strictly blocks alphabets)
  const phoneInputs = document.querySelectorAll('#c-phone, #reg-phone, #customer-phone, input[type="tel"], input[name="phone"], .phone-input');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('c-name');
    const emailInput = document.getElementById('c-email');
    const phoneInput = document.getElementById('c-phone');
    const subjectInput = document.getElementById('c-subject');
    const msgInput = document.getElementById('c-msg');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'General Inquiry';
    const message = msgInput ? msgInput.value.trim() : '';

    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!name || !nameRegex.test(name)) {
      showToast('Please enter a valid name with letters only (no numbers allowed).', 'error');
      if (nameInput) nameInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      if (emailInput) emailInput.focus();
      return;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      showToast('Please enter a valid 10-digit mobile number (numbers only).', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }

    if (!message) {
      showToast('Please enter your message.', 'error');
      if (msgInput) msgInput.focus();
      return;
    }

    const msgObj = {
      id: 'MSG-' + Math.floor(100 + Math.random() * 900),
      name,
      email,
      phone: phone || 'N/A',
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'Unread'
    };

    const existingMsgs = JSON.parse(localStorage.getItem('eventora_messages') || '[]');
    existingMsgs.unshift(msgObj);
    localStorage.setItem('eventora_messages', JSON.stringify(existingMsgs));

    showToast('Inquiry sent successfully! Our VIP concierge will reach out within 24 hours.', 'success');
    form.reset();
  });
}

/* ==========================================================================
   BOOKING FORM & VALIDATION
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('event-booking-form');
  if (!form) return;

  // Set minimum date to tomorrow
  const dateInput = document.getElementById('event-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', tomorrowStr);
  }

  // Pre-fill package if passed via query string (e.g. book-event.html?package=Royal+Grande)
  const urlParams = new URLSearchParams(window.location.search);
  const pkgParam = urlParams.get('package');
  const serviceParam = urlParams.get('service');
  
  if (pkgParam) {
    const pkgSelect = document.getElementById('event-package');
    if (pkgSelect) pkgSelect.value = pkgParam;
  }
  if (serviceParam) {
    const typeSelect = document.getElementById('event-type');
    if (typeSelect) typeSelect.value = serviceParam;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // 1. Customer Name (Letters and spaces only, 2-50 chars)
    const nameInput = document.getElementById('customer-name');
    const nameError = document.getElementById('name-error');
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!nameInput.value.trim() || !nameRegex.test(nameInput.value.trim())) {
      setFieldError(nameInput, nameError, 'Please enter a valid name (letters and spaces only).');
      isValid = false;
    } else {
      setFieldSuccess(nameInput, nameError);
    }

    // 2. Email (Valid format)
    const emailInput = document.getElementById('customer-email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      setFieldSuccess(emailInput, emailError);
    }

    // 3. Mobile (Exactly 10 digits)
    const phoneInput = document.getElementById('customer-phone');
    const phoneError = document.getElementById('phone-error');
    const phoneRegex = /^\d{10}$/;
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
      setFieldError(phoneInput, phoneError, 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    } else {
      setFieldSuccess(phoneInput, phoneError);
    }

    // 4. Event Type
    const typeSelect = document.getElementById('event-type');
    const typeError = document.getElementById('type-error');
    if (!typeSelect.value) {
      setFieldError(typeSelect, typeError, 'Please select an event type.');
      isValid = false;
    } else {
      setFieldSuccess(typeSelect, typeError);
    }

    // 5. Event Date (Cannot be past date)
    const dateError = document.getElementById('date-error');
    const todayStr = new Date().toISOString().split('T')[0];
    if (!dateInput.value || dateInput.value <= todayStr) {
      setFieldError(dateInput, dateError, 'Please choose a valid future event date.');
      isValid = false;
    } else {
      setFieldSuccess(dateInput, dateError);
    }

    // 6. Number of Guests (>= 1)
    const guestsInput = document.getElementById('event-guests');
    const guestsError = document.getElementById('guests-error');
    if (!guestsInput.value || parseInt(guestsInput.value) < 1) {
      setFieldError(guestsInput, guestsError, 'Please specify at least 1 guest.');
      isValid = false;
    } else {
      setFieldSuccess(guestsInput, guestsError);
    }

    // 7. Event Location
    const locInput = document.getElementById('event-location');
    const locError = document.getElementById('location-error');
    if (!locInput.value.trim()) {
      setFieldError(locInput, locError, 'Please provide the preferred venue or city location.');
      isValid = false;
    } else {
      setFieldSuccess(locInput, locError);
    }

    // 8. Budget Range
    const budgetSelect = document.getElementById('event-budget');
    const budgetError = document.getElementById('budget-error');
    if (!budgetSelect.value) {
      setFieldError(budgetSelect, budgetError, 'Please choose an estimated budget.');
      isValid = false;
    } else {
      setFieldSuccess(budgetSelect, budgetError);
    }

    if (isValid) {
      const packageSelect = document.getElementById('event-package');
      const reqInput = document.getElementById('event-requirements');

      const bookingId = 'EVT-' + Math.floor(1000 + Math.random() * 9000);
      const newBooking = {
        id: bookingId,
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        type: typeSelect.value,
        date: dateInput.value,
        guests: parseInt(guestsInput.value),
        location: locInput.value.trim(),
        budget: budgetSelect.value,
        package: packageSelect ? packageSelect.value : 'Custom Curated',
        status: 'Pending',
        notes: reqInput ? reqInput.value.trim() : '',
        created: new Date().toISOString().split('T')[0]
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('eventora_bookings', JSON.stringify(existing));

      // Display Confirmation Modal
      showBookingConfirmationModal(newBooking);
      form.reset();
      showToast('Booking request submitted successfully!', 'success');
    } else {
      showToast('Please correct the errors in the form.', 'error');
    }
  });

  function setFieldError(input, errorEl, msg) {
    input.classList.add('error');
    input.classList.remove('success');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('visible');
    }
  }

  function setFieldSuccess(input, errorEl) {
    input.classList.remove('error');
    input.classList.add('success');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }
}

function showBookingConfirmationModal(booking) {
  let modal = document.getElementById('booking-confirmation-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'booking-confirmation-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-success-icon">
        <i class="fa-solid fa-check"></i>
      </div>
      <h2 style="font-size:1.85rem; color:var(--burgundy-dark); margin-bottom:0.5rem;">Booking Confirmed!</h2>
      <p style="color:#665F60; font-size:0.95rem; margin-bottom:1.5rem;">
        Thank you, <strong>\${booking.name}</strong>. Your luxury event reservation has been recorded under reference <strong>\${booking.id}</strong>.
      </p>

      <div style="background:var(--ivory); border-radius:var(--radius-md); padding:1.25rem; text-align:left; border:1px solid var(--ivory-dark); margin-bottom:1.75rem; font-size:0.9rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span style="color:var(--text-muted);">Event Type:</span>
          <strong>\${booking.type}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span style="color:var(--text-muted);">Date:</span>
          <strong>\${booking.date}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span style="color:var(--text-muted);">Guests:</span>
          <strong>\${booking.guests} Attendees</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span style="color:var(--text-muted);">Package:</span>
          <strong>\${booking.package}</strong>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="color:var(--text-muted);">Status:</span>
          <span class="status-badge pending">Pending Review</span>
        </div>
      </div>

      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
        <a href="dashboard-user.html" class="btn btn-primary btn-sm">View in Dashboard</a>
        <button id="close-modal-btn" class="btn btn-outline btn-sm">Close</button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const closeBtn = document.getElementById('close-modal-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* ==========================================================================
   AUTHENTICATION FORMS (LOGIN & REGISTER)
   ========================================================================== */
function initAuthForms() {
  // Password Eye Toggles
  const eyeButtons = document.querySelectorAll('.toggle-password-btn');
  eyeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('i');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
          }
        } else {
          input.type = 'password';
          if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
          }
        }
      }
    });
  });

  // Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    // Quick Demo Credentials Buttons
    const fillUserBtn = document.getElementById('fill-demo-user');
    const fillAdminBtn = document.getElementById('fill-demo-admin');

    if (fillUserBtn) {
      fillUserBtn.addEventListener('click', () => {
        document.getElementById('login-email').value = 'eleanor.vance@example.com';
        document.getElementById('login-password').value = 'LuxuryClient2026!';
        document.getElementById('login-role').value = 'User';
        showToast('Demo User credentials filled', 'info');
      });
    }

    if (fillAdminBtn) {
      fillAdminBtn.addEventListener('click', () => {
        document.getElementById('login-email').value = 'admin@eventora.com';
        document.getElementById('login-password').value = 'StacklyAdmin2026!';
        document.getElementById('login-role').value = 'Admin';
        showToast('Demo Admin credentials filled', 'info');
      });
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();
      const role = document.getElementById('login-role').value;

      if (!email || !password) {
        showToast('Please enter both email and password.', 'error');
        return;
      }

      // Check if user previously registered with this email
      const existingUser = JSON.parse(localStorage.getItem('eventora_session') || localStorage.getItem('eventora_user') || '{}');
      let userName = '';
      let userPhone = '9876543210';
      
      if (existingUser && existingUser.email && existingUser.email.toLowerCase() === email.toLowerCase() && existingUser.name) {
        userName = existingUser.name;
        if (existingUser.phone) userPhone = existingUser.phone;
      } else {
        // Derive clean formatted name from email prefix (e.g. kappalasuresh92 -> Kappalasuresh92)
        const prefix = email.split('@')[0];
        userName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }

      // Save user credentials session
      const userObj = {
        name: userName,
        email: email,
        role: role,
        phone: userPhone
      };
      localStorage.setItem('eventora_session', JSON.stringify(userObj));
      localStorage.setItem('eventora_user', JSON.stringify(userObj));

      showToast(`Welcome back, \${userObj.name}! Redirecting...`, 'success');

      setTimeout(() => {
        if (role === 'Admin') {
          window.location.href = 'dashboard-admin.html';
        } else {
          window.location.href = 'dashboard-user.html';
        }
      }, 1000);
    });
  }

  // Register Form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('reg-name');
      const emailInput = document.getElementById('reg-email');
      const phoneInput = document.getElementById('reg-phone');
      const passInput = document.getElementById('reg-password');
      const roleInput = document.getElementById('reg-role');
      const termsInput = document.getElementById('reg-terms');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const pass = passInput ? passInput.value : '';
      const role = roleInput ? roleInput.value : 'User';
      const terms = termsInput ? termsInput.checked : false;

      const nameRegex = /^[a-zA-Z\s]{2,50}$/;
      if (!name || !nameRegex.test(name)) {
        showToast('Please enter a valid name with letters only (no numbers allowed).', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        if (emailInput) emailInput.focus();
        return;
      }

      const phoneRegex = /^\d{10}$/;
      if (!phone || !phoneRegex.test(phone)) {
        showToast('Please enter a valid 10-digit mobile number (numbers only).', 'error');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!pass || pass.length < 6) {
        showToast('Please enter a password with at least 6 characters.', 'error');
        if (passInput) passInput.focus();
        return;
      }

      if (!terms) {
        showToast('Please agree to the Terms & Privacy Policy.', 'error');
        return;
      }

      const userObj = { name, email, phone, role };
      localStorage.setItem('eventora_session', JSON.stringify(userObj));

      showToast(`Registration successful! Welcome to Stackly, ${name}.`, 'success');
      setTimeout(() => {
        if (role === 'Admin') {
          window.location.href = 'dashboard-admin.html';
        } else {
          window.location.href = 'dashboard-user.html';
        }
      }, 1200);
    });
  }

  // Logout buttons in dashboards
  const logoutButtons = document.querySelectorAll('.logout-trigger');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('eventora_session');
      showToast('Logged out successfully', 'info');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 800);
    });
  });
}

/* ==========================================================================
   GALLERY & LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const itemsArray = Array.from(galleryItems);

  function openLightbox(index) {
    if (!itemsArray[index]) return;
    currentIndex = index;
    const item = itemsArray[currentIndex];
    const img = item.querySelector('img');
    const title = item.getAttribute('data-title') || img.getAttribute('alt') || 'Stackly Luxury Event';
    const category = item.getAttribute('data-category') || '';

    lightboxImg.src = img.src;
    lightboxCaption.innerHTML = `<strong>\${title}</strong> \${category ? ' — ' + category : ''}`;
    lightbox.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % itemsArray.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
    openLightbox(currentIndex);
  }

  itemsArray.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

/* ==========================================================================
   SEARCH & FILTERING (SERVICES, EVENTS, GALLERY)
   ========================================================================== */
function initFiltersAndSearch() {
  // 1. Gallery Filters
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. Services Filter
  const serviceFilterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Events Search and Category Filter
  const eventsSearchInput = document.getElementById('events-search-input');
  const eventCategoryBtns = document.querySelectorAll('.event-cat-btn');
  const eventCards = document.querySelectorAll('.event-item-card');

  function filterEvents() {
    const query = eventsSearchInput ? eventsSearchInput.value.toLowerCase().trim() : '';
    let activeCat = 'all';
    const activeBtn = document.querySelector('.event-cat-btn.active');
    if (activeBtn) activeCat = activeBtn.getAttribute('data-category');

    eventCards.forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const location = (card.getAttribute('data-location') || '').toLowerCase();
      const cat = card.getAttribute('data-category') || 'all';

      const matchesSearch = title.includes(query) || location.includes(query);
      const matchesCat = (activeCat === 'all' || cat === activeCat);

      if (matchesSearch && matchesCat) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (eventsSearchInput) {
    eventsSearchInput.addEventListener('input', filterEvents);
  }

  eventCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      eventCategoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterEvents();
    });
  });
}

/* ==========================================================================
   TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialsSlider() {
  const container = document.getElementById('testimonials-slider');
  if (!container) return;

  const slides = container.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (slides.length === 0) return;

  let activeIndex = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((slide, idx) => {
      slide.style.display = idx === index ? 'block' : 'none';
      if (idx === index) slide.style.animation = 'fadeIn 0.5s ease forwards';
    });

    dots.forEach((dot, idx) => {
      if (idx === index) dot.classList.add('active');
      else dot.classList.remove('active');
    });

    activeIndex = index;
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetAutoPlay();
    });
  });

  function startAutoPlay() {
    timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, 5500);
  }

  function resetAutoPlay() {
    clearInterval(timer);
    startAutoPlay();
  }

  showSlide(0);
  startAutoPlay();
}

/* ==========================================================================
   COUNTDOWN TIMERS
   ========================================================================== */
function initCountdowns() {
  const countdownEl = document.getElementById('event-countdown');
  if (!countdownEl) return;

  // Target flagship date: 45 days from current date
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 45);

  function update() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      countdownEl.innerHTML = '<p>The Gala has commenced!</p>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-minutes');
    const sEl = document.getElementById('cd-seconds');

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   FAQ ACCORDIONS
   ========================================================================== */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isActive = parent.classList.contains('active');

      // Close other accordions in the same group
      const siblingGroup = parent.parentElement.querySelectorAll('.accordion-item');
      siblingGroup.forEach(item => item.classList.remove('active'));

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   NEWSLETTER SUBSCRIPTION
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        showToast('Thank you for subscribing to our luxury gazette!', 'success');
        input.value = '';
      } else {
        showToast('Please provide a valid email address.', 'error');
      }
    });
  });
}

/* ==========================================================================
   DASHBOARD TAB NAVIGATION SYSTEM
   ========================================================================== */
function initDashboardTabs() {

  // Internal User Dashboard Booking Form Submission
  const userDashBookingForm = document.getElementById('dashboard-booking-form');
  if (userDashBookingForm) {
    const dashDateInput = document.getElementById('dash-date');
    if (dashDateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dashDateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
    }

    userDashBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('dash-name').value.trim();
      const email = document.getElementById('dash-email').value.trim();
      const phone = document.getElementById('dash-phone').value.trim();
      const type = document.getElementById('dash-type').value;
      const date = document.getElementById('dash-date').value;
      const guests = parseInt(document.getElementById('dash-guests').value) || 1;
      const location = document.getElementById('dash-location').value.trim();
      const budget = document.getElementById('dash-budget').value;
      const packageTier = document.getElementById('dash-package').value;
      const notes = document.getElementById('dash-notes').value.trim();

      if (!name || !email || !phone || !type || !date || !location || !budget) {
        showToast('Please complete all required fields.', 'error');
        return;
      }

      if (!/^\d{10}$/.test(phone)) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      const bookingId = 'EVT-' + Math.floor(1000 + Math.random() * 9000);
      const newBooking = {
        id: bookingId,
        name,
        email,
        phone,
        type,
        date,
        guests,
        location,
        budget,
        package: packageTier,
        status: 'Pending',
        notes,
        created: new Date().toISOString().split('T')[0]
      };

      const bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
      bookings.unshift(newBooking);
      localStorage.setItem('eventora_bookings', JSON.stringify(bookings));

      showToast(`Reservation ${bookingId} confirmed and locked into calendar!`, 'success');
      userDashBookingForm.reset();

      // Refresh dashboard tables and metrics
      initUserDashboard();

      // Switch to My Reservations tab
      const reservationsTabBtn = document.querySelector('[data-tab=tab-bookings]');
      if (reservationsTabBtn) reservationsTabBtn.click();
    });
  }

  // Internal Admin Dashboard Booking Form Submission
  const adminDashBookingForm = document.getElementById('admin-booking-form');
  if (adminDashBookingForm) {
    const admDateInput = document.getElementById('adm-book-date');
    if (admDateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      admDateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
    }

    adminDashBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('adm-book-name').value.trim();
      const email = document.getElementById('adm-book-email').value.trim();
      const phone = document.getElementById('adm-book-phone').value.trim();
      const type = document.getElementById('adm-book-type').value;
      const date = document.getElementById('adm-book-date').value;
      const guests = parseInt(document.getElementById('adm-book-guests').value) || 1;
      const location = document.getElementById('adm-book-location').value.trim();
      const budget = document.getElementById('adm-book-budget').value;
      const packageTier = document.getElementById('adm-book-package').value;
      const status = document.getElementById('adm-book-status').value || 'Confirmed';
      const notes = document.getElementById('adm-book-notes').value.trim();

      if (!name || !email || !phone || !type || !date || !location) {
        showToast('Please complete all required fields.', 'error');
        return;
      }

      if (!/^\d{10}$/.test(phone)) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      const bookingId = 'EVT-' + Math.floor(1000 + Math.random() * 9000);
      const newBooking = {
        id: bookingId,
        name,
        email,
        phone,
        type,
        date,
        guests,
        location,
        budget,
        package: packageTier,
        status,
        notes,
        created: new Date().toISOString().split('T')[0]
      };

      const bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
      bookings.unshift(newBooking);
      localStorage.setItem('eventora_bookings', JSON.stringify(bookings));

      showToast(`Client reservation ${bookingId} added successfully!`, 'success');
      adminDashBookingForm.reset();

      // Refresh admin dashboard and switch to Manage Bookings
      initAdminDashboard();
      const manageBookingsTabBtn = document.querySelector('[data-tab=adm-bookings]');
      if (manageBookingsTabBtn) manageBookingsTabBtn.click();
    });
  }

  const tabButtons = document.querySelectorAll('.dashboard-nav-item[data-tab], [data-tab]');
  const sidebar = document.getElementById('dashboard-sidebar');
  const hamburgerBtn = document.getElementById('dashboard-hamburger-btn');
  const closeBtn = document.getElementById('dashboard-sidebar-close');
  const backdrop = document.getElementById('dashboard-backdrop');

  // Mobile Dashboard Drawer Functions
  function openDashboardDrawer() {
    if (sidebar) sidebar.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('dashboard-drawer-open');
  }

  function closeDashboardDrawer() {
    if (sidebar) sidebar.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('dashboard-drawer-open');
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDashboardDrawer();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDashboardDrawer();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeDashboardDrawer();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDashboardDrawer();
    }
  });

  if (tabButtons.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetTabId = btn.getAttribute('data-tab');
        if (!targetTabId) return;
        e.preventDefault();

        // Update active nav button
        document.querySelectorAll('.dashboard-nav-item[data-tab]').forEach(b => {
          if (b.getAttribute('data-tab') === targetTabId) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });

        // Update active tab panel
        const targetContent = document.getElementById(targetTabId);
        if (targetContent) {
          document.querySelectorAll('.dashboard-tab-content').forEach(panel => {
            panel.classList.remove('active');
          });
          targetContent.classList.add('active');
        }

        // Auto close mobile drawer on tab select
        if (window.innerWidth <= 992) {
          closeDashboardDrawer();
        }
      });
    });
  }

  // Logout trigger handlers
  const logoutBtns = document.querySelectorAll('.logout-trigger, .dashboard-nav-item.logout');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDashboardDrawer();
      showToast('You have been signed out securely.', 'info');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 700);
    });
  });
}

/* ==========================================================================
   USER DATA RESOLUTION & SESSION SYNC
   ========================================================================== */
function getResolvedUserData() {
  let session = JSON.parse(localStorage.getItem('eventora_session') || localStorage.getItem('eventora_user') || '{}');
  
  let email = session.email || 'kappalasuresh92@gmail.com';
  let emailPrefix = email.split('@')[0];
  let formattedEmailName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);
  
  let name = session.name;
  // If name is missing or is one of the generic default placeholders, use email-derived name
  const legacyDefaults = ['Master Concierge', 'Arthur Sterling', 'Eleanor Vance', 'Admin Director', 'Admin', 'User', 'Host', ''];
  if (!name || legacyDefaults.includes(name.trim())) {
    name = formattedEmailName;
  }
  
  let role = (session.role === 'Admin') ? 'System Administrator' : (session.role || 'Product Lead');
  let phone = session.phone || '9876543210';
  
  const resolved = { name, email, role, phone };
  localStorage.setItem('eventora_session', JSON.stringify(resolved));
  localStorage.setItem('eventora_user', JSON.stringify(resolved));
  return resolved;
}

/* ==========================================================================
   USER DASHBOARD DYNAMICS
   ========================================================================== */
function initUserDashboard() {
  const userTableBody = document.getElementById('user-bookings-table-body');
  const fullTableBody = document.getElementById('user-full-bookings-body');
  if (!userTableBody && !fullTableBody) return;

  // Load user profile info from active user session credentials
  const userData = getResolvedUserData();
  const uName = userData.name;
  const uEmail = userData.email;
  const uRole = (userData.role && userData.role !== 'User') ? userData.role : 'Product Lead';
  const uPhone = userData.phone;
  const uInitial = uName.charAt(0).toUpperCase() || 'K';

  // 1. Update Topbar Display
  const userDisplayName = document.getElementById('user-display-name');
  if (userDisplayName) userDisplayName.textContent = uName;

  // 2. Update Sidebar User Profile Card
  const sidebarAvatar = document.getElementById('sidebar-user-avatar');
  const sidebarName = document.getElementById('sidebar-user-name');
  const sidebarRole = document.getElementById('sidebar-user-role');
  if (sidebarAvatar) sidebarAvatar.textContent = uInitial;
  if (sidebarName) sidebarName.textContent = uName;
  if (sidebarRole) sidebarRole.innerHTML = `${(userData.role || 'VIP HOST').toUpperCase()} &bull; STACKLY`;

  // 3. Update Executive Welcome Banner & Live Credentials
  const welcomeUserName = document.getElementById('welcome-user-name');
  const credName = document.getElementById('welcome-cred-name');
  const credEmail = document.getElementById('welcome-cred-email');
  const credRole = document.getElementById('welcome-cred-role');
  if (welcomeUserName) welcomeUserName.textContent = uName;
  if (credName) credName.textContent = uName;
  if (credEmail) credEmail.textContent = uEmail;
  if (credRole) credRole.textContent = uRole;

  // 4. Update Profile Settings tab inputs
  const profileNameInput = document.getElementById('profile-name-input');
  const profileEmailInput = document.getElementById('profile-email-input');
  const profilePhoneInput = document.querySelector('#tab-profile input[type="tel"]');
  if (profileNameInput) profileNameInput.value = uName;
  if (profileEmailInput) profileEmailInput.value = uEmail;
  if (profilePhoneInput) profilePhoneInput.value = uPhone;

  // 5. Sync internal booking form with user credentials
  const dashName = document.getElementById('dash-name');
  const dashEmail = document.getElementById('dash-email');
  const dashPhone = document.getElementById('dash-phone');
  if (dashName) dashName.value = uName;
  if (dashEmail) dashEmail.value = uEmail;
  if (dashPhone) dashPhone.value = uPhone;

  // Profile save handler
  const profileForm = document.querySelector('#tab-profile form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedUser = {
        name: profileNameInput ? profileNameInput.value.trim() : uName,
        email: profileEmailInput ? profileEmailInput.value.trim() : uEmail,
        role: userData.role || 'Product Lead',
        phone: profilePhoneInput ? profilePhoneInput.value.trim() : uPhone
      };
      localStorage.setItem('eventora_session', JSON.stringify(updatedUser));
      localStorage.setItem('eventora_user', JSON.stringify(updatedUser));

      if (userDisplayName) userDisplayName.textContent = updatedUser.name;
      if (welcomeUserName) welcomeUserName.textContent = updatedUser.name;
      if (credName) credName.textContent = updatedUser.name;
      if (credEmail) credEmail.textContent = updatedUser.email;
      if (sidebarName) sidebarName.textContent = updatedUser.name;
      if (sidebarAvatar) sidebarAvatar.textContent = updatedUser.name.charAt(0).toUpperCase();

      showToast('VIP Host profile preferences updated successfully!', 'success');
    });
  }

  // Dashboard countdown clock
  initUserCountdownClock();

  function renderUserTables() {
    const bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
    
    // Render user stats
    const totalEl = document.getElementById('user-total-bookings');
    const confirmedEl = document.getElementById('user-confirmed-count');
    const pendingEl = document.getElementById('user-pending-count');

    if (totalEl) totalEl.textContent = bookings.length;
    if (confirmedEl) confirmedEl.textContent = bookings.filter(b => b.status === 'Confirmed').length;
    if (pendingEl) pendingEl.textContent = bookings.filter(b => b.status === 'Pending').length;

    // Overview Table Search filter
    const searchVal = (document.getElementById('user-table-search')?.value || '').toLowerCase().trim();
    const overviewBookings = bookings.filter(b => {
      if (!searchVal) return true;
      return (b.id && b.id.toLowerCase().includes(searchVal)) ||
             (b.type && b.type.toLowerCase().includes(searchVal)) ||
             (b.location && b.location.toLowerCase().includes(searchVal));
    });

    if (userTableBody) {
      if (overviewBookings.length === 0) {
        userTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No matching reservations found.</td></tr>`;
      } else {
        userTableBody.innerHTML = overviewBookings.map(b => `
          <tr>
            <td><strong>${b.id}</strong></td>
            <td>
              <div style="font-weight:700; color:var(--burgundy-dark);">${b.type}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${b.location}</div>
            </td>
            <td>${b.date}</td>
            <td>${b.guests} Guests</td>
            <td><span style="font-size:0.85rem; font-weight:600; color:var(--burgundy);">${b.package || 'Royal Grande'}</span></td>
            <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
            <td>
              <button onclick="viewUserBookingDetails('${b.id}')" class="btn btn-outline btn-sm" style="padding:0.35rem 0.85rem; font-size:0.8rem;">
                <i class="fa-solid fa-eye"></i> Details
              </button>
            </td>
          </tr>
        `).join('');
      }
    }

    // Full Bookings Table with Status Filter
    const statusFilterVal = document.getElementById('user-status-filter')?.value || 'All';
    const fullFilteredBookings = bookings.filter(b => {
      if (statusFilterVal === 'All') return true;
      return b.status === statusFilterVal;
    });

    if (fullTableBody) {
      if (fullFilteredBookings.length === 0) {
        fullTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No reservations found with status "${statusFilterVal}".</td></tr>`;
      } else {
        fullTableBody.innerHTML = fullFilteredBookings.map(b => `
          <tr>
            <td><strong>${b.id}</strong></td>
            <td>
              <div style="font-weight:700; color:var(--burgundy-dark);">${b.type}</div>
              <div style="font-size:0.8rem; color:var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${b.location}</div>
            </td>
            <td>${b.date}</td>
            <td>${b.guests} Guests</td>
            <td><strong>${b.budget || '$10,000 - $15,000'}</strong></td>
            <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
            <td>
              <button onclick="viewUserBookingDetails('${b.id}')" class="btn btn-primary btn-sm" style="padding:0.35rem 0.85rem; font-size:0.8rem;">
                <i class="fa-solid fa-receipt"></i> Inspect
              </button>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  const userSearchInput = document.getElementById('user-table-search');
  if (userSearchInput) {
    userSearchInput.addEventListener('input', renderUserTables);
  }

  const userStatusFilter = document.getElementById('user-status-filter');
  if (userStatusFilter) {
    userStatusFilter.addEventListener('change', renderUserTables);
  }

  renderUserTables();
}

function initUserCountdownClock() {
  const dEl = document.getElementById('u-days');
  const hEl = document.getElementById('u-hours');
  const mEl = document.getElementById('u-mins');
  const sEl = document.getElementById('u-secs');
  if (!dEl || !hEl || !mEl || !sEl) return;

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 42);
  targetDate.setHours(targetDate.getHours() + 14);

  function tick() {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    dEl.textContent = String(days).padStart(2, '0');
    hEl.textContent = String(hours).padStart(2, '0');
    mEl.textContent = String(mins).padStart(2, '0');
    sEl.textContent = String(secs).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

window.viewUserBookingDetails = function(bookingId) {
  const bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const modal = document.getElementById('booking-details-modal');
  if (!modal) return;

  const statusBadge = document.getElementById('modal-status-badge');
  const eventType = document.getElementById('modal-event-type');
  const idEl = document.getElementById('modal-booking-id');
  const locEl = document.getElementById('modal-location');
  const dateEl = document.getElementById('modal-date');
  const guestsEl = document.getElementById('modal-guests');
  const pkgEl = document.getElementById('modal-package');
  const budgetEl = document.getElementById('modal-budget');
  const notesEl = document.getElementById('modal-notes');

  if (statusBadge) {
    statusBadge.className = `status-badge ${booking.status.toLowerCase()}`;
    statusBadge.textContent = booking.status;
  }
  if (eventType) eventType.textContent = booking.type;
  if (idEl) idEl.textContent = `Booking #${booking.id}`;
  if (locEl) locEl.textContent = booking.location;
  if (dateEl) dateEl.textContent = booking.date;
  if (guestsEl) guestsEl.textContent = `${booking.guests} Attendees`;
  if (pkgEl) pkgEl.textContent = booking.package || 'Royal Grande';
  if (budgetEl) budgetEl.textContent = booking.budget || '$15,000 - $30,000';
  if (notesEl) notesEl.textContent = booking.notes || 'Bespoke design package with full day-of concierge.';

  modal.classList.add('active');
};

/* ==========================================================================
   ADMIN DASHBOARD DYNAMICS
   ========================================================================== */
function initAdminDashboard() {
  const adminTableBody = document.getElementById('admin-bookings-table-body');
  const fullAdminTableBody = document.getElementById('admin-full-bookings-body');
  if (!adminTableBody && !fullAdminTableBody) return;

  // Load admin profile info from active user session credentials
  const adminData = getResolvedUserData();
  const aName = adminData.name;
  const aEmail = adminData.email;
  const aRole = (adminData.role === 'Admin' || adminData.role === 'System Administrator') ? 'System Administrator' : adminData.role;
  const aInitial = aName.charAt(0).toUpperCase() || 'K';

  const adminDisplayName = document.getElementById('admin-display-name');
  if (adminDisplayName) adminDisplayName.textContent = aName;

  const sidebarAdminAvatar = document.getElementById('sidebar-admin-avatar');
  const sidebarAdminName = document.getElementById('sidebar-admin-name');
  const sidebarAdminRole = document.getElementById('sidebar-admin-role');
  if (sidebarAdminAvatar) sidebarAdminAvatar.textContent = aInitial;
  if (sidebarAdminName) sidebarAdminName.textContent = aName;
  if (sidebarAdminRole) sidebarAdminRole.innerHTML = `EXECUTIVE ADMIN &bull; STACKLY`;

  const adminWelcomeName = document.getElementById('admin-welcome-name');
  const adminCredName = document.getElementById('admin-cred-name');
  const adminCredEmail = document.getElementById('admin-cred-email');
  const adminCredRole = document.getElementById('admin-cred-role');
  if (adminWelcomeName) adminWelcomeName.textContent = aName;
  if (adminCredName) adminCredName.textContent = aName;
  if (adminCredEmail) adminCredEmail.textContent = aEmail;
  if (adminCredRole) adminCredRole.textContent = aRole;

  function renderAdmin() {
    const bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
    const messages = JSON.parse(localStorage.getItem('eventora_messages') || '[]');
    
    // Calculate total pipeline revenue based on package tiers
    let totalRevenue = 0;
    bookings.forEach(b => {
      if (b.package === 'Imperial Bespoke') totalRevenue += 24500;
      else if (b.package === 'Royal Grande') totalRevenue += 12500;
      else totalRevenue += 6500;
    });

    const revEl = document.getElementById('admin-total-revenue');
    const totalBookEl = document.getElementById('admin-total-bookings');
    const pendingBookEl = document.getElementById('admin-pending-bookings');

    if (revEl) revEl.textContent = '$' + totalRevenue.toLocaleString();
    if (totalBookEl) totalBookEl.textContent = bookings.length;
    if (pendingBookEl) pendingBookEl.textContent = bookings.filter(b => b.status === 'Pending').length;

    // Filter overview table
    const searchVal = (document.getElementById('admin-search-input')?.value || '').toLowerCase().trim();
    const statusVal = document.getElementById('admin-filter-status')?.value || 'All';

    const filteredBookings = bookings.filter(b => {
      const matchSearch = !searchVal ||
        (b.id && b.id.toLowerCase().includes(searchVal)) ||
        (b.name && b.name.toLowerCase().includes(searchVal)) ||
        (b.type && b.type.toLowerCase().includes(searchVal)) ||
        (b.date && b.date.includes(searchVal));
      
      const matchStatus = (statusVal === 'All' || b.status === statusVal);
      return matchSearch && matchStatus;
    });

    // Render Overview Table
    if (adminTableBody) {
      if (filteredBookings.length === 0) {
        adminTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No booking requests found.</td></tr>`;
      } else {
        adminTableBody.innerHTML = filteredBookings.map(b => `
          <tr>
            <td><strong>${b.id}</strong></td>
            <td>
              <div style="font-weight:700; color:var(--burgundy-dark);">${b.name}</div>
              <div style="font-size:0.775rem; color:var(--text-muted);">${b.email} &bull; ${b.phone}</div>
            </td>
            <td>${b.type}</td>
            <td>${b.date}</td>
            <td>${b.guests}</td>
            <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
            <td>
              <div style="display:flex; gap:0.4rem; align-items:center;">
                <button onclick="inspectAdminBooking('${b.id}')" title="Inspect" class="btn btn-sm" style="background:#EBF5FB; color:#2980B9; padding:0.3rem 0.6rem; font-size:0.75rem;">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <button onclick="updateBookingStatus('${b.id}', 'Confirmed')" title="Approve" class="btn btn-sm" style="background:#E8F8F0; color:#1E8449; padding:0.3rem 0.6rem; font-size:0.75rem;">
                  <i class="fa-solid fa-check"></i>
                </button>
                <button onclick="updateBookingStatus('${b.id}', 'Rejected')" title="Reject" class="btn btn-sm" style="background:#FDEDEC; color:#C0392B; padding:0.3rem 0.6rem; font-size:0.75rem;">
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <button onclick="deleteBooking('${b.id}')" title="Delete" class="btn btn-sm" style="background:#F2F3F4; color:#7F8C8D; padding:0.3rem 0.6rem; font-size:0.75rem;">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    // Render Full Database Table
    if (fullAdminTableBody) {
      if (bookings.length === 0) {
        fullAdminTableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:2rem; color:var(--text-muted);">No client database records.</td></tr>`;
      } else {
        fullAdminTableBody.innerHTML = bookings.map(b => `
          <tr>
            <td><strong>${b.id}</strong></td>
            <td><strong>${b.name}</strong></td>
            <td style="font-size:0.8rem; color:var(--text-muted);">${b.email}<br>${b.phone}</td>
            <td>${b.type}</td>
            <td>${b.date}</td>
            <td>${b.guests}</td>
            <td><span style="font-weight:600; color:var(--burgundy);">${b.package || 'Royal Grande'}</span></td>
            <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
            <td>
              <div style="display:flex; gap:0.4rem;">
                <button onclick="inspectAdminBooking('${b.id}')" class="btn btn-outline btn-sm" style="padding:0.25rem 0.55rem; font-size:0.75rem;">
                  <i class="fa-solid fa-eye"></i> View
                </button>
                <button onclick="deleteBooking('${b.id}')" class="btn btn-sm" style="background:#FDEDEC; color:#C0392B; padding:0.25rem 0.55rem; font-size:0.75rem;">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    // Render Quick Leads Desk
    const quickLeadsEl = document.getElementById('admin-quick-leads-list');
    if (quickLeadsEl) {
      if (messages.length === 0) {
        quickLeadsEl.innerHTML = `<div style="color:var(--text-muted); font-size:0.85rem;">No active inquiries.</div>`;
      } else {
        quickLeadsEl.innerHTML = messages.slice(0, 3).map(m => `
          <div style="padding-bottom:0.75rem; border-bottom:1px solid rgba(212,175,55,0.15);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
              <strong style="color:var(--burgundy-dark);">${m.name}</strong>
              <span class="status-badge ${m.status === 'Unread' ? 'pending' : 'completed'}" style="font-size:0.7rem; padding:0.15rem 0.5rem;">${m.status}</span>
            </div>
            <p style="margin:0; font-size:0.82rem; color:var(--text-body); line-height:1.4;">${m.message}</p>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.25rem;"><i class="fa-solid fa-envelope"></i> ${m.email} &bull; ${m.date}</div>
          </div>
        `).join('');
      }
    }

    // Render Full Inbox
    const inboxEl = document.getElementById('admin-inbox-list');
    if (inboxEl) {
      if (messages.length === 0) {
        inboxEl.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted);">Inbox is completely clear.</div>`;
      } else {
        inboxEl.innerHTML = messages.map(m => `
          <div style="background:var(--ivory); border-radius:var(--radius-md); padding:1.5rem; border:1px solid ${m.status === 'Unread' ? 'var(--gold)' : 'var(--ivory-dark)'}; box-shadow:var(--shadow-sm);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <h4 style="font-size:1.15rem; color:var(--burgundy-dark); margin:0 0 0.25rem 0;">${m.subject || 'Event Inquiry'}</h4>
                <div style="font-size:0.85rem; color:var(--text-muted);"><i class="fa-solid fa-user"></i> ${m.name} &bull; <i class="fa-solid fa-envelope"></i> ${m.email} &bull; <i class="fa-solid fa-phone"></i> ${m.phone || 'N/A'}</div>
              </div>
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <span class="status-badge ${m.status === 'Unread' ? 'pending' : 'completed'}">${m.status}</span>
                <span style="font-size:0.8rem; color:var(--text-muted);">${m.date}</span>
              </div>
            </div>
            <p style="font-size:0.92rem; color:var(--text-body); line-height:1.6; margin-bottom:1.25rem; background:rgba(255,255,255,0.6); padding:1rem; border-radius:6px;">
              "${m.message}"
            </p>
            <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
              ${m.status === 'Unread' ? `
                <button onclick="markMessageRead('${m.id}')" class="btn btn-outline btn-sm" style="padding:0.35rem 0.85rem; font-size:0.8rem;">
                  <i class="fa-solid fa-check-double"></i> Mark Read
                </button>
              ` : ''}
              <a href="mailto:${m.email}?subject=RE: ${encodeURIComponent(m.subject || 'Stackly Luxury Event Inquiry')}" class="btn btn-primary btn-sm" style="padding:0.35rem 0.85rem; font-size:0.8rem;">
                <i class="fa-solid fa-reply"></i> Direct Reply
              </a>
              <button onclick="deleteMessage('${m.id}')" class="btn btn-sm" style="background:#FDEDEC; color:#C0392B; padding:0.35rem 0.85rem; font-size:0.8rem;">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // Hook search & filter inputs
  const adminSearchInput = document.getElementById('admin-search-input');
  if (adminSearchInput) {
    adminSearchInput.addEventListener('input', renderAdmin);
  }

  const adminFilterStatus = document.getElementById('admin-filter-status');
  if (adminFilterStatus) {
    adminFilterStatus.addEventListener('change', renderAdmin);
  }

  // Global window admin actions
  window.inspectAdminBooking = function(id) {
    const bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    const modal = document.getElementById('admin-booking-inspect-modal');
    if (!modal) return;

    document.getElementById('adm-modal-status').className = `status-badge ${booking.status.toLowerCase()}`;
    document.getElementById('adm-modal-status').textContent = booking.status;
    document.getElementById('adm-modal-client').textContent = `${booking.name} - ${booking.type}`;
    
    const idEl = document.getElementById('adm-modal-id');
    idEl.textContent = `Booking #${booking.id}`;
    idEl.dataset.rawId = booking.id;

    document.getElementById('adm-modal-email').textContent = booking.email;
    document.getElementById('adm-modal-phone').textContent = booking.phone;
    document.getElementById('adm-modal-location').textContent = booking.location;
    document.getElementById('adm-modal-date').textContent = booking.date;
    document.getElementById('adm-modal-guests').textContent = `${booking.guests} Attendees`;
    document.getElementById('adm-modal-package').textContent = booking.package || 'Royal Grande';
    document.getElementById('adm-modal-notes').textContent = booking.notes || 'None provided.';

    modal.classList.add('active');
  };

  window.updateBookingStatus = function(id, newStatus) {
    let bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
    bookings = bookings.map(b => {
      if (b.id === id) b.status = newStatus;
      return b;
    });
    localStorage.setItem('eventora_bookings', JSON.stringify(bookings));
    showToast(`Booking ${id} status changed to ${newStatus}`, 'success');
    renderAdmin();
  };

  window.deleteBooking = function(id) {
    if (!confirm(`Are you sure you want to permanently remove reservation ${id}?`)) return;
    let bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('eventora_bookings', JSON.stringify(bookings));
    showToast(`Reservation ${id} deleted successfully.`, 'info');
    renderAdmin();
  };

  window.markMessageRead = function(msgId) {
    let messages = JSON.parse(localStorage.getItem('eventora_messages') || '[]');
    messages = messages.map(m => {
      if (m.id === msgId) m.status = 'Read';
      return m;
    });
    localStorage.setItem('eventora_messages', JSON.stringify(messages));
    showToast('Inquiry marked as Read.', 'success');
    renderAdmin();
  };

  window.deleteMessage = function(msgId) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    let messages = JSON.parse(localStorage.getItem('eventora_messages') || '[]');
    messages = messages.filter(m => m.id !== msgId);
    localStorage.setItem('eventora_messages', JSON.stringify(messages));
    showToast('Inquiry deleted.', 'info');
    renderAdmin();
  };

  window.exportBookingsCSV = function() {
    const bookings = JSON.parse(localStorage.getItem('eventora_bookings') || '[]');
    if (bookings.length === 0) {
      showToast('No reservations available to export.', 'error');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Event Type', 'Date', 'Guests', 'Location', 'Package', 'Status', 'Notes'];
    const rows = bookings.map(b => [
      `"${b.id}"`,
      `"${b.name || ''}"`,
      `"${b.email || ''}"`,
      `"${b.phone || ''}"`,
      `"${b.type || ''}"`,
      `"${b.date || ''}"`,
      b.guests || 0,
      `"${b.location || ''}"`,
      `"${b.package || ''}"`,
      `"${b.status || ''}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stackly_reservations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Reservations CSV downloaded successfully!', 'success');
  };

  renderAdmin();
}

