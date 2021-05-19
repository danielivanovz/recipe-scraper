class Link {
  constructor(title, link) {
    this.title = title;
    this.link = link;
  }
}

class Links {
  constructor() {
    this.links = [];
  }

  createLink(title, link) {
    let p = new Link(title, link);
    this.links.push(p);
    return p;
  }

  get allLinks() {
    return this.links;
  }

  get numberOfLinks() {
    return this.links.length;
  }
}

module.exports = Links;
