const toc = document.getElementById('toc');
toc.style.display = 'none';
const tocButton = document.getElementById('toc-button');
const toc_col_toggler = document.getElementById('toc-col-toggler');
const allTocButtons = document.querySelectorAll('[id^="toc-button-"');

const chapters_element = document.getElementById('chapters');
const allChapters = document.querySelectorAll('[id^=chapter-');

const prev_page_btn = document.getElementById('prev-button-bottom');
const next_page_btn = document.getElementById('next-button-bottom');

let current_page = '0';

const renderPage = (arg_id) => {

    localStorage.setItem('active_chapter_de', arg_id);

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    if(arg_id === '0'){
        prev_page_btn.style.display = 'none';
        next_page_btn.style.display = 'block';
    }
    else if (arg_id === '12') {
        prev_page_btn.style.display = 'block';
        next_page_btn.style.display = 'none';
    }
    else {
        prev_page_btn.style.display = 'block';
        next_page_btn.style.display = 'block';
    }
    allChapters.forEach(chapter => {
        id = chapter.id.split('-')[1];
        
        if(id === arg_id){
            chapter.style.display = 'block';
        }
        else{
            chapter.style.display = 'none';
        }
    })
}

// Content handling  
const chapters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
const contentAreaPrefix = 'chapter-';

for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const chapterFile = new XMLHttpRequest();
    const contentArea = document.getElementById(`${contentAreaPrefix}${i+2}`);

    chapterFile.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let lines = this.responseText.split('\n');
            let j = 0;
            let k = 0;
            let linesFormatted = lines.map(line => {
            // Do nothing if the line is empty or contains only whitespace
            if( line.trim() === '') {
            return;
            }
            if(line.startsWith('<')){
                return line;
            }

            // If line starts with one capital letter and a dot 'B.':
            // surround the line with h1 tags
            if (/^[A-Z]\./.test(line.substring(0, 10))) {
                return `<h1>${line}</h1>`;
            } 
            // Else if line starts with two capital letters and a dot 'BA.':
            // surround the line with h2 tags
            else if (/^[A-Z][A-Z]\./.test(line.substring(0, 10))) {
                k = 0;
                return `<h2 id='chapter-${i+2}-${j++}'>${line}</h2>`;
            } 
            // Else if line starts with:
            // three capital letters and a dot 'BAA.' or a number and a dot '21.' or '[' symbol:
            // surround the line with h3 tags
            else if (/^[A-Z][A-Z][A-Z]\.|[1-999]\.|\[/.test(line.substring(0, 10))) {

                return `<h3 id='chapter-${i+2}-${j}-${k++}'>${line}</h3>`;
            } 
            // Finally if line starts with neither of these,
            // surround the line with <p> tags
            else {

                return `<p>${line}</p>`;
            }      
        }).join('\n');

        contentArea.innerHTML = linesFormatted;
        }
    }

    chapterFile.open("GET", `./content_de/chapter${chapter}.txt`, true);
    chapterFile.send();
}

// Toggle the table of contents when the button is clicked
tocButton.addEventListener('click', function () {
    tocButton.classList.toggle('toc-button-active');

    if (toc_col_toggler.classList.contains('col-lg-3')) {
        toc_col_toggler.classList.remove('col-lg-3');
        toc_col_toggler.classList.add('col-lg-2');
        chapters_element.classList.remove('col-lg-9');
        chapters_element.classList.add('col-lg-10');
    } else {
        toc_col_toggler.classList.remove('col-lg-2');
        toc_col_toggler.classList.add('col-lg-3');
        chapters_element.classList.remove('col-lg-10');
        chapters_element.classList.add('col-lg-9');
    }

    toc.style.display = (toc.style.display == 'block') ? 'none' : 'block';
});

// toc main chapter button handling

allTocButtons.forEach(button => {
    
    let id = button.id.split('-')[2];
    button.addEventListener('click', () => {
        current_page = id;
        renderPage(id);

    })
})

prev_page_btn.addEventListener('click', () => {
    renderPage((--current_page).toString());
})
next_page_btn.addEventListener('click', () => {
    renderPage((++current_page).toString());
})

document.addEventListener('DOMContentLoaded', () => {
    let currently_active_chapter = localStorage.getItem('active_chapter_de');
    if(currently_active_chapter){
        current_page = currently_active_chapter;
    }
    renderPage(currently_active_chapter ? currently_active_chapter : current_page);
    
})