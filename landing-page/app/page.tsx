'use client'
import{useState}from'react'
export default function Home(){
  const[email,setEmail]=useState('')
  const[status,setStatus]=useState<'idle'|'loading'|'success'|'error'>('idle')
  const[msg,setMsg]=useState('')
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    if(!email.includes('@')){setStatus('error');setMsg('有効なメールを入力してください');return}
    setStatus('loading')
    try{
      const r=await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
      if(!r.ok){setStatus('error');setMsg('登録に失敗しました');return}
    }catch{setStatus('error');setMsg('通信エラー');return}
    setStatus('success');setMsg('登録完了！サービス開始時にご連絡します 🎉');setEmail('')
  }
  return(
    <main style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',background:'#0a0a0f',color:'#fff'}}>
      <div style={{position:'fixed',top:'-20%',left:'50%',transform:'translateX(-50%)',width:'800px',height:'800px',background:'radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%)',pointerEvents:'none'}}/>
      <header style={{width:'100%',maxWidth:'900px',display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 32px'}}>
        <div style={{fontSize:'20px',fontWeight:'700'}}>⚡ M&amp;A DD AI</div>
        <span style={{background:'rgba(99,102,241,0.2)',border:'1px solid rgba(99,102,241,0.4)',color:'#a5b4fc',padding:'4px 12px',borderRadius:'999px',fontSize:'13px'}}>Coming Soon</span>
      </header>
      <section style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',padding:'60px 24px',maxWidth:'800px'}}>
        <div style={{background:'rgba(99,102,241,0.1)',border:'1px solid rgba(99,102,241,0.3)',color:'#a5b4fc',padding:'6px 16px',borderRadius:'999px',fontSize:'14px',marginBottom:'32px'}}>🚀 AIが変える、M&amp;Aデューデリジェンス</div>
        <h1 style={{fontSize:'clamp(32px,6vw,56px)',fontWeight:'800',lineHeight:'1.2',marginBottom:'24px'}}>プロ品質の分析を<br/><span style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>スタートアップのスピード</span>で</h1>
        <p style={{fontSize:'18px',lineHeight:'1.8',color:'#94a3b8',marginBottom:'48px'}}>契約書・財務データ・法務リスクをAIが自動分析。<br/>従来3週間かかったDDレポートを、<strong>数時間</strong>で。</p>
        <div style={{display:'flex',gap:'16px',marginBottom:'56px',flexWrap:'wrap',justifyContent:'center'}}>
          {[['📄','契約書分析','リスク条項を自動検出'],['📊','財務デューデリ','3期分の財務を即時分析'],['⚖️','法務リスク','コンプライアンス自動確認']].map(([i,t,d])=>(
            <div key={t} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'24px 28px',textAlign:'center',minWidth:'160px'}}>
              <div style={{fontSize:'32px',marginBottom:'8px'}}>{i}</div>
              <div style={{fontSize:'15px',fontWeight:'600',color:'#e2e8f0',marginBottom:'4px'}}>{t}</div>
              <div style={{fontSize:'13px',color:'#64748b'}}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{width:'100%',maxWidth:'520px'}}>
          <p style={{fontSize:'14px',color:'#64748b',marginBottom:'16px'}}>早期アクセスに登録する（無料）</p>
          {status==='success'
            ?<div style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.3)',color:'#4ade80',padding:'16px 24px',borderRadius:'12px'}}>✅ {msg}</div>
            :<form onSubmit={submit} style={{display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center'}}>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{flex:1,minWidth:'240px',padding:'14px 20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.06)',color:'#fff',fontSize:'16px',outline:'none'}} required/>
              <button type="submit" style={{padding:'14px 24px',borderRadius:'12px',border:'none',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',fontSize:'15px',fontWeight:'600',cursor:'pointer'}} disabled={status==='loading'}>{status==='loading'?'登録中...':'早期アクセスを申し込む →'}</button>
            </form>
          }
          {status==='error'&&<p style={{color:'#f87171',fontSize:'13px',marginTop:'8px'}}>{msg}</p>}
          <p style={{fontSize:'12px',color:'#475569',marginTop:'12px'}}>スパムは送りません。サービス開始時のみご連絡します。</p>
        </div>
      </section>
      <footer style={{padding:'32px',color:'#334155',fontSize:'13px'}}>© 2026 M&amp;A DD AI. Built with ❤️ in Japan.</footer>
    </main>
  )
}
