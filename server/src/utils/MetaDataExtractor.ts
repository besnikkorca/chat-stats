export default class MetaDataExtractor {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  extractMentions() {
    const mentionsRegex = /@([a-zA-Z0-9_]+)/g;
    return this.matchesByRegex(mentionsRegex);
  }

  extractEmoticons() {
    const emoticonsRegex = /(?<=\()(.*?)(?=\))/g;
    return this.matchesByRegex(emoticonsRegex);
  }

  extractLinks() {
    const linksRegex = /(?<=\[)(.*?)(?=\])/g;
    const links = this.matchesByRegex(linksRegex);

    return links.map((textLink) => {
      const [title, url] = textLink.split('|');
      return { title, url };
    });
  }

  private matchesByRegex(regex: RegExp) {
    return this.text.match(regex) || [];
  }
}
