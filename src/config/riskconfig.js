module.exports = {
  'multi' : 1,
  'low': 3,
  'med': 6,
  'high': 9,
  'zero': 12,
  'rollNameEquals' : ['', '', 'dubs', 'trips', 'quads', 'quints O_O'],
  'rollValues' : [0, 0, 12, 15, 15, 15],
  'rollNamePalis' : ['', '', '', '3/d pollas', '4/d pollas', '5/d pollas O_O'],
  'rollNameStraight' : ['', '', '', 'straight de 3', 'straight de 4', 'straight de 5 O_O'],
  isEquals : (roll, num) => {

    let ok = true;
    const end = roll.substr(roll.length - num);

    if (end.length < num) { return false; }

    for (let i = 0; i < end.length - 1; i++) {
      if (end[i] != end[i + 1]) {
        ok = false;}
    }
    return ok;
  },
  isPalis : (roll, num) => {

    let ok = true;
    const end = roll.substr(roll.length - num);
    let i = 0, j = end.length - 1;

    if (end.length < num) { return false; }

    while (j >= 0 && i < end.length - 1 && ok) {
      if (end[i] != end[j]) {
        ok = false;}
      i++;
      j--;
    }
    return ok;
  },
  isStraight : (roll, num) => {
    let ok1 = true, ok2 = true;
    const end = roll.substr(roll.length - num);
    let i = 0;

    if (end.length < num) { return false; }

    while (i < end.length - 1 && ok1) {
      if (parseInt(end[i]) + 1 != parseInt(end[i + 1])) {
        ok1 = false;
      }
      i++;
    }
    while (i < end.length - 1 && ok2) {
      if (parseInt(end[i]) - 1 != parseInt(end[i + 1])) {
        ok2 = false;
      }
      i++;
    }
    return ok1 || ok2;
  },
};