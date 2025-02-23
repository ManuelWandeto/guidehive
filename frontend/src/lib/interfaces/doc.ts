export interface ApiResponse {
  data: Section[];
  meta: Meta;
}

export interface Section {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  sub_sections: SubSection[];
  pages: Page[];
}

export interface SubSection {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  pages: Page[];
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface SingleSection {
  id: number;
  documentId: string;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  is_sub_section: boolean;
}

export interface SinglePage {
  id: number;
  documentId: string;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
}

export interface SectionApiResponse {
  data: SingleSection[];
  meta: Meta;
}
export interface PageApiResponse {
  data: SinglePage[];
  meta: Meta;
}