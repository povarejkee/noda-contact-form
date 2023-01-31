import { IDocument } from '../interfaces/IDocument';

export class Document implements IDocument {
  public name: string = null;
  public status: number = null;
  public description: string = null;
  public url: string = null;
  public rejectReason: string = null;
  public id?: string = null;

  public merge(doc: Partial<IDocument>): Document {
    Object.assign(this, doc);

    return this;
  }
}
