import "./style.sass";
import qrcode from "qrcode";

qrcode.toCanvas(document.querySelector("canvas"), "https://dimo.cat", (err) => {
	if (err) {
		return console.log(err);
	}
});
