import axios from "axios";

const downloadAxiosInstance = axios.create({});

export const downloadFile = async (path: string, fileName: string) => {
  const link = document.createElement("a");
  link.href = path;
  link.setAttribute("download", `IRM_Report_${fileName}.pdf`);
  link.setAttribute("target", "_blank");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}