import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MultiSelectProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  label: string;
  description: string;
  badgeColor?: string;
}

export function MultiSelect({
  options: initialOptions,
  selectedOptions,
  onChange,
  label,
  description,
}: MultiSelectProps) {
  const [newItem, setNewItem] = useState("");
  const [allOptions, setAllOptions] = useState(initialOptions);

  useEffect(() => {
    setAllOptions((prevOptions) =>
      Array.from(new Set([...prevOptions, ...selectedOptions]))
    );
  }, [selectedOptions]);

  const handleToggle = (item: string) => {
    const updatedSelection = selectedOptions.includes(item)
      ? selectedOptions.filter((i) => i !== item)
      : [...selectedOptions, item];
    onChange(updatedSelection);
  };

  const handleAddCustom = () => {
    if (newItem && !allOptions.includes(newItem)) {
      setAllOptions((prevOptions) => [...prevOptions, newItem]);
      onChange([...selectedOptions, newItem]);
      setNewItem("");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold w-full leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {allOptions.map((item) => (
          <Badge
            key={item}
            variant={selectedOptions.includes(item) ? "default" : "outline"}
            className={`cursor-pointer p-2 rounded-lg`}
            onClick={() => handleToggle(item)}
          >
            {item}
          </Badge>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          placeholder={`Add custom ${label.toLowerCase()}`}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCustom();
            }
          }}
        />
        <Button type="button" onClick={handleAddCustom}>
          Add
        </Button>
      </div>
    </div>
  );
}
