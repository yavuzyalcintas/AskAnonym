const linkConstructor = (link: string, onlyText?: boolean) => {
  let formatedLink = link;

  if (link.includes("https://") || link.includes("http://")) {
    formatedLink = formatedLink.replace(/^https?:\/\//, "");
  } else if (link.includes("www.")) {
    formatedLink = formatedLink.replace(/^www\./, "");
  }

  if (onlyText) {
    return formatedLink;
  }

  return `https://${formatedLink}`;
};

export default linkConstructor;
