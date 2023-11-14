export class Content {
  constructor(
    public id?: number,
    public authors?: Author,
    public author_id?: number,
    public title = '',
    public description = '',
    public text = '',
    public tags?: Array<Tag>,
    public created_at = new Date().toISOString(),
    public updated_at?: string,
    // @ts-ignore
    public is_public = false) {
  }
}

export class Author {
  constructor(
    public id?: number,
    public name = '',
    public email = '',
  ) {
  }
}

export class Tag {
  public id: number
  public name: string
  public cnt: number

  constructor(source: any = {}) {
    this.id = source.id
    this.name = source.name || ''
    this.cnt = source.cnt
  }
}
