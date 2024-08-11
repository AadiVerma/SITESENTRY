/* global chrome */
let currentActiveTab = { windowId: null, tabId: null, domain: null, lastActivated: null, favicon: null };
function getDomainFromUrl(url) {
    const urlObj = new URL(url);
    return urlObj.hostname;
}
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  function getAllStoredDataAndSendToContent(tabId) {
    chrome.storage.local.get(null, function(items) {
        console.log('Sending stored data to content script:', items);
        chrome.tabs.sendMessage(tabId, { action: 'sendData', data: items }, function(response) {
            if (response) {
                console.log('Response from content script:', response.status);
            } else {
                console.log('No response from content script.');
            }
        });
    });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'FETCH_DATA_FOR_DATE') {
        console.log("Entered fetch");
        const { date } = request;
        console.log("Date", date);
        chrome.storage.local.get(null, function(items) {
            const washedData = {};
            const time = getCurrentDateKey();
            Object.keys(items).forEach(domain => {
                const domainData = items[domain];
                if (domainData[time]) {
                    washedData[domain] = domainData[time];
                }
            });
            sendResponse({ data: washedData });
        });
        return true; 
    }
    if(request.type=='GET_EVERY_DAY_DATA'){
        console.log('Fetching every day data');
        chrome.storage.local.get(null, function(items) {
            const washedData = {};
            Object.keys(items).forEach(domain => {
                const domainData = items[domain];
                Object.keys(domainData).forEach(date => {
                    if (washedData[date]) {
                        washedData[date][domain] = domainData[date].timeSpent;
                    } else {
                        washedData[date] = { [domain]: domainData[date].timeSpent };
                    }
                });
            });
            sendResponse({ data: washedData });
        });
        return true;
    }
});
  
//   async function fetchSomeData() {
//     return { message: 'Hello from the background script!' };
//   }

function getCurrentDateKey() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}



function updateDomainTime(domain, isActive, favicon = null, callback = () => {}) {
    chrome.storage.local.get(domain, (items) => {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving the domain:", chrome.runtime.lastError);
            return;
        }

        const now = Date.now();
        const dateKey = getCurrentDateKey();
        let domainData = items[domain] || {};

        if (domainData[dateKey]) {
            if (domainData[dateKey].lastActivated && !isActive) {
                const timeSpentMillis = now - domainData[dateKey].lastActivated;
                const timeSpentSeconds = Math.floor(timeSpentMillis / 1000);
                domainData[dateKey].timeSpent += timeSpentSeconds;
            }
            domainData[dateKey].lastActivated = isActive ? now : null;
        } else {
            domainData[dateKey] = {
                lastActivated: isActive ? now : null,
                timeSpent: 0,
                favicon: favicon || null
            };
        }

        if (favicon && !domainData[dateKey].favicon) {
            domainData[dateKey].favicon = favicon;
        }

        chrome.storage.local.set({ [domain]: domainData }, callback);
    });
}

function deactivateCurrentTab(callback) {
    if (currentActiveTab.domain && currentActiveTab.lastActivated) {
        updateDomainTime(currentActiveTab.domain, false, currentActiveTab.favicon, callback);
    } else {
        callback();
    }
}
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        getAllStoredDataAndSendToContent(tabId);
        deactivateCurrentTab(() => {
            const domain = getDomainFromUrl(tab.url);
            if (domain) {
                currentActiveTab = { windowId: tab.windowId, tabId: tabId, domain: domain, lastActivated: Date.now(), favicon: tab.favIconUrl };
                updateDomainTime(domain, true, tab.favIconUrl);
            }
        });
    }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    deactivateCurrentTab(() => {
        chrome.tabs.get(activeInfo.tabId, (tab) => {
            if (tab.url) {
                const domain = getDomainFromUrl(tab.url);
                const favicon = tab.favIconUrl;
                if (domain) {
                    currentActiveTab = { windowId: activeInfo.windowId, tabId: activeInfo.tabId, domain: domain, lastActivated: Date.now(), favicon: favicon };
                    chrome.storage.local.get(domain, (items) => {
                        const dateKey = getCurrentDateKey();
                        console.log(domain);
                        if (!items[domain] || !items[domain][dateKey]) {
                            updateDomainTime(domain, true, favicon, () => {
                                console.log(`${domain} added with favicon ${favicon}`);
                                getAllStoredDataAndSendToContent(activeInfo.tabId);
                            });
                            
                        } else {
                            updateDomainTime(domain, true, favicon);
                            getAllStoredDataAndSendToContent(activeInfo.tabId);
                        }
                        console.log(domain,items[domain]);
                    });
                    
                }            }
        });
    });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        deactivateCurrentTab(() => {});
    } else {
        chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
            if (tabs.length > 0 && tabs[0].url) {
                const domain = getDomainFromUrl(tabs[0].url);
                if (domain) {
                    deactivateCurrentTab(() => {
                        currentActiveTab = { windowId: windowId, tabId: tabs[0].id, domain: domain, lastActivated: Date.now(), favicon: tabs[0].favIconUrl };
                        updateDomainTime(domain, true, tabs[0].favIconUrl);
                    });
                }
            }
        });
    }
});
