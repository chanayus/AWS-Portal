
export const chooseHandle = (item, data, setState) => {
    setState(
    data.map((value) => {
      if (item.resourceId === value.resourceId) {
        value.isChoose = !value.isChoose;
      }
      return value;
    })
  );
};

export const chooseAllHandle = (data, setState ,isSelectAll, setIsSelectAll) => {
    setState(
    data.map((value) => {
      value.isChoose = isSelectAll ? false : true;
      return value;
    })
  );
  setIsSelectAll(!isSelectAll);
};
