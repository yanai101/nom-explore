export const getPackageInfo = async (packageName: string, packageTag: string, cb: any) => {
  if (packageName) {
    const response = await fetch(`http://localhost:8081/api/explore/${packageName}/${packageTag}`); //{mode: "no-cors",}
    const data = await response.json();
    cb(data);
  }
};
