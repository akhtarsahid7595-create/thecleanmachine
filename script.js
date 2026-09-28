/* ==========================================================================
   THE CLEAN MACHINE GLASGOW - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#booking') {
        window.location.replace('contact.html');
        return;
    }

    // 1. Mobile Drawer Toggle
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobDrawer = document.getElementById('mobDrawer');
    const mobDrawerOverlay = document.getElementById('mobDrawerOverlay');
    const mobNavLinks = document.querySelectorAll('.mob-nav-link');

    function toggleDrawer() {
        const isOpen = mobDrawer.classList.contains('is-open');
        if (isOpen) {
            mobDrawer.classList.remove('is-open');
            mobDrawerOverlay.classList.remove('is-open');
            hamburgerBtn.classList.remove('is-active');
            document.body.style.overflow = '';
        } else {
            mobDrawer.classList.add('is-open');
            mobDrawerOverlay.classList.add('is-open');
            hamburgerBtn.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleDrawer);
    }

    if (mobDrawerOverlay) {
        mobDrawerOverlay.addEventListener('click', toggleDrawer);
    }

    mobNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobDrawer.classList.contains('is-open')) {
                toggleDrawer();
            }
        });
    });

    const servicesDropdown = document.querySelector('.nav-dropdown');
    const servicesDropdownToggle = document.querySelector('.nav-dropdown-toggle');
    if (servicesDropdown && servicesDropdownToggle) {
        servicesDropdownToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = servicesDropdown.classList.toggle('is-open');
            servicesDropdownToggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', (event) => {
            if (!servicesDropdown.contains(event.target)) {
                servicesDropdown.classList.remove('is-open');
                servicesDropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Keep every legacy booking link pointed at the dedicated contact page.
    document.querySelectorAll('a[href$="#booking"]').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = 'contact.html';
        });
    });

    // 2. Smooth Scroll for Navigation Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Auto-populate Form Package selection when clicking pricing CTA buttons
    const pricingBtns = document.querySelectorAll('.select-package-btn');
    const packageSelect = document.getElementById('packageSelect');
    const bookingSection = document.getElementById('booking');

    pricingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedPkg = btn.getAttribute('data-package');
            if (packageSelect && selectedPkg) {
                packageSelect.value = selectedPkg;
            }
            if (bookingSection) {
                const headerOffset = 80;
                const elementPosition = bookingSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Email and WhatsApp booking submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const nameInput = document.getElementById('formName');
        const phoneInput = document.getElementById('formPhone');
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        submitButton.innerHTML = '<span>Send Booking Request</span>';
        const contactInfoList = document.querySelector('.contact-info-list');
        if (contactInfoList && !document.getElementById('businessEmail')) {
            const emailItem = document.createElement('div');
            emailItem.className = 'contact-info-item';
            emailItem.id = 'businessEmail';
            emailItem.innerHTML = '<div class="contact-info-text"><h4>Email</h4><a href="mailto:Thecleanmachine_glasgow@Outlook.com">Thecleanmachine_glasgow@Outlook.com</a></div>';
            contactInfoList.appendChild(emailItem);
        }
        const emailGroup = document.createElement('div');
        emailGroup.className = 'form-group';
        emailGroup.innerHTML = '<label class="form-label" for="formEmail">Email Address</label><input type="email" id="formEmail" name="email" class="form-control" placeholder="e.g. james@example.com" required>';
        phoneInput.closest('.form-group').before(emailGroup);

        const fields = {
            access_key: 'c92a8e69-4ffd-4b0c-8f55-5277c392845b',
            subject: 'New booking enquiry - The Clean Machine Glasgow',
            from_name: 'The Clean Machine Glasgow Website'
        };
        Object.entries(fields).forEach(([name, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            bookingForm.appendChild(input);
        });
        nameInput.name = 'name';
        phoneInput.name = 'phone';
        document.getElementById('formArea').name = 'area';
        document.getElementById('packageSelect').name = 'service';
        document.getElementById('formVehicle').name = 'vehicle';
        document.getElementById('formNotes').name = 'message';

        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Sending request...</span>';

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: new FormData(bookingForm)
                });
                const result = await response.json();
                if (!result.success) throw new Error('Email submission failed');

                const successMessage = document.createElement('p');
                successMessage.className = 'form-success-message';
                successMessage.textContent = 'Thank you. Your booking request has been sent by email. We will contact you shortly.';
                bookingForm.replaceWith(successMessage);
            } catch (error) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                alert('We could not send your request by email. Please try again or contact us on WhatsApp.');
            }
        });
    }
});
