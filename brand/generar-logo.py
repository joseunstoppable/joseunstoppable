import os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
OUT = "/home/user/joseunstoppable/brand"
FD = "/usr/share/fonts/opentype/inter/"
NAVY, NAVY2 = "#07182A", "#0C2A43"
B1, B2 = "#6FD0FF", "#0E71AC"
WHITE = "#FFFFFF"

def text_path(txt, fontfile, size, x, y, tracking=0.0):
    f = TTFont(FD + fontfile); gs = f.getGlyphSet(); cmap = f.getBestCmap()
    upm = f["head"].unitsPerEm; s = size / upm
    pen = SVGPathPen(gs); cx = 0
    for ch in txt:
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (s, 0, 0, -s, x + cx, y))
        gs[g].draw(tp)
        cx += gs[g].width * s + tracking * size
    width = cx - tracking * size
    return pen.getCommands(), width

def text_width(txt, fontfile, size, tracking=0.0):
    return text_path(txt, fontfile, size, 0, 0, tracking)[1]

def mark(stroke, sw=17):
    # JU ligature: shared stem, J hook left, U right arm rising into an arrow
    return f'''<g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="miter" stroke-linecap="butt">
  <path d="M86 44 V118 A28 28 0 0 1 30 118"/>
  <path d="M86 118 A28 28 0 0 0 142 118 V50"/>
  <path d="M120 70 L142 48 L164 70" stroke-linecap="square"/>
</g>'''

def grad(id_):
    return f'<linearGradient id="{id_}" x1="160" y1="40" x2="40" y2="160" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="{B1}"/><stop offset="1" stop-color="{B2}"/></linearGradient>'

def place(markxml, x, y, scale):
    return f'<g transform="translate({x} {y}) scale({scale})">{markxml}</g>'

def svg(w, h, body, defs=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><defs>{defs}</defs>{body}</svg>\n'

files = {}
# 1. App icon (square)
def icon(bg, stroke_ref, ring):
    b = f'<rect width="1024" height="1024" fill="{bg}"/>'
    if bg == NAVY:
        b = f'<rect width="1024" height="1024" fill="url(#bgg)"/>'
    b += f'<circle cx="512" cy="512" r="400" fill="none" stroke="{ring}" stroke-width="3" opacity=".55"/>'
    b += place(mark(stroke_ref), 512 - 96*3.6, 512 - 95*3.6, 3.6)
    return b
bgg = f'<radialGradient id="bgg" cx="50%" cy="35%" r="75%"><stop offset="0" stop-color="{NAVY2}"/><stop offset="1" stop-color="{NAVY}"/></radialGradient>'
files["icono-azul-oscuro.svg"] = svg(1024, 1024, icon(NAVY, "url(#g)", B2), grad("g") + bgg)
files["icono-blanco.svg"] = svg(1024, 1024, icon(WHITE, NAVY2, B2), "")

# 2. Horizontal lockup
def horizontal(textcol, markstroke, bg=None, defs=""):
    W, H = 2400, 640
    ms = 2.6; mx, my = 80, H/2 - 95*ms
    tx = mx + 175*ms + 60
    p1, w1 = text_path("JOSÉ", "InterDisplay-Light.otf", 120, tx, 290, 0.32)
    p2, w2 = text_path("UNSTOPPABLE", "InterDisplay-Bold.otf", 150, tx, 460, 0.06)
    W = int(tx + max(w1, w2) + 90)
    b = f'<rect width="{W}" height="{H}" fill="{bg}"/>' if bg else ""
    b += place(mark(markstroke), mx, my, ms)
    b += f'<path d="{p1}" fill="{textcol}"/><path d="{p2}" fill="{textcol}"/>'
    return svg(W, H, b, defs)
files["logo-horizontal-fondo-oscuro.svg"] = horizontal(WHITE, "url(#g)", NAVY, grad("g"))
files["logo-horizontal-fondo-blanco.svg"] = horizontal(NAVY2, "url(#g)", WHITE, grad("g"))
files["logo-horizontal-transparente-blanco.svg"] = horizontal(WHITE, "url(#g)", None, grad("g"))
files["logo-horizontal-transparente-oscuro.svg"] = horizontal(NAVY2, "url(#g)", None, grad("g"))

# 3. Vertical / stacked lockup
def vertical(textcol, bg=None):
    W, H = 1600, 1600
    ms = 3.4
    b = f'<rect width="{W}" height="{H}" fill="{bg}"/>' if bg else ""
    b += place(mark("url(#g)"), W/2 - 96*ms, 300, ms)
    w1 = text_width("JOSÉ", "InterDisplay-Light.otf", 96, 0.5)
    p1, _ = text_path("JOSÉ", "InterDisplay-Light.otf", 96, W/2 - w1/2, 1030, 0.5)
    w2 = text_width("UNSTOPPABLE", "InterDisplay-Bold.otf", 150, 0.08)
    p2, _ = text_path("UNSTOPPABLE", "InterDisplay-Bold.otf", 150, W/2 - w2/2, 1220, 0.08)
    b += f'<path d="{p1}" fill="{textcol}"/><path d="{p2}" fill="{textcol}"/>'
    return svg(W, H, b, grad("g"))
files["logo-vertical-fondo-oscuro.svg"] = vertical(WHITE, NAVY)
files["logo-vertical-fondo-blanco.svg"] = vertical(NAVY2, WHITE)

for n, c in files.items():
    open(os.path.join(OUT, n), "w").write(c)
print("\n".join(files))
