data = [
    {
        'section': 'Tables & Lists',
        'topic': 'Ordered list and Unordered list',
        'headers': ['Aspect', 'Ordered List', 'Unordered List'],
        'points': [
            ['1. Primary Use', 'Used when the sequence or order of items strictly matters.', 'Used when the sequence of items does not matter.'],
            ['2. Visual Presentation', 'Items are marked with numbers, letters, or Roman numerals.', 'Items are marked with bullets, circles, or squares.'],
            ['3. HTML Tag', 'Created using the <ol> tag.', 'Created using the <ul> tag.'],
            ['4. Real-world Example', 'A step-by-step recipe, Top 10 rankings, instructional guides.', 'A grocery shopping list, feature lists, navigation links.'],
            ['5. Default CSS Styling', 'list-style-type: decimal;', 'list-style-type: disc;'],
            ['6. Reordering Impact', 'Changing the order of items fundamentally changes the meaning.', 'Changing the order of items has no effect on the overall meaning.'],
            ['7. Marker Customization', 'Can use CSS "list-style-type" for upper-alpha, lower-roman, etc.', 'Can use CSS "list-style-type" for circle, square, or custom images.'],
            ['8. Nesting Capability', 'Can be nested inside other ordered or unordered lists.', 'Can be nested inside other unordered or ordered lists.'],
            ['9. Screen Reader Behavior', 'Announces "numbered list" and reads out the index of each item.', 'Announces "bulleted list" and typically just reads "bullet" per item.'],
            ['10. Semantic Importance', 'High. It tells the browser that step 2 must follow step 1.', 'Moderate. It groups items together without enforcing a progression.']
        ]
    },
    {
        'section': 'Tables & Lists',
        'topic': '<ul> and <ol>',
        'headers': ['Attribute/Feature', '<ul> Element', '<ol> Element'],
        'points': [
            ['1. Definition', 'Stands for Unordered List.', 'Stands for Ordered List.'],
            ['2. Default Marker type', 'Filled circular bullet (disc).', 'Arabic numerals (1, 2, 3...).'],
            ['3. The "type" attribute', 'Typically accepts values: disc, circle, square.', 'Accepts values: 1, a, A, i, I.'],
            ['4. The "start" attribute', 'Not applicable to unordered lists.', 'Used to specify the starting numerical value of the list.'],
            ['5. The "reversed" attribute', 'Not supported or applicable.', 'Supported in HTML5 to count downwards (e.g., 3, 2, 1).'],
            ['6. The "value" attribute on <li>', 'Ignored by browsers in unordered lists.', 'Supported to manually override and set a specific number for an item.'],
            ['7. Semantic Meaning', 'A simple collection of related items.', 'A sequential collection where element order conveys meaning.'],
            ['8. Child Elements', 'Must only directly contain <li> elements.', 'Must only directly contain <li> elements.'],
            ['9. Common Usage Pattern', 'Primary navigation menus (nav bars) are usually built with <ul>.', 'Legal documents, terms of service, step-by-step tutorials.'],
            ['10. Rendering Engine Default', 'Browser injects a left padding and standard bullet points.', 'Browser injects a left padding and a numbered counter.']
        ]
    },
    {
        'section': 'Tables & Lists',
        'topic': '<td> and <th>',
        'headers': ['Point of Difference', '<td> Element', '<th> Element'],
        'points': [
            ['1. Meaning', 'Stands for Table Data (standard cell).', 'Stands for Table Header (header cell).'],
            ['2. Visual Weight (Default)', 'Text is rendered with normal, regular font weight.', 'Text is rendered with bold font weight by default.'],
            ['3. Alignment Default', 'Text is left-aligned within the cell.', 'Text is centered within the cell.'],
            ['4. Semantic Role', 'Contains the actual data/values within the table matrix.', 'Describes or categorizes the data in the corresponding row or column.'],
            ['5. "scope" attribute', 'Not typically used or required on standard data cells.', 'Highly recommended (row, col, rowgroup, colgroup) for accessibility.'],
            ['6. Screen Reader Priority', 'Read sequentially as grid data.', 'Used as context markers; read aloud before reading the corresponding data.'],
            ['7. Typical Placement', 'Found in the <tbody> section of a table.', 'Found in the <thead> or at the start of rows in the <tbody>.'],
            ['8. CSS Selector Usage', 'Used to style the vast majority of the table matrix.', 'Used to apply distinct background highlight colors for column titles.'],
            ['9. Nesting Forms/Inputs', 'Highly common to nest forms, buttons, or inputs within <td>.', 'Usually purely text-based; forms/inputs are rarely nested here.'],
            ['10. Accessibility Impact', 'Low independent impact; relies on headers for context.', 'Critical for WCAG compliance when building data tables.']
        ]
    },
    {
        'section': 'Tables & Lists',
        'topic': 'colspan and rowspan',
        'headers': ['Property', 'colspan Attribute', 'rowspan Attribute'],
        'points': [
            ['1. Definition', 'Column Span: extends a table cell horizontally across multiple columns.', 'Row Span: extends a table cell vertically across multiple rows.'],
            ['2. Direction of Merge', 'Merges cells from left to right.', 'Merges cells from top to bottom.'],
            ['3. Affected Axis', 'Modifies the X-axis (horizontal layout) of the table grid.', 'Modifies the Y-axis (vertical layout) of the table grid.'],
            ['4. Sibling Element Deletion', 'Requires deleting following <td>/<th> siblings in the *same* row.', 'Requires deleting <td>/<th> matching siblings in the *subsequent* rows.'],
            ['5. Default Value', 'If omitted, the default colspan is 1.', 'If omitted, the default rowspan is 1.'],
            ['6. Use Case Example', 'A single "Total" header spanning across "Price" and "Tax" columns.', 'A single category name spanning across 3 different item rows.'],
            ['7. Maximum Limit Reference', 'Technically limited to 1000 in HTML5 specifications.', 'Set to 0, it tells the cell to span to the end of the table section.'],
            ['8. Layout Complexity', 'Easily tracked visually by reading the <tr> tag.', 'Harder to track as it affects subsequent <tr> tags below it.'],
            ['9. CSS Equivalent', 'None natively in HTML tables (Grid layout uses grid-column).', 'None natively in HTML tables (Grid layout uses grid-row).'],
            ['10. Responsive Design', 'Often problematic on narrow mobile screens (leads to overflow).', 'Can cause extreme height distortion on narrow mobile screens.']
        ]
    },
    {
        'section': 'Tables & Lists',
        'topic': 'Nested list and Definition list',
        'headers': ['Aspect', 'Nested List', 'Definition List (dl)'],
        'points': [
            ['1. Structure/Tags', 'Uses <ul>/<li> or <ol>/<li> placed inside another <li>.', 'Uses a <dl> containing paired <dt> (terms) and <dd> (descriptions).'],
            ['2. Purpose', 'To create multi-level hierarchies, outlines, or sub-menus.', 'To present a glossary, dictionary, or key-value pair metadata.'],
            ['3. Parent-Child Relationship', 'One item contains a strictly subordinate list of items.', 'A flat list where a term implicitly maps to its description.'],
            ['4. Visual Output', 'Indented sub-bullets or sub-numbers.', 'Terms are left-aligned; descriptions are indented below them.'],
            ['5. Required Tags', 'Requires <ul> or <ol>, and <li> exclusively.', 'Requires <dl>, <dt>, and <dd> tags working together.'],
            ['6. Permitted Content', 'Requires an entirely new structural list container inside an item.', 'Terms (<dt>) and descriptions (<dd>) sit at the same level functionally.'],
            ['7. Common Example', 'A dropdown menu where "Products" expands to "Software" and "Hardware".', 'A dictionary page defining words, or a FAQ page.'],
            ['8. CSS Complexity', 'Often requires complex descendant CSS selectors (e.g., ul li ul li).', 'Easier to target distinct elements: dl dt { bold; } dl dd { margin; }.'],
            ['9. Semantic Meaning', 'Hierarchical categorization of data.', 'Relational mapping between a label and its value.'],
            ['10. Accessibility Navigation', 'Screen readers announce the list level (e.g., "Level 2").', 'Screen readers announce "Definition Term" and "Definition Description".']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'Class and ID attributes',
        'headers': ['Comparison Factor', 'Class Attribute', 'ID Attribute'],
        'points': [
            ['1. Uniqueness', 'Can be used exactly the same way on multiple elements in one page.', 'Must be absolutely unique; no two elements can share the same ID.'],
            ['2. Syntax Indicator (CSS)', 'Targeted in CSS using a period/dot (e.g., .myClass).', 'Targeted in CSS using a hash/pound symbol (e.g., #myId).'],
            ['3. Syntax Indicator (JS)', 'Selected via document.getElementsByClassName() or querySelectorAll().', 'Selected via document.getElementById() or querySelector().'],
            ['4. Specificity Weight', 'Medium specificity (10 points in the CSS specificity scale).', 'High specificity (100 points in the CSS specificity scale).'],
            ['5. Multiple Assignments', 'An element can have multiple classes (class="btn red large").', 'An element can only have ONE ID (id="header" is valid, id="head top" is NOT).'],
            ['6. Page Anchor Links', 'Cannot be used to create directly jumpable URL anchor links.', 'Used as fragment identifiers in URLs (e.g., website.com/page#section1).'],
            ['7. Typical Use Case', 'Styling repetitive elements like buttons, cards, or grid columns.', 'Targeting a unique layout container (header, footer, main modal).'],
            ['8. Form Labels', 'Cannot map a <label> to an <input> using a class.', 'The "for" attribute of a <label> must exactly match the ID of an input.'],
            ['9. JavaScript Best Practice', 'Used for applying visual state changes (e.g., .is-active).', 'Often used as the primary, safest hook to bind JavaScript events.'],
            ['10. Overriding Rules', 'Properties are easily overridden by another class further down.', 'Properties are very hard to override without using !important or another ID.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'Global attributes and Event attributes',
        'headers': ['Aspect', 'Global Attributes', 'Event Attributes'],
        'points': [
            ['1. Primary Purpose', 'Provide core functional or styling metadata to an element.', 'Used specifically to trigger JavaScript code upon user interactions.'],
            ['2. Examples', 'class, id, style, title, hidden, tabindex, dir, lang.', 'onclick, onmouseover, onkeydown, onsubmit, onchange.'],
            ['3. Applicability', 'Can be applied basically to any and all standard HTML elements.', 'Applicability varies; form events (onsubmit) only work on forms.'],
            ['4. JavaScript Reliance', 'Can be used purely for CSS, accessibility, or core HTML function.', 'Absolutely useless without JavaScript to execute.'],
            ['5. Execution Timing', 'Parsed and applied immediately as the DOM loads.', 'Parsed, but only executed when the specific physical event occurs.'],
            ['6. CSS Targeting', 'Highly common to target in CSS (e.g., [hidden], .class).', 'Almost never targeted in CSS for styling purposes.'],
            ['7. Modern Best Practices', 'Heavily used every day in modern web development.', 'Considered bad practice (inline JS); developers prefer addEventListener().'],
            ['8. Content Security Policy', 'Rarely flagged by standard CSPs unless using inline style="".', 'Often entirely blocked by strict CSPs that forbid inline scripting.'],
            ['9. Examples: Accessibility', 'ARIA attributes, tabindex, lang are critical for accessibility.', 'Hover events can be inherently inaccessible to keyboard-only users.'],
            ['10. Scope', 'Defines the state or identity of the element permanently.', 'Defines an action pathway that only exists transiently during usage.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'data-* attributes and Custom attributes',
        'headers': ['Difference', 'data-* Attributes', 'Custom (Made-up) Attributes'],
        'points': [
            ['1. Validity/Standardization', 'Fully valid and part of the official HTML5 specification.', 'Invalid HTML; creates markup that will fail W3C validation.'],
            ['2. Syntax Format', 'Must always properly begin with "data-" (e.g., data-user-id="12").', 'Can be literally any string that isn’t a standard attribute (e.g., my-attr="12").'],
            ['3. JavaScript Access', 'Easily accessed via the specialized HTML5 `element.dataset` API.', 'Must be manually accessed via `element.getAttribute("my-attr")`.'],
            ['4. Dataset Property conversion', 'data-user-name automatically becomes element.dataset.userName (camelCase).', 'No automatic camelCase JS object property mapping exists.'],
            ['5. Purpose', 'Designed purely to store private custom data meant for JS or CSS.', 'Often mistakenly used by developers unaware of the data-* standard.'],
            ['6. Browser Handling', 'Browsers natively ignore them for rendering, guaranteeing safe storage.', 'Browsers ignore them, but they might conflict with future HTML updates.'],
            ['7. Reliability Frameworks', 'React, Vue, and Angular natively understand and map data-* well.', 'Libraries might throw warnings on unrecognized unknown DOM properties.'],
            ['8. CSS Selectors', 'Safe to target: `div[data-status="active"] { ... }`.', 'Can be targeted, but highly unrecommended and fragile.'],
            ['9. SEO Impact', 'Search engines generally ignore them, prioritizing visual text.', 'Search engines ignore them, but excessive invalid HTML lowers code quality.'],
            ['10. Best Practice', 'The absolute correct standard for embedding custom dataset info.', 'A bad practice that should be refactored into data-* immediately.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'Inline CSS and Internal CSS',
        'headers': ['Feature', 'Inline CSS', 'Internal CSS'],
        'points': [
            ['1. Location', 'Applied directly inside the opening tag of an HTML element.', 'Written inside a <style> block, typically within the HTML <head> section.'],
            ['2. Syntax Style', 'Uses the "style" attribute (e.g., style="color: red;").', 'Uses standard CSS selectors and braces (e.g., p { color: red; }).'],
            ['3. Reusability', 'Zero reusability. Styles apply only to that exact single element.', 'Can be reused across multiple elements within the same HTML page.'],
            ['4. Specificity Ranking', 'Very high specificity (1000 points); overrides almost everything.', 'Standard specificity; overrides external CSS but yielding to inline CSS.'],
            ['5. Code Maintenance', 'Extremely difficult to maintain in large files (spaghetti code).', 'Moderate maintenance; centralized within the file but isolated from others.'],
            ['6. Pseudo-classes', 'Cannot use pseudo-classes like :hover, :focus, or :active.', 'Can easily define pseudo-classes and complex descendant selectors.'],
            ['7. Media Queries', 'Impossible to write responsive Media Queries inline.', 'Fully supports responsive Media Queries for mobile-first design.'],
            ['8. Page Load Time', 'Increases HTML document file size directly.', 'Also increases document size, but avoids redundant inline repetitions.'],
            ['9. Content Security Policy', 'Often explicitly blocked by strict CSPs to prevent XSS attacks.', 'Can also be blocked by CSP, but easier to whitelist with nonces.'],
            ['10. Best Practice Scenario', 'Used only for quick, temporary debugging or dynamic JS injection.', 'Used for small page-specific overrides, or single-page landing sites.']
        ]
    },
    {
        'section': 'Classes, IDs & Attributes',
        'topic': 'Internal CSS and External CSS',
        'headers': ['Aspect', 'Internal CSS', 'External CSS'],
        'points': [
            ['1. File Structure', 'Resides within the same .html file inside <style> tags.', 'Resides in completely separate .css files linked to the HTML.'],
            ['2. Linking Method', 'Requires no linkage; natively part of the HTML text.', 'Requires a <link rel="stylesheet" href="style.css"> tag in the head.'],
            ['3. Reusability (Cross-Page)', 'Styles cannot be shared with other HTML pages.', 'The exact same CSS file can be linked across 1,000 different HTML pages.'],
            ['4. Browser Caching', 'Cannot be cached independently; downloaded every time HTML loads.', 'Cached by the browser independently, greatly speeding up multi-page visits.'],
            ['5. Separation of Concerns', 'Mixes structural markup (HTML) with presentation logic (CSS).', 'Achieves perfect separation of concerns, ensuring clean architecture.'],
            ['6. Priority / Overrides', 'Typically overrides External rules if placed later in the document.', 'Acts as the baseline styling which might be overridden by internal tweaks.'],
            ['7. Team Collaboration', 'Causes merge conflicts if developers work on styling and structure simultaneously.', 'Allows front-end designers to edit CSS without touching backend HTML logic.'],
            ['8. Document Clutter', 'Bloats the HTML file, making structural code harder to read.', 'Keeps HTML files small, clean, and highly readable.'],
            ['9. Multiple Device Support', 'Cumbersome to maintain huge media query blocks internally.', 'Easy to assign different external stylesheets using media attributes.'],
            ['10. Industry Standard', 'Only used for minimal, single-page sites or embedded widget tools.', 'The absolute undeniable standard for all professional web applications.']
        ]
    }
]
