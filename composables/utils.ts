export const getPostDetails = (data: { content: any[]; }) => {

  if (data && data.content) {
    let title = data.content.find(element => element.type == "heading");
    if (title && title.content) {
      title = title?.content[0]?.text || "";
    } else {
      title = "";
    }

    let description = data.content.find(element => element.type == "paragraph");
    let txt = "";
    if (description && description.content && description.content.length) {
      description.content.map((d: { text: string; }) => {
        txt += d.text;
      })

      description = txt;
    } else {
      description = "";
    }

    let image = data.content.find(element => element.type == "image");
    image = image?.attrs?.src || ""

    return {title, description, image}
  }
  // return
}