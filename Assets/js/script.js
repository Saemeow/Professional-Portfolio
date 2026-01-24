// Guess the Profession Game Logic

const professions = [
    {
        name: "Software Engineer",
        keywords: ["software", "engineer", "developer", "programmer", "coder"],
        attributes: {
            worksWith: ["computers", "code", "technology", "software", "algorithms"],
            environment: ["office", "indoor", "sitting", "computer screen"],
            skills: ["programming", "problem solving", "logic", "analytical thinking", "math"],
            tools: ["keyboard", "mouse", "laptop", "computer", "IDE", "github"],
            education: ["degree", "university", "bachelor", "computer science"],
            salary: ["high", "good", "well paid", "competitive"],
            workStyle: ["remote possible", "flexible hours", "desk work"],
            interactions: ["team meetings", "code reviews", "minimal public interaction"],
            creative: true,
            physical: false,
            medical: false,
            teaching: false,
            outdoor: false,
            helpsPeople: true,
            requiresDegree: true,
            publicFacing: false
        }
    },
    {
        name: "Game Developer",
        keywords: ["game", "developer", "unity", "unreal", "gaming"],
        attributes: {
            worksWith: ["computers", "games", "code", "graphics", "3d models", "animations"],
            environment: ["office", "indoor", "sitting", "computer screen", "studio"],
            skills: ["programming", "creativity", "design", "art", "storytelling", "physics"],
            tools: ["unity", "unreal engine", "blender", "photoshop", "code editor"],
            education: ["degree helpful", "portfolio important", "self-taught possible"],
            salary: ["varies", "competitive in big studios", "good with experience"],
            workStyle: ["remote possible", "crunch time", "project-based", "deadlines"],
            interactions: ["team collaboration", "designers", "artists", "minimal public"],
            creative: true,
            physical: false,
            medical: false,
            teaching: false,
            outdoor: false,
            helpsPeople: true,
            requiresDegree: false,
            publicFacing: false,
            entertainment: true
        }
    },
    {
        name: "Web Designer",
        keywords: ["web", "designer", "ui", "ux", "frontend"],
        attributes: {
            worksWith: ["websites", "computers", "design", "graphics", "layouts", "colors"],
            environment: ["office", "indoor", "sitting", "computer screen", "freelance possible"],
            skills: ["design", "creativity", "user experience", "visual communication", "typography"],
            tools: ["figma", "photoshop", "illustrator", "css", "html", "sketch"],
            education: ["degree helpful", "portfolio crucial", "bootcamp", "self-taught common"],
            salary: ["varies widely", "freelance potential", "good with experience"],
            workStyle: ["remote common", "flexible", "client meetings", "freelance"],
            interactions: ["clients", "developers", "marketing teams", "presentations"],
            creative: true,
            physical: false,
            medical: false,
            teaching: false,
            outdoor: false,
            helpsPeople: true,
            requiresDegree: false,
            publicFacing: true,
            artistic: true
        }
    },
    {
        name: "Teacher",
        keywords: ["teacher", "educator", "professor", "instructor"],
        attributes: {
            worksWith: ["students", "children", "knowledge", "curriculum", "books", "lessons"],
            environment: ["classroom", "school", "indoor", "standing", "moving around"],
            skills: ["communication", "patience", "explaining", "planning", "empathy"],
            tools: ["whiteboard", "books", "computer sometimes", "projector", "markers"],
            education: ["degree required", "teaching certificate", "bachelor minimum", "masters preferred"],
            salary: ["moderate", "stable", "benefits", "pension"],
            workStyle: ["structured hours", "school calendar", "summers off", "evenings for grading"],
            interactions: ["constant student interaction", "parents", "colleagues", "public speaking"],
            creative: true,
            physical: false,
            medical: false,
            teaching: true,
            outdoor: false,
            helpsPeople: true,
            requiresDegree: true,
            publicFacing: true,
            rewarding: true
        }
    },
    {
        name: "Doctor",
        keywords: ["doctor", "physician", "surgeon", "medical"],
        attributes: {
            worksWith: ["patients", "medicine", "diseases", "treatments", "diagnoses", "health"],
            environment: ["hospital", "clinic", "indoor", "standing", "moving", "on feet"],
            skills: ["medical knowledge", "diagnosis", "empathy", "decision making", "precision"],
            tools: ["stethoscope", "medical equipment", "computer for records", "instruments"],
            education: ["medical degree required", "extensive education", "residency", "specialization"],
            salary: ["high", "very good", "excellent", "well compensated"],
            workStyle: ["long hours", "shifts", "on call", "stressful", "demanding"],
            interactions: ["constant patient interaction", "nurses", "staff", "families"],
            creative: false,
            physical: false,
            medical: true,
            teaching: false,
            outdoor: false,
            helpsPeople: true,
            requiresDegree: true,
            publicFacing: true,
            saveLife: true,
            prestigious: true
        }
    }
];

