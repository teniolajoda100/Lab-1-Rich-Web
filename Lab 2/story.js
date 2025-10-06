function fixStory() {
    // 1️⃣ Add a title at the top
    const article = document.querySelector('article');
    const title = document.createElement('h1');
    title.textContent = "Little Red Riding Hood";
    article.prepend(title);

    // 2️⃣ Remove the paragraph that doesn't belong (the one about the frog)
    const paragraphs = article.querySelectorAll('p');
    paragraphs.forEach(p => {
        if (p.textContent.includes("frog")) {
            p.remove();
        }
    });

    // 3️⃣ Swap the two paragraphs that are in the wrong order
    const updatedParas = article.querySelectorAll('p');
    const embracePara = Array.from(updatedParas).find(p => p.textContent.includes("embrace you"));
    const armsPara = Array.from(updatedParas).find(p => p.textContent.includes("arms so big"));
    if (embracePara && armsPara) {
        article.insertBefore(armsPara, embracePara);
    }

    // 4️⃣ Replace the 'THE END' paragraph with a new ending
    const endPara = Array.from(article.querySelectorAll('p')).find(p => p.textContent.includes("THE END"));
    if (endPara) {
        const newEnding = document.createElement('p');
        newEnding.textContent = "However, the good hunter was passing by and heard what was happening. He was able to cut open the wolf and save both girl and granny.";
        endPara.replaceWith(newEnding);
    }

    // 5️⃣ Optional: Display confirmation
    const message = document.createElement('p');
    message.style.color = "green";
    message.style.fontWeight = "bold";
    message.textContent = "✅ The story has been fixed!";
    article.appendChild(message);

    // Prevent multiple activations
    document.removeEventListener('keydown', fixStory);
}

// Attach event handler to any keypress
document.addEventListener('keydown', fixStory);
