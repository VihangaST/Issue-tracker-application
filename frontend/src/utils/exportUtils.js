// src/utils/exportUtils.js

export const exportToJSON = (issues) => {
  const dataStr = JSON.stringify(issues, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Issues.json";
  link.click();

  URL.revokeObjectURL(url);
};
