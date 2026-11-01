import itertools
_ids = itertools.count()

def mark_A(c, bg=None):
    # ROMPE LIMITES: a frame (the limits) and a J that bursts out through its top edge.
    sw, js = 10, 36
    L, T, R, B = 26, 64, 174, 196
    sx = 128
    gap = 13
    x0, x1 = sx - js/2, sx + js/2
    frame = (f'<path d="M{x0-gap} {T+sw/2} H{L+sw/2} V{B-sw/2} H{R-sw/2} V{T+sw/2} H{x1+gap}" '
             f'fill="none" stroke="{c}" stroke-width="{sw}" stroke-linejoin="miter"/>')
    ro = 46; ri = ro - js; cy = 124; cx = x1 - ro
    j = (f'<path d="M{x0} 22 L{x1} 0 V{cy} A{ro} {ro} 0 0 1 {cx-ro} {cy} V{cy-16} H{cx-ri} V{cy} '
         f'A{ri} {ri} 0 0 0 {x0} {cy} Z" fill="{c}"/>')
    return frame + j

def mark_B(c, bg=None, skew=-12):
    # VELOCIDAD: heavy italic J sliced by a diagonal cut; the upper part pushes ahead.
    i = next(_ids)
    j = 'M102 10 H160 V122 A74 74 0 0 1 12 122 L12 112.1 L60 101.1 V122 A21 21 0 0 0 102 122 Z'
    k = -0.214   # slope of the cut (rises to the right)
    def line(y0): return f'L240 {y0 + 280*k:.1f} '
    up = f'M-40 -60 H260 V{52:.1f} L-40 {112} Z'
    lo = f'M-40 {124} L260 {64:.1f} V320 H-40 Z'
    return f'''<g transform="translate(18 0) skewX({skew})">
<clipPath id="u{i}"><path d="M-40 -60 H260 V48 L-40 112 Z"/></clipPath>
<clipPath id="l{i}"><path d="M-40 124 L260 60 V320 H-40 Z"/></clipPath>
<g clip-path="url(#u{i})"><path d="{j}" fill="{c}" transform="translate(6 -4)"/></g>
<g clip-path="url(#l{i})"><path d="{j}" fill="{c}"/></g></g>'''

def mark_C(c, bg=None, sw=6.5):
    # SIN FIN: one unbroken line. Head, stem, hook, and the hook keeps going:
    # it loops back through the stem and leaves rising to the right. It never stops.
    d = ('M84 24 H116 V126 '
         'C116 168 62 184 44 152 '
         'C30 126 64 104 98 114 '
         'C132 124 150 132 186 76')
    return f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>'
