function onOpen() {
  var ui = SpreadsheetApp.getUi();           // Uiクラスを取得する
  var menu = ui.createMenu('データ更新');  // Uiクラスからメニューを作成する
  menu.addItem('チームメンバーシート作成','チームメンバーシート作成');
  menu.addItem('全体更新','trigger')
  menu.addItem('会員データ更新', '会員データ更新');   // メニューにアイテムを追加する
  menu.addItem('機会創出更新', '機会創出更新');   // メニューにアイテムを追加する
  menu.addItem('各訴求管理ページ更新', '各訴求管理ページ更新');   // メニューにアイテムを追加する
  menu.addToUi();                            // メニューをUiクラスに追加する
}

function trigger(){
  メンターとエンターの更新()
  会員データ更新()
  機会創出更新()
  案件情報更新()
  各訴求管理ページ更新()
  機会創出追加()
}

function チームメンバーシート作成() {
  var ss_copyFrom = SpreadsheetApp.openById('1_R4DXmksraue_PLhtxhZwIJJTxY2tD9y-0ppEI_W0mw');//OCチームインフラ原本
  var ss_copyTo = SpreadsheetApp.getActiveSpreadsheet();
  var teamMemberList = ss_copyTo.getSheetByName('チーム全体').getRange('K2:2').getValues()[0].filter(String);
  var existMemberSheetList = makeMemberSheetList(ss_copyTo.getSheets());
  var existMemberSokyuSheetList = makeMemberSokyuSheetList(ss_copyTo.getSheets()).map(e => e.replace("_訴求管理",""));
  for (let i = 0; i < teamMemberList.length; i++){
    if (!existMemberSheetList.includes(teamMemberList[i])){
      let newSokyuSheet = ss_copyFrom.getSheetByName("土井星太朗").copyTo(ss_copyTo);
      newSokyuSheet.setName(teamMemberList[i]);
      newSokyuSheet.getRange("D2").setValue(teamMemberList[i]);
    }
    if (!existMemberSokyuSheetList.includes(teamMemberList[i])){
      let newSokyuSheet = ss_copyFrom.getSheetByName("土井星太朗_訴求管理").copyTo(ss_copyTo);
      newSokyuSheet.setName(teamMemberList[i]+"_訴求管理");
    }
  }
  各訴求管理ページ更新()
}

function メンターとエンターの更新() {
  var ss_copyFrom = SpreadsheetApp.openById('1Y8j39M0nzboMnBBfGJ_NIvpfmUFy300QjtUmvlavrow'); //コピー元の獲得管理インフラ
  var ss_copyTo = SpreadsheetApp.getActiveSpreadsheet();
 
  var sheet_copyFrom = ss_copyFrom.getSheetByName('【全員記入】面談管理'); //コピー元のスプレッドシートの値を抜き出したいシート名
  var sheet_copyTo = ss_copyTo.getSheetByName('メンターとエンター組み合わせリスト'); //ペーストする自分のスプレッドシートのシート名
 
  sheet_copyTo.clear();// コピー元の行や列が減っていることを考慮して、一旦コピペ先のシートをクリア
 
  var lastRow = sheet_copyFrom.getRange('B8:B').getValues().filter(String).length;//最終行を取得

  var copyValue = sheet_copyFrom.getRange(8,2,lastRow,1).getValues(); //エンターをコピー
  sheet_copyTo.getRange(2,2,lastRow,1).setValues(copyValue); //自分のシートにコピーした値を全範囲をペースト
  var copyValue = sheet_copyFrom.getRange(8,6,lastRow,1).getValues(); //メンターをコピー
  sheet_copyTo.getRange(2,1,lastRow,1).setValues(copyValue); //自分のシートにコピーした値を全範囲をペースト
}

