// ==UserScript==
// @name       Threads Custom Keyboard Navigation
// @name:zh-TW  Threads自訂鍵盤導航
// @name:ja     Threadsカスタムキーボードナビゲーション
// @name:en    Threads Custom Keyboard Navigation
// @namespace   https://github.com/Max46656
// @version     1.12
// @description Customize  keyboard shortcuts for navigating Threads features
// @description:zh-TW 自訂鍵盤快捷鍵以瀏覽Threads功能
// @description:ja Threads 機能をトリガーするためのカスタムキーボードショートカット
// @description:en Customize keyboard shortcuts for navigating Threads features
// @author      Max
// @match       https://www.threads.net/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=threads.net
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_getValue
// @license     MPL2.0
// @downloadURL https://greasyfork.org/zh-TW/scripts/496645-threads%E8%87%AA%E8%A8%82%E9%8D%B5%E7%9B%A4%E8%A7%B8%E7%99%BC

// ==/UserScript==

class boardInputNavigation {
    constructor() {
        this.setEventListeners();
        this.boardButtons = '.xefz13k.x1lq5wgf.xgqcy7u.x30kzoy';
        this.backButton='.x1nhvcw1 .x1u6grsq .x1i10hfl';
        this.newPostButton = '.x1i10hfl.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1t137rt.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xz401s1.x6bh95i.x1re03b8.x1hvtcl2.x3ug3ww.xfh8nwu.xoqspk4.x12v9rci.x138vmkv.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.xt8cgyo.xj515ic.x1co6499.x2j4hbs.xy58vm5.x1elh40u.x9f619.x78zum5.xrsfl73.x1gb2em4.xl56j7k.xixxii4.x12w9bfk.x13dflua.x11xpdln.x1pigqs1.x1vjfegm.xd3so5o.x1lcra6a';
    }

    setEventListeners() {
        this.keydownHandler = (event) => this.handleKeydown(event);
        self.addEventListener("keypress", this.keydownHandler);
        const boardKey = GM_getValue("boardKey", { Home: "F", Notifications: "D", Profile: "S", Search: "A", Create: "B", BacK:"G"});
        console.log("開始聆聽", boardKey);
    }

    handleKeydown(event) {
        const boardKey = GM_getValue("boardKey", { Home: "F", Notifications: "D", Profile: "S", Search: "A", Create: "B", BacK:"G"});
        const boardButtons = document.querySelectorAll(this.boardButtons);
        const newPostButton = document.querySelector(this.newPostButton);
        const backButton=document.querySelector(this.backButton);
        const keyMap = {
            Home: boardButtons[0],
            Notifications: boardButtons[1],
            Profile: boardButtons[2],
            Search: boardButtons[3],
            Create: newPostButton,
            Back:backButton,
        };

        for (const [key, element] of Object.entries(boardKey)) {
            if (event.key.toUpperCase() === element.toUpperCase()) {
                console.log(key.toLowerCase());
                keyMap[key].click();
                break;
            }
        }
    }
}

class inputCustomMenu{
    constructor() {
        this.registerMenuCommands(this);
        this.loadBoardKey();
    }

    async customizeKey(buttonType) {
        const currentKey = this.boardKey[buttonType];
        const newKey = prompt(`${this.getFeatureMessageLocalization(`EnterNew${buttonType}Letter`)}${currentKey}`);

        if (newKey && newKey.length === 1) {
            this.boardKey[buttonType] = newKey;
            this.saveBoardKey();
        } else {
            alert(this.getFeatureMessageLocalization("CustomKeyError"));
        }
    }

    loadBoardKey() {
        this.boardKey = GM_getValue("boardKey", { Home: "F", Notifications: "D", Profile: "S", Search: "A", Create: "B", BacK:"G"});
        console.log(this.boardKey);
    }

    saveBoardKey() {
        GM_setValue("boardKey", this.boardKey);
    }

