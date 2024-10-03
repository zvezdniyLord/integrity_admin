const id = localStorage['id'];
const titleElement = document.querySelector(".title");
const textElement = document.querySelector('.text');
const imgElement = document.querySelector("img");


fetch(`http://localhost:3001/news/${id}`)
.then(response => response.json())
.then(data => {
    console.log(id);
    const value = data[0];
    titleElement.textContent = value.title;
    textElement.textContent = value.full_text;
    imgElement.src = `../server/uploads/${value.img}`;
    imgElement.style.width = '300px';
});
