import * as basicLightbox from 'basiclightbox';
import  userUrl  from '../images/users/userUrl.png';
import Icons from '../images/icons.svg';

const container = document.querySelector('.js-team-modal');

container.addEventListener('click', openModal);

const modal = basicLightbox.create(`
<div class="team-wrapper">
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Oleksandr Shutyak</p>
    <p class="team-role">Team Leader</p>
    <a class="social-list__link" href="https://github.com/AMIHbKA" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Ivan Klimov</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/Ivan-KLMV" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Tetiana Rudenko</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/TetianaRudenko" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Konstantin Martynenko</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/constantin351" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Vadym Germanyuk</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/wadja210894" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Serhii Skliarov</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/skaart77" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Oleksandr Tymchenko</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/indatim" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Diana Shevtsova</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/DianaShe" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Andriy Karpishyn</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/makaronnik" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
<div class="team-card">
    <img src=${userUrl} alt="User" class="team-image">
    <p class="team-name">Serhii Dezhornyuk</p>
    <p class="team-role">Devoloper</p>
    <a class="social-list__link" href="https://github.com/SergiyDezh" target="_blank" rel="noopener noreferrer">
     <svg class="icon-github" width="30" height="30">
     <use href="${Icons}#icon-github"></use>
     </svg>
     </a>
</div>
</div>
`);

function openModal(e) {
  modal.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}