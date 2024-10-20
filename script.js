let currentCharacter = null;
let experienceLevel = null;
let virtualGirl = null;
let goodBubblesCount = 0;
let clickedGoodBubbles = 0;
let popupTimer; // 全局变量，用于跟踪弹出窗口的计时器
let clickedBadBubbles = 0;


const virtualGirls = [
    {
        name: "Lina",
        age: 16,
        background: "Lina is a high school student who loves painting and often shares her artwork on social media platforms. Recently, one of her pieces was misunderstood as plagiarism, leading to a collective attack on her online. Countless netizens questioned her creativity in the comments section and made malicious speculations about her character.",
        problem: "Lina has become depressed due to the negative comments and has lost the motivation to continue creating art. She doesn't know how to deal with these attacks.",
        therapyTask: "Help Lina learn how to manage her emotions, regain her confidence, and find effective coping strategies.",
        emotionalState: 30
    },
    {
        name: "Mandy",
        age: 22,
        background: "Mandy is a popular fashion blogger focusing on style coordination. Recently, she uploaded a video about her clothing style, but was criticized for not conforming to the 'female image'. The comment section was filled with gender-discriminatory remarks.",
        problem: "Mandy feels humiliated and confused by these gender-discriminatory attacks and is unable to continue creating the content she loves.",
        therapyTask: "Guide Mandy to confront the gender bias in cyberbullying and help her find the courage to continue her self-expression.",
        emotionalState: 40
    },
    {
        name: "Megan",
        age: 20,
        background: "Megan is a college student from a minority ethnic group who often posts about racial equality on social media. However, she has been subjected to large-scale personal attacks and defamation due to her racial background, with netizens constantly insulting her ethnic identity.",
        problem: "Megan has developed an aversion to social networking and fears any public expression. She is struggling to find a balance, wanting to continue defending her beliefs but not knowing how to deal with the escalating attacks.",
        therapyTask: "Help Megan analyze the root causes of racial discrimination, enhance her psychological resilience, and support her in continuing to speak out for racial equality.",
        emotionalState: 20
    }
];

function showIntroAnimation() {
    const introAnimation = document.getElementById('intro-animation');
    introAnimation.innerHTML = `
        <div class="intro-content">
            <h1>Welcome to Cyberstorm Simulator</h1>
            <div class="animation-scene">
                <div class="girl-character"></div>
                <div class="social-media-feed"></div>
                <div class="negative-comments"></div>
            </div>
            <p class="intro-text"></p>
        </div>
    `;
    introAnimation.style.display = 'flex';
    
    // Animate the intro scene
    setTimeout(() => {
        document.querySelector('.girl-character').classList.add('active');
        document.querySelector('.intro-text').textContent = "A girl is happily using social media...";
    }, 1000);

    setTimeout(() => {
        document.querySelector('.social-media-feed').classList.add('active');
        document.querySelector('.intro-text').textContent = "She's sharing her thoughts and creations...";
    }, 3000);

    setTimeout(() => {
        document.querySelector('.negative-comments').classList.add('active');
        document.querySelector('.intro-text').textContent = "But suddenly, negative comments start pouring in...";
    }, 5000);

    setTimeout(() => {
        document.querySelector('.girl-character').classList.add('sad');
        document.querySelector('.intro-text').textContent = "The girl becomes overwhelmed and distressed...";
    }, 7000);

    setTimeout(() => {
        document.querySelector('.intro-text').textContent = "Cyberbullying hurts more than you might think.";
    }, 9000);

    setTimeout(() => {
        introAnimation.style.display = 'none';
        document.getElementById('login-container').style.display = 'flex';
    }, 12000);
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('character-creation').style.display = 'flex';
    } else {
        alert('Please enter a valid username and password!');
    }
}

