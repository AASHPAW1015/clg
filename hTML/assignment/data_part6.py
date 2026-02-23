data = [
    {
        'section': 'Advanced Topics',
        'topic': 'Tabindex = 0 and Tabindex = 1',
        'headers': ['Aspect', 'Tabindex = 0', 'Tabindex = 1 (or > 0)'],
        'points': [
            ['1. Positioning', 'Places the element exactly where it structurally belongs in the DOM sequential tab flow.', 'Rips the element completely out of the logical DOM flow jump sequence.'],
            ['2. Element Type Need', 'Used to make non-focusable elements (like `div` or `span`) keyboard focusable.', 'Used to force an element to be focused *before* naturally focusable items.'],
            ['3. Industry Standard Practice', 'Considered the absolute best, most robust practice for custom accessible widgets.', 'Widely considered an extreme anti-pattern and universally bad practice.'],
            ['4. Logical Flow', 'Preserves the visual logical reading flow (left-to-right, top-to-bottom).', 'Destroys visual logic, causing the focus ring to teleport chaotically around the screen.'],
            ['5. Maintenance Cost', 'Zero; the browser natively handles shifting focus if elements are reordered.', 'High; developers must manually re-number every single `tabindex` if a tiny change occurs.'],
            ['6. Keyboard "Focus Trap"', 'Does not inherently create traps; focus exits the element naturally to the next DOM node.', 'Often traps users if numbers conflict or if dynamic HTML is injected arbitrarily.'],
            ['7. Interaction Type', 'Perfectly mimics the native keyboard behavior of standard `<button>` and `<a>` tags.', 'Forces an unnatural behavior specifically overriding browser engine intelligence.'],
            ['8. Screen Reader Impact', 'Creates a smooth, predictable narrative flow for visually impaired users relying on tabs.', 'Creates a confusing, fragmented experience for users expecting top-down interactions.'],
            ['9. Value Sequence', 'Every element set to `0` is visited purely in DOM-appearance order.', 'Elements > 0 are visited from lowest number (1) upwards, before ANY element natively set to 0.'],
            ['10. Ideal Use Case Scenario', 'A custom React `<div role="button">` that needs keyboard pressing support.', 'Perhaps an extremely weird, legacy modal dialog overlay trick (though still not advised).']
        ]
    },
    {
        'section': 'Advanced Topics',
        'topic': 'Character entity and Symbol',
        'headers': ['Difference', 'Character Entity', 'Keyboard Symbol'],
        'points': [
            ['1. Parsing Mechanism', 'Interpreted and converted by the HTML parser during document reading.', 'Read immediately as raw bytes mapped directly to the active charset (e.g., UTF-8).'],
            ['2. Escape Syntax Structure', 'Always begins with an ampersand (`&`) and strictly ends with a semicolon (`;`).', 'Typed purely via standard physical keyboard keys or Alt-codes (e.g., `©`, `@`).'],
            ['3. Primary Purpose Goal', 'Used exclusively to safely display reserved HTML characters without breaking the code.', 'Used for standard textual communication and basic punctuation in sentences.'],
            ['4. The "Less Than" Case', 'Written as `&lt;` to visually display an `<` without accidentally starting a new HTML tag.', 'Typing `<` directly in text can catastrophically break the entire webpage structure.'],
            ['5. Ambiguity Risk Factor', 'Guarantees the exact same visual character will appear across every browser and OS.', 'Can sometimes render as an ugly broken □ box if the font/charset lacks support.'],
            ['6. Memory Size', 'Requires parsing 4-10 bytes of text characters (e.g., `&copy;`).', 'Requires 1-4 literal bytes depending strictly on the current encoding.'],
            ['7. Common Examples', '`&amp;`, `&quot;`, `&apos;`, `&copy;`, `&nbsp;`.', '`&`, `"`, `\'`, `©`, ` `.'],
            ['8. HTML Validation Protocol', 'Crucial for passing W3C HTML Validation when writing code snippets on screen.', 'Will instantly cause massive parser failures if reserved symbols are left naked.'],
            ['9. The "Non-Breaking Space"', 'The only way (`&nbsp;`) to force multiple spaces since HTML collapses empty spaces.', 'Hitting the spacebar 5 times simply results in 1 tiny rendered space.'],
            ['10. Fallback Values', 'Entities can also be called via numerical codes (e.g., `&#169;`).', 'Direct symbols rely exclusively on the OS clipboard or direct key inputs.']
        ]
    },
    {
        'section': 'Advanced Topics',
        'topic': 'Inline JavaScript and External JavaScript',
        'headers': ['Factor', 'Inline JavaScript', 'External JavaScript'],
        'points': [
            ['1. Code Placement logic', 'Written inside HTML tags directly using attributes like `onclick="alert()"` or bare `<script>` tags.', 'Written entirely in separate `.js` files and linked via `<script src="...">`.'],
            ['2. Caching Potential', 'None. The code is re-downloaded repeatedly every time the HTML page refreshes.', 'Massive. The `.js` file is cached instantly, making page 2 load blazing fast.'],
            ['3. Separation of Concerns', 'Creates terrible Spaghetti Code; structural HTML mixes violently with logical logic.', 'Perfectly separates logic (JS) from presentation (CSS) and structure (HTML).'],
            ['4. Security Vulnerability (CSP)', 'Usually completely blocked by strict Content Security Policies mitigating serious XSS attacks.', 'Highly trusted, verifiable, and natively permitted by standard corporate security setups.'],
            ['5. Webpack/Module Bundling', 'Impossible to bundle, minify, transpile (Babel), or lint effectively via Node.js tools.', 'The absolute backbone of all modern frontend engineering (React, Angular).'],
            ['6. Variable Scoping Chaos', 'Easily pollutes the global `window` scope, threatening massive variable naming crashes.', 'Easily isolated using IIFEs, Modules (`type="module"`), or closure scopes.'],
            ['7. Developer Collaboration', 'Throws painful GIT merge conflicts when designers and coders touch the exact same line.', 'Allows JavaScript engineers to work freely without freezing HTML architecture.'],
            ['8. DOM Weight penalty', 'Bloats the raw HTML file dramatically, severely penalizing "Time to First Byte" metrics.', 'Keeps HTML skeletons totally lightweight, rendering the visual page instantly.'],
            ['9. Defer/Async Usage', 'Cannot be natively deferred or loaded asynchronously using script tag modifiers.', 'Can easily utilize `defer` or `async` tags to prevent blocking the HTML parser.'],
            ['10. Industry Standard', 'Only strictly used for microscopic 1-line tracking pixel injections in marketing.', 'The absolute undeniable standard for all professional web platform productions.']
        ]
    },
    {
        'section': 'Advanced Topics',
        'topic': 'defer and async in script tag',
        'headers': ['Conceptual Difference', 'defer Attribute', 'async Attribute'],
        'points': [
            ['1. Parser Blocking nature', 'Downloads completely in the background; does NOT block HTML parsing.', 'Downloads completely in the background; does NOT block HTML parsing.'],
            ['2. Execution Timing event', 'Guaranteed to wait until the entire HTML DOM is fully parsed and built before firing.', 'Fires instantly the literal millisecond it finishes downloading, pausing the HTML parser then.'],
            ['3. Sequence Guarantee', 'Executes strictly in the exact order the scripts appear in the HTML document list.', 'Executes in a totally chaotic, unpredictable order (whichever network request finishes first).'],
            ['4. Primary Use Case', 'Code relying on the DOM existing (UI logic) or relying on other libraries (jQuery plugins).', 'Code completely independent of the DOM or other scripts (Google Analytics trackers).'],
            ['5. DOMContentLoaded Event', 'The `DOMContentLoaded` event strictly waits for all deferred scripts to finish executing.', 'The `DOMContentLoaded` event completely ignores async scripts and may fire before them.'],
            ['6. Placement Restrictions', 'Only useful if placed in the `<head>` (placing it at the bottom `</body>` renders it useless).', 'Also primarily useful if placed in the `<head>` early to kickstart network fetching.'],
            ['7. Modularity Support', 'Required heavily when writing modular library chains.', 'Dangerous for library chains; (e.g., React loads before ReactDOM, crashing the app).'],
            ['8. HTML5 Modules natively', 'Standard `<script type="module">` acts exactly like `defer` automatically by default.', 'Modules can be made `async`, but natively they enforce `defer`-like behavior.'],
            ['9. Inline script Effect', 'Totally ignored if placed on an inline script lacking a `src` attribute.', 'Also completely ignored on an inline script without a `src`.'],
            ['10. Network Prioritization', 'Tells the browser "Get this now without stopping, but wait until we are ready to run it".', 'Tells the browser "Get this ASAP and run it the millisecond you grab it, period".']
        ]
    },
    {
        'section': 'Advanced Topics',
        'topic': 'Viewport meta tag and Media query',
        'headers': ['Aspect', 'Viewport Meta Tag', 'CSS Media Query'],
        'points': [
            ['1. Execution Engine Role', 'Read by the low-level browser engine to dictate the literal physical pixel scale logic.', 'Read by the CSS computing engine to conditionally activate aesthetic design variations.'],
            ['2. Declaration Syntax Location', 'Exists strictly as a single `<meta>` tag specifically sitting inside the HTML `<head>`.', 'Exists fundamentally inside CSS stylesheets (or `<style>` blocks) wrapped in `@media`.'],
            ['3. The Dependency Chain', 'Media Queries will completely fail on mobile devices if the Viewport tag is missing.', 'Does not require Media Queries to exist; it simply forces the physical zoom factor.'],
            ['4. Viewport Width Trick', '`<meta name="viewport" content="width=device-width">` tricks phones into treating pixels correctly.', '`@media (max-width: 600px)` acts conditionally based on the width established by the meta.'],
            ['5. Scaling control capability', 'Can explicitly turn off the user’s ability to pinch-to-zoom (an accessibility nightmare).', 'Has absolutely zero power to control, restrict, or modify browser pinch-to-zoom controls.'],
            ['6. Quantity per page', 'A single HTML document should have exactly one unified Viewport declaration.', 'A single stylesheet can possess hundreds of distinct Media Queries firing at breakpoints.'],
            ['7. Core Design Purpose', 'Solves the "980px Shrink-to-Fit" legacy iPhone rendering problem universally.', 'Solves the "Elements are too wide for a narrow screen" design problem visually.'],
            ['8. Syntax format example', '`<meta name="viewport" content="initial-scale=1.0">`', '`@media screen and (min-width: 1024px) { ... }`'],
            ['9. Trigger Conditions', 'Applies globally instantly; it is not conditional or reactive to user screen resizing.', 'Highly reactive; triggers on and off dynamically as a user physically drags the window edge.'],
            ['10. Historical Availability', 'Invented by Apple specifically for the release of the first mobile iPhone Safari.', 'Standardized by the W3C for widespread fluid CSS design methodologies.']
        ]
    },
    {
        'section': 'Advanced Topics',
        'topic': 'Client-side validation and Server-side validation',
        'headers': ['Factor', 'Client-side Validation', 'Server-side Validation'],
        'points': [
            ['1. Language / Tooling', 'Performed using HTML5 attributes (`required`, `type="email"`) or browser JavaScript.', 'Performed using backend languages like Python, Node.js, PHP, or Java.'],
            ['2. Speed / Feedback', 'Instantaneous; gives the user immediate visual red/green feedback as they type.', 'Slow; requires submitting the entire network packet, waiting, and reloading the response.'],
            ['3. Primary Purpose Goal', 'Designed strictly for User Experience (UX) to guide honest users making typos.', 'Designed strictly for Security and Data Integrity to block hackers and malicious bots.'],
            ['4. Security Reliability', 'Zero security. It can be bypassed utterly in seconds by disabling JS or editing the DOM.', 'Absolute security. It is the final, un-bypassable gatekeeper before the database.'],
            ['5. Bypassing mechanism via tools', 'Easily bypassed by simply using Postman or cURL to send HTTP POSTs directly.', 'Impossible to bypass using direct API requests; it validates the raw network payload.'],
            ['6. Form Submission Prevention', 'Stops the form from physically sending the HTTP request if data is obviously wrong.', 'Allows the HTTP request, but rejects processing the data internally in the backend code.'],
            ['7. Processing Location', 'Runs explicitly on the user’s personal CPU hardware inside their Chrome tab.', 'Runs explicitly on the hosting company’s secure cloud servers (AWS/DigitalOcean).'],
            ['8. Database Querying context', 'Cannot securely check if an email already exists in a database without making an API call.', 'Can securely run SQL queries to instantly verify if an email already exists uniquely.'],
            ['9. Best Practice Standard', 'Never rely on this alone; use it only to stop accidental bad form submissions smoothly.', 'Never skip this; the server must assume literally all incoming data is poisoned.'],
            ['10. Maintenance difficulty', 'Harder to maintain if complex business logic (like ID calculation) changes frequently.', 'Centralized business logic maintenance; changing verifying formulas updates everything.']
        ]
    },
    {
        'section': 'Advanced Topics',
        'topic': 'HTML Collection and NodeList',
        'headers': ['Comparison Logic', 'HTMLCollection', 'NodeList'],
        'points': [
            ['1. Return Source Methods', 'Returned explicitly by legacy methods like `getElementsByClassName` or `getElementsByTagName`.', 'Returned explicitly by modern methods like `querySelectorAll` or the `childNodes` property.'],
            ['2. The "Live" vs "Static" nature', 'Inherently LIVE; if the DOM changes, the collection updates itself automatically and instantly.', 'Generally STATIC (except for `childNodes`); adding elements down the line will not update the list.'],
            ['3. Node Types Included', 'Exclusively contains purely visible HTML Element Nodes (no text or comment nodes).', 'Can contain completely anything: Element nodes, text nodes, whitespace, and HTML comments.'],
            ['4. Array Methods available', 'Extremely limited; entirely lacks modern array methods like `.forEach()`.', 'Modern browsers natively grant NodeLists access to the `.forEach()` array loop methodology.'],
            ['5. Performance Loop Risk', 'Looping through a live collection while adding elements will cause a fatal infinite loop.', 'Looping through a static list is perfectly safe, as its length is locked in stone permanently.'],
            ['6. Accessing Items by Name string', 'Can natively fetch items by their `id` or `name` using `collection["myId"]` bracket syntax.', 'Lacks the ability to access specific items directly using string keys or associated IDs.'],
            ['7. Historical usage Context', 'A deeply historical JavaScript DOM artifact from the 1990s web specs.', 'A universally preferred modern artifact popularized to mimic robust jQuery-style queries.'],
            ['8. Developer Recommendation', 'Often discouraged today because live-updating lists cause unpredictable UI rendering bugs.', 'Highly encouraged standard paradigm guaranteeing stable, snapshot-driven DOM manipulation.'],
            ['9. Array Conversion strategy', 'Must be converted using `Array.from(collection)` or `[...collection]` to map/filter.', 'Must also be converted using `Array.from(list)` if you want to use `.map()`, `.filter()`, or `.reduce()`.'],
            ['10. The `document.forms` context', 'Natively returned when you query the `document.forms` embedded browser object.', 'Natively returned when calculating the length of a `document.querySelectorAll("div")` lookup.']
        ]
    }
]
