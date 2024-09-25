const newsBlocks = document.querySelector('.news-blocks');
const btnDelete = document.querySelector('.delete-news');

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    const formData = new FormData(form);
      const response = await fetch('http://localhost:3001/news', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const result = await response.json();
        resetForm(form);
        console.log('response ok');
      } else {
        console.log(`response ne ok`);
      }
    }
});

async function allNews() {
  const response = await fetch('http://localhost:3001/news');
  if(response.ok) {
    const result = response.json();
    result.then(data => {
      data.map(news => {
        createListNews(news);
      })
    });
  }
}

allNews();

function deleteNews(element, id) {
  fetch(`http://localhost:3001/news/${id}`, {
    method: "DELETE"
  });
  element.remove();
  /*elements.forEach(element => {
    console.log(element);
    element.remove();
  });*/
};


function createListNews(data) {
  const divNewsBlock = document.createElement("div");
  divNewsBlock.classList.add('news-block');

  const titleElement = document.createElement("p");
  const textElement = document.createElement("p");
  const imgElement = document.createElement("p");
  const IDElement = document.createElement("p");

  IDElement.textContent = `ID:${data.id}`;
  titleElement.textContent = data.title;
  textElement.textContent = data.full_text;
  imgElement.textContent = data.img;

  const delBtn = document.createElement('button');
  delBtn.classList.add('btn-del');
  delBtn.addEventListener('click', () => deleteNews(divNewsBlock, data.id));
  delBtn.textContent = 'Удалить';

  textElement.classList.add('text-block')

  divNewsBlock.appendChild(IDElement);
  divNewsBlock.appendChild(titleElement);
  divNewsBlock.appendChild(textElement);
  divNewsBlock.appendChild(imgElement);
  divNewsBlock.appendChild(delBtn);
  newsBlocks.appendChild(divNewsBlock);
}


function resetForm(form) {
  form.reset();
}
