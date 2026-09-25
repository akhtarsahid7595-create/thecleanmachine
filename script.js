/* ==========================================================================
   THE CLEAN MACHINE GLASGOW - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
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

    // 4. WhatsApp Direct Booking Trigger
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const area = document.getElementById('formArea').value.trim();
            const service = document.getElementById('packageSelect').value;
            const vehicle = document.getElementById('formVehicle').value;
            const notes = document.getElementById('formNotes').value.trim();

            const whatsappNumber = '447375504704'; // 07375504704 international format

            let text = `*NEW BOOKING ENQUIRY - THE CLEAN MACHINE GLASGOW*\n\n`;
            text += `👤 *Name:* ${name}\n`;
            text += `📞 *Phone:* ${phone}\n`;
            text += `📍 *Area/Postcode:* ${area}\n`;
            text += `🧼 *Package Choice:* ${service}\n`;
            text += `🚗 *Vehicle Type:* ${vehicle}\n`;
            if (notes) {
                text += `📝 *Additional Notes:* ${notes}\n`;
            }
            text += `\n_Sent via website demo booking form_`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
        });
    }
});
