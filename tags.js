import { Fzf } from "./node_modules/fzf/dist/fzf.es.js";
import { make, purge } from "./domUtils.js";

let tags = [
  "<!--...-->",
  "<!DOCTYPE>",
  "<a>",
  "<abbr>",
  "<address>",
  "<area>",
  "<article>",
  "<aside>",
  "<audio>",
  "<b>",
  "<base>",
  "<basefont>",
  "<bdi>",
  "<bdo>",
  "<big>",
  "<blockquote>",
  "<body>",
  "<br>",
  "<button>",
  "<canvas>",
  "<caption>",
  "<center>",
  "<cite>",
  "<code>",
  "<col>",
  "<colgroup>",
  "<data>",
  "<datalist>",
  "<dd>",
  "<del>",
  "<details>",
  "<dfn>",
  "<dialog>",
  "<dir>",
  "<div>",
  "<dl>",
  "<dt>",
  "<em>",
  "<embed>",
  "<fieldset>",
  "<figcaption>",
  "<figure>",
  "<font>",
  "<footer>",
  "<form>",
  "<frame>",
  "<frameset>",
  "<h1> to <h6>",
  "<head>",
  "<header>",
  "<hr>",
  "<html>",
  "<i>",
  "<iframe>",
  "<img>",
  "<input>",
  "<ins>",
  "<kbd>",
  "<label>",
  "<legend>",
  "<li>",
  "<link>",
  "<main>",
  "<map>",
  "<mark>",
  "<meta>",
  "<meter>",
  "<nav>",
  "<noframes>",
  "<noscript>",
  "<object>",
  "<ol>",
  "<optgroup>",
  "<option>",
  "<output>",
  "<p>",
  "<param>",
  "<picture>",
  "<pre>",
  "<progress>",
  "<q>",
  "<rp>",
  "<rt>",
  "<ruby>",
  "<s>",
  "<samp>",
  "<script>",
  "<section>",
  "<select>",
  "<small>",
  "<source>",
  "<span>",
  "<strike>",
  "<strong>",
  "<style>",
  "<sub>",
  "<summary>",
  "<sup>",
  "<svg>",
  "<table>",
  "<tbody>",
  "<td>",
  "<template>",
  "<textarea>",
  "<tfoot>",
  "<th>",
  "<thead>",
  "<time>",
  "<title>",
  "<tr>",
  "<track>",
  "<tt>",
  "<u>",
  "<ul>",
  "<var>",
  "<video>",
  "<wbr>"
];

let tagDefinitions = [
  "Defines a comment",
  "Defines the document type",
  "This element defines a hyperlink",
  "This element defines an abbreviation or an acronym",
  "This element defines contact information",
  "Defines an area inside an image map",
  "Defines an article",
  "Defines content aside from the page content",
  "Defines embedded sound content",
  "Defines bold text",
  "Specifies the base URL/target for all relative URLs in a document",
  "Not supported in HTML5. Use CSS instead.Specifies a default color, size, and font for all text in a document",
  "Isolates a part of text that might be formatted in a different direction from other text outside it",
  "Overrides the current text direction",
  "Not supported in HTML5. Use CSS instead.Defines big text",
  "Defines a section that is quoted from another source",
  "Defines the document's body",
  "Defines a single line break",
  "Defines a clickable button",
  "Used to draw graphics, on the fly, via scripting (usually JavaScript)",
  "Defines a table caption",
  "Not supported in HTML5. Use CSS instead.Defines centered text",
  "Defines the title of a work",
  "Defines a piece of computer code",
  "Specifies column properties for each column within a <colgroup> element",
  "Specifies a group of one or more columns in a table for formatting",
  "Adds a machine-readable translation of a given content",
  "Specifies a list of pre-defined options for input controls",
  "Defines a description/value of a term in a description list",
  "Defines text that has been deleted from a document",
  "Defines additional details that the user can view or hide",
  "Specifies a term that is going to be defined within the content",
  "Defines a dialog box or window",
  "Not supported in HTML5. Use <ul> instead.Defines a directory list",
  "Defines a section in a document",
  "Defines a description list",
  "Defines a term/name in a description list",
  "Defines emphasized text",
  "Defines a container for an external application",
  "Groups related elements in a form",
  "Defines a caption for a <figure> element",
  "Specifies self-contained content",
  "Not supported in HTML5. Use CSS instead.Defines font, color, and size for text",
  "Defines a footer for a document or section",
  "Defines an HTML form for user input",
  "Not supported in HTML5.Defines a window (a frame) in a frameset",
  "Not supported in HTML5.Defines a set of frames",
  " Defines HTML headings",
  "Contains metadata/information for the document",
  "Defines a header for a document or section",
  " Defines a thematic change in the content",
  "Defines the root of an HTML document",
  "Defines a part of text in an alternate voice or mood",
  "Defines an inline frame",
  "Defines an image",
  "Defines an input control",
  "Defines a text that has been inserted into a document",
  "Defines keyboard input",
  "Defines a label for an <input> element",
  "Defines a caption for a <fieldset> element",
  "Defines a list item",
  "Defines the relationship between a document and an external resource (most used to link to style sheets)",
  "Specifies the main content of a document",
  "Defines an image map",
  "Defines marked/highlighted text",
  "Defines metadata about an HTML document",
  "Defines a scalar measurement within a known range (a gauge)",
  "Defines navigation links",
  "Not supported in HTML5.Defines an alternate content for users that do not support frames",
  "Defines an alternate content for users that do not support client-side scripts",
  "Defines a container for an external application",
  "Defines an ordered list",
  "Defines a group of related options in a drop-down list",
  "Defines an option in a drop-down list",
  "Defines the result of a calculation",
  "Defines a paragraph",
  "Defines a parameter for an object",
  "Defines a container for multiple image resources",
  "Defines preformatted text",
  "Represents the progress of a task",
  "Defines a short quotation",
  "Defines what to show in browsers that do not support ruby annotations",
  "Defines an explanation/pronunciation of characters (for East Asian typography)",
  "Defines a ruby annotation (for East Asian typography)",
  "Defines text that is no longer correct",
  "Defines sample output from a computer program",
  "Defines a client-side script",
  "Defines a section in a document",
  "Defines a drop-down list",
  "Defines smaller text",
  "Defines multiple media resources for media elements (<video> and <audio>)",
  "Defines a section in a document",
  "Not supported in HTML5. Use <del> or <s> instead.Defines strikethrough text",
  "Defines important text",
  "Defines style information for a document",
  "Defines subscripted text",
  "Defines a visible heading for a <details> element",
  "Defines superscripted text",
  "Defines a container for SVG graphics",
  "Defines a table",
  "Groups the body content in a table",
  "Defines a cell in a table",
  "Defines a container for content that should be hidden when the page loads",
  "Defines a multiline input control (text area)",
  "Groups the footer content in a table",
  "Defines a header cell in a table",
  "Groups the header content in a table",
  "Defines a specific time (or datetime)",
  "Defines a title for the document",
  "Defines a row in a table",
  "Defines text tracks for media elements (<video> and <audio>)",
  "Not supported in HTML5. Use CSS instead.Defines teletype text",
  "Defines some text that is unarticulated and styled differently from normal text",
  "Defines an unordered list",
  "Defines a variable",
  "Defines embedded video content",
  "Defines a possible line-break"
];

