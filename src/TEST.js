const storyStages = {
    start: {
        text: "You find yourself in a mystical chamber. In front of you, there are three weapons: a bow and quiver, a  magical wand, and a sword and shield.",
        choices: ["Bow and Arrow", "Magical Wand", "Sword and Shield"],
        images: ["bow.jpg","wand.jpg","sword.jpg"],
        consequence: {
            "Bow and Arrow": "chooseDirection",
            "Magical Wand": "chooseDirection",
            "Sword and Shield": "chooseDirection"
        }
            },

    chooseDirection: {
         text: "Sufficiently armed, you begin your quest. You find youself at a crossroad, there are three paths you can choose to go left, right, or down the middle. The left path hails a firey blaze that gives you an uneasy feeling. The right path is lined with a beaten brick path that resembles a dungeon of a monster. The middle path appears the wost of them all, the path is coverd in belongings from past travlers and scatterd with huge bones.",
         choices: ["Left Path", "Middle Path", "Right Path"],
         images: ["left.jpg","middle.jpg", "right.jpg"],
         consequence: {
            "Left Path": "encounterDragon",
            "Middle Path": "encounterMiddle",
            "Right Path": "encounterMinotaur"
         }
        },


    encounterDragon: {
            text: "You encounter a mighty dragon! What will you do?",
            choices: ["Fight the Dragon", "Try and talk to the Dragon"],
            images: ["dragon.jpg"],
            consequence: {
                "Fight the Dragon": "dragonFightResult",
                "Try and talk to the Dragon": "barelySurviveD"
                }
            },
        encounterMinotaur: {
            text: "You encounter a fearsome minotaur! What will you do?",
            choices: ["Fight the Minotaur", "Try and talk to the Minotaur"],
            images: ["minotaur.jpg"],
            consequence: {
                "Fight the Minotaur": "minotaurFightResult",
                "Try and talk to the Minotaur": "barelySurviveM"
                }
            },
        encounterMiddle: {
            text: "The middle path leads to a dark forest. You hear ominous sounds. What will you do?",
            choices: ["explore the forest deeper", "return home"],
            images: ["forest.jpg"],
            consequence: {
                "explore the forest deeper": "encounterMonster",
                "return home": "leaveForest"
            }
        },



        dragonFightResult: {
            text: "You engage the dragon in combat with your chosen weapon. The battle is intense..., after a hard battle you defeat the dragon.",
            choices: ["Play Again!"],
            images: ["dragonFightResult.jpg"],
            consequence: {
                "Play Again!": "start"
                }
        },
        barelySurviveD: {
            text: "Silly adventure, dragons cant talk! You become dragon dinner and ur adventure comes to an end",
            choices: ["Try Again!"],
            images: ["dragonDinner.jpg"],
            consequence: {
                "Try Again!": "start"
            }
        },

        minotaurFightResult: {
            text: "You face the minotaur head-on with your chosen weapon. The clash echoes through the chamber... You emerge Victorious",
            choices: ["Play Again!"],
            images: ["minotaurFightResult.jpg"],
            consequence: {
                "Play Again!": "start"
                }
        },
        barelySurviveM: {
            text: "Silly adventure, Minatours cant talk! You become dinner and ur adventure comes to an end",
            choices: ["Try Again!"],
            images: ["minotaurDinner.jpg"],
            consequence: {
                "Try Again!": "start"
            }
        },

        encounterMonster: {
            text: "You encounter a huge monser blokcking your path. You decide give an offering and the monser becomes your best friend forever.",
            choices: ["Play Again!"],
            images: ["monsterFriend.jpg"],
            consequence: {
                "Play Again!": "start"
            }
        },
        leaveForest: {
            text: "Your attempt to explore the dark forest proves disastrous. You are followed by a forest gremlin that is invisible. This gremlin now follows you for eternity",
            choices: ["Play Again!"],
            images: ["walkHome.jpg"],
            consequence: {
                "Play Again!": "start"
            }
            
        },

};

function startGame() {
    //inital stage
    currentStage = "start";
    // call updatePage
    updatePage();
}

function updatePage() {
    const currentStageObject = storyStages[currentStage];

    // Display current stage text
    document.getElementById("story-text").textContent = currentStageObject.text;

    // Make buttons for choices
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = ""; // Clear previous choices

    for (const choice of currentStageObject.choices) {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;  // Display choice text on the button
        choiceButton.addEventListener("click", () => makeChoice(choice));
        choicesContainer.appendChild(choiceButton);
    }

    // Display images
    const imageSelection = document.getElementById("image-selection");
    imageSelection.innerHTML = ''; // Clear previous images

    for (const img of currentStageObject.images) {
        const imgElement = document.createElement("img");
        imgElement.src = img;
        imgElement.alt = "Stage Image";
        imageSelection.appendChild(imgElement);
    }
}






function makeChoice(choice) {
    console.log("currentStage:", currentStage);
    console.log("choice", choice);

    const consequence = storyStages[currentStage].consequence[choice];
    console.log("consequence:", consequence);
       //update stage
    currentStage = consequence;

    //check game end
    if (consequence === "defeat" || consequence === "barelySurvive") {
        endGame();
    } else {
        updatePage();
    }

}
document.addEventListener("DOMContentLoaded", startGame);

    