function createCharacter() {
    const name = document.getElementById('character-name').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const interests = document.getElementById('interests').value;
    const backgroundStory = document.getElementById('background-story').value;

    if (name && gender && age) {
        currentCharacter = { name, gender, age, interests, backgroundStory };
        document.getElementById('character-creation').style.display = 'none';
        document.getElementById('experience-level').style.display = 'flex';
    } else {
        alert('Please fill in all required fields!');
    }
}

function setExperienceLevel(level) {
    experienceLevel = level;
    document.getElementById('experience-level').style.display = 'none';
    document.getElementById('scene-intro').style.display = 'flex';

    // 根据选择的难度级别设置不同的图片
    const sceneImage = document.getElementById('scene-image');
    sceneImage.src = level === 'intense' ? 'user.jpg' : `${level}.jpg`;

    // 选择一个虚拟女孩角色
    selectVirtualGirl();
}

function selectVirtualGirl() {
    // Randomly select a virtual girl based on the experience level
    const availableGirls = virtualGirls.filter(girl => {
        if (experienceLevel === 'light') return girl.emotionalState >= 30;
        if (experienceLevel === 'medium') return girl.emotionalState >= 20 && girl.emotionalState < 40;
        if (experienceLevel === 'intense') return girl.emotionalState < 30;
    });
    
    virtualGirl = availableGirls[Math.floor(Math.random() * availableGirls.length)];
    showSceneIntro();
}

function showSceneIntro() {
    const sceneIntro = document.getElementById('scene-intro');
    const characterStory = document.getElementById('character-story');
    
    characterStory.innerHTML = `
        <h3>Meet ${virtualGirl.name}</h3>
        <p><strong>Age:</strong> ${virtualGirl.age}</p>
        <p><strong>Background:</strong> ${virtualGirl.background}</p>
        <p><strong>Current Problem:</strong> ${virtualGirl.problem}</p>
        <p><strong>Your Task:</strong> ${virtualGirl.therapyTask}</p>
        <p><strong>Current Emotional State:</strong> ${getEmotionDescription(virtualGirl.emotionalState)}</p>
    `;
    
    sceneIntro.style.display = 'flex';
}

function getEmotionDescription(emotionalState) {
    if (emotionalState < 30) return "Deeply distressed";
    if (emotionalState < 50) return "Upset";
    if (emotionalState < 70) return "Concerned";
    if (emotionalState < 90) return "Calm";
    return "Confident";
}

function startTherapy() {
    document.getElementById('scene-intro').style.display = 'none';
    document.getElementById('therapy-room').style.display = 'flex';
    initTherapySession();
}

function initTherapySession() {
    virtualGirl.emotionalState = 0;
    updateEmotionBar(0);
    showVirtualCharacter();
    clearDialogueOptions(); // 新增：清除对话选项
    showDialogueOptions();
}

function showVirtualCharacter() {
    const virtualCharacterDiv = document.getElementById('virtual-character');
    virtualCharacterDiv.innerHTML = `
        <div class="virtual-girl ${virtualGirl.name.toLowerCase()}">
            <div class="girl-image"></div>
            <div class="girl-name">${virtualGirl.name}</div>
            <div class="girl-emotion">${getEmotionDescription()}</div>
        </div>
    `;
}

function getEmotionDescription() {
    if (virtualGirl.emotionalState < 30) return "Deeply distressed";
    if (virtualGirl.emotionalState < 50) return "Upset";
    if (virtualGirl.emotionalState < 70) return "Concerned";
    if (virtualGirl.emotionalState < 90) return "Calm";
    return "Confident";
}

function showDialogueOptions() {
    const dialogueOptions = document.getElementById('dialogue-options');
    const options = generateMixedOptions();
    
    dialogueOptions.innerHTML = options.map(option => 
        `<div class="bubble ${option.type}" onclick="handleBubbleClick(this, '${option.type}')">${option.text}</div>`
    ).join('');

    updateEmotionBar(0); // Reset emotion bar
}

