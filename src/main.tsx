import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowRight, ArrowUp, Check, Copy, Menu, Sparkles, X, Image as ImageIcon, Clapperboard, WandSparkles} from 'lucide-react';
import './styles.css';

type Mode='Text'|'Image'|'Video';
const models=['ChatGPT','Claude','Gemini','Midjourney','Sora','Veo'];
const examples=[
 {n:'01',tag:'IMAGE',title:'Editorial portrait',desc:'Light, lens, mood and composition—structured for image models.',icon:ImageIcon},
 {n:'02',tag:'VIDEO',title:'Cinematic motion',desc:'Shots, camera movement, pacing and audio in one production prompt.',icon:Clapperboard},
 {n:'03',tag:'TEXT',title:'Sharper thinking',desc:'Context-rich instructions with constraints and a reliable output format.',icon:WandSparkles},
];
function buildPrompt(idea:string, mode:Mode){
 const subject=idea.trim()||'A luxury fashion editorial portrait';
 if(mode==='Image') return `SUBJECT\n${subject}\n\nSETTING\nMinimal studio environment with intentional negative space\n\nCOMPOSITION\nEditorial framing, refined balance, strong focal point\n\nLIGHTING\nSoft directional light, controlled highlights, rich contrast\n\nSTYLE\nLuxury monochrome campaign, timeless and cinematic\n\nCAMERA\n85mm lens, f/2.8, shallow depth of field\n\nCONSTRAINTS\nNo text, no watermark, natural anatomy, precise details`;
 if(mode==='Video') return `CONCEPT\n${subject}\n\nSCENE\nA visually refined environment with a clear subject and story\n\nACTION\nNatural, purposeful motion with a strong opening frame\n\nCAMERA\nSlow dolly-in, 50mm lens, stable cinematic movement\n\nLIGHTING\nSoft directional light with controlled contrast\n\nAUDIO\nSubtle ambient sound, no music unless requested\n\nOUTPUT\n8-second cinematic sequence, 16:9, seamless motion`;
 return `ROLE\nAct as a senior creative strategist and precise execution partner.\n\nGOAL\n${subject}\n\nCONTEXT\nPrioritize useful, original and audience-appropriate results.\n\nPROCESS\nClarify assumptions, plan the response, then deliver the strongest version.\n\nCONSTRAINTS\nBe specific, avoid filler, and never invent unsupported facts.\n\nOUTPUT\nStart with the final deliverable, followed by concise rationale and next steps.`;
}
function App(){
 const [menu,setMenu]=useState(false),[idea,setIdea]=useState(''),[mode,setMode]=useState<Mode>('Image'),[output,setOutput]=useState(''),[copied,setCopied]=useState(false);
 const lines=useMemo(()=>output.split('\n'),[output]);
 const generate=()=>{setOutput(buildPrompt(idea,mode));setTimeout(()=>document.getElementById('result')?.scrollIntoView({behavior:'smooth',block:'center'}),40)};
 const copy=async()=>{await navigator.clipboard.writeText(output);setCopied(true);setTimeout(()=>setCopied(false),1500)};
 return <main>
  <header className="nav"><a className="brand" href="#top">PromptStudio AI<span>•</span></a><nav className={menu?'open':''}><a href="#studio">Products</a><a href="#inspiration">Inspiration</a><a href="#journal">Journal</a><a href="#pricing">Pricing</a></nav><button className="try" onClick={()=>document.getElementById('studio')?.scrollIntoView({behavior:'smooth'})}>Try Free <ArrowRight size={17}/></button><button className="mobile" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
  <section className="hero" id="top">
   <div className="heroCopy"><div className="eyebrow"><i/>THE AI CREATIVE STUDIO</div><h1>Prompt <em>less.</em><br/>Create <em>more.</em></h1><p>Design, iterate, and ship AI-powered content<br/>across the world’s best models.</p>
    <div className="quick"><Sparkles size={18}/><input aria-label="Describe what you want" value={idea} onChange={e=>setIdea(e.target.value)} onKeyDown={e=>e.key==='Enter'&&generate()} placeholder="Describe what you want to create…"/><button aria-label="Generate prompt" onClick={generate}><ArrowUp/></button></div>
   </div>
   <div className="portrait"><img src="/editorial-portrait.jpg" alt="Monochrome editorial portrait demonstrating an AI image prompt"/><div className="promptCard"><div className="cardTop"><Sparkles size={14}/> Structured Prompt <b/></div><small>SUBJECT</small><p>{idea||'High fashion editorial portrait of a female model'}</p><small>SETTING</small><p>Minimal studio, soft light, monochrome</p><small>STYLE</small><p>Black and white, cinematic, high contrast</p><small>CAMERA</small><p>85mm, f/2.8, shallow depth of field</p><button onClick={()=>{setOutput(buildPrompt(idea,'Image'));copy()}}>Copy Prompt <Copy size={14}/></button></div></div>
  </section>
  <section className="models"><div><span>ALL IN ONE PLACE</span><h2>One studio.<br/>Every model.</h2></div><div className="modelGrid">{models.map((m,i)=><div className="model" key={m}><strong>{m}</strong><small>by {['OpenAI','Anthropic','Google','Midjourney','OpenAI','Google DeepMind'][i]}</small></div>)}</div><a href="#studio">Explore all models <ArrowRight size={16}/></a></section>
  <section className="studio" id="studio"><div className="sectionHead"><span>THE STUDIO</span><h2>From rough idea<br/>to exact direction.</h2><p>Choose a medium. We structure the details that leading AI models need.</p></div>
   <div className="workspace"><div className="modeTabs">{(['Text','Image','Video'] as Mode[]).map(m=><button className={mode===m?'active':''} onClick={()=>setMode(m)} key={m}>{m}</button>)}</div><label>WHAT ARE YOU MAKING?</label><textarea value={idea} onChange={e=>setIdea(e.target.value)} placeholder="A cinematic product launch video for a minimalist watch…"/><div className="workspaceBottom"><span>Optimized for <b>{mode==='Text'?'Claude':mode==='Image'?'Gemini':'Veo'}</b></span><button onClick={generate}>Generate prompt <ArrowRight size={17}/></button></div></div>
   {output&&<div className="result" id="result"><div className="resultTop"><span>STRUCTURED PROMPT</span><button onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Copied':'Copy'}</button></div>{lines.map((l,i)=>l===''?<br key={i}/>:i===0||lines[i-1]===''?<React.Fragment key={i}><small>{l}</small></React.Fragment>:<p key={i}>{l}</p>)}</div>}
  </section>
  <section className="inspiration" id="inspiration"><div className="sectionHead"><span>BUILT FOR THE WAY YOU CREATE</span><h2>One thought.<br/>Infinite forms.</h2></div><div className="cards">{examples.map(E=><article key={E.n}><div className="cardNum">{E.n}</div><E.icon size={30}/><span>{E.tag}</span><h3>{E.title}</h3><p>{E.desc}</p><a href="#studio">Open tool <ArrowRight size={15}/></a></article>)}</div></section>
  <section className="journal" id="journal"><span>FIELD NOTES</span><h2>Good prompts don’t add words.<br/><em>They remove uncertainty.</em></h2><div className="articles"><article><b>GUIDE · 8 MIN</b><h3>How to brief an image model like an art director</h3><a href="#studio">Read article →</a></article><article><b>WORKFLOW · 6 MIN</b><h3>From one product photo to a complete campaign</h3><a href="#studio">Read article →</a></article></div></section>
  <section className="pricing" id="pricing"><div><span>START CREATING</span><h2>Your first five<br/>prompts are on us.</h2></div><div className="price"><b>FREE</b><strong>₹0</strong><p>No card. No commitment.</p>{['5 prompts every day','Text, image & video modes','Copy and export instantly'].map(x=><p className="perk" key={x}><Check size={15}/>{x}</p>)}<button onClick={()=>document.getElementById('studio')?.scrollIntoView({behavior:'smooth'})}>Try PromptStudio <ArrowRight size={17}/></button></div></section>
  <footer><a className="brand" href="#top">PromptStudio AI<span>•</span></a><p>Prompt less. Create more.</p><div><a href="#studio">Products</a><a href="#journal">Journal</a><a href="#pricing">Pricing</a></div><small>© 2026 PromptStudio AI. Built for creators.</small></footer>
 </main>
}
createRoot(document.getElementById('root')!).render(<App/>);
