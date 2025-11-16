// Get elements
const colorBox = document.getElementById('colorBox');
const colorPicker = document.getElementById('colorPicker');
const colorCode = document.getElementById('colorCode');
const saveBtn = document.getElementById('saveBtn');
const colorList = document.getElementById('colorList');

// Load saved colors from localStorage
let savedColors = JSON.parse(localStorage.getItem('savedColors')) || [];

// Initialize
function init() {
    const initialColor = colorPicker.value;
    colorBox.style.backgroundColor = initialColor;
    renderSavedColors();
}

// Update color box and code on color picker change
colorPicker.addEventListener('input', (e) => {
    const selectedColor = e.target.value;
    colorBox.style.backgroundColor = selectedColor;
    colorCode.textContent = selectedColor;
});

// Save color to array
saveBtn.addEventListener('click', () => {
    const currentColor = colorPicker.value;
    
    // Check if color already exists
    if (!savedColors.includes(currentColor)) {
        savedColors.push(currentColor);
        saveToLocalStorage();
        renderSavedColors();
    }
});

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('savedColors', JSON.stringify(savedColors));
}

// Render saved colors
function renderSavedColors() {
    colorList.innerHTML = '';
    
    savedColors.forEach((color, index) => {
        const colorItem = document.createElement('div');
        colorItem.className = 'saved-color-item';
        colorItem.style.backgroundColor = color;
        colorItem.title = color;
        
        // Click to apply color
        colorItem.addEventListener('click', () => {
            colorPicker.value = color;
            colorBox.style.backgroundColor = color;
            colorCode.textContent = color;
        });
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteColor(index);
        });
        
        colorItem.appendChild(deleteBtn);
        colorList.appendChild(colorItem);
    });
}

// Delete color
function deleteColor(index) {
    savedColors.splice(index, 1);
    saveToLocalStorage();
    renderSavedColors();
}

// Initialize app
init();
