function categoryClickHandler(e){
    e.preventDefault();
    const categoryTitle = e.target.innerText;

    document.getElementById("apiCategory").innerText = categoryTitle;
}

/**
 * 좌측 메뉴 영역 항목 추가
 * @param {title : String, url : String} params
 * 
 * example) 
 * ✔ 카테고리1
 */
function addCategoryItem({categoryId,categoryName}) {
   const root = document.getElementById('categoryList');
   const wrapper = document.createElement('li');
   wrapper.className = 'categoryRow cursor-pointer';
   wrapper.innerHTML = `
       <a class="flex flex-row item-center gap-1 hover:opacity-70" >
           <span><img class="w-6" src="./images/Dot.png" alt="글머리 기호"/></span>
           <span class="w-full" data-category-id="${categoryId}">${categoryName}</span>
       </a>`;
   root.appendChild(wrapper);

   wrapper.addEventListener("click",categoryClickHandler);
}

/**
 * 좌측 메뉴 영역 생성
 * @param {Array} categoryList 
 * 
 * example)
 * ✔ 카테고리1
 * ✔ 카테고리2
 * ✔ 카테고리3 ...
 */
function createCategoryList(categoryList){
    categoryList.map((category)=>{
        addCategoryItem(category);
    })
}