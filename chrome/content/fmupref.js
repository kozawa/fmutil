
var DUMMY_HOST = "chrome://fmutil/content/";

function fmu_pref_ok() {
// add new id/password in passwordmanager and delete old id/password
    var pwmg_set = Components.classes["@mozilla.org/passwordmanager;1"].getService(Components.interfaces.nsIPasswordManager);
    var new_id_string;
    var old_id_string;
    new_id_string = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	var new_pw;

// store current page
    fmu_set_store_num(document.getElementById("fmu-pref-number").selectedIndex + 1);
	
    var pref;
    pref = Components.classes["@mozilla.org/preferences;1"].getService(Components.interfaces.nsIPrefBranch);

    for (var i = 0; i < 30; i++) {
// delete old id/password
        try {
            var pref_num_pop_menu = document.getElementById("fmu-pref-number").firstChild.childNodes[i];
            old_id_string = pref_num_pop_menu.getAttribute("old_type") + ":" + pref_num_pop_menu.getAttribute("old_id");
            new_id_string.data = pref_num_pop_menu.getAttribute("new_type") + ":" + pref_num_pop_menu.getAttribute("new_id");
//window.dump("fmu_pref_ok(): Del no:" + i + ", old_id_string:" + old_id_string + ", new_id_string.data:" + new_id_string.data + "\n");
            new_pw = pref_num_pop_menu.getAttribute("new_pw");
            if (pref_num_pop_menu.getAttribute("old_id") != "") {
                try {
                    pwmg_set.removeUser(DUMMY_HOST, old_id_string);
                    pwmg_set.removeUser("chrome://browser/content/browser", old_id_string);
                    pwmg_set.removeUser("chrome://browser", pref_num_pop_menu.getAttribute("old_pw"));
                } catch (e) {}
            }
            try {
                pwmg_set.addUser(DUMMY_HOST, new_id_string.data, new_pw);
            } catch (e) {}
// add new id in prefs
            if (pref_num_pop_menu.getAttribute("new_id") == "") {
                new_id_string.data = "";
            }
            pref.setComplexValue("fmutil.pref.id" + (i + 1), Components.interfaces.nsISupportsString, new_id_string);

        } catch (e) {}
    }

// update parent toolbar item
	var parent = window.opener.document;
    var pop_menu = parent.getElementById("entry-select");
	pop_menu.removeAllItems();
    pop_menu.appendChild(document.createElement("menupopup"));

    var menu_item = document.createElement("menuitem");
	menu_item.setAttribute("label", "-----");
    pop_menu.firstChild.appendChild(menu_item);
	
	for (i = 1; i <= document.getElementById("fmu-pref-number").firstChild.childNodes.length; i++) {
        var pref_num_pop_item = document.getElementById("fmu-pref-number").firstChild.childNodes[i - 1];

        menu_item = document.createElement("menuitem");
		
        menu_item.setAttribute("label", "No." + i + pref_num_pop_item.getAttribute("new_type") + ":" + pref_num_pop_item.getAttribute("new_id"));
        menu_item.setAttribute("type", pref_num_pop_item.getAttribute("new_type"));
        menu_item.setAttribute("id", pref_num_pop_item.getAttribute("new_id"));
        menu_item.setAttribute("pw", pref_num_pop_item.getAttribute("new_pw"));
        menu_item.setAttribute("oncommand", "fmu_start()");

        pop_menu.firstChild.appendChild(menu_item);
    }
    pop_menu.selectedIndex = 0;

// preference
    var open_win_string = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
	open_win_string.data = document.getElementById("which-open-radiogr").value;
    pref.setComplexValue("fmutil.pref.open_win", Components.interfaces.nsISupportsString, open_win_string);

    window.close();
}

