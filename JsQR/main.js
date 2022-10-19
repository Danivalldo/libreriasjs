import "./style.sass";
import qrcode from "qrcode";
import {} from "jsqr";

const input = document.querySelector("input");

input.addEventListener("input", (e) => {
	const text = e.target.value;
	buildQR(text);
});

const buildQR = (text) => {
	qrcode.toCanvas(document.querySelector("canvas"), text, (err) => {
		if (err) {
			return console.log(err);
		}
	});
};

buildQR("https://libreriasjs.com");
