const stars = document.querySelectorAll('.star');
const emojis = document.querySelectorAll('.emoji');
const ratingLabel = document.getElementById('rating-label');
const submitButton = document.getElementById('submit-rating');
const responseMessage = document.getElementById('response-message');
const userComment = document.getElementById('user-comment');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const starBurst = document.getElementById('star-burst');

const labels = ['Worse', 'Bad', 'Okay', 'Good', 'Excellent'];
let selectedValue = 0;

// Handle star selection and unselection
stars.forEach(star => {
  star.addEventListener('click', function () {
    const value = parseInt(this.getAttribute('data-value'));

    if (selectedValue === value) {
      resetStarsAndEmojis(); // Unselect if clicked again
      ratingLabel.innerText = 'Select your rating';
      selectedValue = 0;
    } else {
      resetStarsAndEmojis();
      selectStarsAndEmojis(value);
      ratingLabel.innerText = labels[value - 1];
      selectedValue = value;

      // Show star burst if rating is 5
      if (value === 5) {
        showStarBurst();
      } else {
        hideStarBurst();
      }
    }
  });
});

// Handle submit button click
submitButton.addEventListener('click', function () {
  if (selectedValue > 0) {
    responseMessage.innerText = 'Thank you for rating us!';
    responseMessage.classList.remove('hidden');
    responseMessage.style.color = 'green';
  } else {
    responseMessage.innerText = 'Please rate before submitting or exit.';
    responseMessage.classList.remove('hidden');
    responseMessage.style.color = 'red';
  }
});

// Dark mode toggle
darkModeToggle.addEventListener('change', function () {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.rating-container').classList.toggle('dark-mode');
});

// Helper functions
function selectStarsAndEmojis(value) {
  stars.forEach(star => {
    if (parseInt(star.getAttribute('data-value')) <= value) {
      star.classList.add('selected');
    }
  });

  emojis.forEach(emoji => {
    if (parseInt(emoji.getAttribute('data-value')) === value) {
      emoji.classList.remove('hidden');
    } else {
      emoji.classList.add('hidden');
    }
  });
}

function resetStarsAndEmojis() {
  stars.forEach(star => star.classList.remove('selected'));
  emojis.forEach(emoji => emoji.classList.add('hidden')); // Hide all emojis on reset
  responseMessage.classList.add('hidden');
}

function showStarBurst() {
  starBurst.classList.remove('hidden');
  starBurst.style.animation = 'burst 1s forwards';
}

function hideStarBurst() {
  starBurst.classList.add('hidden');
  starBurst.style.animation = 'none';
}

// Animation styles
const style = document.createElement('style');
style.innerHTML = `
  @keyframes burst {
    0% { transform: scale(1); }
    100% { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(style);
