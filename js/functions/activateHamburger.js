const hamburger = document.querySelector('.hamburger');

export const activateHamburger = () => {
  hamburger.addEventListener('click', evt => {
    hamburger.classList.toggle('active');
  });
}
