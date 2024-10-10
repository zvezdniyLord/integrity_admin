const newsBlock = document.querySelector('.news');
async function archiveFetch() {
    const response = await fetch('http://localhost:3001/archive');
    if(response.ok) {
        const result = response.json();
        result.then(data => {
            data.map(d => {
                window.localStorage.setItem('id', d.id);
                newsBlock.insertAdjacentHTML("afterbegin", `
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
            })
        })
    }
}

archiveFetch()
