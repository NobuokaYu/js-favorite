//エントリーページ用です
window.addEventListener('DOMContentLoaded', (event) => {


  //localStorageにdatalistを用意する
  window.addEventListener('load',function(){
    var arr = [];
    for ( var i = 0, len = localStorage.length; i < len; i++ ) {
      var storageFirst = localStorage.key( i ) ;
      arr.push(storageFirst);
    };
    if(arr.includes('jsonData')){
      console.log('ログインは初めてではありません')
    }else{
      localStorage.setItem('jsonData',JSON.stringify(datalist));
      location.reload();
    }
  },false);

    const favorite = document.getElementsByName("favorite")[0];//nameでbutton要素を取得
    const favoritedList = document.getElementById("favoritedList");
    const url = location.href;//urlを取得する
    const title = document.title;//title setting here!!
    var datalist = {};//オブジェクトを生成 //url:title
    var objData = JSON.parse(localStorage.getItem('jsonData'));
    var keyData = Object.keys(objData);
    var valueData = Object.values(objData);
    var datalist = objData;


    //ボタンの書き換え
    window.addEventListener('load',function(){
      if(url in datalist){
        //既に含まれるとき
        favorite.textContent = "ブックマーク済み";
      }else{
        //含まれていないとき
        favorite.textContent = "ブックマークする";
      }
    },false);

    //localstorageにdatalistをpushする
    const pushData = function(){
      localStorage.setItem('jsonData',JSON.stringify(datalist));
    };

    //storageを見に行き全てfavoritedListに出力する関数
    const outputStorageAll = function(){
      for ( var i = 0, len = valueData.length; i < len; i++ ) {
        var storageItem = valueData[i];
        var newDiv = document.createElement("div"); //div要素作成
        newDiv.setAttribute("id",keyData[i]); // div要素にidを設定
        newDiv.setAttribute("draggable",true); // dragできるようにする
        newDiv.className = "ele";
        var newElementHum = document.createElement("div");
        newElementHum.className ="Hum";
        newElementHum.style.cursor = "move";
        for( j=0;j<3;j++){
            let newElementSpan = document.createElement("span"); // span要素作成
            newElementHum.appendChild(newElementSpan);
        };
        newDiv.appendChild(newElementHum); //div要素にハンバーガーを追加
        var newElementA = document.createElement("a"); // a要素作成
        var newContentA = document.createTextNode(storageItem); // テキストノードを作成
        newElementA.appendChild(newContentA); // a要素にテキストノードを追加
        newElementA.setAttribute("href",keyData[i]); // a要素にhrefを設定
        newDiv.appendChild(newElementA); //div要素にa要素を追加
        var newElementButton = document.createElement("button"); // button要素作成
        var newContentButton = document.createTextNode("★"); // テキストノードを作成
        newElementButton.appendChild(newContentButton); // button要素にテキストノードを追加
        newElementButton.setAttribute("data-name",keyData[i]); // button要素にnameを設定
        newDiv.appendChild(newElementA); //div要素にa要素を追加
        newDiv.appendChild(newElementButton); //div要素にbutton要素を追加
        // 親要素の最後の子要素を追加
        // 親要素（div）への参照を取得
        var parentDiv = favoritedList;
        // 追加
        parentDiv.appendChild(newDiv);
      };
    };

    //追加された物だけを加えて出力する関数
    const outputStorage = function(){
        var newDiv = document.createElement("div"); //div要素作成
        newDiv.setAttribute("id",url); // div要素にidを設定
        newDiv.setAttribute("draggable",true); // dragできるようにする
        newDiv.className = "ele";
        var newElementHum = document.createElement("div");
        newElementHum.className ="Hum";
        newElementHum.style.cursor = "move";
        for( j=0;j<3;j++){
            let newElementSpan = document.createElement("span"); // span要素作成
            newElementHum.appendChild(newElementSpan);
        };
        newDiv.appendChild(newElementHum); //div要素にハンバーガーを追加
        var newElementA = document.createElement("a"); // a要素作成
        var newContentA = document.createTextNode(title); // テキストノードを作成
        newElementA.appendChild(newContentA); // a要素にテキストノードを追加
        newElementA.setAttribute("href",url); // a要素にhrefを設定
        var newElementButton = document.createElement("button"); // button要素作成
        var newContentButton = document.createTextNode("★"); // テキストノードを作成
        newElementButton.appendChild(newContentButton); // button要素にテキストノードを追加
        newElementButton.setAttribute("name",url); // button要素にnameを設定
        newDiv.appendChild(newElementA); //div要素にa要素を追加
        newDiv.appendChild(newElementButton); //div要素にbutton要素を追加
        // 親要素の最後の子要素を追加
        // 親要素（div）への参照を取得
        var parentDiv = favoritedList;
        // 追加
        parentDiv.appendChild(newDiv);
    };


    //既にお気に入りかを見極め挙動を変える関数
    favorite.addEventListener('click',function(){
      if(url in datalist){
        //既に含まれるとき
          removeItem(url);
          pushData();
          favorite.textContent = "ブックマークする";

      }else{
        //含まれていないとき
          outputStorage();
          datalist[url] = title;
          pushData();
          favorite.textContent = "ブックマーク済み";
          starEvent();
          DnDEvent();
      };
    },false);

    //削除するための関数
    const removeItem = function(e){
      delete datalist[e];
      document.getElementById(e).remove();
    };

    //ストレージだけから削除する関数
    const removeStorageItem = function(e){
      delete datalist[e];
    };

    //loadするたびに確認する
    window.addEventListener('load',function() {
      outputStorageAll();
      DnDEvent();
      starEvent();
    },false);

    //リスト内ブックマークにクリックイベントをつける。ロードするまで残しておく。
    const starEvent = function(){
      let buttonNodeList = document.querySelectorAll("div#favoritedList button");//nodeリストで取得
      for (let i = 0; i < buttonNodeList.length; i++) {
        let buttonNodeItem = buttonNodeList[i];
        let itemUrl = buttonNodeItem.name;//nameにurl入れてる
        let itemTitle = buttonNodeItem.previousElementSibling.textContent;//ボタンのテキストからタイトル取得
        buttonNodeItem.addEventListener('click',function(event){
          if(itemUrl in datalist){
            //既に含まれるとき
              removeStorageItem(itemUrl);
              pushData();
              event.target.textContent = "☆";
              //押された星がそのページだった時、ボタンの文字を書き換える
              if(itemUrl===url){
                favorite.textContent = "ブックマークする";
              };
          }else{
            //含まれていないとき
              datalist[itemUrl] = itemTitle;
              pushData();
              event.target.textContent = "★";
              //押された星がそのページだった時、ボタンの文字を書き換える
              if(itemUrl===url){
                favorite.textContent = "ブックマーク済み";
              };
          };
        },false);
      };
    };

    //ドラッグできるようにする
    function addDnDHandlers(event) {
      event.addEventListener('dragstart', handleDragStart, false);
      event.addEventListener('dragenter', handleDragEnter, false)
      event.addEventListener('dragover', handleDragOver, false);
      event.addEventListener('dragleave', handleDragLeave, false);
      event.addEventListener('drop', handleDrop, false);
      event.addEventListener('dragend', handleDragEnd, false);
      event.addEventListener('dragend', changeStorage, false);


    }
    const DnDEvent = function(){
      let divNodeList = document.querySelectorAll("div#favoritedList div.ele");//nodeリストで取得
      for (let i = 0; i < divNodeList.length; i++) {
        let divNodeItem = divNodeList[i];
        addDnDHandlers(divNodeItem);
        };
      };

    var dragSrcEl = null;

    function handleDragStart(e) {
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.outerHTML);
      this.style.opacity = '0.4';
    };

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      };

      let rect = this.getBoundingClientRect();
      if ((e.clientY - rect.top) < (this.clientHeight / 2)) {
			//マウスカーソルの位置が要素の半分より上
			this.style.borderTop = '2px solid red';
			this.style.borderBottom = '';
		} else {
			//マウスカーソルの位置が要素の半分より下
			this.style.borderTop = '';
			this.style.borderBottom = '2px solid red';
		};

      e.dataTransfer.dropEffect = 'move';
      return false;
    };

    function handleDragEnter(e) {
    };

    function handleDragLeave(e) {
      this.style.borderTop = '';
	  	this.style.borderBottom = '';
      this.style.opacity = '1.0';
    };

    function handleDrop(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      };

      let rect = this.getBoundingClientRect();
      if(dragSrcEl != this){
        if ((e.clientY - rect.top) < (this.clientHeight / 2)) {  //(マウスポインターの位置 - div要素の上辺の位置)<(div要素の高さの半分)
    			//マウスカーソルの位置が要素の半分より上
            this.parentNode.removeChild(dragSrcEl);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin', dropHTML);
            var dropElem = this.previousSibling;
            addDnDHandlers(dropElem);
            var dropElemButton = dropElem.getElementsByTagName("button")[0];
            var dropElemUrl = dropElemButton.name;
            var dropElemTitle = dropElemButton.previousElementSibling.textContent;
            dropElemButton.addEventListener('click',function(event){
              if(dropElemUrl in datalist){
                //既に含まれるとき
                  removeStorageItem(dropElemUrl);
                  pushData();
                  event.target.textContent = "☆";
              }else{
                //含まれていないとき
                  datalist[dropElemUrl] = dropElemTitle;
                  pushData();
                  event.target.textContent = "★";
              };
            },false);
    		} else {
    			//マウスカーソルの位置が要素の半分より下
            console.log(this);
            this.parentNode.removeChild(dragSrcEl);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('afterend', dropHTML);
            var dropElem = this.nextElementSibling;
            console.log(dropElem);
            addDnDHandlers(dropElem);
            var dropElemButton = dropElem.getElementsByTagName("button")[0];
            console.log(dropElemButton);
            var dropElemUrl = dropElemButton.name;
            var dropElemTitle = dropElemButton.previousElementSibling.textContent;
            dropElemButton.addEventListener('click',function(event){
              //ストレージにある要素を全て配列arrに入れる
              if(dropElemUrl in datalist){
                //既に含まれるとき
                  removeStorageItem(dropElemUrl);
                  pushData();
                  event.target.textContent = "☆";
              }else{
                //含まれていないとき
                  datalist[dropElemUrl] = dropElemTitle;
                  pushData();
                  event.target.textContent = "★";
              };
            },false);
    		};

      };

      this.style.opacity = '1.0';
      this.style.borderTop = '';
	  	this.style.borderBottom = '';
      return false;
    };

    function handleDragEnd(e) {
      this.style.borderTop = '';
		  this.style.borderBottom = '';
      this.style.opacity = '1.0';
    };
    //要素の順番を読み込みlocalstorageを書き換える
    const changeStorage = function(){
      let changedList = {};
      let divList = document.querySelectorAll("div#favoritedList .ele");//nodeリストで取得
      for (let i = 0; i < divList.length; i++) {
        let itemAtagHref = divList[i].getElementsByTagName("a")[0].getAttribute("href");//aタグのhrefを取得
        let itemAtagText = divList[i].getElementsByTagName("a")[0].textContent;//aタグのテキストを取得
        if(itemAtagHref in datalist){
          //localstorageに反映
          changedList[itemAtagHref] = itemAtagText;
        }else{
          //skip
        };

      };
      localStorage.removeItem("jsonData");
      localStorage.setItem('jsonData',JSON.stringify(changedList));
      datalist = changedList;
    };

});
