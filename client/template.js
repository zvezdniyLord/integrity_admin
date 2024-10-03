document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3001/news').then(resp => resp.json())
    .then(data => data.forEach(d => {
        console.log(d);
        window.localStorage.setItem('id', d.id);
        document.querySelector("body").insertAdjacentHTML("afterbegin", `
        <a href="../news.html">
            <div class="news__block" onClick=createTemplate(${d.id}) style="border: 1px solid; margin-bottom: 20px;">
            <picture>
            <img loading="lazy" class="news__block-image" src="/server/uploads/${d.img}" alt="баннер">
            </picture>
            <h3 class="news__block-title">${d.title}</h3>
            <p class="news__block-text">${d.full_text}</p>
            </div>
        </a>
        `);
    }));
});

function createTemplate(id) {
    localStorage.setItem('id', id);
}
