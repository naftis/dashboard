(this["webpackJsonpkaleva-dashboard"]=this["webpackJsonpkaleva-dashboard"]||[]).push([[0],{66:function(e,t,n){},80:function(e,t,n){},89:function(e,t,n){"use strict";n.r(t);var r=n(4),a=n(3),c=n.n(a),s=n(55),i=n.n(s),o=(n(66),n(22)),u=n(26),d=n(33),l=n(56),p=n(23),b=n(9),j=n.n(b),h=n(15),f=(n(57),n(58)),m="https://api.openweathermap.org/data/2.5/",v={appid:"2b0ad50b08d453642b2296fd8d877fee",lang:"fi",units:"metric"};function O(e,t){return g.apply(this,arguments)}function g(){return(g=Object(h.a)(j.a.mark((function e(t,n){var r,a,c,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=m+t,a=f.stringify(Object(o.a)(Object(o.a)({},n),v)),e.next=4,fetch("".concat(r,"?").concat(a));case 4:return c=e.sent,e.next=7,c.json();case 7:return s=e.sent,e.abrupt("return",s);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=function(e){return Object(h.a)(j.a.mark((function t(){var n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O("weather",{q:e});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})))()};var y={"01d":"\u2600\ufe0f","01n":"\u2600\ufe0f","02d":"\u26c5\ufe0f","02n":"\u26c5\ufe0f","03d":"\u2601\ufe0f","03n":"\u2601\ufe0f","04d":"\u2601\ufe0f","04n":"\u2601\ufe0f","09d":"\ud83c\udf27","09n":"\ud83c\udf27","10d":"\ud83c\udf26","10n":"\ud83c\udf26","11d":"\u26c8","11n":"\u26c8","13d":"\ud83c\udf28","13n":"\ud83c\udf28","50d":"\ud83c\udf2b","50n":"\ud83c\udf2b"},w=function(e){return e.toString().padStart(2,"0")},D=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return"".concat(w(e.hours),":").concat(w(e.minutes)).concat(t.showSeconds?":".concat(w(e.seconds)):"").replace(/^25/,"01").replace(/^24/,"00")};n(80);function k(){var e=Object(l.a)(["\n  query GetStops($stopIds: [String], $numberOfDepartures: Int!) {\n    stops(ids: $stopIds) {\n      name\n      gtfsId\n      stoptimesWithoutPatterns(numberOfDepartures: $numberOfDepartures) {\n        stop {\n          id\n          gtfsId\n          platformCode\n          __typename\n        }\n        scheduledArrival\n        realtimeArrival\n        arrivalDelay\n        scheduledDeparture\n        realtimeDeparture\n        departureDelay\n        usedTime: realtimeDeparture\n        timepoint\n        realtime\n        realtimeState\n        pickupType\n        dropoffType\n        serviceDay\n        headsign\n        trip {\n          route {\n            shortName\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n  }\n"]);return k=function(){return e},e}var I={"tampere:4507":{background:"none"},"tampere:4511":{background:"rgba(6,70,107,0.29)"}},S=Object(p.gql)(k()),T=function(){var e,t=Object(a.useState)(""),n=Object(u.a)(t,2),c=n[0],s=n[1],i=Object(a.useState)(""),o=Object(u.a)(i,2),d=o[0],l=o[1],b=Object(a.useState)(""),j=Object(u.a)(b,2),h=j[0],f=j[1];function m(){x("Tampere").then((function(e){var t=e.main.temp.toFixed(1);f(t),l(y[e.weather[0].icon])}))}Object(a.useEffect)((function(){m();var e=setInterval(m,6e5);return function(){return clearInterval(e)}}),[]);var v=function(){var e=(new Date).toLocaleTimeString("en-US",{hour12:!1});s(e)};Object(a.useEffect)((function(){var e=setInterval(v,500);return function(){return clearInterval(e)}}),[]);var O=Object(p.useQuery)(S,{variables:{stopIds:Object.keys(I),numberOfDepartures:10},pollInterval:6e4}).data,g=null===O||void 0===O||null===(e=O.stops)||void 0===e?void 0:e.flatMap((function(e){return e.stoptimesWithoutPatterns})).sort((function(e,t){return new Date(e.realtimeDeparture+1e3*e.serviceDay).getTime()-new Date(t.realtimeDeparture+1e3*t.serviceDay).getTime()}));return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("header",{className:"header",children:[Object(r.jsxs)("div",{className:"weather",children:[Object(r.jsx)("div",{className:"icon",children:d}),Object(r.jsxs)("div",{className:"temperature ".concat(Number(h)>0?"positive":"negative"),children:[h,"\xb0C"]})]}),Object(r.jsx)("div",{className:"time",children:c})]}),Object(r.jsxs)("table",{className:"bus",children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{children:"Linja"}),Object(r.jsx)("th",{children:"L\xe4ht\xf6aika"})]})}),Object(r.jsx)("tbody",{children:null===g||void 0===g?void 0:g.map((function(e,t){var n,a;return Object(r.jsxs)("tr",{style:{background:null===(n=I[e.stop.gtfsId])||void 0===n?void 0:n.background},children:[Object(r.jsx)("td",{children:e.trip.route.shortName}),Object(r.jsx)("td",{children:D((a=e.realtimeDeparture,{hours:Math.floor(a/3600),minutes:Math.floor(a/60)%60,seconds:a%60}))})]},t)}))})]})]})},N=function(e){var t=e.goBack,n=Object(d.useDoubleTap)((function(){t()}));return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",Object(o.a)({style:{height:"20vh",width:"20vw",position:"absolute",left:0,top:0,right:0,bottom:0,zIndex:100}},n)),Object(r.jsx)("iframe",{title:"Live-camera",src:"https://flycam.roundshot.co/kansijaareena/",style:{height:"100vh",width:"100vw",borderWidth:"0"}})]})},_=function(){var e=Object(a.useState)("bus-stop"),t=Object(u.a)(e,2),n=t[0],c=t[1],s=Object(d.useDoubleTap)((function(){c("bus-stop"===n?"live-camera":"bus-stop")}));return Object(r.jsxs)("div",Object(o.a)(Object(o.a)({className:"App"},s),{},{children:["bus-stop"===n&&Object(r.jsx)(T,{}),"live-camera"===n&&Object(r.jsx)(N,{goBack:function(){c("bus-stop")}})]}))},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,90)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},F=new p.ApolloClient({uri:"https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql",cache:new p.InMemoryCache});i.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(p.ApolloProvider,{client:F,children:Object(r.jsx)(_,{})})}),document.getElementById("root")),C()}},[[89,1,2]]]);
//# sourceMappingURL=main.f4faa75d.chunk.js.map