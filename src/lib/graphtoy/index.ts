//=== grapher ===================================================
// TODO: Allow Grapher to have a canvas set and then take in an arbitary amount of formulas with colors
import { StoreApi, UseBoundStore } from 'zustand';
import { MyStore } from '../../store';


// A formula is the data structure that describes a math formula and metadata
export interface Formula {
  // The value is the expression to evaluate
  value: string;
  // Should this formula show up in the graph
  enabled: boolean;
  // What is the id of this formula
  index: number;
  // the compiled function
  compiledFunc: () => void;
}

export default class Grapher {
  // --- private ----------------------------------------------
  mCanvas: any = null;
  mContext: any = null;
  kTheme = [
    {
      mBackground: '#202020',
      mBackgroundOut: '#000000',
      mText: '#B0B0B0',
      mGrid: '#606060',
      mGridThin: '#404040',
      mGraphs: [
        '#ffc040',
        '#ffffa0',
        '#a0ffc0',
        '#40c0ff',
        '#d0a0ff',
        '#ff80b0',
      ],
    },
    {
      mBackground: '#FFFFFF',
      mBackgroundOut: '#808080',
      mText: '#000000',
      mGrid: '#A0A0A0',
      mGridThin: '#D0D0D0',
      mGraphs: [
        '#ff8000',
        '#ffe800',
        '#40ff00',
        '#1040ff',
        '#ff10ff',
        '#ff0000',
      ],
    },
  ];
  mMouseFunction: number = 0;
  mCx: number = 0.0;
  mCy: number = 0.0;
  mRa: number = 12.0;
  mRefCx: number = -1.0;
  mRefCy: number = -1.0;
  mRefRa: number = -1.0;
  mRefMouseX: number = -1.0;
  mRefMouseY: number = -1.0;
  mRangeType: number = 2;
  mShowAxes: number = 1;
  mPaused: boolean = true;
  mTimeMS: number = 0;
  mOffsetMS: number = 0;
  mStartMS: number = 0;
  mTimeS: number = 0.0;
  mTheme: number = 0;
  formulas: Formula[] = [];
  mFocusFormula: Element | null = null;
  mFunctionFun = [null, null, null, null, null, null];
  mFunctionVis = [true, true, true, true, true, true];
  mXres: number = 0;
  mYres: number = 0;
  private store: UseBoundStore<StoreApi<MyStore>>;

  constructor(store: UseBoundStore<StoreApi<MyStore>>) {
    this.store = store;
  }

  public start() {
    this.mCanvas.onmousedown = (ev: any) => {
      this.iMouseDown(ev);
    };
    this.mCanvas.onmousemove = (ev: any) => {
      this.iMouseMove(ev);
    };
    this.mCanvas.onmouseup = (ev: any) => {
      this.iMouseUp(ev);
    };
    this.mCanvas.onmouseout = (ev: any) => {
      this.iMouseUp(ev);
    };
    this.mCanvas.onwheel = (ev: any) => {
      this.iMouseWheel(ev);
    };

    this.mCanvas.addEventListener(
      'touchstart',
      (e: any) => {
        e.preventDefault();
        if (this.mRangeType !== 2) return;

        if (e.touches.length === 1) {
          this.mMouseFunction = 1;
          this.mRefCx = this.mCx;
          this.mRefCy = this.mCy;
          this.mRefRa = this.mRa;
          this.mRefMouseX = e.changedTouches[0].clientX;
          this.mRefMouseY = e.changedTouches[0].clientY;
        } else if (e.touches.length === 2) {
          let d = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          this.mMouseFunction = 2;
          this.mRefCx = this.mCx;
          this.mRefCy = this.mCy;
          this.mRefRa = this.mRa;
          this.mRefMouseX = d;
          this.mRefMouseY = 0;
        }
      },
      false
    );

    this.mCanvas.addEventListener(
      'touchend',
      (e: any) => {
        e.preventDefault();
        this.mMouseFunction = 0;
      },
      false
    );

    this.mCanvas.addEventListener(
      'touchmove',
      (e: any) => {
        e.preventDefault();
        if (this.mRangeType !== 2) return;
        let touches = e.changedTouches;

        if (this.mMouseFunction === 1) {
          let x = touches[0].clientX;
          let y = touches[0].clientY;
          let dpr = window.devicePixelRatio || 1;
          this.mCx =
            this.mRefCx -
            ((x - this.mRefMouseX) * dpr * 2.0 * this.mRa) / this.mXres;
          this.mCy =
            this.mRefCy +
            ((y - this.mRefMouseY) * dpr * 2.0 * this.mRa) / this.mXres;
          if (this.mPaused) this.iDraw();
        } else if (this.mMouseFunction === 2) {
          let d = Math.hypot(
            touches[0].clientX - touches[1].clientX,
            touches[0].clientY - touches[1].clientY
          );
          let scale = Math.pow(0.99, d - this.mRefMouseX);
          this.mRa = this.mRefRa * scale;

          if (this.mPaused) this.iDraw();
        }
      },
      false
    );

    window.onresize = (ev) => {
      this.iResize(ev);
    };

    this.store.getState().formulas.forEach((val, idx) => {
      this.iCompile(idx);
    });
    this.iAdjustCanvas();
    this.togglePlay();
    this.iDraw();
  }

