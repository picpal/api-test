/**
 * 퀵 메뉴 영역 항목 추가
 * @param {title : String, url : String} params
 */
function addQuickMenuItem({ apiName, apiCode }) {
  const root = document.getElementById("quickMenu");
  const wrapper = document.createElement("ul");
  wrapper.className = "text-sm";
  wrapper.innerHTML = `
    <li class="hover:bg-gray-100">
      <a href="#api_${apiCode}" class="px-5 py-3 cursor-pointer w-full h-full block">${apiName}</a>
    </li>`;
  root.appendChild(wrapper);
}

/**
 * 퀵 메뉴 영역 생성
 * @param {Array} categoryList
 */
function createQuickMenu(quickMenuList) {
  quickMenuList.map((quickMenuItem) => {
    addQuickMenuItem(quickMenuItem);
  });
}
