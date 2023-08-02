const save = document.getElementById('save')
const contentBox = document.getElementById('content-box')

getFormData = () => {
    return Object.fromEntries(new FormData(document.querySelector('form')))
}
let datas = JSON.parse(localStorage.getItem('notes')) || [];

save.addEventListener('click', (e) => {
    e.preventDefault();
    let data = getFormData();
    data.id = Date.now().toString(16);
    data.finish = false;
    datas.push(data)
    localStorage.setItem('notes', JSON.stringify(datas))
    location.reload();
})
createTag = (tagName, data) => {
    const tag = document.createElement(tagName);
    tag.innerHTML = `
    <summary>
    <span style='color: ${data.finished ? 'black':""};'>${data.title}
    </span>
    <span style='color:white;'>
    ${data.finished ? '&#10003;' : ""}
    </span>
    </summary>
    <p>${data.content}</p>
    <div class='content-btns'>
    <button class='delete btn btn-danger'>Delete</button>
    <input type='hidden' value=${data.id}>
    <button class='done btn btn-primary'>Done</button>
    </div>
    `
    return tag;
}
markDone = (e) => {
    e.preventDefault();
    const id = e.target.previousElementSibling.value;
    datas.forEach(data => {
        if (data.id === id) data.finished = true;
    })
    localStorage.setItem('notes', JSON.stringify(datas))
    location.reload();
}

deleteOnClick = (e) => {
    e.preventDefault();
    datas.forEach(item => {
        const id = e.target.nextElementSibling.value;
        if (item.id === id) datas.splice(datas.indexOf(item), 1)
    })
    localStorage.setItem('notes', JSON.stringify(datas))
    location.reload();
}

if (datas.length > 0) {
    datas.forEach((data) => {
        const element = createTag('details', data)
        contentBox.append(element)
    })
    const done = document.querySelectorAll('.done')
    done.forEach(btn => btn.addEventListener('click', markDone))
    const deleteBtn = document.querySelectorAll('.delete')
    deleteBtn.forEach(btn => btn.addEventListener('click', deleteOnClick))
}
