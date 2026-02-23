data = [
    {
        'section': 'HTML5 Features',
        'topic': 'Semantic and Non-semantic elements',
        'headers': ['Conceptual Difference', 'Semantic Tag Strategy', 'Non-Semantic Tag Strategy'],
        'points': [
            ['1. Core Meaning', 'Elements that possess an intrinsic, globally understood purpose describing their cargo.', 'Generic wrappers that offer absolutely zero context about their internal cargo.'],
            ['2. Element Pool', '`<article>`, `<nav>`, `<aside>`, `<figure>`, `<footer>`.', '`<div>`, `<span>`, `<b>`, `<br>`, `<hr>`.'],
            ['3. Search Engine Optimization (SEO)', 'Crawlers map out the skeleton of the site effectively, boosting rankings.', 'Crawlers fall blind, treating all text inside as an undifferentiated mass.'],
            ['4. Web Accessibility Factor', 'Screen readers natively parse them into "Landmarks" for visually impaired navigation.', 'Screen readers ignore them completely, reading massive unbroken streams of text.'],
            ['5. Web 2.0 vs Web 3.0', 'The backbone of the modern, structured, intelligent web document.', 'The backbone of the messy, CSS-driven "div soup" era of the early internet.'],
            ['6. Developer Legibility', 'Code is self-documenting (e.g., `<nav>` tells you instantly it contains links).', 'Code requires hunting through class names (e.g., `<div class="lnks-cont">`).'],
            ['7. The Document Outline Algorithm', 'Directly builds the hierarchical flowchart tree of the webpage reading order.', 'Utterly invisible to the W3C outlining algorithm mechanics.'],
            ['8. Direct CSS Naming', 'Allows for elegant CSS rules: `article p { font-size: 16px; }`.', 'Forces messy CSS selectors: `.article-container .text-block p { ... }`.'],
            ['9. The ARIA redundancy', 'Natively contains roles; adding `role="navigation"` to `<nav>` is redundant.', 'Demands manually adding `role="presentation"` or `role="group"` constantly.'],
            ['10. Recommended Usage Paradigm', 'Ought to be used whenever a structural block has an identifiable thematic name.', 'Should solely be used as a final resort for styling hooks when no meaning exists.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'localStorage and sessionStorage',
        'headers': ['Aspect', 'localStorage API', 'sessionStorage API'],
        'points': [
            ['1. Data Expiration Timeline', 'Permanent persistence; the data survives browser restarts and OS reboots entirely.', 'Transient persistence; data is destroyed the second the active window/tab is closed.'],
            ['2. Cross-Tab Origin Sharing', 'Perfectly synced across 50 open tabs assuming they all share the exact same `https` origin.', 'Strictly isolated to its single tab; even duplicating the tab spawns a fresh empty session.'],
            ['3. Typical Application State', 'Storing user-chosen dark mode preferences, language toggles, or persistent cart IDs.', 'Storing multi-step wizard form progress, temporary filters, or single-use security tokens.'],
            ['4. The Expiration Mechanism', 'Cannot be given a TTL (Time To Live); must be explicitly deleted by `removeItem()`.', 'Automatically collected and destroyed by the browser\'s garbage system upon the "unload" event.'],
            ['5. Storage Quota Limits', 'Generally caps out at a generous 5 Megabytes of stringified data per domain.', 'Also caps out identically at around 5 Megabytes of stringified data per domain territory.'],
            ['6. Accepted Data Format', 'Requires `JSON.stringify()` because it strictly only stores primitive string characters.', 'Also requires `JSON.stringify()` because it strictly only stores primitive strings.'],
            ['7. Function Calls', 'Accessed seamlessly via `window.localStorage.getItem("key")`.', 'Accessed seamlessly via `window.sessionStorage.getItem("key")`.'],
            ['8. Event Broadcasting', 'Fires a global `storage` event broadcast to *other* tabs when a value mutates.', 'Fires absolutely no `storage` events to other tabs, maintaining its silent isolation.'],
            ['9. XSS Security Vector', 'Extremely dangerous if storing Auth JWTs; XSS scripts steal them permanently.', 'Also vulnerable to XSS theft, but the attack window shrinks significantly when the tab closes.'],
            ['10. Network Protocol Overhead', 'Zero bandwidth cost; unlike cookies, this data never flies across the HTTP headers.', 'Zero bandwidth cost; never sent to the backend server automatically.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Web Workers and JavaScript functions',
        'headers': ['Feature', 'Web Worker Threads', 'Main JavaScript Functions'],
        'points': [
            ['1. Code Execution Lane', 'Processes heavy logic entirely in a separate, isolated OS background thread.', 'Processes logic rigidly in the main, single-threaded browser UI queue.'],
            ['2. The UI Freezing effect', 'Intense "for" loops of 1,000,000 iterations will never lock the user\'s scrolling.', 'A massive "for" loop will instantly freeze the webpage, causing "Page Unresponsive" popups.'],
            ['3. The DOM Accessibility Rule', 'Absolutely strictly forbidden from touching the `document` or manipulating HTML tags.', 'Possesses total, unfettered access to parse, edit, and destroy DOM elements at will.'],
            ['4. The Message Bridge', 'Replies to the main app solely using asynchronous `postMessage()` events.', 'Returns values instantly and synchronously via the standard `return` stack.'],
            ['5. Instantiation Complexity', 'Requires generating a wholly separate `.js` script file to initialize `new Worker()`.', 'Written literally anywhere within the current script block instantly.'],
            ['6. Global "Window" State', 'The global `this` context points safely to `DedicatedWorkerGlobalScope`.', 'The global `this` context terrifyingly points to the massive `window` object.'],
            ['7. Industry Use Cases', 'Crunching massive AI datasets, resizing hi-res images, running complex physics engines.', 'Hooking up button clicks, validating form text, updating CSS animations.'],
            ['8. Network API access', 'Can effortlessly run `fetch()` calls or web socket connections in the background.', 'Can effortlessly run `fetch()` calls to gather JSON from a REST API.'],
            ['9. Data Cloning Penalty', 'Variables sent to a worker are cloned deeply, which costs RAM and time on huge JSON payloads.', 'Variables are passed around ultra-fast via simple memory reference pointers.'],
            ['10. Termination Control', 'Can be ruthlessly killed by the main thread calling `.terminate()` midway through work.', 'Practically impossible to kill externally once called until it yields the thread return.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Canvas and SVG',
        'headers': ['Difference', 'HTML5 `<canvas>` Technology', 'Standard `<svg>` Technology'],
        'points': [
            ['1. Graphical Rendering Model', 'Bitmapped/Raster based. Draws literal colored pixels onto a flat surface memory map.', 'Vector/Math based. Draws crisp lines and shapes using pure geometric math logic.'],
            ['2. Scaling and Zooming', 'Terrible scaling. If zoomed in 200%, the image turns into a blurry, pixelated mosaic.', 'Perfect scaling. Zooming in 1,000% results in smooth, razor-sharp pristine lines.'],
            ['3. DOM Interactivity', 'A literal black box. The shapes inside do not exist to the HTML Document Object Model.', 'Every single circle, line, and square is an independent node sitting in the DOM tree.'],
            ['4. Attaching Javascript Events', 'Incredibly hard to bind an `onclick` to a drawn circle because the circle is just painted pixels.', 'Trivially easy to bind an `onclick` to an `<svg circle>` tag exactly like a button.'],
            ['5. Performance Benchmarks', 'Blisteringly fast. Can easily render 10,000 moving particles per frame at 60 FPS natively.', 'Crawls to a halt if overloaded. Rendering 10,000 DOM nodes will crash the browser.'],
            ['6. Authoring Syntax', 'Requires writing 100% JavaScript code instructions to draw literally anything (e.g., `ctx.stroke()`).', 'Written directly in the HTML layout using XML-style tags (`<rect width="10">`).'],
            ['7. SEO & Screen Readers', 'Utterly invisible; requires massive ARIA fallback text networks to explain what was drawn.', 'Highly accessible. Contains `<title>` and `<desc>` strings instantly readable by screen apps.'],
            ['8. Styling via Stylesheets', 'Ignores CSS entirely. Colors are mixed and set using JS context methods only.', 'Accepts generic CSS cleanly: `.line { stroke: red; stroke-width: 5px; }`.'],
            ['9. Prime Target Application', 'High-end 3D WebGL video games, real-time data visualizers, complex generative art.', 'Standard corporate logos, scalable interface icons, animated infographics, map diagrams.'],
            ['10. Text Selection', 'Text rendered inside becomes glued pixels; users cannot highlight or copy sentences.', 'Text holds its semantic properties; users can easily highlight and copy sentences to clipboard.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Responsive Web Design and Adaptive Design',
        'headers': ['Conceptual Difference', 'Responsive UI Engineering', 'Adaptive UI Engineering'],
        'points': [
            ['1. Layout Mechanics', 'A completely fluid water-like grid that stretches infinitely across any strange dimension.', 'A rigid set of pre-built puzzle grids snapped to specific, hardcoded device dimensions.'],
            ['2. Code Under the Hood', 'Leverages relative percentages (`%`), viewport units (`vw`), and fluid flexboxes.', 'Leverages server-side User-Agent detection or discrete JS screen sniffing to swap templates.'],
            ['3. Maintenance Burden', 'One singular CSS master file to debug, test, maintain, and inevitably deploy.', 'Requires updating and testing three or more completely different distinct layout wireframes.'],
            ['4. The "In-Between" Screen sizes', 'Handles weird tablets (e.g., exactly 834px wide) flawlessly without a hitch.', 'Fails miserably on weird sizes, trapping the layout awkwardly until the next threshold is hit.'],
            ['5. Payload Delivery Speed', 'Downloads the entire bulky CSS logic for mobile, tablet, and desktop regardless of the active device.', 'Much faster; intelligently serves *only* the microscopic mobile code file to the mobile phone.'],
            ['6. Precision Control for Designers', 'Forces designers to compromise, accepting that text will wrap strangely on odd monitors.', 'Grants pixel-perfect authoritarian control; the designer dictates exactly what 320px looks like.'],
            ['7. Industry Ubiquity', 'The standard. Adopted by Bootstrap, Tailwind, and 98% of modern front-end engineers.', 'A dying art. Used primarily by massive legacy banking systems with un-updatable core code.'],
            ['8. The Browser Resize Test', 'Dragging the browser corner smoothly morphs the layout dynamically in real-time.', 'Dragging the browser corner does nothing until suddenly an entirely new layout snaps into place.'],
            ['9. Prototyping Speed', 'Relatively quick to throw a flexbox layout onto a canvas and call it mobile-ready.', 'Painfully slow to mock up, approve, and code 6 different exact screen breakpoints.'],
            ['10. Search Engine SEO Favoritism', 'Actively praised and required by Google\'s mobile-first core indexing algorithms.', 'Can easily trigger Duplicate Content SEO penalties if the mobile site is hosted on a separate `m.` URL.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Media Query and Normal CSS rule',
        'headers': ['Point of Difference', 'CSS `@media` Query Layer', 'Standard CSS Rule Block'],
        'points': [
            ['1. Activation Trigger Mechanism', 'Evaluates environment variables (like width or dark-mode) before applying any styles.', 'Fires blindly and unconditionally the moment the stylesheet is parsed by the engine.'],
            ['2. Targeting Vector', 'Determines the *environment* of the browser (iPad vs iPhone, Print vs Screen).', 'Determines the *structure* of the HTML DOM tree (Header vs Footer, Link vs Button).'],
            ['3. Syntax Architecture', 'Demands an encapsulating at-rule wrapper block (`@media (min-width: 900px) { ... }`).', 'A simple selector paired directly with a property block (`p { color: blue; }`).'],
            ['4. State Permanence', 'Highly volatile and dynamic; toggles styles on and off as the user resizes a window.', 'Highly permanent; permanently glued to the DOM node unless overridden later manually.'],
            ['5. Foundational Use Cases', 'Transforming a four-column desktop grid into a neat single-column mobile stack.', 'Determining the absolute base brand font colors, global padding resets, and border radiuses.'],
            ['6. CSS Specificity impact', 'Does not inherently increase specificity mathematically, it only relies on cascade ordering.', 'Dictates origin specificity math powerfully based on class, ID, or inline selections.'],
            ['7. Calculation Cost (Performance)', 'Constantly watched and recalculated by the GPU as the viewport geometry shifts.', 'Calculated once during the initial CSS Object Model (CSSOM) tree generation phase.'],
            ['8. OS Accessibility Hooks', 'Can sniff the user\'s OS settings for `prefers-reduced-motion` to stop dizzying animations.', 'Cannot talk to Windows/macOS to determine if the user has Accessibility options enabled.'],
            ['9. Common Syntax format', '`@media print { .nav { display: none; } }`', '`.nav { display: flex; align-items: center; }`'],
            ['10. The Nesting paradigm', 'Acts as a giant container that typically wraps dozens of normal CSS rules inside it.', 'Is the fundamental atomic unit of styling that is being wrapped inside the media block.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'ARIA roles and HTML semantic elements',
        'headers': ['Aspect', 'WAI-ARIA Role Attributes', 'HTML5 Semantic Tags'],
        'points': [
            ['1. Core Technology', 'A descriptive vocabulary injected as raw attributes (`role="..."`) purely for screen readers.', 'Built-in node blocks representing the foundational vocabulary of the web document.'],
            ['2. The Native Functionality test', 'Does absolutely nothing visually. A `role="button"` on a div does not make it clickable natively.', 'Does everything natively. A `<button>` tag automatically receives padding and focuses perfectly.'],
            ['3. Syntax Example', '`<div role="search">`', '`<search>` or `<form id="search">`'],
            ['4. Target Audience', 'Written 100% exclusively for blind humans using assistive reading software arrays.', 'Written for engineers reading the code, search engines parsing it, AND blind humans.'],
            ['5. The Number One ARIA Rule', '"No ARIA is better than bad ARIA". Overusing it breaks more screen readers than it helps.', '"Use semantics whenever possible". It is the foolproof baseline for an accessible website.'],
            ['6. The Keyboard Event trap', 'If you label a div as a button, you are now legally responsible to write JS to handle "Enter" keys.', 'A semantic button natively binds the "Enter" and "Space" keys to trigger clicking automatically.'],
            ['7. The Redundancy error', 'Placing `role="main"` onto a `<main>` tag throws errors in modern audits for being annoying.', 'Placing a `<main>` tag is the perfect, clean approach.'],
            ['8. Modern Application Realm', 'Essential for creating highly complex, non-native JS widgets (like custom React accordions or modals).', 'Essential for laying out the basic pages, navbars, sidebars, and grid content areas.'],
            ['9. State Variables capability', 'Equipped with incredibly powerful state trackers (`aria-busy="true"`, `aria-expanded="false"`).', 'Lacks native state tracking for complex custom behaviors naturally.'],
            ['10. Timeline Origin', 'Invented as an accessibility patch to fix the chaotic Web 2.0 interface explosion.', 'Invented as the definitive replacement to make the web innately accessible without patches.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Meta tag and Title tag',
        'headers': ['Difference', 'HTML Meta Data `<meta>`', 'Document `<title>` Tag'],
        'points': [
            ['1. User User-Interface visibility', 'A totally invisible gear turning quietly in the background data layers.', 'The most prominent text on the browser application; plastered on the Tab bar.'],
            ['2. Google SERP (SEO) impact', 'Provides the gray "snippet description" paragraph beneath the blue link on Google.', 'Acts as the giant, clickable Blue Hyperlink title on the Google search results page.'],
            ['3. HTML Spec requirement', 'Technically optional to pass a validator, though highly recommended practically.', 'An absolute strict requirement. An HTML page without a title is deemed fundamentally broken.'],
            ['4. Void vs Paired tag logic', 'A void element that closes itself instantly (`<meta charset="utf-8">`).', 'A wrapping element demanding a strict closure (`<title>Home</title>`).'],
            ['5. Quantity limitations', 'A standard web page typically contains 5 to 15 different meta tags handling various configs.', 'A standard web page must possess one, and strictly only one, title tag.'],
            ['6. Functional Payload breadth', 'Multifaceted; controls zoom scaling, declares character sets, and manages social media OpenGraph cards.', 'Single-faceted; simply declares the literal canonical name of the HTML file string.'],
            ['7. Character string length caps', 'Meta descriptions are ideally tuned to ~155 characters before search engines truncate them.', 'Titles are ideally kept under ~60 characters to ensure the whole phrase fits inside the browser tab UI.'],
            ['8. OpenGraph Social sharing', '`<meta property="og:title">` explicitly controls exactly what Reddit or Twitter displaying overriding standards.', 'If specific OG metas are missing, social sites desperately scrape the `<title>` as a weak fallback.'],
            ['9. The Viewport Scale hack', '`<meta name="viewport">` is the most powerful tag for forcing mobile devices to not zoom out 500%.', 'Holds zero power over the CSS scaling math or rendering engine physics.'],
            ['10. Standard Placement zone', 'Must be nested cleanly within the `<head>` node of the architecture tree.', 'Also strictly confined directly within the `<head>` node of the architecture tree.']
        ]
    },
    {
        'section': 'Navigation & Sectioning',
        'topic': '<nav> and <header>',
        'headers': ['Aspect', 'Navigation `<nav>` Area', 'Header `<header>` Area'],
        'points': [
            ['1. Thematic Implication', 'Isolates a block exclusively designed for linking and routing traffic around a site.', 'Isolates an introductory grouping containing titles, branding, and opening thoughts.'],
            ['2. Internal Component parts', 'Almost exclusively wraps an unordered list `<ul>` populated entirely with Anchor `<a>` tags.', 'Heavily populated with `<h1>` titles, heavy SVG logos, and search bar inputs.'],
            ['3. Sibling/Nesting flow', 'Incredibly common to nest the primary site `<nav>` directly inside the site `<header>`.', 'You would mathematically never wrap an introductory `<header>` inside a simple `<nav>` menu block.'],
            ['4. Repetitive limitations', 'Should be reserved for the "Main" menu or massive footer directories; not every tiny link list.', 'Can be happily deployed multiple times down a page (e.g., at the top of every blog post `<article>`).'],
            ['5. Web Accessibility Landmarks', 'Screen readers loudly announce parsing a "Navigation Area" out loud to the user.', 'Screen readers loudly announce parsing a "Banner Area" (if it sits at the absolute body top).'],
            ['6. Anti-Pattern usage', 'Using it for social media icon links at the bottom of the page is considered noisy bad practice.', 'Using it for the title of a tiny sidebar widget is a perfectly acceptable valid practice.'],
            ['7. Common UI Design paradigms', 'A sticky horizontal stripe across the top, or a hidden hamburger off-canvas tray menu.', 'A massive "Hero" block featuring a sprawling landscape photo and a large introductory slogan.'],
            ['8. The Div Soup cure', 'Replaced the universally terrible, unreadable `<div id="navbar">` era code.', 'Replaced the universally terrible, unreadable `<div id="header-wrapper">` era code.'],
            ['9. Screen Reader behavior', 'Blind users frequently use software shortcuts to immediately teleport their cursor to the `<nav>`.', 'Blind users teleport here specifically to figure out what website they are currently visiting.'],
            ['10. Alternative Placement context', 'A sidebar listing all the chapters in a Javascript documentation manual.', 'A thin strip indicating the title of a specific forum post comment block.']
        ]
    },
    {
        'section': 'Navigation & Sectioning',
        'topic': '<header> and <footer>',
        'headers': ['Factor', 'Header `<header>` Sequence', 'Footer `<footer>` Sequence'],
        'points': [
            ['1. Architectural Location', 'Positions itself at the absolute entry or summit of a document or thematic section.', 'Positions itself at the absolute exit or nadir of a document or thematic section.'],
            ['2. Prime Content Focus', 'Brand logos, major navigational pathways, urgent alerts, and primary topic H1s.', 'Copyright `&copy;` metadata, dense sitemaps, privacy policy boring links, and author emails.'],
            ['3. W3C Accessibility Roles', 'Granted the implicit "banner" role attribute when sitting directly inside the body.', 'Granted the implicit "contentinfo" role attribute when sitting directly inside the body.'],
            ['4. Micro-Scope usage', 'Forms the exact top block containing the bolded title of a newspaper article widget.', 'Forms the exact bottom block containing the "Share to Facebook" row of a newspaper article.'],
            ['5. The Sticky CSS trap', 'Highly favored for `position: sticky;`, chasing the user as they scroll down the text.', 'Rarely sticky, unless deployed as a persistent media player bar or cookie consent warning.'],
            ['6. Psychological User goal', 'Establishes extreme context quickly so the user knows they are in the right place.', 'Acts as the ultimate fallback safety net when the user scrolls down completely lost.'],
            ['7. HTML Rules of Nesting', 'Cannot logically be nested inside another `<header>` tag or `<address>` grouping.', 'Cannot logically be nested inside another `<footer>` tag or `<header>` grouping.'],
            ['8. Visual Weight balance', 'Demands maximum visual hierarchy, bright colors, huge fonts, and high contrast.', 'Usually suppressed visually using dull grays, microscopic font sizes, and dense vertical stacking.'],
            ['9. The SEO Spider dynamic', 'Spiders aggressively read the H1 title here to instantly index the meaning of the URL.', 'Spiders aggressively crawl the dense link arrays here to discover hidden deeper pages on the domain.'],
            ['10. Dark Pattern designs', 'Often blends seamlessly with the page body to create a fluid, continuous introduction.', 'Often sharply contrasted with a dark background to strictly terminate the user\'s scrolling momentum.']
        ]
    },
    {
        'section': 'Navigation & Sectioning',
        'topic': '<aside> and <section>',
        'headers': ['Point of Difference', 'Aside `<aside>` Element', 'Section `<section>` Element'],
        'points': [
            ['1. Relationship to content', 'Information that is marginally, tangentially related to the main surrounding content block.', 'A heavily thematic grouping of information fundamentally integral to the core narrative.'],
            ['2. Standard UI Metaphor', 'A narrow sidebar column, a glossary pull-quote, or an advertising widget.', 'A sprawling, full-width block forming the main spine of the page layout.'],
            ['3. Deletion Test impact', 'If you completely removed it, the article would still make 100% perfect sense to the reader.', 'If you removed it, the article would be destroyed, lacking a core fundamental chapter.'],
            ['4. Tangible Content types', 'An "About the Author" bio box, a list of "Related Links", or a Newsletter signup form.', 'The "Pricing Tiers" flex-cart block, the "Our Services" grid, the main "Contact Form".'],
            ['5. Screen Reader Outlining', 'Screen reading tech flags it as a "Complementary Landmark" for optional listening.', 'Screen reading tech simply notes it as a generic "Region" (provided it has an H2 heading).'],
            ['6. CSS Grid Application', 'Fits perfectly into the fractional `1fr` column of a `3fr 1fr` standard grid template layout.', 'Occupies a full `grid-column: 1 / -1` span, establishing its own internal grid mechanics.'],
            ['7. Nesting architecture', 'Usually found glued to the side of a massive `<article>` node.', 'Usually acts as a generic subdivision slicing up a massive `<article>` node.'],
            ['8. Monetization Context', 'The absolute perfect semantic container to wrap Google AdSense banner widgets in.', 'Highly inappropriate and structurally damaging to wrap random third-party banner advertisements.'],
            ['9. The "Good to Know" rule', 'If it is just "good to know" trivia, wrap it in this.', 'If it is "required reading to pass the test", wrap it in this.'],
            ['10. Visual styling trickery', 'Often styled with slightly different off-color backgrounds to denote separation visually.', 'Usually inherits the main body background, focusing on massive internal padding gaps.']
        ]
    }
]
