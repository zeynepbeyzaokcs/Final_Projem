gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// 1. Bisikletin Yolda İlerlemesi
gsap.to("#bisiklet", {
    scrollTrigger: {
        trigger: ".main-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    },
    motionPath: {
        path: "#bisiklet-yolu",
        align: "#bisiklet-yolu",
        alignOrigin: [0.5, 0.5],
        autoRotate: true 
    },
    ease: "none"
});

// 2. Arka Plan Renk Geçişleri
const renkler = ["#e0e3ee", "#9ab1d2", "#2a4ea9", "#3daa2c", "#e6b01c"];

gsap.utils.toArray(".bolum").forEach((bolum, i) => {
    ScrollTrigger.create({
        trigger: bolum,
        start: "top center",
        // duration: 2 ile süreyi uzattık, ease: "power2.inOut" ile geçişi pürüzsüzleştirdik
        onEnter: () => gsap.to("#arkaplan-renk", {backgroundColor: renkler[i], duration: 2, ease: "power2.inOut"}),
        onEnterBack: () => gsap.to("#arkaplan-renk", {backgroundColor: renkler[i], duration: 2, ease: "power2.inOut"})
    });
});

gsap.utils.toArray(".bolum").forEach((bolum, i) => {
    ScrollTrigger.create({
        trigger: bolum,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to("#arkaplan-renk", {backgroundColor: renkler[i], duration: 1}),
        onEnterBack: () => gsap.to("#arkaplan-renk", {backgroundColor: renkler[i], duration: 1})
    });
});

// 3. Çoklu Modal (Açılır Pencere) Yönetimi
document.addEventListener("DOMContentLoaded", () => {
    
    const arkaplanDiv = document.getElementById("arkaplan-renk");

    // Modal açma fonksiyonu
    function modalAyarla(btnId, modalId, kutuId, kapatId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const kapatBtn = document.getElementById(kapatId);
        const modalKutu = document.getElementById(kutuId);

        // Güvenlik kontrolü: Eğer elementlerden biri eksikse hata vermemesi için
        if(btn && modal && kapatBtn && modalKutu) {
            btn.addEventListener("click", () => {
                // Arka plan rengine dinamik uyum sağlama
                const guncelRenk = window.getComputedStyle(arkaplanDiv).backgroundColor;
                modalKutu.style.backgroundColor = guncelRenk;

                const rgb = guncelRenk.match(/\d+/g);
                if(rgb) {
                    const brightness = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
                    modalKutu.style.color = (brightness > 125) ? "#2f3640" : "#ffffff";
                }
                modal.style.display = "flex";
            });

            kapatBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });

            window.addEventListener("click", (e) => {
                if (e.target === modal) {
                    modal.style.display = "none";
                }
            });
        }
    }

    // Modal Tetikleyicileri
    modalAyarla("egitim-btn", "akademi-modal", "modal-kutu-akademi", "modal-kapat-akademi");
    modalAyarla("atolye-btn", "atolye-modal", "modal-kutu-atolye", "modal-kapat-atolye");
    modalAyarla("oyun-btn", "oyun-modal", "modal-kutu-oyun", "modal-kapat-oyun");
    
    // YENİ EKLEDİĞİMİZ HOBİ TETİKLEYİCİSİ (Tam olarak burada olmalı)
    modalAyarla("hobi-btn", "hobi-modal", "modal-kutu-hobi", "modal-kapat-hobi");
    // Yeni eklediğimiz Hedefler butonunun tetikleyicisi
    modalAyarla("hedef-btn", "hedef-modal", "modal-kutu-hedef", "modal-kapat-hedef");

    // Oynatılan videoları kapatma kontrolü
    const oyunKapatBtn = document.getElementById("modal-kapat-oyun");
    const oyunModal = document.getElementById("oyun-modal");

    if (oyunKapatBtn && oyunModal) {
        const videolariDurdur = () => {
            const videolar = oyunModal.querySelectorAll("video");
            videolar.forEach(video => {
                if (!video.paused) {
                    video.pause();
                }
            });
        };

        oyunKapatBtn.addEventListener("click", videolariDurdur);
        window.addEventListener("click", (e) => {
            if (e.target === oyunModal) {
                videolariDurdur();
            }
        });
    }
});