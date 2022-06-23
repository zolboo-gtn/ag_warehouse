export interface IPartCategoryDto {
  categorygroupid: number;
  categoryname: string;
  categorynamemn: string | null;
  children: IPartCategoryDto[];
  parentid: number | null;
}
export interface IPartCategory {
  children: IPartCategory[];
  id: string;
  name: string;
  parentId: string;
}

export const partCategoriesFromJson = (
  json: IPartCategoryDto[]
): IPartCategory[] => {
  return json.map(({ categorygroupid, categoryname, children, parentid }) => ({
    children: partCategoriesFromJson(children),
    id: `${categorygroupid}`,
    name: categoryname,
    parentId: `${parentid}`,
  }));
};
