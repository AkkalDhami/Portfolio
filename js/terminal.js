function updateClock() {
    const clock = document.getElementById('clock');
    if (clock) clock.textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Binary Background Animation
const binaryCanvas = document.getElementById('binaryCanvas');
const ctx = binaryCanvas.getContext('2d');
let matrixColor = '#00ff00';
let drops = [];

function resizeCanvas() {
    binaryCanvas.width = window.innerWidth;
    binaryCanvas.height = window.innerHeight;
    drops = Array(Math.floor(binaryCanvas.width / 20)).fill(1);
}

function drawBinaryBackground() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, binaryCanvas.width, binaryCanvas.height);
    ctx.fillStyle = matrixColor;
    ctx.font = '14px JetBrains Mono';

    drops.forEach((drop, i) => {
        const char = Math.random() > 0.5 ? '0' : '1';
        ctx.fillText(char, i * 20, drop * 20);
        if (drop * 20 > binaryCanvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}



// Date Display
const date = document.getElementById('date');
function getFormattedDate(date) {
    const day = date.toLocaleDateString("en-GB", { dateStyle: "full" });
    return `${day}`;
}

function updateDate() {
    const now = new Date();
    const formattedDate = getFormattedDate(now);
    date.textContent = formattedDate.toLocaleLowerCase();
}
updateDate();

// Themes management
const themes = {
    'default': {
        bg: 'bg-gray-900',
        text: 'text-[#00ff00]',
        code: '#00ff00',
        border: 'border-[#00ff00]/30',
        key: '#ffff00',
        string: '#33eee2'
    },
    'monokai': {
        bg: 'bg-[#272822]',
        text: 'text-[#f8f8f2]',
        code: '#f8f8f2',
        border: 'border-[#f8f8f2]/30',
        key: '#AE81FF',
        string: '#A6E22E'
    },
    'dracula': {
        bg: 'bg-[#282a36]',
        text: 'text-[#f8f8f2]',
        code: '#f8f8f2',
        border: 'border-[#f8f8f2]/30',
        key: '#ff79c6',
        string: '#50FA7B',
    },
    'solarized': {
        bg: 'bg-[#002b36]',
        text: 'text-[#aac0c7]',
        code: '#aac0c7',
        border: 'border-[#aac0c7]/30',
        key: '#b58900',
        string: '#D33682 '
    },
    'light': {
        bg: 'bg-[#f8f8f2]',
        text: 'text-[#2c2d2b]',
        code: '#000000',
        border: 'border-black/30',
        key: '#3594e2',
        string: '#D33682 '
    }
};

let currentTheme = 'default';
function changeTheme(themeName) {
    const theme = themes[themeName];
    if (theme) {
        currentTheme = themeName;
        document.body.className = `${theme.bg} ${theme.text} terminal-font`;
        document.getElementById('terminal').className = `backdrop-blur-sm rounded-lg shadow-2xl ${theme.border} ${theme.text} ${theme.bg}`;
        document.querySelector('.terminal-header').className = `terminal-header sticky top-0  p-4 border-b ${theme.border} flex justify-between items-center`;
        document.querySelector('.prompt').className = `prompt flex items-center space-x-2 border-t ${theme.border} p-4`;
        matrixColor = theme.code;

        // Update key color
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.style.color = theme.key;
        });

        // Update string color
        const strings = document.querySelectorAll('.string');
        strings.forEach(string => {
            string.style.color = theme.string;
        })
        // Update placeholder color
        const input = document.getElementById('input');
        input.classList.remove('default-placeholder', 'monokai-placeholder', 'dracula-placeholder', 'solarized-placeholder', 'light-placeholder');
        input.classList.add(`${themeName}-placeholder`);
    }
}

// Contact Form  Management
let contactState = {
    active: false,
    currentStep: 0,
    data: { name: '', email: '', message: '' },
    steps: ['name', 'email', 'message', 'submit']
};

function resetContactState() {
    contactState = {
        active: false,
        currentStep: 0,
        data: { name: '', email: '', message: '' },
        steps: ['name', 'email', 'message', 'submit']
    };
}

function validateField(field, value) {
    if (field === 'name' && value.trim().length < 3) return 'name must be at least 3 characters';
    if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'invalid email address';
    if (field === 'message' && value.trim().length < 10) return 'message must be at least 10 characters';
    return null;
}