  private iMouseUp(e: any) {
    this.mMouseFunction = 0;
  }

  private iMouseDown(e: any) {
    if (!e) e = window.event;
    if (this.mRangeType !== 2) return;
    if (e.button === 0 && e.shiftKey === false) this.mMouseFunction = 1;
    else this.mMouseFunction = 2;
    this.mRefCx = this.mCx;
    this.mRefCy = this.mCy;
    this.mRefRa = this.mRa;
    this.mRefMouseX = e.offsetX;
    this.mRefMouseY = e.offsetY;
  }

  private iMouseMove(e: any) {
    if (!e) e = window.event;
    const cxres = this.mCanvas.offsetWidth;
    const cyres = this.mCanvas.offsetHeight;

    if (this.mMouseFunction === 0) {
      const rx = this.mRa;
      const ry = (this.mRa * cyres) / cxres;
      const x = this.mCx + 2.0 * rx * (e.offsetX / cxres - 0.5);
      const y = this.mCy - 2.0 * ry * (e.offsetY / cyres - 0.5);
      const n = 1 + Math.floor(Math.log(cxres / (rx * 2.0)) / Math.log(10.0));
      document.getElementById('myCoords')!.innerHTML =
        '(' + x.toFixed(n) + ', ' + y.toFixed(n) + ')';
    }

    if (this.mRangeType !== 2) return;

    if (this.mMouseFunction === 1) {
      this.mCx =
        this.mRefCx - ((e.offsetX - this.mRefMouseX) * 2.0 * this.mRa) / cxres;
      this.mCy =
        this.mRefCy + ((e.offsetY - this.mRefMouseY) * 2.0 * this.mRa) / cxres;
      if (this.mPaused) this.iDraw();
    } else if (this.mMouseFunction === 2) {
      const scale = Math.pow(0.99, e.offsetX - this.mRefMouseX);
      this.mRa = this.mRefRa * scale;

      if (scale < 1.0) {
        const cxres = this.mCanvas.offsetWidth;
        const cyres = this.mCanvas.offsetHeight;
        const rx = this.mRefRa;
        const ry = (this.mRefRa * cyres) / cxres;
        const x = this.mRefCx + 2.0 * rx * (this.mRefMouseX / cxres - 0.5);
        const y = this.mRefCy - 2.0 * ry * (this.mRefMouseY / cyres - 0.5);
        this.mCx = x + (this.mRefCx - x) * scale;
        this.mCy = y + (this.mRefCy - y) * scale;
      }

      if (this.mPaused) this.iDraw();
    }
  }

  private iMouseWheel(e: any) {
    if (!e) e = window.event;
    const sfactor = 1.1;
    const scale = e.deltaY < 0 || e.wheelDelta > 0 ? 1.0 / sfactor : sfactor;
    e.preventDefault();
    this.mRa = this.mRa * scale;

    if (this.mPaused) this.iDraw();
  }

  private iResetCoords() {
    this.mCx = 0.0;
    this.mCy = 0.0;
    this.mRa = 12.0;
  }