let currentProfession;
let timeLeft;
let timerInterval;
let questionsAsked = [];
let gameActive = false;

function startGame() {
    // Reset game state
    questionsAsked = [];
    timeLeft = 120;
    gameActive = true;
    
    // Pick random profession
    currentProfession = professions[Math.floor(Math.random() * professions.length)];
    
    // Update UI
    document.getElementById('gameStart').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    document.getElementById('gameEnd').style.display = 'none';
    document.getElementById('questionInput').value = '';
    document.getElementById('guessInput').value = '';
    document.getElementById('answerBox').textContent = 'Answers will appear here...';
    document.getElementById('questionsList').innerHTML = '';
    
    // Start timer
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 30) {
        timerElement.classList.add('warning');
    } else {
        timerElement.classList.remove('warning');
    }
    
    if (timeLeft <= 0) {
        endGame(false, "Time's up!");
    }
    
    timeLeft--;
}

function askQuestion() {
    if (!gameActive) return;
    
    const input = document.getElementById('questionInput');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Get answer based on question
    const answer = getAnswer(question);
    
    // Add to questions list
    questionsAsked.push({ question: input.value, answer });
    
    // Display answer
    document.getElementById('answerBox').textContent = answer;
    
    // Update questions list
    updateQuestionsList();
    
    // Clear input
    input.value = '';
    input.focus();
}

