/**
 * 본문 컨텐츠 영역에 API Section 추가
 * @param {apiName:String, apiCode:String} params
 */
function addApiItems({apiName,apiCode}){
    const root = document.getElementById("apis");
    const wrap = document.createElement("div");
    wrap.className = 'mt-20';
    wrap.innerHTML = `
        <!-- title -->
        <h4 class="mb-6 flex flex-row item-center">
        <span class="text-3xl text-bold mr-6">${apiName}</span>
        <span class="text-m py-2 px-3 bg-blue-600 text-white rounded cursor-pointer hover:opacity-70">요청하기</span>
        </h4>

        <!-- description -->
        <div class="mb-10">
            <div class="mb-6">
                <span class="font-bold text-green-700 mr-3">POST</span>
                <span class="text-blue-800">/v1/payments/call</span>
            </div>
            <div class="w-9/12 flex flex-col gap-2 text-sm">
                <p>- 카드 번호 결제 API는 추가 계약 후 사용할 수 있습니다.</p> 
                <p>- 결제할 카드 번호 및 기타 카드 정보로 결제를 요청합니다.</p> 
            </div>
        </div>

        <!-- Request Body -->
        <div class="mb-6">
            <h5 class="text-2xl mb-4">Request Body</h5>
            <div id="inputParams_${apiCode}" class="flex flex-row flex-wrap w-full gap-3"></div>
        </div>

        <!-- Response -->
        <div>
        <h5 class="text-2xl mb-3">Response</h5>
        <div class="bg-gray-800 text-white p-5 rounded">
            <p class="resResult"></p>
        </div>
        </div>
    `

    root.appendChild(wrap);
}

/**
 * API Request Parameter영역에 Input 태그 추가
 * @param {Array} inputItem 
 */
function addInputParam(inputItem) {
    const rootId = inputItem.apiCode;
    const root = document.getElementById('inputParams_'+rootId);
    const wrapper = document.createElement('div');
    wrapper.className = 'basis-1/4 grow hover:opacity-70';
    wrapper.innerHTML = `
        <label>
            <span class="flex flex-row gap-2 items-center mb-2">
                <span>param1</span>
                <span class="text-red-600">String</span>
                <span class="text-xs px-2 py-1 rounded bg-red-400 text-white">필수</span>
            </span>
            <input type="text" class="border border-gray-300 rounded-lg px-2 py-3 w-full" />
        </label>`;

    root.appendChild(wrapper);
}

/**
 * API 호출 영역 생성
 * @param {Array} apiItems 
 */
function createApiItems(apiItems){
    apiItems.map((apiItem)=>{
        addApiItems(apiItem);

        apiItem?.inputItems.map((inputItem) => {
            addInputParam({...inputItem,...{apiCode : apiItem.apiCode}});
        })
    })
}
