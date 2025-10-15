const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const askBtn = document.getElementById('askBtn');
const generateBtn = document.getElementById('generateBtn');
const questionWarning = document.getElementById('questionWarning');
const quizWarning = document.getElementById('quizWarning');
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');

let uploadedFiles = [];

// Upload file handler
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  uploadedFiles.push(...files);
  renderFileList();
});

// Render uploaded files
function renderFileList() {
  fileList.innerHTML = '';
  uploadedFiles.forEach(file => {
    const li = document.createElement('li');
    li.textContent = file.name;
    fileList.appendChild(li);
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


// Collapse sidebar
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  toggleBtn.textContent = sidebar.classList.contains('collapsed') ? 'X' : 'X';
});