function 会員データ更新() {
  var ss_copyFrom = SpreadsheetApp.openById('1CklUMAsZCZpd-bZ1S7cLe88deRDZpw0b03IraBv0GPA'); //コピー元のマスターデータのあるスプレッドシート
  var ss_copyTo = SpreadsheetApp.getActiveSpreadsheet();
 
  var sheet_copyFrom = ss_copyFrom.getSheetByName('会員データ'); //コピー元のスプレッドシートの値を抜き出したいシート名
  var sheet_copyTo = ss_copyTo.getSheetByName('（原本）会員データ'); //ペーストする自分のスプレッドシートのシート名
 
  var lastRow = sheet_copyFrom.getLastRow(); //最終行を取得
  var lastColumn = sheet_copyFrom.getLastColumn(); //最終列を取得

  var copyValue = sheet_copyFrom.getRange(1,1,lastRow,lastColumn).getValues(); //コピー元のシートから値の入っている全範囲をコピー
  sheet_copyTo.getRange(1,1,lastRow,lastColumn).setValues(copyValue); //自分のシートにコピーした値を全範囲をペースト
}

function 機会創出更新() {
  var ss_copyFrom = SpreadsheetApp.openById('1Cx2iA032_JOVyohH9CyhY-vEWU79hn3zUc7CTDoyI5U'); //コピー元のマスターデータのあるスプレッドシート
  var ss_copyTo = SpreadsheetApp.getActiveSpreadsheet();
 
  var sheet_copyFrom = ss_copyFrom.getSheetByName('機会創出エントリー'); //コピー元のスプレッドシートの値を抜き出したいシート名
  var sheet_copyTo = ss_copyTo.getSheetByName('（原本）機会創出'); //ペーストする自分のスプレッドシートのシート名
  sheet_copyTo.clear();// コピー元の行や列が減っていることを考慮して、一旦コピペ先のシートをクリア
  var lastRow = sheet_copyFrom.getLastRow(); //最終行を取得
  var lastColumn = sheet_copyFrom.getLastColumn(); //最終列を取得

  var copyValue = sheet_copyFrom.getRange(1,1,lastRow,lastColumn).getValues(); //コピー元のシートから値の入っている全範囲をコピー
  sheet_copyTo.getRange(1,1,lastRow,lastColumn).setValues(copyValue); //自分のシートにコピーした値を全範囲をペースト
}


function 各訴求管理ページ更新(){
  var ss_tmp = SpreadsheetApp.getActiveSpreadsheet();
  var ss_copyFrom = SpreadsheetApp.openById("1_R4DXmksraue_PLhtxhZwIJJTxY2tD9y-0ppEI_W0mw");
  var sheet_copyFrom = ss_copyFrom.getSheetByName('案件列挙参照用'); //コピー元のスプレッドシートの値を抜き出したいシート名
  var temporary_anken = sheet_copyFrom.getRange('S2:S').getValues().map(e=>e[0]).filter(String);
  Logger.log(temporary_anken);
  var entorSheet = ss_copyFrom.getSheetByName('メンターとエンター組み合わせリスト');
  var lastRowOfEntor = entorSheet.getRange('A2:A').getValues().filter(String).length;
  var entorList = entorSheet.getRange(2,1,lastRowOfEntor,2).getValues();
  var lastRow = sheet_copyFrom.getRange('R2:R').getValues().filter(String).length; //最終行を取得
  var lastColumn = sheet_copyFrom.getLastColumn();
  var memberSheets = makeMemberSokyuSheetList(ss_tmp.getSheets()); //チームメンバー名のシートの名前のListを作る
  for (let j = 0; j < memberSheets.length; j++){
    var sheet_copyTo = ss_tmp.getSheetByName(memberSheets[j]);
    var memberName = memberSheets[j].replace("_訴求管理","");
    if (sheet_copyTo.getRange('A4').getValue() !== memberName){
      sheet_copyTo.getRange(4,1,sheet_copyTo.getLastRow()-3,2).clear();
      for (let d = 0; d < Math.floor((sheet_copyTo.getLastColumn()-2)/4); d++){
        sheet_copyTo.getRange(4,5+6*d,sheet_copyTo.getLastRow()-3,4).clear();
      }
    }
    var entorListForMentor = entorList.filter(couple => couple[0] === memberName);
    sheet_copyTo.getRange('A4:A').setValue(memberName);
    var lastRowForMentor = sheet_copyTo.getRange('B4:B').getValues().filter(String).length;
    var memberForMentorNow = [];
    if (lastRowForMentor !== 0){
      var memberForMentorNow = sheet_copyTo.getRange(4,1,lastRowForMentor,2).getValues();
    }
    var allMemberForMentor = memberForMentorNow.concat(entorListForMentor).filter(function(e, index){
      return !memberForMentorNow.concat(entorListForMentor).some(function(e2, index2){
        return index > index2 && e[0] == e2[0] && e[1] == e2[1];
      });
    });
    if (allMemberForMentor.length !== 0){
      sheet_copyTo.getRange(4,1,allMemberForMentor.length,2).setValues(allMemberForMentor);
    }
    for (let i = 0; i < lastRow; i++){
      var copyValue = sheet_copyFrom.getRange(2+i,18,1,1).getValues();
      sheet_copyTo.getRange(2,3 + 6*i,1,1).setValues(copyValue); 
      sheet_copyTo.showColumns(3+6*i,6)
      // endやstopの案件は非表示
      if(!temporary_anken.includes(copyValue[0][0])){
        sheet_copyTo.hideColumns(3+6*i,6)
      }
    }
  }
}

