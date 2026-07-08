# 浙江中学生哲学大会 官网 · SSPCZ Website

> **⚠ 平台迁移中 / Migration in progress** — 本仓库正按照 `docs/`
> 宪章（RFC-000…400）与 `docs/adr/ADR-001-Initialization.md` 迁移为基于
> Astro 的出版平台。根目录的 HTML 为遗留静态站（仍是当前部署版本）；
> 新平台位于 `src/`，通过 `npm run dev / build / check / lint:css` 工作。
> 遗留文件将在 Phase 4 打上 `legacy-static-site` 标签后删除。

Official website of the **Secondary School Philosophy Conference of Zhejiang (SSPCZ)** — a student-organized philosophy conference for middle and high school students, held in Hangzhou.

第三届浙江中学生哲学大会 · 主题「变与不变」 · 2026年10月2–5日 · 杭州

## 结构 · Structure

```
index.html            首页 (Chinese)
third-session.html    第三届大会
cfp.html              征稿启事
schedule.html         日程安排（分日 tab 切换）
committee.html        组委会
register.html         注册报名（前端校验表单，可配置提交后端）
policies.html         会议政策（论文审核政策 + 学术不端处理）
en/                   English versions of all seven pages
sitemap.xml           站点地图（换自定义域名后需更新其中的 base URL）
robots.txt
assets/
  style.css           共享样式 + sticky footer + 移动端适配 (breakpoint 900px)
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

## 报名表单后端 · Form backend

`register.html` 与 `en/register.html` 顶部各有一个 `FORM_ENDPOINT` 常量：

- 留空（默认）＝纯前端演示模式，只显示成功页、不实际提交；
- 填入表单收集端点（如 Formspree `https://formspree.io/f/xxxx`，或自建云函数 URL）后，
  表单将以 JSON POST 提交 `{name, school, grade, contact, note, mode, role, lang}`，
  失败时向用户展示邮件报名的兜底提示。

## 备注 · Notes

- 具体活动地点、部分协办方等信息在源策划案中为"待定"，确认后需更新页面内容。
- 英文正文衬线字体为 Times New Roman（系统字体，无需网络加载）；中文使用 Google Fonts 的
  Noto Serif/Sans SC，大陆访问不稳定时会回退到系统字体，正式部署国内可改为自托管字体。
- 会议政策页依据第二届《会议论文审核政策》（公开版）整理；第三届正式章程发布后需同步更新。
