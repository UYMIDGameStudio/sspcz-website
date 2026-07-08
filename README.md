# 浙江中学生哲学大会 官网 · SSPCZ Website

Official website of the **Secondary School Philosophy Conference of Zhejiang (SSPCZ)** — a student-organized philosophy conference for middle and high school students, held in Hangzhou.

第三届浙江中学生哲学大会 · 主题「变与不变」 · 2026年10月2–5日 · 杭州

## 结构 · Structure

```
index.html            首页 (Chinese)
third-session.html    第三届大会
cfp.html              征稿启事
schedule.html         日程安排（分日 tab 切换）
committee.html        组委会
register.html         注册报名（前端校验表单）
en/                   English versions of all six pages
assets/
  style.css           共享样式 + 移动端适配 (responsive, breakpoint 900px)
  lang.js             语言选择弹窗 + cookie 记忆 + 自动跳转
  logo.jpg            大会 logo
```

## 语言 · Language

- 首次访问弹窗选择 中文 / English，选择通过 cookie（`sspcz_lang`，一年有效）记住。
- 已有偏好时访问另一语言的页面会自动跳转；页眉的 EN / 中文 开关可随时切换并更新偏好。
- First visit shows a language picker; the choice is remembered via cookie and pages auto-redirect to the preferred language. The EN / 中文 switch in the header updates the preference.

## 本地预览 · Local preview

纯静态站点，任意静态服务器即可（cookie 需要 http，不要直接用 file:// 打开）：

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## 备注 · Notes

- 具体活动地点、部分协办方等信息在源策划案中为"待定"，确认后需更新页面内容。
- 报名表单目前为纯前端演示（无后端提交）；接入真实收集渠道时替换 `register.html` 中的提交逻辑。
