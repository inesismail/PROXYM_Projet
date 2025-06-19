declare module "pdf-parse" {
  interface PDFParseOptions {
    max?: number;
    pagerender?: (pageData: any) => Promise<string>;
  }
  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    text: string;
  }
  function pdfParse(data: Buffer | Uint8Array, options?: PDFParseOptions): Promise<PDFInfo>;
  export = pdfParse;
}
