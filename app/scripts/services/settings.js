'use strict';

/**
 * @ngdoc service
 * @name dndApp.Settings
 * @description
 * # Settings
 * Service in the dndApp.
 */
angular.module('dndApp')
  .service('Settings', function Settings() {
    // AngularJS will instantiate a singleton by calling 'new' on this function
    var generator, equipment, battlefield, imgStick, cBattle, ctxBattle, fight,
      stickWidth = 10, canvasWidth = 480;

    return {

      weapons: [
        {'type': 'knife',
            'thac0': [20, 20, 20, 19, 17, 16, 14, 12, 10, 9], 
            'damage':{'dice': 1, 'type': 3, 'plus': 0}},
        {'type': 'short sword', 
            'thac0': [20, 20, 19, 18, 16, 15, 13, 12, 11, 10], 
            'damage':{'dice': 1, 'type': 4, 'plus': 0}},
        {'type': 'broad sword',
            'thac0': [20, 19, 18, 18, 16, 15, 13, 12, 11, 10], 
            'damage':{'dice': 1, 'type': 6, 'plus': 0}},
        {'type': 'long sword', 
            'thac0': [20, 19, 18, 17, 15, 14, 12, 11, 10, 9], 
            'damage':{'dice': 1, 'type': 8, 'plus': 0}},
        {'type': 'great sword', 
            'thac0': [18, 17, 17, 16, 15, 14, 12, 10, 9, 8], 
            'damage':{'dice': 1, 'type': 10, 'plus': 2}} ],
      armor: [
        {'type':'Leather armor', 'ac':8},
        {'type':'Ring mail', 'ac':7},
        {'type':'Scale mail', 'ac':6},
        {'type':'Chain mail', 'ac':5},
        {'type':'Splint mail', 'ac':4},
        {'type':'Plate mail', 'ac':3},
        {'type':'Field plate mail', 'ac':2},
        {'type':'Full plate', 'ac':1} ],

      getGenerator: function() {
        if (generator === undefined) {
          generator = { 'score':'Balanced', 
            'str': {'dice': 2, 'type': 6, 'plus': 6}, 
            'dex': {'dice': 2, 'type': 6, 'plus': 6}, 
            'con': {'dice': 2, 'type': 6, 'plus': 6}
          };
        }
        return generator;
      },

      setGenerator: function(gen) {
        generator = gen;
        return Settings;
      },

      resetGenerator: function() {
        generator = { 'score':'Balanced', 
          'str': {'dice': 2, 'type': 6, 'plus': 6}, 
          'dex': {'dice': 2, 'type': 6, 'plus': 6}, 
          'con': {'dice': 2, 'type': 6, 'plus': 6}
        };
        return generator;
      },

      getEquipment: function() {
        if (equipment === undefined) {
          equipment = {'type':'Balanced',
            'weapontypeodds': [1, 2, 2, 2, 1],
            'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
          };
        }
        return equipment;
      },

      setEquipment: function(equip) {
        equipment = equip;
        return Settings;
      },

      resetEquipment: function() {
        equipment = {'type':'Balanced',
            'weapontypeodds': [1, 2, 2, 2, 1],
            'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
        };
        return equipment;
      },

      initBattleCanvas: function() {
        cBattle = document.getElementById('battleCanvas');
        if (cBattle !== null) {
          ctxBattle = cBattle.getContext('2d');
          ctxBattle.font = '8 px Arial';
        } else {
          ctxBattle = null;
        }
        return ctxBattle;
      },

      getFight: function() {
        if (fight === undefined) {fight = null;}
        return fight;
      },

      getCtx: function() {
        cBattle = document.getElementById('battleCanvas');
        if ((cBattle !== null) && (cBattle !== undefined)) {
          ctxBattle = cBattle.getContext('2d');
          ctxBattle.font = '8 px Arial';
        } else {
          ctxBattle = null;
        }
        return ctxBattle;
      },

      showGraphic: function(bfld, ctx) {
        if ((ctx !== undefined) && (ctx !== null)) {
          // get things set, if they aren't already. 
          if (imgStick === undefined) {imgStick = document.getElementById('stick');}
          // now get ready to draw them
          this.drawFigures(bfld, ctx);
        }
      },

      drawFigures: function (bfield, drawctx) { 
        var i, k;


        //now draw the row
        for (i=0; i<bfield.length; i++)
        {
          if (bfield[i] === null) {
            drawctx.clearRect(i*stickWidth, 12, stickWidth, 200);
          } else {
            drawctx.drawImage(imgStick, i*stickWidth, 12);
            drawctx.fillText('st',i*stickWidth,40);
            drawctx.fillText(bfield[i].scores[0],i*stickWidth,50);
            drawctx.fillText('dx',i*stickWidth,62);
            drawctx.fillText(bfield[i].scores[1],i*stickWidth,72);
            drawctx.fillText('cn',i*stickWidth,84);
            drawctx.fillText(bfield[i].scores[2],i*stickWidth,94);
            drawctx.fillText('hp',i*stickWidth,106);
            drawctx.fillText(bfield[i].hp,i*stickWidth,116);
            drawctx.fillText('max',i*stickWidth,128);
            drawctx.fillText(bfield[i].maxHp,i*stickWidth,138);
            drawctx.fillText('ac',i*stickWidth,150);
            drawctx.fillText(bfield[i].ac,i*stickWidth,162);
            if (bfield[i].weapon.type === 'knife') {
              if (bfield[i].mine === 'true') {
                k = stickWidth - 1;
              } else {
                k = 0;
              }
              drawctx.moveTo(i*stickWidth + k, 18);
              drawctx.lineTo(i*stickWidth + k, 16);
              drawctx.stroke();
            } else if (bfield[i].weapon.type === 'short sword') {
              drawctx.moveTo(i*stickWidth + k, 18);
              drawctx.lineTo(i*stickWidth + k, 15);
              drawctx.stroke();
            } else if (bfield[i].weapon.type === 'broad sword') {
              drawctx.moveTo(i*stickWidth + k + 1, 18);
              drawctx.lineTo(i*stickWidth + k + 1, 16);
              drawctx.stroke();
              drawctx.moveTo(i*stickWidth + k, 18);
              drawctx.lineTo(i*stickWidth + k, 16);
              drawctx.stroke();
            } else if (bfield[i].weapon.type === 'long sword') {
              drawctx.moveTo(i*stickWidth + k, 18);
              drawctx.lineTo(i*stickWidth + k, 14);
              drawctx.stroke();
            } else if (bfield[i].weapon.type === 'great sword') {
              drawctx.moveTo(i*stickWidth + k, 18);
              drawctx.lineTo(i*stickWidth + k, 12);
              drawctx.stroke();
              drawctx.moveTo(i*stickWidth + k + 1, 18);
              drawctx.lineTo(i*stickWidth + k + 1, 14);
              drawctx.stroke();
              drawctx.moveTo(i*stickWidth + k - 1, 18);
              drawctx.lineTo(i*stickWidth + k - 1, 14);
              drawctx.stroke();
            }
          }
        }
      },

      getBattlefield: function () {
        if (battlefield === undefined) {
          battlefield = [
            null, null, null, null, null, null, null, null, null, null, null, null, 
            null, null, null, null, null, null, null, null, null, null, null, null, 
            null, null, null, null, null, null, null, null, null, null, null, null, 
            null, null, null, null, null, null, null, null, null, null, null, null, 
            null, null, null, null, null, null, null, null, null, null, null, null ];
	}
        return battlefield;
      },

      updateBattlefield: function (us, them) {
        var i, found;

        found = -1;
        for (i = 0; i<canvasWidth/stickWidth; i++) {
          // find our last one
          if (battlefield[i] !== null) {
            if (battlefield[i].mine === 'true') {
              found = i;
            } else {
              break;
            }
          }
        }
        if (found > -1) {
          if (found < canvasWidth/stickWidth - 1) {
            if (battlefield[found + 1] === null) {
              // we are advancing unopposed
              for (i = found; i > -1; i--) {
                battlefield[i + 1] = battlefield[i];
                battlefield[0] = us;
              }
              // now they advance
              if (battlefield[found + 2] !== null) {
                // A Fight! They go first
                fight = '';
                while ((battlefield[found + 1].hp > 0) && (battlefield[found + 2].hp > 0)) {
                  if (fight.length > 32768) {
                    fight = fight.substring(16384, fight.length);
                  }
                  // first they attack us
                  i = this.hit(battlefield[found + 1], battlefield[found + 2]);
                  if (i) {
                    battlefield[found + 1].hp -= i;
                    if (battlefield[found + 1].hp < 1) {
                      fight += ' They killed you with ' + i + ' damage, you died with ' + battlefield[found + 1].hp + 'HP.';  
                      battlefield[found + 1] = null;
                      window.alert(fight);
                      break;
                    } else {
                      fight += ' They hit for ' + i + ' damage, you have ' + battlefield[found + 1].hp + 'HP remaining.';
                    }
                  } else {
                    fight += ' They miss.';
                  }
                  // now we attack them
                  i = this.hit(battlefield[found + 2], battlefield[found + 1]);
                  if (i) {
                    battlefield[found + 2].hp -= i;
                    if (battlefield[found + 2].hp < 1) {
                      fight += ' You killed them with ' + i + ' damage, they died with ' + battlefield[found + 2].hp + 'HP.'; 
                      battlefield[found + 2] = null;
                      window.alert(fight);
                      break;
                    } else {
                      fight += ' You hit for ' + i + ' damage, they have ' + battlefield[found + 2].hp + 'HP remaining.';
                    }
                  } else {
                    fight += ' You miss.';
                  }
                }
              } else {
                for (i=found + 3; i<canvasWidth/stickWidth; i++)
                {
                  battlefield[i - 1] = battlefield[i];
                }
              }
            } else {
              // A Fight! We go first
              fight = '';
              while ((battlefield[found + 1].hp > 0) && (battlefield[found].hp > 0)) {
                // first we attack them
                i = this.hit(battlefield[found + 1], battlefield[found]);
                if (i) {
                  battlefield[found + 1].hp -= i;
                  if (battlefield[found + 1].hp < 1) {
                    fight += ' You killed them with ' + i + ' damage, they died with ' + battlefield[found + 1].hp + 'HP.';
                    battlefield[found + 1] = null;
                    window.alert(fight);
                    break;
                  } else {
                    fight += ' You hit for ' + i + ' damage, they have ' + battlefield[found + 1].hp + 'HP remaining.';
                  }
                } else {
                  fight += ' You miss.';
                }

                // NOW they attack us
                i = this.hit(battlefield[found], battlefield[found + 1]);
                if (i) {
                  battlefield[found].hp -= i;
                  if (battlefield[found].hp < 1) {
                    fight += ' They killed you with ' + i + ' damage, you died with ' + battlefield[found].hp + 'HP.';  
                    battlefield[found] = null;
                    window.alert(fight);
                    break;
                  } else {
                    fight += ' They hit for ' + i + ' damage, you have ' + battlefield[found].hp + 'HP remaining.';
                  }
                } else {
                  fight += ' They miss.';
                }
              }
            }
          } else {
            // A Win!!
            window.alert('You won! ');
            battlefield[canvasWidth/stickWidth - 1] = null;
          }
        } else {
          // enemy advances unopposed
          if (battlefield[0] !== null) {
            // A Loss!
            window.alert('You lost!');
            battlefield[0] = null;
          } else {
            for (i=0; i<canvasWidth/stickWidth - 1; i++) {
              battlefield[i] = battlefield[i + 1];
            }
          }
        }
        if (battlefield[canvasWidth/stickWidth - 1] === null) {
          if (them !== null) {
            them.mine = 'false';
            battlefield[canvasWidth/stickWidth - 1] = them;
          }
        } else {
          if (battlefield[canvasWidth/stickWidth - 1].mine === 'false') {
            battlefield[canvasWidth/stickWidth - 1] = null;
          }
        }
        if ((battlefield[0] === null)) {
          if (us !== null) {
            us.mine = 'true';
            battlefield[0] = us;
          }
        } else {
          if (battlefield[0].mine === 'true') {
            battlefield[0] = null;
          }
        }

        this.showGraphic (battlefield, ctxBattle);
      },

      hit: function(target, attacker) {
        var i, j;
        if (Math.floor(Math.random() * 20) < attacker.thac0[target.ac]) {
          // missed! return 0 for damage
          return 0;
        } else {
          // hit! Figure out the damage!
          j = 0;
          for (i=0; i<attacker.weapon.damage.dice; i++) {
            j += Math.floor(Math.random() * attacker.weapon.damage.type) + 1;
          }
          j += attacker.weapon.damage.plus;
          return j;
        }
      },

      getBalanced: function () {
        return [
          { 'score':'Balanced', 
            'str': {'dice': 2, 'type': 6, 'plus': 6}, 
            'dex': {'dice': 2, 'type': 6, 'plus': 6}, 
            'con': {'dice': 2, 'type': 6, 'plus': 6}
          },
          {'type':'Balanced',
            'weapontypeodds': [1, 2, 2, 2, 1],
            'armortypeodds': [1, 2, 2, 4, 4, 4, 2, 1]
          }
        ];
      },

      generateSoldier: function (gener, equipm) {
        var i, j, k, totWeap, totArmor, soldier;

        soldier = {
          'weapon': {}, 'armor': {}, 'scores': [10,10,10], 'hp': 0, 'maxHp': 0, 'damage': {'dice': 1, 'type': 2, 'plus': 0}, 'ac': 10,
          'thac0': [20, 20, 20, 20, 20, 20, 20, 20, 20, 20], 'mine':'true'
        };

        // assign a weapon
        totWeap = 0;
        for (i in equipm.weapontypeodds) {totWeap += equipm.weapontypeodds[i];}
        i = Math.floor(Math.random() * (totWeap));
        totWeap = 0; k=0;
        for (j in equipm.weapontypeodds) {
          totWeap += equipm.weapontypeodds[j];
          if (i < totWeap) {break;}
          k++;
        }
        soldier.weapon = this.weapons[k];

        // assign armor
        totArmor = 0;
        for (i in equipm.armortypeodds) {totArmor += equipm.armortypeodds[i];}
        i = Math.floor(Math.random() * (totArmor));
        totArmor = 0; k=0;
        for (j in equipm.armortypeodds) {
          totArmor += equipm.armortypeodds[j];
          if (i < totArmor) {break;}
          k++;
        }
        soldier.armor = this.armor[k];

        // assign scores
        // str
        k = 0;
        for (i=0; i<gener.str.dice; i++) {
          k += Math.floor(Math.random() * gener.str.type + 1);
        }
        k += gener.str.plus;
        soldier.scores[0] = k;
        // dex
        k = 0;
        for (i=0; i<gener.dex.dice; i++) {
          k += Math.floor(Math.random() * gener.dex.type + 1);
        }
        k += gener.dex.plus;
        soldier.scores[1] = k;
        // con
        k = 0;
        for (i=0; i<gener.con.dice; i++) {
          k += Math.floor(Math.random() * gener.con.type + 1);
        }
        k += gener.con.plus;
        soldier.scores[2] = k;

        // using weapon, armor and scores we can now set ac, hp,damage
        // first AC
        soldier.ac = soldier.armor.ac;
        if (soldier.scores[1] > 14) {
          soldier.ac -= soldier.scores[1] - 14;
        } else if (soldier.scores[1] < 7) {
          soldier.ac -= soldier.scores[1] - 7;
        }
        // hp
        soldier.hp = Math.floor(Math.random() * 10 + 1);
        if (soldier.scores[2] > 14) {
          soldier.hp += soldier.scores[2] - 14;
        } else if (soldier.scores[2] < 7) {
          soldier.hp += soldier.scores[2] - 7;
        }
        if (soldier.hp < 1) {soldier.hp = 1;}
        soldier.maxHp = soldier.hp;

        // damage
        soldier.damage = soldier.weapon.damage;
        if (soldier.scores[0] > 14) {
          soldier.damage += ' + ' + (soldier.scores[0] - 14);
        } else if (soldier.scores[2] < 7) {
          soldier.damage += ' - ' + (7 - soldier.scores[0]);
        }

        // thac0
        for (i=0; i<11; i++) {
          soldier.thac0[i] = soldier.weapon.thac0[i];
        }
        k = 0;
        if (soldier.scores[0] > 15) {
          k = soldier.scores[0] - 15;
        } else if (soldier.scores[0] < 6) {
          k = soldier.scores[0] - 6;
        }
        if (soldier.scores[1] > 15) {
          k += soldier.scores[1] - 15;
        } else if (soldier.scores[1] < 6) {
          k += soldier.scores[1] - 6;
        }
        for (i=0; i<11; i++) {
          if (soldier.thac0[i] === 20) {
            if (soldier.thac0[i+1] === 20) {
              continue;
            }
          }
          soldier.thac0[i] -= k;
          if (soldier.thac0[i] > 20) {
            soldier.thac0[i] = 20;
          } else if (soldier.thac0[i] < 1) {
            soldier.thac0[i] = 1;
          }
        }
        return soldier;
      }    
    };

  });
