// Password Verification
const lockScreen = document.getElementById('lock-screen');
const passwordForm = document.getElementById('password-form');
const passInput = document.getElementById('pass-input');
const errorMsg = document.getElementById('error-msg');
const bookContainer = document.getElementById('book-container');
const controls = document.getElementById('controls');

const CORRECT_PASSWORD = "12";

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (passInput.value.trim() === CORRECT_PASSWORD) {
    // Unlock animation
    lockScreen.classList.add('fade-out');
    
    setTimeout(() => {
      lockScreen.classList.add('hidden');
      bookContainer.classList.remove('hidden');
      controls.classList.remove('hidden');
      updateBookState();
    }, 800);
  } else {
    // Show error
    errorMsg.classList.add('visible');
    passInput.value = '';
    passInput.focus();
  }
});

// Book Navigation Logic
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const book = document.getElementById('book');

let currentPage = 0;
const totalPages = pages.length;

function updateBookState() {
  pages.forEach((page, index) => {
    if (index < currentPage) {
      page.classList.add('flipped');
      page.classList.remove('active');
    } else if (index === currentPage) {
      page.classList.add('active');
      page.classList.remove('flipped');
    } else {
      page.classList.remove('active', 'flipped');
    }
  });

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === totalPages - 1;
}

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateBookState();
    createFloatingHeart();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateBookState();
  }
});

pages[0].addEventListener('click', () => {
  if (currentPage === 0) {
    currentPage = 1;
    updateBookState();
    createFloatingHeart();
  }
});

restartBtn.addEventListener('click', () => {
  currentPage = 0;
  updateBookState();
});

function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';
  
  const rect = book.getBoundingClientRect();
  heart.style.left = `${rect.right - 60 + Math.random() * 30}px`;
  heart.style.top = `${rect.bottom - 120 + Math.random() * 20}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 3000);
}

document.addEventListener('keydown', (e) => {
  if (lockScreen.classList.contains('hidden')) {
    if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
      currentPage++;
      updateBookState();
      createFloatingHeart();
    } else if (e.key === 'ArrowLeft' && currentPage > 0) {
      currentPage--;
      updateBookState();
    }
  }
});