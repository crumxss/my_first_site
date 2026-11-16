const themeButton = document.querySelector('#theme');

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeButton.textContent = document.body.classList.contains('dark-theme')
      ? 'Светлая тема'
      : 'Тёмная тема';
  });
}

const showMoreButton = document.querySelector('#showMore');
const moreText = document.querySelector('#moreText');

if (showMoreButton && moreText) {
  showMoreButton.addEventListener('click', () => {
    moreText.classList.toggle('d-none');
    showMoreButton.textContent = moreText.classList.contains('d-none')
      ? 'Подробнее'
      : 'Скрыть';
  });
}

const form = document.querySelector('#contactForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const commentInput = document.querySelector('#comment');
const formMessage = document.querySelector('#formMessage');

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = 'mt-3 mb-0 ' + type;
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!nameInput.value || !emailInput.value.includes('@') || !commentInput.value) {
      showMessage('Заполни все поля и проверь email', 'text-danger');
      return;
    }

    showMessage('Спасибо, ' + nameInput.value + '! Сообщение отправлено.', 'text-success');
  });
}

const projectsList = document.querySelector('#projects');

const fallbackProjects = [
  {
    title: 'Первый сайт',
    tech: 'HTML + CSS + Bootstrap',
    description: 'Учебный сайт с карточками, навигацией и адаптивной вёрсткой.',
    link: 'about.html'
  },
  {
    title: 'Форма обратной связи',
    tech: 'JavaScript validation',
    description: 'Проверка заполнения полей и email без перезагрузки страницы.',
    link: 'contacts.html'
  },
  {
    title: 'Интерактив и тема',
    tech: 'DOM + события',
    description: 'Кнопка «Подробнее», модальное окно и переключение тёмной темы.',
    link: 'index.html'
  }
];

function renderProjects(projects) {
  projectsList.innerHTML = projects.map(project => `
    <article class="card p-3">
      <h3>${project.title}</h3>
      <p class="text-muted mb-2">${project.tech}</p>
      <p class="mb-3">${project.description}</p>
      <a href="${project.link}" class="btn btn-outline-secondary btn-sm">Открыть</a>
    </article>
  `).join('');
}

if (projectsList) {
  fetch('./data/projects.json')
    .then(response => response.json())
    .then(projects => {
      renderProjects(projects);
    })
    .catch(() => {
      renderProjects(fallbackProjects);
    });
}
