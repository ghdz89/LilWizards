(function() {
  if (window.LW === undefined) {
    window.LW = {};
  }

  LW.Levels = {};

  var R = 'right';
  var L = 'rightEnd';
  var D = 'down';
  var U = 'downEnd';
  var S = 'spike';
  var H = 'horizontal';
  var h = 'horizontalPath';
  var V = 'vertical';
  var v = 'verticalPath';

  LW.Levels.Library = [
              [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
              [D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,D,0,0,0,0,0,D,0,0,0,0,0,0,0,0,0,D],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
              [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,U,0,0,0,0,0,U,0,0,0,0,0,0,0,0,D,0],
              [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,U,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,R,0,0,L,0],
              [0,0,0,0,R,0,0,0,L,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,R,0,L,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,R,0,0,0,0,0,L,0,0,0,R,0,0,0,0,L,0],
              [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,R,0,L,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,U,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,R,0,0,0,0,0,L,0,0,0,0,0,0,0,0,0,R,0,0,L,0,0,0,2,0],
              [0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,D,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,R,0,L,0,0,0,0,0,0,0,0,0,0,0,0],
              [U,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,R,0,0,0,L,0,0,0,0,0,0,0,0,0,U,U],
              [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
              ];

  LW.Levels.Cemetery = [
              [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
              [D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,D],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,D,0,0,D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,U,0,0,U,0,0,0,0,0,0,0,0,0,0,0,0,D,0,0],
              [0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,R,0,0,0,0,L,0,0],
              [0,0,0,R,0,0,L,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,U,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,D,D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,R,0,0,0,0,0,0,L,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,2,1,0,0,0,0,R,0,0,0,0,0,0,L,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,R,0,0,L,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,R,0,L,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,R,0,0,0,0,L,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,U,U,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [U,0,0,0,0,0,R,0,0,0,0,L,0,0,0,0,0,0,R,0,0,0,0,0,0,L,0,0,0,0,0,U],
              [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
              ];

  LW.Levels.Boarwarts = [
              [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
              [D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,D],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,2,R,0,0,L,0,0,D,D,0,0,R,0,0,L,2,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,R,0,0,0,L,0,0,0,0,0,0,R,0,0,0,L,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,D,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,D,0,0,0,0,R,0,0,0,0,0,0,L,0,0,0,0,D,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,U,U,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,U,U,R,0,L,0,0,0,0,0,0,0,0,R,0,L,U,U,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,R,L,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
              [0,2,0,0,0,0,0,0,R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L,0,0,0,0,0,0,2,0],
              [U,0,0,0,0,0,R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L,0,0,0,0,0,U],
              [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
              ];

  LW.Levels.Spikes = [
              [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
              [D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,D],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,2,R,0,0,L,0,0,V,V,0,0,R,0,0,L,2,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,R,0,0,0,L,0,0,0,0,0,0,R,0,0,0,L,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,D,0,0,0,0,0,0,V,V,0,0,0,0,0,0,D,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,D,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,U,U,R,0,L,0,0,0,0,0,0,0,0,R,0,L,U,U,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,v,v,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              [0,1,H,0,H,0,0,0,0,0,0,0,0,0,h,R,L,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
              [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
              [U,0,0,0,0,0,R,0,0,0,0,0,0,0,L,S,S,R,0,0,0,0,0,0,0,L,0,0,0,0,0,U],
              [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
              ];

  /*[
  [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L],
  [D,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,D],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [U,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,U],
  [R,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,L]
  ];*/

})();