const fzEntries = document.querySelector(".entries");
const txtPanel = document.querySelector(".txt-panel");

function initPage() {
  document.addEventListener("input", handleInputChange, false);
  document.addEventListener("click", handleClicks, false);
}

let encodedDefinitions = tagDefinitions.map((item) =>
  item.replace(/</g, "&lt;").replace(/>/g, "&gt;")
);

let htmlTags = tags.map((item) => item.replace(/</g, "").replace(/>/g, ""));

let htmlElements = htmlTags.map((tag, idx) => ({
  element: tag,
  definition: encodedDefinitions[idx]
}));

const handleInputChange = (event) => {
  let evtElement = event.target;
  console.log(evtElement);
  if (evtElement.matches(".ele-search")) {
    // do something
    fuzzySearch(evtElement.value);
  }
};

const handleClicks = (event) => {
  let evtElement = event.target;
  if (evtElement.matches(".entries div")) {
    console.log(evtElement.textContent);
    showElementData(evtElement);
  }
};

const fzf = new Fzf(htmlElements, {
  selector: (ele) => ele.element
});

const fuzzySearch = (val) => {
  clearParent(fzEntries);
  const entries = fzf.find(val);
  console.log(entries);
  const ranking = entries.map((entry) => entry.item.element);
  const rankingHigh = entries.map((entry) => {
    const strArr = entry.item.element.split("");
    const nodes = strArr.map((item, idx) => {
      if (entry.positions.includes(idx)) {
        return `<span>${item}</span>`;
      } else {
        return item;
      }
    });
    return `<div>${nodes.join("")}</div>`;
  });
  console.log(rankingHigh);
  rankingHigh.forEach((entry, index) => {
    console.log(entry);

    make("div", {
      attr: {
        id: `entry-${index}`
      },
      append: [decodeText(entry, false)],
      parent: fzEntries
    });
  });
  console.log(ranking);
  console.log(val);
};
initPage();
console.log(htmlElements);

const showElementData = (element) => {
  let elText = element.textContent;
  const elObj = htmlElements.filter((el) => el.element === elText)[0];
  console.log(elObj);

  clearParent(txtPanel);
  //purge(txtPanel, 1);
  make("div", {
    attr: {
      class: "html-element"
    },
    append: [
      [
        "h4",
        {
          append: [`${elObj.element}`]
        }
      ],
      [
        "p",
        {
          append: [`${decodeText(elObj.definition, true)}`]
        }
      ]
    ],
    parent: txtPanel
  });
};

const clearParent = (parent) => {
  if (parent.childElementCount > 0) {
    let elNums = parent.childElementCount;
    purge(parent, elNums);
  }
};

const decodeText = (textToDecode, txt = false) => {
  console.log(textToDecode);
  // let txt = document.createElement("textarea");
  // txt.innerHTML = textToDecode;
  // return txt.value;
  const doc = new DOMParser().parseFromString(textToDecode, "text/html");
  console.log(doc);
  if (!txt) {
    return doc.body.firstChild;
  }
  return doc.documentElement.textContent;
};
