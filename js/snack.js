const snacks = ['bulka', 'cola', 'onion', 'perła', '1zc'];

const randomBetween = (min, max) =>{
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * This function will play sound from given link
 * @param {number} size size of snack
 */
class Snack {
  /**
   *
   * @param {number} size size of snack
   * @return  {HTMLElement} snack object
   */
  constructor(size) {
    const x = randomBetween(1, 100);
    const y = randomBetween(1, 100);
    this.snack = this.spawnSnack(x, y, size);
    this.moveThread();
    return this.snack;
  }

  /**
   *
   * @param {number} X
   * @param {number} Y
   * @param {number} size
   * @return {HTMLElement} snack object
   */
  spawnSnack(X, Y, size) {
    const image = new Image();


    const randomSnack = snacks[randomBetween(0, snacks.length)];
    image.src = `img/food/${randomSnack}.png`;
    image.classList.add(randomSnack);

    // image.src =
    //     'https://www.pngall.com/wp-content/uploads/2016/03/Onion-Transparent.png';
    X = 1; // TODO do wyjebanias
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

  /**
   * this function is doing move every given ms
   */
  moveThread() {
    this.move();
    setTimeout(() => {
      this.moveThread();
    }, 50);
  }

  /**
   * this function makes object move down and sideways
   */
  move() {
    this.snack.style.top = `${parseInt(this.snack.style.top) + 1}vh`;
    const side = randomBetween(-1, 2);
    this.snack.style.left = `${parseInt(this.snack.style.left) + side}vw`;
  }
}

export default Snack;