function 機会創出追加(){
  var ss_tmp = SpreadsheetApp.openById("1_R4DXmksraue_PLhtxhZwIJJTxY2tD9y-0ppEI_W0mw");
  var sheet_copyFrom = ss_tmp.getSheetByName("（原本）機会創出");
  var sheet_copyTo = ss_tmp.getSheetByName("（永続化）機会創出");
  var lastRowNumOfTo = sheet_copyTo.getLastRow();
  var toList = sheet_copyTo.getRange(2,1,lastRowNumOfTo-1,14).getValues();
  var lastRowNumOfFrom = sheet_copyFrom.getLastRow();
  var fromList = sheet_copyFrom.getRange(2,1,lastRowNumOfFrom-1,14).getValues();
  var res = fromList.filter(function(e){return toList.filter(function(f){return e.toString() == f.toString()}).length == 0});
  Logger.log(res.length);
  if (res.length>0){
    sheet_copyTo.getRange(lastRowNumOfTo+1,1,res.length,14).setValues(res);
  }
　Logger.log(res) // [["a1","b1","c1"],["a3","b3","c3"],["a4","b4","c4"]]
}

function 案件情報更新(){
  var ss_copyFrom = SpreadsheetApp.openById('10ccv782rJKKm3i_sONa-HZelgjvRMJQRUgXNhM7ECHU');
  var ss_tmp = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_copyFrom_event = ss_copyFrom.getSheetByName("企業イベント_情報");
  var sheet_copyFrom_entry = ss_copyFrom.getSheetByName("企業エントリー_情報");
  var sheet_copyTo_event = ss_tmp.getSheetByName("（原本）企業イベント");
  var sheet_copyTo_entry = ss_tmp.getSheetByName("（原本）企業エントリー");
  var scf_ev_lastrow = sheet_copyFrom_event.getRange("B4:B").getValues().filter(String).length;
  var scf_en_lastrow = sheet_copyFrom_entry.getRange("B4:B").getValues().filter(String).length;
  var sct_ev_lastrow = sheet_copyTo_event.getRange("B3:B").getValues().filter(String).length;
  var sct_en_lastrow = sheet_copyTo_entry.getRange("B3:B").getValues().filter(String).length;
  var new_event_list = [];
  var new_entry_list = [];
  if (scf_ev_lastrow !== sct_ev_lastrow){
    new_event_list = sheet_copyFrom_event.getRange(4+sct_ev_lastrow,1,scf_ev_lastrow-sct_ev_lastrow,17).getValues();
  }
  if (scf_en_lastrow !== sct_en_lastrow){
    new_entry_list = sheet_copyFrom_entry.getRange(4+sct_en_lastrow,1,scf_en_lastrow-sct_en_lastrow,17).getValues();
  }
  var new_anken_list = new_event_list.concat(new_entry_list);
  Logger.log(new_anken_list);
  var sheet_anken_rekkyo = ss_tmp.getSheetByName("案件列挙参照用");
  for (const anken of new_anken_list){
    sheet_anken_rekkyo.appendRow(anken);
  }
  sheet_copyTo_event.getRange(3,1,scf_ev_lastrow,17).setValues(sheet_copyFrom_event.getRange(4,1,scf_ev_lastrow,17).getValues());
  sheet_copyTo_entry.getRange(3,1,scf_en_lastrow,17).setValues(sheet_copyFrom_entry.getRange(4,1,scf_en_lastrow,17).getValues());
}