function getAnswer(question) {
    const q = question.toLowerCase();
    const attr = currentProfession.attributes;
    
    // Extract key concepts from the question
    const concepts = {
        // Work environment
        computer: ["computer", "pc", "laptop", "keyboard", "screen", "monitor", "digital", "tech"],
        outdoor: ["outdoor", "outside", "nature", "field", "fresh air", "sun"],
        indoor: ["indoor", "inside", "office", "building", "room"],
        physical: ["physical", "labor", "heavy", "lifting", "manual", "hands-on", "build", "construct"],
        
        // Medical
        medical: ["medical", "health", "doctor", "hospital", "clinic", "patient", "disease", "medicine", "treat", "diagnose", "surgery", "cure", "heal"],
        
        // Education
        teach: ["teach", "student", "school", "classroom", "education", "learn", "instruct", "professor", "educate"],
        study: ["study", "degree", "university", "college", "education", "school", "graduate"],
        
        // Work type
        creative: ["creative", "art", "design", "imagination", "original", "innovative"],
        code: ["code", "program", "software", "develop", "script", "algorithm", "debug", "coding"],
        help: ["help", "assist", "support", "aid", "serve"],
        
        // Interaction
        people: ["people", "person", "human", "individual", "client", "customer", "interact"],
        public: ["public", "audience", "presentation", "speak", "communicate"],
        
        // Tools and skills
        tools: ["tool", "equipment", "instrument", "device", "machine"],
        artistic: ["art", "draw", "paint", "color", "visual", "aesthetic", "design", "graphic"],
        
        // Work style
        remote: ["remote", "home", "wfh", "work from home", "distance"],
        flexible: ["flexible", "schedule", "hours", "time"],
        stress: ["stress", "pressure", "deadline", "demanding", "difficult", "hard"],
        
        // Compensation
        money: ["money", "salary", "pay", "earn", "income", "wage", "compensation"],
        
        // Entertainment
        fun: ["fun", "entertainment", "game", "play", "enjoy", "leisure"],
        
        // Special attributes
        save: ["save", "life", "lives", "emergency", "critical"],
        prestigious: ["prestigious", "respected", "important", "admired"]
    };
    
    // Check which concepts are present in the question
    const matchedConcepts = {};
    for (const [concept, keywords] of Object.entries(concepts)) {
        matchedConcepts[concept] = keywords.some(keyword => q.includes(keyword));
    }
    
    // Answer based on matched concepts and profession attributes
    
    // Computer-related questions
    if (matchedConcepts.computer) {
        const usesComputer = attr.worksWith.some(item => 
            ["computers", "code", "technology", "software", "websites", "graphics"].includes(item)
        );
        if (usesComputer) return "Yes!";
        if (attr.tools.some(tool => tool.includes("computer"))) return "Yes, but not primarily.";
        return "No.";
    }
    
    // Medical questions
    if (matchedConcepts.medical) {
        return attr.medical ? "Yes!" : "No.";
    }
    
    // Teaching questions
    if (matchedConcepts.teach) {
        return attr.teaching ? "Yes!" : "No.";
    }
    
    // Creative work
    if (matchedConcepts.creative) {
        return attr.creative ? "Yes!" : "Not particularly.";
    }
    
    // Coding/Programming
    if (matchedConcepts.code) {
        const codesProfessionally = attr.skills.includes("programming") || 
                                    attr.worksWith.some(w => ["code", "software"].includes(w));
        return codesProfessionally ? "Yes!" : "No.";
    }
    
    // Outdoor work
    if (matchedConcepts.outdoor) {
        return attr.outdoor ? "Yes!" : "No.";
    }
    
    // Physical labor
    if (matchedConcepts.physical) {
        return attr.physical ? "Yes!" : "No.";
    }
    
    // Working with people
    if (matchedConcepts.people) {
        const workWithPeople = attr.interactions.some(i => 
            i.includes("student") || i.includes("patient") || i.includes("client") || i.includes("public")
        );
        if (workWithPeople) return "Yes!";
        return "Not directly with the public.";
    }
    
    // Helping people
    if (matchedConcepts.help) {
        return attr.helpsPeople ? "Yes!" : "Indirectly.";
    }
    
    // Education requirements
    if (matchedConcepts.study) {
        if (q.includes("require") || q.includes("need") || q.includes("must")) {
            return attr.requiresDegree ? "Yes, typically required." : "Helpful but not always required.";
        }
        return "Education is important in this field.";
    }
    
    // Artistic work
    if (matchedConcepts.artistic) {
        return attr.artistic ? "Yes!" : "No.";
    }
    
    // Remote work
    if (matchedConcepts.remote) {
        const canRemote = attr.workStyle.some(w => w.includes("remote"));
        return canRemote ? "Yes, often possible!" : "Not typically.";
    }
    
    // Salary/Money
    if (matchedConcepts.money) {
        if (q.includes("high") || q.includes("good") || q.includes("well")) {
            const goodPay = attr.salary.some(s => ["high", "good", "excellent", "competitive"].some(word => s.includes(word)));
            return goodPay ? "Yes!" : "Moderate.";
        }
        return "It varies.";
    }
    
    // Stress/Pressure
    if (matchedConcepts.stress) {
        const stressful = attr.workStyle.some(w => ["stressful", "demanding", "crunch", "long hours"].some(word => w.includes(word)));
        return stressful ? "Yes, it can be." : "Manageable.";
    }
    
    // Entertainment/Fun
    if (matchedConcepts.fun) {
        return attr.entertainment ? "Yes!" : "Not its primary purpose.";
    }
    
    // Saving lives
    if (matchedConcepts.save) {
        return attr.saveLife ? "Yes!" : "No.";
    }
    
    // Prestigious
    if (matchedConcepts.prestigious) {
        return attr.prestigious ? "Yes!" : "Respectable.";
    }
    
    // Public facing
    if (matchedConcepts.public) {
        return attr.publicFacing ? "Yes!" : "Not really.";
    }
    
    // Check for specific tools mentioned
    const mentionedTools = attr.tools.filter(tool => q.includes(tool.toLowerCase()));
    if (mentionedTools.length > 0) {
        return "Yes!";
    }
    
    // Check for specific skills mentioned
    const mentionedSkills = attr.skills.filter(skill => q.includes(skill.toLowerCase()));
    if (mentionedSkills.length > 0) {
        return "Yes!";
    }
    
    // Check for environment keywords
    const envMatches = attr.environment.filter(env => q.includes(env.toLowerCase()));
    if (envMatches.length > 0) {
        return "Yes!";
    }
    
    // Handle common question patterns
    if (q.includes("sit") || q.includes("sitting") || q.includes("desk")) {
        const sitsAtDesk = attr.environment.includes("sitting");
        return sitsAtDesk ? "Yes!" : "Not primarily.";
    }
    
    if (q.includes("stand") || q.includes("standing")) {
        const stands = attr.environment.includes("standing");
        return stands ? "Yes!" : "Not necessarily.";
    }
    
    if (q.includes("uniform")) {
        const wearsUniform = attr.medical || attr.teaching;
        return wearsUniform ? "Sometimes!" : "No.";
    }
    
    // Default responses for unmatched questions
    if (q.includes("?")) {
        return "I need more specific keywords. Try asking about: computers, creativity, people, medical, teaching, outdoors, tools, or work environment.";
    }
    
    return "I can answer yes/no questions! Try asking about: work environment, tools, skills, education, salary, or who they help.";
}

