const fetch = require("node-fetch");

// this can sore in any db or file as a collocation in this demo i will sore it in global
let dependencyObject = {};

exports.get_package = async (req, res, next) => {
  try {
    const { name, tag = "latest" } = req.params;
    const data = await getPackageInfo(name, tag);

    res.status(200).json(data);
  } catch (error) {
    res.sendStatus(500).json(error);
    res.end();
  }
};

function isInMemory(name) {
  if (dependencyObject[name]) {
    return dependencyObject[name];
  } else {
  }
}

async function getPackageInfo(pName, tag) {
  let formatTag = tag;
  if (tag !== "latest") {
    formatTag = Number.isNaN(parseInt(tag[0])) ? tag.slice(1) : tag;
  }

  if (dependencyObject[pName]) {
    return dependencyObject[pName];
  } else {
    const result = await fetch(`https://registry.npmjs.org/${pName}/${formatTag}`);
    const data = await result.json();
    const { name, version, dependencies } = data;
    dependencyObject[name] = {
      name,
      version,
      dependencies,
    };
    return dependencyObject[name];
  }
}
