// Gera public/roda.svg e public/mapa.svg. Rode: node scripts/figuras.mjs
import { writeFileSync } from 'node:fs';
const C = { Ira:'#d14a31', 'Luxúria':'#c63d8c', 'Preguiça':'#5b7ccc', 'Ganância':'#cf8f26', Inveja:'#3f9e6b', Gula:'#a86a36', Orgulho:'#d7b44a' };
const W = ['Ira','Luxúria','Preguiça','Ganância','Inveja','Gula'];
const BG = '#f3eee6', INK = '#211c1a', MUT = '#7a6f68';
const font = `font-family="Georgia,serif"`;

// Roda
{
  const cx=300, cy=300, R=200, r=52;
  const P = W.map((_,i)=>{const a=(-90+60*i)*Math.PI/180;return [cx+R*Math.cos(a), cy+R*Math.sin(a)];});
  const sh=(a,b,x,y)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);return [a[0]+dx/L*x,a[1]+dy/L*x,b[0]-dx/L*y,b[1]-dy/L*y].map(v=>v.toFixed(1));};
  let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" rx="12" fill="${BG}"/><defs><marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="${MUT}"/></marker></defs>`;
  for(let i=0;i<6;i++) for(const k of [1,2]){const c=sh(P[i],P[(i+k)%6],r+4,r+10);s+=`<line x1="${c[0]}" y1="${c[1]}" x2="${c[2]}" y2="${c[3]}" stroke="${MUT}" stroke-width="${k===1?3:1.5}" marker-end="url(#a)"/>`;}
  W.forEach((n,i)=>{s+=`<circle cx="${P[i][0].toFixed(1)}" cy="${P[i][1].toFixed(1)}" r="${r}" fill="#fff" stroke="${C[n]}" stroke-width="6"/><text x="${P[i][0].toFixed(1)}" y="${(P[i][1]+6).toFixed(1)}" text-anchor="middle" font-size="19" font-weight="700" fill="${INK}" ${font}>${n}</text>`;});
  s+=`<circle cx="300" cy="300" r="58" fill="#fff" stroke="${C.Orgulho}" stroke-width="6"/><text x="300" y="306" text-anchor="middle" font-size="19" font-weight="700" fill="${INK}" ${font}>Orgulho</text></svg>`;
  writeFileSync('public/roda.svg', s);
}
// Mapa
{
  const cx=310, cy=310, Ro=232, Ri=118;
  const regs=[['Marca Rubra','Ira'],['Costa Carmim','Luxúria'],['Vagar','Preguiça'],['Caliburna','Ganância'],['Silvara','Inveja'],['Terras Sem Lei','Gula']];
  const pt=(r,a)=>{const t=(a-90)*Math.PI/180;return [cx+r*Math.cos(t), cy+r*Math.sin(t)].map(v=>v.toFixed(1));};
  let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 640"><rect width="620" height="640" rx="12" fill="#dfe6ea"/>`;
  s+=`<text x="20" y="34" font-size="14" fill="${MUT}" font-style="italic" ${font}>Oceano Sorvedouro</text>`;
  s+=`<path d="M530,56 a34,34 0 1,0 30,52 a26,26 0 1,1 -30,-52z" fill="#9aa3a8"/><text x="520" y="128" font-size="13" fill="${INK}" ${font}>Meia-Lua</text>`;
  regs.forEach(([nome,p],i)=>{const a0=i*60-30,a1=a0+60,p1=pt(Ro,a0),p2=pt(Ro,a1),p3=pt(Ri,a1),p4=pt(Ri,a0);
    s+=`<path d="M${p1} A${Ro},${Ro} 0 0,1 ${p2} L${p3} A${Ri},${Ri} 0 0,0 ${p4}Z" fill="${C[p]}" fill-opacity=".35" stroke="#dfe6ea" stroke-width="4"/>`;
    const m=pt((Ro+Ri)/2,i*60);s+=`<text x="${m[0]}" y="${(+m[1]-4).toFixed(1)}" text-anchor="middle" font-size="16" font-weight="700" fill="${INK}" ${font}>${nome}</text><text x="${m[0]}" y="${(+m[1]+15).toFixed(1)}" text-anchor="middle" font-size="12" fill="${INK}" ${font}>${p}</text>`;});
  s+=`<circle cx="${cx}" cy="${cy}" r="${Ri}" fill="#b9c8d2"/><text x="${cx}" y="${cy-64}" text-anchor="middle" font-size="13" fill="${INK}" font-style="italic" ${font}>Mar da Queda</text>`;
  s+=`<circle cx="${cx}" cy="${cy}" r="36" fill="#eef3f6" stroke="${C.Orgulho}" stroke-width="3"/><text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="14" font-weight="700" fill="${INK}" ${font}>Fragmento</text>`;
  s+=`<ellipse cx="42" cy="320" rx="26" ry="60" fill="#f6f6f6" stroke="${MUT}" stroke-dasharray="4 4"/><text x="42" y="400" text-anchor="middle" font-size="13" fill="${INK}" ${font}>Ossário</text>`;
  s+=`<text x="310" y="620" text-anchor="middle" font-size="12" fill="${MUT}" ${font}>Esboço. As regiões seguem a ordem da Roda; o desenho final será irregular.</text></svg>`;
  writeFileSync('public/mapa.svg', s);
}
console.log('figuras geradas');
