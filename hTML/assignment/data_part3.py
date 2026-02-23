data = [
    {
        'section': 'Forms & Input Elements',
        'topic': '<input> and <textarea>',
        'headers': ['Aspect', '<input> Element', '<textarea> Element'],
        'points': [
            ['1. Line Capability', 'Strictly single-line text input.', 'Designed for multi-line text input.'],
            ['2. Tag Structure', 'Empty/Void element (no closing tag).', 'Requires both opening and closing tags (<textarea></textarea>).'],
            ['3. Defining Value', 'Given via the `value` attribute (e.g., value="text").', 'Placed directly between the opening and closing tags.'],
            ['4. Resizability', 'Cannot be resized by the user.', 'Can often be dragged and resized by default in modern browsers.'],
            ['5. Data Type Flexibility', 'Can handle text, passwords, emails, files, dates, numbers, checkboxes.', 'Exclusively handles plain multiline text.'],
            ['6. Dimensions attributes', 'Controlled purely by CSS (`width`, `height`) or `size`.', 'Can use `cols` (columns/width) and `rows` (lines/height) attributes.'],
            ['7. Common Use Case', 'Usernames, passwords, single search queries.', 'Contact forms, long product descriptions, forum posts.'],
            ['8. Wrapping behavior', 'Text simply scrolls horizontally forever.', 'Text wraps automatically to a new line when reaching the border.'],
            ['9. The "wrap" attribute', 'Not applicable to the input element.', 'Can be set to "soft" (default) or "hard" (submits newlines) physically.'],
            ['10. Maximum Length restriction', 'Uses `maxlength` to stop typing past a limit.', 'Also uses `maxlength`, but counts hidden newline characters (\\r\\n).']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': 'Radio button and Checkbox',
        'headers': ['Comparison Point', 'Radio Button', 'Checkbox'],
        'points': [
            ['1. Primary Logic', 'Mutually exclusive selection within a specific group.', 'Independent selection within a specific list.'],
            ['2. Shape/UI Render', 'Typically rendered by browsers as a small circle.', 'Typically rendered by browsers as a small square.'],
            ['3. Number of Choices', 'User can pick exactly ONE option from the group.', 'User can pick ZERO, ONE, or MULTIPLE options from the list.'],
            ['4. Input Type Attribute', 'type="radio"', 'type="checkbox"'],
            ['5. Grouping Mechanism', 'Must share the same "name" attribute to act as a single exclusive choice.', 'Can share a name for array submissions, but operate independently.'],
            ['6. Deselection', 'Once clicked, it cannot be deselected by clicking again.', 'Can be easily toggled on and off by clicking repeatedly.'],
            ['7. Common Example', 'Selecting Gender (Male/Female/Other) or Payment Method.', 'Selecting Newsletter Subscriptions or accepting Terms and Conditions.'],
            ['8. Keyboard Navigation', 'Arrow keys switch between options of the same radio group.', 'Spacebar toggles the currently focused individual checkbox.'],
            ['9. "indeterminate" state', 'Not inherently supported.', 'Supported via JavaScript to show a "partially checked" tri-state.'],
            ['10. Default Checked behavior', 'Only one in the group can practically carry the `checked` attribute.', 'Multiple checkboxes in the same form can carry the `checked` attribute.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': 'GET and POST method',
        'headers': ['Factor', 'GET Method', 'POST Method'],
        'points': [
            ['1. Data Appending Location', 'Appends form data directly to the URL string (Query Parameters).', 'Includes form data securely inside the HTTP request body.'],
            ['2. Security Risk', 'Highly insecure. Passwords appear visible in the browser URL history.', 'More secure. Data is hidden from the URL and server logs.'],
            ['3. Data Length Limit', 'Strict limit (typically ~2000-8000 characters) depending on the browser.', 'Virtually no limit on data size (can upload huge files/videos).'],
            ['4. Idempotency Rule', 'Considered idempotent (calling it multiple times doesn’t change server state).', 'Not idempotent (calling it repeatedly can create duplicate orders/records).'],
            ['5. Caching & Bookmarking', 'Can easily be cached, bookmarked, and safely reloaded by the user.', 'Cannot be bookmarked. Reloading shows an "Are you sure?" browser warning.'],
            ['6. Supported Data Types', 'Only allows basic ASCII string data.', 'Allows complex binary data (images, PDFs) if using multipart/form-data.'],
            ['7. Common Use Case', 'Search queries, public page filters, sorting preferences.', 'Login credentials, submitting blog articles, processing credit cards.'],
            ['8. Performance Speed', 'Slightly faster due to simple URL parameter mapping.', 'Slightly slower as it requires reading the larger request payload.'],
            ['9. HTTP Specification', 'Should only be used for retrieving or fetching external data.', 'Should be used for sending, mutating, or creating backend data.'],
            ['10. Default Form Action', 'It is the default method used if none is specified in `<form>`.', 'Must be explicitly set using `method="POST"` in the `<form>` tag.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': '<label> and placeholder',
        'headers': ['Aspect', '<label> Element', 'Placeholder Attribute'],
        'points': [
            ['1. Implementation Type', 'A structural HTML tag `<label>Name</label>`.', 'An attribute inside an input `<input placeholder="Name">`.'],
            ['2. Visual Persistence', 'Always remains visible, even after the user starts typing.', 'Disappears the moment the user types the first character.'],
            ['3. Accessibility Support', 'Crucial for accessibility. Screen readers announce the input meaning.', 'Usually ignored by screen readers until specifically focused.'],
            ['4. Clicking Behavior', 'Clicking the label natively focuses the linked input field.', 'Clicking it simply focuses the input (it is part of the input).'],
            ['5. Form Requirement', 'A fundamental, indispensable part of valid form building.', 'An optional, helpful UI hint that should never replace a label.'],
            ['6. CSS Customization', 'Can be fully styled, positioned, animated, or hidden externally.', 'Limited styling available via `::placeholder` pseudo-element.'],
            ['7. Cognitive Load', 'Low cognitive load; users can always see what the field means.', 'High load; users forget what they are typing if they get distracted.'],
            ['8. Content Example', '"First Name" or "Email Address".', '"e.g., john.doe@mail.com".'],
            ['9. Error Handling Context', 'Provides essential context if the form validation fails.', 'Useless for validation as it is hidden when data contains errors.'],
            ['10. Translation/Localization', 'Easily targeted and extracted by localization software.', 'Requires parsing element attributes to extract string values.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': 'required and readonly attributes',
        'headers': ['Feature', 'required Attribute', 'readonly Attribute'],
        'points': [
            ['1. Core Mechanism', 'Forces the user to interact and provide input before submitting.', 'Prevents the user from typing or changing the data.'],
            ['2. Form Validation', 'Triggers standard HTML5 form validation (red popups).', 'Bypasses standard empty-field validations (data is pre-set).'],
            ['3. Focusability', 'The user can freely click, focus, and interact with the field.', 'The user can focus the field, select it, and copy the text.'],
            ['4. Data Submission Status', 'Empty required fields prevent form submission entirely.', 'The read-only data is always submitted successfully to the server.'],
            ['5. Target Elements', 'Works on text, radios, checkboxes, files, dates, etc.', 'Only valid for text, password, search, url, tel, email, and dates.'],
            ['6. Effect on Checkboxes', 'Makes the checkbox mandatory (e.g., agreeing to Terms).', 'Has zero effect on checkboxes or radios (they can still be toggled).'],
            ['7. Visual State Change', 'Often hooked into CSS using `:required` pseudo-class (e.g., red star).', 'Often hooked via `:read-only` (usually styled with gray background).'],
            ['8. Common Use Case', 'Essential profile fields like username, email, passwords.', 'Auto-filled static data like customer ID or calculated invoice totals.'],
            ['9. Javascript Interaction', 'Often toggled on/off dynamically based on dependent choice logic.', 'Often removed dynamically if the user clicks an "Edit Details" button.'],
            ['10. Server-side Reliance', 'Should never be trusted alone; server must re-verify requirements.', 'Can be manipulated by hackers; never trust read-only data blindly.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': 'disabled and readonly',
        'headers': ['Comparison Factor', 'disabled Attribute', 'readonly Attribute'],
        'points': [
            ['1. Form Submission', 'The field’s value is NOT submitted to the server.', 'The field’s value IS successfully submitted to the server.'],
            ['2. Focusability/Tabbing', 'Cannot be focused, clicked, or reached via the Tab key.', 'Can be focused, highlighted, and reached natively via Tab key.'],
            ['3. Text Selection', 'Users usually cannot highlight or copy the text inside.', 'Users can freely highlight, right-click, and copy the containing text.'],
            ['4. Applicable Elements', 'Wide scope: works on inputs, buttons, selects, entire fieldsets.', 'Narrow scope: primarily works on text-based inputs and textareas only.'],
            ['5. Checkbox/Radio Impact', 'Effectively freezes them, stopping users from checking/unchecking.', 'Has no effect whatsoever on radio buttons or checkboxes.'],
            ['6. CSS Styling Targeting', 'Can be styled directly using the `:disabled` pseudo-class.', 'Can be styled directly using the `:read-only` pseudo-class.'],
            ['7. Required Interaction', 'If a field is disabled, it bypasses HTML5 `required` validation checks.', 'If a read-only field is blank, it may fail `required` checks if present.'],
            ['8. Common Scenario', 'A "Submit" button before the Terms are accepted.', 'An auto-generated unique tracking number in a support ticket form.'],
            ['9. DOM Events', 'Natively swallows and blocks JavaScript click/focus events.', 'Allows standard JavaScript click, hover, and focus events.'],
            ['10. ARIA Equivalent', 'Mirrored by `aria-disabled="true"` in accessible component design.', 'Mirrored by `aria-readonly="true"` in accessible component design.']
        ]
    },
    {
        'section': 'Forms & Input Elements',
        'topic': '<button> and <input type="button">',
        'headers': ['Difference', '<button> Element', '<input type="button">'],
        'points': [
            ['1. Complex Content Nested', 'Can easily contain HTML, images, spans, SVGs, or bold text inside.', 'Strictly limited to a plain text string defined in the `value` attribute.'],
            ['2. Closing Tag Necessity', 'Requires a paired closing tag (`</button>`).', 'Void element requiring no closing tag (`<input>`).'],
            ['3. Default Form Type', 'Its default `type` is "submit" if placed inside a `<form>`.', 'Its `type` is strictly "button" and will never submit a form by default.'],
            ['4. Styling Flexibility', 'Extremely flexible. Internal children can be styled via Flexbox/Grid.', 'Rigid. The text node inside cannot be targeted with separate CSS rules.'],
            ['5. Attribute Mapping', 'Content shown to the user sits strictly between the element tags.', 'Content shown to the user is controlled by the `value="..."` attribute.'],
            ['6. CSS Reset Difficulty', 'Often comes with annoying browser default padding, borders, outlines.', 'Slightly less complex defaults, but still requires normalizing resets.'],
            ['7. Modern Standard/Preference', 'The absolute modern standard for almost all interactive web designs.', 'Considered a legacy approach practically abandoned in complex designs.'],
            ['8. Multiple Use Types', 'Can be naturally cast as submit, button, or reset.', 'Requires specific hardcoded types like type="submit" or type="reset" instead.'],
            ['9. Use Case Example', 'A login button with an animated spinning loader SVG inside.', 'A basic generic functional button on a 1990s web directory form.'],
            ['10. Accessibility Trees', 'Can easily wrap a span that has `sr-only` class for screen readers.', 'Relies heavily on `aria-label` attribute if the value text is ambiguous.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': '<img> and <picture>',
        'headers': ['Aspect', '<img> Element', '<picture> Element'],
        'points': [
            ['1. Base Function', 'Loads a single specified static or animated image file natively.', 'Acts as a wrapper choosing the best image among multiple <source> files.'],
            ['2. Independent Value', 'Functions perfectly on its own without requiring child tags.', 'Cannot display anything itself; always requires an <img> child as fallback.'],
            ['3. Art Direction Use Case', 'Displays precisely the same image regardless of device size/shape.', 'Allows serving cropped, zoomed, or entirely different images to mobiles.'],
            ['4. Format Support Flexibility', 'Browser will fail if it doesn’t understand the single file format.', 'Provides fallback formats (e.g., tries WEBP, fallback to JPG, fallback to PNG).'],
            ['5. Media Queries linkage', 'Has zero awareness of CSS breakpoints internally.', 'Ties natively into media queries using the `<source media="...">` attribute.'],
            ['6. Simplicity factor', 'Simplest syntax possible. E.g., `<img src="a.jpg">`.', 'Highly verbose. Requires `<picture>`, multiple `<source>`, and an `<img>` tag.'],
            ['7. Type attribute', 'Not applicable to the main tag.', 'Extensively uses the `type="image/webp"` attribute on `<source>` tags.'],
            ['8. Responsive implementation', 'Historically handled using CSS background-images to switch sources.', 'The modern standard HTML mechanism for true responsive hero images.'],
            ['9. Lazy Loading Context', 'Supported directly via `loading="lazy"`.', 'Must apply the `loading="lazy"` attribute specifically to the internal `<img>`.'],
            ['10. Content Security / Fallbacks', 'No built-in fallback beyond the `alt` text attribute.', 'Provides robust cascading fallbacks preventing broken image boxes universally.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': 'Image Map and Normal Image',
        'headers': ['Point of Difference', 'Image Map', 'Normal Image'],
        'points': [
            ['1. Definitional Concept', 'An image containing independent, defined clickable geometric regions.', 'A standard image where the entire element acts identically (or does nothing).'],
            ['2. Required Tags Setup', 'Requires `<img usemap="...">`, a `<map>` tag, and internal `<area>` tags.', 'Requires only the singular generic `<img>` tag.'],
            ['3. Link Target Count', 'Can link to dozens of different URLs from the exact same image.', 'Can only link to one single URL (if wrapped inside an `<a>` tag).'],
            ['4. Defining Hotspots', 'Hotspots are defined using specific X/Y coordinate systems mapping the file.', 'Has zero internal coordinate mapping system awareness.'],
            ['5. Shapes Support', 'Supports bounding boxes, circles, and highly complex custom polygons.', 'The clickable area is always restricted strictly to a rectangular box.'],
            ['6. Responsive Scaling', 'Historically breaks terribly when CSS shrinks/scales the image (coordinates misalign).', 'Scales up and down perfectly with CSS max-width and height auto controls.'],
            ['7. Modern Alternatives', 'Largely abandoned; developers prefer placing SVG paths or absolute divs over images.', 'Remains the absolute standard for singular web photography.'],
            ['8. Typical Use Case Event', 'A map of the USA where clicking a state opens that state’s directory.', 'A website logo, a profile picture, or a blog post hero cover.'],
            ['9. Accessibility Handling', 'Requires complex `alt` attributes mapped to each invisible `<area>` hotspot individually.', 'Requires a single `alt` attribute summarizing the entire photo visually.'],
            ['10. CSS Hover States', 'Cannot easily highlight or add hover borders to specific mapped native areas.', 'Can easily fade out, outline, or transform the entire image on user hover.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': '<audio> and <video>',
        'headers': ['Comparison Logic', '<audio> Element', '<video> Element'],
        'points': [
            ['1. Target Media Output', 'Plays sound files (music, podcasts, voice recordings).', 'Plays visual motion files alongside sound tracks.'],
            ['2. Visual Dimensions', 'Zero visual sizing. Has no `height` or `width` attributes natively.', 'Highly reliant on CSS or HTML `height` and `width` dimension attributes.'],
            ['3. Poster Attribute', 'Not applicable (has no visual box to act as a placeholder).', 'Supports `poster="img.jpg"` to show a thumbnail before the user clicks play.'],
            ['4. Picture-in-Picture feature', 'Irrelevant feature.', 'Supports popping out into a floating window in modern desktop browsers.'],
            ['5. Typical Native Formats', 'MP3, WAV, OGG.', 'MP4, WebM, Ogg Video.'],
            ['6. Fullscreen API hooks', 'Cannot trigger or utilize the `requestFullscreen` API natively.', 'Often deeply integrated with the `requestFullscreen` API for cinematic viewing.'],
            ['7. CSS "object-fit"', 'Irrelevant. The control bar is a fixed browser OS widget.', 'Determines if the video is letterboxed, cropped, or stretched in its container.'],
            ['8. Muted Autoplay Impact', 'Autoplay fails on modern browsers unless muted (but muted audio is useless).', 'A muted autoplay video functions perfectly as a dynamic, silent hero background.'],
            ['9. Control UI Footprint', 'Displays a very small, thin horizontal timeline scroller.', 'Displays a large visual footprint containing the player UI at the bottom tracking.'],
            ['10. Fallback Mechanisms', 'Supports multiple <source> tags exactly like the video element.', 'Supports multiple <source> tags exactly like the audio element.']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': 'controls and autoplay attributes',
        'headers': ['Feature', 'controls Attribute', 'autoplay Attribute'],
        'points': [
            ['1. Interactive Purpose', 'Provides the user with a UI bar (play, pause, timeline, volume).', 'Commands the media file to play automatically the moment the page loads.'],
            ['2. User Agency Concept', 'Requires deliberate user action (clicking play) to begin consuming media.', 'Overrides user agency, forcibly starting the media experience.'],
            ['3. Browser UX Policies', 'Considered an excellent, compliant user experience practice.', 'Considered highly aggressive; actively blocked by Chrome and Safari policies.'],
            ['4. The Muted Exception', 'Browsers rarely block the display of a user control bar.', 'Browsers will only allow autoplay if the `muted` attribute is concurrently active.'],
            ['5. Visual Interface Render', 'Causes the browser to inject its native media OS player layout onto the screen.', 'Has zero structural footprint; plays the media invisibly if controls are hidden.'],
            ['6. Accessibility (WCAG) Rule', 'Required for compliance unless a custom javascript UI alternative is perfectly coded.', 'Often fails WCAG compliance if users cannot immediately figure out how to pause it.'],
            ['7. Javascript Equivalent', 'Setting `video.controls = true;` in the DOM API.', 'Triggering `video.play()` within a script upon DOMContentLoaded events.'],
            ['8. Bandwidth/Data Cost', 'Saves user data because the file often defers massive loading until play is requested.', 'Wastes user mobile data by downloading heavy buffers immediately on page load.'],
            ['9. Value Type', 'Boolean attribute (no value needed, simply write `controls`).', 'Boolean attribute (no value needed, simply write `autoplay`).'],
            ['10. Best Practice Use Case', 'Music player embeds, podcast platforms, tutorial walkthrough videos.', 'Silent background ambient looping videos on fancy landing pages (requires muted).']
        ]
    },
    {
        'section': 'Images & Media',
        'topic': '<iframe> and <embed>',
        'headers': ['Aspect', '<iframe> Element', '<embed> Element'],
        'points': [
            ['1. Full Name', 'Stands for Inline Frame.', 'Stands for Embed Object.'],
            ['2. Primary Function', 'Nests an entirely independent HTML webpage inside an isolated browsing context.', 'Integrates specialized external non-HTML applications or plugin data directly.'],
            ['3. Closing Tag Structure', 'Requires a paired closing tag (</iframe>) allowing fallback text inside.', 'Void element requiring no closing tag, offering no internal native text fallback.'],
            ['4. Security Configuration', 'Supports robust sandboxing restrictions via the `sandbox` security attribute.', 'Lacks native, granular HTML5 security sandboxing attributes.'],
            ['5. Legacy History Context', 'Evolved into the standard for integrating third-party widgets safely.', 'A deeply legacy Netscape artifact designed for 90s browser plugins (Flash, Java).'],
            ['6. Target Scenarios', 'Embedding YouTube videos, Google Maps, secure payment gateways, CodePen sandboxes.', 'Embedding interactive PDFs, SVG objects, SWF Flash files (historically).'],
            ['7. DOM Access Rules', 'Strictly governed by CORS (Cross-Origin Resource Sharing) policies for security.', 'Rely on the external plugin software’s own internal security configurations.'],
            ['8. Responsive Adaptability', 'Extremely common to make responsive (16:9 ratio wrapper tricks).', 'Can be made responsive, but the internal plugin object might break layout rules.'],
            ['9. Seamless Integration', 'Supports parameters like `allowfullscreen` and `loading="lazy"`.', 'Usually acts as a rigid block; lacks native lazy-loading and modern API hooks.'],
            ['10. Deprecation and Outlook', 'Heavily adopted, updated, and critical to modern web architecture constructs.', 'Largely obsolete as plugins died; modernized natively by `<object>`, HTML5 video.']
        ]
    }
]
