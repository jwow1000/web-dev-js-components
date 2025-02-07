// Import the data map object
import { dataMap } from "./assets/data.js";

class CompensationGame {
  constructor() {
    this.game = document.querySelector('#game');
    this.title = document.querySelector('#title');
    this.choiceContainer = document.querySelector('#choice-container');
    this.loadMessage = document.querySelector('.load-screen');
    this.fadeTime = 1000;
    this.currentScene = dataMap.start;

    this.init();
  }

  init() {
    // // Set up load screen listener
    // this.loadMessage.addEventListener('click', () => {
    //   this.loadMessage.style.opacity = 0;
    //   this.loadMessage.style.pointerEvents = 'none';
    // });

    // Start the game
    this.clearScene();
    setTimeout(() => this.renderScene(), this.fadeTime);
  }

  async clearScene() {
    const buttons = this.choiceContainer.querySelectorAll('.wrap-button');
    const fadeOut = buttons.length > 0
      ? Promise.all(
          Array.from(buttons).map(button => {
            button.style.filter = 'blur(5px)';
            button.style.opacity = '0';
            return new Promise(resolve => setTimeout(resolve, this.fadeTime));
          })
        )
      : Promise.resolve();

    await fadeOut;
    this.choiceContainer.innerHTML = '';
  }

  async transitionToScene(nextSceneKey) {
    await this.clearScene();
    this.currentScene = dataMap[nextSceneKey];
    await this.renderScene();
  }

  createChoiceButton(choice) {
    const buttonWrap = document.createElement('div');
    const button = document.createElement('div');
    
    buttonWrap.className = 'wrap-button';
    button.className = 'buttons';
    button.textContent = choice.label;

    // Set up transitions
    buttonWrap.style.transition = `
      filter ${this.fadeTime}ms ease-in-out,
      opacity ${this.fadeTime}ms ease-in-out
    `;
    buttonWrap.style.filter = 'blur(5px)';
    buttonWrap.style.opacity = '0';

    // Add click handler
    buttonWrap.addEventListener('click', () => {
      this.transitionToScene(choice.link);
    });

    buttonWrap.appendChild(button);
    return buttonWrap;
  }

  async renderScene() {
    // Update title
    this.title.textContent = this.currentScene.label;

    // Create and add choice buttons
    const buttons = this.currentScene.choices.map(choice => 
      this.createChoiceButton(choice)
    );

    buttons.forEach(button => {
      this.choiceContainer.appendChild(button);
      // Trigger reflow to ensure transition works
      button.offsetHeight;
      button.style.filter = 'blur(0px)';
      button.style.opacity = '1';
    });
  }
}

// Initialize the game
const game = new CompensationGame();