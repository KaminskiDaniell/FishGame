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
});

class Ryba {
    ryba

    constructor(element, imageSrc) {
        this.ryba = document.getElementById(element)
        this.image = imageSrc
        document.getElementById(element).outerHTML = `<img src="${imageSrc}" alt="ryba" class="ryba" id="ryba">`
    }
}

new Ryba('ryba', 'ryba.png')

// new Ryba('ryba', 'https://png.clipart.me/previews/4fe/fish-outline-clip-art-43153.jpg')


class Snack {
    snack

    constructor(size) {
        this.size = size

        let x = randomBetween(1, 100)
        let y = randomBetween(1, 100)
        console.log(`X: ${x}, Y: ${y}, SIZE: ${size}`)
        this.spawnSnack(x, y)
    }

    spawnSnack(X, Y) {
        let image = new Image()
        image.src = 'https://cdn.shopify.com/s/files/1/2555/1168/files/information-worm_2048x.png?v=1632120158'
        image.style.top = `${X}vh`
        image.style.position = 'absolute';
        image.style.left = `${Y}vw`
        document.querySelector('body').appendChild(image)

    }
}

setInterval(function () {
    new Snack(randomBetween(1, 10))
}, 5000)
new Snack(10);


function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}