function generateMixedOptions() {
    const goodOptions = [
        { type: 'empathize', text: `Empathize with ${virtualGirl.name}` },
        { type: 'encourage', text: `Encourage ${virtualGirl.name}` },
        { type: 'explore', text: 'Explore feelings' },
        { type: 'educate', text: 'Educate about cyberbullying' },
        { type: 'empower', text: `Empower ${virtualGirl.name}` },
        { type: 'validate', text: `Validate ${virtualGirl.name}'s feelings` },
        { type: 'support', text: `Offer support to ${virtualGirl.name}` },
        { type: 'strategize', text: `Help ${virtualGirl.name} develop strategies` }
    ];

    const badOptions = [
        { type: 'dismiss', text: 'Dismiss the problem' },
        { type: 'blame', text: 'Suggest it might be her fault' },
        { type: 'minimize', text: 'Minimize the issue' },
        { type: 'distract', text: 'Change the subject' },
        { type: 'generalize', text: 'Make a generalization' },
        { type: 'criticize', text: 'Criticize her reaction' },
        { type: 'ignore', text: 'Ignore the issue' },
        { type: 'joke', text: 'Make a joke about it' }
    ];

    // Randomly select 5 good options and 3 bad options
    const selectedGood = shuffleArray(goodOptions).slice(0, 5);
    const selectedBad = shuffleArray(badOptions).slice(0, 3);

    goodBubblesCount = selectedGood.length;
    clickedGoodBubbles = 0;

    return shuffleArray([...selectedGood, ...selectedBad]);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function chooseDialogue(type, emotionChange) {
    let dialogue = '';
    switch (type) {
        case 'empathize':
            dialogue = generateEmpathizeResponse();
            break;
        case 'encourage':
            dialogue = generateEncourageResponse();
            break;
        case 'explore':
            dialogue = generateExploreResponse();
            break;
        case 'educate':
            dialogue = generateEducateResponse();
            break;
        case 'empower':
            dialogue = generateEmpowerResponse();
            break;
        case 'validate':
            dialogue = generateValidateResponse();
            break;
        case 'support':
            dialogue = generateSupportResponse();
            break;
        case 'strategize':
            dialogue = generateStrategizeResponse();
            break;
        case 'dismiss':
            dialogue = generateDismissResponse();
            break;
        case 'blame':
            dialogue = generateBlameResponse();
            break;
        // ... (其他负面选项)
    }
    return dialogue;
}

function generateEmpathizeResponse() {
    const responses = [
        `${virtualGirl.name}, I can see how deeply this has affected you. It's completely natural to feel hurt and overwhelmed by such cruel comments. Your feelings are valid, and you're incredibly brave for sharing this with me.`,
        `I'm so sorry you're going through this, ${virtualGirl.name}. It must be incredibly painful to face such harsh judgment and criticism. Please know that you're not alone in this, and your feelings matter.`,
        `${virtualGirl.name}, my heart goes out to you. Dealing with online harassment can be incredibly isolating and hurtful. I want you to know that I'm here to listen and support you through this difficult time.`,
        `It's understandable to feel overwhelmed, ${virtualGirl.name}. Cyberbullying can be incredibly traumatic, and your reaction is completely valid. Let's work through these feelings together.`,
        `${virtualGirl.name}, I want you to know that your pain is real and acknowledged. It takes great courage to face these challenges, and I'm here to support you every step of the way.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateEncourageResponse() {
    const responses = [
        `${virtualGirl.name}, I want you to know that you're so much more than these hurtful comments. Your creativity and passion are what truly define you. Don't let the words of strangers dim your light.`,
        `Remember, ${virtualGirl.name}, that those who try to bring you down are already below you. Your strength in facing this shows just how remarkable you are. Keep shining, and don't let them steal your joy.`,
        `${virtualGirl.name}, I believe in you. This challenging time will pass, and you'll emerge stronger. Your voice and your art matter, and there are so many people out there who appreciate and support you.`,
        `You have an incredible spirit, ${virtualGirl.name}. These bullies can't take away your talent or your worth. Keep creating, keep expressing yourself, and know that you have the power to rise above this.`,
        `${virtualGirl.name}, every artist faces criticism, but it's your passion and dedication that truly matter. Your work touches people in ways you might not even realize. Don't let the negativity overshadow your gifts.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateExploreResponse() {
    const responses = [
        `Can you tell me more about how these comments make you feel, ${virtualGirl.name}? It's important to acknowledge and understand our emotions, even when they're painful.`,
        `${virtualGirl.name}, when you read these hurtful comments, what thoughts go through your mind? Understanding our thought patterns can help us challenge negative beliefs.`,
        `I'm curious, ${virtualGirl.name}, how has this experience affected your daily life and your passion for your art? Let's explore the impact together and find ways to reclaim your joy.`,
        `${virtualGirl.name}, on a scale of 1 to 10, how much do you feel these comments reflect on your true self? Let's discuss why you chose that number.`,
        `Can you describe a moment when you felt particularly strong in the face of these challenges, ${virtualGirl.name}? Understanding our resilience can be very empowering.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateEducateResponse() {
    const responses = [
        `${virtualGirl.name}, it's important to understand that cyberbullying often says more about the bullies than it does about you. Many times, people who engage in online harassment are dealing with their own insecurities and problems.`,
        `Did you know, ${virtualGirl.name}, that many celebrities and successful artists have also faced online harassment? It's a widespread issue, but it doesn't reflect your worth or talent.`,
        `${virtualGirl.name}, let's talk about the psychology behind cyberbullying. Understanding why people behave this way online can help us detach from their words and recognize that it's not personal.`,
        `It's crucial to remember, ${virtualGirl.name}, that anonymity online often brings out the worst in people. Their words are not a reflection of reality, but rather a symptom of a larger societal issue.`,
        `${virtualGirl.name}, research shows that cyberbullies often lack empathy or are seeking attention. Knowing this can help us approach their comments with a more objective perspective.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateEmpowerResponse() {
    const responses = [
        `${virtualGirl.name}, you have the power to control your online environment. We can explore tools like comment filtering, blocking users, and adjusting your privacy settings to create a safer space for you.`,
        `Your voice matters, ${virtualGirl.name}. Have you considered using your platform to speak out against cyberbullying? Many artists have turned their experiences into powerful messages that resonate with others.`,
        `${virtualGirl.name}, let's focus on building a support network. Connecting with other artists who've faced similar challenges can provide you with encouragement, advice, and a sense of community.`,
        `Remember, ${virtualGirl.name}, you have the right to set boundaries online. It's okay to take breaks, limit your social media time, or even temporarily deactivate accounts if you need to protect your mental health.`,
        `${virtualGirl.name}, your art is your superpower. Let's think about ways you can channel these negative experiences into your creative work, turning pain into powerful self-expression.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateValidateResponse() {
    const responses = [
        `${virtualGirl.name}, I want you to know that your feelings are completely valid. It's natural to feel hurt and upset in the face of such negativity.`,
        `What you're experiencing is real and significant, ${virtualGirl.name}. Don't let anyone downplay the impact of cyberbullying on your emotional well-being.`,
        `It's okay to feel angry, sad, or confused, ${virtualGirl.name}. These are all normal reactions to an abnormal situation. Your feelings are important and deserve to be acknowledged.`,
        `${virtualGirl.name}, I hear you, and I believe you. The pain you're feeling is real, and it's not something you should have to face alone.`,
        `Your experiences and emotions are valid, ${virtualGirl.name}. It's important to give yourself permission to feel and process these difficult emotions.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateSupportResponse() {
    const responses = [
        `${virtualGirl.name}, I want you to know that you're not alone in this. There are people and resources available to support you through this difficult time.`,
        `Let's explore some support options together, ${virtualGirl.name}. Whether it's talking to a counselor, joining a support group, or connecting with other artists, there are many ways to find help.`,
        `${virtualGirl.name}, remember that seeking support is a sign of strength, not weakness. It's okay to reach out for help when you need it.`,
        `I'm here to support you, ${virtualGirl.name}, and there are others who want to help too. Let's think about who in your life you can turn to for additional support and understanding.`,
        `You don't have to face this alone, ${virtualGirl.name}. There are organizations and hotlines specifically dedicated to helping people dealing with cyberbullying. Would you like to know more about these resources?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateStrategizeResponse() {
    const responses = [
        `${virtualGirl.name}, let's work together to develop some strategies for dealing with cyberbullying. We can start by identifying your personal boundaries and creating a plan to enforce them online.`,
        `One effective strategy, ${virtualGirl.name}, is to document the harassment. This can be useful if you decide to report the bullying or seek help from platform moderators.`,
        `${virtualGirl.name}, have you considered creating a self-care routine for after you use social media? This can help mitigate the emotional impact of negative interactions online.`,
        `Let's brainstorm some positive affirmations you can use, ${virtualGirl.name}, to counter negative comments. Reminding yourself of your worth and talent can be a powerful tool.`,
        `${virtualGirl.name}, we could explore the idea of creating a 'positivity folder' - a collection of kind messages, achievements, and positive feedback to look at when you're feeling down.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateDismissResponse() {
    const responses = [
        `Oh come on, ${virtualGirl.name}, it's just the internet. Don't take it so seriously.`,
        `Everyone gets mean comments sometimes. You should just ignore them, ${virtualGirl.name}.`,
        `I think you're overreacting, ${virtualGirl.name}. It's not that big of a deal.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateBlameResponse() {
    const responses = [
        `Well, ${virtualGirl.name}, maybe if you didn't post so much online, this wouldn't happen.`,
        `Have you considered that your content might be inviting these comments, ${virtualGirl.name}?`,
        `${virtualGirl.name}, if you can't handle criticism, maybe you shouldn't be sharing your work online.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateMinimizeResponse() {
    const responses = [
        `It's just words on a screen, ${virtualGirl.name}. They can't really hurt you.`,
        `I think you're making a mountain out of a molehill, ${virtualGirl.name}.`,
        `${virtualGirl.name}, there are people with real problems in the world. This isn't that serious.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateDistractResponse() {
    const responses = [
        `Hey ${virtualGirl.name}, did you see that new movie that came out last week?`,
        `${virtualGirl.name}, have you tried that new restaurant downtown? The food is amazing!`,
        `So ${virtualGirl.name}, what are your plans for the weekend?`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function generateGeneralizeResponse() {
    const responses = [
        `You know, ${virtualGirl.name}, the internet is just full of trolls. That's how it is for everyone.`,
        `${virtualGirl.name}, in my day we didn't have these problems. Kids these days are too sensitive.`,
        `That's just how social media works, ${virtualGirl.name}. You have to develop a thick skin.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function updateEmotionBar(emotionChange) {
    const emotionLevel = document.getElementById('emotion-level');
    virtualGirl.emotionalState = Math.max(0, Math.min(100, virtualGirl.emotionalState + emotionChange));
    emotionLevel.style.width = virtualGirl.emotionalState + '%';
}

function updateVirtualGirlResponse(emotionChange, dialogue) {
    const virtualCharacterDiv = document.getElementById('virtual-character');
    const girlEmotion = virtualCharacterDiv.querySelector('.girl-emotion');
    girlEmotion.textContent = getEmotionDescription();
    
    let response = '';
    if (emotionChange > 0) {
        if (emotionChange > 10) {
            response = `${virtualGirl.name}'s eyes light up, and she seems to feel much more at ease. "Thank you for understanding," she says softly.`;
        } else if (emotionChange > 5) {
            response = `${virtualGirl.name} nods slowly, a small smile forming on her face. "I hadn't thought about it that way before," she admits.`;
        } else {
            response = `${virtualGirl.name} takes a deep breath, her shoulders relaxing slightly. "It helps to talk about this," she says.`;
        }
    } else {
        if (emotionChange < -10) {
            response = `${virtualGirl.name}'s face falls, and she looks visibly upset. "I don't think you understand how serious this is," she says, her voice trembling.`;
        } else if (emotionChange < -5) {
            response = `${virtualGirl.name} frowns, looking more distressed than before. "That's not really helpful," she says quietly.`;
        } else {
            response = `${virtualGirl.name} looks down, her expression troubled. "I'm not sure if that helps," she says quietly.`;
        }
    }
    
    showCommentPopup(dialogue + "\n\n" + response);
}

function showCommentPopup(text) {
    const commentPopup = document.getElementById('comment-popup');
    commentPopup.innerHTML = `
        <p>${text}</p>
        <button class="close-popup">Close</button>
    `;
    commentPopup.style.display = 'block';
    commentPopup.style.opacity = '1';

    // 清除之前的计时器（如果存在）
    if (popupTimer) {
        clearTimeout(popupTimer);
    }

    const closeButton = commentPopup.querySelector('.close-popup');
    closeButton.addEventListener('click', () => {
        clearTimeout(popupTimer); // 清除自动关闭计时器
        fadeOutPopup(commentPopup);
    });

    // 设置新的计时器
    popupTimer = setTimeout(() => {
        fadeOutPopup(commentPopup);
    }, 10000); // 10秒后自动开始淡出
}

function fadeOutPopup(element) {
    clearTimeout(popupTimer); // 确保没有待处理的自动关闭
    let opacity = 1;
    const fadeEffect = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.1;
            element.style.opacity = opacity;
        } else {
            clearInterval(fadeEffect);
            element.style.display = 'none';
        }
    }, 50);
}