  private iAdjustCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const w = this.mCanvas.offsetWidth * devicePixelRatio;
    const h = this.mCanvas.offsetHeight * devicePixelRatio;
    this.mCanvas.width = w;
    this.mCanvas.height = h;
    this.mXres = w;
    this.mYres = h;
  }

  private iApplyFormulaVisibilityColor(index: number) {
    const id = index - 1;
    const ele: any = document.getElementById('f' + index);
    const vis = this.mFunctionVis[id];
    if (vis) ele.classList.add('formVisDar' + index);
    else ele.classList.remove('formVisDar' + index);
  }

  private iCompile(id: number) {
    const index = id;
    const strFormula: any = this.store.getState().formulas[index].value;
    // console.log(`Compiling ${index}`);
    // console.log(strFormula);

    this.mFunctionFun[id] = null;
    // uiFormula.style.borderColor = 'transparent';

    if (strFormula == null) return;
    if (strFormula === '') return;

    // uiFormula.style.borderColor = '#ff0000';
    if (!this.iNotOnBlackList(strFormula)) return;
    const formulas = this.store.getState().formulas;
    let str = 'with(Math){';
    if (id >= 1) str += 'function f1(x,t){return (' + formulas[0].value + ');}';
    if (id >= 2) str += 'function f2(x,t){return (' + formulas[1].value + ');}';
    if (id >= 3) str += 'function f3(x,t){return (' + formulas[2].value + ');}';
    if (id >= 4) str += 'function f4(x,t){return (' + formulas[3].value + ');}';
    if (id >= 5) str += 'function f5(x,t){return (' + formulas[4].value + ');}';

    str = str + 'return(' + strFormula + ');}';

    const kPHI = '(1.61803398874989484820)';

    function iSubst(str: string, a: string, b: string) {
      return str.split(a).join(b);
    }

    //str = str.replaceAll( "^", "**" );
    //str = str.split("^").join("**");
    str = iSubst(str, '^', '**');
    str = iSubst(str, '²', '**2'); // &#xB2;
    str = iSubst(str, '³', '**3'); // &#xB3;
    str = iSubst(str, '\u2074', '**4');
    str = iSubst(str, '\u2075', '**5');
    str = iSubst(str, '\u2076', '**6');
    str = iSubst(str, '\u2077', '**7');
    str = iSubst(str, '\u2078', '**8');
    str = iSubst(str, '\u2079', '**9');
    str = iSubst(str, '𝜋', 'PI'); // &#x1D70B;
    str = iSubst(str, 'π', 'PI'); // &#x3C0;
    str = iSubst(str, '𝛑', 'PI');
    str = iSubst(str, '𝝅', 'PI');
    str = iSubst(str, '𝞹', 'PI');
    str = iSubst(str, 'PHI', kPHI);
    str = iSubst(str, '\u03C6', kPHI);
    str = iSubst(str, 'TAU', '(2*PI)');
    str = iSubst(str, '𝜏', '(2*PI)'); // &#120591;
    str = iSubst(str, '½', '(1/2)'); // &#xBD;
    str = iSubst(str, '⅓', '(1/3)'); // &#x2153;
    str = iSubst(str, '⅔', '(2/3)'); // &#x2154;
    str = iSubst(str, '¼', '(1/4)'); // &#xBC;
    str = iSubst(str, '¾', '(3/4)'); // &#xBE;
    str = iSubst(str, '⅕', '(1/5)'); // &#x2155;
    str = iSubst(str, '⅖', '(2/5)'); // &#x2156;
    str = iSubst(str, '⅗', '(3/5)'); // &#x2157;
    str = iSubst(str, '⅘', '(4/5)'); // &#x2158;
    str = iSubst(str, '⅙', '(1/6)'); // &#x2159;
    str = iSubst(str, '⅚', '(5/6)'); // &#x215A;
    str = iSubst(str, '⅐', '(1/7)'); // &#x2150;
    str = iSubst(str, '⅛', '(1/8)'); // &#x215B;
    str = iSubst(str, '⅜', '(3/8)'); // &#x215C;
    str = iSubst(str, '⅝', '(5/8)'); // &#x215D;
    str = iSubst(str, '⅞', '(7/8)'); // &#x215E;
    str = iSubst(str, '⅑', '(1/9)'); // &#x2151;
    str = iSubst(str, '⅒', '(1/10)'); // &#x2152;
    str = iSubst(
      str,
      'A',
      `${this.store.getState().variables.find((v) => v.name === 'A')!.value}`
    ); // &#x2152;
    str = iSubst(
      str,
      'B',
      `${this.store.getState().variables.find((v) => v.name === 'B')!.value}`
    ); // &#x2152;
    str = iSubst(
      str,
      'C',
      `${this.store.getState().variables.find((v) => v.name === 'C')!.value}`
    ); // &#x2152;
    str = iSubst(
      str,
      'D',
      `${this.store.getState().variables.find((v) => v.name === 'D')!.value}`
    ); // &#x2152;
    str = iSubst(
      str,
      'E',
      `${this.store.getState().variables.find((v) => v.name === 'E')!.value}`
    ); // &#x2152;
    str = iSubst(
      str,
      'F',
      `${this.store.getState().variables.find((v) => v.name === 'F')!.value}`
    ); // &#x2152;
    str = iSubst(
      str,
      'G',
      `${this.store.getState().variables.find((v) => v.name === 'G')!.value}`
    ); // &#x2152;
    str = iSubst(
      str,
      'H',
      `${this.store.getState().variables.find((v) => v.name === 'H')!.value}`
    ); // &#x2152;

    let fnFormula: any = null;

    try {
      // eslint-disable-next-line no-new-func
      fnFormula = Function('x,t,A,B,C,D,E,F,G,H', str);
    } catch (err) {
      return;
    }
    try {
      let y = fnFormula(0.1, 0.2);
    } catch (err) {
      // We could probably better handle this test run here to bubble up to the user
      // And help them find out what's wrong with the function
      console.log(err);
      return;
    }

    // uiFormula.style.borderColor = 'transparent';
    this.mFunctionFun[id] = fnFormula;
  }

  private iApplyGrid() {
    const ele: any = document.getElementById('myAxes');
    if (this.mShowAxes === 0) ele.textContent = 'Grid Off';
    else if (this.mShowAxes === 1) ele.textContent = 'Grid Dec';
    else if (this.mShowAxes === 2) ele.textContent = 'Grid Bin';
  }

  private iSetVisibility(index: number, vis: any) {
    const id = index - 1;
    this.mFunctionVis[id] = vis;
    this.iApplyFormulaVisibilityColor(index);
    if (this.mPaused) this.iDraw();
  }

  private iNotOnBlackList(formula: any) {
    if (formula.length > 256) {
      alert('Formula is too long...');
      return false;
    }

    // ripped from Ed Mackey
    const kBlackList = [
      '?',
      '=',
      '[',
      ']',
      "'",
      ';',
      'new',
      'ml',
      '$',
      ').',
      'alert',
      'ook',
      'ipt',
      'doc',
      'win',
      'set',
      'get',
      'tim',
      'net',
      'post',
      'black',
      'z',
      'if',
    ];
    const lowFormula = formula.toLowerCase();
    for (let n = 0; n < kBlackList.length; n++) {
      if (lowFormula.indexOf(kBlackList[n]) !== -1) {
        console.log('Forbidden word');
        return false;
      }
    }
    return true;
  }

  private iDrawGraph(id: number, mycolor: any) {
    this.mContext.strokeStyle = mycolor;
    this.mContext.lineWidth = this.mTheme === 0 ? 2.0 : 3.0;
    this.mContext.fillStyle = mycolor;

    let oldBadNum = true;
    let success = true;

    const formula = this.mFunctionFun[id];
    const rx = this.mRa;
    const ry = (this.mRa * this.mYres) / this.mXres;
    const t = this.mTimeS;
    this.mContext.beginPath();
    let oldy = 0.0;
    let A: number,
      B: number,
      C: number,
      D: number,
      E: number,
      F: number,
      G: number,
      H: number = 0.0;

    for (let i = 0; i < this.mXres; i++) {
      const x = this.mCx + rx * (-1.0 + (2.0 * i) / this.mXres);
      let y = 0.0;
      try {
        // @ts-ignore
        y = formula(x, t, A, B, C, D, E, F, G, H);
      } catch (err) {
        success = false;
        break;
      }

      let badNum =
        isNaN(y) ||
        y === Number.NEGATIVE_INFINITY ||
        y === Number.POSITIVE_INFINITY ||
        Math.abs(y) > 1e9;
      if (!badNum) {
        let j = this.mYres * (0.5 + (0.5 * (this.mCy - y)) / ry);
        if (oldBadNum) this.mContext.moveTo(i, j);
        else this.mContext.lineTo(i, j);
      }
      oldBadNum = badNum;
      oldy = y;
    }
    this.mContext.stroke();

    return success;
  }

  private iResize(e: any) {
    this.iAdjustCanvas();
    if (this.mPaused) this.iDraw();
  }

  private iDraw() {
    if (this.mRangeType === 0) {
      this.mCx = 0.5;
      this.mCy = 0.5;
      this.mRa = (0.5 * this.mXres) / this.mYres;
    } else if (this.mRangeType === 1) {
      this.mCx = 0.0;
      this.mCy = 0.0;
      this.mRa = (1.0 * this.mXres) / this.mYres;
    } else {
    }

    const rx = this.mRa;
    const ry = (this.mRa * this.mYres) / this.mXres;
    const minx = this.mCx - rx;
    const maxx = this.mCx + rx;
    const miny = this.mCy - ry;
    const maxy = this.mCy + ry;

    const theme = this.kTheme[this.mTheme];

    // axes
    const ctx: any = this.mContext;
    ctx.setTransform(1, 0.0, 0.0, 1, 0.5, 0.5);
    ctx.fillStyle = theme.mBackground;
    ctx.fillRect(0, 0, this.mXres, this.mYres);

    // Set the fill style and draw a rectangle
    const gradient = this.mContext.createLinearGradient(20, 0, 220, 0);

    const gradVals = Array(256)
      .fill(null)
      .map((_, idx) => {
        let f = this.mFunctionFun[0];
        if (f) {
          // @ts-ignore
          return f(idx / 256, this.mTimeS, 0, 0, 0, 0, 0, 0, 0, 0);
        }
        return 0;
      })
      .map((val) => (isNaN(val) || val === Infinity || val === -Infinity ? 0 : val));

    gradVals.forEach((val, idx) => {
      gradient.addColorStop(
        idx / 256,
        `rgb(${val * 255}, ${val * 255}, ${val * 255})`
      );
    });
    this.mContext.fillStyle = gradient;
    this.mContext.fillRect(20, 20, 200, 200);

    if (this.mRangeType === 0 || this.mRangeType === 1) {
      ctx.fillStyle = theme.mBackgroundOut;
      let ww = (this.mXres - this.mYres) / 2;
      ctx.fillRect(0, 0, ww, this.mYres);
      ctx.fillRect(this.mXres - 1 - ww, 0, ww, this.mYres);
    }

    if (this.mShowAxes !== 0) {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const fontSize = 10 * devicePixelRatio;
      ctx.lineWidth = 1.0;
      ctx.font = fontSize.toFixed(0) + 'px arial';

      const sep = this.mShowAxes === 1 ? 5.0 : 4.0;
      let n =
        -1 + Math.floor(Math.log(this.mXres / (rx * 2.0)) / Math.log(sep));
      if (n < 0) n = 0;
      else if (n > 100) n = 100;

      const drawGrid = (off: any, color: any) => {
        ctx.strokeStyle = color;

        let ste = Math.pow(sep, off + Math.floor(Math.log(rx) / Math.log(sep)));

        const iax = Math.floor(minx / ste);
        const ibx = Math.floor(maxx / ste);
        const iay = Math.floor(miny / ste);
        const iby = Math.floor(maxy / ste);

        ctx.beginPath();
        for (let i = iax; i <= ibx; i++) {
          let x = i * ste;
          let ix = this.mXres * (0.5 + (x - this.mCx) / (2.0 * rx));
          ctx.moveTo(ix, this.mYres);
          ctx.lineTo(ix, 0);
        }
        for (let i = iay; i <= iby; i++) {
          let y = i * ste;
          let iy = this.mYres * (0.5 - (y - this.mCy) / (2.0 * ry));
          ctx.moveTo(this.mXres, iy);
          ctx.lineTo(0, iy);
        }
        ctx.stroke();

        if (off === 0) {
          ctx.fillStyle = theme.mText;
          for (let i = iax; i <= ibx; i++) {
            let x = i * ste;
            let ix = this.mXres * (0.5 + (x - this.mCx) / (2.0 * rx));
            ctx.fillText(x.toFixed(n), ix + 4, this.mYres - 2);
          }
          for (let i = iay; i <= iby; i++) {
            let y = i * ste;
            let iy = this.mYres * (0.5 - (y - this.mCy) / (2.0 * ry));
            ctx.fillText(y.toFixed(n), 2, iy + 10);
          }
        }
      };

      drawGrid(-1, theme.mGridThin); // thin grid
      drawGrid(0, theme.mGrid); // coarse grid

      // axis
      {
        const xPos = this.mXres * (0.5 - this.mCx / (2.0 * rx));
        const yPos = this.mYres * (0.5 + this.mCy / (2.0 * ry));
        ctx.strokeStyle = theme.mGrid;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(xPos, 0);
        ctx.lineTo(xPos, this.mYres);
        ctx.moveTo(0, yPos);
        ctx.lineTo(this.mXres, yPos);
        ctx.stroke();
      }
    }

    // graphs
    for (let i = 0; i < 6; i++) {
      const strFormula = this.store.getState().formulas[i].value;

      if (strFormula == null) {
        continue;
      }
      if (strFormula === '') {
        continue;
      }
      if (this.iNotOnBlackList(strFormula) === false) continue;

      if (this.mFunctionVis[i]) {
        this.iDrawGraph(i, theme.mGraphs[i]);
      }
    }
  }

  // --- public ----------------------------------------------

  public clearFormulas() {
    for (let i = 0; i < 6; i++) {
      const uiFormula: any = document.getElementById('formula' + (i + 1));
      uiFormula.value = '';
      let vis = false;
      if (i === 0) {
        uiFormula.value = 'x';
        vis = true;
      }
      this.newFormula(i + 1);
      this.iSetVisibility(i + 1, vis);
    }
    this.iResetCoords();
    if (this.mPaused) this.iDraw();
  }

  public resetTime() {
    this.mTimeMS = 0;
    this.mTimeS = 0.0;
    this.mStartMS = 0;
    this.mOffsetMS = 0;
    if (this.mPaused) {
      this.iDraw();
      let eleTime: any = document.getElementById('myTime');
      eleTime.textContent = 't = ' + this.mTimeS.toFixed(2);
    }
  }

  public togglePlay() {
    this.mPaused = !this.mPaused;

    if (!this.mPaused) {
      const eleTime: any = document.getElementById('myTime');
      this.mStartMS = 0;
      this.mOffsetMS = this.mTimeMS;
      const update = (time: number) => {
        if (this.mStartMS === 0) this.mStartMS = time;

        this.mTimeMS = this.mOffsetMS + (time - this.mStartMS);
        this.mTimeS = this.mTimeMS / 1000.0;
        eleTime.textContent = 't = ' + this.mTimeS.toFixed(2);

        this.iDraw();
        if (!this.mPaused) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    }
  }

  public newFormula(index: number) {
    const id = index - 1;
    for (let i = id; i < 6; i++) {
      this.iCompile(i);
    }
  }

  public toggleTheme() {
    this.mTheme = 1 - this.mTheme;
    const eleTheme: any = document.getElementById('myTheme');
    eleTheme.textContent = this.mTheme === 0 ? 'Dark' : 'Light';
    for (let i = 0; i < 6; i++) {
      this.iApplyFormulaVisibilityColor(i + 1);
    }
    if (this.mPaused) this.iDraw();
  }

  public toggleVisibility(index: number) {
    const id = index - 1;
    const vis = this.mFunctionVis[id];
    this.iSetVisibility(index, !vis);
  }

  public toggleShowAxes() {
    this.mShowAxes = (this.mShowAxes + 1) % 3;
    this.iApplyGrid();
    if (this.mPaused) this.iDraw();
  }

  public toggleRange() {
    this.mRangeType = (this.mRangeType + 1) % 3;
    const ele: any = document.getElementById('myRange');

    ele.textContent =
      this.mRangeType === 0 ? '0..1' : this.mRangeType === 1 ? '-1..1' : 'Free';

    if (this.mPaused) this.iDraw();
  }

  public draw() {
    this.iDraw();
  }

  public setCanvas(canvas: any) {
    this.mCanvas = canvas;
    this.mContext = this.mCanvas.getContext('2d');
  }
}
