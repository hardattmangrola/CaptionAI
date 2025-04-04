// DOM Elements
const themeToggle = document.querySelector(".theme-toggle");
const loadingScreen = document.querySelector(".loading-screen");
const fileUpload = document.getElementById("image-upload");
const fileName = document.querySelector(".file-name");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const progressBar = document.querySelector(".progress");
const progressText = document.querySelector(".progress-text");
const steps = document.querySelectorAll(".step");
const previewImage = document.getElementById("preview-image");
const generatedCaption = document.getElementById("generated-caption");
const copyBtn = document.querySelector(".copy-btn");
const downloadBtn = document.querySelector(".download-btn");
const shareBtn = document.querySelector(".share-btn");
const tryAgainBtn = document.querySelector(".try-again-btn");

// Three.js Setup
let scene, camera, renderer, particles, particleGroup;
let mouseX = 0,
  mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
document
  .getElementById("image-upload")
  .addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const captionElement = document.getElementById("generated-caption");
    const previewImage = document.getElementById("preview-image");

    // Immediately update UI to show "Just a moment!" and remove old caption
    captionElement.innerText = "Just a moment!";

    // Force UI update before proceeding
    await new Promise((resolve) => requestAnimationFrame(resolve));

    // Show the new image instantly
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/generate_caption/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      captionElement.innerText = data.caption;
    } catch (error) {
      console.error("Error:", error);
      captionElement.innerText = "Error generating caption.";
    }
  });

// Initialize Three.js scene
function initThreeJS() {
  // Create scene
  scene = new THREE.Scene();

  // Set up camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 1000;

  // Set up renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  document.getElementById("three-container").appendChild(renderer.domElement);

  // Create particle group
  particleGroup = new THREE.Object3D();
  scene.add(particleGroup);

  // Create particles
  const particleCount = 1000;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 2000;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 2000;
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 2000;

    particleSizes[i] = Math.random() * 5;
  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particlePositions, 3)
  );
  particleGeometry.setAttribute(
    "size",
    new THREE.BufferAttribute(particleSizes, 1)
  );

  // Create particle material
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x6c63ff,
    size: 4,
    transparent: true,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  // Create particle system
  particles = new THREE.Points(particleGeometry, particleMaterial);
  particleGroup.add(particles);

  // Add event listeners
  document.addEventListener("mousemove", onDocumentMouseMove);
  window.addEventListener("resize", onWindowResize);

  // Start animation loop
  animate();

  // Hide loading screen after a delay
  setTimeout(() => {
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2000);
}

// Handle mouse movement
function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.05;
  mouseY = (event.clientY - windowHalfY) * 0.05;
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  particleGroup.rotation.x += 0.0003;
  particleGroup.rotation.y += 0.0005;

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
  if (document.body.hasAttribute("data-theme")) {
    document.body.removeAttribute("data-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

const API_URL = "http://localhost:8000/generate_caption/";

// File Upload Handling
fileUpload.addEventListener("change", async (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    fileName.textContent = file.name;

    // Show image preview
    const objectUrl = URL.createObjectURL(file);
    previewImage.src = objectUrl;

    // Move to processing slide
    changeSlide(1);

    // Simulate processing animation while waiting for AI response
    await simulateProcessing(file);
  }
});

// Simulate Processing Animation
async function simulateProcessing(file) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;

    // Activate steps
    if (progress >= 20) steps[1].classList.add("active");
    if (progress >= 60) steps[2].classList.add("active");
    if (progress >= 100) {
      steps[3].classList.add("active");
      clearInterval(interval);
    }
  }, 50);

  try {
    // Send request to FastAPI backend
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    // Handle errors
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get AI-generated caption from response
    const data = await response.json();
    generatedCaption.textContent = data.caption || "Caption not found.";
  } catch (error) {
    console.error("Error:", error);
    generatedCaption.textContent = "Error generating caption.";
  }

  // Move to result slide after processing
  setTimeout(() => {
    changeSlide(2);
  }, 500);
}

// Copy Caption Button
copyBtn.addEventListener("click", () => {
  const captionText = generatedCaption.textContent;
  navigator.clipboard
    .writeText(captionText)
    .then(() => {
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(
        () => (copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy'),
        2000
      );
    })
    .catch((err) => console.error("Failed to copy:", err));
});

// Download Caption Button
downloadBtn.addEventListener("click", () => {
  const captionText = generatedCaption.textContent;
  const blob = new Blob([captionText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "caption.txt";
  a.click();

  URL.revokeObjectURL(url);
});

// Share Caption Button
shareBtn.addEventListener("click", () => {
  const captionText = generatedCaption.textContent;

  if (navigator.share) {
    navigator
      .share({ title: "AI Image Caption", text: captionText })
      .catch((err) => console.error("Share failed:", err));
  } else {
    alert("Sharing is not supported in your browser.");
  }
});

// Try Again Button (Reset everything)
tryAgainBtn.addEventListener("click", () => {
  changeSlide(0);
  resetProcessing();
});

// Change Slide Function
function changeSlide(index) {
  document.querySelectorAll(".slide").forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Reset Processing
function resetProcessing() {
  progressBar.style.width = "0%";
  progressText.textContent = "0%";
  steps.forEach((step, index) => {
    if (index > 0) step.classList.remove("active");
  });

  generatedCaption.textContent = "Your caption will appear here.";
  fileUpload.value = "";
  fileName.textContent = "No file selected";
}
// Navigation Dots
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = parseInt(dot.getAttribute("data-slide"));
    changeSlide(slideIndex);
  });
});

// Try Again Button
tryAgainBtn.addEventListener("click", () => {
  changeSlide(0);
  resetProcessing();
});

// Copy Button
copyBtn.addEventListener("click", () => {
  const captionText = generatedCaption.textContent;
  navigator.clipboard
    .writeText(captionText)
    .then(() => {
      // Show success animation
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
});

// Download Button
downloadBtn.addEventListener("click", () => {
  const captionText = generatedCaption.textContent;
  const blob = new Blob([captionText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "caption.txt";
  a.click();

  URL.revokeObjectURL(url);
});

// Share Button
shareBtn.addEventListener("click", () => {
  const captionText = generatedCaption.textContent;

  // Check if Web Share API is available
  if (navigator.share) {
    navigator
      .share({
        title: "Image Caption",
        text: captionText,
      })
      .catch((err) => {
        console.error("Share failed:", err);
      });
  } else {
    alert("Sharing is not supported in your browser");
  }
});

// Change Slide Function
function changeSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// File Upload Handling
fileUpload.addEventListener("change", async (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    fileName.textContent = file.name;

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    previewImage.src = objectUrl;

    // Move to processing slide
    changeSlide(1);

    // Simulate processing while waiting for AI caption
    await simulateProcessing(file);
  }
  document.querySelector(".try-again-btn").addEventListener("click", () => {
    changeSlide(0);
    resetProcessing();
  });
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      changeSlide(index);
    });
  });
});

// Initialize Three.js on load
window.addEventListener("load", initThreeJS);
