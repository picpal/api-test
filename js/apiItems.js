/**
 * 요청하기 click event
 * Request Body의 Params를 endpoint 호출
 */
function requestBtnClickHandler(e) {
  e.preventDefault();

  const endpoint = e.target.getAttribute("data-endpoint");
  const formName = e.target.getAttribute("data-req-frm-name");
  const form = document.forms[formName];

  if (!form) {
    console.error("Form not found...");
    return;
  }

  // Form 내의 모든 input 요소를 순회하며 데이터를 수집
  const formData = {};
  Array.from(form.elements).forEach((input) => {
    if (input.name) {
      formData[input.name] = input.value;
    }
  });

  // 요청 파라미터
  console.log(`request params : ${JSON.stringify(formData)}` )

  // API 호출 (local에선 CORS에 걸림)
  const resResult = e.target.getAttribute("data-res-result");
  const $resResult = document.getElementById(resResult);
  
  
  //   // API 호출. Loacal에서 실행시 CORS 오류 주의
  //   callApi(endpoint, "POST", formData)
  //     .then((res) => {
//       // 성공 응답 처리
//       console.log("Response:", res);

//       // 응답 결과 출력
//       $resResult.innerText = res;
//     })
//     .catch((error) => {
    //       // 오류 처리
    //       console.error("Error:", error);
    
    //       // 오류 결과 출력
    //       $resResult.innerText = error;
    //     });
}


/**
 * 결과코드 복사
 */
function copyBtnClickHandler(e){
    e.preventDefault();
    const apiCode = e.target.getAttribute("data-api-code");
    const resultCode = document.getElementById("resResult_" + apiCode).innerText;
    navigator.clipboard.writeText(resultCode);
}

/**
 * 본문 컨텐츠 영역에 API Section 추가
 * @param {apiName:String, apiCode:String} params
*/
function addApiItems({ apiName, apiCode, endpoint ,description}) {
  const root = document.getElementById("apis");
  const wrap = document.createElement("div");
  wrap.className = "mt-20 mb-32";
  wrap.innerHTML = `
        <!-- title -->
        <h4 id="api_${apiCode}" class="mb-6 flex flex-row item-center">
            <span class="text-3xl font-bold mr-6 text-indigo-950 opacity-90">${apiName}</span>
            <span id="requestBtn_${apiCode}" data-req-frm-name="reqFrm_${apiCode}" data-res-result="${apiCode}" data-endpoint="${endpoint}" class="text-m py-2 px-3 bg-blue-600 text-white rounded cursor-pointer hover:opacity-70">요청하기</span>
        </h4>

        <!-- description -->
        <div class="mb-10">
            <div class="mb-6">
                <span class="font-bold text-green-700 mr-3">POST</span>
                <span class="text-blue-800">${endpoint}</span>
            </div>
            <div class="w-9/12 flex flex-col gap-2 text-sm">
                <p class="text-gray-600 leading-6">${description}</p>
            </div>
        </div>

        <!-- Request Body -->
        <div class="mb-6">
            <h5 class="text-2xl mb-4 text-indigo-950 opacity-90">Request Body</h5>
            <form name="reqFrm_${apiCode}">
                <div id="inputParams_${apiCode}" class="flex flex-row flex-wrap w-full gap-3"></div>
            </form>
        </div>

        <!-- Response -->
        <div>
        <h5 class="text-2xl mb-3 text-indigo-950 opacity-90">Response</h5>
        <div class="bg-gray-800 text-white p-5 rounded relative">
            <p id="resResult_${apiCode}">&nbsp;</p>
            <span class="absolute top-4 right-5 cursor-pointer">
                <img id="copyResultBtn_${apiCode}" data-api-code="${apiCode}" class="w-6" src="./images/CopySimple.png" alt="결과데이터 복사" />
            </span>
        </div>
        </div>
    `;
  root.appendChild(wrap);

  // request click event
  const requestBtn = document.getElementById("requestBtn_" + apiCode);
  requestBtn.addEventListener("click", requestBtnClickHandler);

  // copy click event
  const copyResultBtn = document.getElementById("copyResultBtn_"+ apiCode);
  copyResultBtn.addEventListener("click", copyBtnClickHandler);

}

/**
 * API Request Parameter영역에 Input 태그 추가
 * @param {Array} inputItem
 */
function addInputParam(inputItem) {
  const { title, name, type, value, essential, apiCode } = inputItem;
  const root = document.getElementById("inputParams_" + apiCode);
  const wrapper = document.createElement("div");
  wrapper.className = "basis-1/4 grow hover:opacity-70";
  wrapper.innerHTML = `
        <label>
            <span class="flex flex-row gap-1 items-center mb-2">
                <span class="${
                    essential ? "" : "hidden"
                } text-xs px-2 py-1 mr-3 rounded bg-red-400 text-white">필수</span>
                <span>${title}</span>
                <span><img class="w-6" src="./images/Dot.png" alt="글머리 기호"/></span>
                <span class="text-blue-600">${type}</span>
            </span>
            <input type="text" name="${name}" value="${value}" class="border border-gray-300 rounded-lg px-2 py-3 w-full" />
        </label>`;

  root.appendChild(wrapper);
}

/**
 * API 호출 영역 생성
 * @param {Array} apiItems
 */
function createApiItems(apiItems) {
  apiItems.map((apiItem) => {
    addApiItems(apiItem);

    apiItem?.inputItems.map((inputItem) => {
      addInputParam({ ...inputItem, ...{ apiCode: apiItem.apiCode } });
    });
  });
}
