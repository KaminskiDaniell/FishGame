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

    // updateRotation(e.clientX, e.clientY);

});

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// const getVectorAngle = ([x1, y1], [x2, y2]) =>  {
//     const x = x2 - x1
//     const y = y2 - y1
//     return (((Math.acos(y / Math.sqrt(x * x + y * y)) * (Math.sign(x) || 1)) * 180 / Math.PI) + 360) % 360
// }


// const updateRotation = (clientx, clienty) => {
//     const ryba = document.getElementById('ryba');
//     const angle = getVectorAngle([ryba.offsetLeft, ryba.offsetTop], [clientx, clienty]);
//     ryba.style.transform = `rotate(${angle - 270}deg)`;
// }


class Snack {
    constructor(size) {
        let x = randomBetween(1, 100);
        let y = randomBetween(1, 100);
        this.snack = this.spawnSnack(x, y, size);
        this.moveThread();
        return this.snack;
    }

    spawnSnack(X, Y, size) {
        let image = new Image();
        image.src =
            'https://cdn.shopify.com/s/files/1/2555/1168/files/information-worm_2048x.png?v=1632120158';
        X = 1; //TODO do wyjebanias
        image.style.top = `${X}vh`;
        image.style.position = 'absolute';
        image.style.left = `${Y}vw`;
        image.style.width = 'auto';
        image.style.height = `${size}vh`;
        image.style.transition = 'all 0.5s';
        image.id = `${Date.now()}`;
        document.querySelector('body').appendChild(image);
        return image;
    }

    moveThread() {
        this.move()
        setTimeout(() => {
            this.moveThread();
        }, 50);
    }

    move() {
        this.snack.style.top = `${parseInt(this.snack.style.top) + 1}vh`;
        const side = randomBetween(-1, 2);
        this.snack.style.left = `${parseInt(this.snack.style.left) + side}vw`;
    }

}

class Hook {

    constructor(size) {
        let x = randomBetween(1, 100);
        let y = randomBetween(1, 100);
        this.hook = this.spawnHook(x, y, size);
        this.moveThread();
        return this.hook;
    }

    spawnHook(X, Y, size) {
        let image = new Image();
        image.src =
            'hak.png';
        X = 1; //TODO do wyjebanias
        image.style.top = `${X}vh`;
        image.style.position = 'absolute';
        image.style.left = `${Y}vw`;
        image.style.width = 'auto';
        image.style.height = `${size}vh`;
        image.style.transition = 'all 0.5s';
        image.classList.add("hook");
        image.id = `${Date.now()}`;
        document.querySelector('body').appendChild(image);
        return image;
    }

    moveThread() {
        this.move()
        setTimeout(() => {
            this.moveThread();
        }, 50);
    }

    move() {
        this.hook.style.top = `${parseInt(this.hook.style.top) + 1}vh`;
    }


}


class Ryba {


    constructor(element, imageSrc) {
        this.element = element
        this.food = [];
        this.createFish(imageSrc)
        this.foodThread();
        this.eatThread();
        this.sizeThread(this.getFish());
    }

    getFish() {
        return document.getElementById(this.element)
    }

    createFish(imageSrc) {
        let image = new Image();
        image.src = imageSrc;
        image.classList.add('ryba');
        image.id = 'ryba';
        document.querySelector('body').appendChild(image);
    }


    foodThread() {
        let random = randomBetween(1, 100);

        if (random > 80) {
            this.createDanger();
        }


        this.createFood()


        setTimeout(() => {
            this.foodThread();
        }, 1000);
    }


    createDanger() {
        this.food.push(new Hook(randomBetween(5, 10)))
    }

    createFood() {
        this.food.push(new Snack(randomBetween(5, 10)));
    }

    eatThread() {

        const range = 100;
        const ImageOffsetX = - 60;
        const ImageOffsetY = - 50;

        this.food.forEach(element => {
            const ryba = document.getElementById('ryba');

            const [rybaPosLeft, rybaPosTop] = [parseInt(ryba.style.left), parseInt(ryba.style.top)]

            if (rybaPosLeft + ImageOffsetX + range > element.offsetLeft && rybaPosLeft + ImageOffsetX - range < element.offsetLeft) {
                if (rybaPosTop + ImageOffsetY + range > element.offsetTop && rybaPosTop + ImageOffsetY - range < element.offsetTop) {
                    // console.log('eat');
                    this.eat(element);
                }
            }

        });
        setTimeout(() => {
            this.eatThread();
        }, 500);
    }

    eat(element) {
        if (element.classList.contains("hook")) {
            this.setScore(0)
        } else {
            this.addScore(1);
        }
        element.remove();
        
    }

    addScore(score) {
        document.getElementById('score').innerHTML = parseInt(document.getElementById('score').innerHTML) + score;
    }

    setScore(score) {
        document.getElementById('score').innerHTML = parseInt(score);
    }

    getScore() {
        return parseInt(document.getElementById('score').innerHTML)
    }

    sizeThread() {

        this.getFish().style.maxWidth = `${50 + this.getScore()}px`;

        setTimeout(() => {
            this.sizeThread();
        }, 100);
    }


}


new Ryba('ryba', 'ryba.png');


var objImage = null;

function init() {
    objImage = document.getElementById("ryba");
    objImage.style.position = "relative";
    objImage.style.left = "0px";
    objImage.style.top = "0px";
}

document.addEventListener("keydown", function (event) {
    getKey(event);
});

function getKey(e) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
        case 65: // a
            objImage.style.left = parseInt(objImage.style.left) - 5 + "px";
            break;
        case 87: // w
            objImage.style.top = parseInt(objImage.style.top) - 5 + "px";
            break;
        case 68: // d
            objImage.style.left = parseInt(objImage.style.left) + 5 + "px";
            break;
        case 83: // s
            objImage.style.top = parseInt(objImage.style.top) + 5 + "px";
            break;
    }
}

window.onload = init;