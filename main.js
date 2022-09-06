document.addEventListener('mousemove', function (e) {

    const ImageOffsetX = - 60;
    const ImageOffsetY = - 50;

    const ryba = document.getElementById('ryba');

    if (`${e.clientX + ImageOffsetX}px` < ryba.style.left) {
        ryba.classList.remove('rotate');
    } else {
        ryba.classList.add('rotate');
    }

    ryba.style.left = `${e.clientX + ImageOffsetX}px`;
    ryba.style.top = `${e.clientY + ImageOffsetY}px`;
});

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


class Snack {
    constructor(size) {
        let x = randomBetween(1, 100);
        let y = randomBetween(1, 100);
        return this.spawnSnack(x, y, size);
    }

    spawnSnack(X, Y, size) {
        let image = new Image();
        image.src =
            'https://cdn.shopify.com/s/files/1/2555/1168/files/information-worm_2048x.png?v=1632120158';
        image.style.top = `${X}vh`;
        image.style.position = 'absolute';
        image.style.left = `${Y}vw`;
        image.style.width = 'auto';
        image.style.height = `${size}vh`;
        image.id = `${Date.now()}`;
        document.querySelector('body').appendChild(image);
        return image;
    }
}


class Ryba {


    constructor(element, imageSrc) {
        this.ryba = document.getElementById(element);
        this.food = [];
        this.createFish(imageSrc)
        this.foodThread();
        this.eatThread();
    }

    createFish(imageSrc) {
        let image = new Image();
        image.src = imageSrc;
        image.classList.add('ryba');
        image.id = 'ryba';
        document.querySelector('body').appendChild(image);
    }

    foodThread() {
        this.createFood()
        setTimeout(() => {
            this.foodThread();
        }, 5000);
    }

    createFood() {
        this.food.push(new Snack(randomBetween(5, 10)));
        console.log(this.food);
    }

    eatThread() {
        const range = 100;
        const ImageOffsetX = - 60;
        const ImageOffsetY = - 50;
        this.food.forEach(element => {
            const ryba = document.getElementById('ryba');
            let rybaLeft = parseInt(ryba.style.left)
            let rybaTop = parseInt(ryba.style.top)

            console.log([rybaLeft, element.offsetLeft]);
            if (rybaLeft + ImageOffsetX + range > element.offsetLeft && rybaLeft + ImageOffsetX - range < element.offsetLeft) {
                if (rybaTop + ImageOffsetY + range > element.offsetTop && rybaTop + ImageOffsetY - range < element.offsetTop) {
                    console.log('eat');
                    this.eat(element);
                }
            }

        });
        setTimeout(() => {
            this.eatThread();
        }, 500);
    }

    eat(element) {
        element.remove();
    }


}






new Ryba('ryba', 'ryba.png');