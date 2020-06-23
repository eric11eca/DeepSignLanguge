/* jshint esversion: 6 */

import {KNNImageClassifier} from 'deeplearn-knn-image-classifier';
import * as dl from 'deeplearn';

const IMAGE_SIZE = 227;
const TOPK = 10;
const THRESHOLD = 0.98;

var words = ["alexa", "hello", "other"];
var endWords = ["hello"];

class LaunchModal {
    constructor() {
        this.modalWindow = document.getElementById('launchModal');
        this.closeBtn = document.getElementById('close-modal');

        this.closeBtn.addEventListener('click', (e) => {
            this.modalWindow.style.display = "none";
        });

        window.addEventListener('click', (e) => {
            if (e.target == this.modalWindow) {
                this.modalWindow.style.display = "none";
            }
        });

        this.modalWindow.style.display = "block";
        this.modalWindow.style.zIndex = 500;
    }
}

class Main {
    constructor() {
        this.infoTexts = [];
        this.traininf = -1;
        this.videoPlaying = false;

        this.previousPrediction = -1;
        this.currentPredictedWords = [];

        //this.now;
        this.then = Date.now();
        this.startTime = this.then;
        this.fps = 5;
        this.fpsInterval = 1000/(this.fps);
        this.elapsed = 0;

        this.trainingListDiv = document.getElementById("training-list");
        this.exampleListDiv = document.getElementById("example-list");

        this.textLine = document.getElementById("text");

        this.video = document.getElementById("video");
        this.addWordForm = document.getElementById("add-word");
        this.statusText = document.getElementById("status-text");

        this.video.addEventListener('mousedown', () => {
            // click on video to go back to training buttons
             main.pausePredicting();
            this.trainingListDiv.style.display = "block";
        });

        this.addWordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let word = document.getElementById("new-word").value.trim().toLowerCase();
            let checkbox = document.getElementById("is-terminal-word");

            if(word && !words.includes(word)) {
                //insert at penultimate index in array
                words.splice(words.length-1,0,word);
                this.createButtonList(false);
                this.updateExampleCount();
                if (checkbox.checked) {
                    endWords.push(word);
                }
    
                document.getElementById("new-word").value = '';
                checkbox.checked = false;
            } else {
                alert("Duplicate word or no word entered");
            }
            return;          
        });

        let modal = new LaunchModal();
        this.updateExampleCount();
        document.getElementById("status").style.display = "none";
        this.createTrainingBtn();
        this.createButtonList(false);
        // load text to speech
        this.tts = new TextToSpeech();
    }

    createPredictBtn() {
        var div = document.getElementById("action-btn");
        div.innerHTML = "";
        const predButton = document.getElementById('button');

        predButton.innerText = "Start Predicting >>>";
        div.appendChild(predButton);
        
        predButton.addEventListener('mousedown', () => {
            console.log("start predicting");
            const exampleCount = this.knn.getClassExampleCount();

        });
    }
}