function updateQuestionsList() {
    const list = document.getElementById('questionsList');
    list.innerHTML = '';
    
    questionsAsked.slice().reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.innerHTML = `
            <div class="question-text">Q: ${item.question}</div>
            <div class="answer-text">A: ${item.answer}</div>
        `;
        list.appendChild(div);
    });
}

function submitGuess() {
    if (!gameActive) return;
    
    const guess = document.getElementById('guessInput').value.trim().toLowerCase();
    if (!guess) return;
    
    // Check if guess is correct
    const isCorrect = currentProfession.keywords.some(keyword => 
        guess.includes(keyword) || keyword.includes(guess)
    );
    
    if (isCorrect) {
        endGame(true, `Correct! It was ${currentProfession.name}!`);
    } else {
        endGame(false, `Sorry! The answer was ${currentProfession.name}.`);
    }
}

function endGame(won, message) {
    gameActive = false;
    clearInterval(timerInterval);
    
    document.getElementById('gamePlay').style.display = 'none';
    document.getElementById('gameEnd').style.display = 'block';
    
    const resultDiv = document.getElementById('resultMessage');
    resultDiv.className = `result-message ${won ? 'correct' : 'incorrect'}`;
    resultDiv.textContent = message;
    
    const statsDiv = document.getElementById('gameStats');
    const timeUsed = 120 - (timeLeft + 1);
    statsDiv.innerHTML = `
        <div class="stat-item">
            <strong>${questionsAsked.length}</strong>
            <div>Questions Asked</div>
        </div>
        <div class="stat-item">
            <strong>${Math.floor(timeUsed / 60)}:${(timeUsed % 60).toString().padStart(2, '0')}</strong>
            <div>Time Used</div>
        </div>
        <div class="stat-item">
            <strong>${won ? '🎉' : '😔'}</strong>
            <div>${won ? 'Victory!' : 'Try Again'}</div>
        </div>
    `;
}
