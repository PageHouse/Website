/**
 * The Hero class manages an image slideshow
 */
class Hero {

    constructor(container) {
        this.container = container;
        this.total_count = 25;
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
        this.loaded_count += 1;
        let img = document.createElement("img");
        img.src = "https://pagehouse.github.io/media/hero/" + zero_pad(this.loaded_count, 4) + ".jpg";
        this.container.appendChild(img);
    }

    nextImage() {
        if (this.active !== null) this.active.classList.remove("active");
        if (this.active === null || this.active.nextElementSibling === null) {
            this.active = this.container.firstChild;
        } else {
            this.active = this.active.nextElementSibling;
        }
        this.active.classList.add("active");
    }

}

(function() {
    let hero_container = document.getElementById('hero');
    let hero = new Hero(hero_container);
})()