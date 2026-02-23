data = [
    {
        'section': 'HTML & HTML5 Basics',
        'topic': 'HTML vs HTML5',
        'headers': ['Aspect', 'HTML', 'HTML5'],
        'points': [
            ['1. Primary Definition', 'A standard markup language used to create web pages.', 'The latest and most improved version of HTML with advanced features.'],
            ['2. Audio and Video Support', 'Requires external plugins like Flash Player or Silverlight.', 'Has native <audio> and <video> tags to embed media directly.'],
            ['3. Vector Graphics', 'Requires external plugins/technologies like VML.', 'Native support for SVG and Canvas elements.'],
            ['4. Storage Mechanism', 'Rely purely on browser cookies (small size limits).', 'Provides LocalStorage and SessionStorage capabilities.'],
            ['5. Web Workers', 'Not supported; scripts block the main UI thread.', 'Native support allowing JavaScript to run in the background.'],
            ['6. DOCTYPE Declaration', 'Very long and complex (e.g., HTML 4.01 Transitional).', 'Extremely simple and short: <!DOCTYPE html>.'],
            ['7. Semantic Elements', 'Relies heavily on generic tags like <div> and <span>.', 'Introduced semantic tags like <header>, <footer>, <article>.'],
            ['8. Error Handling', 'Inconsistent error handling across different browsers.', 'Standardized and highly consistent parsing and error handling.'],
            ['9. Mobile Responsiveness', 'Not inherently designed for modern mobile devices.', 'Designed inherently to support mobile devices and responsive web apps.'],
            ['10. MathML Support', 'Does not support native math rendering.', 'Native support for rendering mathematical formulas using MathML.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': 'HTML4 DOCTYPE vs HTML5 DOCTYPE',
        'headers': ['Comparison Point', 'HTML4 DOCTYPE', 'HTML5 DOCTYPE'],
        'points': [
            ['1. Syntax Simplicity', 'Long, verbose, and difficult to type from memory.', 'Extremely short, simple, and easy to memorize.'],
            ['2. Example', '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"...>', '<!DOCTYPE html>'],
            ['3. Link to DTD', 'Requires referencing a Document Type Definition (DTD).', 'Does not require or use a DTD link.'],
            ['4. Purpose', 'Required to validate the document structure against SGML rules.', 'Required primarily to trigger "Standards Mode" in modern browsers.'],
            ['5. Version Variants', 'Has three versions: Strict, Transitional, and Frameset.', 'One universal, un-versioned declaration.'],
            ['6. SGML Relationship', 'HTML4 is an application of SGML, hence the complex syntax.', 'HTML5 is not based on SGML, making complex declarations obsolete.'],
            ['7. Case Sensitivity', 'Typically written in specific case configurations.', 'Case-insensitive (though lowercase "html" is standard).'],
            ['8. Quirk Mode Risk', 'A typo or missing DTD could easily trigger browser Quirks Mode.', 'The short syntax prevents errors and guarantees Standards Mode.'],
            ['9. Developer Experience', 'Usually copy-pasted from older projects or boilerplate templates.', 'Can be typed manually in a second layout.'],
            ['10. Deprecation Status', 'Considered legacy and obsolete for modern web standards.', 'The current recommended industry standard.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': 'Block-level elements and Inline elements',
        'headers': ['Feature', 'Block-level Elements', 'Inline Elements'],
        'points': [
            ['1. Line Formatting', 'Always starts on a new line and ends with a line break.', 'Stays on the same line; does not force line breaks.'],
            ['2. Width Allocation', 'Takes up the full width (100%) of its parent container.', 'Takes up only as much width as necessary for its content.'],
            ['3. Explicit Dimensions', 'Accepts CSS width and height properties perfectly.', 'Ignores custom width and height properties.'],
            ['4. Margin Behavior', 'Top, bottom, left, and right margins are applied correctly.', 'Only left and right margins effectively push content.'],
            ['5. Padding Behavior', 'Padding pushes surrounding elements on all four sides.', 'Vertical padding applies visually but bleeds into adjacent line boxes.'],
            ['6. Permitted Nesting', 'Can contain inline elements and other block elements.', 'Can only contain text data and other inline elements, not block elements.'],
            ['7. HTML Examples', '<div>, <p>, <h1>, <form>, <ul>', '<span>, <a>, <strong>, <em>, <img>'],
            ['8. Primary Purpose', 'Used for structural layouts and segregating large areas.', 'Used for styling or wrapping small pieces of text/content.'],
            ['9. Default CSS Rule', 'display: block;', 'display: inline;'],
            ['10. Box Model Adherence', 'Follows the CSS Box Model comprehensively.', 'Partially adheres to the Box Model (vertical spacing irregularities).']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<div> and <span>',
        'headers': ['Difference', '<div> Element', '<span> Element'],
        'points': [
            ['1. Element Classification', 'It is a Block-level element.', 'It is an Inline element.'],
            ['2. Line Breaks', 'Automatically adds a line break before and after.', 'Does not add line breaks; flows horizontally.'],
            ['3. Default Width', 'Spans 100% of the available horizontal space.', 'Contracts to the exact width needed for its text content.'],
            ['4. Usage Context', 'Used to group large sections or chunks of page layout.', 'Used to group small chunks of inline text or styling.'],
            ['5. Sizing Control', 'Can be customized with specific height and width attributes.', 'Height and width attributes are completely ignored.'],
            ['6. Nesting Rule', 'Can act as a parent for paragraphs, lists, and headings.', 'Should only wrap text and other inline tags.'],
            ['7. Margin Application', 'Margins on all sides will affect the page layout.', 'Vertical margins (top/bottom) will not affect surrounding lines.'],
            ['8. Meaning', 'A generic, non-semantic block container.', 'A generic, non-semantic inline container.'],
            ['9. Common CSS Uses', 'Changing page layouts, applying background blocks, flexbox containers.', 'Changing text color, font weight, or applying background highlights.'],
            ['10. Typical Sibling Elements', 'P, H1, SECTION, ARTICLE', 'A, B, I, EM, BR']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<b> and <strong>',
        'headers': ['Factor', '<b> Element', '<strong> Element'],
        'points': [
            ['1. Meaning/Semantics', 'Purely presentational (Visual impact only).', 'Highly semantic (Indicates strong importance).'],
            ['2. Screen Reader Audio', 'Typically read with normal, un-emphasized voice.', 'Usually read with an emphasized, distinct tone by assistive tech.'],
            ['3. Primary Purpose', 'To draw attention to text without conveying extra importance.', 'To indicate that the text is of serious urgency or high importance.'],
            ['4. Visual Output', 'Renders text in bold style.', 'Also renders text in bold style defaults.'],
            ['5. Examples', 'Keywords in a summary, product names.', 'Warnings, danger notices, critical instructions.'],
            ['6. Accessibility', 'Poor choice for accessibility (blind users miss the context).', 'Excellent choice for web accessibility standards (WCAG).'],
            ['7. Direct CSS Equivalent', 'Identical to using "font-weight: bold;".', 'No true CSS equivalent since CSS cannot inject meaning.'],
            ['8. SEO Impact', 'Historically ignored or given negligible weight by crawlers.', 'Search engines may give slightly more context weight to strong text.'],
            ['9. History', 'A legacy tag from early HTML days.', 'Introduced later to decouple presentation from structure.'],
            ['10. Modern Best Practice', 'Avoid unless explicitly needing to highlight without adding meaning.', 'Use whenever the text is functionally critical or important.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<i> and <em>',
        'headers': ['Aspect', '<i> Element', '<em> Element'],
        'points': [
            ['1. Core Concept', 'Presentational tag indicating "italicized" text.', 'Semantic tag indicating vocal "emphasis" on text.'],
            ['2. Accessibility', 'Screen readers read the text normally without nuance.', 'Screen readers will alter voice pitch to emphasize the enclosed text.'],
            ['3. Purpose', 'Used for alternate voice/mood, taxonomic names, or technical terms.', 'Used when altering the text changes the meaning of a spoken sentence.'],
            ['4. Browser Rendering', 'Renders the content in italics by default.', 'Also renders the content in italics by default.'],
            ['5. Example Use Cases', 'Book titles, foreign words, ship names (e.g., Titanic).', 'Emphasizing a feeling: "I *really* meant what I said".'],
            ['6. CSS Replacement', 'Easily replaced with "font-style: italic;".', 'Cannot be functionally replaced by CSS.'],
            ['7. Meaning/Semantic Value', 'Has almost no structural semantics.', 'Posesses high structural semantic value.'],
            ['8. SEO Handling', 'Treated as generic text by modern search algorithms.', 'Helps parsers understand the structural context of the phrase.'],
            ['9. Nesting Implications', 'Nesting <i>tags usually achieves nothing beyond italics.', 'Nesting <em> inside <em> can theoretically increase emphasis levels.'],
            ['10. HTML5 Shift', 'Redefined from just "italic" to idiomatic text in HTML5.', 'Maintained primarily as a structural stress marker.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<section> and <div>',
        'headers': ['Feature', '<section> Element', '<div> Element'],
        'points': [
            ['1. Semantics', 'A thoroughly semantic element.', 'A completely non-semantic element.'],
            ['2. Implied Meaning', 'Represents a standalone thematic grouping of content.', 'Represents a meaningless grouping/container of content.'],
            ['3. Headings', 'It is strongly recommended to include a heading (h1-h6) inside.', 'No heading is expected or required inside.'],
            ['4. Document Outline', 'It explicitly contributes to the HTML5 document outline.', 'It does not appear in or affect the document outline.'],
            ['5. Assistive Technologies', 'Helps screen readers logically jump between large thematic areas.', 'Ignored by screen readers during layout navigation.'],
            ['6. Generic Usage', 'Wrong to use if just wrapping elements for CSS styling.', 'The perfect element for CSS flexbox/grid layout wrappers.'],
            ['7. ARIA Role', 'Historically has an implicit "region" role (if accessible name exists).', 'Has no implicit layout role.'],
            ['8. Replacement Rules', 'Cannot be blindly replaced by div without losing accessibility meaning.', 'Can be swapped for another container without semantic loss.'],
            ['9. Version Introduced', 'Introduced primarily focusing on HTML5 standards.', 'Has existed since the very earliest days of HTML.'],
            ['10. Target Content', 'News sections, chapter blocks, tabbed document sections.', 'Spacer blocks, colored background wrappers, grid cells.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<article> and <section>',
        'headers': ['Comparison', '<article> Element', '<section> Element'],
        'points': [
            ['1. Reusability', 'Content must make sense completely standalone/syndicated.', 'Content only makes sense alongside its surrounding sibling themes.'],
            ['2. Syndication', 'Ideal for RSS feeds, API endpoints, or external aggregation.', 'Not typically targeted or used for external syndication.'],
            ['3. Primary Purpose', 'A fully self-contained composition in a document.', 'A thematic structural grouping within a document.'],
            ['4. Component Level', 'Usually acts as a macro-level self-contained node.', 'Usually acts as a structural sub-divider.'],
            ['5. Types of Content', 'Blog posts, news articles, forum posts, user comments.', 'Chapters of a book, numbered steps, "Contact Us" footprint.'],
            ['6. Nesting Practices', 'An article can contain multiple sections to subdivide its content.', 'A section can contain multiple articles if grouping a list of posts.'],
            ['7. Semantic Strength', 'Considered the strongest, most independent grouping element.', 'A generic structural grouping element (but stronger than div).'],
            ['8. ARIA Role', 'Holds an implicit "article" role for assistive tech.', 'Holds an implicit "region" role (if properly labelled).'],
            ['9. Author Metadata', 'Often wraps <address> tags to denote authorship of the specific item.', 'Rarely associated with direct authorship contexts.'],
            ['10. The Fallback Test', 'If the content lacks meaning outside the site, do not use it.', 'If the content is thematic but not independent, use section.']
        ]
    }
]
