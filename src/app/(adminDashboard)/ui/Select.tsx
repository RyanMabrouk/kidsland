export default function Select({
    error,
    defaultValue,
    options,
    name,
  }: {
    error: string[] | undefined;
    defaultValue?: string | null;
    name: string;
    options: { value: string; label: string }[];
  }): React.JSX.Element {
    return (
      <div>
        <select className="text-gray-500 text-sm" name={name}>
          <option value="">Select...</option>
          {options.map((option) => (
            <option
              selected={defaultValue === option.value}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className="text-red-500 text-xs">{error?.[0]}</div>}
      </div>
    );
  }
  