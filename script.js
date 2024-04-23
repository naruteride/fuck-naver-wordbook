let words = [];

function renderWords() {
    const wordsList = document.getElementById("wordsList");
    wordsList.innerHTML = "";
    words.forEach((word, index) => {
        const wordDiv = document.createElement("div");
        wordDiv.classList.add("word");
        wordDiv.innerHTML = `<strong>${word.spelling}</strong> - ${word.example}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "삭제";
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteWord(index);
        });

        wordDiv.appendChild(deleteBtn);

        wordDiv.addEventListener("click", () => {
            openModal(index);
        });

        wordsList.appendChild(wordDiv);
    });
}

function openModal(index) {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const modalSpelling = document.getElementById("modalSpelling");
    const modalPronunciation = document.getElementById("modalPronunciation");
    const modalMeaning = document.getElementById("modalMeaning");
    const modalExample = document.getElementById("modalExample");

    modalTitle.textContent = words[index].spelling;
    modalSpelling.textContent = words[index].spelling;
    modalPronunciation.textContent = words[index].pronunciation;
    modalMeaning.textContent = words[index].meaning;
    modalExample.textContent = words[index].example;

    modal.style.display = "block";

    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function addWord() {
    const spelling = prompt("스펠링:");
    const pronunciation = prompt("발음:");
    const meaning = prompt("한국어 뜻:");
    const example = prompt("예제:");

    if (spelling && meaning) {
        const newWord = {
            spelling,
            pronunciation,
            meaning,
            example,
            memorized: false,
            date: new Date().toISOString(),
        };

        words.push(newWord);
        renderWords();
        saveWordsToLocalStorage();
    } else {
        alert("스펠링과 뜻을 입력하세요.");
    }
}

function deleteWord(index) {
    if (confirm("정말 삭제하시겠습니까?")) {
        words.splice(index, 1);
        renderWords();
        saveWordsToLocalStorage();
    }
}

function saveWordsToLocalStorage() {
    localStorage.setItem("words", JSON.stringify(words));
}

function loadWordsFromLocalStorage() {
    const savedWords = localStorage.getItem("words");
    if (savedWords) {
        words = JSON.parse(savedWords);
        renderWords();
    }
}

function init() {
    loadWordsFromLocalStorage();
    const addWordBtn = document.getElementById("addWordBtn");
    addWordBtn.addEventListener("click", addWord);

    const filterSelect = document.getElementById("filterSelect");
    filterSelect.addEventListener("change", () => {
        const sortBy = filterSelect.value;
        if (sortBy === "date") {
            words.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortBy === "memorized") {
            words.sort((a, b) => a.memorized - b.memorized);
        } else if (sortBy === "alphabetical") {
            words.sort((a, b) => a.spelling.localeCompare(b.spelling));
        } else if (sortBy === "random") {
            words.sort(() => Math.random() - 0.5);
        }
        renderWords();
    });
}

init();
