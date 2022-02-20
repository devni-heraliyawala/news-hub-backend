import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export class Source {
  @Column()
  id: string;

  @Column()
  name: string;
}

@Entity()
export class Article {
  @ObjectIdColumn()
  id: ObjectID;

  @Column(() => Source)
  source: Source;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  urlToImage: string;

  @Column()
  publishedAt: string;

  @Column()
  content: string;
}
