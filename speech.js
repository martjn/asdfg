const heading_tts_button = document.getElementById('tts');
let is_tts_playing = false;
const heading_container = document.querySelector('.heading-container');
const headingText = heading_container ? heading_container.textContent : '';
const loaderDiv = document.querySelector('.loader');
if(loaderDiv){
  loaderDiv.style.display = 'none';
}


const test_tts_button = document.getElementById('speech-test-button');
const loaderDivTest = document.querySelector('.loader-test');
loaderDivTest.style.display = 'none';
/*
  Last checked: 03.05.2023
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

let readableText = headingText.trim().replaceAll('&', 'ja').replaceAll('\n', '').replace(/\s{2,}/g, '. ').replaceAll(';',',');

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
    const response = await fetch(urlString);
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
  audioElement.play();
}
if(heading_tts_button){
  heading_tts_button.addEventListener('click', function(){
    playAudioUrl(readableText, 'heading');
  })
}


speech_test_button.addEventListener('click', function(){
  let random_idx = Math.floor(Math.random() * 4);
  random_texts = ['Minu hääl kõlab selliselt', 'Selline on minu hääletoon', 'Kõnesünteesi testimine', 'Selliselt kõlab minu hääl']
  playAudioUrl(random_texts[random_idx], 'modal');
})