function displayContactForm() {
    const input = document.getElementById('input');
    const prompt = document.querySelector('.prompt span');
    const currentStep = contactState.steps[contactState.currentStep];

    if (currentStep === 'submit') {
        prompt.innerHTML = "➜ type '<span class='string'>submit</span>' to send the message: ";
        input.placeholder = "type 'submit' to confirm";
        return;
    }

    prompt.textContent = `➜ enter your ${currentStep}:`;
    input.placeholder = `type your ${currentStep} here`;
}

function handleContactInput(value) {
    const currentStep = contactState.steps[contactState.currentStep];
    const error = validateField(currentStep, value);

    if (error) {
        addOutput(` ${error}`, 'error');
        return;
    }

    contactState.data[currentStep] = value.trim();
    contactState.currentStep++;

    if (contactState.currentStep >= contactState.steps.length) {
        addOutput("all fields filled! type 'submit to send the message.", 'success');
        displayContactForm();
    } else {
        displayContactForm();
    }
}

function handleBackward() {
    if (contactState.currentStep > 0) {
        contactState.currentStep--;
        displayContactForm();
    }
}

function handleForward() {
    if (contactState.currentStep < contactState.steps.length - 1) {
        const currentStep = contactState.steps[contactState.currentStep];
        if (!contactState.data[currentStep]) {
            addOutput('please fill the current field first', 'error');
            return;
        }
        contactState.currentStep++;
        displayContactForm();
    }
}

function submitContactForm() {
    addOutput('message submitted successfully!', 'success');
    addOutput('thank you for reaching out!', 'info');
    resetContactState();
    displayDefaultPrompt();
}

function displayDefaultPrompt() {
    const input = document.getElementById('input');
    const prompt = document.querySelector('.prompt span');
    prompt.textContent = '➜';
    input.placeholder = "type 'help' or 'ls' for commands";
}

// Game  Management
let gameState = {
    active: false,
    setup: true,
    target: null,
    attempts: 0,
    max_attempts: 7,
    min: 1,
    max: 100
};

function startGame() {
    gameState.active = true;
    gameState.setup = true;
    gameState.phase = 'max_attempts';
    addOutput('starting number guessing game - customize your game:', 'info');
    updateGamePrompt('type max attempts (default 7)', '➜ enter max attempts: ');
    return '';
}

function handleGameSetup(input) {
    const value = parseInt(input);

    switch (gameState.phase) {
        case 'max_attempts':
            if (!isNaN(value) && value > 0) {
                gameState.max_attempts = value;
                gameState.phase = 'min_number';
                updateGamePrompt('type min number (default 1):', '➜ enter min number: ');
            } else {
                addOutput('invalid input. using default 7 attempts', 'error');
                gameState.phase = 'min_number';
                updateGamePrompt('type min number (default 1):', '➜ enter min number: ');
            }
            break;

        case 'min_number':
            if (!isNaN(value)) {
                gameState.min = value;
                gameState.phase = 'max_number';
                updateGamePrompt('type max number (default 100)', '➜ enter max number: ');
            } else {
                addOutput('invalid input. using default min 1', 'error');
                gameState.phase = 'max_number';
                updateGamePrompt('type max number (default 100)', '➜ enter max number: ');
            }
            break;

        case 'max_number':
            if (!isNaN(value) && value > gameState.min) {
                gameState.max = value;
                finishGameSetup();
            } else {
                addOutput(`invalid input. using default max ${gameState.min + 99}`, 'error');
                gameState.max = gameState.min + 99;
                finishGameSetup();
            }
            break;
    }
}

function finishGameSetup() {
    gameState.target = Math.floor(Math.random() * (gameState.max - gameState.min + 1)) + gameState.min;
    gameState.attempts = 0;
    gameState.setup = false;

    addOutput(`game started! guess a number between <span class='key'>${gameState.min}</span> and <span class='key'>${gameState.max}</span>`, 'info');
    addOutput(`you have <span class='key'>${gameState.max_attempts}</span> attempts to guess the number`, 'info');
    addOutput("type '<span class='string'>exit</span>' or '<span class='string'>quit</span>' to exit the game", 'info');
    updateGamePrompt('type your guess', '➜ enter your guess: ');
}

