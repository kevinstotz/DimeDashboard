export class FileUpload {
  filename: string;
  size: number;
  type: string;
}
export class DocumentType {
  id: number;
  type: string;
}
export class DocumentStatus {
  id: number;
  status: string;
}
export class Document {
  document: string;
  id: number;
  inserted: string;
  name: string;
  size: number;
  type: DocumentType;
  status: DocumentStatus;
}
