data = [
    {
        'section': 'CSS Fundamentals',
        'topic': 'Class selector and ID selector',
        'headers': ['Aspect', 'Class Selector', 'ID Selector'],
        'points': [
            ['1. Syntax Notation', 'Starts with a period or dot (e.g., `.button`).', 'Starts with a hash or pound symbol (e.g., `#header`).'],
            ['2. Specificity Weight', 'Medium specificity (10 points in standard CSS scoring).', 'High specificity (100 points in standard CSS scoring).'],
            ['3. Reusability context', 'Can be applied to an infinite number of elements on the same page.', 'Must be applied to strictly one single unique element per page.'],
            ['4. Multiple Assignments', 'An HTML element can have dozens of classes separated by spaces.', 'An HTML element can only have exactly one single ID string.'],
            ['5. Typical Architecture Role', 'Selecting repeatable UI components (cards, lists, utilities, typography).', 'Selecting massive, unique layout shells (the main nav, the footer wrapper).'],
            ['6. Override Difficulty', 'Easily overridden by placing another class selector lower in the stylesheet.', 'Extremely difficult to override cleanly without using `!important`.'],
            ['7. Speed/Performance', 'Slightly slower to calculate historically, though negligible in modern engines.', 'Historically the fastest CSS selector because it stops searching after finding one.'],
            ['8. JavaScript Coupling', 'Less risky if changed, as scripts often rely on IDs instead of classes.', 'Highly risky to rename in CSS because JS `getElementById` will instantly break.'],
            ['9. Fragment Links / URLs', 'Cannot be linked to directly from an external URL hash.', 'Can be linked via the URL hash (e.g., `website.com/#header` jumps down the page).'],
            ['10. BEM Methodology usage', 'The absolute foundation of BEM block/element naming conventions.', 'Strictly forbidden in BEM architecture to ensure component portability.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Element selector and Universal selector',
        'headers': ['Difference', 'Element Selector', 'Universal Selector'],
        'points': [
            ['1. Syntax Notation', 'Simply the literal name of the HTML tag itself (e.g., `p`, `h1`, `div`).', 'A literal asterisk symbol (`*`).'],
            ['2. Scope of Target', 'Selects only the specific type of HTML nodes named in the rule.', 'Selects absolutely every single node in the entire DOM tree indiscriminately.'],
            ['3. Specificity Weight', 'Low specificity (1 point in standard CSS scoring).', 'Zero specificity (0 points in standard CSS scoring).'],
            ['4. Primary Use Case', 'Setting foundational typography styles (all H1s are bold, all Ps have line-height).', 'Implementing CSS Resets (e.g., stripping default margins/padding from all bugs).'],
            ['5. Rendering Performance', 'Extremely fast and optimized rendering path in the browser.', 'Historically the slowest selector, as it forces the engine to parse every nested node.'],
            ['6. Override Hierarchy', 'Easily overwrites the universal selector natively due to 1 > 0 specificity.', 'Can only overwrite an element selector if `!important` is used (bad practice).'],
            ['7. Inheritance Dynamics', 'Sets explicit styles that child elements might inherit naturally.', 'Applies explicit styles to children directly, completely overriding their natural inheritance.'],
            ['8. Combination potential', 'Often combined with classes (e.g., `a.active`) to target link states.', 'Often combined to skip parents (e.g., `.card *` selects everything inside the card).'],
            ['9. Common Reset Rule', '`body { font-family: sans-serif; }`', '`*, *::before, *::after { box-sizing: border-box; }`'],
            ['10. Predictability', 'Highly predictable design pattern.', 'Often produces unpredictable side-effects on third-party widgets or deeply nested SVGs.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Inline CSS and External CSS',
        'headers': ['Factor', 'Inline CSS', 'External CSS'],
        'points': [
            ['1. Location of Code', 'Placed directly into the HTML tag via the `style="..."` attribute.', 'Placed entirely in a separate `.css` file linked in the HTML `<head>`.'],
            ['2. Code Reusability', 'Zero. It styles only that single, specific element it is attached to.', 'Infinite. The file can be linked to thousands of different HTML pages.'],
            ['3. Specificity / Power', 'The highest specificity standard (1000). Overrides almost all stylesheet rules.', 'Offers a perfectly balanced, scalable specificity cascade from 1 to 100.'],
            ['4. Complex Selectors', 'Impossible to use pseudo-classes (`:hover`), pseudo-elements, or structural logic.', 'Fully supports rich pseudo-classes, attribute selection, and sibling combinators.'],
            ['5. Web Responsiveness', 'Impossible to write `@media` queries directly inline for mobile adaptation.', 'The standard vehicle for delivering `@media` queries to ensure mobile designs.'],
            ['6. Cross-Site Caching', 'Causes massive HTML bloat; the browser downloads the same logic repeatedly.', 'Highly cached by the browser on the first visit, making all subsequent pages load instantly.'],
            ['7. Cleanliness (Separation)', 'Fundamentally violates the "Separation of Concerns" UI principle (Spaghetti Code).', 'Enforces strict separation of structure (HTML) from presentation (CSS).'],
            ['8. Team Collaboration', 'Nightmarish for teams, causing constant GIT merge conflicts in HTML templates.', 'Excellent for teams; UI designers edit CSS while devs write backend HTML logs.'],
            ['9. Security Policy (CSP)', 'Blocks easily by strict Content Security Policies mitigating inline injection attacks.', 'Highly secure and permitted natively by standard Content Security Policies.'],
            ['10. Dynamic State Handling', 'Often injected rapidly by Javascript frameworks (React, Vue) for dynamic position math.', 'Static files generated by preprocessors (Sass) or bundled by Webpack/Vite.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Relative and Absolute positioning',
        'headers': ['Concept', 'Relative Positioning', 'Absolute Positioning'],
        'points': [
            ['1. Normal Document Flow', 'The element remains strictly in the normal, natural document layout flow.', 'The element is completely ripped out and removed from the natural document flow.'],
            ['2. Shadow Space Metric', 'The space where the element *would* have originally been is kept empty, preserving layout.', 'Surrounding elements collapse together; no ghost/shadow space is reserved for it.'],
            ['3. Origin of Movement', 'Moves relative to its *own* original starting position in the static flow.', 'Moves relative to its nearest ancestor that has a position *other than static*.'],
            ['4. The Ancestor Hook', 'Functions perfectly regardless of its parent container’s positioning logic.', 'Fails and positions against the `<body>` viewport if no parent has `position: relative`.'],
            ['5. T/R/B/L Coordinates', '`top: 10px` pushes it 10px down from where it was naturally born.', '`top: 10px` locks it 10px from the ceiling of its relative parent container.'],
            ['6. CSS Value Syntax', '`position: relative;`', '`position: absolute;`'],
            ['7. Common Architecture Use', 'Used primarily to create the "bounding box" hook for absolute children inside it.', 'Used for UI overlays, floating badges, custom tooltips, X-close buttons.'],
            ['8. Width Computation', 'Defaults to 100% of its parent if it is a block-level element natively.', 'Shrinks to wrap its text content strictly unless explicitly given a `width: 100%`.'],
            ['9. Overlap Z-Index', 'Can establish a new z-axis stacking context if `z-index` is applied.', 'Almost always demands `z-index` management because it naturally overlaps other text.'],
            ['10. Margin Auto Centering', '`margin: 0 auto;` still perfectly centers the block horizontally.', '`margin: 0 auto;` fails unless combined with `left:0; right:0;` bounding box tricks.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Static and Fixed positioning',
        'headers': ['Aspect', 'Static Positioning', 'Fixed Positioning'],
        'points': [
            ['1. Default Status', 'The absolute default positioning state for every single HTML element initially.', 'An explicit, override positioning state that must be manually declared.'],
            ['2. Scrolling Attachment', 'Scrolls normally up and out of view as the user reads down the page.', 'Completely ignores scrolling; remains permanently glued to the glass of the screen.'],
            ['3. Coordinate References', 'Ignores `top`, `left`, `right`, and `bottom` properties entirely; they do absolutely nothing.', 'Moves exclusively based on `top`, `left`, `right`, and `bottom` properties.'],
            ['4. Document Flow', 'Represents the pure, structural document layout flow.', 'Completely removed from the document flow; hovering above everything else.'],
            ['5. The Positioning Context', 'Relies entirely on preceding sibling boxes to determine where it lands on screen.', 'Relies explicitly on the `viewport` (the actual browser window box) itself.'],
            ['6. Z-Index property', '`z-index` properties are completely ignored by static elements.', 'Readily accepts `z-index` properties to dictate stacking order against page content.'],
            ['7. CSS Value Syntax', '`position: static;`', '`position: fixed;`'],
            ['8. Standard UI Usage', 'Used for 95% of standard web text, paragraphs, basic images, and generic layout blocks.', 'Used for sticky navigation bars, "Back to top" corner buttons, cookie consent banners.'],
            ['9. CSS Transform Hack', 'Unaffected by bizarre parent transforms visually.', 'Will tragically break and act `absolute` if any parent element has a `transform` applied.'],
            ['10. Browser Repaint Cost', 'Very cheap for the browser to calculate during scrolling.', 'Expensive for the browser to constantly repaint over moving text, risking scroll-lag.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Margin and Padding',
        'headers': ['Point of Difference', 'Margin', 'Padding'],
        'points': [
            ['1. Box Model Location', 'Generates empty space completely OUTSIDE the element’s defined border.', 'Generates empty space INSIDE the element’s border, pushing content inward.'],
            ['2. Background Color Spread', 'The element’s background color/image will never spread into the margin area.', 'The element’s background color/image perfectly fills the padding area padding.'],
            ['3. Interaction Logic', 'Determines the distance or gap between two totally separate sibling elements.', 'Determines the breathing room between the element’s frame and its own internal text.'],
            ['4. Clicking/Hover Space', 'Margin space is completely dead; it cannot trigger hover or click events for the element.', 'Padding space is fully active; clicking the padding clicks the element/button perfectly.'],
            ['5. Negative Values Support', 'Commonly accepts negative values (`margin-top: -10px`) to deliberately overlap elements.', 'Absolutely rejects negative values; a browser ignores `padding: -10px` completely.'],
            ['6. The Collapse Phenomenon', 'Vertical margins routinely "collapse" into each other natively, taking the larger value.', 'Padding values never collapse; they stack logically and predictably 100% of the time.'],
            ['7. "Auto" Value Magic', '`margin: 0 auto;` perfectly centers block elements horizontally inside parents.', '`padding: auto;` does absolutely nothing; the value is entirely invalid CSS.'],
            ['8. Border Interaction', 'Surrounds the border invisibly from the outside world.', 'Sits sandwiched precisely between the inner textual content and the outer border.'],
            ['9. Box-Sizing Impact', 'Never included in the `width` calculation when `box-sizing: border-box` is active.', 'Absorbed into the `width` calculation seamlessly when `box-sizing: border-box` is active.'],
            ['10. Typical UI Application', 'Creating the 20px gap separating three distinct product cards in a flex grid.', 'Making a generic `<button>` look thick and clickable by adding 15px space around the text.']
        ]
    },
    {
        'section': 'CSS Fundamentals',
        'topic': 'Border and Outline',
        'headers': ['Difference', 'Border', 'Outline'],
        'points': [
            ['1. Layout Dimensions Impact', 'Physically adds width and height to the element, pushing other page content around.', 'Draws outside the element boundaries seamlessly; changing it never shifts the page layout.'],
            ['2. The Box Model Status', 'A core, fundamental component of the standard CSS Box Model calculations.', 'Completely excluded from the CSS Box Model dimensional mathematics.'],
            ['3. Shapes / Border-Radius', 'Perfectly curves and rounds its corners when `border-radius` is applied.', 'Historically remains a strict, rigid rectangle, ignoring `border-radius` (fixed in recent browsers).'],
            ['4. Offset Capabilities', 'Always firmly attached to the exact boundary of the padding box edge.', 'Can be pushed away from the element into free space using the `outline-offset` property.'],
            ['5. Individual Side manipulation', 'Can be customized per side easily (`border-top-color`, `border-left-width`).', 'Cannot be styled individually per side; it must wrap the entire object uniformly.'],
            ['6. Default Usage Context', 'Applied by developers deliberately to style cards, images, or distinct UI divisions.', 'Applied automatically by the browser engine around inputs to show keyboard "focus" states.'],
            ['7. Accessibility Implications', 'Purely cosmetic; has minimal impact on WCAG navigation validation norms.', 'Critical for WCAG compliance; informs keyboard users exactly what is currently focused.'],
            ['8. Transparency/Z-Axis', 'Resides below the content logically, bounding the exact background.', 'Drawn completely over the top of the content layer and surrounding elements risk-free.'],
            ['9. The "None" Hack', '`border: none;` is often used to reset ugly native `<button>` styles.', '`outline: none;` is an infamous bad practice that destroys keyboard navigation visibly.'],
            ['10. Animation Performance', 'Animating a border-width forces expensive browser layout reflows (lag).', 'Animating an outline thickness is significantly cheaper and smoother for the browser.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'Background color and Background image',
        'headers': ['Aspect', 'Background Color', 'Background Image'],
        'points': [
            ['1. Data Source Element', 'A simple CSS hex, RGB, HSL, or named color string format.', 'A complex network URL pointing to an external JPEG, PNG, WEBP, or an SVG file.'],
            ['2. Loading Time Latency', 'Instantaneous. The browser renders it the millisecond the CSS is parsed.', 'Requires network latency; the box might sit empty for seconds while the photo downloads.'],
            ['3. Layering Sequence', 'Sits at the absolute lowest, bottom Z-axis layer of the element’s background stack.', 'Sits explicitly on top of the background-color, physically hiding it if opaque.'],
            ['4. The CSS Property', '`background-color: #ff0000;`', '`background-image: url("hero.jpg");`'],
            ['5. Coverage Predictability', 'Guaranteed to perfectly cover 100% of the element’s padding and content boxes.', 'Predictability relies heavily on `background-size` and `background-repeat` rules.'],
            ['6. Opacity Handling Native', 'Can be made natively transparent via rgba() without affecting child text.', 'Cannot be made transparent via CSS natively; the raw image file must be edited.'],
            ['7. Bandwidth Constraint', 'Costs exactly 0 kilobytes of bandwidth; text parsing only.', 'Costs hundreds of kilobytes or megabytes of user data per image.'],
            ['8. Combination rules', 'A single element can only possess strictly ONE background color.', 'A single element can possess multiple layered background images separated by commas.'],
            ['9. Fallback Strategy', 'Acts as the critical ultimate fallback color if an image link breaks entirely.', 'Fails catastrophically if the server dies or the file name contains a spelling error.'],
            ['10. Gradient Nature', 'Cannot render gradients; limited exclusively to solid flat blocks of tone.', 'CSS Gradients (linear, radial) are technically classified as background-images by engines.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'Linear gradient and Radial gradient',
        'headers': ['Conceptual Difference', 'Linear Gradient', 'Radial Gradient'],
        'points': [
            ['1. Direction of Travel', 'Color transitions flow perfectly along a straight geometric line or angle.', 'Color transitions radiate outward from a central specific focal point.'],
            ['2. CSS Function Name', '`linear-gradient()`', '`radial-gradient()`'],
            ['3. Angle/Direction Syntax', 'Defined using angles (`45deg`) or keywords (`to bottom right`).', 'Defined using shape keywords (`circle at center`) or exact pixel coordinates.'],
            ['4. The Shape Metric', 'The shape is inherently bound to the straight line vector.', 'The shape expands as either a perfect `circle` or a stretching `ellipse`.'],
            ['5. Edge Behavior', 'Stretches endlessly across the width or height of the rectangular DOM box.', 'Hits the edges of the box based on sizing rules like `closest-side` or `farthest-corner`.'],
            ['6. Multi-color Stops', 'Creates a striped flag effect if hard color stops are bunched together.', 'Creates a target/bullseye effect if hard color stops are bunched tightly together.'],
            ['7. Visual Depth Metaphor', 'Excellent for creating UI shadows, metallic sheens, or basic sunset skies.', 'Excellent for creating 3D glowing orbs, spotlight effects, or sun bursts.'],
            ['8. Repeating variants', '`repeating-linear-gradient()` produces diagonal striped barber poles.', '`repeating-radial-gradient()` produces hypnotic expanding ripple patterns.'],
            ['9. Calculation Origin', 'The 0-degree vector natively points straight up to the top.', 'The 0% origin defaults perfectly to the geometric center (50% 50%).'],
            ['10. Browser Rendering', 'Slightly cheaper to render mathematically for giant background blocks.', 'Slightly more expensive mathematically due to elliptical edge antialiasing calculations.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'background-position and background-size',
        'headers': ['Aspect', 'background-position', 'background-size'],
        'points': [
            ['1. Primary Directive', 'Dictates exactly WHERE the starting coordinate of the image should be placed.', 'Dictates exactly HOW LARGE the actual image itself should be scaled to on screen.'],
            ['2. The Default State', 'Defaults natively to `0% 0%` (the top-left corner of the container box).', 'Defaults natively to `auto` (the exact real pixel dimensions of the raw image).'],
            ['3. Keyword Values', 'Accepts contextual words like `center`, `top`, `right`, `bottom`.', 'Accepts contextual scaling formulas like `cover` and `contain`.'],
            ['4. Cover/Contain Magic', 'Totally invalid to assign `cover` to positional coordinates.', 'The absolute most powerful and commonly used properties for responsive heroes.'],
            ['5. Percentage Mathematics', '`50% 50%` aligns the absolute center of the image to the center of the box.', '`50% 50%` squashes the image to exactly half the size of the container’s dimensions.'],
            ['6. CSS Sprite Sheets', 'The primary tool used to shift CSS sprite sheets left/right to show icons.', 'Rarely used on sprites, as scaling breaks the highly exact sprite grid mathematics.'],
            ['7. Tiling/Repeating', 'Determines where the originating tile starts before repeating endlessly.', 'Determines how gigantic each individual tile is before repeating endlessly.'],
            ['8. Shorthand Syntax rules', 'Always appears FIRST or directly before the slash in the background shorthand.', 'Must universally appear strictly AFTER the position slash (e.g., `center / cover`).'],
            ['9. Pixel Value Output', '`10px 20px` pushes the image 10px right and 20px down.', '`10px 20px` brutally destroys the aspect ratio, making a tiny 10x20 picture.'],
            ['10. Transform Equivalent', 'Acts identically to CSS `transform: translate(X, Y)` for backgrounds.', 'Acts identically to CSS `transform: scale(X, Y)` for backgrounds.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'Shorthand property and Individual property',
        'headers': ['Feature', 'CSS Shorthand Property', 'Individual CSS Property'],
        'points': [
            ['1. Line Count Efficiency', 'Condenses multiple related stylistic traits into one single line of code.', 'Requires a massive stack of 5-6 different lines of code for the same result.'],
            ['2. Example Usage', '`background: red url("img.jpg") no-repeat center/cover;`', '`background-color: red;` \\n `background-image: url("img.jpg");` \\n `background-repeat: no-repeat;`'],
            ['3. Omitting Values Risk', 'Any property you omit is instantly reset to its strict browser default.', 'Omitted properties simply retain their previous cascading value safely.'],
            ['4. The Reset Phenomenon', 'Writing `background: red;` will accidentally delete a previous background-image.', 'Writing `background-color: red;` leaves the background-image entirely intact.'],
            ['5. Syntax Complexity', 'Highly complex; requires memorizing exact ordering rules (e.g., position/size).', 'Dead simple; property names tell you exactly what the value does.'],
            ['6. Developer Speed', 'Dramatically speeds up rapid prototyping and global boilerplate writing.', 'Slow, tedious, and highly verbose to type manually.'],
            ['7. CSS Overrides later', 'Typically a nightmare to override just one piece logically in a media query.', 'The absolute best practice for overriding specific traits inside media queries.'],
            ['8. Maintainability factor', 'Harder for junior developers to debug missing slashes or bad ordering.', 'Extremely readable for beginners scanning stylesheets logically.'],
            ['9. Common CSS Targets', '`margin: 10px 5px`, `font: 12px/1.5 Arial`, `border: 1px solid black`.', '`margin-top`, `font-size`, `line-height`, `border-width`.'],
            ['10. Browser Processing', 'Parsed and expanded into individual properties by the engine instantly.', 'Processed natively exactly as written in the DOM tree cascades.']
        ]
    },
    {
        'section': 'Background & Styling',
        'topic': 'Multiple background images and Single background image',
        'headers': ['Concept', 'Multiple Background Images', 'Single Background Image'],
        'points': [
            ['1. Syntax Delimiter', 'Requires stringing multiple `url(...)` declarations separated directly by commas.', 'Defined using one standard `url(...)` string without commas.'],
            ['2. The Z-Axis Stacking Order', 'The FIRST image in the comma list is painted at the top, closest to the user.', 'Stacks naturally over the background-color layer logically.'],
            ['3. Fallback Complexity', 'Older browsers might drop the entire rule if they fail to parse comma stacks.', 'Maximum universally supported safety across all browsers forever.'],
            ['4. Memory/Performance', 'Uses significantly more RAM and VRAM rendering layers simultaneously.', 'Highly optimized and cheap to render.'],
            ['5. Layered Blending', 'Can utilize `background-blend-mode` to mix the images creatively (multiply, screen).', 'Cannot blend with anything other than the base background color.'],
            ['6. Gradient Combinations', 'Extremely popular trick: layer a dark CSS gradient OVER a bright photograph.', 'Requires a separate HTML wrapper div if you want an image AND a gradient tint.'],
            ['7. Individual positioning', 'Requires defining comma-separated lists for `background-position: center, top;`.', 'Requires one simple position coordinate (e.g., `background-position: center;`).'],
            ['8. Use Case Scenario', 'A parallax mountain scene with front clouds, middle trees, and back sky.', 'A basic profile avatar picture or a simple flat logo graphic.'],
            ['9. Animating the Stack', 'Nightmarish to try to animate multiple distinct layers in a shorthand block.', 'Relatively simple to animate position coordinates over time.'],
            ['10. CSS Introduction Era', 'Introduced during the CSS3 revolution for advanced graphics.', 'Supported since the dawning days of CSS 1 in the 90s.']
        ]
    }
]
