function ajax(url, bearer, param, method, headerDOM, msg) {
  return new Promise(function (resolve, reject) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);

  xhr.setRequestHeader(
  'Authorization', "Bearer" + decodeURI('%20') + bearer
  );
  xhr.setRequestHeader(
  'Content-type', 'application/json'
  );
  xhr.onload = function () {
  if (xhr.status == 200) {
  resolve(xhr.response);
  } else if (xhr.status == 201 || xhr.status == 204) {
  headerDOM.innerText = msg;
  console.log(xhr.status + ' : ' + xhr.statusText);
  } else {
  reject(new Error(xhr.statusText + ' : ' + xhr.responseText));
  }
  };
  xhr.onerror = reject ;
  xhr.send(JSON.stringify(param));
  });
}

function getSessionId(){
  var strCookies = document.cookie;
  var cookiearray = strCookies.split(';');
  var sid;

  for(var i=0; i<cookiearray.length; i++){
  name = cookiearray[i].split('=')[0].trim();
  if(name === 'sid'){
  sid = cookiearray[i].split('=')[1].trim();
  }
  }
  return sid;
}

function getOppId(){
  if (/\/(006\w{12})/.test(location.pathname)){
  return RegExp.$1;
  }
}

var setActivity = function(oppId){
  var bearer = getSessionId();
  var seTaskType = encodeURI("2e. Other Customer Support");
  var eventUrl = '/services/data/v40.0/sobjects/Event';
  var eventParam = {
    "WhatId" : oppId,
    "Subject" : "SEAssigned",
    "RecordTypeId" : "01230000001GgBY",
    "SE_Task_Type__c" : "2e. Other Customer Support",
    "DurationInMinutes" : 0,
    "ActivityDateTime" : "2017-06-01T00:00:00Z"
  };

  // var oppTitle = document.querySelector('.pageDescription');
  // var oppName = oppTitle.innerText;

  function onFulfilled(response) { console.log("onFulfilled : " + response);}
  function onRejected(error) { console.log(error);}


  ajax(eventUrl, bearer, eventParam, 'POST').then(onFulfilled, onRejected);
};


var bearer = getSessionId();
var oppId = getOppId();
var takanoId = "00530000004wzzq";
var fujitaId = "00530000001fIYL";
var akibaId = "00530000003i7fu";
var tsumagariId = "005300000013g9OAAQ";
var mgrId = akibaId;
var oppUrl = '/services/data/v37.0/sobjects/Opportunity/' + oppId;
var dcUrl = '/services/data/v37.0/sobjects/Deal_Contribution__c';
var oppParam = {"Tech_Exec__c" : mgrId};
var dcParam = {
  "SE_Name__c": tsumagariId,
  "Opportunity__c": oppId
};
var oppTitle = document.querySelector('.pageDescription');
var oppName = oppTitle.innerText;

function onFulfilled(response) { console.log(response);}
function onRejected(error) { console.log(error);}
function changeOppTitleFunc(msg){
  return function (msg){
  console.log("changeOppTitleFunc called.");
  oppTitle.innerText(msg);
  debugger;
  window.alert(1);
  window.location.reload();
  };
}
function reload(location){
  return function(){
    window.alert(2);
    debugger;
    location.reload();
  }
}

oppTitle.innerText = 'Updating ...';
if (typeof window.isDCCreating === "undefined") {
  window.isDCCreating = true;
  ajax(oppUrl, bearer, oppParam, 'PATCH', oppTitle, 'Creating DC...').then(onFulfilled, onRejected);
  ajax(dcUrl, bearer, dcParam, 'POST', oppTitle, oppName).then(changeOppTitleFunc(oppName), onRejected).then(reload(window.location), onRejected);
  setActivity(oppId);
}


