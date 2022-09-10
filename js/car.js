const cars = ['dieselina', 'manuela'];

const randomBetween = (min, max) =>{
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Car danger
 */
class Car {
  /**
   *
   * @param {number} size car size
   * @return {HTMLElement} car
   */
  constructor(size) {
    const x = randomBetween(1, 100);
    const y = randomBetween(1, 100);
    this.car = this.spawnCar(x, y, size);
    this.moveThread();
    return this.car;
  }

  /**
   *
   * @param {number} X x pos
   * @param {number} Y y pos
   * @param {number} size car size
   * @return {HTMLElement} car object
   */
  spawnCar(X, Y, size) {
    const image = new Image();


    const randomCar = cars[randomBetween(0, cars.length)];
    image.src = `img/danger/cars/${randomCar}.png`;
    image.classList.add(randomCar);


    image.style.top = `${X}vh`;
    image.style.position = 'absolute';
    Y = 1;
    image.style.left = `${Y}vw`;
    image.style.width = 'auto';
    image.style.height = `${size}vh`;
    image.style.transition = 'all 0.5s';
    image.id = `${Date.now()}`;
    document.querySelector('body').appendChild(image);
    return image;
  }

  /**
   * Function responsible for car movement
   */
  moveThread() {
    this.move();
    setTimeout(() => {
      this.moveThread();
    }, 50);
  }

  /**
   * Function responsible for car move
   */
  move() {
    const top = randomBetween(-1, 2);
    this.car.style.top = `${parseInt(this.car.style.top) + top}vh`;
    this.car.style.left = `${parseInt(this.car.style.left) + 1}vw`;
  }
}


export default Car;
