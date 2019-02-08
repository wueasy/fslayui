/*
 * fsLayui - A Front-end Rapid Development Framework.
 * Copyright (C) 2017-2019 wueasy.com

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
layui.use(['element'],function(){

  $('.input-field').on('change',function(){
      var $this = $(this),
          value = $.trim($this.val()),
          $parent = $this.parent();

      if(value !== '' && !$parent.hasClass('field-focus')){
          $parent.addClass('field-focus');
      }else{
          $parent.removeClass('field-focus');
      }
  });


  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var squids = new Array(32);
  var bubbles = new Array(54);
  var t = 0;
  //create squids
  for (var i = 0; i < squids.length; i++) {
      var s = 20, e = 160;
      squids[i] = {
          re: s + (Math.random() * e),
          g: s + (Math.random() * e),
          b: s + (Math.random() * e),
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          vx: (0.5 - Math.random()) / 4,
          vy: 0.1 - Math.random(),
          r: 10 + (Math.random() * 40),
          a: []
      };
  }
  //create bubbles
  for (var i = 0; i < bubbles.length; i++) {
      bubbles[i] = {
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          vx: 0.5 - Math.random(),
          vy: -0.2 - Math.random(),
          o: 0.05 + Math.random() * 0.1,
          r: 3 + Math.random() * 20
      };
  }
  var limit = function (d) {
      if (d.x < -d.r) d.x = innerWidth + d.r;
      if (d.x > innerWidth + d.r) d.x = -d.r;
      if (d.y < -d.r) d.y = innerHeight + d.r;
      if (d.y > innerHeight + d.r) d.y = -d.r;
  };
  var animate = function () {
      t++;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      bubbles.forEach(function (b) {
          b.x += b.vx;
          b.y += b.vy;
          limit(b);
          ctx.fillStyle = 'rgba(255,255,255,' + b.o + ')';
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, Math.PI * 2, 0);
          ctx.fill();
      });
      squids.forEach(function (d) {
          var w = Math.sin((t + (d.r * 100)) / 10);
          d.x += d.vx * 4;
          d.y -= w + 1;
          d.y += d.vy;
          limit(d);
          var color1 = 'rgba(' + d.re + ',' + d.g + ',' + d.b + ',0.4)';
          var color2 = 'rgba(' + d.re + ',' + d.g + ',' + d.b + ',0.2)';
          ctx.fillStyle = color1;
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, Math.PI + (-0.5 + d.vx) - (w / 4), (0.5 + d.vx) + (w / 4));
          ctx.fill();
          d.a.push({ x: d.x, y: d.y - (d.r * 0.2) });
          if (d.a.length > d.r * 3) d.a.splice(0, 1);
          d.a.forEach(function (p, i) {
              ctx.fillStyle = color2;
              ctx.fillRect(p.x, p.y, 2, 2);
              if (i > d.a.length / 2) {
                  ctx.fillRect(p.x - (d.r / 4), p.y, 2, 2);
                  ctx.fillRect(p.x + (d.r / 4), p.y, 2, 2);
              }
              if (i > d.a.length / 3) {
                  ctx.fillRect(p.x + (d.r / 10), p.y - 10, 2, 2);
                  ctx.fillRect(p.x - (d.r / 10), p.y - 10, 2, 2);
              }
          });
      });
      requestAnimationFrame(animate);
  };
  animate();
});
