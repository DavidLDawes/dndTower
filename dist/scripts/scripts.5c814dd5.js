"use strict";angular.module("dndApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/equip",{templateUrl:"views/equip.html",controller:"EquipCtrl"}).when("/purchase",{templateUrl:"views/purchase.html",controller:"PurchaseCtrl"}).when("/generate",{templateUrl:"views/generate.html",controller:"GenerateCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/main",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("dndApp").controller("MainCtrl",["$scope","$interval","$location","Settings",function(a,b,c,d){var e,f,g;a.links=[{view:"Fight",link:"/"},{view:"Generate",link:"/generate"},{view:"Equip",link:"/equip"},{view:"About",link:"/about"}],a.selectlink=a.links[0],a.go=function(a){"Fight"!==a.view&&c.path(a.link)},a.selectequip=d.getEquipment(),a.selectpriority=d.getGenerator(),a.turn=function(){e=a.fight,d.updateBattlefield(d.generateSoldier(a.selectpriority,a.selectequip),d.generateSoldier({score:"Balanced",str:{dice:2,type:6,plus:6},dex:{dice:2,type:6,plus:6},con:{dice:2,type:6,plus:6}},{type:"Balanced",weapontypeodds:[1,2,2,2,1],armortypeodds:[1,2,2,4,4,4,2,1]})),a.fight=d.getFight(),(null===a.fight||0===a.fight.length)&&(a.fight=e),a.showSoldiers(),d.showGraphic(d.getBattlefield,d.getCtx())},a.getSoldiers=function(a){for(f in d.getBattlefield)f=d.getBattlefield[f],null!==f&&f.mine===a&&g.push(f);return g},a.getMine=function(){return d.getSoldiers("true")},a.getTheirs=function(){return d.getSoldiers("false")},a.showSoldiers=function(){a.mySoldiers=a.getMine(),a.theirSoldiers=a.getTheirs()},a.updatePromise=b(function(){console.log("Update"),d.updateBattlefield(null,null),void 0!==d.fight&&d.fight.length>0&&(a.fight=d.fight),d.showGraphic(d.getBattlefield,d.getCtx())},1e3),d.showGraphic(d.getBattlefield(),d.getCtx())}]),angular.module("dndApp").controller("AboutCtrl",["$scope","$location","Settings",function(a,b,c){a.links=[{view:"Fight",link:"/"},{view:"Generate",link:"/generate"},{view:"Equip",link:"/equip"},{view:"About",link:"/about"}],a.selectlink=a.links[3],a.go=function(a){"About"!==a.view&&b.path(a.link)},a.selectequip=c.getEquipment(),a.selectpriority=c.getGenerator()}]),angular.module("dndApp").controller("GenerateCtrl",["$scope","$location","Settings",function(a,b,c){a.links=[{view:"Fight",link:"/"},{view:"Generate",link:"/generate"},{view:"Equip",link:"/equip"},{view:"About",link:"/about"}],a.selectlink=a.links[1],a.go=function(a){"Generate"!==a.view&&b.path(a.link)},a.priorities=[{score:"Balanced",str:{dice:2,type:6,plus:6},dex:{dice:2,type:6,plus:6},con:{dice:2,type:6,plus:6}},{score:"High Strength",str:{dice:0,type:6,plus:18},dex:{dice:3,type:6,plus:0},con:{dice:3,type:6,plus:0}},{score:"High Endurance",str:{dice:3,type:6,plus:0},dex:{dice:3,type:6,plus:0},con:{dice:0,type:6,plus:18}},{score:"High Speed",str:{dice:3,type:6,plus:3},dex:{dice:0,type:6,plus:18},con:{dice:3,type:6,plus:0}}],a.selectequip=c.getEquipment(),a.selectpriority=c.getGenerator(),a.selection=function(b){c.setGenerator(b),a.selectpriority=b}}]),angular.module("dndApp").controller("EquipCtrl",["$scope","$location","Settings",function(a,b,c){a.links=[{view:"Fight",link:"/"},{view:"Generate",link:"/generate"},{view:"Equip",link:"/equip"},{view:"About",link:"/about"}],a.selectlink=a.links[2],a.go=function(a){"Equip"!==a.view&&b.path(a.link)},a.equipment=[{type:"Balanced",weapontypeodds:[1,2,2,2,1],armortypeodds:[1,2,2,4,4,4,2,1]},{type:"Cheap Weapon",weapontypeodds:[7,2,1,0,0],armortypeodds:[0,0,1,2,4,4,4,4]},{type:"Good Weapon",weapontypeodds:[0,0,0,2,8],armortypeodds:[4,4,4,4,2,1,0,0]},{type:"Cheap Armor",weapontypeodds:[0,1,2,4,4],armortypeodds:[7,2,1,0,0,0,0,0]},{type:"Good Armor",weapontypeodds:[4,4,2,1,0],armortypeodds:[0,0,0,0,0,1,3,6]}],a.selectequip=c.getEquipment(),a.selection=function(b){c.setEquipment(b),a.selectequip=b},a.weapons=c.Equipment,a.armor=c.Armor,a.selectpriority=c.getGenerator()}]),angular.module("dndApp").service("Settings",function a(){var b,c,d,e,f,g,h,i=10,j=480;return{weapons:[{type:"knife",thac0:[20,20,20,19,17,16,14,12,10,9],damage:{dice:1,type:3,plus:0}},{type:"short sword",thac0:[20,20,19,18,16,15,13,12,11,10],damage:{dice:1,type:4,plus:0}},{type:"broad sword",thac0:[20,19,18,18,16,15,13,12,11,10],damage:{dice:1,type:6,plus:0}},{type:"long sword",thac0:[20,19,18,17,15,14,12,11,10,9],damage:{dice:1,type:8,plus:0}},{type:"great sword",thac0:[18,17,17,16,15,14,12,10,9,8],damage:{dice:1,type:10,plus:2}}],armor:[{type:"Leather armor",ac:8},{type:"Ring mail",ac:7},{type:"Scale mail",ac:6},{type:"Chain mail",ac:5},{type:"Splint mail",ac:4},{type:"Plate mail",ac:3},{type:"Field plate mail",ac:2},{type:"Full plate",ac:1}],getGenerator:function(){return void 0===b&&(b={score:"Balanced",str:{dice:2,type:6,plus:6},dex:{dice:2,type:6,plus:6},con:{dice:2,type:6,plus:6}}),b},setGenerator:function(c){return b=c,a},resetGenerator:function(){return b={score:"Balanced",str:{dice:2,type:6,plus:6},dex:{dice:2,type:6,plus:6},con:{dice:2,type:6,plus:6}}},getEquipment:function(){return void 0===c&&(c={type:"Balanced",weapontypeodds:[1,2,2,2,1],armortypeodds:[1,2,2,4,4,4,2,1]}),c},setEquipment:function(b){return c=b,a},resetEquipment:function(){return c={type:"Balanced",weapontypeodds:[1,2,2,2,1],armortypeodds:[1,2,2,4,4,4,2,1]}},initBattleCanvas:function(){return f=document.getElementById("battleCanvas"),null!==f?(g=f.getContext("2d"),g.font="8 px Arial"):g=null,g},getFight:function(){return void 0===h&&(h=null),h},getCtx:function(){return f=document.getElementById("battleCanvas"),null!==f&&void 0!==f?(g=f.getContext("2d"),g.font="8 px Arial"):g=null,g},showGraphic:function(a,b){void 0!==b&&null!==b&&(void 0===e&&(e=document.getElementById("stick")),this.drawFigures(a,b))},drawFigures:function(a,b){var c,d;for(c=0;c<a.length;c++)null===a[c]?b.clearRect(c*i,12,i,200):(b.drawImage(e,c*i,12),b.fillText("st",c*i,40),b.fillText(a[c].scores[0],c*i,50),b.fillText("dx",c*i,62),b.fillText(a[c].scores[1],c*i,72),b.fillText("cn",c*i,84),b.fillText(a[c].scores[2],c*i,94),b.fillText("hp",c*i,106),b.fillText(a[c].hp,c*i,116),b.fillText("max",c*i,128),b.fillText(a[c].maxHp,c*i,138),b.fillText("ac",c*i,150),b.fillText(a[c].ac,c*i,162),"knife"===a[c].weapon.type?(d="true"===a[c].mine?i-1:0,b.moveTo(c*i+d,18),b.lineTo(c*i+d,16),b.stroke()):"short sword"===a[c].weapon.type?(b.moveTo(c*i+d,18),b.lineTo(c*i+d,15),b.stroke()):"broad sword"===a[c].weapon.type?(b.moveTo(c*i+d+1,18),b.lineTo(c*i+d+1,16),b.stroke(),b.moveTo(c*i+d,18),b.lineTo(c*i+d,16),b.stroke()):"long sword"===a[c].weapon.type?(b.moveTo(c*i+d,18),b.lineTo(c*i+d,14),b.stroke()):"great sword"===a[c].weapon.type&&(b.moveTo(c*i+d,18),b.lineTo(c*i+d,12),b.stroke(),b.moveTo(c*i+d+1,18),b.lineTo(c*i+d+1,14),b.stroke(),b.moveTo(c*i+d-1,18),b.lineTo(c*i+d-1,14),b.stroke()))},getBattlefield:function(){return void 0===d&&(d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]),d},updateBattlefield:function(a,b){var c,e;for(e=-1,c=0;j/i>c;c++)if(null!==d[c]){if("true"!==d[c].mine)break;e=c}if(e>-1)if(j/i-1>e)if(null===d[e+1]){for(c=e;c>-1;c--)d[c+1]=d[c],d[0]=a;if(null!==d[e+2])for(h="";d[e+1].hp>0&&d[e+2].hp>0;){if(h.length>32768&&(h=h.substring(16384,h.length)),c=this.hit(d[e+1],d[e+2])){if(d[e+1].hp-=c,d[e+1].hp<1){h+=" They killed you with "+c+" damage, you died with "+d[e+1].hp+"HP.",d[e+1]=null,window.alert(h);break}h+=" They hit for "+c+" damage, you have "+d[e+1].hp+"HP remaining."}else h+=" They miss.";if(c=this.hit(d[e+2],d[e+1])){if(d[e+2].hp-=c,d[e+2].hp<1){h+=" You killed them with "+c+" damage, they died with "+d[e+2].hp+"HP.",d[e+2]=null,window.alert(h);break}h+=" You hit for "+c+" damage, they have "+d[e+2].hp+"HP remaining."}else h+=" You miss."}else for(c=e+3;j/i>c;c++)d[c-1]=d[c]}else for(h="";d[e+1].hp>0&&d[e].hp>0;){if(c=this.hit(d[e+1],d[e])){if(d[e+1].hp-=c,d[e+1].hp<1){h+=" You killed them with "+c+" damage, they died with "+d[e+1].hp+"HP.",d[e+1]=null,window.alert(h);break}h+=" You hit for "+c+" damage, they have "+d[e+1].hp+"HP remaining."}else h+=" You miss.";if(c=this.hit(d[e],d[e+1])){if(d[e].hp-=c,d[e].hp<1){h+=" They killed you with "+c+" damage, you died with "+d[e].hp+"HP.",d[e]=null,window.alert(h);break}h+=" They hit for "+c+" damage, you have "+d[e].hp+"HP remaining."}else h+=" They miss."}else window.alert("You won! "),d[j/i-1]=null;else if(null!==d[0])window.alert("You lost!"),d[0]=null;else for(c=0;j/i-1>c;c++)d[c]=d[c+1];null===d[j/i-1]?null!==b&&(b.mine="false",d[j/i-1]=b):"false"===d[j/i-1].mine&&(d[j/i-1]=null),null===d[0]?null!==a&&(a.mine="true",d[0]=a):"true"===d[0].mine&&(d[0]=null),this.showGraphic(d,g)},hit:function(a,b){var c,d;if(Math.floor(20*Math.random())<b.thac0[a.ac])return 0;for(d=0,c=0;c<b.weapon.damage.dice;c++)d+=Math.floor(Math.random()*b.weapon.damage.type)+1;return d+=b.weapon.damage.plus},getBalanced:function(){return[{score:"Balanced",str:{dice:2,type:6,plus:6},dex:{dice:2,type:6,plus:6},con:{dice:2,type:6,plus:6}},{type:"Balanced",weapontypeodds:[1,2,2,2,1],armortypeodds:[1,2,2,4,4,4,2,1]}]},generateSoldier:function(a,b){var c,d,e,f,g,h;h={weapon:{},armor:{},scores:[10,10,10],hp:0,maxHp:0,damage:{dice:1,type:2,plus:0},ac:10,thac0:[20,20,20,20,20,20,20,20,20,20],mine:"true"},f=0;for(c in b.weapontypeodds)f+=b.weapontypeodds[c];c=Math.floor(Math.random()*f),f=0,e=0;for(d in b.weapontypeodds){if(f+=b.weapontypeodds[d],f>c)break;e++}h.weapon=this.weapons[e],g=0;for(c in b.armortypeodds)g+=b.armortypeodds[c];c=Math.floor(Math.random()*g),g=0,e=0;for(d in b.armortypeodds){if(g+=b.armortypeodds[d],g>c)break;e++}for(h.armor=this.armor[e],e=0,c=0;c<a.str.dice;c++)e+=Math.floor(Math.random()*a.str.type+1);for(e+=a.str.plus,h.scores[0]=e,e=0,c=0;c<a.dex.dice;c++)e+=Math.floor(Math.random()*a.dex.type+1);for(e+=a.dex.plus,h.scores[1]=e,e=0,c=0;c<a.con.dice;c++)e+=Math.floor(Math.random()*a.con.type+1);for(e+=a.con.plus,h.scores[2]=e,h.ac=h.armor.ac,h.scores[1]>14?h.ac-=h.scores[1]-14:h.scores[1]<7&&(h.ac-=h.scores[1]-7),h.hp=Math.floor(10*Math.random()+1),h.scores[2]>14?h.hp+=h.scores[2]-14:h.scores[2]<7&&(h.hp+=h.scores[2]-7),h.hp<1&&(h.hp=1),h.maxHp=h.hp,h.damage=h.weapon.damage,h.scores[0]>14?h.damage+=" + "+(h.scores[0]-14):h.scores[2]<7&&(h.damage+=" - "+(7-h.scores[0])),c=0;11>c;c++)h.thac0[c]=h.weapon.thac0[c];for(e=0,h.scores[0]>15?e=h.scores[0]-15:h.scores[0]<6&&(e=h.scores[0]-6),h.scores[1]>15?e+=h.scores[1]-15:h.scores[1]<6&&(e+=h.scores[1]-6),c=0;11>c;c++)(20!==h.thac0[c]||20!==h.thac0[c+1])&&(h.thac0[c]-=e,h.thac0[c]>20?h.thac0[c]=20:h.thac0[c]<1&&(h.thac0[c]=1));return h}}});