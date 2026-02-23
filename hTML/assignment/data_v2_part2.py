data = [
    {
        'section': 'Tables & Lists',
        'topic': 'Ordered list and Unordered list',
        'headers': ['Feature', 'Ordered List', 'Unordered List'],
        'points': [
            ['1. Concept', 'A list where the sequence of the items is fundamentally important.', 'A list where the items can be jumbled without losing the core meaning.'],
            ['2. Default Browser Style', 'Items are preceded by numerical digits (1, 2, 3).', 'Items are preceded by circular solid black bullets.'],
            ['3. HTML Elements', 'Initiated with the `<ol>` tag.', 'Initiated with the `<ul>` tag.'],
            ['4. Best Use Cases', 'Step-by-step cooking recipes, legal document clauses, top-10 rankings.', 'Shopping lists, feature highlights, standard website navigation menus.'],
            ['5. Semantic Value', 'Tells search engines and parsers that a strict progression exists.', 'Groups items equally with no implied priority or timeline.'],
            ['6. Customizing Markers', 'CSS `list-style-type` accepts lower-alpha, upper-roman, decimal.', 'CSS `list-style-type` accepts square, circle, disc, or image URLs.'],
            ['7. Internal Tagging', 'Requires `<li>` (list item) tags for every entry.', 'Requires `<li>` (list item) tags for every entry.'],
            ['8. Screen Reader Support', 'Announces "list with X items", then dictates the number for each line.', 'Announces "list with X items", then simply says "bullet" for each line.'],
            ['9. Counting Attributes', 'Supports the `start="5"` attribute to begin counting from five.', 'Has no concept of a starting number or reversed counting.'],
            ['10. Reversing Flow', 'HTML5 introduced `<ol reversed>` to count downwards.', 'Cannot be reversed natively because it lacks numerical sequence.']
        ]
    },
    {
        'section': 'Tables & Lists',
        'topic': '<ul> and <ol>',
        'headers': ['Aspect', '<ul> Tag', '<ol> Tag'],
        'points': [
            ['1. Acronym Meaning', 'Unordered List.', 'Ordered List.'],
            ['2. Visual Rendering Metaphor', 'Bullet points.', 'Numbers or letters.'],
            ['3. HTML5 Attribute: "start"', 'Completely invalid and ignored if applied.', 'Valid attribute used to shift the starting sequence counter.'],
            ['4. HTML5 Attribute: "type"', 'Historically used for shapes (square/circle), but deprecated in favor of CSS.', 'Still sometimes used (`type="a"`) directly in HTML for fast alphabetic lists.'],
            ['5. HTML5 Attribute: "reversed"', 'Does nothing.', 'Flips the numbering sequence (e.g., 3, 2, 1).'],
            ['6. CSS Default Rules', 'Creates a left padding and applies `list-style-type: disc;`.', 'Creates a left padding and applies `list-style-type: decimal;`.'],
            ['7. The <li> "value" attribute', 'Ignored by the browser if added to a child <li> tag.', 'Allows deliberately forcing a list item to be a specific number out of sequence.'],
            ['8. Primary Design Application', 'Forms the invisible skeleton structure for almost all modern NavBar links.', 'Used for Terms of Service documents or multi-step checkout timelines.'],
            ['9. Permitted Children Rules', 'Can strictly only contain `<li>`, `<script>`, or `<template>` as direct children.', 'Can strictly only contain `<li>`, `<script>`, or `<template>` as direct children.'],
            ['10. Hierarchical Nesting', 'Can be nested inside `<ol>` tags or other `<ul>` tags infinitely.', 'Can be nested inside `<ul>` tags or other `<ol>` tags infinitely.']
        ]
    },
    {
        'section': 'Tables & Lists',
        'topic': '<td> and <th>',
        'headers': ['Point of Difference', '<td> Element', '<th> Element'],
        'points': [
            ['1. Meaning in Table', 'Table Data cell (the actual payload of the matrix).', 'Table Header cell (the label categorizing the matrix data).'],
            ['2. Default Font Styling', 'Rendered with a normal standard font weight.', 'Rendered natively with a bold, heavy font weight.'],
            ['3. Default Alignment', 'Browsers align text inside to the left edge by default.', 'Browsers align text inside to the absolute center by default.'],
            ['4. Semantic Importance', 'Just raw data; holds little meaning without context from headers.', 'Extremely important structural markers explaining columns/rows.'],
            ['5. The Accessibility Scope', 'Rarely requires special accessibility attributes.', 'Heavily relies on the `scope="col"` or `scope="row"` attributes for blind users.'],
            ['6. Placement in Structure', 'Typically heavily populates the `<tbody>` container.', 'Primarily found in the `<thead>` or the first column of the `<tbody>`.'],
            ['7. Screen Reader Handling', 'Read simply as the value string ("42", "Alice").', 'Read before the data cell as context ("Age: 42", "First Name: Alice").'],
            ['8. Quantity Ratio', 'A massive 100x100 table has 9,900 `<td>` elements.', 'A massive 100x100 table usually only has ~100 to ~200 `<th>` elements.'],
            ['9. CSS Border Rules', 'Takes borders nicely, usually forming the thin inner grid lines.', 'Often styled with thicker bottom borders to separate the title visually.'],
            ['10. Input elements', 'Extremely common to place text boxes or buttons inside for actionable rows.', 'Usually strictly textual text labels; rarely contains inputs.']
        ]
    },
    {
        'section': 'Tables & Lists',
        'topic': 'colspan and rowspan',
        'headers': ['Aspect', 'colspan Strategy', 'rowspan Strategy'],
        'points': [
            ['1. Dimensional Stretch', 'Expands a single cell across the X-axis (left-to-right).', 'Expands a single cell down the Y-axis (top-to-bottom).'],
            ['2. Target Metric', 'Merges columns together horizontally.', 'Merges rows together vertically.'],
            ['3. HTML Code impact', 'Requires you to delete neighboring sibling cells in the same `<tr>`.', 'Requires you to delete neighboring cells in the matching index of the NEXT `<tr>` tags.'],
            ['4. Visual Example', 'A huge title row spanning all 5 columns at the top of an Excel sheet.', 'A category name ("Fruits") on the left spanning down 3 rows (Apple, Banana, Pear).'],
            ['5. Attribute Default', 'If not explicitly typed, the inherent value is "1".', 'If not explicitly typed, the inherent value is "1".'],
            ['6. Maximum Limit', 'Specification caps it at 1000 to prevent infinite rendering calculations.', 'Setting the value to "0" spans the cell entirely to the end of the `tbody` section.'],
            ['7. Mental Mapping Logic', 'Easy to visualize; affects only the current line of code you are reading.', 'Hard to debug manually; you must trace the effect downward across multiple lines of code.'],
            ['8. Grid CSS Equivalent', 'Mirrored conceptually by `grid-column: span 3;` in modern layouts.', 'Mirrored conceptually by `grid-row: span 3;` in modern layouts.'],
            ['9. Mobile Responsiveness', 'Creates wide layouts resisting compression on small mobile screens.', 'Creates extremely tall, weirdly spaced layouts if columns wrap improperly on phones.'],
            ['10. Applicability', 'Works on both `<td>` and `<th>` elements.', 'Works equally well on both `<td>` and `<th>` elements.']
        ]
    },
    {
        'section': 'Tables & Lists',
        'topic': 'Nested list and Definition list',
        'headers': ['Concept', 'Nested List Strategy', 'Definition List Strategy (<dl>)'],
        'points': [
            ['1. Structural Foundation', 'Placing a completely new `<ul>` inside an existing `<li>`.', 'Using a `<dl>` tag containing paired `<dt>` and `<dd>` elements.'],
            ['2. Purpose Model', 'Used for multi-tiered trees of data or drop-down submenu systems.', 'Used to map distinct terms to their respective explanatory descriptions.'],
            ['3. Element Sibling Logic', 'Level 2 lists are visually and structurally subordinate to Level 1 items.', 'Terms and descriptions sit exactly at the same sibling level in the DOM.'],
            ['4. Typical Styling Output', 'Sub-lists are heavily indented and given a new bullet shape (like a hollow circle).', 'The Definition Term is bolded, and the Description is slightly indented below it.'],
            ['5. Semantic Meaning', 'Parent-child hierarchy classification.', 'Key-value mapping associations (Dictionary style).'],
            ['6. Required Coding', 'Requires wrapping everything meticulously inside `<li>` nodes.', 'No `<li>` tags used; relies purely on alternating `<dt>` and `<dd>` tags.'],
            ['7. Document Outlines Examples', 'Multi-level table of contents (1. Intro > 1.1 Scope > 1.2 History).', 'Frequently Asked Questions (FAQ: Question 1 > Answer 1).'],
            ['8. CSS Selectors depth', 'Can result in notoriously deep selectors (`nav ul li ul li a`).', 'Very flat selector architecture (`dl dt { color: blue; }`).'],
            ['9. Screen Reader Interaction', 'Aids users by announcing "List inside list, level 2".', 'Aids users by distinguishing between "Term" and "Definition".'],
            ['10. Multiplicity', 'Can nest infinitely deep (Level 3, Level 4...) natively.', 'Typically remains a flat, single-level map of paired values.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'Class and ID attributes',
        'headers': ['Factor', 'Class Attribute', 'ID Attribute'],
        'points': [
            ['1. Usage Quantity rule', 'Non-unique. Can be stamped on a million different elements on the same page.', 'Absolutely Unique. Must only exist once per single HTML document.'],
            ['2. CSS Selection Symbol', 'Targeted in stylesheets using a leading dot (e.g., `.active`).', 'Targeted in stylesheets using a leading hash (e.g., `#main-logo`).'],
            ['3. JS Selection Strategy', 'Retrieved via `document.querySelectorAll()` or `getElementsByClassName()`.', 'Retrieved swiftly via `document.getElementById()`.'],
            ['4. CSS Specificity Power', 'Middle-tier power. Worth 10 points in the specificity cascade.', 'Top-tier power. Worth 100 points, easily crushing class rules.'],
            ['5. Multiple applications', 'You can string them together: `<div class="box red shadow">`.', 'You cannot string them. `<div id="box red">` breaks the identifier entirely.'],
            ['6. Form Label mapping', 'The `<label for="...">` attribute absolutely cannot map to a class.', 'The `<label for="...">` attribute must map perfectly to the input\'s ID.'],
            ['7. URL Fragment Linking', 'Cannot be the target of a jump-link (e.g., `page.html#.my-section` fails).', 'Perfect for anchor jumps (e.g., `page.html#footer` scrolls down instantly).'],
            ['8. Design System usage', 'The core backbone for styling utility components (React, Tailwind, Bootstrap).', 'Usually frowned upon for styling in modern frameworks due to strict rigidity.'],
            ['9. Javascript event hooks', 'Used to trigger visual state changes (like appending an `.is-open` class).', 'Often strictly reserved by Javascript engineers to hook complex logic without CSS interference.'],
            ['10. BEM Methodology', 'All styling relies 100% on class names under the BEM block-element system.', 'Excluded completely from BEM styling conventions.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'Global attributes and Event attributes',
        'headers': ['Conceptual Difference', 'Global Attributes', 'HTML Event Attributes'],
        'points': [
            ['1. Foundational Concept', 'Properties that identify, style, or configure the state of an element.', 'Hooks built into the HTML intentionally waiting for a user action to occur.'],
            ['2. Examples in HTML', '`id`, `class`, `style`, `hidden`, `tabindex`, `data-*`.', '`onclick`, `onmouseenter`, `onkeyup`, `onformsubmit`.'],
            ['3. Scope of Elements', 'Valid globally on practically every single standard HTML5 element.', 'Variable validity; `onchange` makes no sense on a `<div>` tag, only on inputs.'],
            ['4. JS Execution Requirement', 'Useful without Javascript (they power CSS logic and Accessibility).', 'Completely worthless and dead if Javascript is disabled in the browser.'],
            ['5. Time of Evaluation', 'Applied by the engine the moment the DOM parses the element.', 'Evaluated and executed exclusively at the exact millisecond the event fires.'],
            ['6. Modern Architecture standard', 'Used incessantly in literally every HTML file ever written.', 'Considered a "Bad Practice" today; modern devs use `addEventListener()` instead.'],
            ['7. Security (CSP risk)', 'Generally safe metadata that passes Content Security Policies.', 'Often aggressively blocked by strict CSPs because they represent inline code execution risks.'],
            ['8. CSS Hooking', 'Highly useful for styling: `div[hidden] { display: none; }`.', 'Virtually never used as CSS selector hooks.'],
            ['9. ARIA context', 'Crucial attributes for structuring screen reader accessibility (`aria-hidden`).', 'Can create major accessibility traps if hovering requires a mouse exclusively.'],
            ['10. Transient Nature', 'States remain semi-permanent descriptions of the element.', 'Action pathways that exist only fleetingly during interaction bursts.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'data-* attributes and Custom attributes',
        'headers': ['Aspect', 'data-* Attributes Standard', 'Arbitrary Custom Attributes'],
        'points': [
            ['1. HTML5 Validity', 'Completely valid under W3C HTML5 specifications for custom data injection.', 'Fundamentally invalid; throws warnings when run through the W3C checker.'],
            ['2. Syntax requirements', 'Must strictly begin with the prefix `data-` (e.g., `data-product-id="55"`).', 'Can be literally any made up word (e.g., `product_id="55"`, `foo="bar"`).'],
            ['3. JS API Convenience', 'Accessible via a built-in highly optimized API: `element.dataset.productId`.', 'Must be queried via the clunky `element.getAttribute("product_id")` string extraction.'],
            ['4. The CamelCase conversion', 'The `dataset` API automatically converts dashes into camelCase variables.', 'No automatic translation occurs; you must use the exact string identifier.'],
            ['5. Core Concept', 'Designed specifically for passing metadata between HTML and Javascript elegantly.', 'Often a sign of a Junior developer lacking knowledge of the `data-*` specs.'],
            ['6. Browser Render immunity', 'Engine natively understands to ignore it, guaranteeing layout stability.', 'Browser ignores it, but unknown future HTML updates could suddenly conflict with your made-up word.'],
            ['7. Frontend Frameworks view', 'Vue, Angular, and React read and compile `data-*` metadata flawlessly.', 'React often complains in the console if it detects unknown, non-standard DOM properties.'],
            ['8. CSS Interactions', 'Perfectly safe to style against: `.card[data-theme="dark"] { ... }`.', 'Fragile to style against logic-wise.'],
            ['9. Document Size Impact', 'Slightly longer syntax to type manually.', 'Slightly shorter but at the heavy cost of breaking compliance.'],
            ['10. Final Verdict', 'The one and only correct way to inject non-visible data into DOM nodes.', 'A sloppy practice that violates the predictability of the DOM hierarchy.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'Inline CSS and Internal CSS',
        'headers': ['Factor', 'Inline CSS Methodology', 'Internal CSS Methodology'],
        'points': [
            ['1. Implementation Target', 'Injected straight into the opening tag of a specific HTML element.', 'Written inside a specialized `<style>` block placed up in the document `<head>`.'],
            ['2. The Attribute used', 'The `style="..."` attribute (e.g., `<p style="margin: 0;">`).', 'The `<style>` paired tag block.'],
            ['3. Reusability context', 'Abysmal. It uniquely targets only that exact single text block.', 'Moderate. A class written once can fix 50 buttons simultaneously on that page.'],
            ['4. Specificity Hammer', 'Possesses insane specificity (1000 points), smashing external rule sets.', 'Acts as standard specificity, allowing complex cascading mathematical interactions.'],
            ['5. The Pseudo limitation', 'Simply impossible to target hover states (`:hover`) or focus states inline.', 'Easily handles `:hover`, `:after`, and complex descendant nesting logic.'],
            ['6. Mobile Web responsivity', 'Literally impossible to write a Media Query breakpoint inline.', 'Fully supports robust Media Queries to trigger iPad and Phone layouts.'],
            ['7. Code Cleanliness (HTML bloat)', 'Destroys the HTML structure, rendering the document extremely difficult to read.', 'Keeps the `<body>` HTML clean, shoving the styling math up into the head.'],
            ['8. Security Context', 'Often the victim of strict Content Security Policies blocking `unsafe-inline`.', 'Also vulnerable, but slightly easier to whitelist via Nonce hashing mechanisms.'],
            ['9. JS Framework Context', 'A standard way React updates highly dynamic math (like scrolling positions).', 'Often generated by toolchains and injected into the head dynamically.'],
            ['10. When to use manual writing', 'Only for 10-second debugging in the browser inspector tool or HTML emails.', 'For extremely small single-page projects with zero intention of growing.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'Internal CSS and External CSS',
        'headers': ['Difference', 'Internal CSS Strategy', 'External CSS Strategy'],
        'points': [
            ['1. File Integration', 'Lives permanently inside the `.html` file sharing the same text document.', 'Decoupled entirely into a standalone `.css` file linked remotely.'],
            ['2. The Linkage Tag', 'Requires nothing; simply wraps the code in `<style></style>`.', 'Requires `<link rel="stylesheet" href="main.css">` to function.'],
            ['3. Multi-page Reusability', 'Code gets trapped on one page. 50 pages requires copying it 50 times.', 'One file controls 50 pages; updating the file instantly styles the whole website.'],
            ['4. Client-side Caching', 'Downloads redundantly every single time the user clicks a new page.', 'Cached instantly on the very first visit, drastically saving bandwidth later.'],
            ['5. The Separation of Concerns', 'Violates architecture rules by mixing structure with aesthetic configuration.', 'Achieves textbook separation of concerns, the gold standard of engineering.'],
            ['6. Load Precedence', 'Usually overrides identical external rules if the `<style>` block sits below the `<link>`.', 'Provides the foundational baseline design language for the application.'],
            ['7. Version Control (GIT)', 'Often causes merge conflict hell when teammates edit the design and the text body concurrently.', 'Allows the UI designer to operate seamlessly in one file while devs write HTML in another.'],
            ['8. Initial Payload Size', 'Makes the primary `.html` file significantly heavier to download initially.', 'Keeps the `.html` file microscopic and lighting fast to parse.'],
            ['9. CSS Preprocessors (SaaS/LESS)', 'Not conducive to complex Sass compiling workflows easily.', 'The intended target destination for advanced Webpack/Vite CSS bundling pipelines.'],
            ['10. Professional Standard', 'Seen primarily in legacy coding tutorials or minimalist isolated code examples.', 'The absolute undisputed standard for 100% of medium-to-large web platforms.']
        ]
    }
]
