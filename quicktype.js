const startButton = document.getElementById("startButton");
const inputArea = document.getElementById("input");
const quoteDisplay = document.getElementById("quote");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let startTime, endTime, timeInterval, timeLeft;
let sentences = [];
let currentSentenceIndex = 0;
let mistakes = 0;
let totalCharactersTyped = 0;
let correctCharactersTyped = 0;

function generateRandomSentence(wordsArray) {
    let sentence = '';
    for (let i = 0; i < 10; i++) { 
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        sentence += wordsArray[randomIndex] + ' ';
    }
    return sentence.trim();
}

function updateResults() {
    const userText = inputArea.value;
    totalCharactersTyped++;
    const totalTime = 60 - timeLeft;
    const typingSpeedWPM = calculateWPM(totalCharactersTyped, totalTime);
    wpmDisplay.textContent = typingSpeedWPM;
    
    updateAccuracy(userText);
    updateQuoteDisplay(userText);

    if (!isLastCharacterCorrect(userText)) {
        mistakes++;
        updateAccuracy(userText); 
        inputArea.value = userText.slice(0, -1);  
    }

    if (userText.length === sentences[currentSentenceIndex].length) {
        currentSentenceIndex++;
        if (currentSentenceIndex < sentences.length) {
            quoteDisplay.textContent = sentences[currentSentenceIndex];
            inputArea.value = '';
        } else {
            endTest();
        }
    }
}

function calculateWPM(totalCharacters, timeInSeconds) {
    const wordsTyped = totalCharacters / 5; 
    return Math.round((wordsTyped / timeInSeconds) * 60);
}

function updateAccuracy(userText) {
    const currentSentence = sentences[currentSentenceIndex];
    correctCharactersTyped = 0;

    for (let i = 0; i < userText.length; i++) {
        if (userText[i] === currentSentence[i]) {
            correctCharactersTyped++;
        }
    }

    const accuracy = (correctCharactersTyped / currentSentence.length) * 100;
    accuracyDisplay.textContent = Math.round(accuracy);
}

function updateQuoteDisplay(userText) {
    quoteDisplay.innerHTML = '';

    for (let i = 0; i < sentences[currentSentenceIndex].length; i++) {
        const span = document.createElement('span');
        span.textContent = sentences[currentSentenceIndex][i];

        if (i === userText.length) {
            
            const cursor = document.createElement('span');
            cursor.classList.add('cursor');
            cursor.textContent = '|'; 
            span.textContent = ''; 
            span.appendChild(cursor);
            span.appendChild(document.createTextNode(sentences[currentSentenceIndex][i])); // Re-add the text content
        }

        if (i < userText.length) {
            if (userText[i] === sentences[currentSentenceIndex][i]) {
                span.classList.add('correct');
            } else {
                span.classList.add('incorrect');
            }
        }

        quoteDisplay.appendChild(span);
    }
}



function isLastCharacterCorrect(userText) {
    const lastIndex = userText.length - 1;
    return userText[lastIndex] === sentences[currentSentenceIndex][lastIndex];
}

function startTest() {
    startButton.disabled = true;
    inputArea.disabled = false;
    inputArea.value = "";
    inputArea.focus();

   
    sentences.push(generateRandomSentence(wordArray));
    sentences.push(generateRandomSentence(wordArray));
    sentences.push(generateRandomSentence(wordArray));

    
    quoteDisplay.textContent = sentences[currentSentenceIndex];
    startTime = new Date().getTime();
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    mistakes = 0;
    totalCharactersTyped = 0;
    correctCharactersTyped = 0;

    timeInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            endTest();
        } else {
            timerDisplay.textContent = timeLeft;
            updateResults();
        }
    }, 1000);
}

function endTest() {
    endTime = new Date().getTime();
    const totalTime = (endTime - startTime) / 1000;
    const typingSpeedWPM = calculateWPM(totalCharactersTyped, totalTime);
    const accuracy = (correctCharactersTyped / totalCharactersTyped) * 100;

    clearInterval(timeInterval);
    timerDisplay.textContent = 0;  
    wpmDisplay.textContent = Math.round(typingSpeedWPM);
    accuracyDisplay.textContent = Math.round(accuracy);

    
    inputArea.disabled = true;
    inputArea.value = "";

    startButton.disabled = false;
}

startButton.addEventListener("click", startTest);
inputArea.addEventListener("input", updateResults);


const wordArray = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
    'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
    'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
    'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
    'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
    'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come',
    'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how',
    'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
    'any', 'these', 'give', 'day', 'most', 'us', 'food', 'dog', 'cat', 'car',
    'house', 'man', 'woman', 'child', 'money', 'job', 'friend', 'time',
    'way', 'life', 'world', 'hand', 'work', 'week', 'point', 'problem',
    'government', 'company', 'number', 'group', 'thing', 'woman', 'place',
    'day', 'year', 'family', 'fact', 'government', 'school', 'fact', 'home',
    'water', 'room', 'area', 'money', 'story', 'fact', 'month', 'lot', 'right',
    'study', 'book', 'eye', 'job', 'word', 'business', 'issue', 'side', 'kind',
    'head', 'house', 'service', 'friend', 'father', 'power', 'hour', 'game',
    'line', 'end', 'member', 'law', 'car', 'city', 'community', 'name', 'president',
    'team', 'minute', 'idea', 'kid', 'body', 'information', 'back', 'parent', 'face',
    'others', 'level', 'office', 'door', 'health', 'person', 'art', 'war', 'history',
    'party', 'result', 'change', 'morning', 'reason', 'research', 'girl', 'guy', 'moment',
    'air', 'teacher', 'force', 'education', 'pain', 'time', 'money', 'decision', 'event',
    'market', 'secret', 'team', 'future', 'company', 'road', 'church', 'material', 'career',
    'party', 'trade', 'history', 'future', 'story', 'conference', 'phone', 'resource', 'example',
    'country', 'life', 'problem', 'issue', 'case', 'child', 'system', 'level', 'group',
    'company', 'area', 'world', 'phone', 'fact', 'family', 'point', 'child', 'state',
    'week', 'activity', 'order', 'development', 'line', 'end', 'fact', 'business', 'research'
];
