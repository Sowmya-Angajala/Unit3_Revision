const ul = document.querySelector('#itemList');
const button = document.querySelector('#addBtn');

button.addEventListener('click', () => {
  const li = document.createElement('li');
  const itemNumber = ul.children.length + 1;
  li.textContent = `New Item ${itemNumber}`;

  // Apply conditional styling based on sequence number
  if (itemNumber % 2 === 1) {
    li.classList.add('odd');
  } else {
    li.classList.add('even');
  }

  ul.appendChild(li);
});