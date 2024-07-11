let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// console.log(title, price, taxes, ads, discount, total, count, category, submit);

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='red';
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
    if(newPro.count >1){
        for(let i=0; i<newPro.count; ++i){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro);
    }
    
    localStorage.setItem('pro' , JSON.stringify(dataPro));
    clearData();
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
   let data= '';
    for(let i=0; i< dataPro.length; ++i){
        data += ` 
                <tr>
                   <td>${i}</td>
                   <td>${dataPro[i].title}</td>
                   <td>${dataPro[i].price}</td>
                   <td class="a">${dataPro[i].taxes}</td>
                   <td class="a">${dataPro[i].ads}</td>
                   <td class="a">${dataPro[i].discount}</td>
                   <td>${dataPro[i].total}</td>
                   <td>${dataPro[i].category}</td>
                   <td><button>update</button></td>
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