function endSession(success) {
    const therapyRoom = document.getElementById('therapy-room');
    const conclusion = document.getElementById('conclusion');
    const sessionFeedback = document.getElementById('session-feedback');
    const reflectionPrompts = document.getElementById('reflection-prompts');
    const endImage = document.getElementById('end-image');

    therapyRoom.style.display = 'none';
    conclusion.style.display = 'flex';

    if (success) {
        endImage.src = 'end.jpg';
        sessionFeedback.innerHTML = `
            <h3>Great job!</h3>
            <p>You've successfully helped ${virtualGirl.name} cope with her cyberbullying experience. Here's what you did well:</p>
            <ul>
                <li>Showed empathy and understanding</li>
                <li>Provided practical advice for dealing with online harassment</li>
                <li>Boosted ${virtualGirl.name}'s confidence and self-esteem</li>
            </ul>
        `;
    } else {
        endImage.src = 'failed.jpg';
        sessionFeedback.innerHTML = `
            <h3>Room for Improvement</h3>
            <p>${virtualGirl.name}'s condition has worsened. Here are some areas to focus on for next time:</p>
            <ul>
                <li>Be more empathetic to the victim's feelings</li>
                <li>Provide more concrete and actionable advice</li>
                <li>Help the victim understand the nature of cyberbullying better</li>
            </ul>
        `;
    }
    
    reflectionPrompts.innerHTML = `
        <h3>Reflection Questions:</h3>
        <ol>
            <li>How would you handle cyberbullying if you experienced it personally?</li>
            <li>What can you do to help others who are being cyberbullied?</li>
            <li>How can social media platforms improve their policies to prevent cyberbullying?</li>
            <li>What role do bystanders play in cyberbullying situations?</li>
        </ol>
    `;
}

