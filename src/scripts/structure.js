import intro from "./intro.js";
import lvl0Dialog from "./lvl0-dialog.js";
import lvl1Dialog from "./lvl1-dialog.js";


export default [
    {
        index: 0,
        dialogs: intro,
        items: 'items.js'
    },
    {
        index: 1,
        dialogs: lvl1Dialog,
        items: 'items.js',
        background: '/3d/level-1-texture-2d-parallax-lvl1-edit.glb'
    },
    {
        index: 2,
        dialogs: lvl0Dialog,
        background:  '/3d/level-1-texture-2d-parallax-normal.glb'
    }
];