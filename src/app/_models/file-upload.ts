export class FileUpload {
  filename: string;
  size: number;
  type: string;
}
export class DocumentType {
  type: string;
  id: number;
}
export class Document {
  id: number;
  name: string;
  type: object;
  status: object;
}
