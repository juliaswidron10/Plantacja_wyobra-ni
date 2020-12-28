const article = document.querySelectorAll('archiwum');
// article.addEvenListener("click", e=>{

// })
const link = "https://spreadsheets.google.com/feeds/list/1XMsyeRgs7CL8PHRvwzFCeNRrvQACyFlyWJXTrD0sLVs/od6/public/values?alt=json";
window.addEventListener("DOMContentLoaded", getData);

function getData(){
    fetch(link)
    .then(res => res.json())
    .then(handleData);
}

function handleData(data){
    const myData = data.feed.entry;
    console.log(myData);
    myData.forEach(createBook);
}

function createBook(book){
    const template = document.querySelector("#okladka").content;
    const clone = template.cloneNode(true);
    let openedModule = false;
    clone.querySelector('.pic > img').setAttribute('src',`images/postaci/${book.gsx$kategoria.$t}.jpg`);
    clone.querySelector('h3').textContent = book.gsx$tytułkrótki.$t;
    clone.querySelector('article').addEventListener('click', e=>{
        if (openedModule === false){
            openedModule = true;
            document.querySelector('.module').classList.add('showmodule');
            document.querySelector('.module').addEventListener('click', e=> {
                openedModule = false;
                document.querySelector('.module').classList.remove('showmodule');
            } );
            document.querySelector('.module >div> h1').textContent = book.gsx$tytułdługi.$t;
            document.querySelector('.module >div> p').textContent = book.gsx$opis.$t;
            document.querySelector('.module >div> a.a1').setAttribute('href',book.gsx$link.$t);
            document.querySelector('.module >div> a.a2').setAttribute('href',book.gsx$link2.$t);
            document.querySelector('.module >div> a.a3').setAttribute('href',book.gsx$link3.$t);
            document.querySelector('.module >div> a.a1').textContent = book.gsx$tytullinku.$t;
            document.querySelector('.module >div> a.a2').textContent = book.gsx$tytullinku2.$t;
            document.querySelector('.module >div> a.a3').textContent = book.gsx$tytullinku3.$t;
        }else{
            openedModule = false;
            document.querySelector('.module').classList.remove('showmodule');
        }
    })
    document.querySelector("section").appendChild(clone);
}