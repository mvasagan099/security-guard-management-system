import{n as e}from"./chunk-Bh1tDfsg.js";import{i as t,n,t as r}from"./jsx-runtime-CAXHDLmN.js";import{at as i,f as a,i as o,it as s,n as c,r as l}from"./index-BAx6ADdI.js";import{t as u}from"./shortId-yqIhq9CV.js";var d=e(t(),1),f=r(),p=[`Theft`,`Fire`,`Fight`,`Suspicious Activity`,`Emergency`,`Visitor Issue`,`Others`],m=[`Open`,`Investigating`,`Closed`];function h({role:e,currentGuardId:t,companyId:r}){let[h,g]=(0,d.useState)([]),[_,v]=(0,d.useState)(``),[y,b]=(0,d.useState)(``),[x,S]=(0,d.useState)(r||null),[C,w]=(0,d.useState)({}),[T,E]=(0,d.useState)(!1),[D,O]=(0,d.useState)(!1),[k,A]=(0,d.useState)(!1),[j,M]=(0,d.useState)(null),[N,P]=(0,d.useState)(null),[F,I]=(0,d.useState)(``),[L,R]=(0,d.useState)(null),[z,B]=(0,d.useState)(``),[V,H]=(0,d.useState)(!1),U=(0,d.useRef)(null),{showToast:W,ToastContainer:G}=i();function K({src:e}){let[t,n]=(0,d.useState)(!1),r=(0,d.useRef)(null);return(0,d.useEffect)(()=>{let e=r.current;if(!e)return;let t=()=>n(!1);return e.addEventListener(`ended`,t),()=>e.removeEventListener(`ended`,t)},[]),(0,f.jsxs)(`div`,{className:`flex items-center`,children:[(0,f.jsx)(`audio`,{ref:r,src:e,className:`hidden`}),(0,f.jsx)(`button`,{onClick:()=>{t?(r.current.pause(),n(!1)):(r.current.play(),n(!0))},className:`px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold shadow-sm transition hover:bg-purple-200`,children:t?`⏹ Stop`:`▶ Play Audio`})]})}async function q(){try{if(!navigator.onLine){let n=l(`incidents_${e}_${t}`);n&&g(n);return}let i=n.from(`incidents`).select(`*, guards(name)`).order(`id`,{ascending:!1}).limit(1500);e===`guard`&&t?i=i.eq(`guard_id`,t):[`admin`,`super_admin`,`supervisor`].includes(e)&&r&&(i=i.eq(`company_id`,r));let{data:a}=await i;g(a||[]),o(`incidents_${e}_${t}`,a||[])}catch{let n=l(`incidents_${e}_${t}`);n?g(n):W(`Could not load incidents.`,`error`)}}(0,d.useEffect)(()=>{q(),t&&n.from(`guards`).select(`company_id`).eq(`id`,t).single().then(({data:e})=>{e&&S(e.company_id)})},[t,e]);function J(){let n={};return(e!==`guard`||!t)&&(n.general=`You must be a guard to report an incident.`),_||(n.incidentType=`Select incident type`),!y.trim()&&!L&&!N&&(n.description=`Provide a description, photo, or voice note`),w(n),Object.keys(n).length===0}async function Y(){if(J()){E(!0);try{if(!navigator.onLine){await c(`incident`,{guardId:t,incidentType:_,description:y.trim()||`Reported with media`,imageFileBlob:N||null,audioBlob:L||null,timestamp:new Date().toISOString()});let n=l(`incidents_${e}_${t}`)||[],r=F||null,i=z||null,a=[{id:`temp_inc_`+Date.now(),guard_id:t,incident_type:_,description:y.trim()||`Reported with media`,image_url:r,audio_url:i,incident_status:`Open`,created_at:new Date().toISOString(),guards:{name:`You`}},...n];g(a),o(`incidents_${e}_${t}`,a),W(`Incident report saved offline! Will sync when connected.`,`success`),v(``),b(``),P(null),I(``),R(null),B(``),E(!1);return}let r=null,i=null;if(N){let e=`incident_${t}_${Date.now()}_${N.name}`,{error:i}=await n.storage.from(`guard-photos`).upload(e,N);if(!i){let{data:t}=n.storage.from(`guard-photos`).getPublicUrl(e);r=t.publicUrl}}if(L){let e=`incident_voice_${t}_${Date.now()}.webm`,{error:r}=await n.storage.from(`voice-requests`).upload(e,L,{contentType:`audio/webm`});if(!r){let{data:t}=n.storage.from(`voice-requests`).getPublicUrl(e);i=t.publicUrl}}let a=x;if(!a&&t){let{data:e}=await n.from(`guards`).select(`company_id`).eq(`id`,t).single();a=e?.company_id}let{error:s}=await n.from(`incidents`).insert([{guard_id:t,company_id:a,incident_type:_,description:y.trim()||`Reported with media`,image_url:r,audio_url:i,incident_status:`Open`}]);if(s){console.error(`Incident insert error:`,JSON.stringify(s,null,2)),W(`Error reporting incident: ${s.message||s.code}`,`error`);return}let{error:u}=await n.from(`notifications`).insert([{user_role:`super_admin`,company_id:a,guard_id:t,title:`🚨 New Incident: ${_}`,message:y.trim()||`Reported with media`,type:`error`,is_read:!1}]);u&&console.error(`Notification insert error:`,u),W(`Incident reported successfully!`,`success`),v(``),b(``),P(null),I(``),R(null),B(``),q()}catch{W(`Network error. Please try again.`,`error`)}finally{E(!1)}}}async function X(){if(!y.trim()){W(`Please type some rough notes first to enhance.`,`error`);return}A(!0);try{let e=await fetch(`/api/sambanova/v1/chat/completions`,{method:`POST`,headers:{Authorization:`Bearer e760c588-2e29-4aa8-9c58-b0d3fb30d166`,"Content-Type":`application/json`},body:JSON.stringify({model:`DeepSeek-V3.1`,messages:[{role:`system`,content:`You are a professional security incident report assistant. Check the grammar of the provided notes and rewrite them into a single, short, formal one-line statement. Only output the enhanced text without any formatting, markdown, or greetings.`},{role:`user`,content:`Rough notes: ${y}`}],temperature:.1,top_p:.1})});if(!e.ok)throw Error(`API Request Failed`);let t=(await e.json()).choices[0].message.content;b(t),W(`Description enhanced by AI!`,`success`)}catch(e){console.error(`AI Enhance Error:`,e),W(`Failed to enhance: `+e.message,`error`)}finally{A(!1)}}function Z(e){let t=e.guards?.name||`Unknown Guard`,n=new Date(e.created_at).toLocaleString(`en-AU`,{dateStyle:`full`,timeStyle:`short`}),r=window.open(``,`_blank`);r.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Incident Report - ${u(e.id)}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { 
              font-family: 'Inter', sans-serif; 
              padding: 40px; 
              color: #1f2937; 
              line-height: 1.6; 
              background-color: #fff;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header-logo {
              font-size: 28px;
              font-weight: 700;
              color: #1e3a8a;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .header-title {
              text-align: right;
            }
            .header-title h1 {
              margin: 0;
              font-size: 24px;
              color: #dc2626;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .header-title p {
              margin: 5px 0 0;
              font-size: 12px;
              color: #6b7280;
            }
            .grid-meta {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              background: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
              margin-bottom: 30px;
            }
            .meta-item {
              display: flex;
              flex-direction: column;
            }
            .meta-label {
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #64748b;
              font-weight: 600;
              margin-bottom: 4px;
            }
            .meta-value {
              font-size: 15px;
              font-weight: 600;
              color: #0f172a;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 18px;
              font-weight: 700;
              color: #1e293b;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 8px;
              margin-bottom: 15px;
            }
            .content-box {
              background: #fff;
              padding: 20px;
              border-radius: 8px;
              border: 1px solid #cbd5e1;
              box-shadow: 0 1px 3px rgba(0,0,0,0.05);
              font-size: 15px;
              white-space: pre-wrap;
              color: #334155;
            }
            .evidence-img {
              max-width: 100%;
              max-height: 400px;
              border-radius: 8px;
              border: 2px solid #e2e8f0;
              display: block;
              margin: 0 auto;
            }
            .footer {
              margin-top: 50px;
              border-top: 1px solid #cbd5e1;
              padding-top: 20px;
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              color: #94a3b8;
            }
            @media print {
              body { padding: 0; }
              .content-box { box-shadow: none; border: 1px solid #94a3b8; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="header-logo">
              🛡️ Security Command
            </div>
            <div class="header-title">
              <h1>Incident Report</h1>
              <p>CONFIDENTIAL DOCUMENT</p>
            </div>
          </div>

          <div class="grid-meta">
            <div class="meta-item">
              <span class="meta-label">Incident ID</span>
              <span class="meta-value">${u(e.id)}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Date & Time</span>
              <span class="meta-value">${n}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Reporting Officer</span>
              <span class="meta-value">${t}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Incident Classification</span>
              <span class="meta-value" style="color: #dc2626;">${e.incident_type}</span>
            </div>
            <div class="meta-item" style="grid-column: span 2;">
              <span class="meta-label">Current Status</span>
              <span class="meta-value">${e.incident_status}</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Official Statement / Details</div>
            <div class="content-box">${e.description||`No official statement provided.`}</div>
          </div>

          ${e.image_url?`
          <div class="section">
            <div class="section-title">Photographic Evidence</div>
            <div style="margin-top: 15px;">
              <img src="${e.image_url}" alt="Incident Evidence" class="evidence-img" />
            </div>
          </div>`:``}

          <div class="footer">
            <span>Generated by SG Platform</span>
            <span>Page 1 of 1</span>
          </div>
        </body>
      </html>
    `),r.document.close(),r.focus(),setTimeout(()=>{r.print()},250)}async function Q(e,t){try{let{error:r}=await n.from(`incidents`).update({incident_status:t}).eq(`id`,e);if(r)throw r;W(`Status updated!`,`success`),q()}catch{W(`Failed to update status`,`error`)}}async function ee(){try{let e=await navigator.mediaDevices.getUserMedia({audio:!0}),t=new MediaRecorder(e);U.current=t;let n=[];t.ondataavailable=e=>{e.data.size>0&&n.push(e.data)},t.onstop=()=>{let e=new Blob(n,{type:`audio/webm`});R(e),B(URL.createObjectURL(e))},t.start(),H(!0)}catch{W(`Microphone access denied.`,`error`)}}function te(){U.current&&V&&(U.current.stop(),U.current.stream.getTracks().forEach(e=>e.stop()),H(!1))}function ne(e){let t=e.target.files[0];t&&(P(t),I(URL.createObjectURL(t)))}function $(e){w(t=>({...t,[e]:``}))}return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(G,{}),T&&(0,f.jsx)(s,{message:`Submitting incident report...`}),(0,f.jsxs)(`div`,{className:`mt-2`,children:[e===`guard`&&!D&&(0,f.jsxs)(`div`,{className:`glass-card rounded-2xl p-5 md:p-8 mb-8 ring-1 ring-slate-200 shadow-sm bg-white md:bg-white/80`,children:[(0,f.jsxs)(`div`,{className:`flex justify-between items-center mb-6`,children:[(0,f.jsx)(`h2`,{className:`text-base font-bold text-slate-800 tracking-tight`,children:`Report New Incident`}),(0,f.jsx)(`button`,{onClick:()=>O(!0),className:`flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition`,children:`🕒 History`})]}),C.general&&(0,f.jsx)(`p`,{className:`text-red-500 mb-4 bg-red-50 p-3 rounded-lg text-sm`,children:C.general}),(0,f.jsxs)(`div`,{className:`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`label`,{className:`block text-[11px] font-bold text-slate-655 uppercase tracking-wider mb-2`,children:`Incident Type`}),(0,f.jsx)(a,{value:_,onChange:e=>{v(e),$(`incidentType`)},options:[{value:``,label:`Select Incident Type`},...p.map(e=>({value:e,label:e}))],placeholder:`Select Incident Type`,error:!!C.incidentType,heightClass:`h-11`}),C.incidentType&&(0,f.jsxs)(`p`,{className:`text-red-500 text-xs mt-1.5 font-semibold`,children:[`⚠️ `,C.incidentType]})]}),(0,f.jsxs)(`div`,{className:`md:col-span-2`,children:[(0,f.jsxs)(`div`,{className:`flex justify-between items-center mb-2`,children:[(0,f.jsx)(`label`,{className:`block text-[11px] font-bold text-slate-655 uppercase tracking-wider mb-2`,children:`Description`}),(0,f.jsxs)(`button`,{type:`button`,onClick:X,disabled:k,className:`text-[10px] px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full shadow-sm font-semibold transition disabled:opacity-50 flex items-center gap-1.5 active:scale-95`,children:[(0,f.jsx)(`span`,{children:`✨`}),` `,k?`Enhancing...`:`AI Enhance`]})]}),(0,f.jsx)(`textarea`,{placeholder:`Describe the incident in detail... (Optional if media is provided)`,value:y,onChange:e=>{b(e.target.value),$(`description`)},className:`w-full border px-3 py-2 rounded-xl focus:outline-none focus:ring-4 transition text-xs bg-[#F4F6F9] hover:bg-slate-100/60 focus:bg-white ${C.description?`border-red-400 focus:ring-red-500/10 focus:border-red-500`:`border-slate-200 focus:ring-blue-500/10 focus:border-blue-500`}`,rows:`4`}),C.description&&(0,f.jsxs)(`p`,{className:`text-red-500 text-xs mt-1.5 font-semibold`,children:[`⚠️ `,C.description]})]})]}),(0,f.jsxs)(`div`,{className:`md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4`,children:[(0,f.jsxs)(`div`,{className:`bg-slate-50/50 border border-slate-150 rounded-2xl p-4`,children:[(0,f.jsx)(`label`,{className:`block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2`,children:`📸 Attach Photo`}),(0,f.jsx)(`input`,{type:`file`,accept:`image/*`,onChange:ne,className:`text-xs w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}),F&&(0,f.jsx)(`img`,{src:F,alt:`Preview`,className:`mt-3 w-full max-h-32 object-cover rounded-xl border border-gray-200`})]}),(0,f.jsxs)(`div`,{className:`bg-slate-50/50 border border-slate-150 rounded-2xl p-4 text-center`,children:[(0,f.jsx)(`label`,{className:`block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2`,children:`🎙️ Record Voice Note`}),(0,f.jsx)(`button`,{type:`button`,onClick:V?te:ee,className:`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl shadow-lg transition-all ${V?`bg-red-500 animate-pulse scale-110`:`bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-blue-150`}`,children:V?`⏹️`:`🎙️`}),(0,f.jsx)(`p`,{className:`text-[10px] text-gray-500 mt-2`,children:V?`Recording… tap to stop`:`Tap mic to record`}),z&&(0,f.jsxs)(`div`,{className:`mt-3 flex flex-col items-center gap-2`,children:[(0,f.jsx)(`audio`,{src:z,controls:!0,className:`w-full h-8`}),(0,f.jsx)(`button`,{type:`button`,onClick:()=>{R(null),B(``)},className:`text-xs text-red-500 hover:underline`,children:`Remove audio`})]})]})]}),(0,f.jsx)(`button`,{onClick:Y,disabled:T,className:`mt-8 w-full md:w-auto px-6 py-3 rounded-xl text-white font-bold text-sm transition shadow-md ${T?`bg-slate-300 cursor-not-allowed shadow-none`:`bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200`}`,children:T?`Reporting...`:`Report Incident`})]}),(e!==`guard`||D)&&(0,f.jsxs)(`div`,{children:[e===`guard`&&D&&(0,f.jsxs)(`div`,{className:`flex items-center gap-4 mb-5`,children:[(0,f.jsx)(`button`,{onClick:()=>O(!1),className:`w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition shrink-0`,children:`←`}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`h2`,{className:`font-bold text-gray-800 text-base`,children:`Past Incidents`}),(0,f.jsx)(`p`,{className:`text-xs text-gray-400 mt-0.5`,children:`Your reported incident history`})]})]}),h.length===0?(0,f.jsxs)(`div`,{className:`bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400`,children:[(0,f.jsx)(`div`,{className:`text-4xl mb-3`,children:`🗂️`}),(0,f.jsx)(`p`,{className:`font-medium text-gray-500`,children:`No incidents reported yet.`})]}):(0,f.jsx)(`div`,{className:`space-y-3`,children:h.map(t=>{let n={Fire:`bg-red-100 text-red-700`,Theft:`bg-orange-100 text-orange-700`,Fight:`bg-pink-100 text-pink-700`,"Suspicious Activity":`bg-yellow-100 text-yellow-700`,Emergency:`bg-rose-100 text-rose-700`,"Visitor Issue":`bg-indigo-100 text-indigo-700`}[t.incident_type]||`bg-gray-100 text-gray-700`,r={Open:`bg-amber-100 text-amber-700`,Investigating:`bg-blue-100 text-blue-700`,Closed:`bg-emerald-100 text-emerald-700`}[t.incident_status]||`bg-gray-100 text-gray-600`;return(0,f.jsxs)(`div`,{className:`bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-5 border border-gray-100`,children:[(0,f.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2 mb-3`,children:[e!==`guard`&&(0,f.jsxs)(`span`,{className:`font-semibold text-gray-800 text-sm`,children:[`👮 `,t.guards?.name||`Unknown`]}),(0,f.jsx)(`span`,{className:`px-2.5 py-1 rounded-full text-xs font-bold ${n}`,children:t.incident_type}),(0,f.jsx)(`span`,{className:`px-2.5 py-1 rounded-full text-xs font-bold ${r}`,children:t.incident_status}),(0,f.jsxs)(`span`,{className:`ml-auto text-xs text-gray-400 whitespace-nowrap`,children:[`🕐 `,new Date(t.created_at).toLocaleString([],{dateStyle:`short`,timeStyle:`short`})]}),(0,f.jsx)(`span`,{className:`text-[10px] font-mono font-bold text-gray-300 ml-1`,children:u(t.id)})]}),t.description&&(0,f.jsx)(`p`,{className:`text-sm text-gray-700 leading-relaxed mb-3`,children:t.description}),(0,f.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2 justify-between`,children:[(0,f.jsxs)(`div`,{className:`flex flex-wrap items-center gap-2`,children:[t.audio_url&&(0,f.jsx)(K,{src:t.audio_url}),t.image_url&&(0,f.jsx)(`button`,{onClick:()=>M(t.image_url),className:`px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold hover:bg-blue-100 transition inline-flex items-center gap-1`,children:`🖼️ View Photo`})]}),e!==`guard`&&(0,f.jsxs)(`div`,{className:`flex items-center gap-2 ml-auto`,children:[(0,f.jsx)(a,{value:t.incident_status,onChange:e=>Q(t.id,e),options:m.map(e=>({value:e,label:e})),placeholder:`Select Status`,heightClass:`h-8`,className:`w-32`}),(0,f.jsx)(`button`,{onClick:()=>Z(t),className:`px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition flex items-center gap-1`,title:`Download PDF Report`,children:`📄 PDF`})]})]})]},t.id)})})]})]}),j&&(0,f.jsx)(`div`,{className:`fixed inset-0 z-[100] flex items-center justify-center p-4`,style:{background:`rgba(0,0,0,0.85)`},onClick:()=>M(null),children:(0,f.jsxs)(`div`,{className:`relative max-w-3xl w-full`,onClick:e=>e.stopPropagation(),children:[(0,f.jsx)(`button`,{onClick:()=>M(null),className:`absolute -top-10 right-0 text-white text-3xl font-bold hover:text-gray-300 transition`,children:`✕`}),(0,f.jsx)(`img`,{src:j,alt:`Incident Evidence`,className:`w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl`})]})})]})}export{h as default};