'use strict';
const fs = require('fs');
const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_DATABASE_ID;
const PHASE = {"phase-1":"Phase-1","phase-2":"Phase-2","phase-3":"Phase-3","setup":"Setup"};
const PRIO  = {"P0-critical":"🔴 P0-Critical","P1-important":"🟠 P1-Important","P2-nice-to-have":"🟡 P2-Nice-to-have"};

async function api(path, method="GET", body=null) {
  const r = await fetch(`https://api.notion.com/v1${path}`, {
    method, headers:{"Authorization":`Bearer ${TOKEN}`,"Content-Type":"application/json","Notion-Version":"2022-06-28"},
    body: body ? JSON.stringify(body) : undefined
  });
  const d = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(d.message||d));
  return d;
}

async function sync(issue) {
  const labels = (issue.labels||[]).map(l=>l.name);
  const props = {
    "Name":         {title:[{text:{content:issue.title}}]},
    "Issue_Number": {number:issue.number},
    "Status":       {select:{name:issue.state==="open"?"🟢 Open":"⚫ Closed"}},
    "GitHub_URL":   {url:issue.html_url},
    "Labels":       {multi_select:labels.map(n=>({name:n}))},
  };
  const phase = labels.map(l=>PHASE[l]).find(Boolean);
  const prio  = labels.map(l=>PRIO[l]).find(Boolean);
  if (phase) props.Phase    = {select:{name:phase}};
  if (prio)  props.Priority = {select:{name:prio}};
  if (issue.milestone) props.Milestone = {select:{name:issue.milestone.title}};

  const r = await api(`/databases/${DB_ID}/query`,"POST",{filter:{property:"Issue_Number",number:{equals:issue.number}}});
  const id = r.results[0]?.id;
  if (id) { await api(`/pages/${id}`,"PATCH",{properties:props}); console.log(`✅ 更新: #${issue.number}`); }
  else    { await api("/pages","POST",{parent:{database_id:DB_ID},properties:props}); console.log(`✨ 作成: #${issue.number}`); }
}

const issue = JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
sync(issue).catch(e=>{console.error("❌",e.message);process.exit(1);});
