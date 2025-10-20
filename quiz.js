// Quiz Application State
const state = {
    user: {
        name: '',
        email: ''
    },
    quiz: {
        questions: [],
        levels: [],
        currentLevel: 0,
        currentQuestion: 0,
        lives: 3,
        wrongAnswers: 0,
        correctAnswers: 0,
        completed: false
    },
    ui: {
        screens: {
            welcome: document.getElementById('welcome-screen'),
            quiz: document.getElementById('quiz-screen'),
            completion: document.getElementById('completion-screen')
        }
    }
};

// Learning recommendations for each level
const LEARNING_RECOMMENDATIONS = {
    1: {
        title: "AI Curious",
        concepts: [
            "Learn to distinguish AI (systems that simulate human intelligence) from simple automation (rule-based tasks) and smart devices (pre-programmed responses). Focus on understanding AI's ability to learn, adapt, and make decisions from data rather than just following instructions.",
            "Identify AI applications you already use: recommendation engines (Netflix, Spotify), virtual assistants (Siri, Alexa), navigation apps (Google Maps), and content filters (email spam detection). Practice recognizing AI-powered features in everyday technology.",
            "Understand that automation follows fixed rules, smart devices use sensors with predetermined responses, while AI learns patterns and makes predictions. Compare a programmable thermostat (smart) vs. a learning thermostat like Nest (AI) that adapts to your behavior.",
            "Master prompt engineering basics: be specific and detailed, provide context and examples, use clear instructions with desired output format. Practice iterating prompts based on AI responses to achieve better results."
        ]
    },
    2: {
        title: "LLM Explorer",
        concepts: [
            "Understand that AI learns by finding patterns in large datasets through algorithms that adjust mathematical weights and parameters. Focus on the concept that more diverse, high-quality data typically leads to better AI performance and generalization.",
            "Learn why data quality matters more than quantity: clean, representative, and unbiased datasets prevent AI from learning incorrect patterns. Study examples of how poor training data leads to biased or ineffective AI systems in real-world applications.",
            "Explore how AI identifies patterns (like recognizing faces in photos) and uses them for predictions (recommending products based on past purchases). Practice identifying what patterns an AI system might use for different tasks like fraud detection or medical diagnosis.",
            "Understand neural networks as interconnected nodes that process information similarly to brain neurons, with connections strengthening through learning. Focus on how deep learning uses multiple layers to recognize increasingly complex patterns from simple features to abstract concepts."
        ]
    },
    3: {
        title: "Big Data Dabbler",
        concepts: [
            "Master supervised learning (learning from labeled examples like email marked as spam/not spam) vs. unsupervised learning (finding hidden patterns without labels, like customer segmentation). Practice identifying which approach fits different business problems.",
            "Understand training (teaching AI with historical data) vs. inference (AI making predictions on new, unseen data). Learn why models perform differently between training and real-world deployment, and how to evaluate this performance gap.",
            "Focus on data quality dimensions: accuracy, completeness, consistency, and relevance to the problem being solved. Learn to identify how missing data, outliers, and measurement errors directly impact AI model reliability and decision-making.",
            "Learn to identify bias sources: historical bias in data, sampling bias, and confirmation bias in data collection. Understand techniques like data auditing, diverse sampling, and bias testing to create more fair and representative AI systems."
        ]
    },
    4: {
        title: "AI Literate",
        concepts: [
            "Understand tokens as text chunks (words or word parts) that LLMs process, and context windows as the maximum tokens the model can consider at once (typically 4K-128K tokens). Learn to estimate token usage and manage conversation length for optimal performance.",
            "Master temperature settings: low values (0.1-0.3) for consistent, factual responses; high values (0.7-1.0) for creative, varied outputs. Practice adjusting temperature based on whether you need precise information or creative brainstorming.",
            "Learn fine-tuning techniques: training pre-trained models on specific datasets to improve performance for particular tasks or domains. Understand when fine-tuning is worth the cost versus using prompt engineering or retrieval-augmented generation.",
            "Focus on API cost optimization: monitor token usage, batch requests efficiently, choose appropriate model sizes for tasks, and implement caching for repeated queries. Learn to balance performance requirements with cost constraints in production applications."
        ]
    },
    5: {
        title: "Gen AI Guru",
        concepts: [
            "Master RAG architecture: combining LLMs with external knowledge retrieval to provide current, accurate information beyond training data. Learn to implement vector databases, embedding models, and retrieval strategies for domain-specific applications.",
            "Understand grounding techniques: anchoring AI responses in verifiable sources, citations, and real-time data to improve accuracy and reliability. Practice implementing fact-checking workflows and source attribution in AI-generated content.",
            "Learn hallucination detection and mitigation: identifying when AI generates plausible but incorrect information, implementing confidence scoring, and using techniques like chain-of-thought reasoning to improve factual accuracy. Focus on validation strategies for critical applications.",
            "Distinguish discriminative AI (classifies or predicts from existing data) from generative AI (creates new content like text, images, code). Understand when to use each approach and how to combine them for comprehensive AI solutions."
        ]
    },
    6: {
        title: "AI Strategist",
        concepts: [
            "Develop AI ROI frameworks: calculate implementation costs, productivity gains, and risk mitigation value while considering long-term strategic advantages. Focus on measuring both quantitative benefits and qualitative improvements in decision-making and innovation capacity.",
            "Master change management for AI adoption: address employee concerns, provide targeted training, establish clear governance, and create feedback loops. Learn to manage cultural resistance and build AI literacy across different organizational levels and functions.",
            "Implement responsible AI frameworks: establish bias detection protocols, ensure algorithmic transparency, maintain human oversight, and create accountability mechanisms. Focus on building ethical guidelines, audit processes, and stakeholder trust in AI systems.",
            "Design AI scaling strategies: create reusable frameworks, establish centers of excellence, develop internal capabilities, and build vendor management processes. Learn to balance centralized AI governance with distributed implementation across business units."
        ]
    }
};

