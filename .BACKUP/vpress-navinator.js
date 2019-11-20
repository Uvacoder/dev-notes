const { join, basename, relative } = require("path");
const glob = require("glob");

function generateVPressSidebar() {
  const vpressNav = {};
  const vpressItems = glob.sync("**/*.md", {
    cwd: "docs"
  });

  vpressItems.forEach(item => {
    let groupName;
    let itemName;
    let path = item
      .replace(".md", "")
      .replace("README", "")
      .replace("index", "");

    path = `/${path}`;

    if (item.split("/").length === 1) itemName = item;
    else [groupName, itemName] = item.split("/");

    if (groupName) {
      if (!vpressNav[groupName]) vpressNav[groupName] = [];
      vpressNav[groupName].push(path);
    } else {
      vpressNav[itemName] = path;
    }
  });

  const vpressNavArray = [];

  for (const key in vpressNav) {
    const item = vpressNav[key];

    if (Array.isArray(item)) {
      const groupObj = {
        title: titleCase(key),
        children: item
      };
      vpressNavArray.push(groupObj);
    } else {
      vpressNavArray.push(item);
    }
  }

  return vpressNavArray;
}

function handleMarkdownFile(item) {
  item.path = item.path
    .replace("docs", "")
    .replace(".md", "")
    .replace("README", "")
    .replace("index", "");

  return item;
}

function titleCase(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.handleMarkdownFile = handleMarkdownFile;
exports.generateVPressSidebar = generateVPressSidebar;