function handleGamePlay(input) {
    if (input === 'exit' || input === 'quit') {
        addOutput(`game exited. the number was <span class='key'>${gameState.target}</span>`, 'info');
        resetGameState();
        return;
    }

    const guess = parseInt(input);
    if (isNaN(guess)) {
        addOutput('invalid input. please enter a number', 'error');
        return;
    }

    gameState.attempts++;

    if (guess === gameState.target) {
        addOutput(`congratulations! you guessed the number in <span class='key'>${gameState.attempts}</span> <span class='key'></span>${gameState.attempts === 1 ? 'attempt' : 'attempts'}`, 'success');
        resetGameState();
        return;
    }

    if (gameState.attempts >= gameState.max_attempts) {
        addOutput(`game over. the number was <span class='key'>${gameState.target}</span>`, 'info');
        resetGameState();
        return;
    }

    const remaining = gameState.max_attempts - gameState.attempts;
    const hint = guess < gameState.target ? 'low' : 'high';
    addOutput(`too <span class='key'>${hint}!</span> - you have <span class='string'>${remaining}</span> ${remaining === 1 ? 'attempt' : 'attempts'} left`, 'game');
    updateGamePrompt('guess a number:', '➜ guess a number: ');
}

function updateGamePrompt(placeholder, promptText) {
    const input = document.getElementById('input');
    input.placeholder = placeholder;
    const prompt = document.querySelector('.prompt span');
    prompt.textContent = `${promptText || '➜'}`;
}

function resetGameState() {
    gameState = {
        active: false,
        setup: true,
        target: null,
        attempts: 0,
        max_attempts: 7,
        min: 1,
        max: 100
    };
    displayDefaultPrompt();
}


// display commands
function showCommands() {
    return `
    <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-[16px] my-1.5">
    <span class="opacity-90 key" aria-label="show available commands">▸ ls or help</span><span>displays available commands</span>
    <span class="opacity-90 key" aria-label="about me">▸ about</span><span>learn more about me</span>
    <span class="opacity-90 key" aria-label="technical proficiencies">▸ skill</span><span>view my technical skills</span>
    <span class="opacity-90 key" aria-label="view my projects">▸ project</span><span>explore my projects</span>
    <span class="opacity-90 key" aria-label="available themes">▸ theme</span><span>see available themes</span>
    <span class="opacity-90 key" aria-label="contact information">▸ contact</span><span>get in touch</span>
    <span class="opacity-90 key" aria-label="clear terminal">▸ clear</span><span>clear the terminal</span>
    <span class="opacity-90 key" aria-label="play number guessing game">▸ game</span><span>play a number guessing game</span>
    <span class="opacity-90 key" aria-label="show current time">▸ time</span><span>display the current time</span>
    <span class="opacity-90 key" aria-label="show command history">▸ his</span><span>view command history</span>
    <span class="key" aria-label="checkout gui portfolio">▸ gui</span><span>explore my gui portfolio</span>
</div>

    `
}

// display about me
function displayAbout() {
    return `<div class="mb-4">
    <h2 class="text-xl font-bold">about me: </h2>
    <div class="my-4">
        <p>
            Hello! I'm <span class="string">Akkal Dhami</span>, a passionate and dedicated  <strong class="key">Frontend Developer</strong> with a strong foundation in <strong class="key">HTML</strong>, <strong class="key">CSS</strong> and <strong class="key">JavaScript</strong>. I have a deep understanding of user interfaces and user experience, and I enjoy creating visually appealing and functional websites. I'm a quick learner and always seeking new challenges to enhance my skills.
        </p>
    </div>
    <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-[16px] my-2">
        <span class="key">▸ name</span><span>akkal dhami</span>
        <span class="key">▸ email</span><span>akkaldhami21@gmail.com</span>
        <span class="key">▸ contact</span><span>+977-9828122071</span>
        <span class="key">▸ github</span><span><a target="_blank" href="https://github.com/AkkalDhami">https://github.com/AkkalDhami</a></span>
    </div>
</div>`
}

// display skills
function displaySkills() {
    return `
    <div class="mb-4">
        <h2 class="text-xl font-bold">skills & technologies: </h2>
        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-[16px] my-2">
            <span class="key">▸ frontend</span><span class="flex gap-x-2"><p class="glow">#html5</p><p class="glow">#css3</p> <p class="glow">#javascript</p> <p class="glow">#tailwindcss</p></span>
            <span class="key">▸ backend</span><span class="flex gap-x-2"><p class="glow">#nodejs</p> <p class="glow">#express</p></span>
            <span class="key">▸ databases</span><span class="flex gap-x-2"><p class="glow">#mysql</p> <p class="glow">#mongodb</p></span>
            <span class="key">▸ version control</span><span class="flex gap-x-2"><p class="glow">#git</p> <p class="glow">#github</p></span>
            <span class="key">▸ code editor</span><span class="flex gap-x-2"><p class="glow">#vscode</p> <p class="glow">#winsurf</p> <p class="glow">#cursor</p></span>
            <span class="key">▸ operating system</span><span class="flex gap-x-2"><p class="glow">#windows</p></span>
            <span class="key">▸ api testing</span><span class="flex gap-x-2"><p class="glow">#postman</p></span>
        </div>
    </div>
    `
}

