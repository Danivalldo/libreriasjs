import tinymce from "tinymce";
/* Default icons are required. After that, import custom icons if applicable */
import "tinymce/icons/default";

/* Required TinyMCE components */
import "tinymce/themes/silver";
import "tinymce/models/dom";

/* Import plugins */
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/media";
import "tinymce/plugins/help";
import "tinymce/plugins/code";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/plugins/image";
import "tinymce/plugins/preview";

const launchTinyMCE = async (selector) => {
  try {
    await tinymce.init({
      selector,
      auto_focus: "main-input",
      promotion: false,
      branding: false,
      skin: "CUSTOM",
      content_css: "CUSTOM",
      language: "es",
      plugins: [
        "emoticons",
        "lists",
        "link",
        "image",
        "preview",
        "code",
        "fullscreen",
        "media",
        "table",
        "help",
      ],
      images_upload_handler: (blobInfo, progress) =>
        new Promise((resolve, reject) => {
          resolve(`data:image/png;base64, ${blobInfo.base64()}`);
        }),
      toolbar: `
        undo redo | 
        blocks |
        image |
        bold italic backcolor | 
        alignleft aligncenter alignright alignjustify |
        bullist numlist outdent indent | 
        removeformat |
        fullscreen help
      `,
    });
    return tinymce.get(0);
  } catch (error) {
    console.log(error);
  }
};

export default launchTinyMCE;
