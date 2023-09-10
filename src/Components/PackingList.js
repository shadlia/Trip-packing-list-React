import React, { useState } from "react";
import Item from "./Item";
export default function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  OnClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order </option>
          <option value="description">Sort by description order </option>
          <option value="packed">Sort by packed status </option>
        </select>
        <button disabled={items.length === 0} onClick={OnClearList}>
          Clear List
        </button>
      </div>
    </div>
  );
}
