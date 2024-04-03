import React from "react";

import { Link } from "react-router-dom";
export default [

    {
        selector: '[data-tut="reactour__1"]',
        content: `This is our canvas where you add you images and text.`
    },
    {
        selector: '[data-tut="reactour__2"]',
        content: `Here you can upload image  by drag and drop`
    },
    {
        selector: '[data-tut="reactour__3"]',
        content: `Click on the text and you will see options to edit text`
    },
    {
        selector: '[data-tut="reactour__4"]',
        content: `Here is the panel of options to edit text where you can set font family, color and other options`
    },
    {
        selector: '[data-tut="reactour__5"]',
        content: `Click on image and see various options`
    },
    {
        selector: '[data-tut="reactour__6"]',
        content: `Click on add to add more scenes to the template`
    },
    {
        selector: '[data-tut="reactour__7"]',
        content: `Click on music to add background music to the template`
    },
   
    {
        selector: '[data-tut="reactour__8"]',
        content: ` Click on Global Options and you will see option for set text options through out scenes`
    },
    {
        selector: '[data-tut="reactour__10"]',
        content: `Click here to add more scenes to the template`
    },
    
    
    {
        selector: '[data-tut="reactour__11"]',
        content: `Here you can add title for template`
    },
    {
        selector: '[data-tut="reactour__12"]',
        content: `You can undo changes`
    },
    {
        selector: '[data-tut="reactour__13"]',
        content: `You can redo changes`
    },
    {
        selector: '[data-tut="reactour__9"]',
        content: `Click on edit to see canvas again`
    },
    {
        selector: '[data-tut="reactour__14"]',
        content: `After completion click on Export to export your video`
    },
    // {
    //     selector: '[data-tut="reactour__copy"]',
    //     content: `Keep in mind that you could try and test everithing during the Tour. 
    //   For example, try selecting the highlighted text…`
    // },
//     {
//         selector: '[data-tut="reactour__style"]',
//         content: () => (
//             <div>
//                 <p color="#e5e5e5">
//                     {/* The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip> */}
//                     could be dressed in any way, using custom components, styles and so
//                     on…
//                 </p>
//                 <p color="#373737" size=".7em" style={{ marginTop: ".7em" }}>
//                     <Link
//                         href="http://codepen.io/lbebber/full/ypgql/"
//                         color="dark"
//                         nospaces
//                     >
//                         Text effect
//                     </Link>{" "}
//                     by{" "}
//                     <Link href="https://twitter.com/lucasbebber" color="dark" nospaces>
//                         Lucas Bebber
//                     </Link>
//                 </p>
//             </div>
//         ),
//         style: {
//             backgroundColor: "black",
//             color: "white"
//         }
//     },
//     {
//         selector: '[data-tut="reactour__goTo"]',
//         content: ({ setCurrentStep }) => (
//             <div>
//                 If you wanna go anywhere, skipping places, it is absolutely possible.
//                 <br /> "Oh, I forgot something inside the bus…"{" "}
//                 <button
//                     style={{
//                         border: "1px solid #f7f7f7",
//                         background: "none",
//                         padding: ".3em .7em",
//                         fontSize: "inherit",
//                         display: "block",
//                         cursor: "pointer",
//                         margin: "1em auto"
//                     }}
//                     onClick={() => setCurrentStep(1)}
//                 >
//                     Please go back to{" "}
//                     <span aria-label="bus" role="img">
//                         🚌
//                     </span>
//                 </button>
//             </div>
//         )
//     },
//     {
//         selector: '[data-tut="reactour__position"]',
//         content: () => (
//             <p>
//                 {/* The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip> could */}
//                 be positioned where you want.
//                 <br /> In this case will try to stay in the <strong>
//                     left side
//                 </strong>{" "}
//                 if there's available space, otherwise will{" "}
//                 <strong>auto position</strong>.
//             </p>
//         ),
//         position: "left"
//     },
//     {
//         selector: '[data-tut="reactour__scroll"]',
//         content:
//             "Probably you noted that the Tour scrolled directly to the desired place, and you could control the time also…"
//     },
//     {
//         selector: '[data-tut="reactour__scroll--hidden"]',
//         content: "Also when places are pretty hidden…"
//     },
//     {
//         selector: '[data-tut="reactour__action"]',
//         content:
//             "When arrived on each place you could fire an action, like… (look at the console)",
//         action: () =>
//             console.log(`
//                   ------------🏠🏚---------
//       🚌 Arrived to explore these beautiful buildings! 🚌
//                   ------------🏠🏚---------
//    🚧 This action could also fire a method in your Component 🚧
//     `)
//     },
//     {
//         selector: '[data-tut="reactour__state"]',
//         content:
//             "And the Tour could be observing changes to update the view, try clicking the button…",
//         highlightedSelectors: ['[data-tut="reactour__highlighted"]'],
//         mutationObservables: ['[data-tut="reactour__highlighted"]']
//     }
];
