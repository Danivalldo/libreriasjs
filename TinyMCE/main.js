import "./style.sass";
import tinymce from "tinymce";
/* Default icons are required. After that, import custom icons if applicable */
import "tinymce/icons/default";

/* Required TinyMCE components */
import "tinymce/themes/silver";
import "tinymce/models/dom";

/* Import a skin (can be a custom skin instead of the default) */
import "tinymce/skins/ui/oxide/skin.css";

/* Import plugins */
import "tinymce/plugins/advlist";
import "tinymce/plugins/code";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/plugins/image";

/* Import premium plugins */
/* NOTE: Download separately and add these to /src/plugins */
/* import './plugins/checklist/plugin'; */
/* import './plugins/powerpaste/plugin'; */
/* import './plugins/powerpaste/js/wordimport'; */

/* content UI CSS is required */
import contentUiSkinCss from "tinymce/skins/ui/oxide/content.css";

/* The default content CSS can be changed or replaced with appropriate CSS for the editor content. */
import contentCss from "tinymce/skins/content/default/content.css";

tinymce.init({
  selector: "#main-input",
  plugins: [
    "advlist",
    "autolink",
    "emoticons",
    "emojis",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
});
