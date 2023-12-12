/**
 * 좌측 메뉴 영역 항목 추가
 * @param {title : String, url : String} params
 */
function addCategoryItem({title,url}) {
   const root = document.getElementById('categoryList');
   const wrapper = document.createElement('li');
   wrapper.className = 'cursor-pointer';
   wrapper.innerHTML = `
       <a class="flex flex-row item-center gap-3 hover:opacity-70">
           <span>✔</span>
           <span>${title}</span>
       </a>`;
   root.appendChild(wrapper);
}

/**
 * 좌측 메뉴 영역 생성
 * @param {Array} categoryList 
 */
function createCategoryList(categoryList){
    categoryList.map((category)=>{
        addCategoryItem(category);
    })
}