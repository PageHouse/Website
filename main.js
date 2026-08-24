/**
 * Mobile burger nav — only does anything on narrow screens.
 * Uses a hardcoded link list so every page gets identical nav.
 */
(function () {
    const nav = document.getElementById('nav');
    if (!nav) return;

    const NAV_LINKS = [
        { href: 'index.html',  label: 'Page'   },
        { href: 'bylaws.html', label: 'Bylaws' },
        { href: 'about.html',  label: 'About'  },
        { href: 'events.html', label: 'Events' },
        { href: 'donate.html', label: 'Donate' },
    ];

    const currentFile = window.location.pathname.split('/').pop() || 'index.html';

    const burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.setAttribute('aria-label', 'Toggle navigation');
    burger.setAttribute('aria-expanded', 'false');
    const icon = document.createElement('span');
    icon.className = 'nav-burger-icon';
    burger.appendChild(icon);

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav-mobile-menu';

    NAV_LINKS.forEach(function (item) {
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        if (item.href === currentFile) a.classList.add('active');
        mobileMenu.appendChild(a);
    });

    nav.insertBefore(burger, nav.firstChild);

    // Add Instagram icon as a proper flex item on the right
    const igLink = document.createElement('a');
    igLink.className = 'nav-instagram nav-instagram-mobile';
    igLink.href = 'https://www.instagram.com/whose.house/';
    igLink.target = '_blank';
    igLink.setAttribute('aria-label', 'Page House Instagram');
    igLink.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="ig-rg-m" cx="30%" cy="107%" r="150%"><stop offset="0%" stop-color="#fdf497"/><stop offset="5%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><path fill="url(#ig-rg-m)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>';
    nav.appendChild(igLink);

    // Attach menu to body so it can't be clipped by overflow:hidden parents
    // Position it directly below the nav wrapper using JS
    document.body.appendChild(mobileMenu);

    function positionMenu() {
        const navWrapper = nav.closest('.hero-overlay') || nav.parentElement;
        const rect = navWrapper.getBoundingClientRect();
        mobileMenu.style.top = (rect.bottom + window.scrollY) + 'px';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
        positionMenu();
        mobileMenu.classList.add('open');
        burger.classList.add('open');
        burger.setAttribute('aria-expanded', 'true');
    }

    window.addEventListener('resize', function () {
        if (mobileMenu.classList.contains('open')) positionMenu();
    });

    burger.addEventListener('click', function () {
        mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileMenu.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') closeMenu();
    });
})();

/**
 * The Hero class manages an image slideshow
 */
class Hero {

    constructor(container) {
        this.container = container;
        this.total_count = 15;
        this.loaded_count = 0;
        this.active = null;
        this.loadImage();
        this.nextImage();
        setInterval(() => this.loadImage(), 1000);
        setInterval(() => this.nextImage(), 5000);
    }

    loadImage() {
        let zero_pad = num => `0000${num}`.slice(-4);
        if (this.loaded_count >= this.total_count - 1) return; 
        let img = document.createElement("img");
        img.src = "https://pagehouse.github.io/media/new_hero/" + zero_pad(this.loaded_count, 4) + ".jpg";
        this.loaded_count += 1;
        this.container.appendChild(img);
    }

    nextImage() {
        const prev = this.active;
        if (this.active === null || this.active.nextElementSibling === null) {
            this.active = this.container.firstChild;
        } else {
            this.active = this.active.nextElementSibling;
        }
        this.active.classList.add("active");
        if (prev && prev !== this.active) {
            prev.classList.add("leaving");
            setTimeout(() => prev.classList.remove("active", "leaving"), 1200);
        }
    }

}


(function() {
    let hero_container = document.getElementById('hero');
    if (!hero_container) return;
    let hero = new Hero(hero_container);

    // Executive Committee Slideshow
    const excommMembers = [
        {
            name: 'Jason "JT" Tran',
            role: 'President',
            email: 'jhtran@',
            img: 'https://pagehouse.github.io/media/people/2026_JT.jpg'
        },
        {
            name: 'Lucas Smith',
            role: 'Vice President',
            email: 'lsmith2@',
            img: 'https://pagehouse.github.io/media/people/2026_Lucas_Smith.jpg'
        },
        {
            name: 'Katelyn Sadorf',
            role: 'Secretary',
            email: 'ksadorf@',
            img: 'https://pagehouse.github.io/media/people/2026_Katelyn_Sadorf.jpg'
        },
        {
            name: 'Aiden Di Carlo',
            role: 'Treasurer',
            email: 'adicarlo@',
            img: 'https://pagehouse.github.io/media/people/Aiden_Di_Carlo.jpg'
        },
        {
            name: 'Zoe Chou',
            role: 'Athletics Manager',
            email: 'zchou@',
            img: 'https://pagehouse.github.io/media/people/2026_Zoe_Chou.jpg'
        }
    ];


    const slideshow = document.getElementById('excomm-slideshow');
    if (slideshow) {
        let currentIdx = 0;
        const dotsDiv = slideshow.querySelector('.excomm-dots');
        const prevBtn = slideshow.querySelector('.excomm-prev');
        const nextBtn = slideshow.querySelector('.excomm-next');

        // Container for crossfading slide cards
        const slidesWrap = document.createElement('div');
        slidesWrap.className = 'excomm-slides-wrap';
        slideshow.insertBefore(slidesWrap, prevBtn);

        // Build one card element per member, stacked absolutely for crossfade
        const slideEls = excommMembers.map((m, i) => {
            const card = document.createElement('div');
            card.className = 'excomm-slide' + (i === 0 ? ' active' : '');

            const photoWrap = document.createElement('div');
            photoWrap.className = 'excomm-photo-wrap';
            const img = document.createElement('img');
            img.className = 'excomm-photo';
            img.src = m.img;
            img.alt = m.name;
            photoWrap.appendChild(img);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'excomm-info';
            infoDiv.innerHTML = `
                <p class="excomm-name">${m.name}</p>
                <p class="excomm-role">${m.role}</p>
                <a class="excomm-email" href="mailto:${m.email}">${m.email}</a>
            `;

            card.appendChild(photoWrap);
            card.appendChild(infoDiv);
            slidesWrap.appendChild(card);
            return card;
        });

        // Build fused segment bar (replaces both dots and timer bar)
        const segBar = document.createElement('div');
        segBar.className = 'excomm-seg-bar';
        const segments = excommMembers.map((_, i) => {
            const seg = document.createElement('button');
            seg.className = 'excomm-seg';
            seg.setAttribute('aria-label', `Go to slide ${i + 1}`);
            const fill = document.createElement('div');
            fill.className = 'excomm-seg-fill';
            seg.appendChild(fill);
            seg.addEventListener('click', () => { isHovered = slideshow.matches(':hover'); goTo(i); });
            segBar.appendChild(seg);
            return { seg, fill };
        });
        dotsDiv.replaceWith(segBar);

        const SLIDE_DURATION = 4000;
        let autoTimer = null;
        let rafId = null;
        let startTime = null;
        let isHovered = false;

        function updateSegments(pct) {
            segments.forEach(({ fill }, i) => {
                if (i < currentIdx)        fill.style.width = '100%';
                else if (i === currentIdx) fill.style.width = pct + '%';
                else                       fill.style.width = '0%';
            });
        }

        function startTimer() {
            clearTimeout(autoTimer);
            cancelAnimationFrame(rafId);
            if (isHovered) return;
            startTime = performance.now();
            function tick(now) {
                const pct = Math.min(100, (now - startTime) / SLIDE_DURATION * 100);
                updateSegments(pct);
                if (pct < 100) rafId = requestAnimationFrame(tick);
            }
            rafId = requestAnimationFrame(tick);
            autoTimer = setTimeout(() => goTo(currentIdx + 1), SLIDE_DURATION);
        }

        // Track any pending cleanup timeouts so quick clicks don't remove active slides
        const pendingCleanup = new Map();

        function goTo(idx) {
            const prev = slideEls[currentIdx];
            currentIdx = (idx + excommMembers.length) % excommMembers.length;
            const next = slideEls[currentIdx];

            // Cancel any pending removal on the incoming slide
            if (pendingCleanup.has(next)) {
                clearTimeout(pendingCleanup.get(next));
                pendingCleanup.delete(next);
                next.classList.remove('leaving');
            }

            next.classList.add('active');

            if (prev !== next) {
                // Cancel any pending removal on prev too (in case of rapid clicking)
                if (pendingCleanup.has(prev)) {
                    clearTimeout(pendingCleanup.get(prev));
                }
                prev.classList.add('leaving');
                const t = setTimeout(() => {
                    prev.classList.remove('active', 'leaving');
                    pendingCleanup.delete(prev);
                }, 1200);
                pendingCleanup.set(prev, t);
            }

            updateSegments(0);
            startTimer();
        }

        prevBtn.addEventListener('click', () => { isHovered = slideshow.matches(':hover'); goTo(currentIdx - 1); });
        nextBtn.addEventListener('click', () => { isHovered = slideshow.matches(':hover'); goTo(currentIdx + 1); });

        slideshow.addEventListener('mouseenter', () => {
            isHovered = true;
            clearTimeout(autoTimer);
            cancelAnimationFrame(rafId);
        });
        slideshow.addEventListener('mouseleave', () => {
            isHovered = false;
            const currentPct = parseFloat(segments[currentIdx].fill.style.width || '0');
            const elapsed = currentPct / 100 * SLIDE_DURATION;
            startTime = performance.now() - elapsed;
            function tick(now) {
                const pct = Math.min(100, (now - startTime) / SLIDE_DURATION * 100);
                updateSegments(pct);
                if (pct < 100) rafId = requestAnimationFrame(tick);
            }
            rafId = requestAnimationFrame(tick);
            autoTimer = setTimeout(() => goTo(currentIdx + 1), SLIDE_DURATION - elapsed);
        });

        goTo(0);
    }
})();

(function () {
    const slideshowWrap = document.querySelector('.events-slideshow-wrap');
    if (!slideshowWrap) return;
    const slideshow = document.getElementById('events-slideshow');
    const slides = Array.from(slideshow.querySelectorAll('.event-slide'));
    const segBarWrap = document.getElementById('events-seg-bar-wrap');
    const prevBtn = document.getElementById('events-prev');
    const nextBtn = document.getElementById('events-next');
    let current = 0;

    const SLIDE_DURATION = 5000;
    let autoTimer = null;
    let rafId = null;
    let startTime = null;
    let isHovered = false;

    const segBar = document.createElement('div');
    segBar.className = 'events-seg-bar';
    const segments = slides.map((_, i) => {
        const seg = document.createElement('button');
        seg.className = 'events-seg';
        seg.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        const fill = document.createElement('div');
        fill.className = 'events-seg-fill';
        seg.appendChild(fill);
        seg.addEventListener('click', () => { isHovered = false; goTo(i); });
        segBar.appendChild(seg);
        return { seg, fill };
    });
    segBarWrap.appendChild(segBar);

    function updateSegments(pct) {
        segments.forEach(({ fill }, i) => {
            if (i < current)        fill.style.width = '100%';
            else if (i === current) fill.style.width = pct + '%';
            else                    fill.style.width = '0%';
        });
    }

    function startTimer() {
        clearTimeout(autoTimer);
        cancelAnimationFrame(rafId);
        if (isHovered) return;
        startTime = performance.now();
        function tick(now) {
            const pct = Math.min(100, (now - startTime) / SLIDE_DURATION * 100);
            updateSegments(pct);
            if (pct < 100) rafId = requestAnimationFrame(tick);
        }
        rafId = requestAnimationFrame(tick);
        autoTimer = setTimeout(() => goTo(current + 1), SLIDE_DURATION);
    }

    function goTo(idx) {
        const prev = slides[current];
        const prevBody = prev.querySelector('.event-desc-body');
        const prevTrigger = prev.querySelector('.event-desc-trigger');
        if (prevBody && prevBody.classList.contains('open')) {
            prevBody.classList.remove('open');
            prevTrigger.classList.remove('open');
            prevTrigger.querySelector('span:first-child').textContent = 'Details';
            isHovered = false;
        }
        current = (idx + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (prev !== slides[current]) {
            prev.classList.add('leaving');
            setTimeout(() => prev.classList.remove('active', 'leaving'), 1200);
        }
        updateSegments(0);
        startTimer();
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    slides.forEach(slide => {
        const trigger = slide.querySelector('.event-desc-trigger');
        const body = slide.querySelector('.event-desc-body');
        const label = trigger.querySelector('span:first-child');
        trigger.addEventListener('click', () => {
            const isOpen = body.classList.toggle('open');
            trigger.classList.toggle('open', isOpen);
            label.textContent = isOpen ? 'Close' : 'Details';
            if (isOpen) {
                isHovered = true;
                clearTimeout(autoTimer);
                cancelAnimationFrame(rafId);
            } else {
                isHovered = false;
                const currentPct = parseFloat(segments[current].fill.style.width || '0');
                const elapsed = currentPct / 100 * SLIDE_DURATION;
                startTime = performance.now() - elapsed;
                function tick(now) {
                    const pct = Math.min(100, (now - startTime) / SLIDE_DURATION * 100);
                    updateSegments(pct);
                    if (pct < 100) rafId = requestAnimationFrame(tick);
                }
                rafId = requestAnimationFrame(tick);
                autoTimer = setTimeout(() => goTo(current + 1), SLIDE_DURATION - elapsed);
            }
        });
    });

    goTo(0);

    const scrollList = document.getElementById('events-scroll-list');
    if (scrollList) {
        slides.forEach(slide => {
            const img = slide.querySelector('.event-slide-img');
            const title = slide.querySelector('.event-slide-title-bar h2');
            const body = slide.querySelector('.event-desc-body p');

            const card = document.createElement('div');
            card.className = 'events-scroll-card';

            const cardImg = document.createElement('img');
            cardImg.className = 'events-scroll-img';
            cardImg.src = img.src;
            cardImg.alt = img.alt;

            const cardText = document.createElement('div');
            cardText.className = 'events-scroll-text';

            const cardTitle = document.createElement('h2');
            cardTitle.textContent = title.textContent;

            const cardDesc = document.createElement('p');
            cardDesc.textContent = body.textContent;

            cardText.appendChild(cardTitle);
            cardText.appendChild(cardDesc);
            card.appendChild(cardImg);
            card.appendChild(cardText);
            scrollList.appendChild(card);
        });
    }
})();