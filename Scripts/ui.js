document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('moreDetailsBottom');
  const airDetails = document.querySelector('.AirDetails');
  if (!toggleButton || !airDetails) return;
  let isVisible = false;
  toggleButton.addEventListener('click', () => {
    isVisible = !isVisible;
    airDetails.style.display = isVisible ? 'grid' : 'none';
    toggleButton.textContent = isVisible ? '-' : '+';
  });
});
