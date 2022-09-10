const dangers = ['kaminski'];


const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * danger that resets users score to 0
 */
class Danger {
  /**
   *
   * @param {number} size danger size
   * @return {HTMLElement} danger object
   */
  constructor(size) {
    const x = randomBetween(1, 100);
    const y = randomBetween(1, 100);
    this.hook = this.spawnHook(x, y, size);
    this.moveThread();
    return this.hook;
  }

  /**
   *
   * @param {number} X x pos
   * @param {*} Y y pos
   * @param {*} size danger size
   * @return {HTMLElement} danger object
   */
  spawnHook(X, Y, size) {
    const image = new Image();

    const randomSnack = dangers[randomBetween(0, dangers.length)];
    image.src = `img/danger/${randomSnack}.png`;

    image.classList.add(randomSnack);

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
   * Danger movement function
   */
  moveThread() {
    this.move();
    setTimeout(() => {
      this.moveThread();
    }, 50);
  }

  /**
   * Danger move function
   */
  move() {
    this.hook.style.top = `${parseInt(this.hook.style.top) + 1}vh`;
  }
}

export default Danger;
