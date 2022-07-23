import mitt from 'mitt';

import { getErrorMessage, isBadNum } from '../utils';
import {
  darkTheme,
  defaultFormulas,
  defaultVariables,
  kBlackList,
  lightTheme,
  symbolSubs,
} from './constants';
import {
  FncFormula,
  Formula,
  GrapherOnEventFunctions,
  GrapherTheme,
  Variable,
} from './types';

export default class Grapher {
  mCanvas!: HTMLCanvasElement;
  mContext!: CanvasRenderingContext2D;
  kTheme: GrapherTheme[] = [darkTheme, lightTheme];
  mMouseFunction: number = 0;
  mCx: number = 0.0;
  mCy: number = 0.0;
  mRa: number = 12.0;
  mRefCx: number = -1.0;
  mRefCy: number = -1.0;
  mRefRa: number = -1.0;
  mRefMouseX: number = -1.0;
  mRefMouseY: number = -1.0;
  mRangeType: number = 2; // [0, 1, 2] [0..1 = 0, -1..1 = 1, Free = 2]
  mShowAxes: number = 1; // [0, 1, 2] [Grid Off = 0 , Grid Dec = 1, Grid Bin = 2]
  mPaused: boolean = true;
  mTimeMS: number = 0;
  mOffsetMS: number = 0;
  mStartMS: number = 0;
  mTimeS: number = 0.0;
  mTheme: number = 0; // [0, 1] [0 = Dark, 1 = Light]
  mFormulas: Formula[] = defaultFormulas;
  mVariables: Variable[] = defaultVariables;
  mFunctionFun: Array<FncFormula | null> = [null, null, null, null, null, null];
  mFunctionVisualizer: [number, number, number] = [0, 1, 2];
  mXres: number = 0;
  mYres: number = 0;
  mShowVisualizer: boolean = true;
  mCoords: [number, number] = [0, 0];
  events = mitt<GrapherOnEventFunctions>();

  /**
   * Set the canvas so grapher has something to work with. This must be done first
   * @param canvas
   */
  public setCanvas(canvas: HTMLCanvasElement) {
    this.mCanvas = canvas;
    this.mContext = this.mCanvas.getContext('2d')!;
  }

  /**
   * Start Grapher off doing it's graphing thing. setCanvas must have been called first.
   */
  public start() {
    this.iRegisterEventListeners();
    // Compile all of our formulas
    this.mFormulas.forEach((formula) => {
      this.compileFormula(formula);
    });
    this.iAdjustCanvas();
    this.togglePlay();
    this.draw();
  }

  /**
   * Reset the time to 0 or an optionally provided t value
   * @param t 0 if not provided
   */
  public resetTime(t = 0.0) {
    this.mTimeMS = t;
    this.mTimeS = t;
    this.mStartMS = t;
    this.mOffsetMS = t;

    if (this.mPaused) {
      this.draw();
    }
    this.events.emit('time', t);
  }

