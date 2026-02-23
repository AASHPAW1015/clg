data = [
    {
        'section': 'HTML5 Features',
        'topic': 'Semantic and Non-semantic elements',
        'headers': ['Aspect', 'Semantic Elements', 'Non-semantic Elements'],
        'points': [
            ['1. Primary Definition', 'Tags that clearly describe their meaning to both the browser and developer.', 'Tags that tell nothing about their specific content or purpose.'],
            ['2. Element Examples', '<form>, <table>, <article>, <header>, <footer>.', '<div>, <span>, <b>, <i>.'],
            ['3. Machine Readability', 'Highly readable by search engine crawlers parsing the page structure.', 'Ignored by crawlers attempting to understand the document layout.'],
            ['4. Accessibility Factor', 'Crucial for assistive technologies (screen readers) to navigate regions.', 'Often practically invisible or treated as generic text by assistive apps.'],
            ['5. Web Evolution', 'Introduced heavily in HTML5 to create a standardized web architecture.', 'The foundational building blocks of the early, basic web eras.'],
            ['6. Developer Experience', 'Makes code instantly readable (e.g., <nav> clearly holds navigation).', 'Requires reading class names (e.g., <div class="nav">) to understand context.'],
            ['7. Document Outlining', 'Contributes to the generation of the structural HTML5 document outline.', 'Completely ignored by the outlining algorithm.'],
            ['8. CSS Naming Conventions', 'Reduces the need for excessive class names (can style `article` directly).', 'Requires heavy reliance on class naming conventions (like BEM).'],
            ['9. ARIA Equivalency', 'Eliminates the need for redundant ARIA roles (e.g., role="banner").', 'Requires manual ARIA role injection to become accessible to users.'],
            ['10. Best Practice usage', 'Should be preferred and used whenever the content has a specific logical block.', 'Used only when no semantic element exists, or purely for cosmetic CSS hooks.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'localStorage and sessionStorage',
        'headers': ['Difference', 'localStorage', 'sessionStorage'],
        'points': [
            ['1. Data Lifespan', 'Data persists permanently until explicitly deleted by code or the user.', 'Data is cleared entirely the moment the specific browser tab closes.'],
            ['2. Tab Sharing Scope', 'Data is shared across all open tabs/windows under the exact same origin.', 'Data is strictly isolated to the single specific tab that created it.'],
            ['3. Typical Use Case Context', 'Saving an application theme (Dark Mode), user settings, shopping carts.', 'Storing transient form data, temporary user states, or single-session tokens.'],
            ['4. Expiration Mechanisms', 'Never expires automatically over time.', 'Expires immediately on tab/window closure (not page refresh).'],
            ['5. Storage Size Quota', 'Usually allows ~5MB to 10MB of string data per domain origin.', 'Also allows ~5MB of string data per domain origin.'],
            ['6. Storage Format rule', 'Only stores data as pure Strings (objects must be JSON.stringified).', 'Only stores data as pure Strings (objects must be JSON.stringified).'],
            ['7. API Access Methods', 'Accessed using `window.localStorage.setItem()` and `getItem()`.', 'Accessed using `window.sessionStorage.setItem()` and `getItem()`.'],
            ['8. Window Events trigger', 'Fires a "storage" event across OTHER tabs when data is modified.', 'Does NOT fire "storage" events in other tabs (since data is isolated).'],
            ['9. Security considerations', 'Highly vulnerable to Cross-Site Scripting (XSS) attacks stealing tokens forever.', 'Also vulnerable to XSS, but exposure window closes when the user leaves.'],
            ['10. Network Payload', 'Data is stored purely locally; never sent to the server on every request.', 'Data is stored purely locally; never sent continuously like cookies.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Web Workers and JavaScript functions',
        'headers': ['Aspect', 'Web Workers', 'Standard JS Functions'],
        'points': [
            ['1. Execution Threading', 'Runs entirely on a separate background system thread.', 'Runs explicitly on the main browser UI thread.'],
            ['2. UI Blocking', 'Heavy computations will never freeze or lock up the user interface.', 'Heavy loops/computations will instantly freeze the webpage.'],
            ['3. DOM Access restrictions', 'Absolutely zero access to the `document` or DOM elements.', 'Full, unrestricted native access to manipulate the DOM.'],
            ['4. Communication Pattern', 'Communicates with the main thread via asynchronous message passing (postMessage).', 'Executed directly via synchronous or asynchronous direct call stacks.'],
            ['5. Setup Complexity', 'Requires creating a separate .js file and instantiating a `new Worker()`.', 'Defined normally anywhere in the current script codebase.'],
            ['6. Context of "Window"', 'The global context is `DedicatedWorkerGlobalScope`, not `window`.', 'The global context usually points directly to the browser `window`.'],
            ['7. Common Application', 'Processing massive arrays, image manipulation algorithms, data parsing.', 'Handling click events, rendering UI updates, managing states.'],
            ['8. Network Requests', 'Can still comfortably perform `fetch()` and `XMLHttpRequest`.', 'Can also perform network requests.'],
            ['9. Object Passing', 'Messages passed are deeply cloned (Structured Clone Algorithm), hurting performance on huge data.', 'Objects are passed efficiently by reference into the function block.'],
            ['10. Lifecycle controls', 'Can be forcefully terminated externally via `worker.terminate()`.', 'Cannot be easily aborted mid-execution without yielding the thread.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Canvas and SVG',
        'headers': ['Feature', 'HTML5 Canvas', 'SVG (Scalable Vector Graphics)'],
        'points': [
            ['1. Graphic Rendering Type', 'Raster/Pixel-based. Draws graphics pixel by pixel immediately.', 'Vector-based. Defined by mathematical shapes, lines, and curves.'],
            ['2. Resolution Independence', 'Resolution-dependent. Becomes blurry or pixelated when zoomed in.', 'Completely resolution-independent. Stays perfectly crisp at any size.'],
            ['3. DOM Integration', 'Acts as a single DOM node. Elements drawn inside do not exist in the DOM.', 'Every drawn shape becomes a discrete node in the HTML DOM tree.'],
            ['4. Event Handling', 'Cannot easily attach click/hover events to specific shapes inside.', 'Can easily attach CSS hover states or JS click events to any drawn shape.'],
            ['5. Performance Profile', 'Extremely fast for rendering thousands of objects, particles, or game frames.', 'Performance degrades severely if the DOM gets clogged with thousands of nodes.'],
            ['6. Setup & Syntax', 'Requires JavaScript purely to draw anything (fillRect, arc).', 'Drawn using XML-style tags directly in HTML (<circle>, <rect>).'],
            ['7. Accessibility context', 'A "black box" to screen readers; requires complex fallback HTML text.', 'Can be made highly accessible with `<title>` and `<desc>` tags inside.'],
            ['8. CSS Styling capability', 'Cannot be styled using CSS. Colors are applied via JS canvas Context.', 'Easily styled using CSS classes (`fill`, `stroke`, `stroke-width`).'],
            ['9. Typical Use Cases', 'High-performance web browser games, complex real-time charts, paint apps.', 'Logos, simple animations, icons, scalable interactive maps.'],
            ['10. Text Rendering', 'Text drawn inside is converted to pixels; cannot be highlighted/selected.', 'Text inside is fully highlightable, selectable, and searchable.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Responsive Web Design and Adaptive Design',
        'headers': ['Comparison Point', 'Responsive Web Design', 'Adaptive Web Design'],
        'points': [
            ['1. Core Philosophy', 'Fluid and totally flexible layout that smoothly adjusts to any screen size.', 'Multiple fixed layouts explicitly designed for specific, predefined screen sizes.'],
            ['2. Technical Mechanism', 'Relies heavily on CSS media queries, relative units (%, vw), and fluid grids.', 'Detects the device/size and serves static layout snapshots (or JS-driven templates).'],
            ['3. Developer Effort', 'Requires creating one unified codebase that handles all possible variants.', 'Requires designing and maintaining multiple distinct UI templates.'],
            ['4. Future-proofing capability', 'Highly future-proof; automatically handles bizarre new device sizes.', 'Fragile; new device dimensions might fall awkwardly between set templates.'],
            ['5. Performance (Load Time)', 'Often loads the entire heavy CSS/DOM for all devices, hiding parts via CSS.', 'Can be much faster natively if the server only sends the mobile-specific code.'],
            ['6. Control over UX', 'Less absolute control on in-between sizes; layout can look weird briefly.', 'Perfect control. Designers know exactly how the page looks at 320px, 768px, etc.'],
            ['7. Popularity/Industry Standard', 'The overwhelming standard for modern web development frameworks.', 'Less common today, used mostly by massive legacy enterprise sites or airlines.'],
            ['8. Resizing the Browser window', 'The page shifts gracefully and continuously as you drag the window edge.', 'The page stays rigid until it hits a specific pixel threshold, then suddenly snaps.'],
            ['9. Implementation Cost', 'Cheaper historically to manage a single fluid theme block.', 'Expensive historically to design 6 different Adobe Photoshop mockups.'],
            ['10. SEO Optimization', 'Highly recommended by Google; links are unified under one HTML payload.', 'Requires extreme care to avoid duplicate content penalties if using separate URLs.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Media Query and Normal CSS rule',
        'headers': ['Aspect', 'Media Query', 'Normal CSS Rule'],
        'points': [
            ['1. Conditionality', 'Only applies the styles if specific environmental conditions are met.', 'Applies the styles unconditionally across all scenarios (unless overridden).'],
            ['2. Target Context variable', 'Targets viewport width, height, resolution, orientation, or print mode.', 'Targets specific HTML tags, classes, IDs, or structural hierarchies.'],
            ['3. Syntax Structure Indicator', 'Wraps standard CSS rules inside a block beginning with `@media`.', 'Does not require a conditional wrapper block.'],
            ['4. Application Flow', 'Dynamically turns on and off as the user resizes the browser window.', 'Stays permanently active from the moment the web page is rendered.'],
            ['5. Common Use Case paradigm', 'Making a 3-column desktop grid collapse into a 1-column mobile stack.', 'Setting the primary brand colors, font sizes, global margins, and baseline borders.'],
            ['6. Placement Best Practice', 'Usually placed at the bottom of the stylesheet to cascade and override.', 'Usually placed at the top or middle of the stylesheet to establish foundations.'],
            ['7. Performance Impact', 'Adds slight parsing complexity for the browser rendering engine continually.', 'Calculated once during the initial DOM and CSSOM construction phases.'],
            ['8. Accessibility feature hooks', 'Can detect system preferences like `prefers-reduced-motion` or `dark-mode`.', 'Cannot natively read or react to the user’s operating system preferences.'],
            ['9. Examples of Syntax', '`@media (max-width: 600px) { ... }`', '`.card-container { display: flex; }`'],
            ['10. Scope and Nesting', 'Can wrap hundreds of different normal CSS rules inside its curly braces.', 'Usually stands alone or is nested within a preprocessor language like SASS.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'ARIA roles and HTML semantic elements',
        'headers': ['Feature', 'ARIA Roles', 'HTML Semantic Elements'],
        'points': [
            ['1. Definitional Concept', 'Attributes added manually to elements to explain their purpose to screen readers.', 'Built-in standard tags that possess native, understood meaning globally.'],
            ['2. Native Browser Behavior', 'Adds absolutely zero default styling, keyboard focus, or interactivity.', 'Often provides built-in CSS styling and native keyboard interactability.'],
            ['3. Examples', '`role="button"`, `role="navigation"`, `role="banner"`.', '`<button>`, `<nav>`, `<header>`.'],
            ['4. Primary Target User', 'Strictly for assistive technologies (screen readers, braille displays).', 'For search engines, browser engines, developers, AND assistive technologies.'],
            ['5. The First Rule of ARIA', "No ARIA is better than bad ARIA; always prefer native semantics.", "Always use the native HTML semantic element if it exists and fits the job."],
            ['6. Adding Functionality', 'If you add `role="button"` to a `div`, you MUST manually code JS for the Spacebar/Enter keys.', 'A `<button>` natively listens for Spacebar and Enter keys perfectly without JS.'],
            ['7. Redundancy Issues', 'Adding `role="navigation"` to a `<nav>` is redundant and considered bad practice.', 'Using a clean `<nav>` is the perfect practice.'],
            ['8. Usage Context', 'Used primarily when building highly custom, complex JS widgets (custom dropdowns, tabs).', 'Used as the core foundational skeleton for all standard web structures.'],
            ['9. State Management', 'Handles complex dynamic states perfectly (`aria-expanded`, `aria-checked`).', 'Many native semantic tags lack robust dynamic state attributes for complex custom widgets.'],
            ['10. Specification Timeline', 'Created by the WAI-ARIA specification to fix the old inaccessible web.', 'Created as part of the massive HTML5 specification update for better webs.']
        ]
    },
    {
        'section': 'HTML5 Features',
        'topic': 'Meta tag and Title tag',
        'headers': ['Point of Difference', '<meta> Tag', '<title> Tag'],
        'points': [
            ['1. Visibility to User', 'Completely invisible to the user browsing the page normally.', 'Highly visible; appears in the browser tab, history, and bookmarks.'],
            ['2. SEO Relevance Priority', 'Provides description snippets, but is not heavily weighted for rankings.', 'The single most critical on-page SEO element for search engine rankings.'],
            ['3. Required by HTML Spec', 'Technically optional (though practically required for charset/viewport).', 'Strictly required; an HTML document is invalid without a single `<title>`.'],
            ['4. Tag Structure type', 'An empty/void tag requiring no closing tag (`<meta ...>`).', 'Requires a paired closing tag (`<title>My Page</title>`).'],
            ['5. Multiple Instances limit', 'A page can have dozens of different `<meta>` tags serving different purposes.', 'A page must have exactly ONE `<title>` tag in its document head.'],
            ['6. Supported Functions', 'Defines character sets, viewport scaling, author, keywords, OpenGraph data.', 'Defines absolutely nothing except the literal name of the webpage file.'],
            ['7. Character Limit', 'Meta descriptions often stretch to ~150-160 characters for search engines.', 'Titles should ideally stay under 60-70 characters to avoid truncation in Google.'],
            ['8. Social Media impact', 'Controls the exact picture and layout snippet when sharing a link on Twitter/Facebook.', 'If no OpenGraph meta title exists, social sites fall back to reading the HTML title.'],
            ['9. Browser Rendering effect', 'The `<meta name="viewport">` tag instantly controls mobile layout scaling heavily.', 'Has absolutely zero impact on how the page layout is rendered pixel-wise.'],
            ['10. Placement Location', 'Must be placed inside the `<head>` block of the HTML document.', 'Must also be placed strictly inside the `<head>` block of the document.']
        ]
    },
    {
        'section': 'Navigation & Sectioning',
        'topic': '<nav> and <header>',
        'headers': ['Comparison Logic', '<nav> Element', '<header> Element'],
        'points': [
            ['1. Semantic Purpose', 'Represents a section specifically dedicated to major navigation links.', 'Represents introductory content or a group of navigational aids for a section/page.'],
            ['2. Typical Internal Content', 'Contains an unordered list (`<ul>`) of anchor (`<a>`) links.', 'Contains logos, headings (`<h1>`), search forms, and often contains the `<nav>`.'],
            ['3. Nesting Relationship', 'Extremely common to place the primary `<nav>` directly inside the site `<header>`.', 'You would never typically place a `<header>` inside a `<nav>`.'],
            ['4. Instance Limit per page', 'Usually reserved for the main nav or massive footers (not for every tiny link group).', 'Can be used multiple times (e.g., once for the site, once inside every `<article>`).'],
            ['5. Document Outlining', 'Screen readers explicitly identify it as a "Navigation Region".', 'Screen readers explicitly identify it as a "Banner Region" if at the top level.'],
            ['6. Redundancy limits', 'Do not use for pagination logs or simple social media lists at the bottom.', 'Can be used for the top block of a tiny blog post card overview.'],
            ['7. CSS Footprint Context', 'Often styled as a horizontal flex row or a hidden mobile hamburger menu.', 'Often styled as a sticky block fixed to the absolute top of the viewport.'],
            ['8. HTML5 Introduction', 'Introduced to replace the chaotic `<div id="nav">` legacy structures.', 'Introduced to replace the chaotic `<div id="header">` legacy structures.'],
            ['9. Accessibility expectation', 'Blind users use shortcuts to jump straight to the `<nav>` to find pages.', 'Users jump to the `<header>` to find context or the search bar.'],
            ['10. Alternative Placements', 'Can perfectly sit independently in a sticky sidebar (like a documentation site).', 'Rarely acts as a lateral sidebar; inherently implies "top" or "introductory" space.']
        ]
    },
    {
        'section': 'Navigation & Sectioning',
        'topic': '<header> and <footer>',
        'headers': ['Feature', '<header> Element', '<footer> Element'],
        'points': [
            ['1. Document Placement Paradigm', 'Typically sits at the very beginning of a page or an `<article>` section.', 'Typically sits at the very end or bottom of a page or `<article>` section.'],
            ['2. Common Content Focus', 'Logos, search bars, main site navigation, and primary page titles.', 'Copyright notices, legal links, sitemaps, author info, and social media icons.'],
            ['3. Semantic ARIA Role (Top Level)', 'Implicitly assigned the "banner" role by assistive technologies.', 'Implicitly assigned the "contentinfo" role by assistive technologies.'],
            ['4. Scope and Reusability', 'Can cap off individual blog posts (containing the post title and date).', 'Can finish off individual blog posts (containing the author bio or share links).'],
            ['5. Sticky CSS Usage', 'Often styled with `position: sticky; top: 0;` to remain visible while scrolling.', 'Rarely sticky, unless on specific web app dashboards or chat applications.'],
            ['6. Relationship to Main Content', 'Sets the stage, context, and pathway into the main contextual content.', 'Concludes the conversation, offering secondary actions after consumption.'],
            ['7. Nesting Restrictions', 'Cannot be strictly nested inside another `<header>` or an `<address>` tag.', 'Cannot be strictly nested inside another `<footer>` or a `<header>` tag.'],
            ['8. Size and Weight', 'Often large, highly visual with hero background images or prominent branding.', 'Often highly utilitarian, dense with tiny text links and secondary colors.'],
            ['9. SEO Functionality', 'Crawlers look here for the H1 tag to establish the most urgent page context.', 'Crawlers look here to map out deeper site architectures via sitemap links.'],
            ['10. Typical Contrast Design', 'Blends with the background or uses a stark solid brand color.', 'Frequently uses a dark gray or inverted color palette to mark the page boundary.']
        ]
    },
    {
        'section': 'Navigation & Sectioning',
        'topic': '<aside> and <section>',
        'headers': ['Aspect', '<aside> Element', '<section> Element'],
        'points': [
            ['1. Definitional Role', 'Content tangentially or indirectly related to the main content around it.', 'A thematic, core grouping of content that directly drives the current narrative.'],
            ['2. Visual Presentation Metaphor', 'Usually presented visually as sidebars or pull-quote callout boxes.', 'Presented as massive, full-width blocks flowing centrally down the page.'],
            ['3. Independence Factor', 'Can often be removed entirely without destroying the page’s main meaning.', 'Removing it fundamentally damages or deletes the primary value of the page.'],
            ['4. Content Examples', 'Newsletter signup boxes, related article links, author biographies, glossaries.', 'Chapter 1 of a book, the "Features" grid, the main contact form structure.'],
            ['5. Document Outlining', 'Screen readers read it as a "Complementary Region".', 'Screen readers read it as a "Region" (if it contains a recognizable heading).'],
            ['6. Hierarchy position', 'Serves a secondary, subservient role to the `<article>` or `<main>` element.', 'Serves a primary structural role dividing up the `<article>` or `<main>`.'],
            ['7. Nesting dynamics', 'A `<article>` often has an `<aside>` sitting next to its paragraphs.', 'An `<article>` is usually comprised of multiple `<section>` elements.'],
            ['8. CSS Layout implementation', 'Often placed in a narrow CSS Grid column (e.g., `grid-template-columns: 3fr 1fr;`).', 'Usually occupies a full viewport width spanning 100% block size.'],
            ['9. Advertisement context', 'The absolute perfect semantic container for displaying banner ads on a blog.', 'Incorrect and semantically damaging to use for irrelevant banner advertisements.'],
            ['10. Fallback interpretation', 'If it doesn’t fit the main flow but is "good to know", it’s an aside.', 'If it is part of the core narrative, it’s a section.']
        ]
    }
]
