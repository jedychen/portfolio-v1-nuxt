import base64Json from "../../contentful/response-base64Generated.json";

export default {
  imgSrc(image) {
    //return url+sizeSettingMax();
    var url = image.file.url;
    var id = url.replace("//images.ctfassets.net/", "");
    var imageName = id.split("/")[1] + "." + url.split(".").pop();
    return imageName;
  },
  imgBase64(image) {
    //return url+sizeSettingMax();
    var fileName = this.imgSrc(image);
    var imageMetadata = base64Json.content.find(item => item.name === fileName);
    var imageBase64 = imageMetadata.data;
    return imageBase64;
  }
};
