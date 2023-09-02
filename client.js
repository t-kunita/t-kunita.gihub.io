// client.js
const baseUrl='http://tmcqdpu3366:3000'

//画面表示したらデータを取得する
document.addEventListener('DOMContentLoaded', fetchData);

//検索データを取得＆表示する
async function fetchData() {
  try {
    const response = await fetch(baseUrl+'/data');
    const data = await response.json();

    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.Category}</td>
        <td>${item.Mid_Category}</td>
        <td>${item.Kyoten}</td>
        <td>${item.Tateya}</td>
        <td>${item.Floor}</td>
        <td>${item.DisplayName}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}

//拠点の値が変わったら建屋を設定する
const category = document.getElementById("category");   
const kyoten = document.getElementById("kyoten");   
kyoten.addEventListener("change",async function(){
  if (category.value !== "none" && kyoten.value !== "none"){
    const response = await fetch( baseUrl + "/tateya?param1=" + category.value + "&param2=" + kyoten.value );

    if (!response.ok) {
      throw new Error('Fetch error: ' + response.status);
    }
     
    const data =  await response.json();
  
    const selectElement = document.getElementById("tateya")
 
    // 既存のオプション要素をすべて削除
    while (selectElement.firstChild) {
      selectElement.removeChild(selectElement.firstChild);
    }
    const optionElement = document.createElement("option");
    optionElement.value = "none"; // オプションの値を設定
    optionElement.textContent = "選択してください"; // オプションの表示テキストを設定    
    selectElement.appendChild(optionElement); // <select> 要素にオプションを追加

    data.forEach(item => {
      console.log("tateya:" + item.tateya);
      const optionElement = document.createElement("option");
      optionElement.value = item.tateya; // オプションの値を設定
      optionElement.textContent = item.tateya; // オプションの表示テキストを設定
      selectElement.appendChild(optionElement); // <select> 要素にオプションを追加
    });    
  }
});


//ワニをクリックしたら、ワニを増殖する
const gator = document.getElementById("gator");
gator.addEventListener("click",function(){
    gator.innerHTML += "🐊";
});

//検索ボタンを押したら、選択された「分類」「拠点」を条件にDB検索する
const button = document.getElementById("searchButton");
button.addEventListener("click",async function(){
  if (category.value !== "none" && kyoten.value !== "none"){
    const response = await fetch( baseUrl + "/search?param1=" + category.value + "&param2=" + kyoten.value );

      const data = await response.json();
  
      const tableBody = document.querySelector('#data-table tbody');
      tableBody.innerHTML = '';
  
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.Category}</td>
          <td>${item.Mid_Category}</td>
          <td>${item.Kyoten}</td>
          <td>${item.Tateya}</td>
          <td>${item.Floor}</td>
          <td>${item.DisplayName}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  });
