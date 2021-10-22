let RA = {title:'Armenia', children:[
    {title:'Shirak', children:[
        {title:'Gyumri', children:[
            {title:'Slabodka', children:null}
        ]},
        {title: 'Artik', children: null},
        {title: 'Maralik', children: null}
    ]},
    {title:'Tavush', children:[
        {title:'Ijevan', children:[
            {title:'Eritasardakan', children: null}
        ]},
        {title: 'Dilijan', children: null},
        {title: 'Berd', children: null},
        {title: 'Noyemberyan', children: null},
        {title: 'Ayrum', children: null}
    ]},
    {title:'Lori', children:[
        {title:'Vanadzor', children:[
            {title:'Dimac', children:null}
        ]},
        {title: 'Alaverdi', children: null},
        {title: 'Stepanavan', children: null},
        {title: 'Spitak', children: null},
        {title: 'Tashir', children: null},
        {title: 'Akhtala', children: null},
        {title: 'Tumanyan', children: null},
        {title: 'Shamlugh', children: null}
    ]},
    {title:'Aragacotn', children:[
        {title:'Ashtarak', children:null},
        {title:'Aparan', children:null},
        {title:'Talin', children:null}
    ]},
    {title:'Armavir', children:[
        {title:'Armavir', children:null},
        {title:'Vagharshapat', children:null},
        {title:'Metsamor', children:null}
    ]},
    {title:'Ararat', children:[
        {title:'Artashat', children:null},
        {title:'Ararat', children:null},
        {title:'Masis', children:null},
        {title:'Vedi', children:null}
    ]},
    {title:'Syunik', children:[
        {title:'Kapan', children:null},
        {title:'Goris', children:null},
        {title:'Sisian', children:null},
        {title:'Qajaran', children:null},
        {title:'Meghri', children:null},
        {title:'Agarak', children:null},
        {title:'Dastakert', children:null}
    ]},
    {title:'Vayots dzor', children:[
        {title:'Yeghegnadzor', children:[
            {title:'Mikoyan', children:[
                {title:'Noric Nor', children:null}
            ]}
        ]},
        {title:'Vayq', children:null},
        {title:'Jermuk', children:null}
    ]},
    {title:'Gegharquniq', children:[
        {title:'Gavar', children: null},
        {title:'Tshambarak', children:null},
        {title:'Martuni', children:null},
        {title:'Sevan', children: null},
        {title:'Vardenis', children:null}
    ]},
    {title:'Kotayk', children:[
      {title:'Hrazdan', children:null},
      {title:'Abovyan', children:null},
      {title:'Charencavan', children:null},
      {title:'Yeghvard', children:null},
      {title:'Byureghavan', children:null},
      {title:'Nor Hatshn', children:null},
      {title:'Tsaghkadzor', children:null}
    ]},
    {title:'Yerevan', children:null},
]};

let ul = document.createElement('ul');
ul.id = 'myUL';
document.body.append(ul);

function makeTree(region, nestedList) {
    let li = document.createElement('li');
    li.innerHTML += region.title;
    nestedList.append(li);
    if (region.children !== null && Array.isArray(region.children)) {
        let span = document.createElement('span');
        span.className = 'caret';
        li.prepend(span);
        let nestedUl = document.createElement('ul');
        nestedUl.className = 'nested';
        li.append(nestedUl);
        
        region.children.forEach(child => {
            makeTree(child, nestedUl);
        });
    }
}
    

const searchField = document.querySelector('#search');

searchField.addEventListener('input', (event) => {
    let value = searchField.value.trim().toLowerCase();
    let filteredObj = makefilteredObj(value, RA);
    ul.innerHTML = '';
    makeTree(filteredObj, ul);

    let toggler = document.getElementsByClassName("caret");
    for (let i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function (event) {
        event.target.parentElement.querySelector(".nested").classList.toggle("active");
        event.target.classList.toggle("caret-down");
    });
    }
})
  
function makefilteredObj(value, obj) {
    let newObj = JSON.parse(JSON.stringify(obj));
    filter(value, newObj);
    return newObj;
}

function filter(value, obj) {
    if (obj.children) {
        obj.children = obj.children.filter(child => filter(value, child));
    }
    if (obj.children?.length === 0)
        obj.children = null;
    if ((!obj.title.toLowerCase().includes(value)) && (!obj.children)) {
        return false;
    }
    return true;
}