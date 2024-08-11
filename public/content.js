/* global chrome */
window.addEventListener("message", (event) => {
    if (event.source !== window || !event.data) {
        return;
    }
    if (event.data.type === "FETCH_DATA_FOR_DATE") {
        chrome.runtime.sendMessage(
            { type: "FETCH_DATA_FOR_DATE", date: event.data.date },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message to background script:", chrome.runtime.lastError);
                    return;
                }
                window.postMessage({ type: "RECEIVE_DATA", data: response.data }, "*");
            }
        );
    }

    if (event.data.type === "REQUEST_EVERY_DAY_DATA") {
        chrome.runtime.sendMessage(
            { type: "GET_EVERY_DAY_DATA" },
            (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message to background script:", chrome.runtime.lastError);
                    return;
                }
                window.postMessage({ type: "RECEIVE_EVERY_DAY_DATA", data: response.data }, "*");
            }
        );
    }
});

function getCurrentDateKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');  
    return `${year}-${month}-${day}`;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const time = getCurrentDateKey();
    if (request.type === 'sendData') {
        console.log('Data received from background script:', request.data);
        const washedData = {};
        Object.keys(request.data).forEach(domain => {
            const domainData = request.data[domain];
            if (domainData[time]) {
                washedData[domain] = domainData[time];
            }
        });
        window.postMessage({ type: "RECEIVE_DATA", data: washedData }, "*");
        sendResponse({ status: 'Data received in content script' });
    }
    return true;
});