function fmu_pref_get_entry(id_num) {
    var registerd_id = {value:""};
    var registerd_pw = {value:""};
    var registerd_ht = {value:""};
// read id from prefs
    var pref;
    var idstring;
	var entry_found_flg;
//window.dump("fmu_pref_get_entry():" + registerd_pw.value + "registerd_pw.value:\n");
    pref = Components.classes["@mozilla.org/preferences;1"].getService(Components.interfaces.nsIPrefBranch);
    try{
        idstring = pref.getComplexValue("fmutil.pref.id" + id_num, Components.interfaces.nsISupportsString).data;
		if (idstring != "") {
	        entry_found_flg = true;
		}
//window.dump("fmu_pref_get_entry():" + id_num + "entry found:\n");
//window.dump("fmu_pref_get_entry():" + idstring + "idstring:\n");
    } catch(e){ window.dump("fmu_pref_get_entry() no id entry line:" + id_num + "\n");
	    idstring = {value:"goo:",substr:function(a,b){return "";}, fmuCheckProperty:""};
        entry_found_flg = false;
//window.dump("fmu_pref_get_entry():" + id_num + "entry not found:\n");
    }

    var pref_num_pop_menu = document.getElementById("fmu-pref-number");

    var menu_item = document.createElement("menuitem");

    var pwmg_get = Components.classes["@mozilla.org/passwordmanager;1"].getService(Components.interfaces.nsIPasswordManagerInternal);
    if (entry_found_flg == true) {
        try {
            pwmg_get.findPasswordEntry(DUMMY_HOST, idstring, null, registerd_ht, registerd_id, registerd_pw);
            document.getElementById("pw").value = registerd_pw.value;
//window.dump("fmu_pref_get_entry():" + id_num + "WString:\n");
//window.dump("fmu_pref_get_entry():" + registerd_pw.value + "registerd_pw.value:\n");
        } catch(e) { window.dump("no password. don't set values\n");
        }
    }

	menu_item.setAttribute("id", id_num);
	menu_item.setAttribute("label", "No." + id_num + ":" + idstring.substr(0, 3) + ":" + idstring.substr(4, 100));
	menu_item.setAttribute("old_type", idstring.substr(0, 3));
	menu_item.setAttribute("old_id", idstring.substr(4, 100));
	menu_item.setAttribute("old_pw", registerd_pw.value);
	menu_item.setAttribute("new_type", idstring.substr(0, 3));
	menu_item.setAttribute("new_id", idstring.substr(4, 100));
	menu_item.setAttribute("new_pw", registerd_pw.value);
	menu_item.setAttribute("oncommand", "fmu_change_pref_num(" + id_num + ");");
	
	pref_num_pop_menu.firstChild.appendChild(menu_item);

}

function fmu_pref_display_entry(id_num) {
// read id from prefs
    var display_type;
    var display_id;
    var display_pw;

    var pref_num_item = document.getElementById("fmu-pref-number").firstChild.childNodes[id_num - 1];
    document.getElementById("fmu-pref-number").selectedIndex = id_num - 1;
	
    display_id = document.getElementById("id");
    display_pw = document.getElementById("pw");
	
	display_type = pref_num_item.getAttribute("new_type");
	display_id.value = pref_num_item.getAttribute("new_id");
	display_pw.value = pref_num_item.getAttribute("new_pw")

//window.dump("fmu_pref_display_entry():display_type:" + display_type + "\n");
    document.getElementById("fmu-pref-type").selectedIndex = 0;
    if (display_type == "goo") {
        document.getElementById("fmu-pref-type").selectedIndex = 0;
    }

    if (display_type == "yah") {
        document.getElementById("fmu-pref-type").selectedIndex = 1;
    }

    if (display_type == "hot") {
        document.getElementById("fmu-pref-type").selectedIndex = 2;
    }

    if (display_type == "son") {
        document.getElementById("fmu-pref-type").selectedIndex = 3;
    }

    if (display_type == "nif") {
        document.getElementById("fmu-pref-type").selectedIndex = 4;
    }

    if (display_type == "gma") {
        document.getElementById("fmu-pref-type").selectedIndex = 5;
    }

    if (display_type == "ech") {
        document.getElementById("fmu-pref-type").selectedIndex = 6;
    }

    if (display_type == "jwp") {
        document.getElementById("fmu-pref-type").selectedIndex = 7;
    }

    if (display_type == "hat") {
        document.getElementById("fmu-pref-type").selectedIndex = 8;
    }

    if (display_type == "so2") {
        document.getElementById("fmu-pref-type").selectedIndex = 9;
    }
}

