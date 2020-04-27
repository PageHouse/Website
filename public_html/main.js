class Hero {

    constructor(container) {
        this.container = container;
        this.total_count = 33;
        this.loaded_count = 0;
        this.active = null;
        this.loadImage();
        this.nextImage();
        setInterval(() => this.loadImage(), 1000);
        setInterval(() => this.nextImage(), 5000);
    }

    loadImage() {

        function zero_pad(num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s; 
        }

        if (this.total_count >= this.hero_image_count - 1) return; 
        this.loaded_count += 1;
        let img = document.createElement("img");
        img.src = "media/hero/" + zero_pad(this.loaded_count, 4) + ".jpg";
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