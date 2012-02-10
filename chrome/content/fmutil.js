
var DUMMY_HOST = "chrome://fmutil/content/";

window.addEventListener("load", fmu_list_view, true);

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

function fmu_start() {
    var id;
    var pw;
	var type;

    var num_pop_menu = document.getElementById("entry-select").firstChild.childNodes[document.getElementById("entry-select").selectedIndex];

    id = num_pop_menu.getAttribute("id");
    pw = num_pop_menu.getAttribute("pw");
    type = num_pop_menu.getAttribute("type");

//window.dump("fmu_start():type:" + type + "\n");
//window.dump("fmu_start():id:" + id + "\n");
    
    var pref = Components.classes["@mozilla.org/preferences;1"].getService(Components.interfaces.nsIPrefBranch);
    var open_win_type;
    try{
        open_win_type = pref.getComplexValue("fmutil.pref.open_win", Components.interfaces.nsISupportsString).data;
    } catch (e) {
        open_win_type = "rtab";
    }

    if (type == "goo") {
        fmu_goo(open_win_type, id, pw);
    }

    if (type == "yah") {
        fmu_yahoo(open_win_type, id, pw);
    }

    if (type == "hot") {
        fmu_hotmail(open_win_type, id, pw);
    }

    if (type == "son") {
        fmu_sonet(open_win_type, id, pw);
    }

    if (type == "nif") {
        fmu_nifty(open_win_type, id, pw);
    }

    if (type == "gma") {
        fmu_gmail(open_win_type, id, pw);
    }

    if (type == "ech") {
        fmu_echoo(open_win_type, id, pw);
    }

    if (type == "jwp") {
        fmu_jawp(open_win_type, id, pw);
    }

    if (type == "hat") {
        fmu_hatena(open_win_type, id, pw);
    }

	if (type == "so2") {
        fmu_sonet2(open_win_type, id, pw);
    }
}

function fmu_goo(open_win_type, id, pw) {

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

    var form = document.getElementById("fmu-hiddenform-goo");

    form.uname.value = id;
    form.pass.value = pw;
    form.submit();

//<!-- referer判別のあるページには、XPCOMでコンポーネントを呼び出すしかないなぁ。メモを残しておく -->
//<!--    var uriloader = Components.classes["@mozilla.org/uriloader;1"].getService(Components.interfaces.nsIURILoader); -->
//<!-- nsIHttpChannel -->
//<!-- referer "http://community.goo.ne.jp/freemail/index.ghtml" -->
}

function fmu_yahoo(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-yahoo");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

    form.login.value = id;
    form.passwd.value = pw;
	form.submit();

}

function fmu_hotmail(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-hotmail");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

    form.login.value = id;
    form.passwd.value = pw;
	form.padding.value = "xxxxxxxxxxxxxxxx".substr(0, 16 - pw);
	form.submit();

}

function fmu_sonet(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-sonet");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

//    form.account.value = id;
//    form.password.value = pw;
    form.MAIL.value = id;
    form.REALPASS.value = pw;
	form.submit();

}

function fmu_nifty(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-nifty");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

	window._content.location.href = "https://" + id + ":" + pw + "@" + "enter.nifty.com/iw/nifty/mail/index.html";

}

function fmu_gmail(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-gmail");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

    form.Email.value = id;
    form.Passwd.value = pw;
	form.submit();

}

function fmu_echoo(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-echoo");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

    form.loginid.value = id;
    form.pw.value = pw;
	form.submit();

}

function fmu_jawp(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-ja.wikipedia");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

    form.wpName.value = id;
    form.wpPassword.value = pw;
	form.submit();

}

function fmu_hatena(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-hatena");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

    form.key.value = id;
    form.password.value = pw;
	form.submit();

}

function fmu_sonet2(open_win_type, id, pw) {

	var form = document.getElementById("fmu-hiddenform-sonet2");

    if (open_win_type == "ntab") {
        gBrowser.selectedTab = gBrowser.addTab();
    } else if (open_win_type == "nwin") {
        window.open("", "", "");
	}

    form.SSO_COMMON_ID.value = id;
    form.SSO_COMMON_PWD.value = pw;
	form.submit();

}

function openwin(url) {
    if (document.getElementById("openNewWin").selected) {
        window.open(url, "", "");
    }
    else if (document.getElementById("openNewTab").selected) {
        window.getBrowser().addTab(url);
    }
    else {
        window._content.location.href = url;
    }
}

function fmu_pref() {
    window.openDialog("chrome://fmutil/content/fmupref.xul", "fmutil-preferences", "dialog,centerscreen,alwaysRaised");
}

function fmu_list_view() {
    window.removeEventListener("load", fmu_list_view, true);
	
    var pop_menu = document.getElementById("entry-select");
	pop_menu.removeAllItems();
    pop_menu.appendChild(document.createElement("menupopup"));

    var menu_item = document.createElement("menuitem");
	menu_item.setAttribute("label", "-----");
    pop_menu.firstChild.appendChild(menu_item);
	
    var registerd_id = {value:""};
    var registerd_pw = {value:""};
    var registerd_ht = {value:""};
    var pref;
    var idstring;
	var entry_found_flg;
    pref = Components.classes["@mozilla.org/preferences;1"].getService(Components.interfaces.nsIPrefBranch);

    for (i = 1; i <= 30; i++) {
        menu_item = document.createElement("menuitem");
// read id from prefs
        try{
            idstring = pref.getComplexValue("fmutil.pref.id" + i, Components.interfaces.nsISupportsString).data;
            entry_found_flg = true;
//window.dump("fmu_list_view():" + i + "entry found:\n");
        } catch(e){ //window.dump("fmu_pref_get_entry() no id entry line:" + id_num + "\n");
	        idstring = {value:"goo:",substr:function(a,b){return "";}, fmuCheckProperty:""};
            entry_found_flg = false;
//window.dump("fmu_list_view():" + i + "entry not found:\n");
        }
        var pwmg_get = Components.classes["@mozilla.org/passwordmanager;1"].getService(Components.interfaces.nsIPasswordManagerInternal);

        if (entry_found_flg == true) {
            try {
                pwmg_get.findPasswordEntry(DUMMY_HOST, idstring, null, registerd_ht, registerd_id, registerd_pw);
//window.dump("fmu_list_view():" + i + "WString:\n");
            } catch(e) { window.dump("no password. don't set values\n");
            }
        }

        menu_item.setAttribute("label", "No." + i + ":" + idstring.substr(0, 3) + ":" + idstring.substr(4, 100));
        menu_item.setAttribute("type", idstring.substr(0, 3));
        menu_item.setAttribute("id", idstring.substr(4, 100));
        menu_item.setAttribute("pw", registerd_pw.value);
        menu_item.setAttribute("oncommand", "fmu_start()");

        pop_menu.firstChild.appendChild(menu_item);
    }
    pop_menu.selectedIndex = 0;
}