  public togglePlay() {
    this.mPaused = !this.mPaused;
    this.events.emit('playPause', this.mPaused);

    if (!this.mPaused) {
      this.mStartMS = 0;
      this.mOffsetMS = this.mTimeMS;
      const update = (time: number) => {
        if (this.mStartMS === 0) this.mStartMS = time;
        this.mTimeMS = this.mOffsetMS + (time - this.mStartMS);
        this.mTimeS = this.mTimeMS / 1000.0;
        this.draw();
        this.events.emit('time', this.mTimeS);
        if (!this.mPaused) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    }
  }

  public toggleVisualizer() {
    this.mShowVisualizer = !this.mShowVisualizer;
    this.draw();
  }

  /**
   * Complete replace the formulas with whatever is passed in
   * @param formulas
   * @param recompile
   */
  public setFormulas(formulas: Formula[], recompile = false) {
    this.mFormulas = formulas;
    if (recompile) this.recompileAllFormulas();
    if (this.mPaused) this.draw();
  }

  public setVariables(variables: Variable[], recompile = false) {
    this.mVariables = variables;
    if (recompile) this.recompileAllFormulas();
    if (this.mPaused) this.draw();
  }

  /**
   * Just update a single Formula by an ID
   * @param id The formula ID to update
   * @param formula The Formula to update it with
   */
  public updateFormulaById(id: number, formula: Formula) {
    this.mFormulas[id] = formula;
    // Update all the formulas after the id
    this.recompileAllFormulas();
  }

  public recompileAllFormulas() {
    for (const formula of this.mFormulas) {
      if (!this.compileFormula(formula)) {
        return;
      }
    }
  }

  public toggleTheme() {
    this.mTheme = 1 - this.mTheme;
    if (this.mPaused) this.draw();
  }

  public toggleShowAxes() {
    this.mShowAxes = (this.mShowAxes + 1) % 3;
    if (this.mPaused) this.draw();
  }

  public toggleRange() {
    this.mRangeType = (this.mRangeType + 1) % 3;
    if (this.mPaused) this.draw();
  }

  public resetCoords() {
    this.mCx = 0.0;
    this.mCy = 0.0;
    this.mRa = 12.0;
  }

  public draw() {
    if (this.mRangeType === 0) {
      this.mCx = 0.5;
      this.mCy = 0.5;
      this.mRa = (0.5 * this.mXres) / this.mYres;
    } else if (this.mRangeType === 1) {
      this.mCx = 0.0;
      this.mCy = 0.0;
      this.mRa = this.mXres / this.mYres;
    }

    const rx = this.mRa;
    const ry = (this.mRa * this.mYres) / this.mXres;
    const minx = this.mCx - rx;
    const maxx = this.mCx + rx;
    const miny = this.mCy - ry;
    const maxy = this.mCy + ry;

    const theme = this.kTheme[this.mTheme];

    // axes
    const ctx = this.mContext;
    ctx.setTransform(1, 0.0, 0.0, 1, 0.5, 0.5);
    ctx.fillStyle = theme.mBackground;
    ctx.fillRect(0, 0, this.mXres, this.mYres);

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

      const drawGrid = (off: number, color: string) => {
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

    this.iDrawVisualizer();

    // graphs
    for (const formula of this.mFormulas) {
      // Check and make sure our formulas are valid
      const strFormula = formula.value;
      if (strFormula == null || strFormula === '') {
        continue;
      }
      // if (!this.iNotOnBlackList(formula)) continue;
      // Draw the Graph if it's enabled
      if (formula.enabled) {
        this.iDrawGraph(formula.id, theme.mGraphs[formula.id]);
      }
    }
  }

  public compileFormula(formula: Formula, storeFunc = true): boolean {
    const { id } = formula;
    const formulas = this.mFormulas;
    const strFormula = formula.value;
    this.mFunctionFun[formula.id] = null;

    if (strFormula == null) return false;
    if (strFormula === '') return false;
    if (!this.iNotOnBlackList(formula)) return false;

    // Compile our functions in to one function
    let fncString = 'with(Math){';
    if (id >= 0)
      fncString += 'function f1(x,t){return (' + formulas[0].value + ');}';
    if (id >= 1)
      fncString += 'function f2(x,t){return (' + formulas[1].value + ');}';
    if (id >= 2)
      fncString += 'function f3(x,t){return (' + formulas[2].value + ');}';
    if (id >= 3)
      fncString += 'function f4(x,t){return (' + formulas[3].value + ');}';
    if (id >= 4)
      fncString += 'function f5(x,t){return (' + formulas[4].value + ');}';

    fncString = fncString + 'return(' + strFormula + ');}';

    // console.log(`FncString: ${fncString}`);

    // Do our symbol and variable replacement
    const variableStrSubs = this.mVariables.map((v) => [
      v.name,
      String(v.value),
    ]);
    fncString = [...symbolSubs, ...variableStrSubs].reduce(
      (acc, current) => acc.split(current[0]).join(current[1]),
      fncString,
    );

    // Try to compile our function and test that it works
    let fnFormula: FncFormula;
    try {
      // eslint-disable-next-line no-new-func
      fnFormula = Function('x,t', fncString) as FncFormula;
    } catch (err) {
      this.events.emit('formulaError', {
        error: getErrorMessage(err),
        formula,
      });
      return false;
    }
    try {
      fnFormula(0.1, 0.2);
    } catch (err) {
      this.events.emit('formulaError', {
        error: getErrorMessage(err),
        formula,
      });
      return false;
    }

    // Set the compiled function to be used later
    if (storeFunc) {
      this.mFunctionFun[id] = fnFormula;
      this.events.emit('formulaCompiled', id);
    }

    return true;
  }

  /**
   * Actually draw the graph to the canvas
   * @param id The formula ID to draw
   * @param myColor The color to draw the formula in
   * @private
   */
  private iDrawGraph(id: number, myColor: string) {
    const formula = this.mFunctionFun[id];
    if (!formula) return false;

    const ctx = this.mContext;
    let oldBadNum = true;
    let success = true;

    const rx = this.mRa;
    const ry = (this.mRa * this.mYres) / this.mXres;
    const t = this.mTimeS;

    // Evaluate the function at the x value specified and move along the path it creates
    ctx.beginPath();
    for (let i = 0; i < this.mXres; i++) {
      const x = this.mCx + rx * (-1.0 + (2.0 * i) / this.mXres);
      let y = 0.0;
      try {
        y = formula(x, t);
      } catch (err) {
        this.events.emit('formulaError', {
          error: getErrorMessage(err),
          formula: this.mFormulas[id],
        });
        success = false;
        break;
      }
      let badNum = isBadNum(y);
      if (!badNum) {
        let j = this.mYres * (0.5 + (0.5 * (this.mCy - y)) / ry);
        if (oldBadNum) ctx.moveTo(i, j);
        else ctx.lineTo(i, j);
      }
      oldBadNum = badNum;
    }
    // Stroke the path we created
    ctx.strokeStyle = myColor;
    ctx.lineWidth = this.mTheme === 0 ? 2.0 : 3.0;
    ctx.fillStyle = myColor;
    ctx.stroke();

    return success;
  }

  private iDrawVisualizer() {
    if (this.mShowVisualizer) {
      const ctx = this.mContext;
      const xRes = 256;
      // Set the fill style and draw a rectangle
      const gradient = ctx.createLinearGradient(20, 0, 220, 0);
      // Fetch our functions that have visualizer in the correct channel positions [func, func, func]
      const visualizedFuncs = this.iGetVisualizedFuncs();
      // Evaluate the function to create the necessary amount of x resolution on our gradient for each channel
      const gradVals = Array(xRes)
        .fill(null)
        .map((_, idx) =>
          visualizedFuncs.map((f) =>
            f ? f(idx / xRes, this.mTimeS) * 255 : 0.0,
          ),
        )
        .map((rgb) => rgb.map((p) => (isBadNum(p) ? 0.0 : p)));
      gradVals.forEach(([r, g, b], idx) => {
        gradient.addColorStop(idx / 256, `rgb(${r}, ${g}, ${b})`);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(20, 20, 200, 200);
    }
  }

  private iNotOnBlackList(formula: Formula) {
    if (formula.value.length > 256) {
      this.events.emit('formulaError', {
        error: 'Formula is too long...',
        formula,
      });
      return false;
    }
    const lowFormula = formula.value.toLowerCase();
    for (let n = 0; n < kBlackList.length; n++) {
      if (lowFormula.indexOf(kBlackList[n]) !== -1) {
        this.events.emit('formulaError', { error: 'Forbidden Word', formula });
        return false;
      }
    }
    return true;
  }

  private iRegisterEventListeners() {
    this.mCanvas.onmousedown = (ev) => {
      this.iMouseDown(ev);
    };

    this.mCanvas.onmousemove = (ev) => {
      this.iMouseMove(ev);
    };

    this.mCanvas.onmouseup = (ev) => {
      this.iMouseUp(ev);
    };

    this.mCanvas.onmouseout = (ev) => {
      this.iMouseUp(ev);
    };

    this.mCanvas.addEventListener(
      'wheel',
      (ev) => {
        this.iMouseWheel(ev);
      },
      { passive: true },
    );

    this.mCanvas.addEventListener(
      'touchstart',
      (e) => {
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
            e.touches[0].clientY - e.touches[1].clientY,
          );
          this.mMouseFunction = 2;
          this.mRefCx = this.mCx;
          this.mRefCy = this.mCy;
          this.mRefRa = this.mRa;
          this.mRefMouseX = d;
          this.mRefMouseY = 0;
        }
      },
      { passive: true },
    );

    this.mCanvas.addEventListener(
      'touchend',
      (e) => {
        e.preventDefault();
        this.mMouseFunction = 0;
      },
      { passive: true },
    );

    this.mCanvas.addEventListener(
      'touchmove',
      (e) => {
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
          if (this.mPaused) this.draw();
        } else if (this.mMouseFunction === 2) {
          let d = Math.hypot(
            touches[0].clientX - touches[1].clientX,
            touches[0].clientY - touches[1].clientY,
          );
          let scale = Math.pow(0.99, d - this.mRefMouseX);
          this.mRa = this.mRefRa * scale;

          if (this.mPaused) this.draw();
        }
      },
      { passive: true },
    );

    window.onresize = (ev) => {
      this.iResize(ev);
    };
  }

  private iMouseUp(e: MouseEvent) {
    this.mMouseFunction = 0;
  }

  private iMouseDown(e: MouseEvent) {
    if (this.mRangeType !== 2) return;
    if (e.button === 0 && !e.shiftKey) this.mMouseFunction = 1;
    else this.mMouseFunction = 2;
    this.mRefCx = this.mCx;
    this.mRefCy = this.mCy;
    this.mRefRa = this.mRa;
    this.mRefMouseX = e.offsetX;
    this.mRefMouseY = e.offsetY;
  }

  private iMouseMove(e: MouseEvent) {
    const cxres = this.mCanvas.offsetWidth;
    const cyres = this.mCanvas.offsetHeight;

    if (this.mMouseFunction === 0) {
      const rx = this.mRa;
      const ry = (this.mRa * cyres) / cxres;
      const x = this.mCx + 2.0 * rx * (e.offsetX / cxres - 0.5);
      const y = this.mCy - 2.0 * ry * (e.offsetY / cyres - 0.5);
      // const n = 1 + Math.floor(Math.log(cxres / (rx * 2.0)) / Math.log(10.0));
      this.events.emit('coords', [x, y]);
      this.mCoords = [x, y];
    }

    if (this.mRangeType !== 2) return;

    if (this.mMouseFunction === 1) {
      this.mCx =
        this.mRefCx - ((e.offsetX - this.mRefMouseX) * 2.0 * this.mRa) / cxres;
      this.mCy =
        this.mRefCy + ((e.offsetY - this.mRefMouseY) * 2.0 * this.mRa) / cxres;
      if (this.mPaused) this.draw();
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

      if (this.mPaused) this.draw();
    }
  }

  private iMouseWheel(e: WheelEvent) {
    const sFactor = 1.1;
    const scale = e.deltaY < 0 ? 1.0 / sFactor : sFactor;
    this.mRa = this.mRa * scale;

    if (this.mPaused) this.draw();
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

  private iResize(e: UIEvent) {
    this.iAdjustCanvas();
    if (this.mPaused) this.draw();
  }

  /**
   * Derive the visualized functions in the correct channel order (RGB)
   * based on all the formulas in mFormulas
   * @private
   */
  private iGetVisualizedFuncs() {
    // Iterate through all the formulas find the id of the first red,green,blue channel formula
    const r = this.mFormulas.find((f) => f.visualizer[0])
    const g = this.mFormulas.find((f) => f.visualizer[1])
    const b = this.mFormulas.find((f) => f.visualizer[2])
    return [
      r ? this.mFunctionFun[this.mFunctionVisualizer[r.id]] : null,
      g ? this.mFunctionFun[this.mFunctionVisualizer[g.id]] : null,
      b ? this.mFunctionFun[this.mFunctionVisualizer[b.id]] : null,
    ];
  }
}
