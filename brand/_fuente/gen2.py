import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from marks import mark_A, mark_B, mark_C
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
FD = sys.argv[1]; OUT = sys.argv[2]
_cache = {}
def font(n):
    if n not in _cache: _cache[n] = TTFont(os.path.join(FD, n + ".ttf"))
    return _cache[n]
def text(txt, fname, size, x, y, track=0.0, skew=0.0):
    f = font(fname); gs = f.getGlyphSet(); cm = f.getBestCmap(); s = size / f["head"].unitsPerEm
    pen = SVGPathPen(gs); cx = 0
    for ch in txt:
        g = cm[ord(ch)]
        # skew: x' = x + tan*y  (glyph y up)
        gs[g].draw(TransformPen(pen, (s, 0, skew * s, -s, x + cx, y)))
        cx += gs[g].width * s + track * size
    return pen.getCommands(), cx - track * size
def width(txt, fname, size, track=0.0): return text(txt, fname, size, 0, 0, track)[1]
def svg(w, h, body): return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>\n'
def put(m, x, y, sc): return f'<g transform="translate({x:.1f} {y:.1f}) scale({sc})">{m}</g>'

C = {
 "A": dict(name="rompe-limites", mark=mark_A, dark="#061220", fg="#2AA8FF", ink="#FFFFFF", light="#F3F6FA", lmark="#0B5FD9", link="#061220",
           t1=("JOSÉ","UnboundedLight",0.42), t2=("UNSTOPPABLE","UnboundedBold",0.04), skew=0.0, box=(26,0,174,196)),
 "B": dict(name="velocidad", mark=mark_B, dark="#0B0B0C", fg="#E4FF1A", ink="#EDE8DE", light="#EDE8DE", lmark="#0B0B0C", link="#0B0B0C",
           t1=("JOSÉ","BigShouldersDisplayBlack",0.10), t2=("UNSTOPPABLE","BigShouldersDisplayBlack",0.03), skew=0.21, box=(4,6,183,196)),
 "C": dict(name="sin-fin", mark=mark_C, dark="#0E0D0B", fg="#C8A96A", ink="#F4EFE6", light="#F4EFE6", lmark="#9C7B3E", link="#0E0D0B",
           t1=("JOSÉ","CormorantGaramondMedium",0.55), t2=("UNSTOPPABLE","CormorantGaramondMedium",0.22), skew=0.0, box=(38,21,189,183)),
}
for k, c in C.items():
    d = os.path.join(OUT, f"propuesta-{k}-{c['name']}"); os.makedirs(d, exist_ok=True)
    bx0, by0, bx1, by1 = c["box"]; bw, bh = bx1-bx0, by1-by0
    def mark_at(col, cxp, cyp, size):   # size = target height of mark
        sc = size / bh
        return put(c["mark"](col), cxp - (bx0 + bw/2)*sc, cyp - (by0 + bh/2)*sc, sc)
    out = {}
    # app icon
    for nm, bg, col in (("icono-oscuro", c["dark"], c["fg"]), ("icono-claro", c["light"], c["lmark"])):
        out[nm] = svg(1024, 1024, f'<rect width="1024" height="1024" fill="{bg}"/>' + mark_at(col, 512, 512, 560))
    out["simbolo-transparente"] = svg(1024, 1024, mark_at(c["fg"], 512, 512, 900))
    def caph(fname, size):
        f = font(fname); return f["OS/2"].sCapHeight / f["head"].unitsPerEm * size
    t1, f1, tr1 = c["t1"]; t2, f2, tr2 = c["t2"]
    R1, G = {"A": (0.42, 0.42), "B": (0.48, 0.20), "C": (0.50, 0.55)}[k]
    def block(cap2):
        s2 = cap2 / caph(f2, 1); cap1 = cap2 * R1; s1 = cap1 / caph(f1, 1)
        return s1, s2, cap1, cap2 * G
    col1 = lambda col, ink: col if k == "B" else ink
    def horiz(bg, col, ink):
        H = 600; mh = 330; pad = 110
        mw = bw * mh / bh; tx = pad + mw + (70 if k != "C" else 60)
        cap2 = mh * {"A": 0.25, "B": 0.40, "C": 0.20}[k]
        s1, s2, cap1, gap = block(cap2)
        top = H/2 - (cap1 + gap + cap2)/2
        y1 = top + cap1; y2 = y1 + gap + cap2
        p1, w1 = text(t1, f1, s1, tx, y1, tr1, c["skew"])
        p2, w2 = text(t2, f2, s2, tx, y2, tr2, c["skew"])
        W = int(tx + max(w1, w2) + pad)
        b = f'<rect width="{W}" height="{H}" fill="{bg}"/>' if bg else ""
        b += mark_at(col, pad + mw/2, H/2, mh)
        b += f'<path d="{p1}" fill="{col1(col, ink)}"/><path d="{p2}" fill="{ink}"/>'
        return svg(W, H, b)
    out["logo-horizontal-oscuro"] = horiz(c["dark"], c["fg"], c["ink"])
    out["logo-horizontal-claro"] = horiz(c["light"], c["lmark"], c["link"])
    out["logo-horizontal-transparente"] = horiz(None, c["fg"], c["ink"])
    def stack(bg, col, ink):
        W = H = 1400; mh = 500
        cap2 = {"A": 92, "B": 130, "C": 78}[k]
        s1, s2, cap1, gap = block(cap2)
        sp = 130 if k != "B" else 100
        total = mh + sp + cap1 + gap + cap2
        top = (H - total) / 2
        b = f'<rect width="{W}" height="{H}" fill="{bg}"/>'
        b += mark_at(col, W/2, top + mh/2, mh)
        y1 = top + mh + sp + cap1; y2 = y1 + gap + cap2
        w1 = width(t1, f1, s1, tr1); w2 = width(t2, f2, s2, tr2)
        p1, _ = text(t1, f1, s1, W/2 - w1/2, y1, tr1, c["skew"])
        p2, _ = text(t2, f2, s2, W/2 - w2/2, y2, tr2, c["skew"])
        b += f'<path d="{p1}" fill="{col1(col, ink)}"/><path d="{p2}" fill="{ink}"/>'
        return svg(W, H, b)
    out["logo-vertical-oscuro"] = stack(c["dark"], c["fg"], c["ink"])
    out["logo-vertical-claro"] = stack(c["light"], c["lmark"], c["link"])
    for n, v in out.items(): open(os.path.join(d, n + ".svg"), "w").write(v)
    print(d)