// display projects
function displayProjects() {
    return `
       <div class="mb-4">
                <h2 class="text-xl font-bold">view my projects: </h2>
                   <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-[16px] my-2">
                    <span class="key">▸ <a target="_blank" href="https://nepkart.vercel.app">nepkart</a></span><span class="flex gap-x-2">e commerce website</span>
                    <span class="key">▸ <a target="_blank" href="https://dishhdashh.vercel.app">dishhdashh</a></span><span class="flex gap-x-2">food delivery website</span>
                    <span class="key">▸ <a target="_blank" href="https://portfolio-akkal.vercel.app/">portfolio</a></span><span class="flex gap-x-2">personal portfolio</span>
                </div>
            </div>     
            `
}

// display time
function displayTime() {
    return `
        <div class="mb-4">
             <p>${new Date().toLocaleTimeString()}</p>
        </div>               
        `
}

// display contact form
function displayContactDetails() {
    return `
asfdsdf    
    `
}

// display history
function displayHistory() {
    return `<div class="my-4">
        <h2 class="text-xl my-2 font-bold">your history: </h2>
        <ul class="mb-4">
            ${historyInput.length === 0 ? '<li class="text-[16px] string">no history found</li>' : ''}
            ${historyInput.map((input, index) => `<li class="text-[16px]"><span class="key">▸</span> ${input}</li>`).join('')}
        </ul>
    </div>
    `
}

// display theme
function displayThemes() {
    return `
    <div class="mb-4">
        <h2 class="text-xl font-bold">available themes: </h2>
        <div class="my-2 text-[16px]">
            ${Object.keys(themes).map(theme => `<span class="key">${theme}</span>`).join(' ')}
        </div>
        <div class="my-2">
            <p>
                <span class="key">usage:</span>
                theme set theme-name
            </p>
            <p>
                <span class="key">eg:</span>
                theme <span class="string">set</span>
                dracula
            </p>
        </div>
    </div>
    `
}

// go to gui portfolio
function goToGuiPortfolio() {
    const url = 'https://portfolio-akkal.vercel.app/';
    window.open(url, '_blank');
    addOutput(`opening gui portfolio successfully`, 'success');
    return '';
}

// scroll to bottom
function scrollToBottom() {
    history.scrollTop = history.scrollHeight;
}

// Terminal Functionality
const commands = {
    'ls': () => showCommands(),
    'help': () => showCommands(),
    'contact': () => {
        contactState.active = true;
        displayContactForm();
        return `
         <div class="mb-4">
                    <h2 text-xl font-bold>contact me: </h2>
                    <div class="grid grid-cols-2 gap-x-1 gap-y-2 text-[16px] my-2">
                        <span class="key">▸ name</span><span>akkal dhami</span>
                        <span class="key">▸ email</span><span>akkaldhami21@gmail.com</span>
                        <span class="key">▸ contact</span><span>+977-9828122071</span>
                        <span class="key">▸ github</span><span><a target="_blank" href="https://github.com/AkkalDhami">https://github.com/AkkalDhami</a></span>
                    </div>
                </div>

               <div class="my-3 font-semibold"> type your '<span class="string">name</span>', '<span class="string">email</span>' and '<span class="string">message</span>' to fill the form.<br> or <br> press <kbd class="string">ctrl</kbd> + <kbd class="string">x</kbd> to clear the form.</div>

                <div class="my-3 font-semibold">use the following commands to navigate the form: </div>
                <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-[16px] my-2">
                    <span class="key">▸ back</span><span>Go back</span>
                    <span class="key">▸ forward</span><span>Go forward</span>
                </div>
        `
    },
    'clear': clearTerminal,
    'theme': () => displayThemes(),
    'about': () => displayAbout(),
    'skill': () => displaySkills(),
    'project': () => displayProjects(),
    'game': startGame,
    'time': () => displayTime(),
    'his': () => displayHistory(),
    'gui': () => goToGuiPortfolio(),
};

function clearTerminal() {
    history.innerHTML = '';
    return '';
}

