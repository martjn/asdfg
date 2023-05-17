// Appearance options variables
const radiosContrast = document.querySelectorAll('input[type=radio][name=flexRadioContrast]');
const textSizeRange = document.querySelector('#textSizeRange');
const textSizeValue = document.querySelector('#textSizeValue');
const lineHeightRange = document.querySelector('#lineHeightRange');
const lineHeightValue = document.querySelector('#lineHeightValue');
const body = document.querySelector('body');
const imgElement = document.querySelector('.img-fluid');
const acessibilityDefaultBtn = document.getElementById('idAccessibilityDefault');
const allElements = document.querySelectorAll('body *');
const navBarLogos = {
  '0': './svg/EKM-logo-light-navbar.svg',
  '1': './svg/EKM-logo-dark-navbar.svg'
}

// TTS options variables //
const modal_menu_appearance_btn = document.getElementById('modal-appearance-settings-btn');
const modal_menu_speech_btn = document.getElementById('modal-speech-settings-btn');
const modal_menu_appearance_options = document.getElementById('modal-appearance-options');
const modal_menu_speech_options = document.getElementById('modal-speech-options');
const form_tts = document.getElementById('id-speech-form');
const selected_voice_span = document.getElementById('selected-voice-span');
const speech_test_button = document.getElementById('speech-test-button');
let selected_tts = 0;
//

const defaultSettings = {
  textSize: '0',
  lineHeight: '1',
  contrast: '0',
  navBarLogo: '0',
  tts_voice: '0'
}

// import default line height & text size range value from DOM
textSizeValue.textContent = textSizeRange.value;
lineHeightValue.textContent = lineHeightRange.value;

// Set default modal-menu active
modal_menu_appearance_btn.classList.add('active');
modal_menu_speech_btn.classList.remove('active');
modal_menu_appearance_options.classList.remove('d-none');
modal_menu_speech_options.classList.add('d-none');

const saveSettingTextSize = (textSizeRadioValue) => {
  textSizeValue.textContent = textSizeRadioValue;
  textSizeRange.value = textSizeRadioValue;
  // change css selector 'body { font-size: ${calculated value}rem ;}'
  document.documentElement.style.fontSize = `${1 + (textSizeRadioValue * 0.125)}rem`;
}

const saveSettingLineHeight = (lineHeightRangeValue) => {
  lineHeightValue.textContent = lineHeightRangeValue;
  lineHeightRange.value = lineHeightRangeValue;
  // loop over each element and set their line-heights equal to calculated value'
  allElements.forEach(element => {
    element.style.setProperty('line-height', `calc(150% * ${lineHeightRangeValue})`, 'important');
  })
}

const saveSettingContrast = (contrastSettingValue) => {
  contrastSettingValue === '0' ? body.classList.remove('contrast') : body.classList.add('contrast');
  imgElement.src = navBarLogos[`${contrastSettingValue}`];
  radiosContrast.forEach((radio, index) => {
    if (radio.value === contrastSettingValue) {
      radio.checked = true;
    }
  });
}

const restoreDefaultSettings = () => {
  saveSettingLineHeight(defaultSettings.lineHeight);
  saveSettingTextSize(defaultSettings.textSize);
  saveSettingContrast(defaultSettings.contrast);
  saveSettingSpeech(defaultSettings.tts_voice);
  localStorage.clear();
}

const saveToLocalStorage = (keyName, keyValue) => {
  localStorage.setItem(keyName, keyValue);
}

const loadFromLocalStorage = () => {
  // if keyValue is nullish set predefined default value
  saveSettingTextSize(localStorage.getItem('textSize') ?? defaultSettings.textSize);
  saveSettingLineHeight(localStorage.getItem('lineHeight') ?? defaultSettings.lineHeight);
  saveSettingContrast(localStorage.getItem('contrast') ?? defaultSettings.contrast);
  saveSettingSpeech(localStorage.getItem('speech') ?? defaultSettings.tts_voice);
}

const saveSettingSpeech = (speechSettingValue) => {
  saveToLocalStorage('speech', speechSettingValue);
  document.getElementById(`option-speech-${speechSettingValue}`).checked = true;
  selected_tts = speechSettingValue;
  let label_value = document.getElementById(`label-speech-${speechSettingValue}`).innerHTML;
  selected_voice_span.textContent = `Valitud hääl: ${label_value}`;


}

// Init event listeners
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

for(let i = 0; i <= 8; i++){
  document.getElementById(`option-speech-${i}`).addEventListener('change', function(){
    saveSettingSpeech(this.value);
    
  })
}

acessibilityDefaultBtn.addEventListener('click', restoreDefaultSettings);

textSizeRange.addEventListener('input', function(){
  saveSettingTextSize(this.value);
  saveToLocalStorage('textSize', this.value);
})

lineHeightRange.addEventListener('input', function(){
  saveSettingLineHeight(this.value);
  saveToLocalStorage('lineHeight', this.value);
});

radiosContrast.forEach(radio => {
  radio.addEventListener('change', function(){
    saveSettingContrast(this.value);
    saveToLocalStorage('contrast', this.value);
  })
})

modal_menu_appearance_btn.addEventListener('click', function(){
    modal_menu_appearance_btn.classList.add('active');
    modal_menu_speech_btn.classList.remove('active');
    modal_menu_appearance_options.classList.remove('d-none');
    modal_menu_speech_options.classList.add('d-none');
})
modal_menu_speech_btn.addEventListener('click', function(){
    modal_menu_appearance_btn.classList.remove('active');
    modal_menu_speech_btn.classList.add('active');
    modal_menu_appearance_options.classList.add('d-none');
    modal_menu_speech_options.classList.remove('d-none');
})

