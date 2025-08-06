exports.id=85,exports.ids=[85],exports.modules={7463:(e,t,a)=>{Promise.resolve().then(a.bind(a,5748))},5748:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>f});var s=a(5344),r=a(3729),l=a(9224);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,l.Z)("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);var i=a(7121);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let d=(0,l.Z)("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);var c=a(491),o=a(6755);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let m=(0,l.Z)("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);var h=a(4513);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let x=(0,l.Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);var y=a(8200),u=a(2254),g=a(783),p=a.n(g);let f=({children:e})=>{let[t,a]=(0,r.useState)(!1),[l,g]=(0,r.useState)(!0),[f,v]=(0,r.useState)(!1),k=(0,u.useRouter)(),j=(0,u.usePathname)(),b=()=>{let e=localStorage.getItem("adminToken"),t=!!e;return console.log("\uD83D\uDD10 Auth check - Token present:",!!e,"Is authenticated:",t),t};(0,r.useEffect)(()=>{let e=()=>{let e=b();console.log("\uD83D\uDD04 Setting auth state to:",e),a(e),g(!1)};console.log("\uD83D\uDE80 Layout useEffect running - checking auth..."),e();let t=t=>{"adminToken"===t.key&&(console.log("\uD83D\uDCE6 Storage change detected for adminToken"),e())};return window.addEventListener("storage",t),()=>window.removeEventListener("storage",t)},[]),(0,r.useEffect)(()=>{v(!1)},[j]);let N=()=>{localStorage.removeItem("adminToken"),a(!1),k.push("/admin")},w=[{name:"Dashboard",href:"/admin",icon:n},{name:"Applications",href:"/admin/applications",icon:i.Z},{name:"Hero Slides",href:"/admin/hero-slides",icon:d},{name:"Teachers",href:"/admin/teachers",icon:c.Z},{name:"Students",href:"/admin/students",icon:o.Z},{name:"Settings",href:"/admin/settings",icon:m}];if(l)return s.jsx("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"}),s.jsx("p",{className:"mt-4 text-gray-600",children:"Loading..."})]})});let Z=b();return(console.log("\uD83C\uDFA8 Rendering layout - Current auth status:",Z,"State auth status:",t),Z)?(0,s.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,s.jsxs)("div",{className:`fixed inset-0 z-50 lg:hidden ${f?"block":"hidden"}`,children:[s.jsx("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-75",onClick:()=>v(!1)}),(0,s.jsxs)("div",{className:"fixed inset-y-0 left-0 flex w-64 flex-col bg-white",children:[(0,s.jsxs)("div",{className:"flex h-16 items-center justify-between px-4",children:[s.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"HIMS Admin"}),s.jsx("button",{onClick:()=>v(!1),children:s.jsx(h.Z,{className:"w-6 h-6 text-gray-500"})})]}),s.jsx("nav",{className:"flex-1 space-y-1 px-2 py-4",children:w.map(e=>{let t=j===e.href;return(0,s.jsxs)(p(),{href:e.href,className:`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${t?"bg-primary-100 text-primary-900":"text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`,onClick:()=>v(!1),children:[s.jsx(e.icon,{className:"mr-3 h-5 w-5"}),e.name]},e.name)})}),s.jsx("div",{className:"border-t border-gray-200 p-4",children:(0,s.jsxs)("button",{onClick:N,className:"flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md",children:[s.jsx(x,{className:"mr-3 h-5 w-5"}),"Logout"]})})]})]}),s.jsx("div",{className:"hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col",children:(0,s.jsxs)("div",{className:"flex flex-col flex-grow bg-white border-r border-gray-200",children:[s.jsx("div",{className:"flex h-16 items-center px-4",children:s.jsx("h1",{className:"text-lg font-semibold text-gray-900",children:"HIMS Admin"})}),s.jsx("nav",{className:"flex-1 space-y-1 px-2 py-4",children:w.map(e=>{let t=j===e.href;return(0,s.jsxs)(p(),{href:e.href,className:`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${t?"bg-primary-100 text-primary-900":"text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`,children:[s.jsx(e.icon,{className:"mr-3 h-5 w-5"}),e.name]},e.name)})}),s.jsx("div",{className:"border-t border-gray-200 p-4",children:(0,s.jsxs)("button",{onClick:N,className:"flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md",children:[s.jsx(x,{className:"mr-3 h-5 w-5"}),"Logout"]})})]})}),(0,s.jsxs)("div",{className:"lg:pl-64",children:[s.jsx("button",{type:"button",className:"lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200",onClick:()=>v(!0),children:s.jsx(y.Z,{className:"h-6 w-6 text-gray-700"})}),s.jsx("main",{className:"py-6",children:s.jsx("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",children:e})})]})]}):(console.log("❌ Not authenticated - rendering children only"),s.jsx(s.Fragment,{children:e}))}},1222:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(9224).Z)("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]])},3148:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(9224).Z)("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},5695:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(9224).Z)("PenSquare",[["path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1qinfi"}],["path",{d:"M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z",key:"w2jsv5"}]])},1838:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(9224).Z)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]])},1498:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(9224).Z)("Save",[["path",{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",key:"1owoqh"}],["polyline",{points:"17 21 17 13 7 13 7 21",key:"1md35c"}],["polyline",{points:"7 3 7 8 15 8",key:"8nz8an"}]])},6755:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(9224).Z)("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]])},8271:(e,t,a)=>{"use strict";a.d(t,{Z:()=>s});/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,a(9224).Z)("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]])},2254:(e,t,a)=>{e.exports=a(4767)},6294:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>l,__esModule:()=>r,default:()=>n});let s=(0,a(6843).createProxy)(String.raw`E:\my project\my project\hims website\hims frontend\app\admin\layout.tsx`),{__esModule:r,$$typeof:l}=s,n=s.default}};