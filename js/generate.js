const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const askBtn = document.getElementById('askBtn');
const generateBtn = document.getElementById('generateBtn');
const questionWarning = document.getElementById('questionWarning');
const quizWarning = document.getElementById('quizWarning');
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobileToggle');

let uploadedFiles = [];

// Upload file handler
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  uploadedFiles.push(...files);
  renderFileList();
});

function renderFileList() {
  fileList.innerHTML = '';
  uploadedFiles.forEach((file) => {
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