    getFeatureMessageLocalization(word) {
        let display = {
            "zh-TW": {
                "CustomizeHome": "自訂首頁按鍵",
                "CustomizeNotifications": "自訂通知按鍵",
                "CustomizeProfile": "自訂個人簡介按鍵",
                "CustomizeSearch": "自訂搜尋按鍵",
                "CustomizeCreate": "自訂新貼文按鍵",
                "CustomizeBack": "自訂返回按鍵",
                "EnterNewHomeLetter": "請輸入要替換首頁按鈕的一個英文字母或數字，目前為：",
                "EnterNewNotificationsLetter": "請輸入要替換通知按鈕的一個英文字母或數字，目前為：",
                "EnterNewProfileLetter": "請輸入要替換個人簡介按鈕的一個英文字母或數字，目前為：",
                "EnterNewSearchLetter": "請輸入要替換搜尋按鈕的一個英文字母或數字，目前為：",
                "EnterNewCreateLetter": "請輸入要替換新貼文按鈕的一個英文字母或數字，目前為：",
                "EnterNewBackLetter": "請輸入要替換返回按鈕的一個英文字母或數字，目前為：",
                "CustomKeyError": "自訂按鍵錯誤，請輸入一個英文字母或數字。",
            },
            "en": {
                "CustomizeHome": "Customize home button",
                "CustomizeNotifications": "Customize notification buttons",
                "CustomizeProfile": "Customize profile button",
                "CustomizeSearch": "Customize search button",
                "CustomizeCreate": "Customize the new post button",
                "EnterNewHomeLetter": "Please enter an English letter or number to replace the home button. Currently:",
                "EnterNewNotificationsLetter": "Please enter an English letter or number to replace the notification button, currently:",
                "EnterNewProfileLetter": "Please enter an English letter or number to replace the profile button. Currently:",
                "EnterNewSearchLetter": "Please enter an English letter or number to replace the search button. Currently:",
                "EnterNewCreateLetter": "Please enter an English letter or number to replace the new post button. Currently:",
                "EnterNewBackLetter": "Please enter a letter or number to be replaced back button, currently:",
                "CustomKeyError": "Custom key error, please enter an English letter or number.",
            },
            "ja": {
                "CustomizeHome": "ホームボタンをカスタマイズ",
                "CustomizeNotifications": "通知ボタンをカスタマイズする",
                "CustomizeProfile": "プロファイル ボタンをカスタマイズ",
                "CustomizeSearch": "検索ボタンをカスタマイズ",
                "CustomizeCreate": "新規投稿ボタンをカスタマイズします",
                "EnterNewHomeLetter": "ホーム ボタンを置き換える英語の文字または數字を入力してください。現在:",
                "EnterNewNotificationsLetter": "通知ボタンを置き換える英語の文字または數字を入力してください。現在:",
                "EnterNewProfileLetter": "プロフィール ボタンを置き換える英語の文字または數字を入力してください。現在:",
                "EnterNewSearchLetter": "検索ボタンを置き換える英語の文字または數字を入力してください。現在:",
                "EnterNewCreateLetter": "新しい投稿ボタンを置き換えるには、英語の文字または數字を入力してください。現在:",
                "EnterNewBackLetter": "戻るボタンを置き換える英語の文字または數字を入力してください。現在:",
                "CustomKeyError": "カスタム キー エラーです。英語の文字または數字を入力してください。",
            }
        };
        return display[navigator.language][word];
    }

    registerMenuCommands(instance) {
        const buttonTypes = ["Home", "Notifications", "Profile", "Search", "Create","Back"];
        buttonTypes.forEach(type => {
            GM_registerMenuCommand(instance.getFeatureMessageLocalization(`Customize${type}`), () => instance.customizeKey(type));
        });
    }
}

const johnTheAlmondHolder = new boardInputNavigation();
const johnTheRestaurantWaiter = new inputCustomMenu();
