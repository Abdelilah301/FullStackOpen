import React from "react";

const Filter = ({newFilter, onChangeFilter}) => {

    return (
        <div>
        filter shown with: <input value={newFilter} onChange={onChangeFilter} />
      </div>
    )
}

export default Filter;
