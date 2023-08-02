//TB😊 zor grng.
// let datas = JSON.parse(localStorage.getItem('notes')) || [];
//TB😊 la sarawa amaman nusiwa👆.
//TB😊 ema ayxayna (localStorage == waku mimory waya) bo away xazn bet.
// datas.push(data)
//TB😊 dwatr ba sayay ama👇 data anerinu, wa katek refreshman krdawa rashnabetawa😉.
//TB😊 dwatr aw (array) la sarawa hamana batala,boya ema (push) akain.
// localStorage.setItem('notes', JSON.stringify(datas))

const save = document.getElementById('save')
const contentBox = document.getElementById('content-box')

getFormData = () => {
    //TB😊 ama (new FormData) (function) taybata,hamu datakany ee aw formay ka daydayne,ko akatawaw boman ageretawa👇.
    // let formData = new FormData(document.querySelector('form'))
    // console.log(formData);
    //TB😊 balam lera waku (Object) daykain👇.
    return Object.fromEntries(new FormData(document.querySelector('form')))
}

// let dates = []
//TB😊 xoy sarata awa buu👆,balam ema away le akain.
//TB😊 ema ayxayna (localStorage == waku mimory waya).
//TB😊 wa abet bikayna (json).
let datas = JSON.parse(localStorage.getItem('notes')) || [];


save.addEventListener('click', (e) => {
    e.preventDefault();
    //TB😊 ama axayna naw (array)👇.
    let data = getFormData();
    //TB😊 aw (data.id) abet (id) dyary krawy habet,chunka katek (text) anusin,abet baw (id) binasinawa👇.
    //TB😊 (Date.now()) 
    data.id = Date.now().toString(16);
    //TB😊 (data.finish) aya aw (text) tawaw kotayi hatwa,la saratawa tawaw nakrawa boya(false) da aneyn👇.
    data.finish = false;
    //TB😊 (setItem) datakanman bo xazn akat lanaw (localStorage).
    //TB😊 (notes == nawy aw shtaya ka xazny akay,yan aw array).
    //TB😊 dwatr ba yarmaty (JSON.stringify) data anerin.
    //TB😊 dwatr push akain.
    datas.push(data)
    localStorage.setItem('notes', JSON.stringify(datas))
    //TB😊(location.reload()) ama wata har shtekman nusy, awanay sarawa hamuman bo refresh akatawa.
    location.reload();
})


//TB😊 lera baraw xwarawa aw shta drust akain katek shtekman nusy,la xwara nishan bdret👇.
//TB😊 (tagName == ch jora tagekman awet) (data == harwaha aw datay ka lanaw tagaka bakary ahenin)👇.
createTag = (tagName, data) => {
    // la katy bang krdny (function) har shtekman bwet bo drust akat.
    //TB😊 wa ba hoy (location.reload()) abet (return tag) bkain👇.
    const tag = document.createElement(tagName);
    //TB😊 labar away nusiwmana (summary)chunka la xwarawa (details) drust krdwa👇.
    //TB😉 ama wata agar (data.finish) true buu awa rangakam bo bka ba (lightgreen),agar wa nabu hichy le maka👇.
    //TB😊 <span style='color: ${data.finished ? 'lightgreen':""};'>${data.title}</span>.
    //TB😉 ama wata agar (data.finish) true buu awa aw (icon == &#10003) bo dabne,agar wa nabu hichy le maka👇.
    //TB😉 <span style='color:lightgreen;'> ${data.finished ? '&#10003;' : ""}</span>
    //TB😉 aw (input) asharinawa wa agar (text) nusy awa ba pey (id) rashy akainawa👇.
    //TB😉 <input type='hidden' value=${data.id}>
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

// Example details In HTML(wata drust krdny)👇.
// <details>
// <summary>App</summary>
// Iphone
// <br>
// galaxy
// </details>


// Function Done😉.
markDone = (e) => {
    e.preventDefault();
    //TB😉(e.target) wata mouse lasar chbu aw dyary dakat👇.
    //TB😉 (previousElementSibling) amash wata katek mouse lasar shtek bu jiranakay peshu war agret mabastman ley (input)👇.
    const id = e.target.previousElementSibling.value;
    datas.forEach(data => {
        //TB😉 katek (id) data yaksana baw (id) ka ema hamana👆 awa awam bo bka.👇.
        if (data.id === id) data.finished = true;
    })
    //TB😉 wa harwaha abet dubara aw gorankarya xazn bkainawa👇.
    localStorage.setItem('notes', JSON.stringify(datas))
    location.reload();
}


// Function Delete😉.

deleteOnClick = (e) => {
    e.preventDefault();
    datas.forEach(item => {
        //TB😉 (nextElementSibling) amash wata katek mouse lasar shtek bu jiranakay dahatu war agret mabastman ley (input)👇.
        const id = e.target.nextElementSibling.value;
        if (item.id === id) datas.splice(datas.indexOf(item), 1)
    })
    localStorage.setItem('notes', JSON.stringify(datas))
    location.reload();
}



//TB😊 labar awa (details) la xwarawa👇 wa (summary) la sarawa drust krd👆.
if (datas.length > 0) {
    // (datas.length > 0 == wata agar batal nabu shtekman nusibu.👆,awa wara awaman bo bka.👇)
    datas.forEach((data) => {
        //TB😊(createTag == aw (function) ka lasarawa drustman krd)👆,
        //TB😊( lanaw ((createTag) tagy (details) bo drust akain),(wa harwaha(data == datakanishman) bo anerin)👇.
        //TB😊 labar away (details) drust krd👇,chunka la sarawa (summary) drust krdwa👆.
        const element = createTag('details', data)
        contentBox.append(element)
    })
    const done = document.querySelectorAll('.done')
    done.forEach(btn => btn.addEventListener('click', markDone))
    const deleteBtn = document.querySelectorAll('.delete')
    deleteBtn.forEach(btn => btn.addEventListener('click', deleteOnClick))
}