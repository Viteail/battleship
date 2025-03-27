(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(r){if(r.ep)return;r.ep=!0;const l=o(r);fetch(r.href,l)}})();const V=()=>`<div class='flex p-10 bg-slate-300'>
        <!-- header -->
    <div class='flex'>
      <button id='menu-btn' class='flex items-center'>Menu</button>
    </div>
      <div class='flex-1 text-center text-6xl font-semibold'>Battleship</div>
   </div>`,W=()=>` <div id='content' class='flex items-center justify-center gap-[100px] flex-1'>
       <!-- content  -->
    </div>`,X=()=>{const t=document.body;t.innerHTML=`
    <div class='flex flex-col h-full'>
      ${V()}
      ${W()}
    </div>
  `},x=t=>({col:(""+t).length===1?t:Number((""+t)[1]),row:(""+t).length===1?0:Number((""+t)[0])}),m=t=>+(""+t.row+t.col),h=t=>Math.floor(Math.random()*t),y=(t,e)=>{for(let o=0;o<e.length;o++)for(let n=0;n<e[o].position.length;n++)if(e[o].position[n].col===t.col&&e[o].position[n].row===t.row)return e[o]},f=(t,e)=>Array.from(t.children)[m(e.position[0])].firstElementChild,b=({col:t,row:e})=>t<0||t>9||e<0||e>9,Y=(t,e)=>{for(let o=0;o<t.length;o++)if(t[o].firstElementChild===e)return t[o]},B=(t,e)=>{const o=[];for(let n=0;n<e.length;n++){let r=t.vertical?t.col:t.col+n,l=t.vertical?t.row+n:t.row;t.vertical?(n===0&&o.push({col:r-1,row:l-1},{col:r,row:l-1},{col:r+1,row:l-1}),o.push({col:r-1,row:l},{col:r+1,row:l}),n===e.length-1&&o.push({col:r-1,row:l+1},{col:r,row:l+1},{col:r+1,row:l+1})):(n===0&&o.push({col:r-1,row:l-1},{col:r-1,row:l},{col:r-1,row:l+1}),o.push({col:r,row:l-1},{col:r,row:l+1}),n===e.length-1&&o.push({col:r+1,row:l-1},{col:r+1,row:l},{col:r+1,row:l+1}))}return o},$=()=>{let t="";for(let e=0;e<100;e++)t+="<div class='border border-sky-100'></div>";return t},K=t=>{for(let e=0;e<t.children.length;e++)t.children[e].classList.add("cursor-pointer","hover:bg-slate-100")},w=(t,e,o)=>{const n=o.board[t.row][t.col],r=e.children[m(t)];if(r.classList.remove("hover:bg-slate-100","cursor-pointer"),n==="x"){const l=y(t,o.ships),s=f(e,l);if(s){const c=l.position[0],a=t.row===c.row?t.col-c.col:t.row-c.row;s.children[a].classList.add("bg-red-400")}else r.classList.add("bg-red-400")}else r.classList.add("bg-sky-200")},O=(t,e,o)=>{for(let n=0;n<t.length;n++)b(t[n])||w(t[n],e,o)},J=()=>"<div id='player-turn' class='text-center min-w-[400px] p-10 text-3xl'>Player's Turn!</div>",L=t=>{const e=document.querySelector("#player-turn");e.textContent=`${t}'s Turn!`},q=(t,e,o,n)=>{const r=Array.from(n.children),l=e.position.length>1&&e.position[0].row!==e.position[1].row;let s="";for(let i=0;i<e.length;i++)s+=`
      <div id='l${e.length}-${o}-${i}' class='w-10 h-10 border border-sky-200 bg-blue-50'></div>
    `;const c=r[t],a=l?"flex-col":"";c.classList.remove("hover:bg-slate-100"),c.innerHTML=`
    <div id='l${e.length}-${o}' class='absolute flex ${a} mt-[-3px] ml-[-3px] border-2 border-blue-600 z-10'>
      ${s}
    </div> 
  `},N=(t,e)=>{const o=t.gameboard.ships;for(let n=0;n<o.length;n++){const r=m(o[n].position[0]),l=o.filter(c=>c.length===o[n].length),s=l.length-l.indexOf(o[n]);q(r,o[n],s,e)}},T=(t,e)=>{t.removeChild(e)},C=t=>{let e="";for(let o=0;o<t;o++)e+=`<div id='l${t}-child-${o}' class='w-10 h-10'></div>`;return e},H=(t,e)=>{const o=e.position.length>1&&e.position[0].row!==e.position[1].row;let n="";for(let s=0;s<e.length;s++)n+='<div class="w-10 h-10 border border-sky-200 bg-red-600"></div>';const r=t.children[m(e.position[0])],l=o?"flex-col":"";r.innerHTML=`
  <div class='absolute flex ${l} mt-[-3px] ml-[-3px] border-2 border-red-800 z-10'>
    ${n}
  </div>  
`},M=t=>`
     <div class='text-center text-lg'>Ships alive <span id='${t}-ships-alive'>10</span></div>`,z=t=>{const e=document.querySelector(`#${t.toLowerCase()}-ships-alive`);e.textContent=Number(e.textContent)-1},Q=t=>{t.innerHTML=`
    <div class='flex gap-20'>
      <div class='flex flex-col gap-10'>
        <div>
          <div id='ship-placement-board' class='grid grid-cols-10 w-[25rem] h-[25rem] outline outline-1 outline-slate-400'>${$()}</div>
        </div>
        <div class='flex gap-20'>
          <div class='flex justify-center w-full'><button id='random' class='text-2xl select-none'>Random</button></div>
          <div class='flex justify-center w-full'><button id='reset' class='text-2xl select-none'>Reset</button></div>
        </div>
      </div>

      <div class='flex flex-col gap-10'>
        <div class='flex flex-col gap-5 h-full'>
          <!-- 4l container -->
        <div class='flex gap-2'>
          <div id="l4" class='draggable-ship flex cursor-pointer border-2 border-blue-600 bg-blue-50' draggable="true">
              ${C(4)}
          </div>
            <div id="l4-count" class='flex items-center'>1x</div>
          </div>
          <!-- 3l container -->
          <div class='flex gap-2'>
            <div id="l3" class='draggable-ship flex cursor-pointer border-2 border-blue-600 bg-blue-50' draggable="true">
              ${C(3)}
            </div>
            <div id='l3-count' class='flex items-center'>2x</div>
          </div>
          <!-- 2l container -->
          <div class='flex gap-2'>
            <div id="l2" class='draggable-ship flex cursor-pointer border-2 border-blue-600 bg-blue-50' draggable="true">
              ${C(2)}
            </div>
            <div id='l2-count' class='flex items-center'>3x</div>
          </div>
          <!-- 1l container -->
          <div class='flex gap-2'>
            <div id="l1" class='draggable-ship flex cursor-pointer border-2 border-blue-600 bg-blue-50' draggable="true">
              ${C(1)}
            </div>
            <div id='l1-count' class='flex items-center'>4x</div>
          </div>
        </div>

        <div><button id='start' class='text-2xl select-none'>To Battle</button></div>
      </div>
    </div>
`},U=t=>{t.preventDefault()},D=t=>{t.dataTransfer.types[1]==="parent-id"&&t.target.classList.add("bg-slate-300")},I=t=>{t.target.classList.remove("bg-slate-300")},S=t=>{const e=document.querySelector("#ship-placement-board");t.draggable=!0,t.classList.add("draggable-ship"),t.addEventListener("dragstart",o=>{const{clientX:n,clientY:r}=o,l=document.elementFromPoint(n,r);o.dataTransfer.setData("parent-id",o.target.id),o.dataTransfer.setData("child-id",l.id),e.addEventListener("dragenter",s=>D(s)),e.addEventListener("dragleave",s=>I(s))})},Z=()=>{const t=document.querySelector("#ship-placement-board");t.addEventListener("dragover",o=>U(o)),t.addEventListener("dragenter",o=>D(o)),t.addEventListener("dragleave",o=>I(o)),document.querySelectorAll(".draggable-ship").forEach(o=>S(o))},_=t=>{document.querySelector("#ship-placement-board").addEventListener("drop",o=>ce(o,t))},ee=t=>{const{boxElm:e,shipElm:o,childElm:n,shipPlacement:r,countElm:l}=t,s=e.parentElement,c=Array.from(s.children),a=o.children.length,i=r.gameboard.ships.find(v=>v.length===a&&v.position.length===0);if(!i)return;const d=x(c.indexOf(e)),u=Array.from(o.children).indexOf(n);d.col-=u;const g=m(d);r.gameboard.isValidPlace(i,{col:d.col,row:d.row,vertical:!1,orizontal:!0})&&(r.gameboard.placeShip(i,d),q(g,i,l.textContent[0],s),S(f(s,i)),k(f(s,i),i,r,l.textContent[0]),l.textContent=`${l.textContent[0]-1}x`)},te=(t,e,o,n)=>{const r=document.querySelector("#ship-placement-board"),l=Array.from(r.children),s=Y(l,e),c=x(l.indexOf(s)),a=e.id[e.id.split("").length-1],i=y(c,n.gameboard.ships),d=x(l.indexOf(t)),u={col:d.col,row:d.row,vertical:i.position.length===1||i.position[0].row!==i.position[1].row,orizontal:i.position.length>1&&i.position[0].col!==i.position[1].col},g=Array.from(e.children).indexOf(o);u.vertical?u.row-=g:u.col-=g;const v=m({col:u.col,row:u.row});n.gameboard.retrieveShip({col:c.col,row:c.row,vertical:u.vertical,orizontal:u.orizontal},i),n.gameboard.isValidPlace(i,u)?(T(s,e),n.gameboard.placeShip(i,u),q(v,i,a,r),S(f(r,i)),k(f(r,i),i,n,a)):n.gameboard.placeShip(i,{col:c.col,row:c.row,vertical:u.vertical,orizontal:u.orizontal})},oe=t=>{t.innerHTML=`
  <div class='flex flex-col gap-5'>
    <div class='text-center text-2xl'>Player's gameboard</div>
    <div id='player-board' class='grid grid-cols-10 w-[25rem] h-[25rem] outline outline-1 outline-slate-400'>${$()}</div>
    ${M("player")}
  </div>
  ${J()}
  <div class='flex flex-col gap-5'>
     <div class='text-center text-2xl'>Computer's gameboard</div>
     <div id='pc-board' class='grid grid-cols-10 w-[25rem] h-[25rem] outline outline-1 outline-slate-400'>${$()}</div>
    ${M("computer")}
  </div>
`},R=()=>`
<div id='modal-menu' class='fixed w-full h-full top-0 left-0 flex justify-center items-center z-20 bg-slate-300 bg-opacity-0'>
  <div id='menu' class='flex flex-col items-center gap-10'>
    <div>
      <button id='new-game' class='text-3xl'>New Game</button>
    </div>
    <div>
      <button id='resume' class='text-2xl opacity-50 cursor-default'>Resume</button>
    </div>
  </div>
</div>
`,re=()=>{const t=document.querySelector("#modal-menu"),e=document.querySelector("#menu");t.classList.remove("bg-opacity-0"),t.classList.add("bg-opacity-80"),e.classList.add("bg-white","w-[400px]","h-[350px]","justify-center","rounded-lg")},ne=()=>{const t=document.querySelector("#resume");t.classList.remove("opacity-50","cursor-default"),t.classList.add("cursor-pointer")},le=()=>{document.querySelector("#menu-btn").removeEventListener("click",G)},se=t=>{const{e,computerBoard:o,computer:n,player:r,playerBoard:l}=t;if(e.target===o||e.target.parentElement!==o||n.turn)return;const c=Array.from(o.children).indexOf(e.target),a=x(c);if(!n.gameboard.hasBeenShot(a)){if(n.gameboard.receiveAttack(a),w(a,o,n.gameboard),n.gameboard.board[a.row][a.col]==="x"){const i=y(a,n.gameboard.ships);i.isSunk()&&(H(o,i),O(B({col:i.position[0].col,row:i.position[0].row,vertical:i.position.length>1&&i.position[0].row!==i.position[1].row},i),o,n.gameboard),z(n.name),n.gameboard.areAllShipsSunk()&&F(r.name));return}L(n.name),n.turn=!0,setTimeout(()=>{n.attackRandomSpot(r,l)},400)}},ie=t=>{const e=document.querySelector("#content");le(),Q(e),_(t),Z(),fe(t),me(t),ge(t)},ce=(t,e)=>{t.preventDefault();const o=t.dataTransfer.getData("parent-id"),n=t.dataTransfer.getData("child-id");if(o==="")return;const r=document.querySelector(`#${o}`),l=document.querySelector(`#${n}`);if(!r.classList.contains("draggable-ship"))return;const s=document.querySelector("#ship-placement-board"),c=Array.from(s.children);c.forEach(d=>d.classList.remove("bg-slate-300"));let a=t.target;if(a.parentElement!==s){const d=s.getBoundingClientRect(),u=t.clientX-d.left,g=t.clientY-d.top;c.forEach(v=>{const E=v.getBoundingClientRect();u>=E.left-d.left&&u<=E.right-d.left&&g>=E.top-d.top&&g<=E.bottom-d.top&&(a=v)})}const i=document.querySelector(`#${o}-count`);i?ee({boxElm:a,shipElm:r,childElm:l,shipPlacement:e,countElm:i}):te(a,r,l,e)},ae=(t,e,o,n)=>{const r={col:e.position[0].col,row:e.position[0].row,vertical:e.position.length===1||e.position[0].row!==e.position[1].row,orizontal:e.position.length>1&&e.position[0].col!==e.position[1].col},l={col:r.col,row:r.row,vertical:!r.vertical,orizontal:!r.orizontal},s=t.parentElement,c=document.querySelector("#ship-placement-board"),a=Array.from(c.children).indexOf(s);o.gameboard.retrieveShip(r,e),o.gameboard.isValidPlace(e,l)?(T(s,t),o.gameboard.placeShip(e,l),q(a,e,n,c),S(f(c,e)),k(f(c,e),e,o,n)):o.gameboard.placeShip(e,r)},j=t=>{const e=document.querySelector("#ship-placement-board"),o=Array.from(e.children);for(let n=0;n<o.length;n++)if(o[n].firstElementChild){const r=o[n].firstElementChild.children.length,l=document.querySelector(`#l${r}-count`);l.textContent=`${t.gameboard.ships.filter(s=>s.length===r).length}x`,T(o[n],o[n].firstElementChild)}t.gameboard.reset()},de=(t,e)=>{j(t),t.gameboard.randomShipPlacement(),N(t,e);const o=t.gameboard.ships;for(let n=0;n<o.length;n++){const r=f(e,t.gameboard.ships[n]),l=r.id[r.id.length-1],s=document.querySelector(`#l${l}-count`);s.textContent="0x",S(r),k(r,o[n],t,l)}},ue=t=>{if(!t.gameboard.ships.every(s=>s.position.length>0))return;const e=document.querySelector("#content");oe(e);const o=new A;o.name="Player";const n=new A;n.name="Computer",n.turn=!1,o.gameboard.board=[...t.gameboard.board],o.gameboard.ships=[...t.gameboard.ships],n.gameboard.randomShipPlacement();const r=document.querySelector("#player-board"),l=document.querySelector("#pc-board");N(o,r),ve(l,n,r,o),K(l),ye()},pe=()=>{const t=document.querySelector("#content");Se(),t.innerHTML=R(),P()},he=()=>{const t=document.querySelector("#content"),e=document.querySelector("#modal-menu");t.removeChild(e)},G=()=>{const t=document.querySelector("#content"),o=new DOMParser().parseFromString(R(),"text/html").querySelector("#modal-menu");t.appendChild(o),re(),xe(),ne(),P()},me=t=>{const e=document.querySelector("#random"),o=document.querySelector("#ship-placement-board");e.addEventListener("click",()=>de(t,o))},fe=t=>{document.querySelector("#reset").addEventListener("click",()=>j(t))},ge=t=>{document.querySelector("#start").addEventListener("click",()=>ue(t))},ve=(t,e,o,n)=>{t.addEventListener("click",r=>{se({e:r,computerBoard:t,computer:e,player:n,playerBoard:o})})},k=(t,e,o,n)=>{t.addEventListener("click",()=>ae(t,e,o,n))},be=()=>{document.querySelector("#play-again").addEventListener("click",pe)},we=t=>{document.querySelector("#new-game").addEventListener("click",()=>ie(t))},xe=()=>{document.querySelector("#resume").addEventListener("click",he)},ye=()=>{document.querySelector("#menu-btn").addEventListener("click",G)},F=t=>{const e=document.body;e.innerHTML+=`
    <div id='modal' class='fixed w-full h-full top-0 left-0 flex justify-center items-center z-20 bg-slate-300 bg-opacity-50'>
      <div id='modal-content' class='flex justify-center items-center flex-col bg-white min-w-[400px] min-h-[300px] gap-10 rounded-lg'>
        <div class='text-[2rem]'>${t} Won!</div>
        <div><button id='play-again' class='text-xl'>Play again</button></div>
      </div>
    </div>
`,be()},Se=()=>{const t=document.querySelector("#modal");t.parentElement.removeChild(t)};class p{constructor(e){this.length=e,this.hits=0,this.position=[]}hit(){this.hits++}isSunk(){return this.length===this.hits}}class Ee{constructor(){this.board=[[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".",".","."]],this.ships=[new p(4),new p(3),new p(3),new p(2),new p(2),new p(2),new p(1),new p(1),new p(1),new p(1)]}placeShip(e,o){for(let n=0;n<e.length;n++)o.vertical?(this.board[o.row+n][o.col]="s",e.position.push({col:o.col,row:o.row+n})):(this.board[o.row][o.col+n]="s",e.position.push({col:o.col+n,row:o.row}))}isValidPlace(e,o){for(let r=0;r<e.length;r++){let l=o.vertical?o.col:o.col+r,s=o.vertical?o.row+r:o.row;if(b({col:l,row:s})||this.board[s][l]!==".")return!1}return B(o,e).every(({col:r,row:l})=>b({col:r,row:l})||this.board[l][r]!=="s")}receiveAttack(e){if(this.board[e.row][e.col]==="s"){const o=y(e,this.ships);if(this.board[e.row][e.col]="x",o.hit(),o.isSunk()){const n=o.length>1&&o.position[0].row!==o.position[1].row,r=B({col:o.position[0].col,row:o.position[0].row,vertical:n},o);for(let l=0;l<r.length;l++)b(r[l])||(this.board[r[l].row][r[l].col]="o")}return}this.board[e.row][e.col]="o"}areAllShipsSunk(){return this.ships.every(e=>e.isSunk())}hasBeenShot(e){return this.board[e.row][e.col]==="o"||this.board[e.row][e.col]==="x"}retrieveShip(e,o){for(let n=0;n<o.length;n++)e.vertical?this.board[e.row+n][e.col]=".":this.board[e.row][e.col+n]=".";o.position=[]}reset(){this.ships.forEach(e=>e.position=[]);for(let e=0;e<this.board.length;e++)for(let o=0;o<this.board.length;o++)this.board[e][o]="."}randomShipPlacement(){for(let e=0;e<this.ships.length;e++){const o={col:h(10),row:h(10),vertical:!!h(2)};for(;!this.isValidPlace(this.ships[e],o);)o.col=h(10),o.row=h(10),o.vertical=!!h(2);this.placeShip(this.ships[e],o)}}}class A{constructor(){this.turn=!0,this.gameboard=new Ee,this.name,this.hits=[]}attackRandomSpot(e,o){if(this.hits.length)return this.attackNearSpot(e,o);const n=e.gameboard,r=h(100),l=x(r);if(n.hasBeenShot(l))return this.attackRandomSpot(e,o);n.receiveAttack(l),w(l,o,n),n.board[l.row][l.col]==="x"?this.processHit(l,e,o):(this.turn=!1,L(e.name))}attackNearSpot(e,o){if(this.hits.length>1)return this.attackRow(e,o);const n=e.gameboard,r=this.hits[0],l={col:r.col,row:r.row};let s=[{col:l.col,row:l.row-1},{col:l.col,row:l.row+1},{col:l.col-1,row:l.row},{col:l.col+1,row:l.row}],c=[];for(let i=0;i<s.length;i++)!b(s[i])&&!n.hasBeenShot(s[i])&&c.push(s[i]);s=[...c];let a=h(s.length);n.receiveAttack(s[a]),Array.from(o.children),w(s[a],o,n),n.board[s[a].row][s[a].col]==="x"?this.processHit(s[a],e,o):(this.turn=!1,L(e.name))}attackRow(e,o){const n=e.gameboard,r=this.hits[0],l=this.hits[this.hits.length-1];let s=[{col:r.col===l.col?r.col:r.col>l.col?r.col+1:r.col-1,row:r.row===l.row?r.row:r.row>l.row?r.row+1:r.row-1},{col:r.col===l.col?r.col:r.col>l.col?l.col-1:l.col+1,row:r.row===l.row?r.row:r.row>l.row?l.row-1:l.row+1}],c=[];for(let i=0;i<s.length;i++)!b(s[i])&&!n.hasBeenShot(s[i])&&c.push(s[i]);s=[...c];const a=h(s.length);n.receiveAttack(s[a]),w(s[a],o,n),n.board[s[a].row][s[a].col]==="x"?this.processHit(s[a],e,o):(this.turn=!1,L(e.name))}processHit(e,o,n){const r=o.gameboard,l=y(e,r.ships);if(l.isSunk()){if(H(n,l),O(B({col:l.position[0].col,row:l.position[0].row,vertical:l.length>1&&l.position[0].row!==l.position[1].row},l),n,r),z(o.name),r.areAllShipsSunk()){F(this.name);return}this.hits=[]}else this.hits.push(e),this.hits.sort((s,c)=>m(s)-m(c));setTimeout(()=>{this.attackRandomSpot(o,n)},400)}}const P=()=>{const t=new A;we(t)},Ce=()=>{X();const t=document.querySelector("#content");t.innerHTML=R(),P()};Ce();
