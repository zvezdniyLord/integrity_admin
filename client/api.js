const newsBlocks = document.querySelector('.news-blocks');
const btnDelete = document.querySelector('.delete-news');
const formChanger = document.querySelector('.form-changer-block');
const closeFormChange = document.querySelector('.close-form-change');
const formPut = document.getElementById('form-changer');
const btnChangeForm = document.querySelector('.btn-change');


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
  console.log(data);
  const blockForBtn = document.createElement("div");
  blockForBtn.classList.add("block-btns");

  const divNewsBlock = document.createElement("div");
  divNewsBlock.classList.add('news-block');

  const titleElement = document.createElement("p");
  const textElement = document.createElement("p");
  const imgElement = document.createElement("img");
  const IDElement = document.createElement("p");

  IDElement.classList.add("p-id");
  titleElement.classList.add('p-title');
  textElement.classList.add('p-text');
  imgElement.classList.add('img-block');

  IDElement.textContent = `ID:${data.id}`;
  titleElement.textContent = `Заголовок: ${data.title}`;
  textElement.textContent = `Текст: ${data.full_text}`;
  //imgElement.textContent = data.img;
  imgElement.setAttribute('src', `../server/uploads/${data.img}`);
  imgElement.setAttribute('alt', 'картинка новости');

  const delBtn = document.createElement('button');
  delBtn.classList.add('btn-del');
  delBtn.addEventListener('click', () => deleteNews(divNewsBlock, data.id));
  delBtn.textContent = 'Удалить';

  textElement.classList.add('text-block');

  divNewsBlock.appendChild(IDElement);
  divNewsBlock.appendChild(titleElement);
  divNewsBlock.appendChild(textElement);
  divNewsBlock.appendChild(imgElement);
  divNewsBlock.appendChild(blockForBtn);
  blockForBtn.appendChild(delBtn)
  newsBlocks.appendChild(divNewsBlock);
  const changeBtn = document.createElement('button');
  changeBtn.textContent = 'Изменить';
  changeBtn.classList.add('change-btn');
  blockForBtn.appendChild(changeBtn);
  changeBtn.addEventListener('click', (e) => {
    formChanger.style.display = "block";
    mapForm(formPut, data)
  });

}

const resetForm = form => form.reset();

const openModal = (modal) => modal.style.display = 'block';
const closeModal = (modal) => modal.style.display = 'none';
closeFormChange.addEventListener('click', () => closeModal(formChanger));


function mapForm(form, data) {
  formChanger.style.display = "flex";
  form.elements[0].value = data.title;
  form.elements[1].value = data.full_text;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/news/${data.id}`, {
      method: "PUT",
      body: new FormData(form)
    })
  });

}
