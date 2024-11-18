let browserInfo = navigator.userAgent;
let isAndroid = browserInfo.indexOf("GA_Android") > -1;
let isIOS = browserInfo.indexOf("GA_iOS_WK") > -1;
let commonData = {};

function removeEmptyElement(removeValue) {
  let returnValue = {};
  for (key in removeValue) {
    if (
      removeValue[key] === "" ||
      removeValue[key] === null ||
      removeValue[key] === undefined
    ) {
      delete removeValue[key];
    }
  }
  returnValue = removeValue;

  return returnValue;
}

function resetDataLayer(targetObject) {
  let setGTM = {};
  for (key in targetObject) {
    setGTM[key] = undefined;
  }

  return dataLayer.push(setGTM);
}

function hybrid(object) {
  let GAData = { ...commonData, ...object };
  isAndroid
    ? window.gascriptAndroid.GAHybrid(JSON.stringify(GAData))
    : webkit.messageHandlers.gascriptiOS.postMessage(JSON.stringify(GAData));
}

function sendGAPage(object) {
  try {
    object = removeEmptyElement(object);
    commonData = { ...object };
    if (isAndroid || isIOS) {
      object.type = "P";
      hybrid(object);
    } else {
      window.dataLayer = window.dataLayer || [];

      dataLayer.push(object);

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-56L8DVV");
    }
  } catch (e) {
    console.log("sendGAPage 함수 ERROR");
    console.log(e.message);
  }
}

function sendGAEvent(object) {
  try {
    let GAData = removeEmptyElement(object);
    if (isAndroid || isIOS) {
      GAData.type = "E";
      hybrid(GAData);
    } else {
      GAData.event = "ga_event";
      dataLayer.push(GAData);
      resetDataLayer(GAData);
    }
  } catch (e) {
    console.log("sendGAEvent 함수 ERROR");
    console.log(e.message);
  }
}

function sendGAEcommerce(eventData, transaction, items) {
  try {
    eventData = removeEmptyElement(eventData);
    transaction = removeEmptyElement(transaction);
    for (var i in items) items[i] = removeEmptyElement(items[i]);
    if (isAndroid || isIOS) {
      let GAData = {
        ...eventData,
        transaction,
        items,
        type: "E",
      };
      hybrid(GAData);
    } else {
      let GAData = {
        event: "ga_ecommerce",
        ...eventData,
        ecommerce: {
          ...transaction,
          items,
        },
      };
      dataLayer.push(GAData);
      resetDataLayer(GAData);
    }
  } catch (e) {
    console.log("sendGAEcommerce 함수 ERROR");
    console.log(e.message);
  }
}

// 클릭 이벤트
function btnClickEvent(action, label) {
  const eventData = {
    ep_category: "클릭",
    ep_action: action,
    ep_label: label,
  };

  sendGAEvent(eventData);
}