function restartGame() {
    document.getElementById('conclusion').style.display = 'none';
    document.getElementById('experience-level').style.display = 'flex';
    
    virtualGirl = null;
    goodBubblesCount = 0;
    clickedGoodBubbles = 0;
    clickedBadBubbles = 0;
    
    document.getElementById('emotion-level').style.width = '0%';
    clearDialogueOptions(); // 新增：清除对话选项
}

function handleBubbleClick(bubble, type) {
    if (bubble.classList.contains('clicked')) return;

    bubble.classList.add('clicked');
    let emotionChange = 0;

    if (['dismiss', 'blame', 'minimize', 'distract', 'generalize', 'criticize', 'ignore', 'joke'].includes(type)) {
        bubble.classList.add('bad-bubble');
        clickedBadBubbles++;
        emotionChange = -10;
    } else {
        clickedGoodBubbles++;
        emotionChange = 20;
    }

    const dialogue = chooseDialogue(type, emotionChange);
    updateEmotionBar(emotionChange);
    updateVirtualGirlResponse(emotionChange, dialogue);
    checkSessionEnd();
}

function checkSessionEnd() {
    if (clickedGoodBubbles === goodBubblesCount && clickedBadBubbles === 0) {
        updateEmotionBar(100 - virtualGirl.emotionalState);
        setTimeout(() => endSession(true), 1000);
    } else if (clickedBadBubbles > 0) {
        setTimeout(() => endSession(false), 1000);
    }
}

