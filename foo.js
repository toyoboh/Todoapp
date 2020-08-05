//要素の取得をしていく
let inText = document.getElementById('in-text');//input text
let saveBtn = document.getElementById('save');  //btn save
let listBox = document.getElementById('list-box');// ul
let div = document.querySelector('.plass-area');

//実際に起動する関数

saveBtn.addEventListener('click', function() {
  
  //if文でinTextの中身を確認して、''（空）の場合は実行しない
  let check = inText.value;
  if(check != '') {
    
    //li,pを2個,buttonも2個作る
    let listItem = document.createElement('li');
    let listP1 = document.createElement('p');
    let listP2 = document.createElement('p');
    let listBtn1 = document.createElement('button');
    let listBtn2 = document.createElement('button');

    listBtn1.classList.add('count-task');
    
    //li要素をulの子要素として入れる
    listBox.insertBefore(listItem,null)
    //p要素をli要素を親として入れる
    listItem.insertBefore(listP1,null);
    listItem.insertBefore(listP2,null);
    //buttonの表示文字をそれぞれ決める
    listBtn1.textContent = '完了';
    listBtn2.textContent = '削除';
    //button要素をlistP2を親として入れる
    listP2.insertBefore(listBtn1,null);
    listP2.insertBefore(listBtn2,null);
    
    //登録時の関数実行 p要素に入力値を入れたいから引数はlistP1要素
    save(listP1);
    
    //作った削除ボタンが押された場合実行する  引数は削除ボタン
    listBtn2.addEventListener('click',() => {
      deleteList(listBtn2);
    });
    
    //完了時の関数実行  引数は完了ボタン
    listBtn1.addEventListener('click',() => {
      complete(listBtn1);
    });
    
  }
});

//登録時の関数
const save = listP1 => {
  let text = inText.value;  //入力値を変数に代入
  listP1.textContent = text;//作られたP1の中身にtextを入れる
  inText.value = '';        //次も使うから入力値を空に
}

//削除時の関数
const deleteList = listBtn2 => {
  let parent = listBtn2.parentElement;  //削除ボタンの親要素(p)取得
  let bigParent = parent.parentElement; //さらにpの親要素(li)取得
  
  listBox.removeChild(bigParent);       //li要素全体を削除
}

//完了時の関数
const complete = listBtn1 => {
  let parent = listBtn1.parentElement;  //完了ボタンの親要素(p)取得
  let bigParent = parent.parentElement; //さらにpの親要素(li)取得
  
  bigParent.style.opacity = '.3';
  parent.removeChild(listBtn1);
}

//オリジナル機能用☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆
//タスクの数を数えてその表示をする、また、6個以上ある場合は助けを求める
let h3 = document.getElementById('count');     //h3を取得
let body = document.querySelector('body');

//タスクの数(完了ボタン)を1秒毎に数える関数
const countTask = function(){
  var count = document.getElementsByClassName("count-task").length;

  if(count > 5) {
    body.style.backgroundColor = 'rgb(155, 0, 0)';
    h3.style.color = 'white';
    h3.innerHTML = `終わっていないタスクが<strong>${count}個</strong>あります。<br>
                    一度諦めて助けを求めましょう。。。`
  } else if(count <= 5) {
    h3.innerHTML = `終わっていないタスクが<strong>${count}個</strong>あります。`;
    body.style.backgroundColor = 'rgb(255, 199, 199)';
    h3.style.color = 'rgb(59, 59, 59)';
  }
} 


setInterval(countTask, 1000);