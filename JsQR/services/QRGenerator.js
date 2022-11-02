import qrcode from "qrcode";

class QRGenerator {
  constructor(canvasElement) {
    this.canvas = canvasElement;
  }
  async buildQR(text) {
    try {
      await qrcode.toCanvas(this.canvas, text);
    } catch (err) {
      console.log(err);
    }
  }
}

export default QRGenerator;
