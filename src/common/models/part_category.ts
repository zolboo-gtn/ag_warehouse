export interface IPartCategoryDto {
  categorygroupid: number;
  categoryname: string;
  categorynamemn: string | null;
  children: IPartCategoryDto[];
  parentid: number | null;

  // TODO: use children
  categories?: IPartCategoryDto[];
  child_categories?: IPartCategoryDto[];
}
export interface IPartCategory {
  children: IPartCategory[];
  id: string;
  name: string;
  parentId: string;
}
