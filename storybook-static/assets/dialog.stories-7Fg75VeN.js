import{j as o}from"./jsx-runtime-DR9Q75dM.js";import{R as a}from"./index-DRjF_FHU.js";import{n as E,b as O,a as R}from"./common.util-BcLy7-o2.js";import{c as k,j as i,a as S,b as p,A as P,m as z}from"./index-CzscndGX.js";import{I as j}from"./index-BjxToQ0P.js";const A=()=>k((n,e)=>({instances:[],create:t=>n(s=>({instances:[...s.instances,{id:E("alpha"),...t}]})),remove:t=>n(s=>({instances:s.instances.filter(r=>r.id!==t)}))})),_=a.createContext(void 0),m=a.memo(n=>{const{children:e}=n,t=a.useRef(A());return o.jsx(_.Provider,{value:{store:t.current},children:e})});m.displayName="Dialog.ScopeContextProvider";const I=()=>{const n=a.useContext(_);if(!n)throw new Error("Missing ScopeContextProvider");return{...n,store:O(n.store)}};m.__docgenInfo={description:"",methods:[],displayName:"Dialog.ScopeContextProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const $=()=>{const[n,e]=a.useState(null),t=a.useRef(null);return a.useEffect(()=>{const s=t.current;if(!s)return;const r=()=>e(s.getBoundingClientRect()),x=new ResizeObserver(()=>{r()});return x.observe(s),r(),()=>{x.disconnect()}},[]),{ref:t,rect:n}},K=n=>{a.useEffect(()=>{const e=t=>{n&&t.preventDefault()};return window.addEventListener("wheel",e,{passive:!1}),()=>{window.removeEventListener("wheel",e)}},[n])},T=n=>{const{instance:e}=n;return i("div",{role:"dialog","aria-labelledby":`dialog-title-${e.id}`,"aria-describedby":`dialog-body-${e.id}`,"aria-modal":"true",className:"z-2 absolute left-[50%] top-[40%] h-auto w-auto",css:S`
        transform: translateX(-50%) translateY(-50%);
      `,children:p("div",{className:"min-w-[350px] max-w-[550px] overflow-hidden rounded-[8px] border border-[#D5D8DE] bg-white drop-shadow-[0_4px_8px_#E5E5E526]",children:[p("div",{className:"flex items-center justify-start gap-3 border-b border-[#D5D8DE] bg-white p-[20px]",children:[e.icon&&e.icon,i("h3",{id:`dialog-title-${e.id}`,className:"m-0 p-0 text-base font-semibold text-[#3C4B65]",children:e.title})]}),p("div",{className:"space-y-[16px] bg-[#F7F8FA] p-[20px]",children:[i("div",{id:`dialog-body-${e.id}`,children:e.body&&e.body}),e.actions&&i("div",{className:"flex items-center justify-center",children:e.actions(e)})]})]})})};T.__docgenInfo={description:"",methods:[],displayName:"DialogInstance",props:{instance:{required:!0,tsType:{name:"TDialogInstance"},description:""}}};const F=()=>{const e=I().store.use.instances(),{ref:t,rect:s}=$();return K(e.length>0),i("div",{ref:t,className:R("absolute inset-0 z-[99999] h-full w-full",{"pointer-events-none select-none":e.length===0}),children:i(P,{children:e.length>0&&i(z.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"absolute inset-0 bg-[#3C4B65]/20",children:i("ul",{className:"fixed m-0 h-full list-none overflow-hidden p-0",css:S`
                width: ${s?s.width:0}px;
              `,children:e.map(r=>i("li",{children:i(T,{instance:r})},r.id))})})})})};F.__docgenInfo={description:"",methods:[],displayName:"DialogContainer"};const u=n=>{const{children:e}=n;return o.jsxs(m,{children:[o.jsx(F,{}),e]})};u.__docgenInfo={description:"",methods:[],displayName:"DialogProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const h=()=>{const{store:n}=I();return{create:s=>{n.getState().create(s)},remove:s=>{n.getState().remove(s)}}},W={title:"Components/Dialog",component:u,decorators:[n=>o.jsx(u,{children:o.jsx(n,{})})]},d=()=>{const n=h(),e=()=>{n.create({title:"Dialog Title",body:o.jsx("p",{children:"This is a dialog body"}),actions:t=>o.jsx("button",{onClick:()=>n.remove(t.id),children:"Close"})})};return o.jsx("div",{children:o.jsx("button",{onClick:e,children:"Show Dialog"})})},c=()=>{const n=h(),e=()=>{n.create({title:"No Changes Detected",icon:o.jsx(j.Info,{"aria-hidden":"true",className:"h-10 w-10 shrink-0 fill-[#507CCF]"}),body:o.jsx("div",{className:"rounded-[8px] bg-white px-[16px] py-[12px] drop-shadow-[0_4px_8px_#E5E5E526]",children:o.jsx("p",{className:"m-0 p-0 text-sm font-medium leading-[24px] text-[#5F7089]",children:"The uploaded file does not contain any changes to the TSOs. Please review the file and try again if necessary."})}),actions:t=>o.jsx("button",{type:"button",className:"rounded-[8px] border-none bg-[#507CCF] px-5 py-2 outline-none transition-colors duration-100 hover:bg-[#5885d8] active:bg-[#456db8]",onClick:()=>{n.remove(t.id)},children:o.jsx("span",{className:"text-sm font-medium text-white",children:"OK"})})})};return o.jsx("button",{onClick:e,children:"Show No Changes Dialog"})},l=()=>{const n=h(),e=()=>{n.create({title:"No TSOs Info Found",icon:o.jsx(j.Info,{"aria-hidden":"true",className:"h-10 w-10 shrink-0 fill-[#CF5050]"}),body:o.jsx("div",{className:"rounded-[8px] border border-[#CF5050] bg-[#CF5050]/10 px-[16px] py-[12px] drop-shadow-[0_4px_8px_#E5E5E526]",children:o.jsxs("div",{className:"m-0 p-0 text-sm font-medium leading-[24px] text-[#CF5050]",children:[o.jsx("span",{children:"No TSOs info found for these subdivisions or they are out of the subdivisions milepost ranges. Provided subdivisions:"}),o.jsxs("ul",{className:"ml-6 list-item list-disc",children:[o.jsx("li",{children:"MONTREAL"}),o.jsx("li",{children:"KINGSTON"})]}),o.jsx("span",{children:"Please ensure the document is a valid document that contains TSO information for the provided subdivisions."})]})}),actions:t=>o.jsx("button",{type:"button",className:"rounded-[8px] border-none bg-[#CF5050] px-5 py-2 outline-none transition-colors duration-100 hover:bg-[#da5959] active:bg-[#be4848]",onClick:()=>{n.remove(t.id)},children:o.jsx("span",{className:"text-sm font-medium text-white",children:"Close"})})})};return o.jsx("button",{onClick:e,children:"Show No TSOs Info Found"})};d.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"NoChangesDetected"};l.__docgenInfo={description:"",methods:[],displayName:"NoTSOInfoFound"};var g,b,f;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const dialog = useDialog();
  const handleCreateDialog = () => {
    dialog.create({
      title: "Dialog Title",
      body: <p>This is a dialog body</p>,
      actions: instance => <button onClick={() => dialog.remove(instance.id)}>Close</button>
    });
  };
  return <div>\r
      <button onClick={handleCreateDialog}>Show Dialog</button>\r
    </div>;
}`,...(f=(b=d.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var v,C,N;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  const dialog = useDialog();
  const handleCreateNoChangesDialog = () => {
    dialog.create({
      title: "No Changes Detected",
      icon: <Icons.Info aria-hidden="true" className="h-10 w-10 shrink-0 fill-[#507CCF]" />,
      body: <div className="rounded-[8px] bg-white px-[16px] py-[12px] drop-shadow-[0_4px_8px_#E5E5E526]">\r
          <p className="m-0 p-0 text-sm font-medium leading-[24px] text-[#5F7089]">\r
            The uploaded file does not contain any changes to the TSOs. Please review the file and\r
            try again if necessary.\r
          </p>\r
        </div>,
      actions: instance => <button type="button" className="rounded-[8px] border-none bg-[#507CCF] px-5 py-2 outline-none transition-colors duration-100 hover:bg-[#5885d8] active:bg-[#456db8]" onClick={() => {
        dialog.remove(instance.id);
      }}>\r
          <span className="text-sm font-medium text-white">OK</span>\r
        </button>
    });
  };
  return <button onClick={handleCreateNoChangesDialog}>Show No Changes Dialog</button>;
}`,...(N=(C=c.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var y,w,D;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const dialog = useDialog();
  const handleCreateNoTSOsInfoFound = () => {
    dialog.create({
      title: "No TSOs Info Found",
      icon: <Icons.Info aria-hidden="true" className="h-10 w-10 shrink-0 fill-[#CF5050]" />,
      body: <div className="rounded-[8px] border border-[#CF5050] bg-[#CF5050]/10 px-[16px] py-[12px] drop-shadow-[0_4px_8px_#E5E5E526]">\r
          <div className="m-0 p-0 text-sm font-medium leading-[24px] text-[#CF5050]">\r
            <span>\r
              No TSOs info found for these subdivisions or they are out of the subdivisions milepost\r
              ranges. Provided subdivisions:\r
            </span>\r
            <ul className="ml-6 list-item list-disc">\r
              <li>MONTREAL</li>\r
              <li>KINGSTON</li>\r
            </ul>\r
            <span>\r
              Please ensure the document is a valid document that contains TSO information for the\r
              provided subdivisions.\r
            </span>\r
          </div>\r
        </div>,
      actions: instance => <button type="button" className="rounded-[8px] border-none bg-[#CF5050] px-5 py-2 outline-none transition-colors duration-100 hover:bg-[#da5959] active:bg-[#be4848]" onClick={() => {
        dialog.remove(instance.id);
      }}>\r
          <span className="text-sm font-medium text-white">Close</span>\r
        </button>
    });
  };
  return <button onClick={handleCreateNoTSOsInfoFound}>Show No TSOs Info Found</button>;
}`,...(D=(w=l.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};const X=["Default","NoChangesDetected","NoTSOInfoFound"];export{d as Default,c as NoChangesDetected,l as NoTSOInfoFound,X as __namedExportsOrder,W as default};
