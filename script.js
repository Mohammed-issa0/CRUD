let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let temp;
let mood='create';
let Search = document.getElementById('search');

// console.log(title, price, taxes, ads, discount, total, count, category, submit);

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='#a01fb7';
    }
    else{
        total.innerHTML='';
        total.style.background='#111';
    }
}

let dataPro;
if(localStorage.pro != null){
    dataPro = JSON.parse(localStorage.pro);
}else{
    dataPro= [];
}

submit.onclick = function(){
    let newPro ={
    title: title.value,
    price: price.value,
    taxes : taxes.value || 0,
    ads : ads.value || 0,
    discount : discount.value || 0,
    total : total.innerHTML,
    count : count.value,
    category: category.value || "---",
    }

    if(title.value !='' &&
        price.value !='' &&
        category.value != '' &&
        count.value <=100
    ){
        if(mood === 'create'){
            if(newPro.count >1){
            for(let i=0; i<newPro.count; ++i){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
        }else{
            dataPro[temp]=newPro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display='block';

        }
        clearData();    
    }
    
    localStorage.setItem('pro' , JSON.stringify(dataPro));
    
    showData();
}

function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

function showData(){
    getTotal();
   let data= '';
    for(let i=0; i< dataPro.length; ++i){
        data += ` 
                <tr>
                   <td>${i+1}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td class="a">${dataPro[i].taxes}</td>
                   <td class="a">${dataPro[i].ads}</td>
                   <td class="a">${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td onclick= updateData(${i})><button>update</button></td>
                   <td onclick= deleteData(${i})><button>delete</button></td>
                </tr>`;
                
    }
    document.getElementById('tbody').innerHTML= data;

    let btnDeleteAll=document.getElementById("deleteAll");;
    if(dataPro.length > 0){
        btnDeleteAll.innerHTML=`
        <button onclick= deleteAll()>Delete All (${dataPro.length})</button>
        `
    }else{
        btnDeleteAll.innerHTML='';
    }
}
showData();

function deleteData(i){
dataPro.splice(i,1);
localStorage.pro= JSON.stringify(dataPro);
showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

function updateData(i){
    title.value= dataPro[i].title;
    price.value= dataPro[i].price;
    ads.value= dataPro[i].ads;
    discount.value=dataPro[i].discount;
    taxes.value=dataPro[i].taxes;
    category.value=dataPro[i].category;
    count.style.display='none';
    submit.innerHTML='Updata';
    getTotal();
    temp=i;
    mood='updata';
    scroll({
        top: 0,
    })
}

let searchMood ="Title";
function getSearchMood(id){
    if(id == "search-title") {
        searchMood="Title";
    } else{
    searchMood="Category";
}
Search.placeholder='Search By '+ searchMood;
Search.focus();
Search.value='';
showData();
// console.log(searchMood);
}

function searchData(value){
    let data='';
    for(let i=0; i<dataPro.length; ++i){
        if(searchMood=='title'){
                if(dataPro[i].title.includes(value)){
                    data += ` 
                    <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td class="a">${dataPro[i].taxes}</td>
                    <td class="a">${dataPro[i].ads}</td>
                    <td class="a">${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td onclick= updateData(${i})><button>update</button></td>
                    <td onclick= deleteData(${i})><button>delete</button></td>
                    </tr>`;
                }
        }else{
                if(dataPro[i].category.includes(value)){
                    data += ` 
                    <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td class="a">${dataPro[i].taxes}</td>
                    <td class="a">${dataPro[i].ads}</td>
                    <td class="a">${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td onclick= updateData(${i})><button>update</button></td>
                    <td onclick= deleteData(${i})><button>delete</button></td>
                    </tr>`;
                }
        }
    }
    document.getElementById('tbody').innerHTML= data;
}
