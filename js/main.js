// const snacks = ["bulka","cola","onion","perła", "1zc"];
const dangers = ['kaminski'];
const cars = ['dieselina', 'manuela'];
const currentAudio = [];


import Car from './car.js';
import Snack from './snack.js';
import Danger from './danger.js';

document.addEventListener('mousemove', function(e) {
  const ImageOffsetX = - 0;
  const ImageOffsetY = - 0;

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


/**
 * This function will play sound from given link
 * @param {string} url url to sound file
 */
function playSound(url) {
  if (!currentAudio.includes(url)) {
    const audio = document.createElement('audio');
    audio.style.display = 'none';
    audio.src = url;
    audio.autoplay = true;
    audio.volume = 0.5;
    audio.onended = function() {
      audio.remove(); // Remove when played.
      const index = currentAudio.indexOf(url);
      currentAudio.splice(index, 1);
    };
    document.body.appendChild(audio);
    currentAudio.push(url);
  }
}

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};


/**
 * this is fish object class that is following the mouse cursor
 */
class Ryba {
  /**
   *
   * @param {HTMLElement} element
   * @param {String} imageSrc
   */
  constructor(element, imageSrc) {
    this.lastLevelUp = 0;
    this.requiredScoreToLevelUp = 20;
    this.element = element;
    this.food = [];
    this.createFish(imageSrc);
    this.foodThread();
    this.eatThread();
    this.sizeThread(this.getFish());
  }

  /**
   *
   * @return {HTMLElement} this function will return fish element
    */
  getFish() {
    return document.getElementById(this.element);
  }

  /**
   *
   * @param {String} imageSrc image of the fish
   */
  createFish(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    image.classList.add('ryba');
    image.id = 'ryba';
    document.querySelector('body').appendChild(image);
  }

  /**
   * food movement thread
   */
  foodThread() {
    const random = randomBetween(1, 100);

    if (random > 80) {
      this.createDanger();
    }


    this.createFood();


    setTimeout(() => {
      this.foodThread();
    }, 1000);
  }

  /**
   * function responsible for creating danger
   */
  createDanger() {
    this.food.push(new Danger(randomBetween(5, 10)));

    const random = randomBetween(1, 100);

    if (random > 30) {
      this.food.push(new Car(randomBetween(5, 10)));
    }
  }

  /**
   * Snack creating function
   */
  createFood() {
    this.food.push(new Snack(randomBetween(5, 10)));
  }

  /**
   * function responsible for handling the colision with objects
   */
  eatThread() {
    const range = 100;
    const ImageOffsetX = - 60;
    const ImageOffsetY = - 50;

    this.food.forEach((element) => {
      const ryba = document.getElementById('ryba');

      const rybaPosLeft = parseInt(ryba.style.left);
      const rybaPosTop = parseInt(ryba.style.top);

      if (rybaPosLeft + ImageOffsetX + range > element.offsetLeft) {
        if (rybaPosLeft + ImageOffsetX - range < element.offsetLeft) {
          if (rybaPosTop + ImageOffsetY + range > element.offsetTop) {
            if (rybaPosTop + ImageOffsetY - range < element.offsetTop) {
              this.eat(element);
            }
          }
        }
      }
    });
    setTimeout(() => {
      this.eatThread();
    }, 500);
  }

  /**
   * function responsible for fish eating given object
   * @param {HTMLElement} element object to be eaten
   */
  eat(element) {
    let isDanger = false;


    const soundDict = {
      'kaminski': 'spierdalaj.mp3',
      'bulka': 'eat.mp3',
      'onion': 'eat.mp3',
      'perła': 'piwo.mp3',
      'cola': 'drink.mp3',
      'dieselina': 'honk.mp3',
      'manuela': 'honk.mp3',

    };

    dangers.forEach((danger) => {
      if (element.classList.contains(danger)) isDanger = true;
    });

    cars.forEach((danger) => {
      if (element.classList.contains(danger)) isDanger = true;
    });

    if (isDanger) {
      this.setScore(0);
    } else {
      this.addScore(1);
    }


    playSound(`sounds/${soundDict[element.className]}`);


    element.remove();
  }

  /**
   *
   * @param {number} score score to be added
   */
  addScore(score) {
    const scoreDiv = document.getElementById('score');
    this.setScore(parseInt(scoreDiv.innerHTML) + score);
  }

  /**
   *nextlevelscore
   * @param {number} score score to be set
   */
  setScore(score) {
    const nls = document.getElementById('nextlevelscore');
    document.getElementById('score').innerHTML = parseInt(score);
    nls.innerHTML = 20 - parseInt(score) % 20;
  }

  /**
   *
   * @return {Nunmber} score
   */
  getScore() {
    return parseInt(document.getElementById('score').innerHTML);
  }

  /**
   * function responsible for handling fish size
   */
  sizeThread() {
    if (this.getScore() >= this.lastLevelUp + this.requiredScoreToLevelUp) {
      this.lastLevelUp = this.getScore();
      this.getFish().style.maxWidth = `${50 + (this.getScore() / 10 * 20)}px`;
      playSound('sounds/levelup.mp3');
    }


    setTimeout(() => {
      this.sizeThread();
    }, 100);
  }
}


new Ryba('ryba', 'ryba.png');