function showReviewsAndResources() {
    document.getElementById('conclusion').style.display = 'none';
    document.getElementById('reviews-resources').style.display = 'flex';
    
    const reviewsResources = document.getElementById('reviews-resources');
    reviewsResources.innerHTML = `
        <h2>User Reviews, Anti-Cyberbullying Resources, and Information</h2>
        <div class="accordion">
            <h3 onclick="toggleAccordion(this)">User Reviews</h3>
            <div class="content">
                <ul>
                    <li>"This game really opened my eyes to the impact of cyberbullying. It’s not just 'words on a screen'—it can affect someone’s entire sense of self-worth." - Sarah, 16</li>
                    <li>"I had no idea how deeply online harassment could scar someone. The game helped me realize the importance of standing up for my friends when they’re being targeted online." - Xuanyi Lyu, 21</li>
                    <li>"As a teacher, I found this simulator incredibly helpful in understanding what my students might be going through. It's a fantastic tool to foster empathy." - Ms. Johnson, 34</li>
                    <li>"The part where I had to help victims rebuild their confidence hit me hard. It made me rethink how careless words can snowball into real emotional damage." - Alex, 19</li>
                    <li>"The interactive nature of the game made it easy to relate to the scenarios. It gave me tools to both protect myself online and offer better support to others." - Emma, 22</li>
                    <li>"This was not just a game for me—it felt like a life lesson. I now understand that silence is also a form of complicity. It's our responsibility to speak out." - Daniel, 17</li>
                    <li>"The realism in this game was unsettling but necessary. It mirrored situations I have witnessed, and playing through them gave me a new perspective on how to act differently." - Laura, 27</li>
                </ul>
            </div>
        </div>
        <div class="accordion">
            <h3 onclick="toggleAccordion(this)">Anti-Cyberbullying Resources</h3>
            <div class="content">
                <ul>
                    <li><a href="https://www.stopbullying.gov/" target="_blank">StopBullying.gov</a> – Offers practical advice and resources from government agencies on recognizing, preventing, and responding to bullying.</li>
                    <li><a href="https://cyberbullying.org/" target="_blank">Cyberbullying Research Center</a> – Provides research-backed insights and strategies to combat online harassment and foster positive digital behavior.</li>
                    <li><a href="https://www.netsmartz.org/" target="_blank">NetSmartz</a> – A program that provides interactive tools and resources for kids, parents, and educators to promote safe online behavior.</li>
                </ul>
            </div>
        </div>
        <div class="accordion">
            <h3 onclick="toggleAccordion(this)">Understanding Cyberbullying: Background, History, and Impact</h3>
            <div class="content">
                <p>Cyberbullying, a phenomenon that arose with the advent of digital communication, represents a new challenge in the digital age. As social media became more embedded in daily life, so too did the opportunities for online harassment and abuse.</p>
                <p>The term "cyberbullying" emerged in the early 2000s as awareness grew around online aggression. Unlike traditional bullying, cyberbullying has the potential to occur 24/7, exposing victims to unrelenting attacks. Perpetrators often remain anonymous, amplifying the harm and complicating efforts to address the issue.</p>

                <h4>Key Facts about Cyberbullying</h4>
                <ul>
                    <li>A UNESCO report from 2019 found that nearly one in three students worldwide had experienced some form of cyberbullying.</li>
                    <li>According to the Cyberbullying Research Center, about 37% of youth aged 12–17 have encountered online harassment.</li>
                    <li>Research indicates that cyberbullying victims are 2 to 9 times more likely to consider suicide, underscoring the severity of the issue.</li>
                </ul>

                <h4>Notable Real-Life Cases</h4>
                <ul>
                    <li><strong>Mallory Grossman (2017)</strong>: A 12-year-old from New Jersey who tragically took her own life after enduring relentless bullying, both online and in school.</li>
                    <li><strong>Amanda Todd (2012)</strong>: This Canadian teenager suffered years of cyberbullying and blackmail, which ultimately led to her suicide and sparked global awareness about online harassment.</li>
                    <li><strong>Hana Kimura (2020)</strong>: A professional wrestler and reality TV star in Japan, Hana was subjected to harsh online criticism that contributed to her tragic suicide.</li>
                </ul>

                <p>The impact of cyberbullying extends far beyond the virtual world, causing lasting psychological trauma. Victims often experience feelings of isolation, anxiety, and depression, with young women and marginalized communities being particularly vulnerable to gender-based and identity-targeted harassment.</p>

                <h4>The Purpose of This Game</h4>
                <p>This game aims to raise awareness about the psychological toll of cyberbullying, especially on women. It offers players a chance to experience the emotional complexity involved in helping victims, shedding light on how small actions can either help or harm.</p>

                <p>Players take on the role of a psychologist working with virtual victims of cyberbullying, helping them process their trauma and regain their self-esteem. The experience is designed not only to educate but to inspire empathy and action. By walking in the shoes of both victims and supporters, players come away with a deeper understanding of how words can impact others and how to create positive change in online spaces.</p>

                <p><strong>Cyberbullying is more than just "words on a screen." It is a real form of violence that has lasting consequences on mental health and well-being.</strong> Through this game, players witness the destructiveness of online abuse, but they also see the potential for healing when people come together to support one another.</p>

                <h4>Call to Action: Building a Safer Online Space</h4>
                <p>Cyberbullying may seem overwhelming, but change is within reach. <strong>We all have a role to play in fostering safer, more respectful online communities.</strong> This involves speaking out against harassment, supporting those who are targeted, and promoting kindness in our interactions.</p>

                <p>We must work collectively to protect vulnerable groups, including women and marginalized communities, from the pervasive threats of online abuse. Everyone can contribute—whether by advocating for change, educating others, or challenging abusive behavior whenever it arises.</p>

                <p>Ultimately, this game is not just about raising awareness; it is about inspiring action. We hope that by engaging with the scenarios and stories in this game, you feel empowered to make a difference. Every small step counts in the fight against cyberbullying. Together, we can create a safer and more inclusive internet for everyone.</p>
            </div>
        </div>
        <button onclick="hideReviewsAndResources()">Back to Summary</button>
    `;
}


function toggleAccordion(element) {
    const content = element.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

function hideReviewsAndResources() {
    document.getElementById('reviews-resources').style.display = 'none';
    document.getElementById('conclusion').style.display = 'flex';
}

function skipLogin() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('character-creation').style.display = 'flex';
}

function skipCharacterCreation() {
    currentCharacter = {
        name: "Anonymous User",
        gender: "Not specified",
        age: "Not specified",
        interests: "Not specified",
        backgroundStory: "Not specified"
    };
    document.getElementById('character-creation').style.display = 'none';
    document.getElementById('experience-level').style.display = 'flex';
}

// 新增函数：清除对话选项
function clearDialogueOptions() {
    const dialogueOptions = document.getElementById('dialogue-options');
    dialogueOptions.innerHTML = '';
    clickedGoodBubbles = 0;
    clickedBadBubbles = 0;
}

// Start the game
showIntroAnimation();
