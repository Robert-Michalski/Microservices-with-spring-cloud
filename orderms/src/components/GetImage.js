import { Buffer } from "buffer"
function GetImage(img) {
  if (img) {
    const buffer = Buffer.from(img, "base64")
    const imgString = buffer.toString("base64")
    return <img src={"data:image/png;base64," + imgString} alt="Red dot" />
  } else {
    return <img src="" alt="Red dot" />
  }
}
export default GetImage
