/* ==========================================================================
   NARAYANA HAIRCUTTING SHOP - EDLURUPADU
   Interactive JavaScript Core
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initQRCode();
    initCopyUPI();
    initMobileNav();
    initScrollSpy();
    initParticleCanvas();
    initImageDeploymentFallbacks();
});

/**
 * Image Fail-safe Deployment Handler
 */
function initImageDeploymentFallbacks() {
    if (!window.EMBEDDED_IMAGES) return;
    
    document.querySelectorAll('img').forEach(img => {
        // If image complete but broken or failed to load
        if (img.naturalWidth === 0) {
            triggerImageFallback(img);
        }
        img.addEventListener('error', () => triggerImageFallback(img));
    });
}

function triggerImageFallback(img) {
    if (!window.EMBEDDED_IMAGES) return;
    if (img.classList.contains('hero-img') && window.EMBEDDED_IMAGES.hero) {
        img.src = window.EMBEDDED_IMAGES.hero;
    } else if (img.classList.contains('dollu-img') && window.EMBEDDED_IMAGES.dollu) {
        img.src = window.EMBEDDED_IMAGES.dollu;
    } else if (img.classList.contains('makeup-img') && window.EMBEDDED_IMAGES.makeup) {
        img.src = window.EMBEDDED_IMAGES.makeup;
    } else if (img.classList.contains('yanadi-img') && window.EMBEDDED_IMAGES.yanadi) {
        img.src = window.EMBEDDED_IMAGES.yanadi;
    } else if (img.classList.contains('venkat-img') && window.EMBEDDED_IMAGES.venkat) {
        img.src = window.EMBEDDED_IMAGES.venkat;
    } else if (img.classList.contains('brand-logo-img') && window.EMBEDDED_IMAGES.logo) {
        img.src = window.EMBEDDED_IMAGES.logo;
    }
}

// Default UPI Details
const UPI_ID = "9390398034@axl";
const PAYEE_NAME = "Narayana Haircutting Shop";
let qrCodeObj = null;

/**
 * Initialize QRCode.js
 */
function initQRCode() {
    const qrContainer = document.getElementById('qrcode-render');
    if (!qrContainer) return;

    qrContainer.innerHTML = '';
    const initialURI = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&cu=INR`;

    try {
        qrCodeObj = new QRCode(qrContainer, {
            text: initialURI,
            width: 180,
            height: 180,
            colorDark: "#0F172A",
            colorLight: "#FFFFFF",
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (err) {
        console.error("QRCode rendering error:", err);
    }
}

/**
 * Dynamic QR Code Update for Quick Pay Presets
 */
function updateQR(amount) {
    const directLink = document.getElementById('direct-upi-link');
    const uri = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR`;

    if (qrCodeObj) {
        qrCodeObj.clear();
        qrCodeObj.makeCode(uri);
    }

    if (directLink) {
        directLink.href = uri;
    }

    showToast(`QR Code updated for ₹${amount}!`);
}

/**
 * Copy UPI ID to Clipboard
 */
function initCopyUPI() {
    const copyBtn = document.getElementById('btn-copy-upi');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(UPI_ID).then(() => {
            showToast('UPI ID (9390398034@axl) copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            showToast('UPI ID: 9390398034@axl');
        });
    });
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

/**
 * Auto Select Service in Form & Smooth Scroll
 */
function selectServiceInForm(serviceName) {
    const checkboxes = document.querySelectorAll('input[name="services"]');
    
    checkboxes.forEach(chk => {
        if (chk.value.includes(serviceName) || serviceName.includes(chk.value)) {
            chk.checked = true;
        }
    });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(`Selected "${serviceName}" in booking form!`);
}

/**
 * Handle WhatsApp Booking Form Submit
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const gender = document.getElementById('form-gender').value;
    const bookingDate = document.getElementById('form-date').value;
    const village = document.getElementById('form-village').value.trim();
    const details = document.getElementById('form-details').value.trim();

    // Get all checked services
    const checkedServices = [];
    document.querySelectorAll('input[name="services"]:checked').forEach(cb => {
        checkedServices.push(cb.value);
    });

    if (checkedServices.length === 0) {
        showToast('Please select at least one service!');
        return;
    }

    // Format WhatsApp Message
    let message = `💈 *NARAYANA HAIRCUTTING SHOP - EDLURUPADU* 💈\n`;
    message += `*NEW SERVICE BOOKING REQUEST*\n`;
    message += `-----------------------------------------\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📱 *Mobile Number:* ${phone}\n`;
    message += `🚻 *Gender:* ${gender}\n`;
    message += `📅 *Booking / Event Date:* ${bookingDate}\n`;
    message += `📍 *Village/Location:* ${village}\n\n`;
    message += `✂️ *Selected Services:* \n`;
    checkedServices.forEach(s => {
        message += `  • ${s}\n`;
    });

    if (details) {
        message += `\n📝 *Service Details / Notes:* \n${details}\n`;
    }
    message += `-----------------------------------------\n`;
    message += `Sent from Website • Location: EDLURUPADU`;

    // WhatsApp Owner Target: Venkat (9390398034)
    const targetPhone = "919390398034";
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

    showToast('Redirecting to WhatsApp to send your booking...');
    
    setTimeout(() => {
        window.open(waUrl, '_blank');
    }, 800);
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

/**
 * ScrollSpy Active Nav Link Highlight
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 3D Ambient Particle Background Canvas
 */
function initParticleCanvas() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 0.5,
            color: Math.random() > 0.4 ? 'rgba(245, 158, 11, ' : 'rgba(234, 88, 12, ',
            alpha: Math.random() * 0.5 + 0.1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Owner Full Photo Modal Lightbox Functions
 */
let currentModalOwnerKey = '';

function openOwnerPhotoModal(ownerKey, title, subtitle) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalSubcaption = document.getElementById('modal-subcaption');

    if (!modal || !modalImg) return;

    currentModalOwnerKey = ownerKey;
    const fullImgPath = `./assets/images/${ownerKey}_full.jpg`;
    
    // Set fallback handler
    modalImg.onerror = function() {
        const fullKey = `${ownerKey}_full`;
        if (window.EMBEDDED_IMAGES && window.EMBEDDED_IMAGES[fullKey]) {
            this.src = window.EMBEDDED_IMAGES[fullKey];
        } else if (window.EMBEDDED_IMAGES && window.EMBEDDED_IMAGES[ownerKey]) {
            this.src = window.EMBEDDED_IMAGES[ownerKey];
        }
    };

    modalImg.src = fullImgPath;
    modalCaption.innerText = title;
    modalSubcaption.innerText = subtitle;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleModalBackdropClick(event) {
    if (event.target.id === 'image-modal') {
        closeImageModal();
    }
}

// Press ESC to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});
