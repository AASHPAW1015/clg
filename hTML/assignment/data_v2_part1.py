data = [
    {
        'section': 'HTML & HTML5 Basics',
        'topic': 'HTML vs HTML5',
        'headers': ['Feature', 'HTML (Older Versions)', 'HTML5'],
        'points': [
            ['1. Definition & Era', 'The core markup language used to structure web documents.', 'The major revision of HTML introducing modern web application capabilities.'],
            ['2. Multimedia embedding', 'Dependent heavily on third-party plugins (Flash, Silverlight).', 'Features built-in `<audio>` and `<video>` tags for native playback.'],
            ['3. Offline Capabilities', 'Stores data only through basic browser cookies.', 'Supports advanced Application Cache and Web Storage (localStorage).'],
            ['4. Vector Graphics', 'Lacked native support; relied on VML or external SVGs via plugins.', 'SVG and Canvas are fully integrated natively into the DOM.'],
            ['5. JavaScript Threading', 'JavaScript runs exclusively on the main browser thread, blocking UI.', 'Introduced Web Workers for true background JavaScript execution.'],
            ['6. DOCTYPE declaration', 'Extremely long and complex, requiring specific DTD references.', 'Short, memorable, and simple: `<!DOCTYPE html>`.'],
            ['7. Structural Semantics', 'Developers relied on generic `<div>` tags with class names.', 'Introduced specific semantic tags like `<article>`, `<header>`, `<footer>`.'],
            ['8. Form Input Types', 'Limited to basic text, password, and radio/checkboxes.', 'Added powerful new types like date, email, range, search, and color.'],
            ['9. Error parsing', 'Rules for incorrect syntax varied wildly between different web browsers.', 'Standardized parsing rules, meaning broken code renders identically everywhere.'],
            ['10. Math Rendering', 'Mathematical formulas required images or external libraries.', 'Native support for the `<math>` tag (MathML) directly inline.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': 'HTML4 DOCTYPE vs HTML5 DOCTYPE',
        'headers': ['Aspect', 'HTML4 DOCTYPE', 'HTML5 DOCTYPE'],
        'points': [
            ['1. Primary Function', 'Instructs the validator which version of HTML (Strict/Transitional) to check against.', 'Instructs the browser purely to render the page in "Standards Mode".'],
            ['2. Syntax Length', 'Extremely verbose; almost impossible to type manually without copy-pasting.', 'Very concise: exactly 15 characters long (`<!DOCTYPE html>`).'],
            ['3. Link to Guidelines (DTD)', 'Must contain a URL pointing to a Document Type Definition (DTD).', 'Does not require any DTD reference whatsoever.'],
            ['4. SGML Dependency', 'Based fundamentally on Standard Generalized Markup Language (SGML).', 'Not an application of SGML, hence the simpler declaration rules.'],
            ['5. Version Specificity', 'Had three distinct versions: Strict, Transitional, and Frameset.', 'Universal; one declaration covers all modern HTML standards.'],
            ['6. Typo Consequence', 'A slight typo in the DTD URL often triggered "Quirks Mode" rendering.', 'Almost foolproof; practically eliminates accidental Quirks Mode.'],
            ['7. Modern usage', 'Considered completely obsolete and deprecated for new web projects.', 'The absolute required standard for every web page built today.'],
            ['8. Character Case', 'Usually expected specific capitalization matching the W3C spec.', 'Technically case-insensitive, though lowercase `html` is standard practice.'],
            ['9. Memorability', 'Developers usually used snippets or IDE generation to embed it.', 'Easily typed from memory by beginners in their first lesson.'],
            ['10. Example', '`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"...>`', '`<!DOCTYPE html>`']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': 'Block-level elements and Inline elements',
        'headers': ['Comparison Logic', 'Block-level Element', 'Inline Element'],
        'points': [
            ['1. Positioning context', 'Automatically begins on a completely new line in the document.', 'Flows horizontally on the same line aligned with existing text.'],
            ['2. Horizontal Width', 'Expands naturally to fill 100% of the width of its parent container.', 'Contracts naturally to the exact microscopic width of its inner content.'],
            ['3. Dimension Styling', 'Responds perfectly to CSS `height` and `width` declarations.', 'Ignores CSS `height` and `width` declarations entirely.'],
            ['4. Top/Bottom Margins', 'Vertical margins push preceding and succeeding elements away properly.', 'Vertical margins are visually applied but do not displace surrounding text blocks.'],
            ['5. Default CSS Display', '`display: block;` (or sometimes `table`, `list-item`).', '`display: inline;`'],
            ['6. Examples in HTML', 'Headers (`<h1>`), Paragraphs (`<p>`), Divisions (`<div>`), Lists (`<ul>`).', 'Spans (`<span>`), Anchors (`<a>`), Images (`<img>`), Strong (`<strong>`).'],
            ['7. Nesting Permissions', 'Generally allowed to contain both inline elements and other blocks.', 'Strictly forbidden from wrapping block-level elements natively.'],
            ['8. Primary Purpose', 'Used for major structural layout scaffolding and separating large sections.', 'Used for injecting micro-styles or links directly into a flow of text.'],
            ['9. Line Breaks', 'Possesses implicit line breaks before and after itself.', 'Never forces a line break unless the edge of the screen is reached.'],
            ['10. Vertical Padding', 'Pushes the surrounding flow of content reliably outward.', 'Bleeds visually into the lines above and below it without moving them.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<div> and <span>',
        'headers': ['Point of Difference', '<div> tag', '<span> tag'],
        'points': [
            ['1. CSS Display Type', 'Rendered as a "block" element by default.', 'Rendered as an "inline" element by default.'],
            ['2. Semantics', 'A generic block container holding absolutely no semantic meaning.', 'A generic inline container holding absolutely no semantic meaning.'],
            ['3. Width behavior', 'Occupies the entire horizontal width available in its container.', 'Only takes up the exact pixel width of the text inside it.'],
            ['4. Layout disruption', 'Forces a new line break, separating content vertically.', 'Sits exactly where it is placed without breaking the line flow.'],
            ['5. Typical Sizing Rules', 'Can be targeted with CSS to set a rigid `width: 50%` or `height: 200px`.', 'Cannot be sized; CSS `width` and `height` do nothing.'],
            ['6. Use Case: Grouping', 'Groups large structural elements together (like grouping a title + paragraph).', 'Groups a small specific string of text to make it red or bold.'],
            ['7. Appropriate Children', 'Can wrap practically anything, including other `<div>`s, paragraphs, or forms.', 'Should only wrap text strings, images, or other `<span>`s.'],
            ['8. Common Classes', '`<div class="card-container">`', '`<span class="highlight-text">`'],
            ['9. Margin/Padding application', 'Full CSS box model applies perfectly on all four sides.', 'Top/Bottom margins and paddings act unpredictably on surrounding lines.'],
            ['10. Impact on sibling text', 'If placed in a sentence, it chops the sentence into three distinct visual paragraphs.', 'It silently integrates into the sentence perfectly.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<b> and <strong>',
        'headers': ['Difference', '<b> Element', '<strong> Element'],
        'points': [
            ['1. Meaning to the Code', 'Purely stylistic; means "make this text look bold".', 'Highly semantic; means "this text has strong importance or urgency".'],
            ['2. Visual Result', 'Makes text bold.', 'Also makes text bold by default.'],
            ['3. Assistive Tech (Screen Readers)', 'Usually read in a flat, normal monotone voice.', 'Screen readers often change inflection or tone to indicate importance.'],
            ['4. Best Practice Scenarios', 'Highlighting a keyword in a document abstract without implying it is a warning.', 'A warning label (`<strong>Danger: High Voltage</strong>`).'],
            ['5. Legacy Status', 'Originates from the very early visual days of HTML 3.', 'Introduced later as web accessibility and semantic coding became standard.'],
            ['6. CSS Replacement', 'Identical in every way to writing `font-weight: bold;` in CSS.', 'CSS cannot replace it, because CSS cannot add semantic meaning.'],
            ['7. Validation Recommendation', 'W3C suggests avoiding `<b>` if you just want styling; use CSS instead.', 'W3C highly recommends using `<strong>` when conveying seriousness.'],
            ['8. SEO Ramifications', 'Ignored largely by search crawlers as purely cosmetic.', 'Crawlers assign slightly more semantic weight to the phrase.'],
            ['9. Nesting Context', 'Used within paragraphs for visual variety.', 'Used within paragraphs where the meaning of the sentence pivots on the word.'],
            ['10. The Golden Rule', 'Use if you purely want visual weight and nothing else.', 'Use if the text actually matters more than the surrounding words.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<i> and <em>',
        'headers': ['Aspect', '<i> Element', '<em> Element'],
        'points': [
            ['1. Core Purpose', 'Represents text that is visually italicized.', 'Represents text that carries spoken or emphatic stress.'],
            ['2. Default Rendering', 'Displays the text in an italic font style.', 'Also displays the text in an italic font style.'],
            ['3. Accessibility Context', 'Blind users using screen readers hear no difference in the text.', 'Screen readers recognize the emphasis and alter vocal pronunciation.'],
            ['4. Usage Examples', 'Marine ship names, foreign phrases, taxonomic designations.', 'Changing the focus of a sentence: "I *love* coding." vs "I love *coding*."'],
            ['5. Separation of Concerns', 'Mixes presentation deeply with structure (bad practice).', 'Perfectly separates structure from presentation.'],
            ['6. Equivalent CSS', 'Easily mimicked by `font-style: italic;`.', 'Cannot be mimicked by CSS since it alters document meaning.'],
            ['7. Semantic Value', 'Possesses minimal to zero inherent semantic value.', 'High semantic value specifically defining verbal inflection.'],
            ['8. HTML5 Re-definition', 'Now defined as "an alternate voice or mood," largely to justify keeping it.', 'Maintained strictly as the primary tag for stress emphasis.'],
            ['9. Search Engine View', 'Treated identically to plain text by parsing algorithms.', 'Assists parsers in understanding the contextual human tone of the text.'],
            ['10. Recommendation', 'Try to avoid using it unless strictly applying idiomatic text rules.', 'Use it anytime a human reading it out loud would stress the word.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<section> and <div>',
        'headers': ['Feature', '<section> Element', '<div> Element'],
        'points': [
            ['1. Structural Semantics', 'A thoroughly semantic tag denoting a thematic grouping.', 'A completely non-semantic tag denoting nothing.'],
            ['2. Heading Requirement', 'Usually expected to have an internal heading (`<h2>`-`<h6>`) summarizing it.', 'Requires absolutely zero headings to be valid.'],
            ['3. Assistive Usage', 'Improves accessibility by letting screen readers jump to specific document topics.', 'Ignored by screen reader navigation shortcut menus entirely.'],
            ['4. Document Outlining', 'Contributes to the generation of the HTML5 document tree outline.', 'Has zero impact on the document tree outline.'],
            ['5. Typical Application', 'A "Features" block, a "Testimonials" block, an "About Us" chapter.', 'A `.flex-container`, a wrapper for buttons, a colored background box.'],
            ['6. CSS Styling purpose', 'Should not be used *purely* as a visual hook for CSS styling.', 'The absolute perfect element to use purely as a CSS visual styling wrapper.'],
            ['7. Introduction Era', 'Introduced during the modern HTML5 revamp.', 'A foundational tag present since the very beginning of the web.'],
            ['8. Fallback mental model', 'If the content inside can be logically named as a chapter, use it.', 'If you just need to align items horizontally or add padding, use a `div`.'],
            ['9. ARIA Landmark', 'Automatically maps to the `region` landmark if given an accessible name.', 'Requires manual injection of `role="region"` to be recognized.'],
            ['10. Syndication context', 'Usually forms part of a larger article, lacking total independence.', 'Usually forms the structural grid that holds everything else together.']
        ]
    },
    {
        'section': 'HTML & HTML5 Basics',
        'topic': '<article> and <section>',
        'headers': ['Comparison Logic', '<article> Element', '<section> Element'],
        'points': [
            ['1. Independence', 'Content must be fully self-contained and make sense independently.', 'Content usually relies on the surrounding page context for complete meaning.'],
            ['2. Reusability', 'Could theoretically be published alone on a different website (syndication).', 'Would likely confuse readers if published completely alone without context.'],
            ['3. Semantic Strength', 'The strongest semantic grouping element available for primary content.', 'A moderately strong element designed to create thematic subdivisions.'],
            ['4. Good Examples', 'A single blog post, a forum thread comment, a standalone news story.', 'Breaking a large blog post into "Intro", "Methodology", and "Conclusion".'],
            ['5. Hierarchy & Nesting', 'Typically holds multiple `<section>` tags inside to break up its long text.', 'Typically nests inside an `<article>` to provide chapters.'],
            ['6. Feed syndication', 'Targeted heavily by RSS feeds and readability tools (like Safari Reader Mode).', 'Usually ignored by RSS tools searching for standalone entries.'],
            ['7. ARIA Integration', 'Implicitly acts as an `article` role in accessibility trees.', 'Implicitly acts as a generalized `region` in accessibility trees.'],
            ['8. Authorship Metadata', 'Often contains an `<address>` tag directly linking the author to the content block.', 'Rarely acts as the direct target for specific authorship attribution.'],
            ['9. Header/Footer usage', 'Very common to contain its own internal `<header>` and `<footer>`.', 'Can contain them, but less commonly heavily structured than an article.'],
            ['10. The Test', 'If you print it out alone, does it still make perfect sense? If yes, article.', 'If printed alone, does it feel like a missing piece of a larger puzzle? Section.']
        ]
    }
]
