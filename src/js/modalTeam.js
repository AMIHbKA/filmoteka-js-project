import * as basicLightbox from 'basiclightbox';


const container = document.querySelector('.js-team-modal');

container.addEventListener('click', openModal);

const modal = basicLightbox.create(`<div class="team-wrapper">
<div class="team-card">
    <img src="Img" alt="User" class="team-image">
    <p class="team-name">User</p>
    <p class="team-role">Team Lead</p>
    <a href="https://github.com/user" target="_blank"></a>
</div>
</div>`);

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