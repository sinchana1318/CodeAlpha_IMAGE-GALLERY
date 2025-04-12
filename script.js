// Sample image data (using Picsum Photos placeholder service)
const images = [
    { id: 1, url: 'https://picsum.photos/id/10/800/600', alt: 'Nature 1' },
    { id: 2, url: 'https://picsum.photos/id/11/800/600', alt: 'Nature 2' },
    { id: 3, url: 'https://picsum.photos/id/12/800/600', alt: 'Nature 3' },
    { id: 4, url: 'https://picsum.photos/id/13/800/600', alt: 'Nature 4' },
    { id: 5, url: 'https://picsum.photos/id/14/800/600', alt: 'Nature 5' },
    { id: 6, url: 'https://picsum.photos/id/15/800/600', alt: 'Nature 6' },
    { id: 7, url: 'https://picsum.photos/id/16/800/600', alt: 'Nature 7' },
    { id: 8, url: 'https://picsum.photos/id/17/800/600', alt: 'Nature 8' }
];

// DOM elements
const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Current image index for navigation
let currentImageIndex = 0;

// Initialize the gallery
function initGallery() {
    // Create gallery items
    images.forEach((image, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url.replace('800/600', '300/200'); // Smaller thumbnails
        imgElement.alt = image.alt;
        imgElement.dataset.index = index;
        
        imgElement.addEventListener('click', () => {
            openLightbox(index);
        });
        
        gallery.appendChild(imgElement);
    });
}

// Open lightbox with selected image
function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = images[index].url;
    lightboxImg.alt = images[index].alt;
    lightbox.classList.add('active');
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
}

// Navigate to previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentImageIndex].url;
    lightboxImg.alt = images[currentImageIndex].alt;
}

// Navigate to next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImg.src = images[currentImageIndex].url;
    lightboxImg.alt = images[currentImageIndex].alt;
}

// Event listeners
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);
