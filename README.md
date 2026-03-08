# Systematic MBTI Analyzer (全息人格探索系統)

這是一個基於 **榮格八維 (Jungian Cognitive Functions)**、**九型人格 (Enneagram)** 與 **本能副型 (Instinctual Variants)** 的深度人格分析工具。

目前版本：**Ultimate Edition**

## 🌟 特色 (Features)

1.  **動態雷達圖 (Dynamic Radar Chart)**：
    *   可輸入 Sakinorva 測試數據。
    *   支援 **雙人比對模式** (伴侶/朋友)。
    *   支援 **16 型人格常模疊加**，一鍵看清你與標準類型的差異。
    *   自動保存數據至瀏覽器 (LocalStorage)，重新整理不丟失。

2.  **全息解析器 (Holographic Analyzer)**：
    *   選擇 MBTI + 九型 + 副型，生成 **三位一體** 的深度報告。
    *   包含：高階/低階狀態、認知軸線 (Axes)、壓力迴圈 (Loop)、抓狂狀態 (Grip)。
    *   提供針對盲點 (Blindspot) 的 **弱點武器化指南**。

3.  **視覺化理論圖鑑**：
    *   John Beebe 的八維原型 (Hero, Parent, Child, Inferior...) 視覺化卡片。
    *   16 型常模縮圖總覽。

## 🚀 如何發布到 GitHub Pages (How to Publish)

本專案是一個純靜態網頁 (Pure HTML/CSS/JS)，非常適合透過 GitHub Pages 免費託管。

### 步驟 1：初始化 Git
如果你還沒有初始化 Git，請在專案資料夾內執行：
```bash
git init
git add .
git commit -m "Initial commit of Systematic MBTI Analyzer"
```

### 步驟 2：推送到 GitHub
1. 在 [GitHub](https://github.com/new) 上建立一個新的 **Repository** (例如命名為 `mbti`)。
2. 連結你的本地專案到遠端 (將 `<your-username>` 替換為你的帳號)：
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/mbti.git
git push -u origin main
```

### 步驟 3：開啟 GitHub Pages
1. 進入你的 GitHub Repository 頁面。
2. 點擊上方選單的 **Settings** (設定)。
3. 在左側欄找到 **Pages** (頁面)。
4. 在 **Build and deployment** 下方的 **Branch** 選擇 `main`，資料夾選擇 `/(root)`。
5. 點擊 **Save**。

稍等約 1-2 分鐘，你的網站就會上線了！網址通常是：
`https://<your-username>.github.io/mbti/`

## 🛠️ 技術棧 (Tech Stack)
*   **HTML5** (Semantic Structure)
*   **Tailwind CSS** (via CDN for styling)
*   **Chart.js** (Radar Visualization)
*   **Vanilla JavaScript** (Logic & DOM Manipulation)

## 📂 檔案結構
*   `index.html`: 主頁面結構。
*   `styles.css`: 自定義樣式與動畫。
*   `script.js`: 核心邏輯、圖表生成與數據庫。

---
Created by [Elain]
