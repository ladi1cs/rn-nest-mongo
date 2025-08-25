export const toMap = (list: any[], key: string) => {
    if (!list || !Array.isArray(list) || !key) {
        return [];
    } 

    const map = list.reduce((acc: any, item: any) => {
      acc[item[key]] = item;
      return acc;
    }, {});

    return map;
}