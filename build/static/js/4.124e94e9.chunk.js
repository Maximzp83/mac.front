(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{699:function(e,t,a){"use strict";a.r(t);var n=a(8),l=a(133),r=a(1),c=a.n(r),i=a(14),m=a(149),s=a(66),u=a(30),o=a(151),p=a(178),d=a(74),E=function(e){var t=e.itemsLoading,a=e.itemsList,n=e.itemsNames.itemsNameMult2,l=e.toggleItemEdit,r=e.toggleItemDelete;e.ruleTypes;return c.a.createElement("div",{className:"mt-3"},t?c.a.createElement("div",{className:"text-center"},c.a.createElement("span",{className:"align-middle"},c.a.createElement(o.a,{size:"sm",color:"primary"})),c.a.createElement("span",{className:"align-middle preloader-text"},"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 ",n,"...")):null,t||a.length?null:c.a.createElement("div",{className:"text-center preloader-text"},n," \u043d\u0435 \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0435\u043d\u043e"),!t&&a.length?c.a.createElement("div",{className:"table-wrapper"},c.a.createElement(p.a,{bordered:!0,size:"sm",striped:!0,className:"standard-table centered"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{className:"id"},"ID"),c.a.createElement("th",{className:"name"},"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"),c.a.createElement("th",null,"\u041e\u0442\u043e\u0431\u0440\u0430\u0436\u0430\u0435\u043c\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435"),c.a.createElement("th",null,"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"),c.a.createElement("th",null,"\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044f"))),c.a.createElement("tbody",null,a.map(function(e,t){return c.a.createElement("tr",{key:"role_item-".concat(t)},c.a.createElement("td",null,e.id),c.a.createElement("td",null,e.name),c.a.createElement("td",null,e.dispaly_name),c.a.createElement("td",null,e.description),c.a.createElement("td",{className:"table-action"},c.a.createElement(d.Edit2,{className:"align-middle mr-1 pointer",size:18,onClick:function(){return function(e){l(e)}(e)}}),c.a.createElement(d.Trash,{className:"align-middle pointer",size:18,onClick:function(){return function(e){r(e)}(e)}})))})))):null)};E.defaultProps={itemsNames:{itemsNameMult2:"\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u044b \u0441\u043f\u0438\u0441\u043a\u0430"},itemsLoading:!1};var g=a(103),f=function(e,t,a){var n,l=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=null;if(a.length)for(var c=0;c<a.length;c++)if(a[c][e]&&a[c][e]===t){r=a[c],n=c;break}return l?{item:r,index:n}:r},b=a(208),y=a(176),h=a(177),v=a(180),N=a(182),O=a(152),T=a(175),j=a(98),w=function(e){var t=e.isOpen,a=e.itemModalToggle,i=e.itemsNames.itemsNameMult2,m=e.submitItem,u=e.ruleTypes,p=e.itemsSaving,d=e.itemData,E=e.isInitialMount,w=Object(r.useState)({id:null,name:"",description:"",rules:[]}),k=Object(l.a)(w,2),x=k[0],M=k[1],S=Object(r.useState)([{ruleType:1,create:!1,update:!1,delete:!1,view:!1},{ruleType:2,create:!1,update:!1,delete:!1,view:!1},{ruleType:3,create:!1,update:!1,delete:!1,view:!1},{ruleType:4,create:!1,update:!1,delete:!1,view:!1},{ruleType:5,create:!1,update:!1,delete:!1,view:!1}]),z=Object(l.a)(S,2),C=z[0],I=z[1],L=function(e){var t=f("ruleType",e.type,C);if(t)return t[e.prop];throw new Error("error in code")},D=function(e){I(function(t){var a=Object.assign([],t),n=f("ruleType",e.type,a,!0),l=n.item,r=n.index;if(l){var c=l[e.prop];a[r][e.prop]=!c}return Object(g.a)(a)})};return Object(r.useEffect)(function(){E||(console.log("Modal Update: ",d),M(d),function(e){for(var t=Object.assign([],C),a=Object.assign([],e.rules),n=0;n<a.length;n++){var l=f("ruleType",a[n].ruleType,t,!0),r=l.item,c=l.index;r&&(t[c]=a[n])}I(t)}(d))},[d]),c.a.createElement(b.a,{size:"lg",isOpen:t,toggle:a},c.a.createElement(y.a,null,c.a.createElement("span",{className:"h2"},"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435/\u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 ",i)),c.a.createElement(h.a,{className:"m-3"},c.a.createElement(j.AvForm,{onValidSubmit:function(){var e=Object.assign({},x),t=Object(n.a)({},e,{rules:C});m(t)}},c.a.createElement(v.a,{row:!0},c.a.createElement(N.a,{sm:3,className:"text-sm-right uppercase"},c.a.createElement("strong",null,"\u0413\u0440\u0443\u043f\u043f\u0430 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439")),c.a.createElement(O.a,{sm:7},c.a.createElement(j.AvField,{name:"group_name",required:!0,bsSize:"lg",type:"text",placeholder:"\u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0433\u0440\u0443\u043f\u043f\u044b",value:x.name,onChange:function(e){var t=e.target.value;M(function(e){return Object(n.a)({},e,{name:t})})}}))),c.a.createElement(v.a,{row:!0},c.a.createElement(N.a,{sm:3,className:"text-sm-right uppercase"},c.a.createElement("strong",null,"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435")),c.a.createElement(O.a,{sm:7},c.a.createElement(j.AvField,{name:"group_description",required:!0,bsSize:"lg",type:"textarea",placeholder:"\u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0433\u0440\u0443\u043f\u043f\u044b",value:x.description,onChange:function(e){var t=e.target.value;M(function(e){return Object(n.a)({},e,{description:t})})}}))),u.map(function(e,t){return c.a.createElement(v.a,{row:!0,key:"rule_type-"+e.ruleType},c.a.createElement(N.a,{sm:3,className:"text-sm-right pt-sm-0 uppercase"},c.a.createElement("strong",null,e.name)),c.a.createElement(O.a,{sm:9},c.a.createElement(T.a,{inline:!0,type:"checkbox",id:"create-".concat(e.ruleType),checked:L({type:e.ruleType,prop:"create"}),onChange:function(){return D({prop:"create",type:e.ruleType})},label:"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435"}),c.a.createElement(T.a,{inline:!0,type:"checkbox",id:"update-".concat(e.ruleType),checked:L({type:e.ruleType,prop:"update"}),onChange:function(){return D({prop:"update",type:e.ruleType})},label:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435"}),c.a.createElement(T.a,{inline:!0,type:"checkbox",id:"delete-".concat(e.ruleType),checked:L({type:e.ruleType,prop:"delete"}),onChange:function(){return D({prop:"delete",type:e.ruleType})},label:"\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435"}),c.a.createElement(T.a,{inline:!0,type:"checkbox",id:"view-".concat(e.ruleType),checked:L({type:e.ruleType,prop:"view"}),onChange:function(){return D({prop:"view",type:e.ruleType})},label:"\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440"})))}),c.a.createElement(v.a,{row:!0},c.a.createElement(O.a,{sm:4,className:"ml-auto"},c.a.createElement(s.a,{color:"gray-400",onClick:a},"\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c"),c.a.createElement(s.a,{color:"tertiary",size:"lg",disabled:p,type:"submit"},p&&c.a.createElement(o.a,{size:"sm",color:"#fff"}),!p&&c.a.createElement("span",null,"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")))))))};w.defaultProps={itemsNames:{itemsNameMult2:"\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432"}};var k=a(696),x=a.n(k);t.default=function(){var e=Object(i.useDispatch)(),t=Object(i.useSelector)(function(e){return e.roles}),a=t.rolesLoading,o=t.rolesList,p=t.ruleTypes,d=t.rolesSaving,g=t.rolesFilter,f=t.rolesMeta,b=Object(r.useState)(!0),y=Object(l.a)(b,2),h=y[0],v=y[1],N=Object(r.useState)(!1),O=Object(l.a)(N,2),T=O[0],j=O[1],k=Object(r.useState)({}),M=Object(l.a)(k,2),S=M[0],z=M[1],C={itemsName:"\u041f\u0440\u0430\u0432\u043e",itemsNameMult1:"\u0413\u0440\u0443\u043f\u043f\u044b \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439",itemsNameMult2:"\u0413\u0440\u0443\u043f\u043f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439"};return Object(r.useEffect)(function(){if(h){if(o.length<1){var t={getParams:Object(n.a)({},g,f)};e(Object(u.b)(t))}v(!1)}else{var a={getParams:Object(n.a)({},g,f)};e(Object(u.b)(a))}},[g,f]),Object(r.useEffect)(function(){return function(){}},[]),c.a.createElement(m.a,{fluid:!0,className:"p-0"},c.a.createElement("h1",{className:"h3 mb-3"},"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0430 \u043f\u0440\u0430\u0432 \u0434\u043e\u0441\u0442\u0443\u043f\u0430 \u0438 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u0440\u043e\u043b\u044f\u043c\u0438"),c.a.createElement(s.a,{color:"tertiary",size:"lg",onClick:function(){return j(!0)}},c.a.createElement("span",null,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0433\u0440\u0443\u043f\u043f\u0443 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u0439")),c.a.createElement(E,{toggleItemEdit:function(e){z(e),j(!0)},toggleItemDelete:function(t){x()({title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",text:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0431\u0435\u0437\u0432\u043e\u0437\u0432\u0440\u0430\u0442\u043d\u043e ".concat(t.name,"?"),icon:"warning",buttons:!0,dangerMode:!0}).then(function(a){a&&e(Object(u.a)(t.id))})},itemsNames:C,itemsLoading:a,itemsList:o,ruleTypes:p}),c.a.createElement(w,{isInitialMount:h,isOpen:T,itemModalToggle:function(){return j(!T)},itemsNames:C,submitItem:function(t){e(Object(u.c)({data:t})).then(function(){return j(!1)})},ruleTypes:p,itemsSaving:d,itemData:S}))}}}]);
//# sourceMappingURL=4.124e94e9.chunk.js.map