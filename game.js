// Business Horror Quiz Game - Complete English Version
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced game data with business concepts from your image
    const questions = [
        {
            question: "Which of these represents the basic requirements for human survival?",
            options: ["Needs", "Wants", "Goods", "Services"],
            correctAnswer: 0,
            explanation: "Needs are essential for survival, while wants are desires beyond necessities."
        },
        {
            question: "What type of production involves extracting raw materials from nature?",
            options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
            correctAnswer: 0,
            explanation: "Primary production includes farming, mining, and other extraction activities."
        },
        {
            question: "Manufacturing automobiles would be classified as what type of production?",
            options: ["Primary", "Secondary", "Tertiary", "Service"],
            correctAnswer: 1,
            explanation: "Secondary production involves transforming raw materials into finished goods."
        },
        {
            question: "Which sector provides services rather than tangible goods?",
            options: ["Primary", "Secondary", "Tertiary", "Industrial"],
            correctAnswer: 2,
            explanation: "The tertiary sector includes banking, retail, and other service industries."
        },
        {
            question: "What is the main purpose of commerce?",
            options: ["Production", "Exchange", "Consumption", "Manufacturing"],
            correctAnswer: 1,
            explanation: "Commerce facilitates the exchange of goods and services between parties."
        },
        {
            question: "Which of these is NOT considered an aid to trade?",
            options: ["Banking", "Transport", "Retail", "Insurance"],
            correctAnswer: 2,
            explanation: "Retail is part of trade itself, while the others support trade activities."
        },
        {
            question: "What do we call business transactions within a country?",
            options: ["Home trade", "Foreign trade", "Import", "Export"],
            correctAnswer: 0,
            explanation: "Home trade refers to domestic business transactions."
        },
        {
            question: "Which business activity involves buying goods in bulk?",
            options: ["Retailing", "Wholesaling", "Importing", "Manufacturing"],
            correctAnswer: 1,
            explanation: "Wholesalers purchase large quantities from producers to sell to retailers."
        },
        {
            question: "What is the final stage of distribution to consumers called?",
            options: ["Wholesale", "Retail", "Import", "Production"],
            correctAnswer: 1,
            explanation: "Retail is the final step where products reach end consumers."
        },
        {
            question: "Which of these helps overcome the barrier of place in commerce?",
            options: ["Banking", "Transport", "Advertising", "Insurance"],
            correctAnswer: 1,
            explanation: "Transportation moves goods from production sites to consumers."
        }
    ];

    // Game state variables
    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;
    let gameCompleted = false;
    
    // DOM elements
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const submitBtn = document.getElementById('submit-btn');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const progressBar = document.getElementById('progress-bar');
    const gameContainer = document.getElementById('game-container');
    const jumpscare = document.getElementById('jumpscare');
    const scareImage = document.getElementById('scare-image');
    const scareSound = document.getElementById('scare-sound');
    const corruptedText = document.getElementById('corrupted-text');
    const cartoonCharacter = document.getElementById('cartoon-character');

    // Initialize game
    function initGame() {
        totalQuestionsElement.textContent = questions.length;
        loadQuestion();
        
        // Set up jumpscare assets
        scareImage.src = 'images/jumpscare.png';
        scareSound.src = 'sounds/scare.mp3';
        
        // Add animation to cartoon character
        animateCartoon();
    }

    // Animate the cartoon character
    function animateCartoon() {
        let angle = 0;
        setInterval(() => {
            angle = (angle + 2) % 360;
            cartoonCharacter.style.transform = `rotate(${angle}deg)`;
        }, 100);
    }

    // Load current question
    function loadQuestion() {
        const question = questions[currentQuestion];
        questionText.textContent = `Question ${currentQuestion + 1}: ${question.question}`;
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionElement.addEventListener('click', selectOption);
            optionsContainer.appendChild(optionElement);
        });
        
        // Update progress bar
        progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
        
        // Reset selection state
        selectedOption = null;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submit Answer';
    }

    // Handle option selection
    function selectOption(e) {
        // Deselect previous option if any
        if (selectedOption !== null) {
            document.querySelectorAll('.option')[selectedOption].classList.remove('selected');
        }
        
        // Select new option
        selectedOption = parseInt(e.target.dataset.index);
        e.target.classList.add('selected');
        submitBtn.disabled = false;
    }

    // Submit answer and check correctness
    function submitAnswer() {
        if (selectedOption === null || gameCompleted) return;
        
        const question = questions[currentQuestion];
        const options = document.querySelectorAll('.option');
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Visual feedback for answers
        options[question.correctAnswer].classList.add('correct');
        if (selectedOption !== question.correctAnswer) {
            options[selectedOption].classList.add('wrong');
        }
        
        // Update score if correct
        if (selectedOption === question.correctAnswer) {
            score++;
            scoreElement.textContent = score;
            
            // Play correct sound
            const correctSound = new Audio('sounds/correct.mp3');
            correctSound.play();
        } else {
            // Play wrong sound
            const wrongSound = new Audio('sounds/wrong.mp3');
            wrongSound.play();
        }
        
        // Prepare for next question
        submitBtn.textContent = 'Continue';
        submitBtn.removeEventListener('click', submitAnswer);
        submitBtn.addEventListener('click', nextQuestion);
    }

    // Load next question or end game
    function nextQuestion() {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            submitBtn.textContent = 'Submit Answer';
            submitBtn.removeEventListener('click', nextQuestion);
            submitBtn.addEventListener('click', submitAnswer);
            loadQuestion();
        } else {
            endGame();
        }
    }

    // End game with horror sequence
    function endGame() {
        gameCompleted = true;
        submitBtn.style.display = 'none';
        scoreContainer.style.display = 'block';
        
        // Start corruption sequence
        setTimeout(() => {
            // Corrupt all text elements
            const allTextElements = document.querySelectorAll('*:not(#jumpscare):not(#jumpscare *)');
            allTextElements.forEach(el => {
                if (el.textContent.trim() !== '') {
                    el.classList.add('corruption');
                }
            });
            
            // Show corrupted text message
            corruptedText.style.display = 'block';
            corruptedText.innerHTML = 'SYSTEM COMPROMISED<br>BUSINESS TERMINATED<br>ERROR 404: PROFIT NOT FOUND';
            
            // Play corruption sound
            const corruptionSound = new Audio('sounds/corruption.mp3');
            corruptionSound.play();
            
            // Trigger jumpscare after delay
            setTimeout(() => {
                gameContainer.style.display = 'none';
                jumpscare.style.display = 'flex';
                scareSound.play();
                
                // Reset game after jumpscare
                setTimeout(() => {
                    if (confirm('The horror has ended. Your final score: ' + score + '/' + questions.length + '\n\nPlay again?')) {
                        location.reload();
                    }
                }, 3000);
            }, 2000);
        }, 1500);
    }

    // Event listeners
    submitBtn.addEventListener('click', submitAnswer);
    
    // Initialize the game
    initGame();
});