function makeMemberSheetList (list){
  var newList = [];
  var defaultSheets = ["案件まとめ", "ReadMe", "案件列挙（重複なし）", "案件列挙", "（原本）企業イベント", "（原本）企業エントリー", "機会創出", "（原本）機会創出", "入力規則", "各チーム情報","メンターとエンター組み合わせリスト","チーム選択タブ","チーム会用","期間内CV","チーム全体","訴求管理","UU率・機会創出平均計算", "アクティブエンター情報", "エンター情報", "sub_エンター情報", "会員データ", "（原本）会員データ", "初回アンケ", "（原本）初回アンケ", "（原本）LINE@", "面談後感想アンケート", "（原本）面談後感想アンケート","（永続化）機会創出","案件列挙参照用","(原本)案件管理シート"];
  for (let i = 0; i < list.length; i++){
    if((!defaultSheets.includes(list[i].getName()))&&(!list[i].getName().endsWith("_訴求管理"))){
      newList.push(list[i].getName());
    }
  }
  return newList;
}

function makeMemberSokyuSheetList (list){
  var newList = [];
  var defaultSheets = ["案件まとめ", "ReadMe", "案件列挙（重複なし）", "案件列挙", "（原本）企業イベント", "（原本）企業エントリー", "機会創出", "（原本）機会創出", "入力規則", "各チーム情報","メンターとエンター組み合わせリスト","チーム選択タブ","チーム会用","期間内CV","チーム全体","訴求管理","UU率・機会創出平均計算", "アクティブエンター情報", "エンター情報", "sub_エンター情報", "会員データ", "（原本）会員データ", "初回アンケ", "（原本）初回アンケ", "（原本）LINE@", "面談後感想アンケート", "（原本）面談後感想アンケート","（永続化）機会創出","案件列挙参照用","(原本)案件管理シート"];
  for (let i = 0; i < list.length; i++){
    if((!defaultSheets.includes(list[i].getName()))&&(list[i].getName().endsWith("_訴求管理"))){
      newList.push(list[i].getName());
    }
  }
  return newList;
}
// 二次元配列中である配列要素が何番目にあるかを二つの指標をもとに探し、そのindexを返す式。
function doubleIndexOf(element, array, index1, index2){
  const lrn = array.length;
  var result = lrn;
  while (result > 0){
    if (array[result-1][index1]==element[index1] && array[result-1][index2]==element[index2]){
      break;
    }
    result -= 1;
  }
  return result;
}
// function 全消し(){
//   var ss_deleteOrigin = SpreadsheetApp.getActiveSpreadsheet();
//   var deleteSheetList = makeMemberSheetList(ss_deleteOrigin.getSheets()).concat(makeMemberSokyuSheetList(ss_deleteOrigin.getSheets())).filter(e=>e.replace("_訴求管理","")!=="土井星太朗")
//   for (let j = 0; j < deleteSheetList.length; j++){
//     ss_deleteOrigin.deleteSheet(ss_deleteOrigin.getSheetByName(deleteSheetList[j]));
//   }
// }