let array = []

document.addEventListener('mousemove', function (e) {
    let body = document.querySelector('body')
    let circle = document.getElementById('ryba')


    let left = e.clientX;
    let top = e.clientY;

    if (e.clientX - 60 + "px" < circle.style.left) {
        circle.classList.remove("rotate");
    } else {
        circle.classList.add("rotate");
    }

    circle.style.left = left - 60 + 'px';
    circle.style.top = top - 50 + 'px';

    Ryba.checkForJedzenie(array);
});

class Ryba {
    ryba

    constructor(element, imageSrc) {
        this.ryba = document.getElementById(element)
        this.image = imageSrc
        let image = new Image()
        image.src = imageSrc;
        image.classList.add('ryba');
        image.id = 'ryba'

        document.querySelector('body').appendChild(image)
        // document.getElementById(element).outerHTML = `<img src="${imageSrc}" alt="ryba" class="ryba" id="ryba">`
    }

    static checkForJedzenie(array) {
        const ryba = document.getElementById('ryba')
        console.log(ryba)
        array.forEach(e => {
            console.log([e.offsetX, ryba.offsetX])
            if (e.offsetX - 20 < ryba.offsetX && e.offsetX + 20 > ryba.offsetX) {
                console.log("jestes blisko zarcia")
            }
        })
    }
}

new Ryba('ryba', 'ryba.png')

// new Ryba('ryba', 'https://png.clipart.me/previews/4fe/fish-outline-clip-art-43153.jpg')


class Snack {
    constructor(size) {
        let x = randomBetween(1, 100)
        let y = randomBetween(1, 100)
        // console.log(`X: ${x}, Y: ${y}, SIZE: ${size}`)
        this.spawnSnack(x, y, size)
    }

    spawnSnack(X, Y, size) {
        let image = new Image()
        image.src = 'https://cdn.shopify.com/s/files/1/2555/1168/files/information-worm_2048x.png?v=1632120158'
        image.style.top = `${X}vh`;
        image.style.position = 'absolute';
        image.style.left = `${Y}vw`;
        image.style.width = "auto";
        image.style.height = `${size}vh`;
        image.id = `${Date.now()}`;
        document.querySelector('body').appendChild(image)
        array.push(image);
    }
}

setInterval(function () {
    new Snack(randomBetween(5, 10))
}, 5000)


function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}