function fmu_change_pref_num(after_num) {
    fmu_pref_display_entry(after_num);
}

function fmu_change_data() {
    fmu_set_store_num(document.getElementById("fmu-pref-number").selectedIndex + 1);
}

function fmu_set_store_num(store_num) {
    var pref_num_pop_menu = document.getElementById("fmu-pref-number").firstChild.childNodes[store_num - 1];

    var display_id;
    var display_pw;
	
    display_id = document.getElementById("id");
    display_pw = document.getElementById("pw");
//window.dump("fmu_set_store_num():" + store_num + "\n");
//window.dump("fmu_set_store_num():selectedIndex" + document.getElementById("fmu-pref-type").selectedIndex + "\n");
//window.dump("fmu_set_store_num():new_type" + document.getElementById("fmu-pref-type").selectedIndex + " value:" + document.getElementById("fmu-pref-type").firstChild.childNodes[document.getElementById("fmu-pref-type").selectedIndex].getAttribute("value") + "\n");
//window.dump("fmu_set_store_num():display_id" + display_id.value + "\n");
//window.dump("fmu_set_store_num():display_pw" + display_pw.value + "\n");

	pref_num_pop_menu.setAttribute("new_type", document.getElementById("fmu-pref-type").firstChild.childNodes[document.getElementById("fmu-pref-type").selectedIndex].getAttribute("value"));
	pref_num_pop_menu.setAttribute("new_id", display_id.value);
	pref_num_pop_menu.setAttribute("new_pw", display_pw.value);

}

function fmu_pref_init() {
    var i;
    var pref_num_pop_menu = document.getElementById("fmu-pref-number");
	pref_num_pop_menu.removeAllItems();
    pref_num_pop_menu.appendChild(document.createElement("menupopup"));

//fmu_pwdmp();

    for (i = 1; i <= 30; i++) {
        fmu_pref_get_entry(i);
/* try{
window.dump("fmu_pref_init():" + document.getElementById("fmu-pref-number").childNodes[i - 1].getAttribute("label") + "\n");
} catch(e) {}
*/
    }
    fmu_pref_display_entry(1);
	fmu_pref_display_setting();
}

function fmu_pref_display_setting() {
    var pref = Components.classes["@mozilla.org/preferences;1"].getService(Components.interfaces.nsIPrefBranch);
    var open_win_type;
    try{
        open_win_type = pref.getComplexValue("fmutil.pref.open_win", Components.interfaces.nsISupportsString).data;
    } catch (e) {
        open_win_type = "rtab";
    }
	if (open_win_type == "" ) {
        open_win_type = "rtab"; // default value
	}
//window.dump("fmu_pref_display_setting():open_win_type " + open_win_type + "\n");
    var open_win_radio = document.getElementById(open_win_type);
//window.dump("fmu_pref_display_setting():attribute " + open_win_radio.getAttirubute("checked") + "\n");
    open_win_radio.setAttribute("selected", "true");
}

function fmu_pwdmp() {
// debug function
    var pwmg_dmp = Components.classes["@mozilla.org/passwordmanager;1"].getService(Components.interfaces.nsIPasswordManager);

    var enumerator = pwmg_dmp.enumerator;

    while (enumerator.hasMoreElements()) {
        var pwhost;
        var host;
        pwhost = enumerator.getNext();
        host = pwhost.QueryInterface(Components.interfaces.nsIPassword);
        window.dump(host.host + ":" + host.user + ":" + host.password + "\n");
    }
}
// 使用制限　同じメールシステムで同じIDを複数登録してしまうと、パスワードはどれか一種類しか保存されません
// データが壊れたら、pref.jsのfmutil.prefを全部削除してください

//残件：ログアウト機能もつける
//残件：開くウィンドウを現在のタブ、新規タブ、新規ウィンドウを選択できるようにする
//残件：ソースコードのお掃除
//残件：設定でのデフォルトのOKとキャンセル