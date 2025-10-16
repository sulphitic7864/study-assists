const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const askBtn = document.getElementById('askBtn');
const generateBtn = document.getElementById('generateBtn');
const questionWarning = document.getElementById('questionWarning');
const quizWarning = document.getElementById('quizWarning');
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobileToggle');
const quizRange = document.getElementById('quizRange');
const quizValue = document.getElementById('quizValue');



let uploadedFiles = [];

// Upload file handler
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  uploadedFiles.push(...files);
  renderFileList();
});

function renderFileList() {
  fileList.innerHTML = '';
  uploadedFiles.forEach((file, index) => {
    const li = document.createElement('li');
    li.classList.add('uploaded-file-item'); // Optional: for clearer CSS targeting
    li.dataset.index = index; // Store the index of the file in the array
    
    // File Name Span
    const fileNameSpan = document.createElement('span');
    fileNameSpan.textContent = file.name;
    fileNameSpan.classList.add('file-name');
    
    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-file-btn');
    deleteBtn.innerHTML = '<i class="fa fa-times"></i>'; // Font Awesome 'X' icon
    
    // Append elements to the list item
    li.appendChild(fileNameSpan);
    li.appendChild(deleteBtn);
    fileList.appendChild(li);
  });
  
  // After rendering, attach delete listeners
  attachDeleteListeners();
}

function deleteFile(index) {
    // Remove the file from the array using the index
    uploadedFiles.splice(index, 1);
    
    // Re-render the list to update the display
    renderFileList();
    
    // Optional: Reset the file input value after deletion
    fileInput.value = '';
}

function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-file-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();

            const listItem = e.target.closest('li');
            if (listItem) {
                let index = parseInt(listItem.dataset.index);
                deleteFile(index);
            }
        });
    });
}



// Ask question validation
askBtn.addEventListener('click', () => {
  if (uploadedFiles.length === 0) {
    questionWarning.style.display = 'block';
  } else {
    questionWarning.style.display = 'none';
    alert('Your question has been submitted!');
  }
});

// Toggle Sidebar (desktop)
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  const icon = toggleBtn.querySelector('i');
  icon.classList.toggle('fa-times');
  icon.classList.toggle('fa-bars');
});


// Mobile Sidebar Toggle with outside click close
mobileToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    !mobileToggle.contains(e.target)
  ) {
    sidebar.classList.remove('open');
  }
});

function updateRangeValue() {
  const value = parseInt(quizRange.value);
  const min = parseInt(quizRange.min);
  const max = parseInt(quizRange.max);
  
  // 1. Calculate the percentage position (0 to 100)
  const percent = ((value - min) / (max - min)); 

  // 2. Update the visible number value
  quizValue.textContent = value;
  
  // 3. Set the CSS variable for the track color fill (for browsers that support it)
  quizRange.style.setProperty('--range-progress', `${percent * 100}%`);

  // 4. Calculate the position for the floating number (#quizValue) to follow the thumb.
  // We use the full track width, then subtract half the thumb width from the ends 
  // to ensure the value is centered correctly.
  
  // A slight horizontal adjustment might be needed for perfect centering based on browser/font
  const trackWidth = quizRange.offsetWidth;
  
  // Calculate the position of the thumb center (minus a small offset)
  const leftPosition = percent * trackWidth;

  // Set the left position for the span
  quizValue.style.left = `${leftPosition}px`;
}

// Attach event listeners
quizRange.addEventListener('input', updateRangeValue);

// Set initial values on load
// Use a timeout to ensure all CSS and element dimensions are calculated
window.addEventListener('load', () => {
    updateRangeValue();
    // Re-calculate after a slight delay to ensure correct positioning on screen size changes
    setTimeout(updateRangeValue, 10); 
});