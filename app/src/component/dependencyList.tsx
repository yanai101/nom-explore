import React from "react";
import { getPackageInfo } from "../utils/apiManager";
import "./dependencyList.scss";

interface DependencyListProps {
  list: any;
  setList: any;
}

function DependencyList({ list, setList }: DependencyListProps) {
  const getMoreData = (packageName: string, tag: string) => {
    let packageTag = tag.trim();
    if (tag !== "latest") {
      packageTag = Number.isNaN(parseInt(tag[0])) ? tag.slice(1) : tag;
    }
    getPackageInfo(packageName, packageTag, setList);
  };

  const BuildTree = ({ list }: any) => {
    return list && list.name ? (
      <div>
        {list.name} - {list.version}
        <ul>
          {list.dependencies &&
            Object.keys(list.dependencies).map((key: any) =>
              list.dependencies[key] && list.dependencies[key].name ? (
                <BuildTree list={list.dependencies[key]} />
              ) : (
                <li className="list-item" key={key} onClick={() => getMoreData(key, list.dependencies[key])}>
                  {key} - {list.dependencies[key]}
                </li>
              )
            )}
        </ul>
      </div>
    ) : null;
  };

  return (
    <div data-testid="list">
      <BuildTree list={list} />
    </div>
  );
}

export default DependencyList;
