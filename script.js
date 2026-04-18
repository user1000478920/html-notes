"use strict";
const title = document.getElementById('title');
const content = document.getElementById('content');
const titleerr = document.getElementById('titleerr');
const contenterr = document.getElementById('contenterr');
const notes = document.getElementById('notes');

title.addEventListener('input',()=>{
//hide error if input is not empty
  if(!(title.value === "")){
    titleerr.style.display = "none";
    title.classList.remove("errbox");
  }
});

content.addEventListener('input',()=>{
//hide error if textarea is not empty
  if(!(content.value === "")){
    contenterr.style.display = "none";
    content.classList.remove("errbox");
  }
//adjust height of textarea according to content
  content.style.height = "";
  content.style.height = `${content.scrollHeight}px`;
});

const create = () => {
//show error if input is empty
  if(title.value === ""){
    titleerr.removeAttribute('style');
    title.classList.add("errbox");
    title.focus();
    return;
  }
//show error if textarea is empty
  if(content.value === ""){
    contenterr.removeAttribute("style");
    content.classList.add("errbox");
    content.focus();
    return;
  }
  //add note to localstorage
  localStorage.setItem(title.value,content.value);
  //reset fields
  title.value = "";
  content.value = "";
  //resize textarea
  content.dispatchEvent(new Event("input"));
  //reload and append all notes to #notes again(in case of edit)
  load();
}

const appendNote = (title,content) => {
  const note = `
    <details>
    <summary>
     <span>${title}</span>
     <span>
       <button onclick="this.parentElement.parentElement.parentElement.remove();localStorage.removeItem('${title}');" title="delete">
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
         </svg>
       </button>&nbsp;
       <button onclick="edit('${title}')" title="edit">
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
           <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
           <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
         </svg>
       </button>
     </span>
    </summary>
    <p>${content}</p>
   </details>
   `;
   notes.insertAdjacentHTML('beforeend',note);
   notes.focus();
}

const load = () => {
  //clear existing notes
  notes.replaceChildren();
  //add all notes again (or not in case of clearNotes())
  for (let i = 0; i < localStorage.length; i++) {
    const title = localStorage.key(i);
    const content = localStorage.getItem(title);
    appendNote(title,content);
  }
}

const clearNotes = () => {
  localStorage.clear();
  load();
}

const edit = (key) => {
  //autofill fields
  title.value = key;
  content.value = localStorage.getItem(key);
  //resize content
  content.dispatchEvent(new Event("input"));
  //direct user to input
  content.focus();
  title.scrollIntoView({ behavior: 'smooth' });
}

load();
