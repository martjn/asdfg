const heading_tts_button = document.getElementById('tts');
const heading_container = document.querySelector('.heading-container');
const headingText = heading_container.textContent;
const loaderDiv = document.querySelector('.loader');
loaderDiv.style.display = 'none';

const test_tts_button = document.getElementById('speech-test-button');
const loaderDivTest = document.querySelector('.loader-test');
loaderDivTest.style.display = 'none';
// page specific selectors: info
const info_tts_button = document.getElementById('tts-info');
const loaderDivInfo = document.querySelector('.loader-info');
loaderDivInfo.style.display = 'none';
// page specific selectors: table
const table_tts_button = document.getElementById('tts-table');
const loaderDivTable = document.querySelector('.loader-table');
loaderDivTable.style.display = 'none';

/*
  Validity: up-to-date 08.05.2023
  Voices (merlin 
  450-458)
  401 => 'peeter',
  450 => 'tonu',
  451 => 'indrek',
  452 => 'kylli',
  453 => 'liivika',
  455 => 'tambet (yksiklaused)',
  456 => 'liisi',
  457 => 'riina',
  458 => 'lee',
*/
const tts_voices_list = ['401', '450', '451', '452', '453', '455', '456', '457', '458'];

let readableHeadingText = headingText.trim().replaceAll('&', 'ja').replaceAll('\n', '').replace(/\s{2,}/g, '. ').replaceAll(';',',');
const infoTextContainer = document.querySelector('.info-text');
let infoText_speech = infoTextContainer.textContent;
let infoText_speech_readable = infoText_speech.trim().replaceAll('&', 'ja').replaceAll('\n', ' ').replace(/\s{2,}/g, '. ').replaceAll(';','.').replaceAll(':', '.').replaceAll('..', '.').replace(',.', ',');

const parseUrl = async (textInput, speech_content_type) => {
  // replace whitespace with + symbol for url
  let replacedTextInput = textInput.replace(/\s+/g, '+');
  let urlString = `https://teenus.eki.ee/konesyntees?v=${tts_voices_list[selected_tts]}&t=${replacedTextInput}`;
  let parsedUrls = '';
  try {
    // show loading animation
    if(speech_content_type === 'heading'){
      heading_tts_button.style.display = 'none';
      loaderDiv.style.display = 'inline-block';
    } 
    else if (speech_content_type === 'modal'){
      test_tts_button.style.display = 'none';
      loaderDivTest.style.display = 'flex';
    }
    else if (speech_content_type === 'info'){
      info_tts_button.style.display = 'none';
      loaderDivInfo.style.display = 'inline-block';
    }
    else if (speech_content_type === 'table'){
      table_tts_button.style.display = 'none';
      loaderDivTable.style.display = 'inline-block';
    }

    const response = await fetch(urlString, {mode: 'cors'});
    const htmlString = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const divElement = doc.querySelector('body');
    const content = divElement.innerHTML;
    parsedUrls = content;
    return parsedUrls;
  } catch (error) {
    console.error(error);
    // veateade?
  }
}

let currentAudio = null; // store the currently playing audio

const playAudioUrl = async (textInput, speech_content_type) => {
  // pause the currently playing audio, if any
  if (currentAudio) {
    currentAudio.pause();
  }
  
  const parsedUrl = await parseUrl(textInput, speech_content_type);
  const parsedObject = JSON.parse(parsedUrl);
  const mp3Url = parsedObject.mp3url || parsedObject.mp3;
  const audioElement = new Audio(mp3Url);
  currentAudio = audioElement; // store the new audio as the currently playing audio

  // hide loading animation
  if(speech_content_type === 'heading'){
    heading_tts_button.style.display = 'inline-block';
    loaderDiv.style.display = 'none';
  } 
  else if (speech_content_type === 'modal'){
    test_tts_button.style.display = 'flex';
    loaderDivTest.style.display = 'none';
  }
  else if (speech_content_type === 'info'){
    info_tts_button.style.display = 'inline-block';
    loaderDivInfo.style.display = 'none';
  }
  else if (speech_content_type === 'table'){
    table_tts_button.style.display = 'inline-block';
    loaderDivTable.style.display = 'none';
  }
  
  audioElement.play();
}

heading_tts_button.addEventListener('click', function(){
  playAudioUrl(readableHeadingText, 'heading');
})

speech_test_button.addEventListener('click', function(){
  let random_idx = Math.floor(Math.random() * 4);
  random_texts = ['Minu hääl kõlab selliselt', 'Selline on minu hääletoon', 'Kõnesünteesi testimine', 'Selliselt kõlab minu hääl']
  playAudioUrl(random_texts[random_idx], 'modal');
})

info_tts_button.addEventListener('click', function(){
  playAudioUrl(infoText_speech_readable, 'info');
})

table_tts_button.addEventListener('click', function(){
  console.log(table_speech_text);
  playAudioUrl(table_speech_text, 'table');
})