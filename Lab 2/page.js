// Create the main container
const container = document.createElement('div');
container.style.fontFamily = 'Arial, sans-serif';
container.style.textAlign = 'center';
container.style.margin = '40px';

// 1️⃣ Add a heading
const heading = document.createElement('h1');
heading.textContent = 'Welcome to My Constructed Page';
container.appendChild(heading);

// 2️⃣ Add an image
const image = document.createElement('img');
image.src = 'https://jelena-vk-itt.github.io/jvk-tudt-notes/rwat/res/images/logo.png';
image.alt = 'RWAT Logo';
image.style.width = '150px';
image.style.marginTop = '20px';
container.appendChild(image);

// 3️⃣ Add a subheading
const subheading = document.createElement('h2');
subheading.textContent = 'This page was created entirely using JavaScript!';
subheading.style.color = '#333';
subheading.style.marginTop = '30px';
container.appendChild(subheading);

// 4️⃣ Add a paragraph
const paragraph = document.createElement('p');
paragraph.textContent = 'By using DOM manipulation methods like createElement, appendChild, and setAttribute, we can construct an entire webpage dynamically without writing any HTML structure inside the HTML file itself.';
paragraph.style.maxWidth = '600px';
paragraph.style.margin = '20px auto';
paragraph.style.lineHeight = '1.6';
container.appendChild(paragraph);

// 5️⃣ Add a link
const link = document.createElement('a');
link.href = 'https://github.com/';
link.textContent = 'Visit GitHub';
link.target = '_blank';
link.style.display = 'inline-block';
link.style.marginTop = '20px';
link.style.textDecoration = 'none';
link.style.color = 'white';
link.style.backgroundColor = '#007acc';
link.style.padding = '10px 20px';
link.style.borderRadius = '8px';
container.appendChild(link);

// Add everything to the page
document.body.appendChild(container);