// Terminal Logic
const history = document.getElementById('history');
const input = document.getElementById('input');

let historyInput = [];
let historyIndex = -1;

input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) input.value = historyInput[--historyIndex];
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < historyInput.length - 1) input.value = historyInput[++historyIndex];
    }
});

function addOutput(message, type = 'info') {
    const output = document.createElement('div');
    output.className = `output mb - 4 terminal - font ${type === 'error' ? 'text-[#e50b0b]' : type === 'success' ? 'text-[#00ff00]' : ''} `;
    output.innerHTML = message;
    history.appendChild(output);
    history.scrollTop = history.scrollHeight;
}

function setTheme(theme) {
    changeTheme(theme);
}

// Process Command
function processCommand(cmd) {
    if (cmd.startsWith('theme set ')) {
        const themeName = cmd.split('theme set ')[1].trim();
        if (themes[themeName]) {
            changeTheme(themeName);
            addOutput(`theme changed to ${themeName}`, 'success');
        } else {
            addOutput(`invalid theme: ${themeName}`, 'error');
            addOutput(`<span class='key'>available themes:</span> ${Object.keys(themes).join(', ')} `, 'info');
            changeTheme(currentTheme);
        }
        scrollToBottom();
        return;
    }

    if (gameState.active) {
        if (gameState.setup) {
            handleGameSetup(cmd);
        } else {
            handleGamePlay(cmd);
        }
        changeTheme(currentTheme);
        scrollToBottom();
        return;
    }

    if (contactState.active) {
        if (cmd === 'back') {
            handleBackward();
            changeTheme(currentTheme);
            scrollToBottom();
            return;
        }
        if (cmd === 'forward') {
            handleForward();
            changeTheme(currentTheme);
            scrollToBottom();
            return;
        }

        if (contactState.currentStep === contactState.steps.length - 1) {
            if (cmd === 'submit') {
                submitContactForm();
            } else {
                addOutput("type '<span class='string'>submit</span>' to send message or '<span class='string'>back</span>' to edit fields", 'error');
            }
            changeTheme(currentTheme);
            scrollToBottom();
            return;
        }
        handleContactInput(cmd);
        changeTheme(currentTheme);
        scrollToBottom();
        return;
    }

    if (commands[cmd]) {
        addOutput(commands[cmd]());
    } else if (cmd) {
        addOutput(` command not found: ${cmd} `, 'error');
    }
    scrollToBottom();
    changeTheme(currentTheme);
}

// Add keyboard shortcut handler
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        input.value = '';
        if (contactState.active) {
            resetContactState();
            displayDefaultPrompt();
        }
    }
});
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'q') {
        clearTerminal();
    }
});

function addCommandToHistory(cmd) {
    const commandLine = document.createElement('div');
    commandLine.className = 'command mb-2 terminal-font opacity-70';
    commandLine.innerHTML = `<span class="mr-2" >➜</span> ${cmd} `;
    history.appendChild(commandLine);
}

// Event Listeners
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        if (cmd) {
            addCommandToHistory(cmd);
            processCommand(cmd);
            input.value = '';
            historyInput.push(cmd);
            historyIndex = historyInput.length - 1;
            console.log(historyInput);
            scrollToBottom();
        }
    }
});

// Animation Loop
function animate() {
    drawBinaryBackground();
    requestAnimationFrame(animate);
}

// Initial Setup
resizeCanvas();
animate();
changeTheme('default');
window.addEventListener('resize', resizeCanvas);
document.addEventListener('click', () => input.focus());



// function typeWriter(text, element, speed = 80) {
//     let i = 0;
//     const typing = setInterval(() => {
//         const currentChar = text.charAt(i);
//         if (currentChar === '<') {
//             const endTagIndex = text.indexOf('>', i);
//             if (endTagIndex !== -1) {
//                 element.innerHTML += text.substring(i, endTagIndex + 1);
//                 i = endTagIndex + 1;
//             }
//         } else {
//             element.innerHTML += currentChar;
//             i++;
//         }
//         if (i >= text.length) clearInterval(typing);
//     }, speed);
// }

// document.getElementById('terminal-title').innerHTML = '';
// document.getElementById('portfolio-title').innerHTML = '';

// typeWriter('<span class="key">welcome</span> to my terminal portfolio!', document.getElementById('terminal-title'));
// typeWriter('Hello, I am <span class="string">Akkal Dhami</span>', document.getElementById('portfolio-title'));