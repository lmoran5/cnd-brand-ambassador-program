function expandCard(card) {
    // Collapse any already expanded card
    const expandedCard = document.querySelector('.card.expanded');
    if (expandedCard && expandedCard !== card) {
        expandedCard.classList.remove('expanded');
        removeNavigationArrows();
    }
    // Toggle the clicked card's expanded state
    card.classList.toggle('expanded');

    // Toggle overlay
    const overlay = document.getElementById('overlay');
    if (card.classList.contains('expanded')) {
        overlay.classList.add('active');
        overlay.addEventListener('click', collapseCard);
        addNavigationArrows(card);
    } else {
        overlay.classList.remove('active');
        overlay.removeEventListener('click', collapseCard);
        removeNavigationArrows();
    }
}

function collapseCard() {
    const expandedCard = document.querySelector('.card.expanded');
    if (expandedCard) {
        expandedCard.classList.remove('expanded');
    }
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
    overlay.removeEventListener('click', collapseCard);
    removeNavigationArrows();
}

function addNavigationArrows(card) {
    const cardContainers = document.querySelectorAll('.card-container');
    const cards = Array.from(cardContainers).flatMap(container => Array.from(container.querySelectorAll('.card')));
    const currentIndex = cards.indexOf(card);

    // Add left arrow
    if (currentIndex > 0) {
        const leftArrow = document.createElement('div');
        leftArrow.classList.add('arrow', 'left-arrow');
        leftArrow.innerHTML = '&#8592;'; // Left arrow symbol
        leftArrow.addEventListener('click', () => navigateCard(cards[currentIndex - 1]));
        card.appendChild(leftArrow);
    }

    // Add right arrow
    if (currentIndex < cards.length - 1) {
        const rightArrow = document.createElement('div');
        rightArrow.classList.add('arrow', 'right-arrow');
        rightArrow.innerHTML = '&#8594;'; // Right arrow symbol
        rightArrow.addEventListener('click', () => navigateCard(cards[currentIndex + 1]));
        card.appendChild(rightArrow);
    }
}

function removeNavigationArrows() {
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach(arrow => arrow.remove());
}

function navigateCard(nextCard) {
    const expandedCard = document.querySelector('.card.expanded');
    if (expandedCard) {
        expandedCard.classList.remove('expanded');
    }
    removeNavigationArrows();
    nextCard.classList.add('expanded');
    addNavigationArrows(nextCard);
}

// Close expanded card by clicking outside
document.getElementById('overlay').addEventListener('click', collapseCard);
