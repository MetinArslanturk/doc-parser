# DraftWise Frontend Interview Project

Legal documents usually consist of 10s of pages and 100s of paragraphs.
We parse content of these documents and show them in our application so that users may inspect examples from different documents.
We want you to write a frontend application using React and its ecosystem that shows a parsed document.
App should have following properties:
1. User should be able to scroll through the content as if they are using Word. We don't want you to divide it into pages. You may use a virtualized list library.
2. In general paragraphs should use Times New Roman with 12pt font size. Footnote paragraphs may use 10pt font size.
3. Paragraphs should be numbered according to `listItemLabel` and indented according to `indentationLevel`
4. Paragraphs have tokens to style a paragraph properly. Use them to style paragraphs properly. Here are the styles we expect depending on token type:

    - if `formatting`
        - if `formatting.isBold` then bold
        - if `formatting.isItalic` then italic
        - if `formatting.isUnderline` then underline
    - if `diff`
        - if `diff.payload === "DEL"` then red text with red line-through
        - if `diff.payload === "DEL_BLOCK"` then greeen text with line-through
        - if `diff.payload === "INS"` then blue text with blue underline
        - if `diff.payload === "MOVE"` then green text
        - if `diff.payload === "NOOP"` no styling
    - if `definition` or `definitionSource` then dotted underline, solid underline on hover
    - if `searchResult` or `filterText` then yellow background
    - if `clauseSnippetTag` then gray background
5. If url search params includes a parameter called `index`, user should be scrolled to the paragraph stated by this parameter.
6. If user clicks on a token styled as a `definition` a tooltip should open. This tooltip should show content between indices stated in `definition.payload.startIndex` and `definition.payload.endIndex`. Clicking to this paragraph should scroll to the first paragraph of this definition (aka `definition.payload.startIndex`). Clicking outside should close the tooltip.

You can find an example styling below:
<img width="493" alt="Screenshot 2023-01-27 at 18 27 47" src="https://user-images.githubusercontent.com/7019371/215128782-f3789455-216f-4928-9e6e-ae5d149a8bb7.png">


For the sake of simlicity, you can find an example parsed document model in the repository. Please do not hesitate to ask questions at any time.

## Bonus
- You can use a React meta framework (Remix, Next.js, etc.) to have SSR, etc.
- If you want, you can implement your own virtualized list.
- The document may contain 1000s of tokens. Be careful about performance issues while styling them.

## Criteria

- We are interested to see you write readable, maintainable code.
- Think this project as a part of a large-scale application while deciding on architectural structure.
- We expect you to use state-of-the-art development techniques.
- We are interested in any performance insights you have. Many of our users use embedded Internet Explorer 11 on relatively low resource Windows VMs, so we care about high performance code.
- We will test your project on Chrome using 6x CPU slowdown.
- Don't forget to write tests for your code.
- Word closes add-on if it becomes unresponsive for 10 seconds. So re-renders shouldn't take too much time.
- We'll also evaluate your design decisions regarding to UX and UI. Feel free to design the app as you wish to make it more usable and attractive.