// Initialize the application
async function init() {
    try {
        // Load questions from JSON
        const response = await fetch('questions.json');
        const data = await response.json();

        state.quiz.levels = data.levels;

        // Set up event listeners
        setupEventListeners();

    } catch (error) {
        console.error('Error loading quiz data:', error);
        alert('Failed to load quiz questions. Please refresh the page.');
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Welcome screen form submission
    document.getElementById('user-info-form').addEventListener('submit', handleStartQuiz);

    // Next button (will be shown after answering)
    document.getElementById('next-btn').addEventListener('click', handleNextQuestion);

    // Completion screen buttons
    document.getElementById('submit-feedback-btn').addEventListener('click', handleSubmitFeedback);
    document.getElementById('restart-btn').addEventListener('click', handleRestart);
}

// Handle quiz start
function handleStartQuiz(e) {
    e.preventDefault();

    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();

    if (!name || !email) {
        alert('Please enter both your name and email.');
        return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Save user info
    state.user.name = name;
    state.user.email = email;

    // Start quiz
    showScreen('quiz');
    loadQuestion();
}

// Show a specific screen
function showScreen(screenName) {
    // Hide all screens
    Object.values(state.ui.screens).forEach(screen => {
        screen.classList.remove('active');
    });

    // Show requested screen
    state.ui.screens[screenName].classList.add('active');
}

// Load current question
function loadQuestion() {
    const level = state.quiz.levels[state.quiz.currentLevel];
    const question = level.questions[state.quiz.currentQuestion];

    // Update header
    document.getElementById('current-level-display').textContent =
        `Level ${level.level}: ${level.name}`;
    document.getElementById('progress-display').textContent =
        `Question ${state.quiz.currentQuestion + 1}/6`;

    // Update progress bar
    const totalQuestions = state.quiz.currentLevel * 6 + state.quiz.currentQuestion + 1;
    const progressPercent = (totalQuestions / 36) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    // Update question
    document.getElementById('question-num').textContent = state.quiz.currentQuestion + 1;
    document.getElementById('question-text').textContent = question.question;

    // Create options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.dataset.index = index;

        const letter = String.fromCharCode(65 + index); // A, B, C, D

        optionDiv.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text">${option}</span>
        `;

        optionDiv.addEventListener('click', () => handleAnswerSelection(index));
        optionsContainer.appendChild(optionDiv);
    });

    // Hide feedback
    document.getElementById('feedback').classList.add('hidden');
}

// Handle answer selection
function handleAnswerSelection(selectedIndex) {
    const level = state.quiz.levels[state.quiz.currentLevel];
    const question = level.questions[state.quiz.currentQuestion];
    const options = document.querySelectorAll('.option');

    // Disable all options
    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
    });

    // Check if correct
    const isCorrect = selectedIndex === question.correct_answer;

    // Update selected option
    options[selectedIndex].classList.add('selected');

    // Show correct answer
    if (isCorrect) {
        options[selectedIndex].classList.add('correct');
        state.quiz.correctAnswers++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct_answer].classList.add('correct');

        // Lose a life
        state.quiz.wrongAnswers++;
        state.quiz.lives--;
        updateLives();

        // Shake animation on wrong answer
        document.querySelector('.question-card').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.question-card').classList.remove('shake');
        }, 400);

        // Check if game over
        if (state.quiz.lives === 0) {
            setTimeout(() => {
                endQuiz();
            }, 2000);
            return;
        }
    }

    // Show feedback
    showFeedback(isCorrect, question.explanation);
}

// Update lives display
function updateLives() {
    const livesDisplay = document.getElementById('lives-display');
    livesDisplay.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const lifeIndicator = document.createElement('span');
        lifeIndicator.className = i < state.quiz.lives ? 'life active' : 'life';
        livesDisplay.appendChild(lifeIndicator);
    }
}

// Show feedback after answer
function showFeedback(isCorrect, explanation) {
    const feedbackDiv = document.getElementById('feedback');
    const feedbackResult = document.getElementById('feedback-result');
    const feedbackExplanation = document.getElementById('feedback-explanation');

    feedbackResult.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect';
    feedbackResult.className = isCorrect ? 'feedback-result correct' : 'feedback-result incorrect';
    feedbackExplanation.textContent = explanation;

    feedbackDiv.classList.remove('hidden');

    // Update button text
    const nextBtn = document.getElementById('next-btn');
    const isLastQuestionInLevel = state.quiz.currentQuestion === 5;
    const isLastLevel = state.quiz.currentLevel === 5;

    if (isLastQuestionInLevel && isLastLevel) {
        nextBtn.textContent = 'Complete Quiz';
    } else if (isLastQuestionInLevel) {
        nextBtn.textContent = 'Next Level';
    } else {
        nextBtn.textContent = 'Next Question';
    }
}

// Handle next question
function handleNextQuestion() {
    state.quiz.currentQuestion++;

    // Check if we've completed this level
    if (state.quiz.currentQuestion >= 6) {
        state.quiz.currentQuestion = 0;
        state.quiz.currentLevel++;

        // Check if quiz is complete
        if (state.quiz.currentLevel >= 6) {
            state.quiz.completed = true;
            endQuiz();
            return;
        }

        // Show level transition
        showLevelTransition();
    } else {
        loadQuestion();
    }
}

// Show level transition animation
function showLevelTransition() {
    const level = state.quiz.levels[state.quiz.currentLevel];

    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-in;
    `;

    overlay.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 80px; height: 80px; margin: 0 auto 1.5rem; background: linear-gradient(135deg, #07DADA, #05b3b3); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(7, 218, 218, 0.4);">
                <span style="font-size: 2.5rem; font-weight: 700; color: white;">${level.level}</span>
            </div>
            <h2 style="font-size: 2.5rem; margin-bottom: 0.5rem;">Level ${level.level}</h2>
            <p style="font-size: 1.5rem; opacity: 0.9;">${level.name}</p>
            <p style="font-size: 1.2rem; opacity: 0.7; margin-top: 1rem;">${level.description}</p>
        </div>
    `;

    document.body.appendChild(overlay);

    // Remove after 2 seconds and load next question
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(overlay);
            loadQuestion();
        }, 300);
    }, 2000);
}

// End quiz and show results
function endQuiz() {
    const completedLevel = state.quiz.completed ? 6 : state.quiz.currentLevel + 1;
    const level = state.quiz.levels[completedLevel - 1];

    // Update completion screen
    const title = state.quiz.completed
        ? 'Congratulations! You completed all levels!'
        : `Quiz Complete - You reached Level ${completedLevel}`;

    document.getElementById('completion-title').textContent = title;

    const message = state.quiz.completed
        ? `<p><strong>${state.user.name}</strong>, you've demonstrated professional competence in AI concepts!</p>
           <p>You answered ${state.quiz.correctAnswers} questions correctly across all 6 levels.</p>`
        : `<p><strong>${state.user.name}</strong>, you've reached the <strong>${level.name}</strong> level!</p>
           <p>You answered ${state.quiz.correctAnswers} questions correctly before using all your lives.</p>`;

    document.getElementById('completion-message').innerHTML = message;

    // Generate badge
    generateBadge(completedLevel, level);

    // Show learning recommendations
    showLearningRecommendations(completedLevel);

    // Switch to completion screen
    showScreen('completion');
}

// Show learning recommendations
function showLearningRecommendations(completedLevel) {
    const nextLevel = Math.min(completedLevel + 1, 6);
    const recommendations = LEARNING_RECOMMENDATIONS[nextLevel];

    const content = document.getElementById('recommendations-content');

    if (completedLevel === 6) {
        content.innerHTML = `
            <p><strong>You've mastered all levels!</strong> Here are some advanced topics to explore:</p>
            <ul>
                <li>Stay current with emerging AI regulations and governance frameworks</li>
                <li>Explore industry-specific AI applications in your field</li>
                <li>Consider AI ethics and philosophical implications</li>
                <li>Mentor others in their AI learning journey</li>
            </ul>
        `;
    } else {
        content.innerHTML = `
            <p>To advance to <strong>${recommendations.title}</strong>, focus on:</p>
            <ul>
                ${recommendations.concepts.map(concept => `<li>${concept}</li>`).join('')}
            </ul>
        `;
    }
}

// Handle feedback submission
async function handleSubmitFeedback() {
    const feedback = document.getElementById('user-feedback').value.trim();

    if (!feedback) {
        alert('Please share your thoughts before submitting.');
        return;
    }

    const btn = document.getElementById('submit-feedback-btn');
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    try {
        // Prepare data for Google Sheets
        const data = {
            timestamp: new Date().toISOString(),
            name: state.user.name,
            email: state.user.email,
            level_reached: state.quiz.completed ? 6 : state.quiz.currentLevel + 1,
            correct_answers: state.quiz.correctAnswers,
            wrong_answers: state.quiz.wrongAnswers,
            completed: state.quiz.completed,
            feedback: feedback
        };

        // Send to Google Sheets via Web App
        const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxCHDUwwUo0avFUery1zRW-VlOUWk593atSWHklGiIi2hI06KGareNqYehyNBgSgkc5/exec';

        // Convert data to URL parameters
        const params = new URLSearchParams();
        params.append('timestamp', data.timestamp);
        params.append('name', data.name);
        params.append('email', data.email);
        params.append('level_reached', data.level_reached);
        params.append('correct_answers', data.correct_answers);
        params.append('wrong_answers', data.wrong_answers);
        params.append('completed', data.completed);
        params.append('feedback', data.feedback);

        // Send as GET request with parameters
        await fetch(GOOGLE_SHEETS_URL + '?' + params.toString(), {
            method: 'GET',
            mode: 'no-cors'
        });

        // Note: With mode: 'no-cors', we won't get a response, but the data will be saved
        console.log('Feedback data sent:', data);

        alert('Thank you for your feedback! We\'ll use it to improve the quiz.');
        btn.textContent = 'Submitted ✓';

    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
        btn.textContent = 'Submit Feedback';
        btn.disabled = false;
    }
}

// Handle restart
function handleRestart() {
    // Reset state
    state.quiz.currentLevel = 0;
    state.quiz.currentQuestion = 0;
    state.quiz.lives = 3;
    state.quiz.wrongAnswers = 0;
    state.quiz.correctAnswers = 0;
    state.quiz.completed = false;

    // Clear form
    document.getElementById('user-feedback').value = '';
    document.getElementById('submit-feedback-btn').textContent = 'Submit Feedback';
    document.getElementById('submit-feedback-btn').disabled = false;

    // Reset lives display
    updateLives();

    // Show welcome screen
    showScreen('welcome');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
