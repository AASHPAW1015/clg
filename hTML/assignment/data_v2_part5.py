data = [
    {
        'section': 'CSS Fundamentals',
        'topic': 'Class selector and ID selector',
        'headers': ['Point of Difference', 'CSS Class Selector', 'CSS ID Selector'],
        'points': [
            ['1. Declaration Prefix Syntax', 'Always defined using a preceding period (`.btn-primary`).', 'Always defined using a preceding octothorpe/hash (`#site-nav`).'],
            ['2. Cascade Specificity Score', 'Moderate weight. Evaluates exactly to `0, 0, 1, 0` on the W3C scale.', 'Massive weight. Evaluates exactly to `0, 1, 0, 0` on the W3C scale.'],
            ['3. Reusability factor', 'Infinitely reusable. Can be stamped onto 10,000 different nodes safely.', 'Strictly single-use. Applying the same ID twice invalidates the HTML Document.'],
            ['4. Multiple concatenations', 'A single HTML tag can cheerfully accept 50 classes (`class="a b c d e"`).', 'A single HTML tag can possess exactly one monolithic ID string (`id="a"`).'],
            ['5. The Architectural Paradigm', 'The absolute backbone of modular, component-driven UI design (like React modules).', 'The backbone of massive, unrepeatable page skeletons (like the main `<main>` wrapper).'],
            ['6. CSS Overloading Difficulty', 'Trivially easy to overload or overwrite by placing another class lower in the cascade.', 'Extremely stubborn. Requires another ID or the dreaded `!important` flag to overwrite.'],
            ['7. Render Engine speed', 'Slightly slower mathematically for the engine to find all 10,000 matches on a page.', 'Instantaneous natively, as the engine stops iterating the exact millisecond it finds the single node.'],
            ['8. Javascript interdependence', 'Less catastrophically brittle if a designer renames it accidentally in the CSS file.', 'Incredibly fragile. A renamed CSS ID will instantly break `document.getElementById` JS logic.'],
            ['9. Anchor URL Jump Links', 'Utterly useless for creating clickable jump links targeting specific scroll heights.', '100% required to create `Click Here` links that instantly scroll the viewport to a section.'],
            ['10. BEM Methodology Rules', 'The exclusive, mandated currency of the BEM (Block Element Modifier) religion.', 'Explicitly banned and actively hunted down in strict BEM codebases.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Element selector and Universal selector',
        'headers': ['Conceptual Difference', 'Base Element Selector', 'Global Universal Selector'],
        'points': [
            ['1. Target Lexicon', 'Identifies elements solely by their raw HTML tag name (`button`, `p`, `img`).', 'Targeted globally using the literal asterisk keyboard symbol (`*`).'],
            ['2. Blast Radius', 'Fires specific rules only at the designated tag type matching the string entirely.', 'Indiscriminately blankets literally every single node, tag, and pseudo-element in the DOM tree.'],
            ['3. Cascade Specificity Gravity', 'The absolute lowest measurable positive specificity (`0, 0, 0, 1`).', 'Literally possesses zero specificity (`0, 0, 0, 0`), yielding to literally any other rule instantly.'],
            ['4. Typographical Baselines', 'Used beautifully to set up default styling for native elements (all `a` tags are blue).', 'Used aggressively to rip out browser defaults globally (often called a CSS Reset).'],
            ['5. Rendering Performance tax', 'Highly optimized and lightning fast native rendering pipeline.', 'Historically known as the single slowest selector in CSS, forcing the GPU to touch every node.'],
            ['6. Override Logistics', 'Happily overrides the Universal selector without breaking a sweat naturally.', 'Cannot override anything independently without the toxic `!important` nuclear option.'],
            ['7. Generational Inheritance', 'Relies heavily on natural parent-to-child inheritance cascades for fonts.', 'Forces explicit styles directly onto children, completely bypassing natural inheritance.'],
            ['8. Selector Combinatorics', 'Sprinkled with pseudo-classes constantly (`input:focus { border: blue; }`).', 'Sprinkled aggressively to isolate nested children (`.modal * { opacity: 0; }`).'],
            ['9. Famous Example snippet', '`body { background-color: #fafafa; line-height: 1.6; }`', '`* { margin: 0; padding: 0; box-sizing: border-box; }`'],
            ['10. Predictability Index', 'A highly safe, sane, and predictable architectural vector.', 'Often triggers bizarre, frustrating side effects on third-party widgets or deeply embedded SVGs.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Inline CSS and External CSS',
        'headers': ['Aspect', 'Inline CSS Architecture', 'External CSS Architecture'],
        'points': [
            ['1. Physical Destination', 'Embedded directly into the raw veins of the HTML string via the `style` tag.', 'Exiled entirely into a standalone `.css` file hosted on a separate server pathway.'],
            ['2. The Reuse Principle', 'Statiscally absolute zero. If you style one `<p>`, you must manually style the other 999 `<p>`s.', 'Infinite scalability. Updating one single `.card` class restyles 10,000 cards instantly across the globe.'],
            ['3. Specificity Dominance', 'Wields god-like specificity power (1000 points), ruthlessly crushing all external stylesheets.', 'Wields standard, predictable specificity power spanning from 1 point to 100 points organically.'],
            ['4. Structural Complexity Limits', 'Physically incapable of housing pseudo-classes, attribute selectors, or complex DOM math.', 'Thrives on massively complex pseudo-classes (`:nth-child(odd):hover::before`).'],
            ['5. Media Query capability', 'Fundamentally impossible to bake responsive mobile breakpoints directly into a style attribute.', 'The absolute required vehicle for delivering `@media` queries to ensure mobile screens render correctly.'],
            ['6. Browser Cache leverage', 'Forces the browser to repeatedly download the exact same string data on every single page load.', 'Downloads exactly once on the initial visit, then loads instantaneously from the local hard drive cache.'],
            ['7. The Spaghetti Code Factor', 'Violates every known principle of Clean Architecture by polluting data with visual configurations.', 'Enforces absolute, pristine separation between the Document Object (HTML) and the Paint Engine (CSS).'],
            ['8. Team Development Workflow', 'Creates chaotic GIT merge conflicts when UI designers and Backend engineers touch the same file.', 'A UI designer can completely overhaul the website aesthetic without ever seeing a single line of Python/PHP.'],
            ['9. Security Risk profile', 'Aggressively blacklisted by modern Content Security Policies (CSP) to stop cross-site scripting attacks.', 'Universally trusted, whitelisted, and encouraged by all modern IT security frameworks.'],
            ['10. Javascript Injection loops', 'The standard vector used by React/Vue to quickly inject highly dynamic math coordinates (like scroll tracking).', 'The standard vector used by Webpack/Vite to compile massive Sass architectures into production bundles.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Relative and Absolute positioning',
        'headers': ['Difference', 'Relative Positioning Paradigm', 'Absolute Positioning Paradigm'],
        'points': [
            ['1. Biological Flow State', 'Remains fiercely rooted in the natural, organic HTML document chronological flow.', 'Is violently ripped completely out of the natural, organic HTML document chronological flow.'],
            ['2. The Ghost/Shadow Space', 'Reserves a massive hollow chunk of "ghost space" where the element originally spawned in the layout.', 'Reserves absolutely zero space; sibling text simply collapses underneath or over it seamlessly.'],
            ['3. Movement Origin Point', 'Calculates its `top`/`left` trajectory from the exact spot it naturally spawned statically.', 'Calculates its trajectory relative to the nearest ancestral box that isn\'t position `static`.'],
            ['4. The Orphan Crisis', 'Functions beautifully and predictably regardless of whether its parent is static or not.', 'Devolves into chaos, snapping to the exact edge of the `<body>` viewport if no parent acts as an anchor.'],
            ['5. Coordinate Trajectory', '`left: 50px` shoves the element 50 pixels to the right of its original birth spot.', '`left: 50px` glues the element 50 pixels away from the left border of its relative parent bounding box.'],
            ['6. Code Implementation', '`position: relative;`', '`position: absolute;`'],
            ['7. Primary UI Task', 'Deployed mostly to act as the invisible "anchor grid" parent to trap chaotic absolute children inside of it.', 'Deployed to create hovering close buttons, notification red dots, dropdown menus, and tooltip layers.'],
            ['8. Automatic Width Calculation', 'Automatically expands to 100% of its parent width if it naturally acts like a block-level node.', 'Automatically shrinks to the microscopic width of its inner text unless explicitly forced open with `width: 100%`.'],
            ['9. Z-Index Overlay battles', 'Can instantly spawn a new stacking context on the Z-axis if combined with a `z-index` value.', 'Almost universally requires `z-index` management, because by ripping it from the flow, it will instantly overlap text.'],
            ['10. The Horizontal Centering trick', '`margin: 0 auto;` effortlessly and beautifully centers the block horizontally inside any parent.', '`margin: 0 auto;` does absolutely nothing unless you bizarrely combine it with `left: 0; right: 0;`.'],
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Static and Fixed positioning',
        'headers': ['Aspect', 'Static Positioning Logic', 'Fixed Positioning Logic'],
        'points': [
            ['1. The Initial Constant', 'The fundamental, bedrock positioning state applied to every distinct node on the web instantly.', 'An aggressive, specialized positioning state that developers must actively trigger via code.'],
            ['2. The Scroll Relationship', 'Happily scrolls vertically upwards and eventually disappears off the screen as the user reads.', 'Ruthlessly ignores scrolling mathematics, remaining permanently anchored to the physical glass of the monitor.'],
            ['3. Coordinates API response', 'Completely ignores `top`/`left`/`bottom`/`right` commands. They are meaningless dead weight.', 'Completely slaved to `top`/`left`/`bottom`/`right` commands, moving exactly where told.'],
            ['4. Flow Integration', 'Represents the pure, cascading, chronological document structural body.', 'Completely ripped out of the chronological body, hovering above everything infinitely like a god.'],
            ['5. The Anchor Reference', 'Determines its X/Y coordinates based strictly on the size and shape of the elements placed before it.', 'Determines its X/Y coordinates based strictly on the physical pixel dimensions of the browser window (`viewport`).'],
            ['6. Z-Index Management', 'The `z-index` property is instantly nullified and ignored; static elements cannot stack artificially.', 'Happily devours `z-index` properties to ensure it always floats exactly over top of the scrolling text.'],
            ['7. Explicit Value', '`position: static;`', '`position: fixed;`'],
            ['8. Prominent Application', 'Applied to 98% of the standard text paragraphs, h1 titles, images, and basic grid columns.', 'Applied to sticky top navigation bars, cookie permission popups, and floating chat widget buttons.'],
            ['9. The Transform Hack vulnerability', 'Immune to bizarre rendering side effects triggered by ancestral CSS transformations.', 'Tragically breaks and devolves into `absolute` positioning if ANY parent wrapper possesses a `transform` rule.'],
            ['10. The Repaint Resource drain', 'Incredibly cheap mathematically for the browser GPU to calculate while a user scrolls rapidly.', 'Incredibly expensive mathematically for the browser GPU, often causing scroll-jank as it repaints the frame constantly.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Margin and Padding',
        'headers': ['Factor', 'Margin Generation', 'Padding Generation'],
        'points': [
            ['1. Physical Location Topology', 'Generates completely invisible, dead space OUTSIDE the exact border boundary of the element.', 'Generates internal breathing room INSIDE the exact border boundary of the element text block.'],
            ['2. The Background Paint Spill', 'The element’s rich background color/photo will absolutely never bleed into the margin territory.', 'The element’s rich background color/photo completely fills and paints the entire padding territory perfectly.'],
            ['3. Relational Philosophy', 'Dictates the harsh distance and separation between two independent sibling UI boxes.', 'Dictates the soft internal cushioning between the element’s rigid border and its fragile inner text text.'],
            ['4. The Clickable Hover Void', 'Margin space is totally dead interaction space; your mouse means nothing there.', 'Padding space is 100% active interaction space; clicking the padding effortlessly fires the button click event.'],
            ['5. The Negative Math trick', 'Regularly accepts highly negative integers (`margin-left: -50px`) to deliberately overlap and hack layouts.', 'Will instantly throw a parser error and ignore any negative integers (`padding: -10px` is completely invalid CSS).'],
            ['6. The Vertical Collapse bug', 'Notoriously collapses vertically; a 20px bottom margin touching a 30px top margin magically becomes just 30px total.', 'Never collapses natively; a 20px bottom padding touching a 30px top padding stacks identically to 50px of internal space.'],
            ['7. The "Auto" Centering phenomena', '`margin: 0 auto;` is the most famous CSS trick in history to securely center block elements horizontally.', '`padding: auto;` is literal gibberish to the CSS parser and does absolutely nothing to center text.'],
            ['8. The Boundary definition', 'Wraps invisibly around the border layer like a magical forcefield repelling other atoms.', 'Sits sandwiched identically between the raw text content and the protective border shell layer.'],
            ['9. Box-Sizing interactions', 'Will never, ever be swallowed into the `width` calculation when `box-sizing: border-box` is activated.', 'Will be seamlessly swallowed into the `width` calculation when `box-sizing: border-box` is activated easily.'],
            ['10. The Standard Real World usage', 'Forcing three distinct pricing tier cards to sit exactly 30 pixels apart from each other on a flex grid layout.', 'Taking a skinny, unclickable text link and bulking it up into a massive, juicy, tap-able mobile button.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Border and Outline',
        'headers': ['Conceptual Difference', 'CSS Border Layer', 'CSS Outline Layer'],
        'points': [
            ['1. Dimensional Physics Impact', 'Literally adds physical mass to the element, violently pushing sibling text and layouts away from it.', 'Draws silently on top of external space; it never ever pushes sibling text or alters layout physics.'],
            ['2. The CSS Box Model status', 'The final, ultimate outer boundary of the W3C CSS Box Model mathematical calculation pipeline.', 'Completely excluded and ignored by the W3C CSS Box Model mathematical calculation pipeline entirely.'],
            ['3. Curvature Support capability', 'Effortlessly bends, curves, and morphs into circles when exposed to the `border-radius` calculation.', 'Historically remained a rigid, sharp, ugly rectangle regardless of `border-radius` (fixed only very recently).'],
            ['4. Physical Offset distance', 'Permanently fused directly to the exact millimeter boundary of the padding box edge.', 'Can be physically pushed away into empty floating space using the bizarre `outline-offset` attribute.'],
            ['5. Micro Customization depth', 'Highly customizable; developers can color the top border red and the left border thick blue (`border-top-width`).', 'Highly rigid; developers cannot style individual sides separately; the outline must uniformly hug the whole node.'],
            ['6. Browsers Natively Injecting it', 'Applied strictly manually by UI designers trying to make pretty cards, thin lines, or distinct grid demarcations.', 'Injected brutally by browsers natively around text inputs to scream "THIS INPUT IS FOCUSED" to the user.'],
            ['7. The Accessibility Factor', 'Mostly a cosmetic painting tool with minimal ramifications on strict WCAG compliance audits.', 'The absolute backbone of Keyboard Accessibility; deleting it destroys the ability for keyboard users to surf the web.'],
            ['8. The Stacking Z-Axis', 'Sits logically under the text layer, forming the literal bounding container of the background paint.', 'Draws safely and harmlessly completely over the top of practically everything on the screen.'],
            ['9. The Nuclear Reset', '`border: 0;` or `border: none;` is a standard trick to strip ugly native buttons of their 1990s borders.', '`outline: none;`: The most famous, toxic, dangerous CSS anti-pattern in history that destroys web accessibility.'],
            ['10. GPU Animation efficiency', 'Animating a border-width forces the browser GPU to painfully recalculate layout math 60 times a second.', 'Animating outline thickness is significantly cheaper because layout math isn\'t violently shifting around it.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'Background color and Background image',
        'headers': ['Aspect', '`background-color` Property', '`background-image` Property'],
        'points': [
            ['1. Technical Source Material', 'A simple string representing CSS hex codes, RGB coordinates, HSL math, or named keywords (`red`).', 'A complex network URL pointing directly to external binaries (JPEG, WEBP, PNG) or internal SVG strings.'],
            ['2. Initial Deployment Latency', 'Instantaneous natively. The browser paints it the very nanosecond the CSSOM tree is generated.', 'Requires severe network latency; the UI box will sit completely naked for seconds while the photo downloads.'],
            ['3. Z-Index Layering Order', 'Sits at the ultimate dead-bottom lowest Z-axis slice of the element’s background painting stack.', 'Sits aggressively on top of the background-color layer, completely obliterating/hiding it if the image is opaque.'],
            ['4. The Literal CSS String Code', '`background-color: #2c3e50;`', '`background-image: url("landscape.webp");`'],
            ['5. The Guarantee of Coverage', 'Guaranteed mathematically to flawlessly paint 100% of the element’s padding and content boundaries.', 'Coverage predictability relies entirely on the complex interaction of `background-size` and `background-repeat` grids.'],
            ['6. CSS Transparency tricks', 'Easily rendered natively translucent via `rgba(0,0,0,0.5)` without damaging the legibility of inner text.', 'Cannot be rendered translucent via standard CSS organically; the raw binary image file must be edited in Photoshop first.'],
            ['7. The Bandwidth Tax', 'Costs identically 0 kilobytes of bandwidth; it is purely rapid text parsing logic.', 'Costs heavily; often taxes the user hundreds of kilobytes or pure megabytes of cellular data per image file.'],
            ['8. Comma-separated Arrays', 'A specific element is mathematically restricted to strictly ONE singular background color rule.', 'A specific element can enthusiastically accept dozens of layered background images separated effortlessly by commas.'],
            ['9. The Ultimate Fallback', 'Acts as the critical UI safety net; it displays instantly if the external image URL returns a 404 error.', 'Fails catastrophically and visibly if the server goes offline or the file name contains a tiny string typo.'],
            ['10. Rendering Gradients', 'Physically incapable of drawing gradients; restricted exclusively to flat, monochromatic sheets of solid tone.', 'CSS Gradients (linear, radial, conic) are bizarrely classified as background-images mathematically by the engine.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'Linear gradient and Radial gradient',
        'headers': ['Conceptual Difference', 'Linear Gradient Math', 'Radial Gradient Math'],
        'points': [
            ['1. The Geometric Vector', 'Color interpolates continuously along a straight, unbreakable geometric line vector or angled trajectory.', 'Color interpolates constantly expanding outward from a specific central geometric focal coordinate point.'],
            ['2. The Exact CSS Function', '`linear-gradient(...)`', '`radial-gradient(...)`'],
            ['3. Trajectory configuration', 'Aimed using specific geometry degrees (`180deg`) or logical human keywords (`to bottom right`).', 'Aimed using explicit shape keywords (`circle at top left`) or exact pixel coordinate plotting logic.'],
            ['4. The Resulting Shape', 'The shape of the gradient is inherently rigidly bound to the straight line vector intersection.', 'The shape expands organically as either a perfect `circle` or a warped stretching `ellipse` parameter.'],
            ['5. Interaction with Edges', 'Stretches endlessly to violently intersect the width and height walls of the rectangular DOM box.', 'Interacts softly with the edges of the box based on sizing algorithms like `closest-side` or `farthest-corner`.'],
            ['6. Aggressive Color Stops', 'Generates a harsh striped flag effect instantly if hard color stops are bunched mathematically together.', 'Generates a harsh target/bullseye effect instantly if hard color stops are bunched mathematically tightly together.'],
            ['7. The Visual Design trope', 'Considered excellent for establishing UI shadows, metallic sheens, or basic sunset sky backdrops.', 'Considered excellent for establishing 3D glowing orbs, spotlight vignettes, or glaring sun bursts.'],
            ['8. The Repeating pattern variant', '`repeating-linear-gradient(...)` generates aggressive diagonal striped barber poles layouts.', '`repeating-radial-gradient(...)` generates complex, hypnotic expanding ripple or target layouts.'],
            ['9. The Zero Calculation Origin', 'The default 0-degree angle vector natively fires straight up pointing to the absolute top of the sky.', 'The default 0% origin defaults perfectly to the geometric absolute center (`50% 50%`) of the box.'],
            ['10. Mathematical CPU Rendering', 'Slightly cheaper and faster to render mathematically for giant background container blocks.', 'Slightly more computationally expensive mathematically due to complex elliptical edge antialiasing geometry.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'background-position and background-size',
        'headers': ['Aspect', '`background-position` API', '`background-size` API'],
        'points': [
            ['1. The Core Objective', 'Instructs the rendering engine exactly WHERE to anchor the starting X/Y coordinate of the picture.', 'Instructs the rendering engine exactly HOW LARGE or small to compress/expand the physical picture.'],
            ['2. The Native Defaults', 'Defaults natively to the `0% 0%` coordinate origin (the absolute top-left corner of the DOM container).', 'Defaults natively to `auto` (meaning the exact real physiological pixel dimensions of the raw binary image).'],
            ['3. Accepted Variable Keywords', 'Ingests human-readable contextual words like `center`, `top`, `left`, `right`, `bottom`.', 'Ingests incredibly powerful scaling algebra formulas like the legendary `cover` and `contain`.'],
            ['4. The Cover/Contain paradigm', 'Applying `cover` to a positional coordinate throws a catastrophic parsing error instantly.', 'The absolute most heavily utilized properties for guaranteeing responsive hero banners stretch perfectly on phones.'],
            ['5. The Percentage Algebra logic', '`50% 50%` beautifully aligns the absolute dead-center of the image to the dead-center of the container box.', '`50% 50%` violently squashes the image to exactly half the width and half the height of the container’s dimensions.'],
            ['6. Sprite Sheet engineering', 'The absolute primary engine used to shift gigantic CSS sprite sheets left/right to reveal tiny hidden icons.', 'Infrequently used on sprite sheets, because scaling visually shatters the highly exacting 16x16 sprite grid math.'],
            ['7. The Endless Tiling matrix', 'Specifies the exact point where the originating master tile begins before it repeats endlessly into infinity.', 'Specifies exactly how gigantic or microscopic each individual repeating master tile is before the engine loops it.'],
            ['8. The Shorthand Ordering Law', 'Must relentlessly map FIRST (or directly before the slash) in the highly fragile background shorthand string.', 'Must ruthlessly map strictly AFTER the position slash in the shorthand string (e.g., `center / cover`).'],
            ['9. Pixel Value Consequences', '`10px 20px` shoves the image harmlessly 10px to the right and 20px towards the floor.', '`10px 20px` brutally murders the aspect ratio, forging a microscopic, warped 10x20 picture block.'],
            ['10. The Transform Mirror correlation', 'Functions practically identically to the modern CSS `transform: translate(X, Y)` coordinate engine output.', 'Functions practically identically to the modern CSS `transform: scale(X, Y)` spatial scaling engine output.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'Shorthand property and Individual property',
        'headers': ['Factor', 'CSS Shorthand Declarations', 'CSS Individual Declarations'],
        'points': [
            ['1. Line Count Efficiency', 'Massively condenses up to six related stylistic traits into one hyper-efficient single line of text.', 'Forces the developer to type a massive, verbose stack of 5-6 different lines of text for the exact same result.'],
            ['2. Syntax Example snippet', '`background: red url("img.jpg") no-repeat center/cover;`', '`background-color: red;` \\n `background-image: url("img.jpg");` \\n `background-repeat: no-repeat;`'],
            ['3. The Invisible Reset Risk', 'Any property you fail to declare in the string is instantly reset back to its strict, rigid browser default.', 'Omitted properties are completely safe and simply retain their previous cascading inheritance value permanently.'],
            ['4. The Cascade Collision', 'Writing `background: red;` will accidentally annihilate a previously defined `background-image` parameter.', 'Writing `background-color: red;` interacts peacefully, leaving the `background-image` parameter entirely unharmed.'],
            ['5. Grammatical Complexity', 'Extremely complex; demands memorizing exact ordering syntax rules (like the trailing slash string `position/size`).', 'Dead simple and idiot-proof; the property string inherently tells you exactly what the attached value does.'],
            ['6. Rapid Prototyping Velocity', 'Dramatically accelerates rapid prototyping sprints and global component boilerplate generation.', 'Painfully slow, tedious, and highly verbose for a senior developer to type out manually in bulk.'],
            ['7. @Media Query Overrides', 'Typically a horrendous nightmare to override just one specific piece of the logic cleanly inside a media query.', 'The absolute undisputed best practice for overriding highly specific component traits inside mobile media queries.'],
            ['8. Junior Legibility factor', 'Notoriously difficult for fresh junior developers to debug missing slashes or bad sequence ordering typos.', 'Extremely legible and readable for beginners scanning massive stylesheets logically top-to-bottom.'],
            ['9. Common CSS Workhorses', '`margin: 10px 5px`, `font: 12px/1.5 Arial`, `border: 1px solid black`, `transition: all 0.3s ease`.', '`margin-top: 10px`, `font-size: 12px`, `line-height: 1.5`, `border-width: 1px`, `transition-delay: 0.3s`.'],
            ['10. Internal Browser Computing', 'Parsed and expanded aggressively into their individual discrete properties by the rendering engine instantly.', 'Processed organically and natively exactly as written in the local DOM tree cascade arrays.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'Multiple background images and Single background image',
        'headers': ['Conceptual Difference', 'Multiple Background Arrays', 'Singular Background Instance'],
        'points': [
            ['1. Declaration Delimiter Mechanism', 'Demands stringing numerous distinct `url(...)` declarations separated cleanly by grammatical commas.', 'Constructed using one entirely standard `url(...)` parameter without any comma string delimiters.'],
            ['2. Z-Axis Elevation Sequence', 'The FIRST image declared in the comma list is physically painted at the absolute highest top layer, closest to the eyeball.', 'Simply stacks naturally and peacefully over the base `background-color` layer logically.'],
            ['3. Legacy Fallback Anxiety', 'Antiquated browsers (IE8) might aggressively drop the entire rule set if they fail to parse the comma array logic.', 'Guarantees maximum universally supported safety across literally every single browser engine ever created.'],
            ['4. Memory/GPU Render tax', 'Consumes significantly more graphical RAM and VRAM parsing and rendering massive parallax layers simultaneously.', 'Highly optimized, extremely cheap, and incredibly fast to render dynamically.'],
            ['5. The Blend-Mode Matrix', 'Can deeply utilize `background-blend-mode` to mix the images creatively (multiply, screen, overlay).', 'Physically incapable of blending with anything other than the monolithic base transparent background color.'],
            ['6. The Gradient/Photo trick', 'An incredibly popular architectural trick: layering a dark CSS linear-gradient OVER a bright JPEG photograph.', 'Requires hacking together a separate HTML wrapper `<div class="overlay">` if you want an image AND a gradient tint.'],
            ['7. Discrete Attribute manipulation', 'Demands defining complex comma-separated arrays for EVERY property: `background-position: center, top;`.', 'Demands one incredibly simple, isolated position coordinate parameter (e.g., `background-position: center;`).'],
            ['8. The Perfect Use Case', 'A lush 3D parallax mountain scene boasting foreground clouds, middle-ground trees, and a deep-background sky.', 'A generic, simple profile avatar ring picture or a standard, flat vector logo graphic.'],
            ['9. CSS Animation nightmares', 'Extremely volatile and nightmarish to try to animate multiple distinct graphic layers synchronously in a shorthand block.', 'Relatively simple and highly stable to animate the position coordinates smoothly over a timeframe.'],
            ['10. The Implementation Era spec', 'Pioneered during the massive CSS3 revolution specs specifically to handle advanced native graphics.', 'Universally supported and standardized since the dawning days of the CSS 1 specification in the late 90s.']
        ]
    }
]
