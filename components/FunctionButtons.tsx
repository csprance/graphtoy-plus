import * as React from 'react';

interface Props {}
const FunctionButtons: React.FC<Props> = () => {
  const inject = (value: string) => {
    document.execCommand('insertText', false, value);
  };
  return (
    <div className="guiWindow">
      <div className="uiFuncPanel">
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('()')}>
            ()
          </div>
          <div className="uiFunc" onClick={() => inject('+')}>
            +
          </div>
          <div className="uiFunc" onClick={() => inject('-')}>
            -
          </div>
          <div className="uiFunc" onClick={() => inject('*')}>
            *
          </div>
          <div className="uiFunc" onClick={() => inject('/')}>
            /
          </div>
          <div className="uiFunc" onClick={() => inject('rcp(')} title="1/x">
            rcp(x)
          </div>
          <div className="uiFunc" onClick={() => inject('fma(')} title="x*y+z">
            fma(x,y,z)
          </div>
          <div
            className="uiFunc"
            onClick={() => inject('%')}
            title="Reminder:

5 % 3 = 2
(-5) % 3 = -2"
          >
            %
          </div>
          <div
            className="uiFunc"
            onClick={() => inject('mod(')}
            title="Modulo:

mod(5,3)=2
mod(-5,3)=1
mod(5,-3)=-1
mod(-5,-3)=-2
mod(5,1.2)=0.2"
          >
            mod(x,y)
          </div>
          <div />
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('^')}>
            ^
          </div>
          <div className="uiFunc" onClick={() => inject('**')}>
            **
          </div>
          <div className="uiFunc" onClick={() => inject('pow(')}>
            pow(x,y)
          </div>
          <div className="uiFunc" onClick={() => inject('exp(')}>
            exp(x)
          </div>
          <div className="uiFunc" onClick={() => inject('exp2(')}>
            exp2(x)
          </div>
          <div className="uiFunc" onClick={() => inject('exp10(')}>
            exp10(x)
          </div>
          <div className="uiFunc" onClick={() => inject('log(')}>
            log(x)
          </div>
          <div className="uiFunc" onClick={() => inject('log2(')}>
            log2(x)
          </div>
          <div className="uiFunc" onClick={() => inject('log10(')}>
            log10(x)
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('sqrt(')}>
            sqrt(x)
          </div>
          <div className="uiFunc" onClick={() => inject('cbrt(')}>
            cbrt(x)
          </div>
          <div className="uiFunc" onClick={() => inject('rsqrt(')}>
            rsqrt(x)
          </div>
          <div className="uiFunc" onClick={() => inject('rcbrt(')}>
            rcbrt(x)
          </div>
          <div className="uiFuncB" onClick={() => inject('inversesqrt(')}>
            inversesqrt(x)
          </div>
          <div className="uiFunc" onClick={() => inject('abs(')}>
            abs(x)
          </div>
          <div className="uiFunc" onClick={() => inject('sign(')}>
            sign(x)
          </div>
          <div className="uiFunc" onClick={() => inject('ssign(')}>
            ssign(x)
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('cos(')}>
            cos(x)
          </div>
          <div className="uiFunc" onClick={() => inject('sin(')}>
            sin(x)
          </div>
          <div className="uiFunc" onClick={() => inject('tan(')}>
            tan(x)
          </div>
          <div className="uiFunc" onClick={() => inject('acos(')}>
            acos(x)
          </div>
          <div className="uiFunc" onClick={() => inject('asin(')}>
            asin(x)
          </div>
          <div className="uiFunc" onClick={() => inject('atan(')}>
            atan(x)
          </div>
          <div className="uiFunc" onClick={() => inject('atan2(')}>
            atan2(x,y)
          </div>
          <div className="uiFunc" onClick={() => inject('radians(')}>
            radians(x)
          </div>
          <div className="uiFunc" onClick={() => inject('degrees(')}>
            degrees(x)
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('cosh(')}>
            cosh(x)
          </div>
          <div className="uiFunc" onClick={() => inject('sinh(')}>
            sinh(x)
          </div>
          <div className="uiFunc" onClick={() => inject('tanh(')}>
            tanh(x)
          </div>
          <div className="uiFunc" onClick={() => inject('acosh(')}>
            acosh(x)
          </div>
          <div className="uiFunc" onClick={() => inject('asinh(')}>
            asinh(x)
          </div>
          <div className="uiFunc" onClick={() => inject('atanh(')}>
            atanh(x)
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('ceil(')}>
            ceil(x)
          </div>
          <div className="uiFunc" onClick={() => inject('floor(')}>
            floor(x)
          </div>
          <div className="uiFunc" onClick={() => inject('trunc(')}>
            trunc(x)
          </div>
          <div className="uiFunc" onClick={() => inject('round(')}>
            round(x)
          </div>
          <div className="uiFunc" onClick={() => inject('frac(')}>
            frac(x)
          </div>
          <div className="uiFunc" onClick={() => inject('fract(')}>
            fract(x)
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('min(')}>
            min(x,y)
          </div>
          <div className="uiFunc" onClick={() => inject('max(')}>
            max(x,y)
          </div>
          <div className="uiFunc" onClick={() => inject('saturate(')}>
            saturate(x)
          </div>
          <div className="uiFuncB" onClick={() => inject('clamp(')}>
            clamp(x,c,d)
          </div>
          <div className="uiFunc" onClick={() => inject('step(')}>
            step(a,x)
          </div>
          <div className="uiFuncB" onClick={() => inject('smoothstep(')}>
            smoothstep(a,b,x)
          </div>
          <div className="uiFunc uiFuncG1" onClick={() => inject('over(')}>
            over(x,y)
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFuncB uiFuncG2" onClick={() => inject('remap(')}>
            remap(a,b,x,c,d)
          </div>
          <div className="uiFunc" onClick={() => inject('mix(')}>
            mix(a,b,x)
          </div>
          <div className="uiFunc" onClick={() => inject('lerp(')}>
            lerp(a,b,x)
          </div>
          <div className="uiFunc" onClick={() => inject('tri(')}>
            tri(a,x)
          </div>
          <div className="uiFunc" onClick={() => inject('sqr(')}>
            sqr(a,x)
          </div>
          <div className="uiFunc" onClick={() => inject('noise(')}>
            noise(x)
          </div>
          <div className="uiFunc" onClick={() => inject('cellnoise(')}>
            cellnoise(x)
          </div>
          <div className="uiFunc" onClick={() => inject('voronoi(')}>
            voronoi(x)
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('PI')}>
            PI
          </div>
          <div className="uiFunc" onClick={() => inject('E')}>
            E
          </div>
          <div className="uiFunc" onClick={() => inject('PHI')}>
            PHI
          </div>
          <div className="uiFunc" onClick={() => inject('LN10')}>
            LN10
          </div>
          <div className="uiFunc" onClick={() => inject('LN2')}>
            LN2
          </div>
          <div className="uiFunc" onClick={() => inject('LOG10E')}>
            LOG10E
          </div>
          <div className="uiFunc" onClick={() => inject('LOG2E')}>
            LOG2E
          </div>
          <div className="uiFunc" onClick={() => inject('SQRT2')}>
            SQRT2
          </div>
          <div className="uiFunc" onClick={() => inject('SQRT1_2')}>
            SQRT1_2
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('𝜋')}>
            𝜋
          </div>
          <div className="uiFunc" onClick={() => inject('𝜏')}>
            𝜏
          </div>
          <div className="uiFunc" onClick={() => inject('φ')}>
            φ
          </div>
          <div className="uiFunc" onClick={() => inject('²')}>
            ²
          </div>
          <div className="uiFunc" onClick={() => inject('³')}>
            ³
          </div>
          <div className="uiFunc" onClick={() => inject('⁴')}>
            ⁴
          </div>
          <div className="uiFunc" onClick={() => inject('⁵')}>
            ⁵
          </div>
          <div className="uiFunc" onClick={() => inject('⁶')}>
            ⁶
          </div>
          <div className="uiFunc" onClick={() => inject('⁷')}>
            ⁷
          </div>
          <div className="uiFunc" onClick={() => inject('⁸')}>
            ⁸
          </div>
          <div className="uiFunc" onClick={() => inject('⁹')}>
            ⁹
          </div>
        </div>
        <div className="uiFuncGrid">
          <div className="uiFunc" onClick={() => inject('½')}>
            ½
          </div>
          <div className="uiFunc" onClick={() => inject('⅓')}>
            ⅓
          </div>
          <div className="uiFunc" onClick={() => inject('⅔')}>
            ⅔
          </div>
          <div className="uiFunc" onClick={() => inject('¼')}>
            ¼
          </div>
          <div className="uiFunc" onClick={() => inject('¾')}>
            ¾
          </div>
          <div className="uiFunc" onClick={() => inject('⅕')}>
            ⅕
          </div>
          <div className="uiFunc" onClick={() => inject('⅖')}>
            ⅖
          </div>
          <div className="uiFunc" onClick={() => inject('⅗')}>
            ⅗
          </div>
          <div className="uiFunc" onClick={() => inject('⅘')}>
            ⅘
          </div>
          <div className="uiFunc" onClick={() => inject('⅙')}>
            ⅙
          </div>
          <div className="uiFunc" onClick={() => inject('⅚')}>
            ⅚
          </div>
          <div className="uiFunc" onClick={() => inject('⅐')}>
            ⅐
          </div>
          <div className="uiFunc" onClick={() => inject('⅛')}>
            ⅛
          </div>
          <div className="uiFunc" onClick={() => inject('⅜')}>
            ⅜
          </div>
          <div className="uiFunc" onClick={() => inject('⅝')}>
            ⅝
          </div>
          <div className="uiFunc" onClick={() => inject('⅞')}>
            ⅞
          </div>
          <div className="uiFunc" onClick={() => inject('⅑')}>
            ⅑
          </div>
          <div className="uiFunc" onClick={() => inject('⅒')}>
            ⅒
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunctionButtons;
