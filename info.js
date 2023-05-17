const infoBtn = document.querySelector('button.info-button');
const questionBtn = document.querySelector('button.question-button');
const infoText = document.querySelector('.default-active');

const handleInfo = (pressedButton) => {
    // select currently active info-container state
    if(infoText.classList.contains('default-active')){state = 'default-active';}
    if(infoText.classList.contains('info-active')){state = 'info-active';}
    if(infoText.classList.contains('question-active')){state = 'question-active';}
    //
    switch(state){
        case 'default-active':
            if(pressedButton === 'info'){
                infoText.classList.remove('default-active');
                infoText.classList.add('info-active');
            }
            else if(pressedButton === 'question'){
                infoText.classList.remove('default-active');
                infoText.classList.add('question-active');
            }
            break;
        case 'info-active':
            if(pressedButton === 'info'){
                infoText.classList.remove('info-active');
                infoText.classList.add('default-active');
            }
            else if(pressedButton === 'question'){
                infoText.classList.remove('info-active');
                infoText.classList.add('question-active');
                infoBtn.classList.toggle('button-active-state');
            }
            break;
        case 'question-active':
            if(pressedButton === 'info'){
                infoText.classList.remove('question-active');
                infoText.classList.add('info-active');
                questionBtn.classList.toggle('button-active-state');
            }
            else if(pressedButton === 'question'){
                infoText.classList.remove('question-active');
                infoText.classList.add('default-active');
            }
            break;
    } 
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
    console.log('12039123');
} else {
    // false for not mobile device
    infoBtn.classList.toggle('button-active-state');
    handleInfo('info');
}

infoBtn.addEventListener('click', () => {
    infoBtn.classList.toggle('button-active-state');
    handleInfo('info');
});
questionBtn.addEventListener('click', () => {
    questionBtn.classList.toggle('button-active-state');
    handleInfo('question');
});