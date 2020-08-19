import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import "./exploreInput.scss";
import { getPackageInfo } from "../utils/apiManager";

interface IProps {
  setList(data: any): void;
  // any other props that come into the component
}

export function ExploreInput({ setList }: IProps) {
  const [packageName, setPackageName] = useState("");
  const [packageTag, setPackageTag] = useState("latest");
  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    if (packageName && packageTag) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [packageName, packageTag]);

  const getPackage = async () => {
    setList(null);
    getPackageInfo(packageName, packageTag, setList);
  };

  const setTag = (e: any) => {
    let tag = e.target.value.trim();
    if (tag !== "latest") {
      tag = Number.isNaN(parseInt(tag[0])) ? tag.slice(1) : tag;
    }
    setPackageTag(tag || "latest");
  };

  return (
    <div className="explore-from">
      <div className="explore-field">
        <TextField
          data-testid="pName"
          onChange={(e: any) => setPackageName(e.target.value.trim())}
          className="input_theme"
          value={packageName}
          id="pName"
          label="Package name"
          variant="outlined"
        />
      </div>
      <div className="explore-field">
        <TextField
          data-testid="pTag"
          value={packageTag}
          onChange={setTag}
          className="input_theme"
          id="pTag"
          label="Package Label/Tag"
          variant="outlined"
        />
      </div>
      <div className="explore-field">
        <Button data-testid="submit" variant="contained" onClick={getPackage} disabled={disabled}>
          check
        </Button>
      </div>
    </div>
  );
}
