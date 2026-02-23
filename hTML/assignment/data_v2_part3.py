data = [
    {
        'section': 'Forms & Input Elements',
        'topic': '<input> and <textarea>',
        'headers': ['Feature', '<input> Element', '<textarea> Element'],
        'points': [
            ['1. Multiline Support', 'Strictly handles a single, non-wrapping line of horizontal string.', 'Specifically engineered to handle massive blocks of multi-line text.'],
            ['2. Empty/Void Tag constraint', 'A self-contained void tag (`<input>`) requiring no closing tag.', 'A paired block requiring a strict closing tag (`<textarea></textarea>`).'],
            ['3. Defining Default Content', 'Assigned entirely using the `value="Hello"` property attribute.', 'Assigned by placing raw text directly between the open and closing tags.'],
            ['4. User Resizing Capability', 'Permanently locked rigidly in size; the user cannot drag to expand it.', 'Usually features a small drag-handle in the corner allowing users to expand it.'],
            ['5. Functionality Scope', 'The ultimate Swiss Army knife (checkboxes, colors, dates, files, emails).', 'Does one thing exclusively: captures giant raw string text paragraphs.'],
            ['6. Sizing Attributes native', 'Sized by CSS or the legacy `size` attribute (character length).', 'Sized intelligently using the `rows` (height) and `cols` (width) attributes.'],
            ['7. Real World Scenario', 'Capturing a user\'s First Name, Age, or generating a "Submit" button.', 'Capturing a 500-word feedback complaint or a blog post body.'],
            ['8. Wrapping Mechanics', 'When text hits the edge, the text visually slides to the left indefinitely.', 'When text hits the right edge, it automatically wraps down to line number two.'],
            ['9. The Enter Key behavior', 'Hitting Enter instantly submits the active form by default natively.', 'Hitting Enter physically injects a `\\n` newline break character into the data.'],
            ['10. The `wrap` attribute logic', 'Irrelevant feature for single lines.', 'Supports `wrap="hard"` or `wrap="soft"` to determine how line breaks are sent to the server.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': 'Radio button and Checkbox',
        'headers': ['Aspect', 'Radio Button (`type="radio"`)', 'Checkbox (`type="checkbox"`)'],
        'points': [
            ['1. Core Form Logic', 'Enforces strict mutually exclusive selection from a group pool.', 'Permits highly independent, non-exclusive toggle selection.'],
            ['2. Visual OS Rendering', 'Drawn by operating systems mostly as hollow circles that fill when clicked.', 'Drawn by OS engines as hollow squares that receive a tick/check mark.'],
            ['3. User Selection bounds', 'Only exactly ONE option can be true within a shared group context.', 'ZERO, ONE, or EVERY option can be true simultaneously.'],
            ['4. The "Name" grouping bind', 'Requires identical `name` attributes to force the exclusivity logic.', 'Can share a name to build an array, but doesn\'t force them to toggle each other off.'],
            ['5. The Deselection Trap', 'Once a user clicks a radio, they cannot natively "unclick" it to blank.', 'Easily toggled off by simply clicking it a second time natively.'],
            ['6. Common Usage paradigm', 'Credit Card VS PayPal; Male VS Female; Yes VS No.', 'Pick your interests (Sports, Art, Tech); Agree to Terms box.'],
            ['7. Keyboard Accessibility', 'Using arrow keys jumps focus and instantly activates the next radio.', 'Focus using Tab, then use Spacebar to toggle the specific checked state explicitly.'],
            ['8. The `indeterminate` visual', 'Not logically supported by radio dynamics.', 'Accessible via Javascript to show a "-" dash indicating a partial bulk selection.'],
            ['9. Initial Form State setup', 'Applying the `checked` attribute to two radios in a group causes the browser to pick the last one.', 'Applying `checked` to all checkboxes results in all of them being active.'],
            ['10. Boolean vs Enum', 'Represents a single variable evaluating to one of many string values (Enum layout).', 'Often represents dozens of separate independent `true/false` Boolean variables.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': 'GET and POST method',
        'headers': ['Factor', 'GET HTTP Method', 'POST HTTP Method'],
        'points': [
            ['1. Data Transportation Vector', 'Explicitly appends all parameters to the end of the URL string directly.', 'Packages all data inside the invisible HTTP Request Body payload.'],
            ['2. Visual Security', 'Awful security. Passwords show up in plaintext in the browser URL bar.', 'Much safer. Information is hidden from casual over-the-shoulder URL viewing.'],
            ['3. Packet Size Limitations', 'Severely limited by browser URL length limits (often maxing at 2048 chars).', 'No innate limits; can effortlessly transport gigantic payloads like 4K video files.'],
            ['4. The Idempotency Principle', 'Safe and idempotent; repeating a GET query 100 times changes nothing server-side.', 'Non-idempotent; refreshing a POST might accidentally charge a credit card twice.'],
            ['5. Caching & History behavior', 'Requests are stored in browser history, can be bookmarked, and cached.', 'Never cached, never saved in history, and cannot be bookmarked.'],
            ['6. Allowed File Uploads', 'Literally impossible to upload binary files via a GET request protocol.', 'The standard methodology for sending images and data via `multipart/form-data`.'],
            ['7. Ideal Architecture usage', 'Searching for a hat, filtering a product list, opening a specific blog post.', 'Logging into an account securely, publishing a comment, deleting a record.'],
            ['8. Speed comparison', 'Minutely faster since it avoids parsing a complex internal body payload.', 'Slightly more network overhead due to body chunking and parsing.'],
            ['9. Browser Warning dialogs', 'Refreshing a GET request just instantly reloads the page silently.', 'Refreshing a POST triggers an "Attempting to resubmit data" warning dialog.'],
            ['10. Default Form Status', 'If you forget to type `method="..."` on a form, it defaults to GET natively.', 'Requires explicit declaration via `<form method="POST">`.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': '<label> and placeholder',
        'headers': ['Feature', '<label> Tag Structure', 'Placeholder Attribute String'],
        'points': [
            ['1. Core Technology', 'A permanent, structural HTML tag surrounding or pointing to an input.', 'A temporary string attribute embedded directly inside the `<input>` node.'],
            ['2. Screen Visibility', 'Visible 100% of the time, regardless of whether the box is filled.', 'Instantly vanishes the split second a user inputs their first character.'],
            ['3. Web Accessibility (WCAG)', 'The absolute mandatory gold standard for screen-reader form interpretation.', 'Often entirely ignored by screen readers, failing strict ADA compliance audits.'],
            ['4. The Click-to-Focus hook', 'Clicking the label text mathematically shifts browser focus to the active input.', 'Clicking it simply focuses the box (because you are clicking the box).'],
            ['5. Form Architecture rule', 'A required component for a robust, user-friendly, semantic form layout.', 'A completely optional luxury element that should never act as a replacement for labels.'],
            ['6. CSS Customization depth', 'Can be targeted, moved, colored, or given complex grid geometries via CSS.', 'Highly resistant to stylings; requires complex `::placeholder` pseudo selectors to edit.'],
            ['7. Mental Cognitive penalty', 'Very low. The user always knows exactly what field they are standing in.', 'High risk. If the user looks away and forgets what the field was, they must delete their text to see the hint.'],
            ['8. Standard Implementation', '`Password:`', '`Type your secret password here...`'],
            ['9. Validation Context saving', 'Critical for error messages ("The Email field is required").', 'Useless for errors, as the placeholder is gone when the red error box bounces.'],
            ['10. Localization Extraction', 'Easily swapped for translation logic by targeting the DOM node text.', 'Harder to localize as scripts must parse attribute variables specifically.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': 'required and readonly attributes',
        'headers': ['Aspect', 'required Attribute', 'readonly Attribute'],
        'points': [
            ['1. Form Validation Behavior', 'Actively blocks submission, triggering a red popup if the field is empty.', 'Completely ignores validation checks since the data is pre-populated and locked.'],
            ['2. The User Interaction goal', 'Demands manual intervention and typing from the end user to proceed.', 'Strictly forbids the end user from altering the provided variable.'],
            ['3. Focus and Cursors', 'Allows normal clicking, focusing, and cursor typing interaction.', 'Allows focusing and text highlighting, but absolutely blocks keyboard stroke editing.'],
            ['4. HTTP Data Transmission', 'If filled, the data flies safely to the server.', 'The locked string value flies safely to the server payload.'],
            ['5. Compatibility range', 'Effective across text, emails, radios, checkboxes, and complex files.', 'Mostly restricted to text-based fields like `text`, `password`, and `date`.'],
            ['6. Checkbox impact logic', 'Forces the user to "Agree" to the Terms of Service to submit.', 'Cannot lock a checkbox; `readonly` fails completely on checkbox/radio toggles.'],
            ['7. CSS State Hooks', 'Targeted globally via the CSS `:required` logical pseudo-class.', 'Targeted primarily via the CSS `:read-only` logical pseudo-class.'],
            ['8. Structural Purpose', 'Guarantees the backend database doesn\'t receive blank NULL profile entries.', 'Allows the frontend to show calculated math (like a cart total) without letting the user fake the price.'],
            ['9. Dynamic DOM toggling', 'Often removed via JS if the user unchecks a parent option box.', 'Often removed via JS to simulate an "Unlock Profile Settings" UI flow.'],
            ['10. Security Fallback', 'Always validate required fields on the backend regardless.', 'Hackers can open DevTools, delete `readonly`, change the price, and submit. Never trust it.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': 'disabled and readonly',
        'headers': ['Point of Difference', 'disabled Attribute', 'readonly Attribute'],
        'points': [
            ['1. Data Payload Submission', 'The field is considered dead; its data is NEVER sent to the server on submit.', 'The field is considered valid; its data IS successfully sent to the server on submit.'],
            ['2. Keyboard Tab Navigation', 'Completely removed from the keyboard Tab sequencing logical flow.', 'Remains firmly in the Tab sequencing flow; users will land on it.'],
            ['3. Copy-Paste Interaction', 'Users are often blocked from highlighting, copying, or right-clicking the text.', 'Users are completely free to highlight and copy the internal text to their clipboard.'],
            ['4. Applicability Target Limits', 'A massive hammer; works on buttons, dropdowns, inputs, and entire `<fieldset>` clusters.', 'A scalpel; applies strictly to typographical input fields and text areas.'],
            ['5. Checkbox/Radio functionality', 'Perfectly locks checkboxes and radios, rendering them un-clickable gray boxes.', 'Has zero effect on checkboxes/radios, leaving them totally functional.'],
            ['6. Visual CSS Alterations', 'Targeted by `:disabled`. Browsers natively gray it out aggressively.', 'Targeted by `:read-only`. Browsers often leave it looking somewhat normal.'],
            ['7. HTML5 Required override', 'A disabled required field is bypassed; the form submits anyway without it.', 'A read-only required field that is blank will still crash the form submission.'],
            ['8. Best Scenario usage', 'A grayed-out "Checkout" button because the cart is empty.', 'An auto-generated static "Customer ID" field in a tech support form.'],
            ['9. Javascript DOM event firing', 'Swallows/destroys JS click mechanisms natively; clicks essentially hit a block.', 'Permits Javascript clicks and hovers to fire perfectly.'],
            ['10. ARIA Mirror configuration', '`aria-disabled="true"`', '`aria-readonly="true"`']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': '<button> and <input type="button">',
        'headers': ['Conceptual Difference', '<button> Tag', '<input type="button">'],
        'points': [
            ['1. Child Node capability', 'Extremely versatile; can wrap `<span>`, `<img>`, `<svg>`, or bold text inside.', 'Incapable of wrapping nodes; the label is strictly flat string text.'],
            ['2. HTML Syntax requirements', 'Requires an explicit opening and closing syntax (`<button>Click</button>`).', 'Operates as a self-closing void tag (`<input>`).'],
            ['3. Form Submission Default', 'Inherently defaults to `type="submit"` resolving form logic instantly.', 'Will absolutely never trigger a form submission natively without JS.'],
            ['4. Rich CSS Styling ease', 'Internal SVG icons and text can be styled using Flexbox spacing beautifully.', 'Highly rigid; you cannot customize the spacing between an icon and text because icons cannot exist easily.'],
            ['5. The Label source', 'The visual button name lives in the DOM tree between the brackets.', 'The visual button name lives strictly inside the rigid `value="name"` property.'],
            ['6. CSS Reset burdens', 'Requires quite a bit of CSS resetting to strip away ugly OS padding and borders.', 'Slightly more aligned with basic input styling, but still needs resets.'],
            ['7. Modern usage rate', 'The overwhelming modern UI standard for web applications.', 'A dusty legacy spec largely abandoned by modern frontend devs.'],
            ['8. Flexibility permutations', 'Can be explicitly forced to be `submit`, `button`, or `reset`.', 'Hardcoded to be just a dumb, non-submitting button.'],
            ['9. Scenario of Utility', 'A complex Material Design floating action button with rippling SVG graphics.', 'A 1999 Geocities web forum layout popup trigger.'],
            ['10. Screen Reader Context', 'Semantic and easily described via nested visually-hidden span hacks.', 'Requires overriding properties heavily if the `value` context is poor.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': '<img> and <picture>',
        'headers': ['Aspect', '<img> Element', '<picture> Element'],
        'points': [
            ['1. Base Functionality', 'A direct conduit to render exactly one specific visual image file.', 'An intelligent wrapper element designed to serve multiple responsive variations of an image.'],
            ['2. Standalone requirement', 'Works perfectly by itself natively.', 'Completely broken and useless unless it contains an `<img>` tag as a fallback component.'],
            ['3. The Art Direction Problem', 'Cannot "crop" or change the focus of an image on mobile phones dynamically.', 'Specifically designed to swap to a tightly cropped, mobile-friendly photo format via source rules.'],
            ['4. Format Fallback strategy', 'Will purely fail and show a broken icon if the browser hates the file type (like older Safaris with WEBP).', 'Gracefully downgrades; tries WEBP, then tries PNG, then falls back to JPEG if needed.'],
            ['5. Media Query Integration', 'Lacks native media query breakpoints internally.', '`source` tags accept `media="(max-width: 768px)"` directly in the HTML markup!'],
            ['6. Code Verbosity', 'Microscopic and clean: `<img src="x.jpg">`', 'Highly verbose, demanding 5-6 lines of `<source>` and fallback logic.'],
            ['7. Using MIME Types', 'Useless on basic image tags natively.', 'Leverages `type="image/avif"` attribute heavily to test browser engine specs.'],
            ['8. Responsive Evolution', 'Historically forced devs to use messy CSS background-image hacks for switching files.', 'The definitive W3C answer to the responsive image payload problem.'],
            ['9. Lazy-loading mechanisms', 'Accepts `loading="lazy"` elegantly on the primary node.', 'The `loading="lazy"` attribute must sit on the nested `<img>` to actually delay downloading.'],
            ['10. Broken Image resilience', 'Offers zero resilience beyond displaying alternative string text (`alt`).', 'Offers maximum architectural resilience providing the perfect file for the perfect screen.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': 'Image Map and Normal Image',
        'headers': ['Difference', 'HTML Image Map Strategy', 'Standard Image Strategy'],
        'points': [
            ['1. Core Concept', 'An image harboring hidden, mathematically defined clickable geometry zones.', 'An image where clicking anywhere on the surface does the exact same thing (if linked).'],
            ['2. Necessary Tag Network', 'Demands an `<img usemap>`, paired with a `<map>` and nested `<area>` coordinates.', 'Demands strictly the `<img src="..">` tag.'],
            ['3. URL Destination Count', 'Can transport users to twenty different websites depending on where they click.', 'Can only link to one single website if wrapped in an `<a>` tag.'],
            ['4. The Coordinate Mapping system', 'Relies heavily on exact pixel `coords="x,y,r"` to define bounding hit-boxes.', 'Unaware of pixel coordinates; treats the box as a single monolithic block.'],
            ['5. Geometric Shapes', 'Defines distinct hit-boxes using `rect`, `circle`, or complex `poly` polygons.', 'The hit-box is always the exact strict outer rectangle bounding the file.'],
            ['6. Responsive Scaling Crisis', 'Notoriously breaks when CSS shrinks the image, misaligning the invisible coordinates entirely.', 'Flawlessly scales up/down using standard `max-width: 100%` CSS commands.'],
            ['7. Modern Engineering Context', 'Considered highly antiquated; developers use inline SVGs for complex clickable diagrams now.', 'Remains the absolute gold standard for serving photographic content.'],
            ['8. Utility Example', 'A graphical map of a mall where clicking a specific store opens its details.', 'A hero photograph spanning a corporate homepage banner.'],
            ['9. The WCAG Accessibility pain', 'A massive headache; every single invisible coordinate needs a descriptive `alt` tag.', 'Straightforward; one simple `alt` phrase describes the whole painting.'],
            ['10. CSS Hover manipulation', 'It is notoriously difficult/impossible to highlight specific map polygons natively using CSS hovers.', 'Easy to scale, fade, or transform the whole entity instantly on hover.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': '<audio> and <video>',
        'headers': ['Aspect', '<audio> Tag', '<video> Tag'],
        'points': [
            ['1. Payload Output Context', 'Deals exclusively with audible frequencies and soundwaves.', 'Deals with moving visual structures accompanied concurrently by audio tracking.'],
            ['2. Dimensional Grid Footprint', 'Possesses no concept of height or width space natively in HTML layouts.', 'Relies heavily on width and height to establish its visual viewport box in the layout.'],
            ['3. The `poster` property', 'Inapplicable, as there is no visual theater box to put a placeholder cover on.', 'Utilizes the `poster="cover.png"` attribute to establish an enticing thumbnail.'],
            ['4. Picture-in-Picture mode', 'Irrelevant API context.', 'Often hooks into the PIP API to hover the screen globally across OS windows.'],
            ['5. Common Codecs (Supported)', 'MP3, OGG, WAV audio compression formats.', 'MP4, WebM, OGG visual compression formats.'],
            ['6. Fullscreen API hooks', 'Cannot utilize fullscreen expansion.', 'Frequently integrated with fullscreen API logic for wide cinematic immersion.'],
            ['7. CSS "object-fit" rules', 'Completely irrelevant to the OS audio timeline bar.', 'Heavily governed by `object-fit: cover` to chop letterboxes in responsive grids.'],
            ['8. Autoplay blocking', 'Chrome fiercely blocks audio autoplay to stop annoying 1990s midi music.', 'Chrome permits video autoplay perfectly as long as it is explicitly marked `muted`.'],
            ['9. Interface Geometry', 'Renders a tiny horizontal play/pause tracker bar.', 'Renders a massive visual player box containing complex timelines and volume mixers.'],
            ['10. `<source>` Tag sharing', 'Uses `<source>` tags to offer format fallbacks seamlessly.', 'Also uses `<source>` tags to offer format fallbacks seamlessly.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': 'controls and autoplay attributes',
        'headers': ['Conceptual Difference', 'controls Property', 'autoplay Property'],
        'points': [
            ['1. Purpose Directive', 'Summons the native OS media UI (Play/Pause, Timeline, Volume) rendering it visible to users.', 'Commands the media file to blast off immediately upon DOM page loading.'],
            ['2. The UX Agency philosophy', 'Respects the user; waits for their physical click confirmation to proceed.', 'Overrides the user; forces the experience aggressively upon page entry.'],
            ['3. Modern Browser Intervention', 'Highly encouraged; browsers render the UI bar perfectly.', 'Highly discouraged; browsers like Safari aggressively block it by default.'],
            ['4. The "Muted" Caveat', 'No additional conditions needed to display the interface bar.', 'Will only reliably fire if the `muted` attribute is also permanently attached to the tag.'],
            ['5. Visual Screen Render', 'Creates a physical visual UI component on the screen.', 'Creates no visual UI component; it just alters the underlying state of the file.'],
            ['6. Accessibility requirements', 'Mandatory for WCAG compliance unless a custom javascript array of buttons replaces it perfectly.', 'A known accessibility hazard; sudden loud noises disorient users with cognitive disabilities.'],
            ['7. Javascript DOM Equivalent', 'Accessing `video.controls = true;` in scripting.', 'Executing the `video.play()` promise inside a script onload cycle.'],
            ['8. Mobile Data Conservation', 'Highly respectful of user mobile data plans, preventing massive downloads until requested.', 'Destroys mobile data plans by forcing heavy video buffering immediately.'],
            ['9. Attribute Syntax Structure', 'A Boolean attribute; appending `controls` means true.', 'A Boolean attribute; appending `autoplay` means true.'],
            ['10. Primary Architectural Use', 'Implementing a site podcast series or an embedded YouTube-style tutorial widget.', 'Powering the sleek, silent looping background video hero on a marketing landing page.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': '<iframe> and <embed>',
        'headers': ['Feature', '<iframe> Element (Inline Frame)', '<embed> Element'],
        'points': [
            ['1. Definition', 'Represents a nested browsing context (putting a webpage inside a webpage).', 'Represents an integration point for external non-HTML applications or interactive content.'],
            ['2. Syntax Structure', 'Demands explicitly closed brackets (`</iframe>`) permitting text fallbacks within.', 'A void element holding no fallback capabilities natively.'],
            ['3. Security Sandboxing', 'Offers a highly robust, paranoid `sandbox="allow-scripts"` security configuration matrix.', 'Lacks HTML5 native, granular sandboxing parameters.'],
            ['4. Legacy Evolution', 'The undisputed modern standard for safe, modular widget integration globally.', 'A relic of the old Netscape era designed specifically to launch Flash/Java `.swf` files.'],
            ['5. Modern Use Cases', 'Pasting a Google Maps pin, embedding a Spotify playlist, or a Stripe payment form.', 'Niche edge cases like embedding highly specific, interactive PDF viewers.'],
            ['6. The CORS Policy constraint', 'Heavily policed by Cross-Origin Resource Sharing protocols preventing script hacking.', 'Relies almost entirely on the specific embedded plugin application\'s own security protocols.'],
            ['7. Responsive Framework', 'Easily constrained and stretched using CSS aspect-ratio tricks dynamically.', 'Can aggressively resist fluid scaling, breaking out of layouts.'],
            ['8. Modern Attributes hooks', 'Supports `allowfullscreen`, `loading="lazy"`, and camera request permissions.', 'Highly rigid block incapable of natively requesting complex lazy-loading deferrals.'],
            ['9. Communication API', 'Allows secure `window.postMessage` asynchronous events to talk to the parent page.', 'Communication relies on old proprietary Javascript plugin bridges that are often broken.'],
            ['10. Obsolescence Timeline', 'Deeply integral to the future of isolated micro-frontends.', 'Replaced almost entirely by modern `<video>`, `<embed>`, or HTML5 Canvas modules.']
        ]
    }
]
